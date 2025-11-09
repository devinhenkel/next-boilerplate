# Next.js + Tailwind + shadcn/ui Boilerplate

Modern Next.js starter featuring Tailwind CSS v4, shadcn/ui primitives, and ready-to-ship defaults for building polished products fast.

## Features

- Next.js 16 App Router with React 19 and TypeScript
- Tailwind CSS v4 with CSS variables wired for light/dark theming
- shadcn/ui registry initialized with button, badge, card, input, label, and textarea components
- Vercel AI SDK wired to an OpenAI-backed chat route with a streaming UI demo (`ai`, `@ai-sdk/react`, `@ai-sdk/openai`)
- ESLint configured for React 19 + Next.js best practices
- Example landing page showcasing shadcn/ui usage and layout patterns

## Getting Started

Install dependencies (if needed) and run the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site. Edit `src/app/page.tsx` to start customizing.

## Working with shadcn/ui

- Add more components any time: `npx shadcn@latest add accordion avatar toast`
- Component source lives under `src/components/ui/*` so you can extend or theme them freely
- Utility helper `cn` is available in `src/lib/utils.ts` for composing class names

## AI Chat Setup

- Install dependencies (already included): `ai`, `@ai-sdk/react`, `@ai-sdk/openai`
- Set your `OPENAI_API_KEY` in `.env.local` (optionally `OPENAI_MODEL`, default `gpt-4o-mini`)
- Call the streaming chat route at `src/app/api/chat/route.ts` or use the built-in demo component on the home page (`ChatDemo`)

## Project Structure

- `src/app` – App Router entrypoints, layout, and global styles
- `src/components/ui` – shadcn/ui component library
- `src/lib` – shared utilities
- `public` – static assets

## Scripts

- `npm run dev` – local development
- `npm run build` – production build
- `npm run start` – production server
- `npm run lint` – lint the codebase with ESLint

## Deployment

Deploy directly to [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) or your preferred platform. Review the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying) for platform-specific instructions.
