# SnapLayout

SnapLayout is a production-ready Next.js V1 that turns website screenshots into editable structured layouts and exportable React + Tailwind starter code.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Zod
- OpenAI SDK
- Vitest + Testing Library
- Playwright

## Routes

- `/` landing page
- `/pricing` pricing page
- `/app` screenshot analysis workspace
- `POST /api/analyze` analysis endpoint

## Local setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy environment variables:

   ```bash
   copy .env.example .env.local
   ```

3. Start development:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000).

## Environment configuration

- `OPENAI_API_KEY`: optional for live analysis. If omitted, the app runs in demo mode.
- `OPENAI_ANALYSIS_MODEL`: OpenAI vision/text model used for structured screenshot analysis.
- `OPENAI_CODEGEN_MODEL`: OpenAI model used for initial starter-code generation.
- `ANALYSIS_TIMEOUT_MS`: server timeout for the live pipeline.
- `RATE_LIMIT_WINDOW_MS`: rolling in-memory rate-limit window.
- `RATE_LIMIT_MAX_REQUESTS`: max analyze requests per IP inside the configured window.
- `NEXT_PUBLIC_MAX_UPLOAD_SIZE_MB`: UI-facing upload limit display.

## Demo mode

If `OPENAI_API_KEY` is missing, the `/app` workflow still works end to end:

- image upload and preview still work
- analyze returns a realistic mock layout project
- preview rendering and structured editing still work
- export panel still regenerates code from edits

## Scripts

- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm test`
- `npm run test:e2e`

## Architecture overview

- `app/`: routes, layout, API handlers
- `components/`: UI, marketing surfaces, and workspace components
- `lib/ai/`: prompts, OpenAI client, screenshot analysis flow
- `lib/schemas/`: Zod contracts for layout/project data
- `lib/rendering/`: preview style presets
- `lib/export/`: deterministic React + Tailwind exporter
- `lib/persistence/`: local storage adapter

## Deployment

SnapLayout is prepared for Vercel:

1. Push the project to a Git repository.
2. Import it into Vercel as a Next.js project.
3. Add environment variables from `.env.example`.
4. Deploy with the default Node runtime.

Deployment assumptions:

- no server-side database is required for V1
- project persistence is browser-local via localStorage
- the analyze rate limiter is in-memory and therefore instance-local

## Limitations and recommended next steps

- The rate limiter is intentionally lightweight and should move to a shared store for multi-instance production traffic.
- Demo mode uses fixed mock output rather than image-aware local analysis.
- Export generation after edits is deterministic and local; adding an explicit “refresh with AI” action would be the next premium enhancement.
- Billing, authentication, and multi-project persistence are intentionally out of scope for this release.
