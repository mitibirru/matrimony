# PremaJodi — Full Project Roadmap

## 1. Project Overview
A premium, dual-tier matrimony platform catering primarily to the **Telugu** and **Marathi** communities. The application serves two distinct user bases:
1. **General Matrimony:** For the broader community seeking traditional matchmaking.
2. **Elite/Professional Matrimony:** An exclusive tier tailored for high-net-worth individuals, entrepreneurs, and highly-paid professionals seeking curated, premium matches.

---

## 2. Technology Stack
- **Frontend:** Next.js (React), TailwindCSS / Vanilla CSS
- **Backend:** Fastify (Node.js), MongoDB (Mongoose)
- **Auth:** NextAuth.js + Firebase (Phone OTP)
- **State:** React Context / Zustand

---

## 3. Design System & Color Palette

| Role | Color | Usage |
|------|-------|-------|
| Primary (Luxury) | Deep Purple `#240046` / `#390099` | Headers, Elite sections, premium branding |
| Secondary (Action) | Crimson/Pink-Red `#ff0054` / `#9e0059` | Buttons, highlights, general sections |
| Accent (Premium) | Gold/Amber `#ffbd00` | Badges, stars, icons, borders |
| BG (General) | White `#FFFFFF` / Off-White `#FAFAFA` | General pages |
| BG (Elite) | Dark Purple-Black `#10002b` | Elite/VIP sections |
| Text | Charcoal `#1A1A1A` (light) / Off-White `#F8F9FA` (dark) | Body text |

---

## Phase 1 — Foundation & Core Auth ✅ COMPLETE

> **Goal:** Establish the brand, public-facing pages, user registration, login, and basic profile creation.

### Frontend Pages
- [x] Homepage (`/`) — Hero, CTAs, search widget, featured stats
- [x] Registration (`/register`) — Email + Phone OTP signup
- [x] Login (`/login`) — Email + Phone OTP login
- [x] Elite Landing (`/elite`) — Premium VIP matchmaking page
- [x] About Us (`/about`) — Company vision, community focus
- [x] Contact Us (`/contact`) — Support form, details
- [x] Privacy Policy (`/privacy`)
- [x] Terms of Service (`/terms`)
- [x] FAQ (`/faq`)
- [x] Safety (`/safety`)

### Auth & Backend
- [x] Email/password registration & login (NextAuth + Fastify)
- [x] Google OAuth login
- [x] Phone OTP login & registration (Firebase)
- [x] Forgot/Reset password flow
- [x] Email verification flow
- [x] Duplicate phone check on register (`/api/auth/check-phone`)
- [x] Unregistered phone redirect (login → register with phone tab)

### Profile & Dashboard
- [x] Simplified 3-step onboarding wizard (Basics → Location → Phone Verify)
- [x] Dashboard (`/discover`) — Profile overview, matches section
- [x] Edit Profile (`/discover/edit-profile`) — Multi-tab form (Personal, Religion, Career, Family)
- [x] Profile completion banner with percentage indicator
- [x] Database schema relaxation for optional fields

---

## Phase 2 — Matchmaking, Search & Profile Discovery

> **Goal:** The core matchmaking engine. Users can discover, search, filter, and view other profiles. This is what makes the app a *matrimony* platform.

### 2.1 Profile View Page
- [ ] Public profile page (`/profile/[id]`) — View another user's full profile
- [ ] Photo gallery with lightbox viewer
- [ ] Privacy-aware display (hide fields based on user settings)
- [ ] "Express Interest" / "Shortlist" / "Block" action buttons

### 2.2 Search & Discovery
- [ ] Browse profiles (`/discover/search`) — Grid/list view of profiles
- [ ] Filter by: Age, Height, Religion, Community, Mother Tongue, Education, Profession, Location, Income, Marital Status, Diet
- [ ] Sort by: Newest, Last Active, Relevance
- [ ] Pagination / Infinite scroll
- [ ] "Quick View" profile card hover/modal

### 2.3 Matchmaking Engine (Backend)
- [ ] Match recommendation algorithm (weighted scoring: religion, community, age, location, education)
- [ ] "Daily Matches" endpoint — curated daily suggestions
- [ ] "Similar Profiles" endpoint — profiles similar to a viewed one
- [ ] API: `GET /api/profiles/search` with query filters
- [ ] API: `GET /api/profiles/:id` — fetch single profile
- [ ] API: `GET /api/matches/daily` — daily recommendations

