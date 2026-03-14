'use client'

import { useState, useMemo } from 'react'
import { useAppStore } from '@/store/appStore'

// ─── 2026 ACC/AHA Dyslipidemia Guideline Calculators ─────────────────────────
// Tab 1: LDL-C Goal Finder — based on Lipoprotein Goals figure
// Tab 2: TG Severity & Action — based on Figure 2 (TG management)

const calculatorTabs = [
  { id: 'ldl-goals', label: 'LDL-C Goal Finder', description: 'Statin intensity & targets' },
  { id: 'tg-categorizer', label: 'TG Severity & Action', description: 'TG categorization & Rx' },
]

// ─── Types ───────────────────────────────────────────────────────────────────

type PreventionSetting = 'primary-low' | 'primary-borderline' | 'primary-intermediate' | 'primary-high' | 'secondary-not-very-high' | 'secondary-very-high'
type CACCategory = 'not-done' | 'zero' | '1-99' | '100-299' | '300-plus'

interface LDLResult {
  statinIntensity: 'none' | 'moderate' | 'high'
  ldlGoal: number | null
  nonHdlGoal: number | null
  pctReduction: number | null
  addEzetimibe: boolean
  addPCSK9: boolean
  addBempedoic: boolean
  rationale: string[]
  riskColor: 'green' | 'yellow' | 'red'
}

interface TGResult {
  severity: 'normal' | 'borderline-high' | 'moderate' | 'moderate-severe' | 'severe' | 'very-severe'
  severityLabel: string
  riskColor: 'green' | 'yellow' | 'red'
  lifestyleRecs: string[]
  addedSugarsLimit: string
  totalFatGuidance: string
  alcoholGuidance: string
  pharmacotherapy: string[]
  pancreatitisRisk: 'low' | 'moderate' | 'high'
  referToRDN: boolean
  rdnReason: string
}

// ─── LDL-C Goal Finder Logic ─────────────────────────────────────────────────

