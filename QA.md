# OBLAKA validation — November 3, 2026

## Automated checks

- Next.js production build and static export: passed.
- ESLint: passed without warnings.
- Standalone TypeScript checking: passed.
- 53 business-rule tests: passed.

Coverage includes connected booking filters, technician/client conflicts across locations, working days/hours and breaks, before-09:00 schedules, absence blocks, qualifications, two-technician service-category restrictions and independent durations, cancellation/rescheduling release, historical quote preservation, price tiers, gift-card settlement and refunds, first-visit eligibility, exact 24-hour cancellation boundaries, no-shows, deposit credit, promotion opt-outs, birthday targeting, import deduplication/idempotency, 15-day staff recovery/anonymization, and gallery permissions/limits.

Time tests use America/Vancouver via the runtime time-zone database rather than a fixed PST offset. B.C.'s 2026 move to permanent daylight time was checked against the provincial source: https://www2.gov.bc.ca/gov/content/governments/celebrating-british-columbia/daylight-saving-time.

## Browser checks

Used fictional records on the isolated 127.0.0.1 origin. The real workbook was read only for an unapplied import preview; it was not committed to source or imported into the fictional directory.

- The supplied workbook parsed in-browser: 1,363 rows; 1,361 ready; 2 duplicate-phone rows held; 0 invalid-format rows.
- Technician edited their own working hours and reported a doctor-appointment absence. Existing affected visits appeared in the admin rescheduling queue.
- Technician profile editor did not expose phone/email fields or the Top technician checkbox. Admin staff cards displayed contacts.
- Completed a service as a technician, selected cash, and recorded payment/tip.
- Deactivated a technician through all three steps, including typed-name confirmation. The profile showed its recovery deadline and affected visits; restoration worked.
- Created a service as Owner. Admin had neither Add service nor Edit price buttons.
- Technician recorded an electronic gift-card sale with required recipient email. Buyer, seller, format, unique code and simulated delivery state appeared in the ledger.
- A first-time client saw the 50% deposit amount, remaining balance and cancellation terms; confirmation was blocked until policy acceptance and an explicit simulated deposit step.
- Appointment details subtracted the deposit from the remaining cash/card payment.
- Cancellation displayed the policy, then final confirmation, and changed an eligible deposit to the simulated refunded state.
- Notification controls showed zero eligible recipients where consent was absent and kept the SMS queue action disabled.
- A gallery upload persisted through browser reopening, appeared on the public portfolio URL without sign-in, and had no upload/delete controls for the public view. The temporary test upload was then removed.
- Checked 390×844 mobile earnings/tips/progress and a desktop calendar; document width matched viewport width. Calendar staff colours were visually distinct.
- A compact-height sidebar adjustment keeps new navigation destinations easier to discover.

## Limits

This verifies an interactive browser-local prototype, not a production security boundary or a live financial/messaging system. Payment, deposit, refund, SMS and email actions are simulations. Shared multi-user concurrency, delivery/retry behavior, backend permission enforcement, contact verification, real scheduled cleanup, provider approval and comprehensive cross-browser/accessibility testing remain production work. See CLIENT-IMPORT-AND-INTEGRATIONS.md.

## Rewards and design validation

Added 12 checks for repeating milestones, atomic fifth-visit redemption, birthday boundaries/leap days/design eligibility, referral attribution/issuance/refunds, percentage stacking/expiry, monthly rollover/idempotency, capacity interval accounting, parallel capacity and old/new technician notice routing.

Browser checks confirmed reward demo loading, paired referral issuance after simulated completed payment, client loyalty/birthday/challenge screens, owner inbox payment notice, technician-scoped notices/fullness, owner image upload/display/removal, and a 390px rewards layout without horizontal overflow. Optional image slots were returned to solid colour after the upload test. Original 41 regression checks still pass.
