# OBLAKA: client import and live integrations

## What was checked in your client file

The supplied file is a genuine XLSX workbook with a misleading `.xlsx.xls` suffix. It can be read without altering the original. The browser importer recognizes its actual ZIP/XLSX format; renaming future exports to `.xlsx` will be clearer.

Verified sheet: `Worksheet`, 1,363 data rows, 23 columns.

| Check | Result |
| --- | ---: |
| Rows with a name | 1,363 |
| Rows with a phone | 1,363 |
| Distinct normalized phone numbers | 1,362 |
| Duplicate phone groups | 1 group containing 2 rows |
| Invalid phone formats under the import rules | 0 |
| Immediately importable rows, holding both duplicate rows for review | 1,361 |
| Nonempty last-name cells | 487 |
| Nonempty email cells | 21 |
| Nonempty last-visit cells | 868 |
| Nonempty comment cells | 27 |
| Nonempty birthday cells | 0 |

Phone checks are structural, not verification that a number is reachable or belongs to that person. One normalized phone occurs twice. Review whether those rows represent the same person or two people sharing a phone. The importer does not silently merge them. You can choose one profile, or leave both out until the contact details are corrected.

The export contains more than names and phones: spending, balances, appointment counts, last-visit information, comments and consent flags. All 1,363 rows have `Нет` (“No”) in the exported promotional-consent field; the exported data-consent field is also `Нет`. No marketing opt-in is inferred from having a phone number. Names and contact details are personal information even without medical or payment-card details, so the live CRM and original workbook should remain private.

**No real customer records were embedded in the website source, public assets or source ZIP.** I tested the workbook's import preview locally and left it unapplied. The demo client directory remains fictional. Actual client records can be applied through the admin import screen after review.

## One-time import

1. Open the browser preview → **Clients → Import existing clients**.
2. Choose the supplied workbook. Parsing happens in this browser; this prototype does not upload it to a server.
3. Review the counts, any invalid rows, and the duplicate pair. Select a single profile for that shared phone if appropriate, or leave both for later review.
4. Choose **Confirm import**. The importer appends valid clients and skips numbers already in the CRM, so repeating an import does not duplicate them.
5. Check a few imported profiles. Names, phone, email when present, historical visit/spending summaries, last visit and comments are mapped. Promotions and appointment SMS consent remain off until explicitly recorded.

Historical totals are stored as source summaries, not invented payment transactions or individual appointments. The file is enough for a basic client-directory migration. It is **not** enough to reconstruct full appointment history, technician assignments, individual payments, gift-card balances or per-visit retention cohorts; those need separate exports if you want that older detail. I received the client workbook and two price screenshots, but no separate technician roster.

The first-visit deposit logic uses completed CRM appointments, a recorded imported last visit, or an admin's explicit returning-client verification. An imported booking count by itself does not prove attendance and does not waive the deposit.

## Adding clients afterward

There is no need to upload Excel for each new client. Admin types the client's name during booking, chooses an existing search result, or supplies a new name and required unique phone. A successful booking creates the profile. Clients can also register their own cabinet; guest bookings require the guest's name and a different phone number. New phone numbers are normalized and checked for duplicates.

In the production website, contact ownership should be verified with an SMS/email code. Admin imports should run in a server-side transaction, use a stable internal client ID plus phone matching, produce an audit log, and preserve a backup before bulk changes. Existing contacts should activate their own access rather than receive a shared password.

## Confirmed business rules implemented in the prototype

- Technicians can edit their **own** availability and report absences; owner/admin can manage everyone. This follows your later schedule-editing note. The earlier “admin only” instruction is superseded for a technician's own schedule.
- Sick, doctor, birthday and private-reason absences require no personal explanation. They block new booking availability and flag existing visits for admin rescheduling rather than silently cancel them.
- Only owner/admin can set Top technician status, view staff contacts, or deactivate/restore staff. Deactivation requires three steps. Recovery lasts 15 × 24 hours. After that, profile contacts/gallery are removed from the prototype when it runs; financial references retain an anonymized technician ID. The live version needs a scheduled server cleanup even when nobody opens the website.
- Only the owner can add, archive or reprice services. Technicians select their own offered services; owner/admin can manage those assignments too. Existing appointment quotes are preserved when catalogue prices change.
- Every technician has a separate calendar colour.
- After completing a service, a technician can record cash/card payment and tips. Earned, expected, remaining and tips figures are shown, with a daily progress goal.
- Physical gift cards record value and recipient. Electronic cards require recipient email and create a simulated delivery queue entry. Technicians can record sales, with seller attribution.
- First-time clients pay a simulated 50% deposit before confirmation. It is applied to the final bill. Cancellation at least **24 elapsed hours** beforehand is eligible for a refund; later cancellation or a no-show forfeits it. The cancellation UI first shows the policy, then asks for final confirmation. Rescheduling transfers the existing deposit; no additional reschedule penalty was invented.
- Public portfolio view: `/?view=portfolio`. Each technician can upload up to 10 hand-service photos and 10 foot-service photos, each with a service and description. Public visitors cannot upload/delete. Actual sharing across devices requires shared storage; the prototype's images are held in this browser's IndexedDB.
- Business phone: +1 236 777 0818. Instagram: https://www.instagram.com/oblaka_nails_yvr/.

