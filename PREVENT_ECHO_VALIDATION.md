# PREVENT ASCVD Calculator — Echo Validation Report

**Date**: 2026-03-14
**Scope**: 10-year ASCVD risk only (base model), with optional HbA1c/UACR/SDI add-ons
**Sources**: `preventr` R package (v0.11.0), `PooledCohort` R package (v0.0.2), AHA PREVENT FAQ PDF, Khan et al. Circulation 2023 (doi: 10.1161/CIRCULATIONAHA.123.067626)

---

## 1. Exact Validation Checklist

### 1A. Input Validation

| # | Check | Range / Rule | Source |
|---|-------|-------------|--------|
| 1 | Age | 30–79 years (integer or float) | FAQ PDF, R packages |
| 2 | Sex | Female / Male (sex-specific coefficients, no race) | FAQ PDF |
| 3 | Total cholesterol | 130–320 mg/dL | R packages (`check_args.R`) |
| 4 | HDL cholesterol | 20–100 mg/dL | R packages |
| 5 | Systolic BP | 90–200 mmHg (capped at 180 in spline) | R packages |
| 6 | Diabetes | Yes / No (binary) | R packages |
| 7 | Current smoker | Yes / No (binary) | R packages |
| 8 | BMI | 18.5–39.9 kg/m² | R packages, FAQ |
| 9 | eGFR | 15–140 mL/min/1.73m² | R packages |
| 10 | On antihypertensive meds | Yes / No (binary) | R packages |
| 11 | On statin | Yes / No (binary) | R packages |
| 12 | **Optional**: UACR | mg/g (positive numeric) | R packages |
| 13 | **Optional**: HbA1c | 4.5–15% | R packages |
| 14 | **Optional**: SDI | 1–10 decile (zip-code lookup) | R packages |

**Reject/warn**: calculator MUST NOT produce a result if any required field (1–11) is missing or out of range.

### 1B. Transformation Verification

| # | Check | Formula |
|---|-------|---------|
| T1 | Age centering | `(age - 55) / 10` |
| T2 | Non-HDL-C conversion | `(total_c - hdl_c) * 0.02586 - 3.5` (mg/dL → mmol/L, centered) |
| T3 | HDL-C conversion | `(hdl_c * 0.02586 - 1.3) / 0.3` |
| T4 | SBP piecewise spline | knot at 110: `lt110 = (min(sbp,110) - 110) / 20`; `gte110 = (max(sbp,110) - 130) / 20` |
| T5 | BMI piecewise spline | knot at 30: `lt30 = (min(bmi,30) - 25) / 5`; `gt30 = (max(bmi,30) - 30) / 5` |
| T6 | eGFR piecewise spline | knot at 60: `lt60 = (min(egfr,60) - 60) / -15`; `gte60 = (max(egfr,60) - 90) / -15` |
| T7 | Treatment interaction: BP | `sbp_gte110_term * bp_meds` |
| T8 | Treatment interaction: statin | `non_hdl_c_term * statin` |
| T9 | Age interactions (7 terms) | `age_term * [non_hdl_c, hdl_c, sbp_gte110, diabetes, smoking, bmi_gt30, egfr_lt60]` |
| T10 | Logistic conversion | `risk = exp(sum) / (1 + exp(sum))` — NOT Cox/survival model |

### 1C. Coefficient Verification

| # | Check |
|---|-------|
| C1 | Female ASCVD 10yr base intercept = **-3.819975** |
| C2 | Male ASCVD 10yr base intercept = **-3.500655** |
| C3 | Total predictor terms = 24 (23 predictors + 1 intercept) for base model |
| C4 | Base model: all BMI coefficients = 0 (BMI enters only through optional models) — verify this matches source |
| C5 | Base model: `age_squared` coefficient = 0 (only used in 30-year model) |
| C6 | Optional model coefficients load correctly when HbA1c/UACR/SDI provided |

### 1D. Output Verification

| # | Check |
|---|-------|
| O1 | Output is **10-year ASCVD risk** as a percentage (0–100%) |
| O2 | Risk rounded to 1 decimal place for display (e.g. "9.2%") |
| O3 | Risk category thresholds match 2026 DLP guideline: <3% low, 3–<5% borderline, 5–<10% intermediate, ≥10% high |
| O4 | ASCVD outcome = coronary heart disease + stroke (NOT total CVD, NOT heart failure) |
| O5 | PREVENT does NOT output "change in risk" from treatment — it's a snapshot at current values |

### 1E. Edge Case Verification

