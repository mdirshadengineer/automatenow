# AutomateNow

**Automate Work. Accelerate Growth.**

AutomateNow is an early-stage automation and workflow platform built on the bleeding edge of the React/Next.js ecosystem. AI-powered workflows, no-code automation, and a visual builder — all being built in public.

## Status

Scaffolded and configured with production-grade tooling. Application features are under active development.

| Feature | Status |
|---|---|
| Authentication (full flow) | ✅ Complete |
| Auth pages (login / signup / forgot-password / update-password / confirm / callback) | ✅ Complete |
| Auth queries, mutations, validation (TanStack Query + Arktype + Sentry) | ✅ Complete |
| Middleware session protection | ✅ Complete |
| Landing page | 🔜 In progress |
| Dark / light / system theme | ✅ Done |
| Sentry error monitoring (Replay, Feedback, tracing) | ✅ Complete |
| Developer tooling (Biome, typecheck, React Query devtools) | ✅ Configured |
| Database schema & migrations | 📋 Planned |
| Dashboard / app shell (post-login) | 📋 Planned |
| Workflow builder | 📋 Planned |

## Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (canary) |
| **UI** | [React 19](https://react.dev/), [shadcn/ui](https://ui.shadcn.com/) (Radix Nova), [Tabler Icons](https://tabler.io/icons) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/), oklch CSS variables |
| **Language** | [TypeScript](https://www.typescriptlang.org/) (strict) |
| **Runtime** | [Bun](https://bun.sh/) |
| **Linter / Formatter** | [Biome](https://biomejs.dev/) v2.x |
| **Animation** | `tw-animate-css` |

## Integrations

- **Supabase** — Auth (session middleware, server + browser clients), PostgreSQL
- **Sentry** — Error monitoring with session replay, performance tracing
- **Vercel** — Deployed with Analytics & Speed Insights

## Scripts

| Command | Description |
|---|---|
| `bun dev` | Start dev server |
| `bun run build` | Build for production |
| `bun run start` | Start production server |
| `bun run lint` | Lint with Biome |
| `bun run format` | Format with Biome |
| `bun run typecheck` | Run TypeScript type checking |

## Design System

- **Primary color:** Warm gold / honey amber (oklch color space)
- **Fonts:** Source Sans 3 (body) + Geist Mono (code)
- **Theme:** Dark/light mode via `next-themes`, toggle with <kbd>d</kbd> key

## Adding shadcn/ui components

```bash
bunx --bun shadcn@latest add button
```

Components are placed in `components/ui/` and imported as:

```tsx
import { Button } from "@/components/ui/button";
```
