# Skill Genz — Frontend

> **SIH26044** · Ministry of AYUSH / AIIA · Smart India Hackathon 2026

Modern React application for **Skill Genz** — Skill mapping, AI gap analysis, explainable job matching, and digital portfolios integrated with Spring Boot + MongoDB + Ollama.

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| **React 19** + **Vite** | UI framework & build tool |
| **React Router v7** | Client-side routing |
| **Tailwind CSS v4** | Styling (purple theme) |
| **Framer Motion** | Animations & transitions |
| **Recharts** | Dashboard analytics charts |
| **Lucide React** | Icons |
| **Zustand** | Global state (role, mock auth) |

---

## Quick Start

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

**Demo login:** Go to `/login` → pick a role → click **Enter Demo Dashboard**

---

## Theme

The UI uses a **purple/violet** design system defined in:

- `tailwind.config.js` — Tailwind color tokens (`brand-*`, `surface-*`, `ink-*`)
- `src/theme/tokens.js` — Shared tokens for Recharts and inline styles
- `src/index.css` — Base styles, shimmer loaders, selection colors

Primary accent: `#a855f7` (purple-500)

---

## Project Structure

```text
src/
├── components/
│   ├── layout/     Navbar, Sidebar, MobileNav, DashboardLayout
│   ├── ui/         Button, Card, Badge, Modal, Skeleton, EmptyState, StatCard
│   └── charts/     (reserved for shared chart wrappers)
├── config/         navConfig.js — role-based navigation items
├── data/           Mock JSON — API-shaped responses per role
├── features/       Feature modules (reserved for Step 2+ extraction)
├── lib/            Utilities (cn helper)
├── pages/          Route-level page components
├── routes/         AppRoutes, ProtectedRoute
├── store/          Zustand — role, mockUser, loginDemo, logout
└── theme/          Design tokens
```

---

## Routes

| Path | Access | Description |
|------|--------|-------------|
| `/` | Public | Landing page with animated hero & role picker |
| `/login`, `/signup` | Public | Auth UI (demo login, no real backend) |
| `/student/*` | Protected | Student dashboard, assessment, recommendations, applications, portfolio |
| `/industry` | Protected | Industry postings, applicants, analytics |
| `/mentor` | Protected | FDPs, opportunities, mentee progress |
| `/admin` | Protected | Institution analytics & charts |
| `/portfolio/:id` | Public | Shareable student portfolio view |
| `*` | Public | 404 page |

---

## Mock Data Convention

All files under `src/data/` follow this API response shape for easy backend swap:

```json
{
  "success": true,
  "data": { ... },
  "meta": { "total": 0, "page": 1, "limit": 10 }
}
```

Replace JSON imports with `fetch('/api/...')` calls when the backend is ready.

---

## Task Tracker

### ✅ Completed

| # | Task | Status |
|---|------|--------|
| 1 | Scaffold Vite + React + Tailwind project & folder structure | ✅ Done |
| 2 | Configure design tokens (purple theme) | ✅ Done |
| 3 | Shared UI primitives (Button, Card, Badge, Modal, Skeleton, EmptyState, StatCard) | ✅ Done |
| 4 | Animated Landing Page with role picker (Framer Motion) | ✅ Done |
| 5 | React Router skeleton + UI-only ProtectedRoute | ✅ Done |
| 6 | DashboardLayout — role-aware sidebar, navbar, mobile nav | ✅ Done |
| 7 | Mock auth / login screen + demo role switcher | ✅ Done |
| 8 | Zustand store with persist (localStorage) | ✅ Done |
| 9 | Realistic mock JSON data (Indian academic/industry context) | ✅ Done |
| 10 | Student flow — dashboard, skill assessment, recommendations, applications, portfolio | ✅ Done |
| 11 | Industry dashboard — postings, applicants, bar chart | ✅ Done |
| 12 | Mentor dashboard — opportunities feed, mentee progress | ✅ Done |
| 13 | Institution/Admin dashboard — placement pie, skill trends, department charts | ✅ Done |
| 14 | 404 page with purple styling | ✅ Done |
| 15 | Responsive layout (mobile bottom nav, collapsible sidebar) | ✅ Done |

### 🔄 Remaining (Frontend)

| # | Task | Priority |
|---|------|----------|
| 1 | Extract feature logic into `src/features/*` modules | Medium |
| 2 | Post-listing form modal (Industry) with validation UI | Medium |
| 3 | Notification dropdown with mock notifications | Low |
| 4 | Route transition animations (`AnimatePresence`) | Low |
| 5 | Animated number counters on stat cards | Low |
| 6 | Loading skeleton states with simulated `setTimeout` fetch | Medium |
| 7 | Full accessibility audit (ARIA, focus traps, keyboard nav) | Medium |
| 8 | Dark mode variant of purple theme | Low |
| 9 | Unit / integration tests (Vitest + React Testing Library) | Medium |
| 10 | E2E tests (Playwright) for critical flows | Low |

### 🚀 Future Scope

| Area | Description |
|------|-------------|
| **Backend integration** | Replace mock JSON with REST APIs (Node.js Express + Spring Boot services) |
| **Real authentication** | JWT-based auth, role-based access control, secure sessions |
| **Skill matching engine** | Connect to Spring Boot recommendation/matching microservice |
| **AI career assistant** | Chatbot for career guidance, resume tips, interview prep |
| **Document upload** | Resume, certificates, portfolio files with secure storage |
| **Real-time notifications** | WebSocket push for application status updates |
| **Advanced analytics** | Predictive placement readiness, emerging skill forecasting |
| **External integrations** | NPTEL, LinkedIn, certification providers, institutional ERP |
| **PWA / mobile app** | Offline support, push notifications via React Native or Capacitor |
| **Multi-language** | Hindi + English i18n for wider SIH demo reach |

---

## Scripts

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Run oxlint
```

---

## Demo Flow (for judges)

1. Open `/` — see animated purple hero and role cards
2. Click **Student** → login page pre-selects Student role
3. Click **Enter Demo Dashboard** → Student dashboard with charts & recommendations
4. Use navbar **Switch role** dropdown to jump to Industry / Mentor / Admin views
5. Visit `/student/assessment` for the multi-step questionnaire
6. Visit `/student/portfolio` for the shareable profile page

---

## Contributing

Work on a feature branch prefixed with `cursor/` or `feature/`. Follow the existing folder structure and mock-data API shape.

---

<p align="center">
  <b>SIH26044 · Connecting Skills With Opportunities</b><br/>
  Purple theme · Mock-data driven · Backend-ready architecture
</p>