### 2.4 Interest & Shortlist System
- [ ] Express Interest (`POST /api/interests`)
- [ ] Accept / Decline interest (`PATCH /api/interests/:id`)
- [ ] Shortlist a profile (`POST /api/shortlist`)
- [ ] "My Interests" page — Sent / Received interests
- [ ] "Shortlisted" page — Saved profiles
- [ ] Interest status badges on profile cards (Sent, Received, Accepted, Declined)

### 2.5 Photo Upload
- [ ] Profile photo upload (multi-image, up to 6)
- [ ] Image cropping & compression (client-side)
- [ ] Cloud storage integration (S3 / Cloudinary / Firebase Storage)
- [ ] Photo moderation queue (admin review before publish)

### 2.6 Profile Privacy Settings
- [ ] Settings page (`/discover/settings`)
- [ ] Toggle: Hide phone number
- [ ] Toggle: Hide photos (show only to accepted interests)
- [ ] Toggle: Profile visibility (Active / Hidden / Paused)
- [ ] Toggle: Who can contact me (All / Premium only)

### 2.7 Logout All Devices
- [ ] Backend: Track active sessions per user (session token + device info + last active timestamp)
- [ ] API: `POST /api/auth/logout-all` — Invalidate all sessions except current
- [ ] API: `GET /api/auth/sessions` — List active sessions (device, location, last active)
- [ ] UI: "Active Sessions" section in Settings page showing logged-in devices
- [ ] UI: "Logout All Devices" button with confirmation modal
- [ ] Auto-logout on other devices when password is changed
### 2.8 Multi-Factor Authentication (MFA)
- [ ] Backend: MFA settings model (enabled, method: SMS/Email, verified phone/email)
- [ ] API: `POST /api/auth/mfa/enable` — Enable MFA for user account
- [ ] API: `POST /api/auth/mfa/verify` — Verify OTP during login
- [ ] API: `POST /api/auth/mfa/disable` — Disable MFA (requires current OTP)
- [ ] Login flow: After email+password success, prompt OTP verification (email or SMS)
- [ ] OTP delivery via email (SendGrid / Nodemailer) and SMS (Firebase / Twilio)
- [ ] UI: MFA setup page in Settings — enable/disable toggle, choose method (Email OTP / Phone OTP)
- [ ] UI: OTP verification modal during login with countdown timer & resend
- [ ] Recovery codes generation (one-time backup codes if user loses phone)

---

## Phase 3 — Engagement, Trust & Monetization

> **Goal:** Build trust through verification, drive revenue through memberships, and add engagement features.

### 3.1 Membership / Pricing Plans
- [ ] Pricing page (`/plans`) — Free vs. Premium vs. Elite tier comparison
- [ ] Feature gating logic (e.g., free users can't see phone, can't send unlimited interests)
- [ ] Payment integration (Razorpay / Stripe)
- [ ] Subscription management (activate, renew, cancel)
- [ ] Payment history page
- [ ] Backend: Membership model, payment webhook handlers

### 3.2 Success Stories
- [ ] Success Stories page (`/success-stories`) — Testimonials grid/carousel
- [ ] "Share Your Story" form — Users submit their success story
- [ ] Admin approval workflow for stories
- [ ] Featured stories on homepage

### 3.3 Verification & Trust Badges
- [ ] ID verification (Aadhaar / PAN upload)
- [ ] Education verification (degree certificate upload)
- [ ] Income verification (salary slip upload)
- [ ] Verified badge display on profile cards
- [ ] Admin verification dashboard
- [ ] Backend: Verification model, file upload & status tracking

### 3.4 Notifications
- [ ] In-app notification center (bell icon in header)
- [ ] Notification types: New interest, Interest accepted, Profile view, New match, Message
- [ ] Email notifications (digest: daily/weekly)
- [ ] Push notifications (browser / mobile)
- [ ] Notification preferences page
- [ ] Backend: Notification model, event-driven notification service

### 3.5 Messaging (Basic)
- [ ] In-app chat between mutually interested users
- [ ] Text messages only (Phase 3)
- [ ] Chat list page (`/discover/messages`)
- [ ] Chat window UI
- [ ] Real-time messaging (WebSocket / Socket.IO)
- [ ] Backend: Message model, WebSocket server

