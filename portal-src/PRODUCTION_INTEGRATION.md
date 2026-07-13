# Production integration status

The GitHub Pages portal now uses Supabase Auth for real email/password accounts, email verification, password recovery, persisted sessions, secure logout, and database-backed client/admin roles. GitHub Pages remains a static host, so all private data services must enforce authorization through Supabase Row Level Security or another server-side boundary.

## Connected now

- Supabase email/password sign-up and sign-in
- Required email verification
- Password-reset and password-update flow
- Persisted, automatically refreshed sessions
- Secure logout
- `portal_profiles` table keyed to `auth.users`
- New accounts default to the client role
- Administrator role cannot be chosen at registration
- Row Level Security limits profile reads and permitted profile updates to the authenticated user

Before real clients are invited, connect the portal to a server-backed application with the following components.

## Required services

- Authentication follow-up: configure the production Site URL and allowed redirect URL in Supabase, customize verification/reset email templates, and assign administrator roles through a trusted database operation.
- Relational database: PostgreSQL or an equivalent database with server-enforced row permissions.
- File storage: private buckets, signed URLs, malware scanning, MIME validation, and size limits.
- Messaging: client-scoped conversations, server authorization, attachment handling, and email notifications.
- Billing: Stripe Checkout and Billing Portal with verified webhooks. Never persist raw card details.
- Social and analytics APIs: authorized Meta and platform connections with encrypted server-side tokens.
- AI services: server-side calls only. Outputs remain drafts until administrator and client approval.

## Relational data model

Every client-owned row must include a non-null `client_id` foreign key. Server-side authorization must derive the permitted client ID from the authenticated session; never trust a client ID sent by the browser.

| Table | Core relationships |
| --- | --- |
| users | belongs to a role; optionally belongs to one client |
| user_roles | role definitions for client, administrator, and team member |
| clients | owns all tenant-scoped records |
| businesses | belongs to a client |
| team_members | links a user to assigned clients |
| service_plans | referenced by subscriptions |
| subscriptions | belongs to a client and service plan |
| onboarding_responses | belongs to a client and records step/version |
| social_accounts | belongs to a client; encrypted provider tokens stored server-side |
| brand_assets | belongs to a client and references a private storage object |
| content_items | belongs to a client and assigned team member |
| content_versions | belongs to a content item and author user |
| content_approvals | belongs to a content item/version and approving user |
| comments | belongs to a client and optionally content/request record |
| client_requests | belongs to a client and submitting user |
| request_updates | belongs to a request and author user |
| conversations | belongs to a client |
| messages | belongs to a conversation, client, and sender user |
| notifications | belongs to a client and recipient user |
| analytics_reports | belongs to a client and reporting month |
| analytics_metrics | belongs to an analytics report and platform |
| invoices | belongs to a client and subscription |
| payments | belongs to an invoice; stores processor references only |
| internal_notes | belongs to a client; administrator visibility only |
| activity_logs | append-only audit record with client, actor, action, and timestamp |

## Authorization requirements

- Clients can select only rows whose `client_id` matches the authenticated user’s client membership.
- Administrators can manage all rows through server-verified role checks.
- Internal notes are never returned through client-facing endpoints.
- Every mutation performs a server-side permission check and writes an audit log.
- Destructive operations require confirmation and should use soft deletion where recovery matters.
- Uploaded objects are private and addressed through short-lived signed URLs.

## Live portal URL

`https://innergclaw.github.io/smm-service-tier-1/portal/`
