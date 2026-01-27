# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Super One is a personal brand website monorepo for a "Super Individual" (solopreneur/one-person company), inspired by Apple's official website design philosophy. Built following the front-architect specification with bun workspaces.

## Tech Stack

### Monorepo Structure
- **Package Manager**: bun + workspaces
- **Linting**: Oxlint (replaces ESLint)
- **Formatting**: Biome
- **Pre-commit**: Husky + lint-staged
- **Language**: TypeScript

### User App (apps/web)
- **Framework**: Next.js 15+ (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Theming**: next-themes

### Shared Packages
- `@super-one/ui`: Shared UI components (Reveal, StaggerContainer)
- `@super-one/utils`: Shared utilities (cn, clsx)
- `@super-one/config`: Shared TypeScript configs

## Commands

```bash
# Development
bun dev              # Start web dev server (localhost:3000)
bun dev:web          # Same as above
bun dev:admin        # Start admin dev server (when available)

# Build
bun run build        # Build all packages
bun run build:web    # Build web app only

# Quality
bun run lint         # Run Oxlint
bun run lint:fix     # Run Oxlint with auto-fix
bun run format       # Format with Biome
bun run typecheck    # TypeScript check all packages

# Maintenance
bun run clean        # Remove all node_modules and build artifacts
```

## Project Structure

```
super-one/
├── apps/
│   └── web/                    # Next.js user app
│       ├── src/
│       │   ├── app/            # App Router pages
│       │   ├── components/
│       │   │   ├── layout/     # Navbar, Footer
│       │   │   ├── sections/   # Hero, About, Services, etc.
│       │   │   ├── ui/         # App-specific UI
│       │   │   └── providers/  # Theme provider
│       │   ├── hooks/          # Custom hooks
│       │   ├── lib/            # Utilities
│       │   └── data/           # Content config
│       └── public/             # Static assets
├── packages/
│   ├── ui/                     # Shared UI components
│   │   └── src/
│   │       ├── reveal.tsx      # Animation components
│   │       └── index.ts
│   ├── utils/                  # Shared utilities
│   │   └── src/
│   │       └── index.ts        # cn, clsx exports
│   └── config/                 # Shared configs
│       └── tsconfig/           # TypeScript configs
├── package.json                # Root workspace config
├── tsconfig.json               # Root TypeScript config
├── oxlint.json                 # Oxlint config
├── biome.json                  # Biome formatter config
└── .husky/                     # Git hooks
```

## Design Principles

- **Apple-style aesthetics**: Minimalist, clean, premium feel
- **Large typography**: Bold headings, elegant font pairings
- **Smooth animations**: Scroll-triggered reveals, parallax effects
- **Dark/Light mode**: System-aware theme switching
- **Bento grid layout**: Apple-style feature showcase
- **Glass effects**: Backdrop blur for floating elements

## Adding Shared Components

1. Create component in `packages/ui/src/`
2. Export from `packages/ui/src/index.ts`
3. Import in apps: `import { Component } from "@super-one/ui"`

## Adding New Apps

1. Create app in `apps/<name>/`
2. Add `package.json` with name `@super-one/<name>`
3. Reference workspace packages: `"@super-one/ui": "workspace:*"`
4. Extend shared tsconfig: `"extends": "../../packages/config/tsconfig/..."`

## Quality Standards

- Oxlint for linting (faster than ESLint)
- Biome for formatting (faster than Prettier)
- TypeScript strict mode enabled
- Pre-commit hooks run lint-staged automatically
