# PremaJodi — TODO by Page/Feature

> Last updated: 2026-05-20

---

## 🏠 Homepage (`/`)
| # | Task | Priority | Status |
|---|---|---|---|
| 1 | Hero search widget → wire to actual `/discover` search with filters | P0 | ⬜ |
| 2 | Trust counters → pull from real DB counts instead of hardcoded | P1 | ⬜ |
| 3 | Community picker → read query params on `/discover` and auto-apply filter | P0 | ⬜ |
| 4 | Browse categories → read query params on `/discover` and auto-apply filter | P0 | ⬜ |
| 5 | Success stories → replace placeholder testimonials with real data (CMS or DB) | P2 | ⬜ |
| 6 | Mobile app section → link to actual App Store / Play Store when ready | P3 | ⬜ |
| 7 | Elite banner → build `/elite` page with plans & pricing | P2 | ⬜ |
| 8 | SEO: Add structured data (JSON-LD) for matrimony service | P2 | ⬜ |

---

## 🔍 Discover / Feed (`/discover`)
| # | Task | Priority | Status |
|---|---|---|---|
| 1 | Read URL query params (`?community=`, `?caste=`, `?city=`, etc.) and filter feed | P0 | ⬜ |
| 2 | Replace mock profiles with real DB profiles (paginated API) | P0 | ⬜ |
| 3 | Build `/api/profiles/search` endpoint with filters (caste, city, state, language, age, etc.) | P0 | ⬜ |
| 4 | Implement "For You" AI-based recommendation algorithm | P1 | ⬜ |
| 5 | Add "Send Interest" / "Shortlist" actions with DB persistence | P0 | ⬜ |
| 6 | Implement profile view tracking (who viewed my profile) | P1 | ⬜ |
| 7 | Add infinite scroll / pagination for feed | P1 | ⬜ |
| 8 | Build filter sidebar/drawer for advanced search | P0 | ⬜ |
| 9 | **Professionals feed** — separate tab/filter for verified professionals | P1 | ⬜ |
| 10 | Real-time "Recently Active" from actual user sessions | P2 | ⬜ |

---

## 👤 My Profile (`/profile`)
| # | Task | Priority | Status |
|---|---|---|---|
| 1 | Display actual uploaded photos instead of placeholders | P0 | ⬜ |
| 2 | Add profile completion percentage indicator | P1 | ⬜ |
| 3 | Show "Verified" badge logic (based on ID upload status) | P1 | ⬜ |
| 4 | Add partner preference summary section | P1 | ⬜ |
| 5 | Add horoscope/kundali data display | P2 | ⬜ |

---

## ✏️ Edit Profile (`/discover/edit-profile`)
| # | Task | Priority | Status |
|---|---|---|---|
| 1 | Photo upload — integrate Cloudinary / UploadThing | P0 | ⬜ |
| 2 | Add client-side validation (age range, required fields) | P1 | ⬜ |
| 3 | Add partner preferences tab (desired age, height, education, etc.) | P0 | ⬜ |
| 4 | Add kundali/horoscope data fields (Rashi, Nakshatra, birth time, place) | P1 | ⬜ |
| 5 | Optimistic save with `useOptimistic` for instant UI feedback | P2 | ⬜ |
| 6 | Unsaved changes warning on navigation | P2 | ⬜ |

---

## 🔐 Auth Pages (`/login`, `/register`)
| # | Task | Priority | Status |
|---|---|---|---|
| 1 | Add Google OAuth login | P1 | ⬜ |
| 2 | Add phone number OTP login | P0 | ⬜ |
| 3 | Email verification flow after registration | P0 | ⬜ |
| 4 | Password reset / forgot password flow | P0 | ⬜ |
| 5 | Rate limiting on auth endpoints | P1 | ⬜ |

---

