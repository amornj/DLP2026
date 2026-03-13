# DLP2026 — Implementation Brief

> **Source:** 2026 ACC/AHA/AACVPR/ABC/ACPM/ADA/AGS/APhA/ASPC/NLA/PCNA Guideline on the Management of Dyslipidemia
> **Published:** *Circulation* 2026;153:e00–e00
> **Prepared by:** Geo (research/writing worker)
> **Date:** 2026-03-14

---

## Top 10 Take-Home Messages

1. **PREVENT-ASCVD replaces PCE** — Use the new AHA PREVENT equations (ages 30–79) for 10-year ASCVD risk estimation. They incorporate eGFR, HbA1c, and zip-code SDI; remove race as a variable.
2. **CPR Framework** — Calculate risk → Personalize with risk enhancers → Reclassify with CAC scoring when decision is uncertain.
3. **Measure Lp(a) in all adults at least once** — ≥50 mg/dL (125 nmol/L) is elevated; ~20% of the population. Multiplicative with other risk factors.
4. **ApoB is now a recommended treatment target** — alongside LDL-C and non-HDL-C. Especially useful when TG elevated or LDL-C/apoB discordance exists.
5. **Lipoprotein goals are population-specific** — Distinct LDL-C, non-HDL-C, and apoB targets for primary prevention (by risk tier), secondary prevention, severe hypercholesterolemia, diabetes, and very-high-risk ASCVD.
6. **Statin therapy remains first-line** — High-intensity statins (atorvastatin 40–80 mg, rosuvastatin 20–40 mg) for secondary prevention and high-risk primary prevention.
7. **Expanded nonstatin arsenal** — Ezetimibe, bempedoic acid, PCSK9 mAbs (evolocumab, alirocumab), inclisiran, and olezarsen (for FCS) are all incorporated with specific sequencing recommendations.
8. **Severe hypertriglyceridemia gets its own algorithms** — Separate pathways for moderate (150–499 mg/dL), severe (500–999), and very severe (≥1000) TG with pancreatitis prevention focus.
9. **SAMS management algorithm** — Structured approach to statin-attributed muscle symptoms including rechallenge, dose reduction, alternate-day dosing, and nonstatin substitution.
10. **Special populations explicitly addressed** — Children, young adults, older adults, pregnancy/lactation, CKD, HIV (REPRIEVE), heart failure, cancer, chronic inflammatory disease, and diverse ancestry groups.

---

## Suggested Top-Level Navigation

| # | Route | Label | Icon Suggestion |
|---|-------|-------|-----------------|
| 1 | `/` | Home / Overview | 🏠 |
| 2 | `/screening` | Screening & Diagnosis | 🔬 |
| 3 | `/risk` | Risk Stratification | 📊 |
| 4 | `/management` | Management | 💊 |
| 5 | `/special` | Special Populations | 👥 |
| 6 | `/calculator` | Calculators | 🧮 |
| 7 | `/medications` | Medication Reference | 💉 |
| 8 | `/ask` | Ask NotebookLM | 💬 |

---

## Page-by-Page Tab Breakdowns

### 1. Home (`/`)

No tabs. Single-page dashboard with:
- Top 10 take-home messages (expandable cards)
- "What's New in 2026" summary (sourced from Table 1)
- Quick-links to key algorithms (Figures 5, 6, 10, 13, 14, 18)
- Disclaimer banner

### 2. Screening & Diagnosis (`/screening`)