---

## Phase 4 — Admin Panel & Analytics

> **Goal:** Full admin control over the platform — user management, content moderation, analytics.

### 4.1 Admin Dashboard (`/admin`)
- [ ] Admin login with role-based access
- [ ] Dashboard with key metrics (total users, new registrations, active users, revenue)
- [ ] Charts: Registration trends, revenue, user demographics

### 4.2 User Management
- [ ] User list with search & filters
- [ ] View / Edit / Suspend / Delete users
- [ ] Verification approval queue (ID, education, income docs)
- [ ] Photo moderation queue
- [ ] Flagged / Reported user management

### 4.3 Content Management
- [ ] Success story approval
- [ ] Banner / announcement management
- [ ] FAQ management (CRUD)
- [ ] Static page editor (About, Privacy, Terms)

### 4.4 Reports & Analytics
- [ ] Registration funnel analytics
- [ ] Match success rate tracking
- [ ] Revenue reports (by plan, by period)
- [ ] User engagement metrics (DAU, MAU, session time)
- [ ] Export reports as CSV

---

## Phase 5 — Advanced Features & Scale

> **Goal:** Premium features, mobile app, and scalability for growth.

### 5.1 Advanced Matchmaking
- [ ] AI-powered compatibility scoring
- [ ] Horoscope matching (Kundali matching) integration
- [ ] Partner preference matching (auto-match against saved preferences)
- [ ] "Who Viewed My Profile" feature (premium)

### 5.2 Elite Tier Features
- [ ] Dedicated relationship manager assignment
- [ ] Personalized match recommendations (human-curated)
- [ ] Priority profile visibility
- [ ] Background verification included
- [ ] Exclusive events & meetups page

### 5.3 Enhanced Messaging
- [ ] Voice messages
- [ ] Video call scheduling
- [ ] Photo sharing in chat
- [ ] Read receipts & typing indicators

### 5.4 Mobile App
- [ ] React Native / Flutter app
- [ ] Push notifications (FCM)
- [ ] App Store & Play Store deployment
- [ ] Mobile-specific UX optimizations

### 5.5 SEO & Marketing
- [ ] Blog section (`/blog`) — relationship advice, wedding tips
- [ ] Community-specific landing pages (Telugu, Marathi)
- [ ] Referral program ("Invite a friend")
- [ ] Social media sharing for profiles
- [ ] Sitemap & structured data (JSON-LD)

### 5.6 Security & Anti-Forgery
- [ ] CSRF token protection on all form submissions and API mutations
- [ ] Rate limiting & brute-force protection (login attempts, OTP requests, API abuse)
- [ ] Bot detection (honeypot fields, behavioral analysis, CAPTCHA escalation)
- [ ] Fake profile detection — AI-based image analysis (reverse image search, deepfake detection)
- [ ] Profile fraud scoring (flag suspicious patterns: stolen photos, duplicate bios, rapid bulk messaging)
- [ ] User reporting system — report fake/scam profiles with reason categories
- [ ] Auto-suspension triggers (multiple reports, failed verifications, flagged content)
- [ ] IP & device fingerprinting to detect multi-account abuse
- [ ] Content sanitization — XSS prevention on all user inputs (bio, messages, names)
- [ ] SQL/NoSQL injection protection audit
- [ ] Secure file upload validation (MIME type, file size, malware scanning)
- [ ] Data encryption at rest (sensitive PII: phone, Aadhaar, income) and in transit (TLS)
- [ ] GDPR / Data privacy compliance — user data export & account deletion
- [ ] Security audit logging (login attempts, profile changes, admin actions)
- [ ] Penetration testing & vulnerability assessment

---

## Summary

| Phase | Focus | Status |
|-------|-------|--------|
| **Phase 1** | Foundation, Auth, Public Pages, Basic Profile | ✅ Complete |
| **Phase 2** | Matchmaking, Search, Discovery, Interests, Photos | 🔜 Next |
| **Phase 3** | Monetization, Trust, Notifications, Messaging | ⏳ Planned |
| **Phase 4** | Admin Panel, Analytics, Moderation | ⏳ Planned |
| **Phase 5** | AI Matching, Mobile App, Elite Features, Scale | ⏳ Future |
