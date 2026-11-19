import {paidDeposit} from './business';
import {appointmentPrice,legs,type Appointment,type DemoState} from './data';
import {rewardQuote,consumeRewards,syncEngagement} from './rewards';
/** Validate and settle service, reward and gift-card ledgers as one immutable transition. */
export function settle(state:DemoState,input:Appointment,giftId?:string,finishTech?:number):DemoState{
 const current=state.appointments.find(a=>a.id===input.id);if(!current||current.paid||current.refunded||current.status==='cancelled')return state;
 if(finishTech!==undefined&&!legs(current,state).some(l=>l.tech===finishTech))return state;
 const price=appointmentPrice(current,state);if(!Number.isFinite(input.tip)||input.tip<0||!Number.isFinite(input.discount)||input.discount<0||input.discount>price-paidDeposit(current))throw new Error('Invalid payment amount.');
 const proposed:Appointment={...current,tip:input.tip,discount:input.discount,manualDiscount:input.manualDiscount??input.discount,rewardIds:input.rewardIds??current.rewardIds,colour:input.colour??current.colour};const quote=rewardQuote(state,proposed);
 const gift=state.gifts.find(g=>g.id===giftId&&g.status==='active'&&g.remaining>0);if(giftId&&(!gift||gift.code!==input.giftCode?.trim().toUpperCase()))throw new Error('Code not found or no balance remaining.');
 const finished=finishTech===undefined?legs(current,state).map(l=>l.tech):[...new Set([...(current.finishedTechs||[]),finishTech])];const complete=legs(current,state).every(l=>finished.includes(l.tech));
 if(quote.selected.length&&!complete)throw new Error('Complete all service parts before redeeming a reward.');
 const applied=gift?Math.min(gift.remaining,Math.max(0,price-quote.totalDiscount-paidDeposit(current))):0;
 const paid:Appointment={...proposed,discount:quote.totalDiscount,manualDiscount:quote.manual,rewardIds:quote.selected.map(r=>r.id),rewardDiscount:quote.rewardDiscount,method:input.method,giftCode:input.giftCode,paid:true,status:complete?'completed':'confirmed',finishedTechs:finished,giftApplied:applied,giftCardId:gift?.id};
 const withRewards=quote.selected.length?consumeRewards(state,proposed):state;
 const next={...withRewards,appointments:state.appointments.map(a=>a.id===paid.id?paid:a),gifts:state.gifts.map(g=>g.id===gift?.id?{...g,remaining:g.remaining-applied,status:g.remaining===applied?'redeemed' as const:'active' as const,redeemedAt:new Date().toISOString(),appointment:paid.id}:g)};
 return syncEngagement(next);
}
export function refundPayment(state:DemoState,id:string):DemoState{const a=state.appointments.find(a=>a.id===id);if(!a||!a.paid||a.refunded)return state;return syncEngagement({...state,appointments:state.appointments.map(x=>x.id===id?{...x,refunded:true,deposit:x.deposit?.status==='paid'?{...x.deposit,status:'refunded'}:x.deposit}:x),gifts:state.gifts.map(g=>g.id===a.giftCardId?{...g,remaining:Math.min(g.amount,g.remaining+(a.giftApplied||0)),status:'active'}:g)});}