| Tab | Content |
|-----|---------|
| **Lipid Panel** | When to screen (adults ≥20 every 5 yr; children 9–11 & 17–21). Fasting vs nonfasting. TC, LDL-C, HDL-C, TG, non-HDL-C definitions and calculation methods (Friedewald, Martin-Hopkins, Sampson). |
| **ApoB** | When to measure (TG ≥150, diabetes, metabolic syndrome, LDL-C discordance). Target values by population. |
| **Lp(a)** | Measure once in all adults. Units (mg/dL vs nmol/L). Risk thresholds from Table 4: ≥50 mg/dL (125 nmol/L) elevated; ≥80 (200 nmol/L) 2× risk; ≥120 (300 nmol/L) 3× risk; ≥180 (430 nmol/L) ~4× risk. |
| **Secondary Causes** | Table 15: hypothyroidism, nephrotic syndrome, cholestasis, pregnancy, medications (thiazides, steroids, retinoids, etc.). Must exclude before diagnosing primary dyslipidemia. |
| **FH Screening** | Dutch Lipid Clinic Network criteria. Cascade screening. LDL-C ≥190 (adults) / ≥160 (children). Genetic testing indications. |

### 3. Risk Stratification (`/risk`)

| Tab | Content |
|-----|---------|
| **PREVENT-ASCVD** | 10-year risk calculator explanation. Input variables (Table 11): age, sex, SBP, BP Rx, TC, HDL-C, current smoking, diabetes, eGFR, HbA1c (optional), zip-code SDI (optional). Risk categories: Low <3%, Borderline 3–<5%, Intermediate 5–<10%, High ≥10%. Crosswalk table (Table 12) mapping PCE to PREVENT. |
| **CPR Framework** | Figure 5 visual. Step 1: Calculate (PREVENT). Step 2: Personalize (risk enhancers, Table 13). Step 3: Reclassify (CAC when uncertain). |
| **Risk Enhancers** | Table 13 full list: family hx premature ASCVD, metabolic syndrome, CKD stage 3+, chronic inflammatory conditions (RA, psoriasis, lupus, HIV), South Asian ancestry, premature menopause (<40), preeclampsia, elevated Lp(a) ≥50, apoB ≥130, TG ≥175 persistently, hs-CRP ≥2.0, ABI <0.9. |
| **CAC Scoring** | When to use (borderline/intermediate risk, decision uncertainty). Score interpretation: 0 (favorable, may defer Rx), 1–99 (supports statin), ≥100 or ≥75th percentile (confirms statin benefit). Figure 13 algorithm. |
| **Diabetes Risk** | Diabetes-specific risk enhancers (Table 17): duration ≥10 yr, retinopathy, neuropathy, nephropathy (AER ≥30), ABI <0.9. Figure 9 algorithm. |

### 4. Management (`/management`)

| Tab | Content |
|-----|---------|
| **Lifestyle** | AHA Life's Essential 8. Diet (Mediterranean, DASH, plant-based). Physical activity (150 min/wk moderate, 75 min vigorous). Weight management (semaglutide, tirzepatide mentioned). RDN referral criteria. Dietary supplements (omega-3 for TG only). |
| **Primary Prevention** | Figure 6 algorithm. Treatment by risk tier with goals (see Treatment Goals Table below). Benefit-risk discussion (Table 10). |
| **Secondary Prevention** | Very-high-risk criteria. Figure 10 overview, Figures 11-12 detailed algorithms. Maximally tolerated statin → ezetimibe → bempedoic acid → PCSK9 mAb → inclisiran sequencing. Goals: LDL-C <55, non-HDL-C <85, apoB <65. |
| **Severe Hypercholesterolemia** | LDL-C ≥190 mg/dL pathway (Figure 7). HoFH management (Figure 8). Lipoprotein apheresis indications (Table 16). Lomitapide, evinacumab for HoFH. |
| **Hypertriglyceridemia** | Figures 14-17: algorithms by TG severity tier. Moderate (150–499): lifestyle + statin if ASCVD risk elevated. Severe (500–999): fibrate/omega-3 + lifestyle. Very severe (≥1000): very-low-fat diet + fibrate + hospitalize if pancreatitis risk. FCS vs MCS differentiation. Olezarsen for FCS. |
| **Elevated Lp(a)** | Aggressive risk factor control. PCSK9 mAbs for Lp(a) lowering (~15–30%). Apheresis if Lp(a) ≥60 mg/dL with FH + CAD/PAD. Emerging: Lp(a)-specific therapies (mRNA, ASO). |
| **SAMS** | Figure 18 algorithm. Evaluate secondary causes (Table 24: age ≥65, low BMI, female sex, hypothyroidism, CKD, liver disease, DDI). Rechallenge, alternate statin, dose reduction, alternate-day dosing. Nonstatin options if truly intolerant. CAC to guide decision when uncertain. |

