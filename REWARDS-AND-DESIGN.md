# OBLAKA rewards and design update

The browser-only Next.js prototype uses solid pink (#FFBED9), blue (#BEDEFF), cream, lemon and lilac surfaces, editorial serif headings and small handwritten accents. No gradients, new illustrations, stock photographs or reference-image copies were added. The supplied references informed typography, spacing and colour blocking.

## Try it

Open http://localhost:3000/ and choose Owner. In **Rewards studio**, click **Load rewards examples**. This adds two clearly fictional profiles, four paid visits, an upcoming fifth visit, a birthday window and a pending referral without replacing existing data. Complete the friend's demo visit, then explore either example client. This is simulated checkout; no charge or message is sent.

- **Client → Rewards & Achievements:** repeating 10-segment loyalty progress, $5 fifth-visit and $10 tenth-visit rewards; birthday choice; available rewards; referral status; current monthly challenge and past completions. **My Achievements** shows earned and locked badges.
- **Owner → Rewards studio:** configure eligible services/design add-ons, percentage stacking, referral expiry, leap-day treatment; edit all 12 monthly challenges; inspect people, approve qualifications, configure professional milestones and team challenges; review reward issues and audited manual adjustments.
- **Owner → Brand studio:** upload, replace or remove the dashboard image and rewards image; edit image descriptions and the studio note. Without images, both areas retain solid-colour typographic layouts. Images are browser-local IndexedDB blobs in this prototype.
- **Owner/Admin/Technician → Inbox:** appointment creation, rescheduling, cancellation, payment, refunds and other appointment edits create persistent in-cabinet notices. The owner and admin see all changes; affected old and new technicians see their relevant changes, with independent read status. The technician cannot open another technician's reassigned visit.
- **Owner/Technician → Overview:** daily fullness divides booked working minutes by available working minutes, subtracting breaks and absences without double-counting overlapping intervals. Each parallel leg occupies its own technician. Cancelled and no-show reservations free capacity. Capacity outside current availability is flagged separately.

## Redemption rules

Only completed, paid, non-refunded visits advance loyalty. Rewards repeat every ten visits across both studios; cancellation/rescheduling never advances a visit. A fifth/tenth-visit credit can apply at that visit's completed checkout. Stable reward IDs and immutable checkout transitions prevent duplicate grants and repeated redemption.

Birthday gifts allow one annual choice: one configured design add-on with an eligible paid service, or 10% off eligible services. The window includes the birthday and the 15 preceding calendar days in America/Vancouver. The owner chooses February 28 or March 1 for February 29 birthdays in non-leap years. A choice can change before redemption. Claiming or attaching a gift does not consume it; all service parts must be completed at paid checkout. Tips are excluded.

Admin/owner search the existing directory to attribute a first-time friend's referrer. Self-referral, missing CRM profiles, returning clients and changes after reward issuance are rejected. Once the friend's first visit is completed and paid, each client receives one 20% reward for a subsequent eligible appointment. Refunds reverse unused referral rewards and flag already-redeemed rewards for owner resolution. The owner can configure expiry for newly issued referrals; default is no expiry. Multiple percentage rewards cannot stack by default. If enabled, percentages compound.

Monthly challenges switch using Vancouver's calendar month. Types cover new services, nail art, a new technician, seasonal services, an honest review, pedicure, referral, a new colour, a completed visit, planning the next booking and holiday art. Qualifying records earn a single dated completion and credit. Ratings do not need to be positive for the honest-review challenge. Earlier completed challenges stay in history.

Client badges track visits, anniversary, exploration, referrals, creativity, challenges and birthday redemption. Technician achievements track completed work, ratings, compliments, returning clients, learning, art and team contributions. Internal Nail Artist / Skilled Artist / Advanced Specialist / Master Artist levels are not professional certifications. No public revenue leaderboard is used.

## Storage and production

This is an interactive prototype. Data and read state persist in this browser, with same-origin tab synchronization. Clearing browser storage removes the local prototype state. Role switching is a demonstration tool, not secure authorization. Payments, gift delivery and outbound messages remain simulated. New interface destinations and key controls include Ukrainian, French and Chinese translations; some descriptive and administrative copy still falls back to English and needs a final translation review.

Before live use, move reward ledgers, notifications and appointment transitions to an authenticated backend/database. Use transactions, unique grant/redemption constraints, verified payment webhooks, authoritative server time, access control and shared media storage. Live multi-device notifications need server events or polling. The existing static Cloudflare export is prepared for preview deployment; production integrations are described in CLIENT-IMPORT-AND-INTEGRATIONS.md. No paid integration or external account was connected by this update.
