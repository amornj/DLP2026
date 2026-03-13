# DLP2026

Clinician-facing web app based on the **2026 ACC/AHA guideline on the management of dyslipidemia**.

## Features
- **Diagnosis / Evaluation** — screening, lipid measurements, apoB, Lp(a), secondary causes
- **Risk Stratification** — PREVENT, risk enhancers, CAC, severe hypercholesterolemia / FH, diabetes, ASCVD
- **Management** — lifestyle, statins, ezetimibe, PCSK9 therapies, inclisiran, bempedoic acid, triglycerides, residual risk
- **Special Scenarios** — children, pregnancy, CKD, older adults, inflammatory disease, complex-care situations
- **Calculators** — LDL/non-HDL target helper and triglyceride severity categorizer
- **Ask NotebookLM** — grounded Q&A via your DLP2026 NotebookLM notebook

## Tech Stack
Next.js 14 · TypeScript · Tailwind CSS · Zustand · react-markdown

## Environment Variables
```bash
NLM_PROXY_URL=<proxy endpoint>
NLM_PROXY_KEY=<api key>
NLM_NOTEBOOK_ID=d06ca6ae-e7f2-451b-ba7a-d40eb1138d0f
```

## Local Development
```bash
npm install
npm run dev
```

## Production Build
```bash
npm run build
npm run start
```

## Deploy to Vercel
Set these environment variables in Vercel project settings:
- `NLM_PROXY_URL`
- `NLM_PROXY_KEY`
- `NLM_NOTEBOOK_ID`

## Disclaimer
This tool is for educational and clinician-reference use only. It does not replace clinical judgment, local protocols, or shared decision-making with patients.