### 5. Special Populations (`/special`)

| Tab | Content |
|-----|---------|
| **Children & Adolescents** | Table 18 (pediatric lipid values). Table 19 (pediatric LLT agents/doses). Universal screening ages 9–11 and 17–21. FH cascade. Statins approved ≥8–10 yr for FH. |
| **Young Adults (20–39)** | Lifetime risk assessment. Healthy lifestyle emphasis. Statin if LDL-C ≥190 or FH. PREVENT applicable ≥30. |
| **Older Adults (≥75)** | Continuation of existing statin is reasonable. New initiation: shared decision-making. De-prescribing considerations (frailty, limited life expectancy, polypharmacy). |
| **Pregnancy & Lactation** | Table 20: statins, ezetimibe, PCSK9i, bempedoic acid ALL contraindicated. Bile acid sequestrants are safe. Discontinue LLT ≥3 months before conception. Preeclampsia and gestational diabetes as future risk enhancers. |
| **CKD (Stage 3+)** | Statin or statin/ezetimibe for non-dialysis CKD. Avoid starting statin in dialysis patients (no benefit shown). Dose adjustment considerations. |
| **Heart Failure** | Do not initiate statin solely for HF. Continue if already on statin for ASCVD indication. |
| **HIV** | REPRIEVE trial: pitavastatin reduced MACE 35% in PLWH. DDI considerations with antiretrovirals (avoid simvastatin/lovastatin with PIs). |
| **Cancer** | Continue statin during active cancer if tolerated. Observational data suggest possible benefit. DDI with some chemotherapies. |
| **Chronic Inflammatory Disease** | RA, psoriasis, lupus, IBD — elevated ASCVD risk. Risk-enhancing factor in CPR. |
| **Diverse Ancestry** | Table 21. South Asian ancestry as risk enhancer. PREVENT removes race coefficient but ancestry-specific considerations remain. |

### 6. Calculators (`/calculator`)

| Tab | Content |
|-----|---------|
| **PREVENT-ASCVD** | 10-year and 30-year ASCVD risk. See inputs/outputs below. |
| **LDL-C Estimator** | Martin-Hopkins or Sampson equation when TG 150–400. Friedewald when TG <150. |
| **Statin Intensity** | Input: current statin + dose → output: intensity tier (high/moderate/low) + expected LDL-C % reduction. |
| **Non-HDL-C / ApoB** | Auto-calculate non-HDL-C from TC and HDL-C. Display goal based on selected patient population. |

### 7. Medication Reference (`/medications`)

| Tab | Content |
|-----|---------|
| **Statins** | Table 6 (intensity tiers with specific drugs/doses). Table 7 (PK properties: half-life, metabolism CYP3A4 vs 2C9, food effect, renal dosing). |
| **Nonstatin LLTs** | Table 5 excerpt: ezetimibe, bempedoic acid, PCSK9 mAbs, inclisiran, bile acid sequestrants. Mechanism, dose, expected LDL-C reduction. |
| **TG-Lowering** | Fibrates, omega-3 (icosapent ethyl, DHA+EPA), niacin, olezarsen. Table 26 safety. |
| **Drug Interactions** | Table 27 (statin DDI with cardiovascular drugs). Table 8 (statin DDI broader). Key interactions: gemfibrozil (avoid all statins), diltiazem/verapamil (limit lova/simva), amiodarone, cyclosporine. |
| **Safety** | Table 25 (LDL-C–lowering med safety). Table 26 (TG-lowering safety). Hepatotoxicity monitoring, new-onset diabetes risk, CK measurement guidance. |

