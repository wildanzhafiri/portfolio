# Wildan's Portfolio

Interactive personal portfolio built with React, TypeScript, and Vite. This project highlights selected work, experience, tech stack, and contact information in a motion-heavy interface with custom UI interactions and dedicated project detail pages.

## Overview

This portfolio is designed as a modern single-page experience with:

- animated hero section
- smooth scrolling and scroll-triggered reveals
- interactive project cards and detail pages
- custom cursor and magnetic button interactions
- optional 3D visuals for capable devices
- static-friendly routing for portfolio deployment

The content is mostly data-driven through files inside `src/data`, which makes it easier to update projects, experience, and tech stack without rewriting section components.

## Features

- `Hero` section with animated typography, CTA buttons, and optional 3D scene
- `About`, `Tech Stack`, `Experience`, `Projects`, `Playground`, and `Contact` sections
- project detail page with gallery, feature list, tech stack tags, and previous/next navigation
- splash screen and custom cursor for stronger first impression
- smooth scrolling with Lenis and motion effects powered by GSAP + Framer Motion
- lazy-loaded pages and scenes to keep the initial experience lighter
- static asset organization under `public/` for screenshots, images, and resume files

## Tech Stack

### Core

- React 19
- TypeScript
- Vite
- React Router

### UI and Animation

- Tailwind CSS v4
- Framer Motion
- GSAP
- Lucide React
- Lenis
- Zustand

### 3D and Media

- Three.js
- React Three Fiber
- Drei
- vite-imagetools

### Tooling

- ESLint
- rollup-plugin-visualizer
- vite-plugin-compression

## Getting Started

### Prerequisites

- Node.js 18+ recommended
- npm

### Installation

```bash
npm install
```

### Run in Development

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

### Analyze Bundle

```bash
npm run analyze
```

## Available Scripts

- `npm run dev`: start local Vite development server
- `npm run build`: run TypeScript build and generate production bundle
- `npm run preview`: preview the production build locally
- `npm run lint`: run ESLint across the project
- `npm run analyze`: inspect bundle output


## Performance Notes

- pages and 3D scenes are lazy-loaded
- build output is compressed with gzip and Brotli
- manual chunk splitting is configured for major libraries
- images can be optimized through `vite-imagetools`