| # | Check |
|---|-------|
| E1 | Age 30 (minimum) produces valid output |
| E2 | Age 79 (maximum) produces valid output |
| E3 | All SBP < 110 mmHg: `gte110` term = 0, `lt110` term is negative |
| E4 | All eGFR ≥ 60: `lt60` term = 0, `lt60` age-interaction = 0 |
| E5 | Non-diabetic with no HbA1c: only base model applies |
| E6 | Statin=yes increases `treated_non_hdl_c` interaction (partially offsets statin protective coeff) |
| E7 | BMI exactly 30: both spline segments = boundary values (lt30=1.0, gt30=0.0) |
| E8 | Minimum-risk profile produces risk < 1% |
| E9 | Maximum-risk profile produces risk > 50% |

---

## 2. Test Vectors

All vectors below are from published R package test suites validated against Khan et al. Supplemental Table S12.

### Test Vector 1: Female, Base Model — High Risk

**Inputs**: Age=50, Sex=Female, Total-C=200, HDL-C=45, SBP=160, BP-meds=Yes, Statin=No, Diabetes=Yes, Smoking=No, eGFR=90, BMI=35

| Model | Expected 10yr ASCVD |
|-------|---------------------|
| Base | **9.2%** |

### Test Vector 2: Male, Base Model — High Risk

**Inputs**: Same as Vector 1 except Sex=Male

| Model | Expected 10yr ASCVD |
|-------|---------------------|
| Base | **10.2%** |

### Test Vector 3: Female, HbA1c Model

**Inputs**: Same as Vector 1 + HbA1c=9.2%

| Model | Expected 10yr ASCVD |
|-------|---------------------|
| HbA1c | **10.3%** |

### Test Vector 4: Male, HbA1c Model

**Inputs**: Same as Vector 2 + HbA1c=9.2%

| Model | Expected 10yr ASCVD |
|-------|---------------------|
| HbA1c | **11.2%** |

### Test Vector 5: Female, UACR Model

**Inputs**: Same as Vector 1 + UACR=92 mg/g

| Model | Expected 10yr ASCVD |
|-------|---------------------|
| UACR | **11.1%** |

### Test Vector 6: Male, UACR Model

**Inputs**: Same as Vector 2 + UACR=92 mg/g

| Model | Expected 10yr ASCVD |
|-------|---------------------|
| UACR | **12.3%** |

### Test Vector 7: Female, Full Model

**Inputs**: Same as Vector 1 + HbA1c=9.2%, UACR=92, SDI zip=14738

| Model | Expected 10yr ASCVD |
|-------|---------------------|
| Full | **10.5%** |

### Test Vector 8: Male, Full Model

**Inputs**: Same as Vector 2 + HbA1c=9.2%, UACR=92, SDI zip=14738

| Model | Expected 10yr ASCVD |
|-------|---------------------|
| Full | **11.2%** |

### Test Vector 9: PooledCohort Package Cross-Check (Female, HbA1c=7.5, ACR=40, SDI=8)

**Inputs**: Same demographics as Vector 1, but HbA1c=7.5, ACR=40, SDI decile=8

| Model | Expected 10yr ASCVD |
|-------|---------------------|
| Base | 9.20% |
| ACR | 9.94% |
| HbA1c | 8.35% |
| SDI | 10.03% |
| Full | 9.64% |

### Test Vector 10: PooledCohort Package Cross-Check (Male, HbA1c=7.5, ACR=40, SDI=8)

**Inputs**: Same as Vector 9 except Sex=Male

| Model | Expected 10yr ASCVD |
|-------|---------------------|
| Base | 10.19% |
| ACR | 10.97% |
| HbA1c | 9.37% |
| SDI | 11.37% |
| Full | 11.00% |

### Tolerance

- **Acceptable**: ±0.1 percentage points (e.g., 9.2% vs 9.1% or 9.3%)
- **Ideal**: exact match to 1 decimal place with the R package outputs
- **Unacceptable**: >0.5 percentage point deviation on any test vector

---

## 3. Reference Coefficients (Base Model, 10-Year ASCVD)

### Female Coefficients

```
age_per_10yr                      =  0.719883
age_per_10yr_squared              =  0.0
non_hdl_c_per_1_mmol_l            =  0.1176967
hdl_c_per_0.3_mmol_l              = -0.151185
sbp_lt110_per_20_mmhg             = -0.0835358
sbp_gte110_per_20_mmhg            =  0.3592852
diabetes                          =  0.8348585
current_smoking                   =  0.4831078
bmi_lt30_per_5_kg_m2              =  0.0
bmi_gt30_per_5_kg_m2              =  0.0
egfr_lt60_per_15_ml               =  0.4864619
egfr_gte60_per_15_ml              =  0.0397779
anti_hypertensive_use             =  0.2265309
statin_use                        = -0.0592374
treated_sbp_gte110_per_20_mmhg    = -0.0395762
treated_non_hdl_c                 =  0.0844423
age_x_non_hdl_c                   = -0.0567839
age_x_hdl_c                       =  0.0325692
age_x_sbp_gte110                  = -0.1035985
age_x_diabetes                    = -0.2417542
age_x_current_smoking             = -0.0791142
age_x_bmi_gte30                   =  0.0
age_x_egfr_lt60                   = -0.1671492
const (intercept)                 = -3.819975
```

