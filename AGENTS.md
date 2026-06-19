<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project Overview

**AutomateNow** — an early-stage automation and workflow platform. AI-powered workflows, no-code automation, and a visual builder.

- **Stack:** Next.js 16 (canary), React 19, shadcn/ui (Radix Nova), Tailwind CSS v4, TypeScript (strict), Biome v2, Bun
- **Integrations:** Supabase (auth + DB), Sentry (error monitoring), Vercel (deployment)
- **Design:** Warm gold/honey amber primary, Source Sans 3 + Geist Mono, dark/light mode via next-themes

# Development Workflow

## Commands

| Command | Action |
|---|---|
| `bun dev` | Start dev server |
| `bun run build` | Production build |
| `bun run lint` | Biome check (always run before commit) |
| `bun run format` | Biome format --write |
| `bun run typecheck` | tsc --noEmit (always run before commit) |

## Branch Strategy

- Branch from `main` for feature work
- Branch name pattern: `{scope}-{feature}` (e.g. `supabase-auth-and-landing-page`)
- PRs merge back into `main`

## Code Quality

- **Primary linter/formatter:** Biome (check before every commit)
  - Recommended rules + next + react domains enabled
  - VCS integration on (respects .gitignore)
- **TypeScript:** Strict mode, `tsc --noEmit` before commit
- **Secondary linter:** ESLint with `eslint-config-next`
- **No test runner configured yet**

## Project Structure

```
├── app/                    # Next.js App Router pages & API routes
│   ├── (root)/             # Reserved route group
│   ├── api/                # API routes
│   └── layout.tsx          # Root layout (ThemeProvider, Analytics, fonts)
├── components/
│   └── ui/                 # shadcn/ui components (do not edit by hand)
├── hooks/                  # React hooks (empty, add as needed)
├── lib/
│   ├── supabase/           # Supabase client & server helpers
│   ├── utils.ts            # Utility functions (cn, etc.)
├── public/                 # Static assets, images
├── supabase/
│   ├── config.toml         # Local Supabase config
│   └── migrations/         # DB migrations
├── AGENTS.md               # This file
├── biome.json              # Biome configuration
├── database.types.ts       # Auto-generated Supabase types
├── env.ts                  # Runtime env validation (t3-env + arktype)
└── proxy.ts                # Next.js middleware (Supabase session)
```

## Conventions

- **Imports:** Use `@/` path alias (e.g. `@/components/ui/button`)
- **shadcn/ui components:** Installed via `bunx --bun shadcn@latest add <name>`, placed in `components/ui/`, never edited directly
- **Supabase types:** Auto-generated in `database.types.ts`, do not edit by hand
- **Contributing:** No formal process yet; open PRs, keep changes focused