function computeLDLGoals(
  prevention: PreventionSetting,
  hasDiabetes: boolean,
  severeFH: boolean,
  hasFH: boolean,
  cacCategory: CACCategory,
  hasRiskEnhancers: boolean,
): LDLResult {
  const rationale: string[] = []

  // Secondary prevention — very high risk
  if (prevention === 'secondary-very-high') {
    rationale.push('Very-high-risk ASCVD: maximally intensive lipid lowering required')
    rationale.push('Consider combination therapy if LDL-C remains above goal on maximally tolerated statin')
    return {
      statinIntensity: 'high',
      ldlGoal: 55,
      nonHdlGoal: 85,
      pctReduction: 50,
      addEzetimibe: true,
      addPCSK9: true,
      addBempedoic: true,
      rationale,
      riskColor: 'red',
    }
  }

  // Secondary prevention — not very high risk
  if (prevention === 'secondary-not-very-high') {
    rationale.push('Secondary prevention ASCVD: high-intensity statin is first-line')
    rationale.push('Add ezetimibe if LDL-C remains >=70 mg/dL on maximally tolerated statin')
    return {
      statinIntensity: 'high',
      ldlGoal: 70,
      nonHdlGoal: 100,
      pctReduction: 50,
      addEzetimibe: true,
      addPCSK9: false,
      addBempedoic: true,
      rationale,
      riskColor: 'red',
    }
  }

  // Severe hypercholesterolemia (LDL-C >=190) — always high-intensity
  if (severeFH) {
    rationale.push('Severe hypercholesterolemia (LDL-C >=190 mg/dL): high-intensity statin regardless of risk score')
    rationale.push('Consider familial hypercholesterolemia workup if not already done')
    return {
      statinIntensity: 'high',
      ldlGoal: 100,
      nonHdlGoal: 130,
      pctReduction: 50,
      addEzetimibe: true,
      addPCSK9: hasFH,
      addBempedoic: true,
      rationale,
      riskColor: 'red',
    }
  }

  // FH without severe hypercholesterolemia
  if (hasFH) {
    rationale.push('Familial hypercholesterolemia: at minimum high-intensity statin therapy')
    return {
      statinIntensity: 'high',
      ldlGoal: 100,
      nonHdlGoal: 130,
      pctReduction: 50,
      addEzetimibe: true,
      addPCSK9: true,
      addBempedoic: true,
      rationale,
      riskColor: 'red',
    }
  }

  // Primary prevention with diabetes
  if (hasDiabetes) {
    if (prevention === 'primary-high' || hasRiskEnhancers) {
      rationale.push('Diabetes with high risk or risk enhancers: high-intensity statin recommended')
      rationale.push('Target >=50% LDL-C reduction with goal <70 mg/dL')
      return {
        statinIntensity: 'high',
        ldlGoal: 70,
        nonHdlGoal: 100,
        pctReduction: 50,
        addEzetimibe: true,
        addPCSK9: false,
        addBempedoic: true,
        rationale,
        riskColor: 'red',
      }
    }
    rationale.push('Diabetes without additional high-risk features: moderate-intensity statin recommended')
    rationale.push('Target >=30% LDL-C reduction with goal <100 mg/dL')
    return {
      statinIntensity: 'moderate',
      ldlGoal: 100,
      nonHdlGoal: 130,
      pctReduction: 30,
      addEzetimibe: false,
      addPCSK9: false,
      addBempedoic: false,
      rationale,
      riskColor: 'yellow',
    }
  }

  // Primary prevention by risk category
  switch (prevention) {
    case 'primary-low':
      rationale.push('Low 10-year ASCVD risk (<5%): lifestyle modification is primary intervention')
      rationale.push('Statin therapy generally not indicated unless risk enhancers present')
      return {
        statinIntensity: 'none',
        ldlGoal: null,
        nonHdlGoal: null,
        pctReduction: null,
        addEzetimibe: false,
        addPCSK9: false,
        addBempedoic: false,
        rationale,
        riskColor: 'green',
      }

    case 'primary-borderline':
      if (hasRiskEnhancers) {
        rationale.push('Borderline risk (5-<7.5%) with risk enhancers: consider moderate-intensity statin')
        rationale.push('Shared decision-making recommended; CAC score may help guide therapy')
        return {
          statinIntensity: 'moderate',
          ldlGoal: 100,
          nonHdlGoal: 130,
          pctReduction: 30,
          addEzetimibe: false,
          addPCSK9: false,
          addBempedoic: false,
          rationale,
          riskColor: 'yellow',
        }
      }
      rationale.push('Borderline risk (5-<7.5%) without risk enhancers: emphasize lifestyle')
      rationale.push('Consider CAC scoring to further risk-stratify if uncertain')
      return {
        statinIntensity: 'none',
        ldlGoal: null,
        nonHdlGoal: null,
        pctReduction: null,
        addEzetimibe: false,
        addPCSK9: false,
        addBempedoic: false,
        rationale,
        riskColor: 'green',
      }

    case 'primary-intermediate': {
      // CAC can downgrade or upgrade
      if (cacCategory === 'zero') {
        rationale.push('Intermediate risk with CAC = 0: statin may be deferred (unless diabetes, FH, or smoking)')
        rationale.push('Reassess risk in 5-10 years; emphasize lifestyle')
        return {
          statinIntensity: 'none',
          ldlGoal: null,
          nonHdlGoal: null,
          pctReduction: null,
          addEzetimibe: false,
          addPCSK9: false,
          addBempedoic: false,
          rationale,
          riskColor: 'green',
        }
      }
      if (cacCategory === '300-plus') {
        rationale.push('Intermediate risk with CAC >=300: high-intensity statin recommended')
        rationale.push('CAC >=300 (or >=75th percentile) substantially upgrades risk')
        return {
          statinIntensity: 'high',
          ldlGoal: 70,
          nonHdlGoal: 100,
          pctReduction: 50,
          addEzetimibe: true,
          addPCSK9: false,
          addBempedoic: false,
          rationale,
          riskColor: 'red',
        }
      }
      if (cacCategory === '100-299') {
        rationale.push('Intermediate risk with CAC 100-299: moderate-to-high intensity statin recommended')
        return {
          statinIntensity: 'high',
          ldlGoal: 100,
          nonHdlGoal: 130,
          pctReduction: 50,
          addEzetimibe: false,
          addPCSK9: false,
          addBempedoic: false,
          rationale,
          riskColor: 'yellow',
        }
      }
      if (hasRiskEnhancers || cacCategory === '1-99') {
        rationale.push('Intermediate risk with risk enhancers or CAC 1-99: moderate-intensity statin recommended')
        return {
          statinIntensity: 'moderate',
          ldlGoal: 100,
          nonHdlGoal: 130,
          pctReduction: 30,
          addEzetimibe: false,
          addPCSK9: false,
          addBempedoic: false,
          rationale,
          riskColor: 'yellow',
        }
      }
      rationale.push('Intermediate risk (7.5-<20%): moderate-intensity statin recommended')
      rationale.push('Consider CAC scoring to further refine decision')
      return {
        statinIntensity: 'moderate',
        ldlGoal: 100,
        nonHdlGoal: 130,
        pctReduction: 30,
        addEzetimibe: false,
        addPCSK9: false,
        addBempedoic: false,
        rationale,
        riskColor: 'yellow',
      }
    }

    case 'primary-high':
      rationale.push('High 10-year ASCVD risk (>=20%): high-intensity statin recommended')
      rationale.push('Target >=50% LDL-C reduction with goal <70 mg/dL')
      return {
        statinIntensity: 'high',
        ldlGoal: 70,
        nonHdlGoal: 100,
        pctReduction: 50,
        addEzetimibe: true,
        addPCSK9: false,
        addBempedoic: true,
        rationale,
        riskColor: 'red',
      }

    default:
      return {
        statinIntensity: 'none',
        ldlGoal: null,
        nonHdlGoal: null,
        pctReduction: null,
        addEzetimibe: false,
        addPCSK9: false,
        addBempedoic: false,
        rationale: ['Unable to determine recommendation'],
        riskColor: 'green',
      }
  }
}

// ─── TG Severity Logic ──────────────────────────────────────────────────────

