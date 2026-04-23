# Rent Lover System Blueprint

## 1. Product positioning

Rent Lover should be built as a safe companionship marketplace, not as an ambiguous "rental dating" service. The platform value is companionship for public activities such as coffee, events, networking, family appearances, and social support.

Non-negotiable policy boundaries:

- No illegal or sexual services
- No direct phone number exposure before trust gates
- No off-platform payment steering
- No unverified companion accounts going live

## 2. User roles

### User

- Search and filter companions by city, radius, interests, skills, price
- Create booking request with public location and timeslot
- Chat in-app without exposing phone number
- Pay through escrow
- Leave review after booking completion

### Companion

- Complete eKYC and profile onboarding
- Upload photos and intro video
- Manage availability and accept/reject bookings
- Trigger SOS with live location handoff
- View earnings and payout status

### Admin

- Review KYC applications
- Moderate messages and profiles
- Handle disputes, incidents, and payouts
- Maintain policy rules and audit logs

## 3. Core architecture

### Mobile

- Expo + React Native + TypeScript
- Recommended next step: Expo Router for role-based navigation

### Backend

- FastAPI for REST + websocket services
- Background jobs with Celery/RQ or FastAPI worker stack

### Data

- PostgreSQL for primary transactional data
- Redis for caching, rate limiting, session and realtime presence
- PostGIS extension for radius search and geospatial indexes

### Media

- Cloudflare R2 for profile photos, KYC media, intro videos
- Signed upload URL flow from backend

### Payments

- Gateway abstraction layer for Momo / VNPay / Apple Pay
- Escrow ledger inside platform domain model

### Realtime

- WebSocket for chat and booking events
- WebRTC only if voice/video is truly justified after MVP

## 4. Domain model

### Core entities

- `users`
  - id, role, phone, email, status, created_at
- `profiles`
  - user_id, display_name, bio, city, hourly_rate, trust_score
- `profile_media`
  - profile_id, media_type, r2_key, sort_order
- `kyc_applications`
  - user_id, document_type, status, review_notes, submitted_at
- `availability_slots`
  - companion_id, start_at, end_at, status
- `booking_requests`
  - user_id, companion_id, location_id, start_at, end_at, note, status, price_snapshot
- `booking_status_history`
  - booking_id, from_status, to_status, changed_by, changed_at
- `payments`
  - booking_id, provider, status, amount, escrow_status, external_ref
- `chat_threads`
  - booking_id, created_at
- `chat_messages`
  - thread_id, sender_id, body, moderation_status, sent_at
- `reviews`
  - booking_id, author_id, target_id, rating, body
- `incidents`
  - booking_id, reporter_id, severity, status, summary
- `audit_logs`
  - actor_id, action, entity_type, entity_id, metadata, created_at

### Booking state machine

- `draft`
- `pending`
- `accepted`
- `in_progress`
- `completed`
- `cancelled`
- `disputed`

Transition rules:

- `draft -> pending`: user submits a valid request
- `pending -> accepted`: companion accepts and slot is locked
- `accepted -> in_progress`: check-in or verified start condition
- `in_progress -> completed`: both sides finish or timer/admin resolution completes
- Any active state -> `cancelled`: cancellation policy decides fees/refund
- Any active or completed state -> `disputed`: incident or payout hold triggered

## 5. Required indexes

- PostGIS geography index for companion location/radius search
- Composite index on `booking_requests(companion_id, start_at, end_at, status)`
- Composite index on `chat_messages(thread_id, sent_at desc)`
- Index on `kyc_applications(status, submitted_at)`
- Index on `payments(status, escrow_status)`
- Index on `incidents(status, severity, created_at)`

## 6. Key backend modules

### Auth and identity

- OTP login
- JWT access + refresh
- Device/session revocation
- Role gating

### Profile and discovery

- Companion onboarding
- Search with geo filter, tags, price range, trust score
- Public profile read model

### Booking orchestration

- Availability conflict detection
- Price snapshot and cancellation policy
- Escrow initialization
- Status change event publishing

### Chat and moderation

- Booking-bound chat threads
- Keyword and LLM-assisted moderation pipeline
- Admin review queue for high-risk content

### Trust and safety

- SOS incident creation
- Risk scoring
- Manual review desk
- Immutable audit trail

## 7. API outline

### Auth

- `POST /auth/request-otp`
- `POST /auth/verify-otp`
- `POST /auth/refresh`

### Profiles

- `GET /companions`
- `GET /companions/{id}`
- `POST /companions/profile`
- `POST /uploads/presign`

### Booking

- `POST /bookings`
- `GET /bookings/{id}`
- `POST /bookings/{id}/accept`
- `POST /bookings/{id}/cancel`
- `POST /bookings/{id}/check-in`
- `POST /bookings/{id}/complete`

### Payments

- `POST /payments/initialize`
- `POST /payments/webhook`
- `POST /payouts/request`

### Safety

- `POST /kyc/submit`
- `POST /incidents/sos`
- `POST /reports`

### Realtime

- `/ws/chat/{thread_id}`
- `/ws/events`

## 8. Sprint breakdown

### Sprint 1

- Finalize product policy boundary
- Design PostgreSQL schema
- Add PostGIS strategy
- Define booking state machine and payout rules

### Sprint 2

- Build auth and OTP flow
- Add profile CRUD
- Add signed R2 upload flow
- Add KYC submission lifecycle

### Sprint 3

- Implement availability calendar
- Build booking orchestration
- Detect schedule conflicts
- Persist status history and audit logs

### Sprint 4

- Add websocket chat
- Add moderation queue
- Add FCM / Expo push eventing

### Sprint 5

- Integrate sandbox payment provider
- Build payout flow
- Add dispute resolution operations
- Tighten UX and motion

## 9. Highest-risk areas

- Legal framing and store policy compliance
- False negatives in moderation and safety escalation
- Escrow/refund edge cases
- Companion fraud and fake KYC attempts
- Off-platform migration after initial match

## 10. Recommended immediate next implementation

1. Split the current Expo prototype into route-level screens.
2. Create `/src/domain` types for users, bookings, payments, incidents.
3. Scaffold FastAPI service in a sibling `backend/` folder.
4. Add SQL migrations for the entities above.
5. Stub API contracts in TypeScript so frontend and backend can develop in parallel.
