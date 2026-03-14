import coeffs from './prevent_ascvd_coeffs.json'
import sdiZipMap from './prevent_sdi_zip_map.json'

type Sex = 'female' | 'male'
type ModelType = 'base_10' | 'acr_10' | 'hba1c_10' | 'sdi_10' | 'full_10'

export interface PreventInputs {
  age: number
  sex: Sex
  systolicBp: number
  totalCholesterol: number
  hdlCholesterol: number
  bmi: number
  egfr: number
  onBpMeds: boolean
  onStatin: boolean
  smoker: boolean
  diabetes: boolean
  hba1c?: number | null
  uacr?: number | null
  zipCode?: string | null
  sdi?: number | null
}

interface CalcResult {
  risk: number
  model: ModelType
  percent: number
}

type CoefMap = Record<string, number>
const PREVENT_COEFFS = coeffs as Record<ModelType, Record<Sex, CoefMap>>
const SDI_ZIP_MAP = sdiZipMap as Record<string, number>

const boolNum = (v: boolean) => (v ? 1 : 0)
const hasNum = (v: number | null | undefined) => typeof v === 'number' && Number.isFinite(v)
const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max)
const normalizeZip = (zip?: string | null) => {
  if (!zip) return null
  const digits = zip.replace(/\D/g, '')
  return digits.length === 5 ? digits : null
}

export const PREVENT_LIMITS = {
  age: { min: 30, max: 79 },
  systolicBp: { min: 90, max: 200 },
  totalCholesterol: { min: 130, max: 320 },
  hdlCholesterol: { min: 20, max: 100 },
  bmi: { min: 18.5, max: 39.9 },
  egfr: { min: 15, max: 140 },
  hba1c: { min: 3, max: 15 },
  uacr: { min: 0.1, max: 25000 },
  sdi: { min: 1, max: 10 },
}

export function getSdiFromZip(zip?: string | null): number | null {
  const normalized = normalizeZip(zip)
  if (!normalized) return null
  const value = SDI_ZIP_MAP[normalized]
  return typeof value === 'number' ? value : null
}

export function choosePreventModel(inputs: PreventInputs): ModelType {
  const hasHba1c = hasNum(inputs.hba1c)
  const hasUacr = hasNum(inputs.uacr)
  const hasSdi = hasNum(inputs.sdi) || getSdiFromZip(inputs.zipCode) !== null
  const count = [hasHba1c, hasUacr, hasSdi].filter(Boolean).length

  if (count === 0) return 'base_10'
  if (count >= 2) return 'full_10'
  if (hasHba1c) return 'hba1c_10'
  if (hasUacr) return 'acr_10'
  return 'sdi_10'
}

export function validatePreventInputs(inputs: PreventInputs): string[] {
  const errs: string[] = []
  const checks: Array<[string, number, { min: number; max: number }]> = [
    ['Age', inputs.age, PREVENT_LIMITS.age],
    ['Systolic BP', inputs.systolicBp, PREVENT_LIMITS.systolicBp],
    ['Total cholesterol', inputs.totalCholesterol, PREVENT_LIMITS.totalCholesterol],
    ['HDL cholesterol', inputs.hdlCholesterol, PREVENT_LIMITS.hdlCholesterol],
    ['BMI', inputs.bmi, PREVENT_LIMITS.bmi],
    ['eGFR', inputs.egfr, PREVENT_LIMITS.egfr],
  ]

  for (const [label, value, range] of checks) {
    if (!Number.isFinite(value) || value < range.min || value > range.max) {
      errs.push(`${label} must be between ${range.min} and ${range.max}.`)
    }
  }

  if (hasNum(inputs.hba1c) && (inputs.hba1c! < PREVENT_LIMITS.hba1c.min || inputs.hba1c! > PREVENT_LIMITS.hba1c.max)) {
    errs.push(`HbA1c must be between ${PREVENT_LIMITS.hba1c.min} and ${PREVENT_LIMITS.hba1c.max} if entered.`)
  }
  if (hasNum(inputs.uacr) && (inputs.uacr! < PREVENT_LIMITS.uacr.min || inputs.uacr! > PREVENT_LIMITS.uacr.max)) {
    errs.push(`UACR must be between ${PREVENT_LIMITS.uacr.min} and ${PREVENT_LIMITS.uacr.max} if entered.`)
  }
  if (hasNum(inputs.sdi) && (inputs.sdi! < PREVENT_LIMITS.sdi.min || inputs.sdi! > PREVENT_LIMITS.sdi.max)) {
    errs.push(`SDI decile must be between ${PREVENT_LIMITS.sdi.min} and ${PREVENT_LIMITS.sdi.max} if entered.`)
  }
  if (inputs.zipCode && !normalizeZip(inputs.zipCode)) {
    errs.push('ZIP code must be a valid 5-digit US ZIP if entered.')
  }

  return errs
}