### 8. Ask NotebookLM (`/ask`)

- NotebookLM notebook ID: `d06ca6ae-e7f2-451b-ba7a-d40eb1138d0f`
- Proxy API route at `/api/notebooklm` (same pattern as amyloidosis app)
- Two modes: **Brief** (concise answer) and **Explanatory** (detailed with citations)
- Source: full guideline PDF loaded as notebook source

---

## Treatment Goals Table (Core Reference — Figure 1 equivalent)

| Patient Population | LDL-C Goal | Non-HDL-C Goal | ApoB Goal (optional) |
|--------------------|-----------|----------------|---------------------|
| **Primary Prevention — Low Risk (<3%)** | <130 mg/dL | <160 mg/dL | — |
| **Primary Prevention — Borderline (3–<5%)** | <130 mg/dL | <160 mg/dL | — |
| **Primary Prevention — Intermediate (5–<10%)** | <100 mg/dL | <130 mg/dL | <100 mg/dL |
| **Primary Prevention — High (≥10%)** | <70 mg/dL | <100 mg/dL | <80 mg/dL |
| **Diabetes (no ASCVD), age ≥40** | <70 mg/dL | <100 mg/dL | <80 mg/dL |
| **Diabetes + risk enhancers or high PREVENT** | <55 mg/dL | <85 mg/dL | <65 mg/dL |
| **Severe Hypercholesterolemia (LDL ≥190)** | ≥50% reduction | — | — |
| **Secondary Prevention (clinical ASCVD)** | <70 mg/dL | <100 mg/dL | <80 mg/dL |
| **Very-High-Risk ASCVD** | <55 mg/dL | <85 mg/dL | <65 mg/dL |

### Very-High-Risk ASCVD Criteria
- Major ASCVD event (recent ACS, MI, ischemic stroke) AND ≥1 of:
  - Multiple major ASCVD events
  - ≥2 high-risk conditions (age ≥65, diabetes, CKD 3+, HeFH, current smoking, persistent LDL-C ≥100 on max Rx, CHF)

---

## Statin Intensity Quick-Reference (Table 6)

| Intensity | Expected LDL-C Reduction | Drugs & Doses |
|-----------|-------------------------|---------------|
| **High** | ≥50% | Atorvastatin 40–80 mg, Rosuvastatin 20–40 mg |
| **Moderate** | 30–49% | Atorvastatin 10–20 mg, Rosuvastatin 5–10 mg, Simvastatin 20–40 mg, Pravastatin 40–80 mg, Lovastatin 40–80 mg, Fluvastatin 80 mg (XL), Pitavastatin 1–4 mg |
| **Low** | <30% | Simvastatin 10 mg, Pravastatin 10–20 mg, Lovastatin 20 mg, Fluvastatin 20–40 mg |

---

## Calculator Specifications

### PREVENT-ASCVD Calculator

**Inputs:**
| Field | Type | Range/Options |
|-------|------|---------------|
| Age | number | 30–79 |
| Sex | select | Male / Female |
| Systolic BP | number | 90–200 mmHg |
| BP Treatment | boolean | Yes / No |
| Total Cholesterol | number | 100–400 mg/dL |
| HDL-C | number | 20–100 mg/dL |
| Current Smoker | boolean | Yes / No |
| Diabetes | boolean | Yes / No |
| eGFR | number | 15–120 mL/min/1.73m² |
| HbA1c (optional) | number | 4.0–14.0% |
| Zip Code SDI (optional) | number | 1–100 |

**Outputs:**
- 10-year ASCVD risk (%)
- 30-year ASCVD risk (%)
- Risk category: Low / Borderline / Intermediate / High
- Recommended action summary
- Crosswalk note: approximate PCE-equivalent range (Table 12)