function computeTGResult(
  tgLevel: number,
  hasASCVD: boolean,
  hasDiabetes: boolean,
  hasCKM: boolean,
): TGResult {
  let severity: TGResult['severity']
  let severityLabel: string
  let riskColor: TGResult['riskColor']
  let pancreatitisRisk: TGResult['pancreatitisRisk']
  const lifestyleRecs: string[] = []
  const pharmacotherapy: string[] = []
  let addedSugarsLimit: string
  let totalFatGuidance: string
  let alcoholGuidance: string
  let referToRDN = false
  let rdnReason = ''

  // Categorize TG level
  if (tgLevel < 150) {
    severity = 'normal'
    severityLabel = 'Normal (<150 mg/dL)'
    riskColor = 'green'
    pancreatitisRisk = 'low'
    addedSugarsLimit = '<10% of total calories'
    totalFatGuidance = '25-35% of total calories; emphasize unsaturated fats'
    alcoholGuidance = 'Moderate consumption acceptable if no contraindications'
  } else if (tgLevel < 200) {
    severity = 'borderline-high'
    severityLabel = 'Borderline High (150-199 mg/dL)'
    riskColor = 'yellow'
    pancreatitisRisk = 'low'
    addedSugarsLimit = '<6% of total calories'
    totalFatGuidance = '25-35% of total calories; limit saturated fat <7%'
    alcoholGuidance = 'Limit or avoid alcohol; even moderate intake raises TG'
    lifestyleRecs.push('Weight loss if overweight/obese (target 5-10% body weight)')
    lifestyleRecs.push('Increase physical activity (150 min/week moderate or 75 min/week vigorous)')
    lifestyleRecs.push('Reduce refined carbohydrates and added sugars')
    lifestyleRecs.push('Increase omega-3 fatty acid intake from dietary sources')
    referToRDN = true
    rdnReason = 'Dietary optimization for borderline-high TG'
  } else if (tgLevel < 500) {
    severity = tgLevel < 350 ? 'moderate' : 'moderate-severe'
    severityLabel = tgLevel < 350
      ? 'Moderate Hypertriglyceridemia (200-349 mg/dL)'
      : 'Moderate-Severe Hypertriglyceridemia (350-499 mg/dL)'
    riskColor = 'yellow'
    pancreatitisRisk = tgLevel >= 350 ? 'moderate' : 'low'
    addedSugarsLimit = '<5% of total calories'
    totalFatGuidance = '25-30% of total calories; minimize saturated fat; avoid trans fats'
    alcoholGuidance = 'Strongly recommend abstinence; alcohol significantly worsens hypertriglyceridemia'
    lifestyleRecs.push('Weight loss (target 5-10% body weight reduction)')
    lifestyleRecs.push('Aerobic exercise 150+ min/week')
    lifestyleRecs.push('Strict reduction of added sugars (<5% total calories)')
    lifestyleRecs.push('Limit or eliminate alcohol')
    lifestyleRecs.push('Replace simple carbohydrates with complex carbohydrates and fiber')
    lifestyleRecs.push('Increase dietary omega-3 (fatty fish 2+ servings/week)')

    if (hasASCVD || hasDiabetes) {
      pharmacotherapy.push('Statin therapy (high-intensity if ASCVD present)')
    }
    if (hasASCVD && tgLevel >= 150) {
      pharmacotherapy.push('Icosapent ethyl (IPE) 2g BID if TG 150-499 mg/dL on statin (REDUCE-IT)')
    }
    if (hasCKM) {
      pharmacotherapy.push('Assess and treat CKM syndrome components (metabolic syndrome, CKD, NAFLD)')
    }
    referToRDN = true
    rdnReason = 'Comprehensive dietary intervention for moderate-to-severe hypertriglyceridemia'
  } else if (tgLevel < 1000) {
    severity = 'severe'
    severityLabel = 'Severe Hypertriglyceridemia (500-999 mg/dL)'
    riskColor = 'red'
    pancreatitisRisk = 'high'
    addedSugarsLimit = '<5% of total calories; consider very-low-sugar diet'
    totalFatGuidance = '15-20% of total calories; very-low-fat diet recommended'
    alcoholGuidance = 'Absolute abstinence from alcohol required'
    lifestyleRecs.push('Very-low-fat diet (15-20% of calories from fat)')
    lifestyleRecs.push('Absolute alcohol abstinence')
    lifestyleRecs.push('Eliminate added sugars and refined carbohydrates')
    lifestyleRecs.push('Weight loss (target 7-10% body weight)')
    lifestyleRecs.push('Aerobic exercise as tolerated')
    lifestyleRecs.push('Evaluate for secondary causes (uncontrolled diabetes, hypothyroidism, medications)')
    pharmacotherapy.push('Fibrate therapy (fenofibrate preferred) to reduce pancreatitis risk')
    pharmacotherapy.push('High-intensity statin if ASCVD risk factors present')
    pharmacotherapy.push('Prescription omega-3 fatty acids (4 g/day) as adjunct')
    if (hasASCVD) {
      pharmacotherapy.push('Icosapent ethyl (IPE) may be considered after TG lowered to <500')
    }
    referToRDN = true
    rdnReason = 'Urgent dietary intervention; pancreatitis risk is high'
  } else {
    severity = 'very-severe'
    severityLabel = 'Very Severe Hypertriglyceridemia (>=1000 mg/dL)'
    riskColor = 'red'
    pancreatitisRisk = 'high'
    addedSugarsLimit = 'Eliminate added sugars entirely'
    totalFatGuidance = '10-15% of total calories; consider near-fat-free diet acutely'
    alcoholGuidance = 'Absolute abstinence from alcohol — mandatory'
    lifestyleRecs.push('Near-fat-free diet acutely (<10-15% calories from fat)')
    lifestyleRecs.push('Absolute alcohol abstinence — non-negotiable')
    lifestyleRecs.push('NPO if active pancreatitis suspected')
    lifestyleRecs.push('Eliminate all added sugars and simple carbohydrates')
    lifestyleRecs.push('Evaluate urgently for secondary causes')
    lifestyleRecs.push('Consider inpatient management if symptomatic')
    pharmacotherapy.push('Fibrate therapy (fenofibrate) — start immediately')
    pharmacotherapy.push('Prescription omega-3 fatty acids (4 g/day)')
    pharmacotherapy.push('Consider insulin infusion if diabetic ketoacidosis or severe hyperglycemia')
    pharmacotherapy.push('Plasmapheresis may be considered if TG >2000 or active pancreatitis')
    pharmacotherapy.push('Statin therapy once acute phase managed')
    referToRDN = true
    rdnReason = 'Urgent: very severe hypertriglyceridemia with high pancreatitis risk'
  }

  return {
    severity,
    severityLabel,
    riskColor,
    lifestyleRecs,
    addedSugarsLimit,
    totalFatGuidance,
    alcoholGuidance,
    pharmacotherapy,
    pancreatitisRisk,
    referToRDN,
    rdnReason,
  }
}