export function calculatePreventAscvd(inputs: PreventInputs): CalcResult {
  const model = choosePreventModel(inputs)
  const c = PREVENT_COEFFS[model][inputs.sex]

  const age = clamp(inputs.age, PREVENT_LIMITS.age.min, PREVENT_LIMITS.age.max)
  const sbp = clamp(inputs.systolicBp, PREVENT_LIMITS.systolicBp.min, PREVENT_LIMITS.systolicBp.max)
  const total = clamp(inputs.totalCholesterol, PREVENT_LIMITS.totalCholesterol.min, PREVENT_LIMITS.totalCholesterol.max)
  const hdlRaw = clamp(inputs.hdlCholesterol, PREVENT_LIMITS.hdlCholesterol.min, PREVENT_LIMITS.hdlCholesterol.max)
  const bmiRaw = clamp(inputs.bmi, PREVENT_LIMITS.bmi.min, PREVENT_LIMITS.bmi.max)
  const egfrRaw = clamp(inputs.egfr, PREVENT_LIMITS.egfr.min, PREVENT_LIMITS.egfr.max)

  const age10 = (age - 55) / 10
  const nonHdl = (total - hdlRaw) * 0.02586 - 3.5
  const hdl = (hdlRaw * 0.02586 - 1.3) / 0.3
  const sbpLt110 = (Math.min(sbp, 110) - 110) / 20
  const sbpGte110 = (Math.max(sbp, 110) - 130) / 20
  const bmiLt30 = (Math.min(bmiRaw, 30) - 25) / 5
  const bmiGt30 = (Math.max(bmiRaw, 30) - 30) / 5
  const egfrLt60 = (Math.min(egfrRaw, 60) - 60) / -15
  const egfrGte60 = (Math.max(egfrRaw, 60) - 90) / -15

  const diabetes = boolNum(inputs.diabetes)
  const smoker = boolNum(inputs.smoker)
  const onBpMeds = boolNum(inputs.onBpMeds)
  const onStatin = boolNum(inputs.onStatin)

  let sdi4to6 = 0
  let sdi7to10 = 0
  let missSdi = 0
  if (model === 'sdi_10' || model === 'full_10') {
    const resolvedSdi = hasNum(inputs.sdi)
      ? clamp(inputs.sdi!, PREVENT_LIMITS.sdi.min, PREVENT_LIMITS.sdi.max)
      : getSdiFromZip(inputs.zipCode)

    if (typeof resolvedSdi === 'number') {
      sdi4to6 = resolvedSdi >= 4 && resolvedSdi <= 6 ? 1 : 0
      sdi7to10 = resolvedSdi >= 7 ? 1 : 0
    } else {
      if (model === 'full_10') {
        missSdi = 1
      }
    }
  }

  let lnAcr = 0
  let missLnAcr = 0
  if (model === 'acr_10' || model === 'full_10') {
    if (hasNum(inputs.uacr)) {
      lnAcr = Math.log(clamp(inputs.uacr!, PREVENT_LIMITS.uacr.min, PREVENT_LIMITS.uacr.max))
    } else if (model === 'full_10') {
      missLnAcr = 1
    }
  }

  let hba1cDm = 0
  let hba1cNoDm = 0
  let missHba1c = 0
  if (model === 'hba1c_10' || model === 'full_10') {
    if (hasNum(inputs.hba1c)) {
      const hba1c = clamp(inputs.hba1c!, PREVENT_LIMITS.hba1c.min, PREVENT_LIMITS.hba1c.max)
      hba1cDm = (hba1c - 5.3) * diabetes
      hba1cNoDm = (hba1c - 5.3) * (1 - diabetes)
    } else if (model === 'full_10') {
      missHba1c = 1
    }
  }

  const features: Record<string, number> = {
    coef_age_per_10_years: age10,
    coef_age_per_10_years_squared: age10 * age10,
    coef_non_hdl_c_per_1_mmol_l: nonHdl,
    'coef_hdl_c_per_0.3_mmol_l': hdl,
    coef_sbp_lt110_per_20_mmhg: sbpLt110,
    coef_sbp_gteq110_per_20_mmhg: sbpGte110,
    coef_diabetes: diabetes,
    coef_current_smoking: smoker,
    coef_bmi_lt30_per_5_kg_m2: bmiLt30,
    coef_bmi_gt30_per_5_kg_m2: bmiGt30,
    coef_egfr_lt60_per_15_ml: egfrLt60,
    coef_egfr_gteq60_per_15_ml: egfrGte60,
    coef_anti_hypertensive_use: onBpMeds,
    coef_statin_use: onStatin,
    coef_treated_sbp_gteq110_mm_hg_per_20_mm_hg: sbpGte110 * onBpMeds,
    coef_treated_non_hdl_c: nonHdl * onStatin,
    coef_age_per_10yr_x_non_hdl_c_per_1_mmol_l: age10 * nonHdl,
    'coef_age_per_10yr_x_hdl_c_per_0.3_mml_l': age10 * hdl,
    coef_age_per_10yr_x_sbp_gteq110_mm_hg_per_20_mmhg: age10 * sbpGte110,
    coef_age_per_10yr_x_diabetes: age10 * diabetes,
    coef_age_per_10yr_x_current_smoking: age10 * smoker,
    coef_age_per_10yr_x_bmi_gteq30_per_5_kg_m2: age10 * bmiGt30,
    coef_age_per_10yr_x_egfr_lt60_per_15_ml: age10 * egfrLt60,
    coef_sdi_decile_between_4_and_6: sdi4to6,
    coef_sdi_decile_between_7_and_10: sdi7to10,
    coef_miss_sdi: missSdi,
    coef_ln_acr: lnAcr,
    coef_miss_ln_acr: missLnAcr,
    'coef_hba1c_minus_5.3_x_diabetes': hba1cDm,
    'coef_hba1c_minus_5.3_x_1_minus_diabetes': hba1cNoDm,
    coef_miss_hba1c: missHba1c,
    const: 1,
  }

  const logit = Object.entries(features).reduce((sum, [key, value]) => sum + (c[key] ?? 0) * value, 0)
  const risk = 1 / (1 + Math.exp(-logit))

  return {
    risk,
    model,
    percent: risk * 100,
  }
}

