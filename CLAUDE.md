# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Package Manager
This project uses pnpm as the package manager (migrated from npm). Use pnpm for all package operations.

### Core Commands
- `pnpm dev` - Start development server with Turbopack enabled (Next.js 15.4.5)
- `pnpm build` - Build production application
- `pnpm start` - Start production server
- `pnpm lint` - Run Next.js linting

## Project Architecture

### Framework & Stack
- **Next.js 15.4.5** with App Router architecture
- **React 19.1.0** with modern React features
- **TypeScript 5** with strict mode enabled
- **Tailwind CSS 4** for styling with custom theming
- **Turbopack** for fast development builds

### File Structure
- `app/` - Next.js App Router directory containing:
  - `layout.tsx` - Root layout with Geist fonts and global styling
  - `page.tsx` - Homepage component
  - `globals.css` - Global styles with CSS variables and dark mode support
- `public/` - Static assets (SVG icons, images)
- `next.config.ts` - Next.js configuration (currently minimal)
- `tsconfig.json` - TypeScript configuration with path aliases (`@/*`)

### Styling System
- Uses Tailwind CSS 4 with custom CSS variables defined in globals.css
- Dark mode support via `prefers-color-scheme`
- Custom color tokens: `--background`, `--foreground`
- Geist font family (sans and mono) loaded via `next/font/google`

### Key Configuration
- TypeScript strict mode enabled
- Path alias `@/*` maps to project root
- ES2017 target with modern module resolution
- Next.js plugin integration for enhanced TypeScript support

## Project Overview

### Purpose
"내가 내린 커피 세계 최고 커피" - A one-time website for a coffee meetup group focused on coffee brewing techniques and recipe sharing.

### Core Features
1. **Recipe Browsing** - Display coffee recipes sourced from Google Sheets data
2. **Tutorial Pages** - Static informational pages about coffee brewing methods
3. **AI Recipe Enhancement** - AI-powered suggestions for improving coffee recipes

### Data Sources
- Google Sheets integration for recipe data management
- Static content for tutorial information

### Target Architecture
- Main navigation between recipes and tutorials
- Google Sheets API integration for dynamic recipe content
- AI integration for recipe improvement suggestions
- Responsive design optimized for mobile and desktop viewing