### Male Coefficients

```
age_per_10yr                      =  0.7099847
age_per_10yr_squared              =  0.0
non_hdl_c_per_1_mmol_l            =  0.1658663
hdl_c_per_0.3_mmol_l              = -0.1144285
sbp_lt110_per_20_mmhg             = -0.2837212
sbp_gte110_per_20_mmhg            =  0.3239977
diabetes                          =  0.7189597
current_smoking                   =  0.3956973
bmi_lt30_per_5_kg_m2              =  0.0
bmi_gt30_per_5_kg_m2              =  0.0
egfr_lt60_per_15_ml               =  0.3690075
egfr_gte60_per_15_ml              =  0.0203619
anti_hypertensive_use             =  0.2036522
statin_use                        = -0.0865581
treated_sbp_gte110_per_20_mmhg    = -0.0322916
treated_non_hdl_c                 =  0.114563
age_x_non_hdl_c                   = -0.0300005
age_x_hdl_c                       =  0.0232747
age_x_sbp_gte110                  = -0.0927024
age_x_diabetes                    = -0.2018525
age_x_current_smoking             = -0.0970527
age_x_bmi_gte30                   =  0.0
age_x_egfr_lt60                   = -0.1217081
const (intercept)                 = -3.500655
```

### Extended Model Coefficients (ASCVD 10yr, additional terms only)

**ACR model** (adds to base):
| Term | Female | Male |
|------|--------|------|
| ln_acr | 0.1501217 | 0.1510073 |
| miss_ln_acr | 0.0050257 | 0.0556 |
| const | -4.174614 | -3.85146 |

**HbA1c model** (adds to base):
| Term | Female | Male |
|------|--------|------|
| hba1c_minus_5.3_x_diabetes | 0.1339055 | 0.1157161 |
| hba1c_minus_5.3_x_1_minus_diabetes | 0.1596461 | 0.1288303 |
| miss_hba1c | (in coef table) | (in coef table) |
| const | -3.838746 | -3.51835 |

**SDI model** (adds to base):
| Term | Female | Male |
|------|--------|------|
| sdi_decile_4_to_6 | 0.1473705 | 0.0728242 |
| sdi_decile_7_to_10 | 0.2451878 | 0.2824453 |
| miss_sdi | (in coef table) | (in coef table) |
| const | -3.955898 | -3.624712 |

**Full model** const: Female = -4.291503, Male = -3.969788

---

## 4. Fallback Plan

If exact coefficient-level parity cannot be achieved (e.g., unable to extract all coefficients from `.rda` binary, or rounding discrepancies exceed tolerance):

### Tier 1: R-Package-as-Oracle (Recommended)

1. Install `PooledCohort` or `preventr` R package in the build/test pipeline
2. Write a harness that calls the R function with N test vectors and captures outputs
3. Compare our JS/TS implementation output against R outputs
4. **Acceptance**: all test vectors within ±0.1pp

### Tier 2: Regression Test Suite from Published Tables

1. Use Khan et al. Supplemental Tables S12–S14 as ground truth
2. These contain expected outputs for standardized patient profiles
3. Implement as automated snapshot tests in our codebase
4. **Acceptance**: all published values reproduced exactly

### Tier 3: Official Calculator Cross-Validation

1. Manually enter 10+ diverse profiles into the AHA online calculator at `professional.heart.org/en/guidelines-and-statements/prevent-calculator`
2. Screenshot and record each result
3. Compare against our implementation
4. **Acceptance**: all values within ±0.1pp of AHA calculator display

### Tier 4: Graceful Degradation

If no coefficient source can be validated to sufficient precision:
1. Display a disclaimer: "Estimate only — verify with official AHA PREVENT calculator"
2. Link to the official AHA calculator
3. Log discrepancy metrics for monitoring
4. Ship base model only (most validated), defer optional models

### Known Risks

| Risk | Mitigation |
|------|-----------|
| Coefficient extraction from `.rda` binary may have rounding errors | Cross-check against both R packages + Excel source in `data-raw/coefs_prevent.xlsx` |
| BMI coefficients are 0 in base model but non-zero in some extended models | Verify which model variant the DLP2026 app targets |
| SDI requires zip-code-to-decile lookup table (US only) | Either bundle lookup table or omit SDI for v1 |
| 30-year model adds `age_squared` term — different coefficient set | Separate validation needed if 30-year risk is implemented |
| AHA online calculator may use different rounding than R packages | Treat R packages as authoritative (they are the reference implementation) |

