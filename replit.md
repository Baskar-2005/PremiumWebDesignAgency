# Digital Shine — Agency Landing Page

A polished single-page agency/portfolio website built with React, Vite, TypeScript, Tailwind CSS v4, and Framer Motion.

## Stack

- **Framework**: React 19 + TypeScript
- **Build tool**: Vite 8
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion 12
- **Package manager**: pnpm

## Running the project

```bash
PORT=5000 pnpm run dev
```

The workflow **"Start application"** is configured to run this automatically.

## Sections

Hero → About → Services → WhyUs → TechStack → Projects → Process → Testimonials → Numbers → FAQ → Contact → Footer

## Project structure

```
src/
  App.tsx              # Root layout, cursor follower, scroll progress
  components/          # One file per section (Hero, About, Services, …)
  index.css            # Global styles & Tailwind directives
  main.tsx             # React entry point
.figma/make/           # Figma Make metadata (site config, fonts, etc.)
vite.config.ts         # Vite + Tailwind + Figma plugins; port from $PORT
```

## User preferences

_None recorded yet._
