'use client'

import { useAppStore } from '@/store/appStore'

const tabs = [
  { id: 'prevent', label: 'PREVENT-ASCVD' },
  { id: 'risk-enhancers', label: 'Risk Enhancers' },
  { id: 'cac', label: 'CAC Scoring' },
  { id: 'primary', label: 'Primary Prevention' },
  { id: 'secondary', label: 'Secondary Prevention' },
  { id: 'special-groups', label: 'Special Groups' },
]

export default function ClassificationPage() {
  const { classificationTab, setClassificationTab } = useAppStore()

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-primary mb-1">Risk Stratification</h1>
      <p className="text-sm text-gray-500 mb-4">2026 ACC/AHA: PREVENT equations, risk enhancers, CAC, and management by risk category</p>

      <div className="flex flex-wrap gap-1 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setClassificationTab(tab.id)}
            className={`tab-btn ${classificationTab === tab.id ? 'tab-btn-active' : 'tab-btn-inactive'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ───────── PREVENT-ASCVD ───────── */}
      {classificationTab === 'prevent' && (
        <div className="space-y-4">
          <div className="card border-l-4 border-blue-500">
            <h2 className="card-header text-blue-700">PREVENT Equations Replace the Pooled Cohort Equations</h2>
            <p className="text-sm text-gray-600 mb-3">
              The AHA PREVENT (Predicting Risk of cardiovascular disease EVENTs) calculator replaces the 2013 Pooled Cohort Equations (PCE) for estimating 10-year and 30-year ASCVD risk. PREVENT was developed in a more contemporary, diverse population and includes additional variables such as eGFR, HbA1c (optional), and UACR (optional). It does not use race as a variable. PREVENT is validated for adults aged 30 to 79 years without established ASCVD.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h3 className="font-bold text-sm text-blue-800 mb-2">Key PREVENT Inputs</h3>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>Age, sex, systolic BP, BP treatment status</li>
                  <li>Total cholesterol, HDL-C</li>
                  <li>Current smoking status, diabetes status</li>
                  <li>eGFR (required)</li>
                  <li>HbA1c (optional, improves precision in diabetes)</li>
                  <li>UACR (optional, captures renal risk)</li>
                  <li>Statin use (optional)</li>
                  <li>Race/ethnicity is NOT included</li>
                </ul>
              </div>
              <div className="bg-teal-50 rounded-lg p-4 border border-teal-200">
                <h3 className="font-bold text-sm text-teal-800 mb-2">What PREVENT Predicts</h3>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li><strong>10-year risk</strong> of atherosclerotic CVD (MI, stroke)</li>
                  <li><strong>30-year risk</strong> for younger adults (30-59 years)</li>
                  <li>Can also estimate total CVD risk (ASCVD + HF)</li>
                  <li>CKM-adjusted estimates available when eGFR and HbA1c/UACR are included</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="card-header">PREVENT 10-Year Risk Categories</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="text-left py-2 px-3">10-Year PREVENT Risk</th>
                    <th className="text-left py-2 px-3">Category</th>
                    <th className="text-left py-2 px-3">General Management Direction</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="py-2 px-3 font-medium">&lt;3%</td>
                    <td className="py-2 px-3"><span className="badge-green">Low</span></td>
                    <td className="py-2 px-3">Emphasize lifestyle optimization. Pharmacotherapy generally not recommended unless LDL-C 160-189 mg/dL with risk enhancers, or 30-year risk is elevated.</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">3% to &lt;5%</td>
                    <td className="py-2 px-3"><span className="badge-yellow">Borderline</span></td>
                    <td className="py-2 px-3">Clinician-patient risk discussion. Consider moderate-intensity statin if risk enhancers are present. CAC scoring can help reclassify.</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">5% to &lt;10%</td>
                    <td className="py-2 px-3"><span className="badge-yellow">Intermediate</span></td>
                    <td className="py-2 px-3">At least moderate-intensity statin is recommended. Higher end of range or presence of enhancers may justify high-intensity therapy. CAC can further refine.</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">&ge;10%</td>
                    <td className="py-2 px-3"><span className="badge-red">High</span></td>
                    <td className="py-2 px-3">High-intensity statin is generally indicated. Strong emphasis on LDL-C goal attainment. Add nonstatin therapy if goals are not met.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <h2 className="card-header">PCE-to-PREVENT Risk Crosswalk</h2>
            <p className="text-sm text-gray-600 mb-3">
              Because PREVENT estimates tend to be lower than PCE for the same patient, the 2026 guideline provides updated thresholds. The table below maps the approximate equivalence between the two calculators.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="text-left py-2 px-3">Category</th>
                    <th className="text-left py-2 px-3">Old PCE Threshold</th>
                    <th className="text-left py-2 px-3">New PREVENT Threshold</th>
                    <th className="text-left py-2 px-3">Note</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="py-2 px-3 font-medium">Low</td>
                    <td className="py-2 px-3">&lt;5%</td>
                    <td className="py-2 px-3">&lt;3%</td>
                    <td className="py-2 px-3">PREVENT risk estimates are generally lower than PCE for the same individual</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">Borderline</td>
                    <td className="py-2 px-3">5% to &lt;7.5%</td>
                    <td className="py-2 px-3">3% to &lt;5%</td>
                    <td className="py-2 px-3">Zone where risk enhancers and CAC are most useful for treatment decisions</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">Intermediate</td>
                    <td className="py-2 px-3">7.5% to &lt;20%</td>
                    <td className="py-2 px-3">5% to &lt;10%</td>
                    <td className="py-2 px-3">Moderate- or high-intensity statin recommended based on LDL-C and enhancers</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">High</td>
                    <td className="py-2 px-3">&ge;20%</td>
                    <td className="py-2 px-3">&ge;10%</td>
                    <td className="py-2 px-3">High-intensity statin with goal-directed therapy</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <h2 className="card-header">30-Year Risk Assessment</h2>
            <p className="text-sm text-gray-600 mb-3">
              For adults aged 30 to 59 years with low 10-year risk (&lt;3%), the 30-year PREVENT risk estimate helps identify individuals with high lifetime burden who may benefit from earlier lifestyle intervention or pharmacotherapy discussion.
            </p>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-gray-700">
              <strong>When to use 30-year risk:</strong> Particularly valuable in younger adults where short-term risk appears low but cumulative exposure to elevated LDL-C, hypertension, or metabolic risk factors confers substantial long-term risk. A high 30-year risk combined with risk enhancers supports initiating at least moderate-intensity statin therapy.
            </div>
          </div>
        </div>
      )}

      {/* ───────── RISK ENHANCERS ───────── */}
      {classificationTab === 'risk-enhancers' && (
        <div className="space-y-4">
          <div className="card border-l-4 border-purple-500">
            <h2 className="card-header text-purple-700">Risk-Enhancing Factors Not Fully Captured by PREVENT</h2>
            <p className="text-sm text-gray-600 mb-4">
              These factors are not included (or not fully weighted) in the PREVENT equations but independently increase ASCVD risk. Their presence supports intensifying prevention strategies, particularly in the borderline and intermediate risk zones.
            </p>
          </div>

          <div className="card">
            <h2 className="card-header">Family History and Genetics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                <h3 className="font-bold text-sm text-red-800 mb-2">Premature ASCVD Family History</h3>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>First-degree male relative with ASCVD at age &lt;55 years</li>
                  <li>First-degree female relative with ASCVD at age &lt;65 years</li>
                  <li>Strongest enhancer when multiple first-degree relatives are affected</li>
                  <li>Supports earlier and more aggressive lipid-lowering strategy</li>
                </ul>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                <h3 className="font-bold text-sm text-purple-800 mb-2">South Asian Ancestry</h3>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>Higher prevalence of insulin resistance, atherogenic dyslipidemia, and elevated Lp(a)</li>
                  <li>ASCVD events occur at younger ages and lower traditional risk factor burdens</li>
                  <li>Standard risk calculators may underestimate true risk</li>
                  <li>Should lower the threshold for initiating statin therapy</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="card-header">Biomarker and Lipid-Based Enhancers</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="text-left py-2 px-3">Marker</th>
                    <th className="text-left py-2 px-3">Threshold</th>
                    <th className="text-left py-2 px-3">Clinical Significance</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="py-2 px-3 font-medium">Lp(a)</td>
                    <td className="py-2 px-3"><span className="badge-red">&ge;125 nmol/L (&ge;50 mg/dL)</span></td>
                    <td className="py-2 px-3">Independent causal risk factor for ASCVD and aortic stenosis. Measure at least once in every adult. Intensify LDL-C lowering when elevated.</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">hsCRP</td>
                    <td className="py-2 px-3"><span className="badge-yellow">&ge;2.0 mg/L</span></td>
                    <td className="py-2 px-3">Marker of residual inflammatory risk. Persistent elevation supports intensified statin therapy or consideration of anti-inflammatory strategies.</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">Triglycerides</td>
                    <td className="py-2 px-3"><span className="badge-yellow">&ge;175 mg/dL (persistently)</span></td>
                    <td className="py-2 px-3">Reflects triglyceride-rich lipoprotein burden and remnant cholesterol. Consider apoB measurement to assess residual atherogenic risk.</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">LDL-C</td>
                    <td className="py-2 px-3"><span className="badge-yellow">160-189 mg/dL</span></td>
                    <td className="py-2 px-3">Even without reaching 190 mg/dL threshold for severe hypercholesterolemia, this range carries meaningful cumulative risk, especially in younger adults.</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">apoB</td>
                    <td className="py-2 px-3"><span className="badge-blue">&ge;130 mg/dL</span></td>
                    <td className="py-2 px-3">Elevated apoB when LDL-C appears at goal indicates residual atherogenic particle burden; particularly important with metabolic syndrome or diabetes.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <h2 className="card-header">Inflammatory and Metabolic Conditions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                <h3 className="font-bold text-sm text-orange-800 mb-2">Chronic Inflammatory Diseases</h3>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>Rheumatoid arthritis</li>
                  <li>Systemic lupus erythematosus</li>
                  <li>Psoriasis (especially severe)</li>
                  <li>Inflammatory bowel disease</li>
                  <li>HIV infection (chronic inflammation and ART effects)</li>
                  <li>These conditions accelerate atherosclerosis independently of traditional risk factors</li>
                </ul>
              </div>
              <div className="bg-teal-50 rounded-lg p-4 border border-teal-200">
                <h3 className="font-bold text-sm text-teal-800 mb-2">CKM Syndrome</h3>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>Cardiovascular-kidney-metabolic (CKM) syndrome represents interconnected pathophysiology</li>
                  <li>Includes metabolic syndrome, CKD, type 2 diabetes, and obesity</li>
                  <li>CKD (eGFR &lt;60 mL/min/1.73m&sup2; or albuminuria) independently amplifies ASCVD risk</li>
                  <li>PREVENT partially captures via eGFR input, but CKM phenotype adds beyond the equation</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="card-header">Reproductive and Sex-Specific Risk Markers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                ['Premature menopause', 'Natural menopause before age 40 or surgical menopause. Associated with accelerated atherogenesis and earlier CVD events.'],
                ['Preeclampsia', 'History of preeclampsia approximately doubles long-term CVD risk, particularly if recurrent or early-onset.'],
                ['Gestational diabetes', 'Indicates underlying metabolic vulnerability; associated with future type 2 diabetes and increased CVD risk.'],
                ['Preterm delivery', 'Delivery before 37 weeks, especially before 32 weeks, is associated with increased maternal CVD risk in subsequent decades.'],
              ].map(([title, desc]) => (
                <div key={title} className="bg-pink-50 rounded-lg p-4 border border-pink-200">
                  <h3 className="font-semibold text-sm text-pink-800">{title}</h3>
                  <p className="text-sm text-gray-700 mt-1">{desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg text-sm text-gray-700">
              <strong>Clinical implication:</strong> Adverse pregnancy outcomes should be ascertained in all women during cardiovascular risk assessment. These histories lower the threshold for initiating statin therapy, especially in the borderline-intermediate risk range.
            </div>
          </div>
        </div>
      )}

      {/* ───────── CAC SCORING ───────── */}
      {classificationTab === 'cac' && (
        <div className="space-y-4">
          <div className="card border-l-4 border-teal-500">
            <h2 className="card-header text-teal-700">Coronary Artery Calcium Scoring for Risk Reclassification</h2>
            <p className="text-sm text-gray-600 mb-3">
              CAC scoring is a selective imaging tool for detecting subclinical coronary atherosclerosis. It is most valuable in the borderline (3-&lt;5%) and intermediate (5-&lt;10%) PREVENT risk categories where the treatment decision is uncertain. CAC should not be used as a universal screening test.
            </p>
            <div className="p-3 bg-teal-50 border border-teal-200 rounded-lg text-sm text-gray-700">
              <strong>When to order CAC:</strong> When the result would change the treatment decision -- typically in patients with borderline or intermediate 10-year risk where uncertainty remains after considering risk enhancers. Not indicated when treatment is already clearly indicated (high risk, ASCVD, severe hypercholesterolemia) or clearly not needed (very low risk, young patients).
            </div>
          </div>

          <div className="card">
            <h2 className="card-header">CAC Score Categories and Management Implications</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="text-left py-2 px-3">CAC Score</th>
                    <th className="text-left py-2 px-3">Category</th>
                    <th className="text-left py-2 px-3">Interpretation</th>
                    <th className="text-left py-2 px-3">Treatment Implication</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="py-2 px-3 font-medium">0</td>
                    <td className="py-2 px-3"><span className="badge-green">No calcified plaque</span></td>
                    <td className="py-2 px-3">Low short-term event risk. Does not exclude noncalcified or soft plaque.</td>
                    <td className="py-2 px-3">May reasonably defer statin in borderline/intermediate risk patients. Reassess in 5-10 years. Does NOT override diabetes, FH, smoking, Lp(a) elevation, or LDL-C &ge;160.</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">1-99</td>
                    <td className="py-2 px-3"><span className="badge-yellow">Mild plaque</span></td>
                    <td className="py-2 px-3">Subclinical coronary atherosclerosis is present. Consider age-sex-race percentile for context.</td>
                    <td className="py-2 px-3">Moderate-intensity statin is reasonable. If &ge;75th percentile for age/sex, treat more aggressively.</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">100-299</td>
                    <td className="py-2 px-3"><span className="badge-yellow">Moderate plaque</span></td>
                    <td className="py-2 px-3">Clear subclinical coronary atherosclerosis with meaningful event risk.</td>
                    <td className="py-2 px-3">High-intensity statin recommended. Goal LDL-C &lt;70 mg/dL, non-HDL-C &lt;100 mg/dL.</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">300-999</td>
                    <td className="py-2 px-3"><span className="badge-red">Severe plaque</span></td>
                    <td className="py-2 px-3">Very high subclinical plaque burden. Risk approximates clinical ASCVD.</td>
                    <td className="py-2 px-3">High-intensity statin plus consideration of nonstatin add-on. Target &ge;50% LDL-C reduction. Goal LDL-C &lt;55-70 mg/dL.</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">&ge;1000</td>
                    <td className="py-2 px-3"><span className="badge-red">Extensive plaque</span></td>
                    <td className="py-2 px-3">Extreme subclinical burden. Should be managed as ASCVD-equivalent.</td>
                    <td className="py-2 px-3">Manage as secondary prevention: high-intensity statin, add ezetimibe/PCSK9i as needed. Goal LDL-C &lt;55 mg/dL, non-HDL-C &lt;85 mg/dL.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <h2 className="card-header">CAC = 0: What It Does and Does Not Mean</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <h3 className="font-bold text-sm text-green-800 mb-2">Supports deferring statin when:</h3>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>Borderline or intermediate PREVENT risk</li>
                  <li>No diabetes</li>
                  <li>No familial hypercholesterolemia</li>
                  <li>No active smoking</li>
                  <li>LDL-C &lt;160 mg/dL</li>
                  <li>Lp(a) not severely elevated</li>
                </ul>
              </div>
              <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                <h3 className="font-bold text-sm text-red-800 mb-2">Does NOT override treatment when:</h3>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>Diabetes (statin still indicated based on metabolic risk)</li>
                  <li>Active cigarette smoking</li>
                  <li>Strong family history of premature ASCVD</li>
                  <li>LDL-C &ge;160 mg/dL</li>
                  <li>Lp(a) &ge;125 nmol/L</li>
                  <li>Familial hypercholesterolemia phenotype</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="card-header">Incidental CAC on Non-Cardiac CT</h2>
            <p className="text-sm text-gray-600 mb-3">
              Coronary calcium identified incidentally on non-gated chest CT (e.g., for lung cancer screening, pulmonary embolism, or preoperative evaluation) should not be ignored. While non-gated CT does not provide a formal Agatston score, visible coronary calcification indicates subclinical atherosclerosis.
            </p>
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-gray-700">
              <strong>Practical approach:</strong> When coronary calcium is noted incidentally, initiate a cardiovascular risk assessment including lipid panel, PREVENT calculation, and evaluation for risk enhancers. Even without a formal CAC score, visible coronary calcification should be incorporated into the treatment decision. Consider formal gated CAC scan if quantification would change management.
            </div>
          </div>
        </div>
      )}

      {/* ───────── PRIMARY PREVENTION ───────── */}
      {classificationTab === 'primary' && (
        <div className="space-y-4">
          <div className="card border-l-4 border-green-500">
            <h2 className="card-header text-green-700">CPR Framework: Calculate, Personalize, Reclassify</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h3 className="font-bold text-sm text-blue-800 mb-2">C - Calculate</h3>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>Use PREVENT equations for 10-year ASCVD risk</li>
                  <li>Consider 30-year risk in adults 30-59 with low 10-year risk</li>
                  <li>Include eGFR; add HbA1c/UACR when available</li>
                  <li>Assign to risk category: low, borderline, intermediate, or high</li>
                </ul>
              </div>
              <div className="bg-teal-50 rounded-lg p-4 border border-teal-200">
                <h3 className="font-bold text-sm text-teal-800 mb-2">P - Personalize</h3>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>Review risk-enhancing factors not in the equation</li>
                  <li>Assess family history, Lp(a), hsCRP, inflammatory conditions</li>
                  <li>Evaluate reproductive history in women</li>
                  <li>Consider South Asian ancestry and CKM syndrome</li>
                  <li>Discuss patient preferences and values</li>
                </ul>
              </div>
              <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                <h3 className="font-bold text-sm text-orange-800 mb-2">R - Reclassify</h3>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>Use CAC when result would change management</li>
                  <li>Most useful in borderline and intermediate risk</li>
                  <li>CAC = 0 may support deferral in selected patients</li>
                  <li>CAC &ge;100 or &ge;75th percentile supports intensification</li>
                  <li>Other imaging (CCTA, carotid IMT/plaque) in select cases</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="card-header">Lipoprotein Goals for ASCVD Risk Reduction (Figure 1)</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="text-left py-2 px-3">Clinical Setting</th>
                    <th className="text-left py-2 px-3">LDL-C Goal</th>
                    <th className="text-left py-2 px-3">Non-HDL-C Goal</th>
                    <th className="text-left py-2 px-3">ApoB Goal</th>
                    <th className="text-left py-2 px-3">Statin Intensity</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="py-2 px-3 font-medium">Low risk (&lt;3%), LDL-C &lt;160</td>
                    <td className="py-2 px-3">No specific target</td>
                    <td className="py-2 px-3">--</td>
                    <td className="py-2 px-3">--</td>
                    <td className="py-2 px-3">Lifestyle only</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">Borderline (3-&lt;5%)</td>
                    <td className="py-2 px-3">&lt;130 mg/dL</td>
                    <td className="py-2 px-3">&lt;160 mg/dL</td>
                    <td className="py-2 px-3">--</td>
                    <td className="py-2 px-3">Consider moderate</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">Intermediate (5-&lt;10%)</td>
                    <td className="py-2 px-3">&lt;100 mg/dL</td>
                    <td className="py-2 px-3">&lt;130 mg/dL</td>
                    <td className="py-2 px-3">&lt;90 mg/dL</td>
                    <td className="py-2 px-3">Moderate to high</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">High (&ge;10%)</td>
                    <td className="py-2 px-3">&lt;70 mg/dL</td>
                    <td className="py-2 px-3">&lt;100 mg/dL</td>
                    <td className="py-2 px-3">&lt;80 mg/dL</td>
                    <td className="py-2 px-3">High intensity</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="py-2 px-3 font-medium">Subclinical atherosclerosis (CAC &ge;100 or &ge;75th %ile)</td>
                    <td className="py-2 px-3">&lt;70 mg/dL</td>
                    <td className="py-2 px-3">&lt;100 mg/dL</td>
                    <td className="py-2 px-3">&lt;80 mg/dL</td>
                    <td className="py-2 px-3">High intensity</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="py-2 px-3 font-medium">Severe hypercholesterolemia (LDL-C &ge;190)</td>
                    <td className="py-2 px-3">&lt;70 mg/dL (or &ge;50% reduction)</td>
                    <td className="py-2 px-3">&lt;100 mg/dL</td>
                    <td className="py-2 px-3">&lt;80 mg/dL</td>
                    <td className="py-2 px-3">High intensity + nonstatin</td>
                  </tr>
                  <tr className="bg-red-50">
                    <td className="py-2 px-3 font-medium">Clinical ASCVD (not very high risk)</td>
                    <td className="py-2 px-3">&lt;70 mg/dL</td>
                    <td className="py-2 px-3">&lt;100 mg/dL</td>
                    <td className="py-2 px-3">&lt;80 mg/dL</td>
                    <td className="py-2 px-3">High intensity</td>
                  </tr>
                  <tr className="bg-red-50">
                    <td className="py-2 px-3 font-medium">Very high-risk ASCVD</td>
                    <td className="py-2 px-3">&lt;55 mg/dL</td>
                    <td className="py-2 px-3">&lt;85 mg/dL</td>
                    <td className="py-2 px-3">&lt;65 mg/dL</td>
                    <td className="py-2 px-3">High intensity + combination</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-gray-700">
              <strong>Key principle:</strong> Non-HDL-C and apoB provide secondary treatment targets. When LDL-C is at goal but non-HDL-C or apoB remain elevated, residual atherogenic risk persists and further therapy adjustment may be warranted.
            </div>
          </div>

          <div className="card">
            <h2 className="card-header">Statin Intensity Matching</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="text-left py-2 px-3">Intensity</th>
                    <th className="text-left py-2 px-3">Expected LDL-C Reduction</th>
                    <th className="text-left py-2 px-3">Regimens</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="py-2 px-3"><span className="badge-green">Moderate</span></td>
                    <td className="py-2 px-3">30-49%</td>
                    <td className="py-2 px-3">Atorvastatin 10-20 mg, rosuvastatin 5-10 mg, simvastatin 20-40 mg, pravastatin 40-80 mg, pitavastatin 1-4 mg</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3"><span className="badge-red">High</span></td>
                    <td className="py-2 px-3">&ge;50%</td>
                    <td className="py-2 px-3">Atorvastatin 40-80 mg, rosuvastatin 20-40 mg</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <h2 className="card-header">Management by Risk Category and LDL-C Level</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="text-left py-2 px-3">PREVENT Risk</th>
                    <th className="text-left py-2 px-3">LDL-C &lt;100</th>
                    <th className="text-left py-2 px-3">LDL-C 100-129</th>
                    <th className="text-left py-2 px-3">LDL-C 130-159</th>
                    <th className="text-left py-2 px-3">LDL-C 160-189</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="py-2 px-3 font-medium"><span className="badge-green">Low (&lt;3%)</span></td>
                    <td className="py-2 px-3">Lifestyle</td>
                    <td className="py-2 px-3">Lifestyle</td>
                    <td className="py-2 px-3">Lifestyle</td>
                    <td className="py-2 px-3">Consider moderate statin if enhancers present</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium"><span className="badge-yellow">Borderline (3-&lt;5%)</span></td>
                    <td className="py-2 px-3">Lifestyle; consider statin if enhancers</td>
                    <td className="py-2 px-3">Risk discussion; CAC if uncertain</td>
                    <td className="py-2 px-3">Moderate statin is reasonable</td>
                    <td className="py-2 px-3">Moderate statin recommended</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium"><span className="badge-yellow">Intermediate (5-&lt;10%)</span></td>
                    <td className="py-2 px-3">Moderate statin reasonable; CAC if uncertain</td>
                    <td className="py-2 px-3">Moderate statin recommended</td>
                    <td className="py-2 px-3">Moderate-to-high intensity statin</td>
                    <td className="py-2 px-3">High-intensity statin</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium"><span className="badge-red">High (&ge;10%)</span></td>
                    <td className="py-2 px-3">Moderate-to-high statin</td>
                    <td className="py-2 px-3">High-intensity statin</td>
                    <td className="py-2 px-3">High-intensity statin</td>
                    <td className="py-2 px-3">High-intensity statin + nonstatin if needed</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ───────── SECONDARY PREVENTION ───────── */}
      {classificationTab === 'secondary' && (
        <div className="space-y-4">
          <div className="card border-l-4 border-red-500">
            <h2 className="card-header text-red-700">Secondary Prevention: Clinical ASCVD</h2>
            <p className="text-sm text-gray-600 mb-3">
              All patients with established clinical ASCVD (prior MI, ACS, stable angina with revascularization, ischemic stroke, TIA, or PAD of atherosclerotic origin) should receive high-intensity statin therapy as the foundation of lipid management. The 2026 guideline emphasizes goal-directed therapy with specific LDL-C and non-HDL-C targets.
            </p>
          </div>

          <div className="card">
            <h2 className="card-header">Very High-Risk ASCVD Criteria</h2>
            <p className="text-sm text-gray-600 mb-3">
              Very high-risk ASCVD identifies a subset of patients with the greatest residual event risk who benefit most from aggressive combination lipid-lowering therapy.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                <h3 className="font-bold text-sm text-red-800 mb-2">Major Criteria (any qualifies)</h3>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>&ge;2 major ASCVD events within the past 12 months</li>
                  <li>1 major ASCVD event + &ge;2 high-risk conditions</li>
                </ul>
              </div>
              <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                <h3 className="font-bold text-sm text-orange-800 mb-2">Major ASCVD Events</h3>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>Recent ACS (within 12 months)</li>
                  <li>History of MI (beyond 12 months)</li>
                  <li>History of ischemic stroke</li>
                  <li>Symptomatic PAD (claudication with ABI &lt;0.85, prior revascularization, or amputation)</li>
                </ul>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold text-sm text-gray-800 mb-2">High-Risk Conditions (used with 1 major event)</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  'Age ≥65 years',
                  'Diabetes mellitus',
                  'Hypertension',
                  'CKD (eGFR 15-59)',
                  'Current smoking',
                  'Heterozygous FH',
                  'LDL-C ≥100 mg/dL despite max statin',
                  'History of prior CABG or PCI',
                  'Heart failure',
                  'Lp(a) ≥125 nmol/L',
                  'Persistently elevated hsCRP ≥2 mg/L',
                  'Multivessel coronary disease',
                ].map((item) => (
                  <div key={item} className="bg-gray-50 border rounded-lg p-2 text-sm text-gray-700">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="card-header">LDL-C and Non-HDL-C Goals in Secondary Prevention</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="text-left py-2 px-3">ASCVD Category</th>
                    <th className="text-left py-2 px-3">LDL-C Goal</th>
                    <th className="text-left py-2 px-3">Non-HDL-C Goal</th>
                    <th className="text-left py-2 px-3">ApoB Goal</th>
                    <th className="text-left py-2 px-3">Minimum LDL-C Reduction</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="py-2 px-3 font-medium">Clinical ASCVD (not very high risk)</td>
                    <td className="py-2 px-3"><span className="badge-yellow">&lt;70 mg/dL</span></td>
                    <td className="py-2 px-3">&lt;100 mg/dL</td>
                    <td className="py-2 px-3">&lt;80 mg/dL</td>
                    <td className="py-2 px-3">&ge;50%</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">Very high-risk ASCVD</td>
                    <td className="py-2 px-3"><span className="badge-red">&lt;55 mg/dL</span></td>
                    <td className="py-2 px-3">&lt;85 mg/dL</td>
                    <td className="py-2 px-3">&lt;65 mg/dL</td>
                    <td className="py-2 px-3">&ge;50%</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">Recurrent events despite LDL-C &lt;55</td>
                    <td className="py-2 px-3"><span className="badge-red">Lowest achievable</span></td>
                    <td className="py-2 px-3">Lowest achievable</td>
                    <td className="py-2 px-3">Lowest achievable</td>
                    <td className="py-2 px-3">Maximal tolerated therapy</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <h2 className="card-header">Combination Therapy Escalation</h2>
            <p className="text-sm text-gray-600 mb-3">
              When high-intensity statin alone does not achieve the LDL-C goal, add nonstatin therapies in a stepwise, evidence-based sequence.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="text-left py-2 px-3">Step</th>
                    <th className="text-left py-2 px-3">Therapy</th>
                    <th className="text-left py-2 px-3">Additional LDL-C Reduction</th>
                    <th className="text-left py-2 px-3">Key Considerations</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="py-2 px-3 font-medium"><span className="badge-blue">1</span></td>
                    <td className="py-2 px-3 font-medium">High-intensity statin (maximally tolerated)</td>
                    <td className="py-2 px-3">&ge;50% from baseline</td>
                    <td className="py-2 px-3">Foundation for all ASCVD patients. Atorvastatin 40-80 mg or rosuvastatin 20-40 mg.</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium"><span className="badge-blue">2</span></td>
                    <td className="py-2 px-3 font-medium">Add ezetimibe 10 mg</td>
                    <td className="py-2 px-3">~18-25% additional</td>
                    <td className="py-2 px-3">First-line add-on. Well tolerated, generic, outcome data (IMPROVE-IT).</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium"><span className="badge-blue">3</span></td>
                    <td className="py-2 px-3 font-medium">Add bempedoic acid 180 mg</td>
                    <td className="py-2 px-3">~15-18% additional (on statin)</td>
                    <td className="py-2 px-3">ACL inhibitor. Outcome data (CLEAR Outcomes). Consider especially in statin-intolerant patients.</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium"><span className="badge-purple">4</span></td>
                    <td className="py-2 px-3 font-medium">Add PCSK9 monoclonal antibody</td>
                    <td className="py-2 px-3">~50-60% additional</td>
                    <td className="py-2 px-3">Evolocumab or alirocumab. Outcome data (FOURIER, ODYSSEY). Q2W or monthly injection.</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium"><span className="badge-purple">4 alt</span></td>
                    <td className="py-2 px-3 font-medium">Inclisiran 284 mg</td>
                    <td className="py-2 px-3">~50% additional</td>
                    <td className="py-2 px-3">siRNA targeting PCSK9 synthesis. Q6-month dosing after loading. ORION trials.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-gray-700">
              <strong>Sequencing principle:</strong> Do not skip steps -- each add-on should be given adequate time (4-12 weeks) to assess response before escalating further. In very high-risk patients after recent ACS, earlier initiation of combination therapy is reasonable.
            </div>
          </div>

          <div className="card">
            <h2 className="card-header">Residual Risk Beyond LDL-C</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h3 className="font-bold text-sm text-blue-800 mb-2">When LDL-C is at Goal</h3>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>Check non-HDL-C and apoB for residual particle burden</li>
                  <li>Assess TG -- if &ge;150 mg/dL, consider TG-rich lipoprotein contribution</li>
                  <li>Measure Lp(a) if not previously assessed</li>
                  <li>Monitor hsCRP for inflammatory residual risk</li>
                  <li>Consider icosapent ethyl if TG 135-499 mg/dL on statin (REDUCE-IT)</li>
                </ul>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                <h3 className="font-bold text-sm text-purple-800 mb-2">Emerging Therapies for Residual Risk</h3>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>Lp(a)-lowering agents (muvalaplin, olpasiran, lepodisiran) in phase 3 trials</li>
                  <li>Anti-inflammatory therapies (low-dose colchicine) supported by COLCOT and LoDoCo2</li>
                  <li>Obicetrapib (CETP inhibitor) -- raises HDL-C, lowers LDL-C; outcome trial pending</li>
                  <li>RNA-based therapies targeting apoC-III and ANGPTL3 for severe hypertriglyceridemia</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ───────── SPECIAL GROUPS ───────── */}
      {classificationTab === 'special-groups' && (
        <div className="space-y-4">
          <div className="card border-l-4 border-purple-500">
            <h2 className="card-header text-purple-700">Severe Hypercholesterolemia (LDL-C &ge;190 mg/dL)</h2>
            <p className="text-sm text-gray-600 mb-3">
              LDL-C &ge;190 mg/dL confers high lifetime ASCVD risk regardless of 10-year calculated risk. These patients should not be managed solely based on PREVENT risk scores. High-intensity statin therapy is indicated at the time of diagnosis.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                <h3 className="font-bold text-sm text-red-800 mb-2">Immediate Actions</h3>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>Start high-intensity statin therapy</li>
                  <li>Exclude secondary causes (hypothyroidism, nephrotic syndrome, cholestasis)</li>
                  <li>Screen for familial hypercholesterolemia using clinical criteria (Dutch Lipid Clinic Network Score)</li>
                  <li>Cascade screening of first-degree relatives</li>
                  <li>Target LDL-C &lt;70 mg/dL or &ge;50% reduction</li>
                </ul>
              </div>
              <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                <h3 className="font-bold text-sm text-orange-800 mb-2">Escalation Strategy</h3>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>Add ezetimibe if goal not achieved on max statin</li>
                  <li>Add bempedoic acid or PCSK9 inhibitor as needed</li>
                  <li>Consider combination PCSK9 mAb + ezetimibe + statin</li>
                  <li>Inclisiran is an option for adherence-challenged patients</li>
                  <li>CAC or CCTA may further risk-stratify if treatment intensity is in question</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="card-header">Familial Hypercholesterolemia (FH)</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="text-left py-2 px-3">Feature</th>
                    <th className="text-left py-2 px-3">Heterozygous FH (HeFH)</th>
                    <th className="text-left py-2 px-3">Homozygous FH (HoFH)</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="py-2 px-3 font-medium">Prevalence</td>
                    <td className="py-2 px-3">~1 in 250</td>
                    <td className="py-2 px-3">~1 in 250,000-500,000</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">Untreated LDL-C</td>
                    <td className="py-2 px-3">190-400 mg/dL</td>
                    <td className="py-2 px-3">&gt;400 mg/dL (often &gt;500)</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">Genetics</td>
                    <td className="py-2 px-3">1 pathogenic variant in LDLR, APOB, or PCSK9</td>
                    <td className="py-2 px-3">2 pathogenic variants (biallelic LDLR most severe)</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">Treatment</td>
                    <td className="py-2 px-3">High-intensity statin + ezetimibe + PCSK9 inhibitor; goal LDL-C &lt;70 (or &lt;55 if ASCVD present)</td>
                    <td className="py-2 px-3">Maximally tolerated statin + ezetimibe + PCSK9i + evinacumab (ANGPTL3 inhibitor); lipoprotein apheresis in refractory cases</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">Referral</td>
                    <td className="py-2 px-3">Lipid specialist recommended; genetic testing and cascade screening</td>
                    <td className="py-2 px-3">Mandatory specialty referral; multidisciplinary care at FH center of excellence</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-3 p-3 bg-purple-50 border border-purple-200 rounded-lg text-sm text-gray-700">
              <strong>Genetic testing:</strong> Consider genetic testing when clinical suspicion for FH is moderate-to-high (Dutch Lipid Clinic Network Score &ge;6). Confirming a pathogenic variant enables definitive cascade screening of family members and may influence insurance coverage for PCSK9 inhibitors.
            </div>
          </div>

          <div className="card">
            <h2 className="card-header">Diabetes Without Clinical ASCVD</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-teal-50 rounded-lg p-4 border border-teal-200">
                <h3 className="font-bold text-sm text-teal-800 mb-2">Type 2 Diabetes, Age 40-75</h3>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>At least moderate-intensity statin is recommended regardless of baseline LDL-C</li>
                  <li>Calculate PREVENT risk (include HbA1c for improved precision)</li>
                  <li>If 10-year PREVENT risk &ge;10% or multiple risk enhancers: high-intensity statin</li>
                  <li>Goal LDL-C &lt;70-100 mg/dL depending on overall risk burden</li>
                  <li>Add ezetimibe or nonstatin if goals not met on maximally tolerated statin</li>
                </ul>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h3 className="font-bold text-sm text-blue-800 mb-2">Diabetes-Specific Risk Enhancers</h3>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>Duration of diabetes &ge;10 years</li>
                  <li>Albuminuria (UACR &ge;30 mg/g)</li>
                  <li>eGFR &lt;60 mL/min/1.73m&sup2;</li>
                  <li>Retinopathy or neuropathy</li>
                  <li>ABI &lt;0.9</li>
                  <li>HbA1c &ge;8% despite treatment</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-gray-700">
              <strong>Type 1 diabetes:</strong> Consider statin therapy in adults with type 1 diabetes who are aged &ge;40 years or who have diabetes duration &ge;20 years, microvascular complications, or additional ASCVD risk factors. PREVENT includes diabetes status but does not differentiate T1D from T2D -- clinical judgment should account for the extended duration of metabolic exposure in T1D.
            </div>
          </div>

          <div className="card">
            <h2 className="card-header">Subclinical Atherosclerosis Without Clinical ASCVD</h2>
            <p className="text-sm text-gray-600 mb-3">
              Patients with imaging-documented subclinical atherosclerosis -- including elevated CAC, carotid plaque, or coronary stenosis on CCTA -- but without a qualifying clinical ASCVD event represent a high-risk primary prevention group.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="text-left py-2 px-3">Finding</th>
                    <th className="text-left py-2 px-3">Management Approach</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="py-2 px-3 font-medium">CAC 100-299 or &ge;75th percentile</td>
                    <td className="py-2 px-3">High-intensity statin. Goal LDL-C &lt;70 mg/dL, non-HDL-C &lt;100 mg/dL. Add ezetimibe if needed.</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">CAC 300-999</td>
                    <td className="py-2 px-3">High-intensity statin plus nonstatin consideration. Goal LDL-C &lt;55-70 mg/dL depending on additional risk factors.</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">CAC &ge;1000</td>
                    <td className="py-2 px-3">Manage as ASCVD equivalent. Goal LDL-C &lt;55 mg/dL, non-HDL-C &lt;85 mg/dL. Consider PCSK9 inhibitor if needed.</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">Significant carotid plaque (&gt;50% stenosis or complex morphology)</td>
                    <td className="py-2 px-3">High-intensity statin with goal-directed therapy. Manage as high-risk primary prevention.</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">CCTA with &ge;50% stenosis or high-risk plaque features</td>
                    <td className="py-2 px-3">May warrant management similar to clinical ASCVD depending on plaque burden and ischemic potential.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-3 p-3 bg-teal-50 border border-teal-200 rounded-lg text-sm text-gray-700">
              <strong>Key concept:</strong> The 2026 guideline recognizes subclinical atherosclerosis as a distinct management tier between traditional primary prevention and secondary prevention. Treatment intensity should be calibrated to the degree and extent of documented subclinical disease rather than relying solely on risk factor-based calculations.
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
