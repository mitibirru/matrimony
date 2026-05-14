# Matrimony App: Requirements & Scope Plan

## 1. Project Overview
A premium, dual-tier matrimony platform catering primarily to the **Telugu** and **Marathi** communities. The application serves two distinct user bases:
1.  **General Matrimony:** For the broader community seeking traditional matchmaking.
2.  **Elite/Professional Matrimony:** An exclusive tier tailored for high-net-worth individuals, entrepreneurs, and highly-paid professionals seeking curated, premium matches.

The platform will focus on high-end aesthetics, trust, authenticity, and a seamless user experience.

## 2. Core Features (Phase 1 Scope - Front-of-Site)
Drawing inspiration from top-tier platforms (EliteMatrimony, Sangam, VIP Shaadi), Phase 1 will focus on the essential public-facing pages necessary to establish trust and capture registrations for both tiers.

**Necessary Pages to Build:**
1.  **Homepage (`/`)**: Main landing page with hero section, clear call-to-actions for both "General" and "Elite" tiers, featured success stories, and search widget.
2.  **Registration/Signup Page (`/register`)**: Multi-step onboarding form to capture detailed profiles (essential for accurate matchmaking).
3.  **Login Page (`/login`)**: Secure access for returning users.
4.  **Elite Services Landing Page (`/elite`)**: A dedicated, highly premium landing page explaining the benefits of the VIP/Professional matchmaking service (dedicated matchmakers, strict verification, confidentiality).
5.  **About Us (`/about`)**: Company vision, highlighting the focus on Telugu/Marathi communities and the dual-tier model.
6.  **Contact Us (`/contact`)**: Support forms, office addresses, and customer service details.
7.  **Membership/Pricing Plans (`/plans`)**: Clear breakdown of free vs. premium vs. elite memberships.
8.  **Success Stories (`/success-stories`)**: Testimonials to build credibility.
9.  **Legal Pages (`/privacy`, `/terms`)**: Essential for user trust and data protection.

## 3. Technology Stack
*   **Framework:** Next.js (React) - For SEO, performance, and robust routing.
*   **Styling:** TailwindCSS / Vanilla CSS (with a highly customized design system).
*   **State Management:** React Context / Zustand.

---

## 4. Design System & Color Palette

Based on the selections provided and the premium nature of the "Elite" and "Sangam" style competitors, here is the recommended approach combining **Vibrancy (Tradition)** with **Deep Tones (Luxury)**.

### Recommended Palette: "PremaJodi" (Adapted from User Selections #2 & #4)
To successfully cater to both general and elite audiences, we will use a sophisticated palette that combines rich, traditional wedding warmth with deep, luxurious tones.

*   **Primary (Luxury & Elite focus):** Deep Purple / Midnight (`#240046` or `#390099`) - Used for headers, Elite sections, and premium branding.
*   **Secondary (Tradition & Action):** Rich Crimson / Pink-Red (`#ff0054` or `#9e0059`) - Used for primary buttons, highlights, and the general matrimony sections.
*   **Accent (Premium Polish):** Warm Gold / Amber (`#ffbd00`) - Used for premium badges, stars, icons, and subtle borders.
*   **Backgrounds:** 
    *   *General:* Clean White (`#FFFFFF`) to Off-White (`#FAFAFA`)
    *   *Elite Tier:* Dark Purple-Black (`#10002b`) for a highly exclusive, VIP feel.
*   **Text:** Dark Charcoal (`#1A1A1A`) on light backgrounds, Off-White (`#F8F9FA`) on dark backgrounds.

*(This palette leverages the warmth of palette #2 and the premium depth of palette #4, perfectly hitting the mark between "Sangam/Shaadi" and "Elite/VIP")*

---

## Next Steps
1.  **Initialize Project Design System:** Setup Next.js with these color variables in `globals.css` / `tailwind.config.ts`.
2.  **Build Phase 1 Layout:** Create the global Header/Navbar and Footer.
3.  **Develop Pages Iteratively:**
    *   Build Homepage (`/`)
    *   Build Elite Landing (`/elite`)
    *   Build Registration (`/register`)
    *   Build Contact (`/contact`)
