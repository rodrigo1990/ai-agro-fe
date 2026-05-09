# AI-Agro Frontend

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| UI Library | React 19 |
| Styling | Tailwind CSS 4, tailwind-merge |
| HTTP Client | Axios (configured in `src/lib/axios.ts`) |
| Auth | JWT (jose), encrypted cookies, Laravel Sanctum bearer token |
| Charts | ApexCharts + react-apexcharts |
| Calendar | FullCalendar (daygrid, timegrid, list, interaction) |
| Maps | @react-jvectormap/core + world |
| Date Picker | flatpickr |
| Drag & Drop | react-dnd + react-dnd-html5-backend |
| File Upload | react-dropzone |
| Slider | Swiper |
| SVG | @svgr/webpack (SVGs imported as React components) |
| Linting | ESLint 9 |

## Architecture

Next.js App Router with a mix of Server Components and Client Components.

- **Server Actions** (`src/app/actions/`) handle all API calls to the Laravel backend. Never call the backend directly from client components — go through Server Actions.
- **API Routes** (`src/app/api/`) are thin proxies used for client-side fetching when needed.
- **Auth** is managed via two encrypted cookies (`session` and `bearer-token`) set in `src/app/lib/sessions.ts`. The bearer token is forwarded as `Authorization: Bearer <token>` in every backend request.
- **Backend** runs at `http://localhost:80` (Laravel). All endpoints are under `/api/`.

## Project Structure

```
src/
├── app/
│   ├── (admin)/            # Route group: charts, forms, tables, UI elements, calendar, profile
│   ├── (full-width-pages)/ # Error pages
│   ├── actions/            # Server Actions: auth, login, logout, farmers, society
│   ├── api/                # API route handlers (client-facing proxies)
│   ├── auth/               # Login and signup pages
│   ├── dashboard/          # Main dashboard and administration sub-sections
│   └── lib/                # jwt.ts (encrypt/decrypt), sessions.ts (cookie management)
├── components/
│   ├── auth/               # LoginForm, SignUpForm
│   ├── farmers/            # FarmerDetailForm
│   ├── form/               # Generic form primitives (Input, TextArea, Label, Select, etc.)
│   ├── society/            # SocietyForm
│   ├── tables/             # BasicTableOne, Pagination
│   ├── ui/                 # Alert, Badge, Button, Dropdown, Modal, Table, etc.
│   └── ...                 # charts, calendar, ecommerce, layout widgets
├── context/
│   ├── SidebarContext.tsx
│   └── ThemeContext.tsx
├── hooks/                  # useGoBack, useModal
├── icons/                  # SVG icons (imported as React components via @svgr/webpack)
├── layout/                 # AppHeader, AppSidebar, Backdrop, SidebarWidget
└── lib/
    └── axios.ts            # Axios instance (baseURL: http://localhost:80)
```

## Key Routes

| Route | Description |
|---|---|
| `/auth/login` | Login page |
| `/auth/signup` | Signup page |
| `/dashboard` | Main dashboard |
| `/dashboard/administration/farmers` | Farmers list |
| `/dashboard/administration/farmers/[slug]` | Farmer detail / edit |
| `/dashboard/administration/society` | Society form |

## Domain Models

### Society
Represents the user's company profile. One per user. Fields: `business_name`, `tax_id`, `country`, `logo`.

### Farmer
Represents a producer managed by a user. Multiple per user. Fields: `name`, `last_name`, `tax_id`, `external_code`, `notes`.

### Establishments
Represents the establishments managed by a Farmer. Multiple per farmer. Fields: `producer`, `name`, `external_code`, `location`, `latitude`, `longitude`. 

### Plots
Represents the plotes managed by a Farmer and a establishment. Multiple per farmer and establishment.  Fields: `farmer`, `establishment`, `active`, `area`, `latitude`, `longitude`, `external_code` .

## Conventions

- Server components fetch data at render time using `getToken()` and Axios directly.
- Client components (`'use client'`) manage form state with `useState` and submit via Server Actions.
- Loading states use the `Loading` component from `src/app/dashboard/loading.tsx`.
- Success/error feedback uses the `Alert` component (`variant: 'success' | 'error'`).
- Form field components live in `src/components/form/`. Prefer composing from those primitives rather than creating new ones.