## 🧭 Onboarding Wizard (ProfileWizard)
| # | Task | Priority | Status |
|---|---|---|---|
| 1 | Add photo upload step in wizard | P0 | ⬜ |
| 2 | Add partner preference step | P0 | ⬜ |
| 3 | Add kundali / horoscope step | P1 | ⬜ |
| 4 | Save progress to DB on each step (resume capability) | P1 | ⬜ |

---

## 💬 Messaging (NEW — not built yet)
| # | Task | Priority | Status |
|---|---|---|---|
| 1 | Build `/messages` page with conversation list | P0 | ⬜ |
| 2 | Real-time chat with Socket.io or Pusher | P1 | ⬜ |
| 3 | Read receipts and typing indicators | P2 | ⬜ |
| 4 | Block/report functionality | P0 | ⬜ |

---

## ❤️ Matches (`/matches` — not built yet)
| # | Task | Priority | Status |
|---|---|---|---|
| 1 | Build `/matches` page — interests sent/received | P0 | ⬜ |
| 2 | Accept/reject interest flow | P0 | ⬜ |
| 3 | Mutual match notification | P1 | ⬜ |
| 4 | Match history and stats | P2 | ⬜ |

---

## ⚙️ Settings (`/settings` — not built yet)
| # | Task | Priority | Status |
|---|---|---|---|
| 1 | Build `/settings` page — account, privacy, notifications | P1 | ⬜ |
| 2 | Change password | P0 | ⬜ |
| 3 | Privacy controls (hide profile, who can contact) | P1 | ⬜ |
| 4 | Notification preferences (email, push) | P2 | ⬜ |
| 5 | Delete account flow | P1 | ⬜ |

---

## 💎 Elite Matrimony (`/elite`)
| # | Task | Priority | Status |
|---|---|---|---|
| 1 | Build detailed elite service page with plans | P2 | ⬜ |
| 2 | Contact form / booking for personal matchmaker | P2 | ⬜ |
| 3 | Stripe/Razorpay payment integration | P2 | ⬜ |

---

## 📄 Info Pages (`/about`, `/contact`, `/faq`, `/privacy`, `/terms`, `/safety`)
| # | Task | Priority | Status |
|---|---|---|---|
| 1 | Finalize real content for About Us page | P2 | ⬜ |
| 2 | Wire contact form to email service (SendGrid/Resend) | P1 | ⬜ |
| 3 | Add more FAQs based on user feedback | P3 | ⬜ |
| 4 | Legal review of privacy/terms pages | P2 | ⬜ |

---

## 🛠️ API & Infrastructure
| # | Task | Priority | Status |
|---|---|---|---|
| 1 | `GET /api/profiles/search` — paginated, filtered profile search | P0 | ⬜ |
| 2 | `POST /api/interests` — send/accept/reject interest | P0 | ⬜ |
| 3 | `POST /api/upload` — photo upload endpoint | P0 | ⬜ |
| 4 | `GET /api/matches` — mutual matches list | P0 | ⬜ |
| 5 | `GET /api/notifications` — user notifications | P1 | ⬜ |
| 6 | Add Redis caching for frequently accessed profiles | P2 | ⬜ |
| 7 | Set up Vercel CRON for daily match suggestions email | P2 | ⬜ |
| 8 | Add Sentry error monitoring | P1 | ⬜ |
| 9 | Add analytics (PostHog / Google Analytics) | P1 | ⬜ |
| 10 | CI/CD: Add GitHub Actions for lint + build check on PR | P1 | ⬜ |

---

## 📱 Mobile App (Future)
| # | Task | Priority | Status |
|---|---|---|---|
| 1 | React Native or Flutter app setup | P3 | ⬜ |
| 2 | Push notifications integration | P3 | ⬜ |
| 3 | App Store / Play Store submission | P3 | ⬜ |

---

> [!NOTE]
> **Priority Guide:** P0 = Must have (launch blocker), P1 = Should have (week 1 post-launch), P2 = Nice to have, P3 = Future/deferred