## Services and screenshot interpretation

The catalogue contains the 24 listed services/design items plus the $5 additional broken-nail charge from the note. Hand services, foot services and add-ons are separated. “Clean + Gel Polish (Fingers Only)” appears under pedicure in the screenshot, so it is labelled “Toes Only” in the CRM. Paraffin is assigned to hands and feet. REG/TOP amounts are preserved; pedicure items have the same REG/TOP price because the screenshot gives a single price.

Durations were not present in the screenshots. They remain clearly labelled provisional estimates that the owner can edit. The first broken nail repaired during correction is described as included; the additional repair charge is a separate item. Detailed quantities, tax rules and correction-specific quoting should be finalized before live checkout.

## Programs/accounts to connect for production

These are services behind your website, not applications clients need to install.

| Service | Why it is needed | What you provide |
| --- | --- | --- |
| Cloudflare + your domain | Host the website and secure backend endpoints; run reminder/cleanup jobs | Cloudflare account and control of your chosen domain/DNS |
| Supabase Auth, PostgreSQL and Storage | Shared clients/bookings, real accounts, permissions, private staff contacts and shared gallery files | A project and server-side credentials |
| WayForPay, if approved for this merchant/currency | Hosted first-visit deposit checkout and payment/refund notifications | Approved merchant account, merchant ID, secret, and written confirmation of Canadian business/CAD support |
| Twilio or another Canadian SMS provider | Appointment notifications, verified phone access, opt-outs and delivery reports | Account, approved SMS-capable sender, consent workflow and API credentials |
| Resend or another transactional email provider | Electronic gift cards, receipts and email access messages | Account, verified sending domain and API key |

**WayForPay needs confirmation first.** Its published Purchase API lists UAH as the order currency and USD/EUR as alternative currencies. That documentation does not establish CAD support for your Canadian studio. The current website does not charge money or convert CAD into another currency. If WayForPay cannot support the required merchant and settlement setup, select a CAD-capable processor such as Stripe instead; do not silently switch currency or provider.

Official references:
- WayForPay checkout and signed server notifications: https://wiki.wayforpay.com/en/view/852102
- Stripe currency support, if a CAD alternative is needed: https://docs.stripe.com/currencies
- Supabase permissions: https://supabase.com/docs/guides/database/postgres/row-level-security
- Resend sending-domain verification: https://resend.com/docs/dashboard/domains/introduction
- Twilio messaging/consent policy: https://www.twilio.com/en-us/legal/messaging-policy
- Canadian commercial-message requirements: https://crtc.gc.ca/eng/com500/faq500.htm
- Cloudflare queues for retryable deliveries: https://developers.cloudflare.com/queues/

## How those connections work

1. Create/approve the business accounts and verify the domain/sender. Add the email provider's requested DNS records. Your existing business phone is not automatically an SMS sender; the SMS provider must confirm whether it can be enabled or whether a separate approved sender is needed.
2. Store provider secrets in the server environment. They must never be placed in browser JavaScript, a public Git repository, or the Excel file.
3. The website asks its backend to create a reservation hold and deposit checkout. The backend validates the client, technicians, price snapshot, 50% amount and currency, then signs the provider request.
4. WayForPay's signed callback/webhook—not just the browser returning to a success page—confirms the payment. A database transaction confirms the reserved technician/client intervals exactly once. Failed or expired payment holds release those intervals.
5. At the visit, the technician sees the deposit credit and records only the remaining cash/card balance plus tips. Refunds use an idempotent server ledger and provider confirmation. A scheduled job handles no-shows and outstanding refund work.
6. Successful electronic gift-card purchases queue an email with the unique code. Workers send through the email provider, retry failures safely and record delivery state. Gift codes must be checked/redeemed server-side in one transaction to prevent concurrent reuse.
7. Reminder jobs select eligible reservations and clients, check consent/STOP suppression immediately before delivery, send SMS/email, and store provider delivery results. Marketing and appointment consent remain separate; an import does not create consent.
8. Staff access is enforced in the database and server routes, not just by hiding buttons. Put staff contact details in an admin-only table; a public portfolio response contains only approved name, Top badge, services, photo and descriptions. Private absence reasons never appear in public availability responses.

The current static Cloudflare-ready export remains a browser-local prototype. The role switcher is deliberately open for demonstration, gallery data is local to the browser, and no payment/SMS/email provider is live. Production requires the shared backend above, secure sessions/contact verification, transactional booking locks, immutable financial ledgers, consent evidence, backups, monitoring and cross-browser/accessibility testing. Retain the confirmed America/Vancouver time-zone rules; do not hard-code PST offsets.