// ─── Helper: Button group for Yes/No ─────────────────────────────────────────

function YesNoButtons({ value, onChange, yesLabel = 'Yes', noLabel = 'No' }: {
  value: boolean | null
  onChange: (v: boolean) => void
  yesLabel?: string
  noLabel?: string
}) {
  return (
    <div className="flex gap-3">
      <button
        onClick={() => onChange(true)}
        className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium border-2 transition-all ${
          value === true
            ? 'border-primary bg-primary/10 text-primary'
            : 'border-gray-200 text-gray-600 hover:border-gray-300'
        }`}
      >
        {yesLabel}
      </button>
      <button
        onClick={() => onChange(false)}
        className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium border-2 transition-all ${
          value === false
            ? 'border-primary bg-primary/10 text-primary'
            : 'border-gray-200 text-gray-600 hover:border-gray-300'
        }`}
      >
        {noLabel}
      </button>
    </div>
  )
}

// ─── Helper: Color config ────────────────────────────────────────────────────

const colorConfig = {
  green: { text: 'text-green-800', bg: 'bg-green-50', border: 'border-green-400', badge: 'badge-green' },
  yellow: { text: 'text-yellow-800', bg: 'bg-yellow-50', border: 'border-yellow-400', badge: 'badge-yellow' },
  red: { text: 'text-red-800', bg: 'bg-red-50', border: 'border-red-400', badge: 'badge-red' },
}

// ─── LDL-C Goal Finder Component ─────────────────────────────────────────────

