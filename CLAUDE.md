# DLP2026 — Development Guide

## Project Overview
Clinician-facing Next.js app encoding the **2026 ACC/AHA/AACVPR/ABC/ACPM/ADA/AGS/APhA/ASPC/NLA/PCNA Guideline on the Management of Dyslipidemia**.

The app is designed for fast bedside use and mirrors the overall project structure/style of the `amyloidosis` app.

## Tech Stack
- Next.js 14+ (App Router), TypeScript, Tailwind CSS
- Zustand + persist (localStorage) for lightweight UI state
- react-markdown for AI chat rendering
- No auth, no database — client-side only

## Routes
| Route | Purpose |
|---|---|
| `/` | Home / top take-home messages / workflow / navigation cards |
| `/diagnosis` | Evaluation, screening, lipid measurements, apoB / Lp(a), secondary causes |
| `/classification` | PREVENT risk, risk enhancers, CAC, severe LDL / FH, diabetes / ASCVD |
| `/treatment` | Lifestyle, LDL-lowering, triglycerides, residual risk, intolerance, monitoring |
| `/specialists` | Special scenarios: children, pregnancy, CKD, older adults, inflammatory disease, complex care |
| `/calculator` | LDL goal helper + triglyceride severity categorizer |
| `/ask` | NotebookLM-backed Q&A |

## Key Files
- `src/components/Navigation.tsx` — shared nav shell
- `src/store/appStore.ts` — tab state for major routes
- `src/store/chatStore.ts` — NotebookLM chat history + mode
- `src/app/api/notebooklm/route.ts` — proxy bridge to NotebookLM

## NotebookLM Configuration
Environment variables:

```bash
NLM_PROXY_URL=<same proxy used by the other projects>
NLM_PROXY_KEY=<same proxy key used by the other projects>
NLM_NOTEBOOK_ID=d06ca6ae-e7f2-451b-ba7a-d40eb1138d0f
```

Notebook name: `DLP2026`

## Build / Run
```bash
npm install
npm run dev
npm run build
npm run start
```

## Deployment
- GitHub repo: `https://github.com/amornj/DLP2026.git`
- Vercel deploys from the connected repo
- Required Vercel env vars: `NLM_PROXY_URL`, `NLM_PROXY_KEY`, `NLM_NOTEBOOK_ID`

## Content Notes
- This app is a practical decision-support summary, not a full line-by-line reproduction of the guideline.
- Goal emphasis: clinician usability, fast triage, treatment thresholds, and special-scenario branching.