### LDL-C Estimator

**Inputs:** TC, HDL-C, TG (all mg/dL)
**Outputs:**
- LDL-C (Friedewald): TC − HDL-C − TG/5 (valid if TG <400)
- LDL-C (Martin-Hopkins): adjustable factor based on TG and non-HDL-C
- Non-HDL-C: TC − HDL-C
- Note if direct LDL-C measurement recommended (TG >400)

### Statin Intensity Checker

**Inputs:** Statin name (select), Dose (mg)
**Outputs:** Intensity tier, Expected % LDL-C reduction range, Key DDI warnings for that statin

### Treatment Goal Lookup

**Inputs:** Patient category (select from population list)
**Outputs:** LDL-C, non-HDL-C, and apoB goals; recommended first-line therapy

---

## Key Algorithms to Implement as Interactive Flowcharts

| Figure | Title | Priority |
|--------|-------|----------|
| Fig 5 | CPR Framework (Calculate-Personalize-Reclassify) | **P0** |
| Fig 6 | Primary Prevention Algorithm | **P0** |
| Fig 10 | Secondary Prevention Overview | **P0** |
| Fig 11–12 | Secondary Prevention Detailed Algorithms | P1 |
| Fig 7 | Severe Hypercholesterolemia Algorithm | P1 |
| Fig 8 | HoFH Management | P2 |
| Fig 9 | Diabetes Without ASCVD Algorithm | P1 |
| Fig 13 | Subclinical Atherosclerosis / CAC Algorithm | P1 |
| Fig 14–17 | Hypertriglyceridemia Algorithms (by severity) | P1 |
| Fig 18 | SAMS Management Algorithm | P1 |

---

## "What's New in 2026" Summary (from Table 1)

- PREVENT-ASCVD equations replace Pooled Cohort Equations
- CPR (Calculate-Personalize-Reclassify) risk assessment framework
- Lipoprotein goals (LDL-C, non-HDL-C, apoB) for all patient populations
- ApoB measurement recommended when TG elevated or discordance suspected
- Lp(a) measurement recommended for all adults (at least once)
- Bempedoic acid added to treatment algorithms
- Inclisiran incorporated for patients unable to tolerate/access PCSK9 mAbs
- Olezarsen approved for familial chylomicronemia syndrome (FCS)
- Expanded special population guidance (HIV/REPRIEVE, cancer, CID, ancestry)
- Statin-attributed muscle symptoms — structured management algorithm
- CAC scoring role clarified for borderline/intermediate risk and SAMS scenarios
- Reproductive-age risk markers (preeclampsia, gestational diabetes) recognized

---

## Disclaimer

> **This application is for educational and clinical decision-support purposes only.** Content is derived from the 2026 ACC/AHA Guideline on the Management of Dyslipidemia. It does not replace clinical judgment, individualized patient assessment, or the full guideline document. Treatment decisions should be made collaboratively between clinician and patient. The developers are not liable for clinical outcomes. Always refer to the [full guideline](https://doi.org/10.1161/CIR.0000000000001423) and institutional protocols.

---

## Implementation Notes

- **Architecture:** Mirror amyloidosis app — Next.js 14 App Router, TypeScript, Tailwind CSS, Zustand
- **Data model:** All clinical content as client-side TypeScript objects (no database)
- **Color palette suggestion:** Navy primary (#1a365d) with red accent (#dc2626) for high-risk, amber (#f59e0b) for moderate, green (#16a34a) for low-risk — aligns with guideline COR color coding
- **NotebookLM ID:** `d06ca6ae-e7f2-451b-ba7a-d40eb1138d0f`
- **Key tables to encode as data:** Tables 4, 5, 6, 7, 8, 11, 12, 13, 15, 17, 24, 25, 26, 27
- **Key figures to render as interactive flows:** Figures 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18