export const PREVENT_VALIDATION_CASES: Array<{ label: string; inputs: PreventInputs; expectedPercent: number }> = [
  {
    label: 'Published base-model example',
    inputs: {
      age: 50,
      sex: 'female',
      systolicBp: 160,
      totalCholesterol: 200,
      hdlCholesterol: 45,
      bmi: 35,
      egfr: 90,
      onBpMeds: true,
      onStatin: false,
      smoker: false,
      diabetes: true,
    },
    expectedPercent: 9.1950898,
  },
  {
    label: 'Reference female low-risk case',
    inputs: {
      age: 55,
      sex: 'female',
      systolicBp: 120,
      totalCholesterol: 213,
      hdlCholesterol: 50,
      bmi: 28,
      egfr: 100,
      onBpMeds: false,
      onStatin: false,
      smoker: false,
      diabetes: false,
    },
    expectedPercent: 1.910652,
  },
  {
    label: 'Reference male low-risk case',
    inputs: {
      age: 55,
      sex: 'male',
      systolicBp: 120,
      totalCholesterol: 213,
      hdlCholesterol: 50,
      bmi: 28,
      egfr: 100,
      onBpMeds: false,
      onStatin: false,
      smoker: false,
      diabetes: false,
    },
    expectedPercent: 2.7788957,
  },
  {
    label: 'Reference male higher-risk case',
    inputs: {
      age: 66,
      sex: 'male',
      systolicBp: 148,
      totalCholesterol: 188,
      hdlCholesterol: 52,
      bmi: 30,
      egfr: 67,
      onBpMeds: false,
      onStatin: true,
      smoker: true,
      diabetes: true,
    },
    expectedPercent: 14.2049701,
  },
  {
    label: 'Reference female higher-risk case',
    inputs: {
      age: 66,
      sex: 'female',
      systolicBp: 148,
      totalCholesterol: 188,
      hdlCholesterol: 52,
      bmi: 30,
      egfr: 67,
      onBpMeds: false,
      onStatin: true,
      smoker: true,
      diabetes: true,
    },
    expectedPercent: 13.524359,
  },
]

export function validatePreventImplementation() {
  return PREVENT_VALIDATION_CASES.map((test) => {
    const actual = calculatePreventAscvd(test.inputs).percent
    return {
      label: test.label,
      expectedPercent: test.expectedPercent,
      actualPercent: actual,
      absDiff: Math.abs(actual - test.expectedPercent),
    }
  })
}
