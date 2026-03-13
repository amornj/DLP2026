# DLP2026 — Echo Deploy-Prep Checklist

Generated: 2026-03-14

## 1. GitHub Remote
- [x] Remote: `https://github.com/amornj/DLP2026.git` (public, connected)
- [x] Repo exists on GitHub: `amornj/DLP2026`
- [ ] Initial commit pushed to `main`

## 2. NotebookLM
- [x] Notebook found: **DLP2026**
- **Notebook ID:** `d06ca6ae-e7f2-451b-ba7a-d40eb1138d0f`
- Sources: 1

## 3. Must-Have Files (based on amyloidosis reference)

### Config / Root
- [ ] `package.json` — Next.js 14+, React 18, Tailwind, Zustand, react-markdown, TypeScript
- [ ] `next.config.js`
- [ ] `tsconfig.json`
- [ ] `tailwind.config.ts`
- [ ] `postcss.config.js`
- [ ] `.gitignore` (node_modules, .next, .env*, .vercel, next-env.d.ts)
- [ ] `CLAUDE.md` — project guide for AI-assisted dev

### Source
- [ ] `src/app/layout.tsx` — root layout
- [ ] `src/app/page.tsx` — home page
- [ ] `src/app/globals.css` — Tailwind + custom CSS
- [ ] `src/components/Navigation.tsx` — sidebar/hamburger nav
- [ ] `src/store/appStore.ts` — Zustand tab state
- [ ] `src/store/chatStore.ts` — chat message state
- [ ] `src/app/api/notebooklm/route.ts` — NLM proxy API route
- [ ] `src/app/ask/page.tsx` — AI chat page
- [ ] Topic-specific page routes (TBD based on DLP2026 content)

### Public Assets
- [ ] `public/images/` — clinical images as needed

## 4. Environment Variables (Vercel)
| Variable | Purpose |
|----------|---------|
| `NLM_PROXY_URL` | NotebookLM proxy endpoint |
| `NLM_PROXY_KEY` | API key for NLM proxy |
| `NLM_NOTEBOOK_ID` | `d06ca6ae-e7f2-451b-ba7a-d40eb1138d0f` |

## 5. Vercel Deploy
- [ ] Link project with `vercel link` or Vercel dashboard
- [ ] Set env vars in Vercel project settings
- [ ] Connect GitHub repo for auto-deploy from `main`
- [ ] Verify `npm run build` passes before first deploy