---

## 5. Implementation Notes for DLP2026

1. **Model selection**: The 2026 Dyslipidemia Guideline uses **PREVENT-ASCVD** (not PREVENT-CVD or PREVENT-HF) for lipid-lowering therapy decisions
2. **Logistic model**: PREVENT uses `exp(x)/(1+exp(x))` — NOT the Cox proportional hazards model used by the old PCEs
3. **No race variable**: PREVENT intentionally excludes race/ethnicity — sex-specific coefficients only
4. **Unit conversion**: Calculator accepts mg/dL (US standard) but internally converts to mmol/L for non-HDL-C and HDL-C
5. **BMI default**: If BMI is not provided, some implementations default to 30 kg/m² — our implementation should REQUIRE it per FAQ guidance
6. **Treatment modeling**: The calculator is NOT designed to show "what-if" treatment effects — it estimates risk at current values

---

## Appendix: Formula Walkthrough (Test Vector 1)

**Inputs**: Female, Age=50, Total-C=200, HDL-C=45, SBP=160, BP-meds=Yes, Statin=No, DM=Yes, Smoking=No, eGFR=90, BMI=35

**Step 1 — Transform inputs**:
```
age_10yr         = (50 - 55) / 10                    = -0.5
non_hdl_c        = (200 - 45) * 0.02586 - 3.5        = 0.5083
hdl_c            = (45 * 0.02586 - 1.3) / 0.3        = -0.4537
sbp_lt110        = (min(160,110) - 110) / 20          = 0.0
sbp_gte110       = (max(160,110) - 130) / 20          = 1.5
diabetes         = 1
smoking          = 0
bmi_lt30         = (min(35,30) - 25) / 5              = 1.0
bmi_gt30         = (max(35,30) - 30) / 5              = 1.0
egfr_lt60        = (min(90,60) - 60) / -15            = 0.0
egfr_gte60       = (max(90,60) - 90) / -15            = 0.0
bp_meds          = 1
statin           = 0
treated_sbp      = 1.5 * 1                            = 1.5
treated_non_hdl  = 0.5083 * 0                          = 0.0
```

**Step 2 — Age interactions**:
```
age_x_non_hdl    = -0.5 * 0.5083                      = -0.25415
age_x_hdl        = -0.5 * -0.4537                     = 0.22685
age_x_sbp_gte110 = -0.5 * 1.5                         = -0.75
age_x_diabetes   = -0.5 * 1                           = -0.5
age_x_smoking    = -0.5 * 0                            = 0.0
age_x_bmi_gte30  = -0.5 * 1.0                         = -0.5
age_x_egfr_lt60  = -0.5 * 0.0                         = 0.0
```

**Step 3 — Linear predictor (sum of coef × term)**:
```
ind_sum =
  0.719883  * (-0.5)      +   # age
  0.0       * 0.25        +   # age²
  0.1176967 * 0.5083      +   # non-hdl-c
 -0.151185  * (-0.4537)   +   # hdl-c
 -0.0835358 * 0.0         +   # sbp<110
  0.3592852 * 1.5         +   # sbp≥110
  0.8348585 * 1           +   # diabetes
  0.4831078 * 0           +   # smoking
  0.0       * 1.0         +   # bmi<30
  0.0       * 1.0         +   # bmi>30
  0.4864619 * 0.0         +   # egfr<60
  0.0397779 * 0.0         +   # egfr≥60
  0.2265309 * 1           +   # bp-meds
 -0.0592374 * 0           +   # statin
 -0.0395762 * 1.5         +   # treated-sbp
  0.0844423 * 0.0         +   # treated-non-hdl
 -0.0567839 * (-0.25415)  +   # age×non-hdl
  0.0325692 * 0.22685     +   # age×hdl
 -0.1035985 * (-0.75)     +   # age×sbp≥110
 -0.2417542 * (-0.5)      +   # age×diabetes
 -0.0791142 * 0.0         +   # age×smoking
  0.0       * (-0.5)      +   # age×bmi≥30
 -0.1671492 * 0.0         +   # age×egfr<60
 -3.819975                    # intercept
```

**Step 4 — Compute**:
```
ind_sum ≈ -2.287  (verify exact value during implementation)
risk = exp(-2.287) / (1 + exp(-2.287)) ≈ 0.092 = 9.2%  ✓
```

---

*Validation prepared by Echo. Coefficient source: preventr v0.11.0 + PooledCohort v0.0.2 R packages. Test vectors from Khan et al. Supplemental Table S12.*
