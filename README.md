# OBLAKA — updated browser CRM prototype

Open **http://localhost:3000** and refresh an older tab. The website remains Next.js/React/TypeScript, browser-only, with no client installation.

Start with the [client import and integration guide](CLIENT-IMPORT-AND-INTEGRATIONS.md) for the current business rules, verified workbook findings, provider setup, and production limits. See [QA.md](QA.md) for validation evidence.

## Try the new features

- **Team** (Owner/Admin): edit contacts, services, Top badge, calendar colour, working days/hours; try the three-step deactivation and 15-day recovery.
- **Services** (Owner): manage the screenshot-derived catalogue and REG/TOP prices. Archived services preserve historical quotes.
- **Technician → Overview**: earnings, tips and daily progress; own schedule editing and private absence reports. Complete a service to choose cash/card payment.
- **Gift cards**: physical/electronic forms, recipient email requirement, seller attribution, and simulated email delivery.
- **Clients**: locally read the supplied XLSX export, review duplicates, then explicitly confirm import. Real customer records are not bundled in source.
- **New appointment**: a first-time client must accept the policy and simulate a 50% deposit before confirmation. Cancellation has two stages and applies the confirmed 24-elapsed-hour rule.
- **Work gallery**: up to 10 hand-service and 10 foot-service photos per technician. `/?view=portfolio` opens the public read-only view. Gallery files are browser-local IndexedDB assets in this prototype.
- **Notifications**: create rules and simulate consent-filtered queues. No real messages are sent.

English, Ukrainian, French and Chinese options remain available. Some validation/detail text falls back to English. Contacts and user-entered notes are not machine-translated. Technician names and contact information in the demo are fictional; no separate real staff roster was supplied.

## Run and validate

```sh
pnpm install
pnpm dev
pnpm test
pnpm lint
pnpm typecheck
pnpm build
```

Use Node.js 22+ and pnpm. Static output is `out/`; preview it with `python3 -m http.server 3000 --directory out`. If development filesystem watchers are limited, use `WATCHPACK_POLLING=true pnpm dev`.

Cloudflare Pages: Next.js Static HTML Export preset, build `pnpm build`, output `out`. The `wrangler.jsonc` declares that directory. Attach an owned domain in Pages → Custom domains. No production domain has been connected.

The live payment/email/SMS requirements cannot be met by a static export alone; the integration guide explains the shared backend and verified provider callbacks needed. All payments, deposits, refunds and messages in this version are simulations. Browser-local role selection is not production authentication or authorization. New local passwords are salted PBKDF2 hashes, but real six-digit access requires verified contacts, server-side rate limits and secure sessions.

## Architecture

`app/page.tsx` composes role views and persists demo records. `components/` contains the booking, calendar, staff management, service catalogue, spreadsheet import, gallery, gift-card, notification and payment interfaces. `lib/data.ts` owns typed entities and quote snapshots. `lib/business.ts` owns availability permissions, deposit/cancellation policy, deactivation/recovery and gallery limits. `lib/finance.ts` owns atomic simulated settlement/refunds; `lib/import-clients.ts` owns import normalization/deduplication; `lib/notifications.ts` owns eligibility; `lib/assets.ts` stores local gallery blobs. `tests/` validates these business rules.

A future production deployment must enforce all permissions and invariants server-side with a real database. Source prices/durations remain editable and illustrative where the screenshots did not specify them. No extra illustrations were added.

## Rewards and editorial update

Active loyalty, birthday, referral and monthly challenge prototypes are now included, with owner policy/audit controls, technician achievements, in-cabinet appointment notices and daily fullness. Owner-controlled optional images live in Brand studio. See [REWARDS-AND-DESIGN.md](REWARDS-AND-DESIGN.md) for walkthrough, rules and production boundaries. This supersedes any earlier future-only loyalty description.
