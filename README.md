# AutomateNow

AutomateNow - Automate Work. Accelerate Growth.

Built with **Next.js 16** (canary), **React 19**, **Tailwind CSS v4**, **shadcn/ui** (Radix Nova), and **TypeScript**.

## Getting started

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---|---|
| `bun dev` | Start dev server |
| `bun run build` | Build for production |
| `bun run start` | Start production server |
| `bun run lint` | Lint with Biome |
| `bun run format` | Format with Biome |
| `bun run typecheck` | Run TypeScript type checking |

## Adding shadcn/ui components

```bash
bunx --bun shadcn@latest add button
```

Components are placed in `components/ui/` and imported as:

```tsx
import { Button } from "@/components/ui/button";
```

## Stack

- **Framework**: Next.js 16 (canary)
- **UI**: React 19, shadcn/ui (Radix Nova)
- **Styling**: Tailwind CSS v4, CSS variables (oklch)
- **Icons**: Tabler Icons
- **Tooling**: Biome (linter + formatter), TypeScript (strict), Bun