function LDLGoalFinder() {
  const [prevention, setPrevention] = useState<PreventionSetting | null>(null)
  const [hasDiabetes, setHasDiabetes] = useState<boolean | null>(null)
  const [severeFH, setSevereFH] = useState<boolean | null>(null)
  const [hasFH, setHasFH] = useState<boolean | null>(null)
  const [cacCategory, setCacCategory] = useState<CACCategory>('not-done')
  const [hasRiskEnhancers, setHasRiskEnhancers] = useState<boolean | null>(null)

  const isComplete = prevention !== null && hasDiabetes !== null && severeFH !== null && hasFH !== null && hasRiskEnhancers !== null

  const result = useMemo(() => {
    if (!isComplete) return null
    return computeLDLGoals(prevention!, hasDiabetes!, severeFH!, hasFH!, cacCategory, hasRiskEnhancers!)
  }, [isComplete, prevention, hasDiabetes, severeFH, hasFH, cacCategory, hasRiskEnhancers])

  const handleReset = () => {
    setPrevention(null)
    setHasDiabetes(null)
    setSevereFH(null)
    setHasFH(null)
    setCacCategory('not-done')
    setHasRiskEnhancers(null)
  }

  const preventionOptions: { value: PreventionSetting; label: string; detail: string }[] = [
    { value: 'primary-low', label: 'Low', detail: '<5% 10-yr ASCVD' },
    { value: 'primary-borderline', label: 'Borderline', detail: '5-<7.5%' },
    { value: 'primary-intermediate', label: 'Intermediate', detail: '7.5-<20%' },
    { value: 'primary-high', label: 'High', detail: '>=20%' },
    { value: 'secondary-not-very-high', label: 'Secondary', detail: 'ASCVD (not very high)' },
    { value: 'secondary-very-high', label: 'Very High', detail: 'ASCVD very high risk' },
  ]

  const cacOptions: { value: CACCategory; label: string }[] = [
    { value: 'not-done', label: 'Not Done' },
    { value: 'zero', label: 'CAC = 0' },
    { value: '1-99', label: '1-99' },
    { value: '100-299', label: '100-299' },
    { value: '300-plus', label: '>=300' },
  ]

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-primary">
          LDL-C Goal Finder
        </h1>
        <p className="text-gray-600 mt-2">
          Determine recommended statin intensity, LDL-C goals, and add-on therapy based on the 2026 ACC/AHA Dyslipidemia Guideline
        </p>
      </div>

      {/* Applicability */}
      <div className="card mb-6 border-l-4 border-blue-400">
        <h2 className="card-header text-base">How to Use</h2>
        <p className="text-sm text-gray-700 mb-2">
          Select the patient&apos;s prevention setting (primary vs secondary), risk factors, and modifiers.
          The tool will output the recommended <strong>statin intensity</strong>, <strong>LDL-C and non-HDL-C goals</strong>,
          and whether to consider <strong>add-on therapies</strong> (ezetimibe, PCSK9 inhibitors, bempedoic acid).
        </p>
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="badge-blue">Primary Prevention</span>
          <span className="badge-blue">Secondary Prevention</span>
          <span className="badge-purple">Diabetes</span>
          <span className="badge-red">FH / Severe Hypercholesterolemia</span>
          <span className="badge-teal">CAC Score Integration</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="card-header mb-0">Patient Parameters</h2>
            <button onClick={handleReset} className="text-xs text-gray-500 hover:text-primary transition-colors">
              Clear all
            </button>
          </div>

          {/* Prevention Setting */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Prevention Setting / Risk Category
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {preventionOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setPrevention(opt.value)}
                  className={`py-2.5 px-3 rounded-lg text-sm font-medium border-2 transition-all text-left ${
                    prevention === opt.value
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <div>{opt.label}</div>
                  <div className="text-xs opacity-70 mt-0.5">{opt.detail}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Diabetes */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Diabetes Mellitus</label>
            <YesNoButtons value={hasDiabetes} onChange={setHasDiabetes} />
          </div>

          {/* Severe hypercholesterolemia */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Severe Hypercholesterolemia
            </label>
            <p className="text-xs text-gray-500 mb-2">LDL-C &ge;190 mg/dL (untreated or historically)</p>
            <YesNoButtons value={severeFH} onChange={setSevereFH} />
          </div>

          {/* FH */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Familial Hypercholesterolemia (FH)
            </label>
            <p className="text-xs text-gray-500 mb-2">Clinical or genetic diagnosis of FH</p>
            <YesNoButtons value={hasFH} onChange={setHasFH} />
          </div>

          {/* CAC Score */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              CAC Score Category <span className="text-gray-400 font-normal">(if available)</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {cacOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setCacCategory(opt.value)}
                  className={`py-2 px-3 rounded-lg text-sm font-medium border-2 transition-all ${
                    cacCategory === opt.value
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            {cacCategory === 'zero' && prevention?.startsWith('primary') && (
              <p className="text-xs text-green-600 mt-1">CAC = 0 may allow deferral of statin in intermediate-risk patients</p>
            )}
          </div>

          {/* Risk Enhancers */}
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Additional Risk Enhancers Present
            </label>
            <p className="text-xs text-gray-500 mb-2">
              e.g., family history of premature ASCVD, metabolic syndrome, CKD, chronic inflammatory conditions,
              South Asian ancestry, Lp(a) &ge;50 mg/dL, elevated hsCRP, elevated ApoB
            </p>
            <YesNoButtons value={hasRiskEnhancers} onChange={setHasRiskEnhancers} />
          </div>
        </div>

        {/* Results */}
        <div>
          {result ? (
            <div className="space-y-4">
              {/* Main Result Card */}
              <div className={`card border-l-4 ${colorConfig[result.riskColor].border}`}>
                <h2 className="card-header text-base">Recommended Therapy</h2>

                {/* Statin Intensity */}
                <div className="flex items-center gap-4 mb-4">
                  <div className={`text-2xl font-bold ${colorConfig[result.riskColor].text}`}>
                    {result.statinIntensity === 'none' ? 'Lifestyle Only' :
                     result.statinIntensity === 'moderate' ? 'Moderate-Intensity Statin' :
                     'High-Intensity Statin'}
                  </div>
                </div>

                {/* Goals Grid */}
                {(result.ldlGoal !== null || result.pctReduction !== null) && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                    {result.ldlGoal !== null && (
                      <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <div className="text-xs text-gray-500 mb-1">LDL-C Goal</div>
                        <div className="text-xl font-bold text-primary">&lt;{result.ldlGoal}</div>
                        <div className="text-xs text-gray-500">mg/dL</div>
                      </div>
                    )}
                    {result.nonHdlGoal !== null && (
                      <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <div className="text-xs text-gray-500 mb-1">Non-HDL-C Goal</div>
                        <div className="text-xl font-bold text-primary">&lt;{result.nonHdlGoal}</div>
                        <div className="text-xs text-gray-500">mg/dL</div>
                      </div>
                    )}
                    {result.pctReduction !== null && (
                      <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <div className="text-xs text-gray-500 mb-1">% LDL-C Reduction</div>
                        <div className="text-xl font-bold text-primary">&ge;{result.pctReduction}%</div>
                        <div className="text-xs text-gray-500">from baseline</div>
                      </div>
                    )}
                  </div>
                )}

                {/* Add-on Therapies */}
                <div className="mb-4">
                  <div className="text-xs font-semibold text-gray-500 mb-2">ADD-ON THERAPY (IF NOT AT GOAL ON MAXIMALLY TOLERATED STATIN)</div>
                  <div className="space-y-2">
                    <div className={`flex items-center gap-2 text-sm ${result.addEzetimibe ? 'text-green-700' : 'text-gray-400'}`}>
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                        result.addEzetimibe ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'
                      }`}>
                        {result.addEzetimibe ? '+' : '-'}
                      </span>
                      <span>Ezetimibe</span>
                    </div>
                    <div className={`flex items-center gap-2 text-sm ${result.addBempedoic ? 'text-green-700' : 'text-gray-400'}`}>
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                        result.addBempedoic ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'
                      }`}>
                        {result.addBempedoic ? '+' : '-'}
                      </span>
                      <span>Bempedoic acid</span>
                    </div>
                    <div className={`flex items-center gap-2 text-sm ${result.addPCSK9 ? 'text-green-700' : 'text-gray-400'}`}>
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                        result.addPCSK9 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'
                      }`}>
                        {result.addPCSK9 ? '+' : '-'}
                      </span>
                      <span>PCSK9 inhibitor (evolocumab/alirocumab)</span>
                    </div>
                  </div>
                </div>

                {/* Rationale */}
                <div className={`${colorConfig[result.riskColor].bg} rounded-lg p-3`}>
                  <div className={`text-sm font-semibold ${colorConfig[result.riskColor].text} mb-1`}>Rationale</div>
                  <ul className="space-y-1">
                    {result.rationale.map((r, i) => (
                      <li key={i} className="text-sm text-gray-700 flex gap-2">
                        <span className="text-primary mt-0.5">&#8226;</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Statin Intensity Reference */}
              <div className="card">
                <h2 className="card-header text-base">Statin Intensity Reference</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <div className="text-sm font-bold text-yellow-800 mb-1">Moderate Intensity</div>
                    <p className="text-xs text-yellow-700">30-49% LDL-C reduction</p>
                    <ul className="text-xs text-yellow-700 mt-1 space-y-0.5">
                      <li>&#8226; Atorvastatin 10-20 mg</li>
                      <li>&#8226; Rosuvastatin 5-10 mg</li>
                      <li>&#8226; Simvastatin 20-40 mg</li>
                      <li>&#8226; Pravastatin 40-80 mg</li>
                    </ul>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <div className="text-sm font-bold text-red-800 mb-1">High Intensity</div>
                    <p className="text-xs text-red-700">&ge;50% LDL-C reduction</p>
                    <ul className="text-xs text-red-700 mt-1 space-y-0.5">
                      <li>&#8226; Atorvastatin 40-80 mg</li>
                      <li>&#8226; Rosuvastatin 20-40 mg</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="card border-2 border-dashed border-gray-300 flex items-center justify-center min-h-[300px]">
              <div className="text-center text-gray-400">
                <div className="text-4xl mb-3">&#128202;</div>
                <p className="text-sm font-medium">Complete all fields to see results</p>
                <p className="text-xs mt-1">Statin intensity, LDL-C goals, and add-on therapy recommendations will appear here</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-xs text-yellow-800">
        <strong>Disclaimer:</strong> This tool is based on the 2026 ACC/AHA Guideline for Management of Dyslipidemia
        and is intended for educational and clinical decision support only. It does not replace clinical judgment.
        Always consider the full clinical context, patient preferences, and shared decision-making.
        Not for direct patient care decisions without physician oversight.
      </div>
    </div>
  )
}

// ─── TG Severity & Action Component ─────────────────────────────────────────

function TGCategorizerCalculator() {
  const [tgInput, setTgInput] = useState('')
  const [hasASCVD, setHasASCVD] = useState<boolean | null>(null)
  const [hasDiabetes, setHasDiabetes] = useState<boolean | null>(null)
  const [hasCKM, setHasCKM] = useState<boolean | null>(null)

  const tgLevel = parseFloat(tgInput) || 0
  const isComplete = tgInput !== '' && tgLevel > 0 && hasASCVD !== null && hasDiabetes !== null && hasCKM !== null

  const result = useMemo(() => {
    if (!isComplete) return null
    return computeTGResult(tgLevel, hasASCVD!, hasDiabetes!, hasCKM!)
  }, [isComplete, tgLevel, hasASCVD, hasDiabetes, hasCKM])

  const handleReset = () => {
    setTgInput('')
    setHasASCVD(null)
    setHasDiabetes(null)
    setHasCKM(null)
  }

  const pancreatitisConfig = {
    low: { label: 'Low', text: 'text-green-800', bg: 'bg-green-50', border: 'border-green-400' },
    moderate: { label: 'Moderate', text: 'text-yellow-800', bg: 'bg-yellow-50', border: 'border-yellow-400' },
    high: { label: 'High', text: 'text-red-800', bg: 'bg-red-50', border: 'border-red-400' },
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-primary">
          TG Severity &amp; Action
        </h1>
        <p className="text-gray-600 mt-2">
          Categorize triglyceride levels and determine lifestyle and pharmacotherapy recommendations per the 2026 ACC/AHA Dyslipidemia Guideline (Figure 2)
        </p>
      </div>

      {/* Applicability */}
      <div className="card mb-6 border-l-4 border-blue-400">
        <h2 className="card-header text-base">When to Use</h2>
        <p className="text-sm text-gray-700 mb-2">
          Enter the patient&apos;s <strong>fasting triglyceride level</strong> along with clinical context.
          The tool provides severity categorization, specific dietary targets (added sugars, total fat, alcohol),
          pharmacotherapy options, pancreatitis risk, and whether to refer to a Registered Dietitian Nutritionist (RDN).
        </p>
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="badge-blue">Fasting TG Level</span>
          <span className="badge-purple">ASCVD Context</span>
          <span className="badge-teal">CKM Syndrome</span>
          <span className="badge-red">Pancreatitis Risk</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="card-header mb-0">Patient Parameters</h2>
            <button onClick={handleReset} className="text-xs text-gray-500 hover:text-primary transition-colors">
              Clear all
            </button>
          </div>

          {/* TG Level */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Fasting Triglyceride Level <span className="text-gray-400 font-normal">(mg/dL)</span>
            </label>
            <p className="text-xs text-gray-500 mb-2">Enter fasting TG value; non-fasting may overestimate severity</p>
            <input
              type="number"
              min="0"
              max="10000"
              value={tgInput}
              onChange={(e) => setTgInput(e.target.value)}
              placeholder="e.g. 250"
              className="input-field"
            />
            {tgInput !== '' && tgLevel >= 500 && (
              <p className="text-xs text-red-600 mt-1">TG &ge;500 mg/dL: pancreatitis risk is elevated — urgent attention needed</p>
            )}
          </div>

          {/* ASCVD */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Established ASCVD</label>
            <YesNoButtons value={hasASCVD} onChange={setHasASCVD} />
          </div>

          {/* Diabetes */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Diabetes Mellitus</label>
            <YesNoButtons value={hasDiabetes} onChange={setHasDiabetes} />
          </div>

          {/* CKM Syndrome */}
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              CKM Syndrome
            </label>
            <p className="text-xs text-gray-500 mb-2">
              Cardiovascular-kidney-metabolic syndrome (metabolic syndrome, CKD, NAFLD/MASLD)
            </p>
            <YesNoButtons value={hasCKM} onChange={setHasCKM} />
          </div>
        </div>

        {/* Results */}
        <div>
          {result ? (
            <div className="space-y-4">
              {/* Severity Card */}
              <div className={`card border-l-4 ${colorConfig[result.riskColor].border}`}>
                <h2 className="card-header text-base">TG Severity Category</h2>
                <div className="flex items-center gap-4 mb-4">
                  <div className={`text-xl font-bold ${colorConfig[result.riskColor].text}`}>
                    {result.severityLabel}
                  </div>
                </div>

                {/* TG Severity Gauge */}
                <div className="mb-4">
                  <div className="flex rounded-full overflow-hidden h-3 bg-gray-200">
                    <div className="bg-green-400 flex-[150]" title="Normal <150" />
                    <div className="bg-yellow-300 flex-[50]" title="Borderline 150-199" />
                    <div className="bg-yellow-500 flex-[300]" title="Moderate 200-499" />
                    <div className="bg-red-400 flex-[500]" title="Severe 500-999" />
                    <div className="bg-red-600 flex-[200]" title="Very severe >=1000" />
                  </div>
                  <div className="relative h-4 mt-0.5">
                    <div
                      className="absolute w-0 h-0 border-l-[6px] border-r-[6px] border-b-[8px] border-transparent border-b-gray-800 transition-all duration-500"
                      style={{
                        left: `${Math.min(95, (tgLevel / 1200) * 100)}%`,
                        transform: 'translateX(-6px)',
                      }}
                    />
                  </div>
                  <div className="flex text-[9px] text-gray-500 mt-0.5">
                    <div className="flex-[150] text-center">&lt;150</div>
                    <div className="flex-[50] text-center">150-199</div>
                    <div className="flex-[300] text-center">200-499</div>
                    <div className="flex-[500] text-center">500-999</div>
                    <div className="flex-[200] text-center">&ge;1000</div>
                  </div>
                </div>

                {/* Pancreatitis Risk */}
                <div className={`${pancreatitisConfig[result.pancreatitisRisk].bg} border ${pancreatitisConfig[result.pancreatitisRisk].border} rounded-lg p-3 mb-3`}>
                  <div className={`text-sm font-semibold ${pancreatitisConfig[result.pancreatitisRisk].text} mb-1`}>
                    Pancreatitis Risk: {pancreatitisConfig[result.pancreatitisRisk].label}
                  </div>
                  <p className="text-xs text-gray-700">
                    {result.pancreatitisRisk === 'low' && 'Low risk of TG-induced acute pancreatitis at this level.'}
                    {result.pancreatitisRisk === 'moderate' && 'Moderate pancreatitis risk. Monitor closely and treat aggressively.'}
                    {result.pancreatitisRisk === 'high' && 'HIGH pancreatitis risk. Urgent TG-lowering therapy required. Consider hospitalization if symptomatic.'}
                  </p>
                </div>

                {/* RDN Referral */}
                {result.referToRDN && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="text-sm font-semibold text-blue-800 mb-1">Refer to RDN</div>
                    <p className="text-xs text-blue-700">{result.rdnReason}</p>
                  </div>
                )}
              </div>

              {/* Dietary Targets */}
              <div className="card border-l-4 border-teal-400">
                <h2 className="card-header text-base">Dietary Targets (Figure 2)</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                  <div className="bg-teal-50 rounded-lg p-3">
                    <div className="text-xs font-semibold text-teal-700 mb-1">Added Sugars</div>
                    <div className="text-sm font-bold text-teal-900">{result.addedSugarsLimit}</div>
                  </div>
                  <div className="bg-teal-50 rounded-lg p-3">
                    <div className="text-xs font-semibold text-teal-700 mb-1">Total Fat</div>
                    <div className="text-sm font-bold text-teal-900">{result.totalFatGuidance}</div>
                  </div>
                  <div className="bg-teal-50 rounded-lg p-3">
                    <div className="text-xs font-semibold text-teal-700 mb-1">Alcohol</div>
                    <div className="text-sm font-bold text-teal-900">{result.alcoholGuidance}</div>
                  </div>
                </div>
              </div>

              {/* Lifestyle Recommendations */}
              {result.lifestyleRecs.length > 0 && (
                <div className="card">
                  <h2 className="card-header text-base">Lifestyle Interventions</h2>
                  <ul className="space-y-1.5">
                    {result.lifestyleRecs.map((rec, i) => (
                      <li key={i} className="text-sm text-gray-700 flex gap-2">
                        <span className="text-primary mt-0.5">&#8226;</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Pharmacotherapy */}
              {result.pharmacotherapy.length > 0 && (
                <div className="card border-l-4 border-purple-400">
                  <h2 className="card-header text-base">Pharmacotherapy Recommendations</h2>
                  <ul className="space-y-2">
                    {result.pharmacotherapy.map((rx, i) => (
                      <li key={i} className="text-sm text-gray-700 flex gap-2">
                        <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span>{rx}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="card border-2 border-dashed border-gray-300 flex items-center justify-center min-h-[300px]">
              <div className="text-center text-gray-400">
                <div className="text-4xl mb-3">&#128200;</div>
                <p className="text-sm font-medium">Complete all fields to see results</p>
                <p className="text-xs mt-1">TG severity, dietary targets, and pharmacotherapy recommendations will appear here</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* TG Severity Reference Table */}
      <div className="card mt-6">
        <h2 className="card-header">TG Severity Categories Reference</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-primary/20">
                <th className="text-left py-2 pr-4 font-semibold text-primary">Category</th>
                <th className="text-center py-2 px-2 font-semibold text-primary">TG (mg/dL)</th>
                <th className="text-left py-2 pl-4 font-semibold text-primary">Key Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="py-2.5 pr-4 font-medium">Normal</td>
                <td className="py-2.5 px-2 text-center">&lt;150</td>
                <td className="py-2.5 pl-4 text-gray-600">Maintain healthy lifestyle</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-medium">Borderline High</td>
                <td className="py-2.5 px-2 text-center">150-199</td>
                <td className="py-2.5 pl-4 text-gray-600">Lifestyle optimization; address secondary causes</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-medium">Moderate</td>
                <td className="py-2.5 px-2 text-center">200-499</td>
                <td className="py-2.5 pl-4 text-gray-600">Intensive lifestyle + consider IPE if ASCVD + statin</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-medium">Severe</td>
                <td className="py-2.5 px-2 text-center">500-999</td>
                <td className="py-2.5 pl-4 text-gray-600">Fibrate + very-low-fat diet; pancreatitis risk HIGH</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-medium">Very Severe</td>
                <td className="py-2.5 px-2 text-center">&ge;1000</td>
                <td className="py-2.5 pl-4 text-gray-600">Urgent: fibrate + omega-3; consider plasmapheresis</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-xs text-yellow-800">
        <strong>Disclaimer:</strong> This tool is based on the 2026 ACC/AHA Guideline for Management of Dyslipidemia
        and is intended for educational and clinical decision support only. It does not replace clinical judgment.
        Always consider secondary causes of hypertriglyceridemia, patient preferences, and the full clinical picture.
        Not for direct patient care decisions without physician oversight.
      </div>
    </div>
  )
}

// ─── Main Calculator Page ────────────────────────────────────────────────────

export default function CalculatorPage() {
  const { calculatorTab, setCalculatorTab } = useAppStore()

  return (
    <div>
      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6 border-b border-gray-200 pb-3 overflow-x-auto">
        {calculatorTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setCalculatorTab(tab.id)}
            className={`tab-btn whitespace-nowrap ${calculatorTab === tab.id ? 'active' : ''}`}
          >
            <span>{tab.label}</span>
            <span className="hidden sm:inline text-xs opacity-70 ml-1">— {tab.description}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {calculatorTab === 'ldl-goals' && <LDLGoalFinder />}
      {calculatorTab === 'tg-categorizer' && <TGCategorizerCalculator />}
    </div>
  )
}
