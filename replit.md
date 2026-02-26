# Womandla - Next.js App

## Project Overview

A Next.js 15 (with Turbopack) application using React 19 and Tailwind CSS 4.

## Stack

- **Framework**: Next.js 16.1.6
- **Runtime**: Node.js 20
- **UI**: React 19 + Tailwind CSS 4
- **Language**: TypeScript

## Project Structure

- `app/` - Next.js App Router pages and layouts
- `public/` - Static assets

## Development

```bash
npm run dev -- --port 5000 --hostname 0.0.0.0
```

Runs on `http://0.0.0.0:5000`.

## Configuration

- `next.config.ts` - Next.js config with `allowedDevOrigins: ["*"]` for Replit proxy compatibility
- `tsconfig.json` - TypeScript configuration
- `postcss.config.mjs` - PostCSS for Tailwind

## Deployment

Configured for autoscale deployment:
- Build: `npm run build`
- Run: `npm run start`
