# AutomateNow

**Automate Work. Accelerate Growth.**

AutomateNow is an early-stage automation and workflow platform currently being built on the bleeding edge of the React/Next.js ecosystem.

## Status

The project is scaffolded and configured with production-grade tooling and integrations, but **application-level features are under active development**. The home page and Sentry example page are the only routes serving content so far.

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

- **Sentry** — Error monitoring with session replay, performance tracing, and user feedback
- **Vercel** — Deployed with Analytics & Speed Insights
- **Supabase** — PostgreSQL database provisioned (integration in progress)

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
