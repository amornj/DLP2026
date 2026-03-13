'use client'

import { useAppStore } from '@/store/appStore'

const tabs = [
  { id: 'lifestyle', label: 'Lifestyle' },
  { id: 'statins', label: 'Statins' },
  { id: 'nonstatin', label: 'Non-Statin LDL-C Therapy' },
  { id: 'tg-management', label: 'Triglyceride Management' },
  { id: 'lpa', label: 'Elevated Lp(a)' },
  { id: 'monitoring', label: 'Monitoring & Follow-Up' },
]

export default function TreatmentPage() {
  const { treatmentTab, setTreatmentTab } = useAppStore()

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-primary mb-1">Management</h1>
      <p className="text-sm text-gray-500 mb-4">2026 ACC/AHA Guideline &mdash; Treatment of Dyslipidemia for ASCVD Risk Reduction</p>

      <div className="flex flex-wrap gap-1 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setTreatmentTab(tab.id)}
            className={`tab-btn ${treatmentTab === tab.id ? 'tab-btn-active' : 'tab-btn-inactive'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ============================================================ */}
      {/* TAB 1: LIFESTYLE */}
      {/* ============================================================ */}
      {treatmentTab === 'lifestyle' && (
        <div className="space-y-4">
          <div className="card">
            <h2 className="card-header">Lifestyle Interventions for Lipid Management</h2>
            <p className="text-sm text-gray-600 mb-4">
              Lifestyle modification is the foundation of all lipid-lowering strategies and should be implemented at every stage of ASCVD risk management. Lifestyle interventions should be reinforced at every clinical encounter.
            </p>

            {/* Diet */}
            <h3 className="font-bold text-sm text-primary mb-2">Heart-Healthy Dietary Patterns</h3>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="text-left py-2 px-3">Dietary Pattern</th>
                    <th className="text-left py-2 px-3">Key Features</th>
                    <th className="text-left py-2 px-3">LDL-C Effect</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="py-2 px-3 font-medium">Mediterranean</td>
                    <td className="py-2 px-3">Rich in fruits, vegetables, whole grains, legumes, nuts, olive oil, fish; limited red meat and processed foods</td>
                    <td className="py-2 px-3">Reduces LDL-C ~5&ndash;10%; demonstrated ASCVD event reduction (PREDIMED)</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">DASH</td>
                    <td className="py-2 px-3">Emphasizes fruits, vegetables, whole grains, low-fat dairy; limits sodium, saturated fat, and added sugars</td>
                    <td className="py-2 px-3">Reduces LDL-C ~5&ndash;7%; primarily designed for blood pressure lowering</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">Vegan / Vegetarian</td>
                    <td className="py-2 px-3">Plant-based; eliminates or minimizes animal products; rich in fiber and phytosterols</td>
                    <td className="py-2 px-3">Reduces LDL-C ~10&ndash;15%; greatest effect among dietary patterns</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="bg-blue-50 rounded-lg p-3 mb-4">
              <p className="text-sm text-gray-700"><strong>Key dietary targets:</strong> Limit saturated fat to &lt;6% of total calories, eliminate trans fats, increase soluble fiber (10&ndash;25 g/day), add plant stanols/sterols (2 g/day) for additional LDL-C lowering of ~5&ndash;10%.</p>
            </div>

            {/* Physical Activity */}
            <h3 className="font-bold text-sm text-primary mb-2">Physical Activity</h3>
            <div className="border-l-4 border-green-500 bg-green-50 rounded-r-lg p-4 mb-4">
              <span className="badge-green">COR 1 / LOE A</span>
              <ul className="text-sm space-y-1 text-gray-700 mt-2">
                <li>&ge;150 minutes/week of moderate-intensity aerobic activity (e.g., brisk walking, cycling) or &ge;75 minutes/week of vigorous-intensity activity</li>
                <li>Reduces LDL-C ~3&ndash;6%, triglycerides ~20&ndash;30%, raises HDL-C ~3&ndash;6%</li>
                <li>Resistance training 2+ days/week provides additional metabolic benefit</li>
                <li>Sedentary behavior reduction is independently beneficial even without structured exercise</li>
              </ul>
            </div>

            {/* Weight Management */}
            <h3 className="font-bold text-sm text-primary mb-2">Weight Management</h3>
            <div className="border-l-4 border-blue-500 bg-blue-50 rounded-r-lg p-4 mb-4">
              <ul className="text-sm space-y-1 text-gray-700">
                <li><strong>Goal:</strong> 5&ndash;10% weight loss for patients with overweight or obesity</li>
                <li>5% weight loss: reduces TG ~15&ndash;20%, improves insulin sensitivity</li>
                <li>10% weight loss: reduces LDL-C ~5&ndash;8%, TG ~20&ndash;30%</li>
                <li>GLP-1 receptor agonists with demonstrated CV benefit (e.g., semaglutide) may provide additional lipid and ASCVD risk reduction in patients with obesity</li>
              </ul>
            </div>

            {/* Dietary Supplements */}
            <h3 className="font-bold text-sm text-primary mb-2">Dietary Supplements</h3>
            <div className="border-l-4 border-red-500 bg-red-50 rounded-r-lg p-4 mb-4">
              <span className="badge-red">COR 3: No Benefit</span>
              <p className="text-sm text-gray-700 mt-2">
                Dietary supplements (including fish oil supplements, garlic, red yeast rice, coenzyme Q10, flaxseed, policosanol) are <strong>not recommended</strong> for LDL-C or triglyceride lowering. These lack sufficient evidence for clinical benefit and may pose safety concerns (e.g., inconsistent potency, contaminants, drug interactions with red yeast rice).
              </p>
            </div>

            {/* Alcohol */}
            <h3 className="font-bold text-sm text-primary mb-2">Alcohol Reduction</h3>
            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <ul className="text-sm space-y-1 text-gray-700">
                <li>Alcohol is a significant contributor to hypertriglyceridemia, particularly at intake &gt;2 drinks/day</li>
                <li>Advise reduction or cessation for patients with elevated TG, especially TG &ge;500 mg/dL</li>
                <li>No level of alcohol consumption is considered beneficial for cardiovascular health</li>
              </ul>
            </div>

            {/* RDN referral */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-sm text-yellow-800">
                <strong>Referral to Registered Dietitian Nutritionist (RDN):</strong> Recommended for all patients with persistent dyslipidemia despite initial counseling. <strong>Strongly recommended</strong> when TG &ge;1000 mg/dL to guide a very-low-fat diet (&le;10&ndash;15% of calories from fat) to reduce risk of pancreatitis.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 2: STATINS */}
      {/* ============================================================ */}
      {treatmentTab === 'statins' && (
        <div className="space-y-4">
          <div className="card">
            <h2 className="card-header">Statin Therapy (Table 6)</h2>
            <p className="text-sm text-gray-600 mb-4">
              Statins remain the cornerstone of pharmacologic LDL-C lowering. They inhibit HMG-CoA reductase, the rate-limiting enzyme in hepatic cholesterol synthesis, leading to upregulation of hepatic LDL receptors and increased LDL-C clearance.
            </p>

            {/* Statin Intensity Table */}
            <h3 className="font-bold text-sm text-primary mb-2">Statin Intensity Classification (Table 6)</h3>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="text-left py-2 px-3">Intensity</th>
                    <th className="text-left py-2 px-3">Expected LDL-C Reduction</th>
                    <th className="text-left py-2 px-3">Statins &amp; Doses</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr className="bg-red-50">
                    <td className="py-2 px-3 font-bold text-red-800">High</td>
                    <td className="py-2 px-3 font-semibold">&ge;50%</td>
                    <td className="py-2 px-3">
                      <ul className="space-y-1">
                        <li><strong>Atorvastatin 40&ndash;80 mg</strong></li>
                        <li><strong>Rosuvastatin 20&ndash;40 mg</strong></li>
                      </ul>
                    </td>
                  </tr>
                  <tr className="bg-yellow-50">
                    <td className="py-2 px-3 font-bold text-yellow-800">Moderate</td>
                    <td className="py-2 px-3 font-semibold">30&ndash;49%</td>
                    <td className="py-2 px-3">
                      <ul className="space-y-1">
                        <li>Atorvastatin 10&ndash;20 mg</li>
                        <li>Rosuvastatin 5&ndash;10 mg</li>
                        <li>Simvastatin 20&ndash;40 mg</li>
                        <li>Pravastatin 40&ndash;80 mg</li>
                        <li>Lovastatin 40&ndash;80 mg</li>
                        <li>Fluvastatin XL 80 mg</li>
                        <li>Fluvastatin 40 mg BID</li>
                        <li>Pitavastatin 1&ndash;4 mg</li>
                      </ul>
                    </td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="py-2 px-3 font-bold text-green-800">Low</td>
                    <td className="py-2 px-3 font-semibold">&lt;30%</td>
                    <td className="py-2 px-3">
                      <ul className="space-y-1">
                        <li>Simvastatin 10 mg</li>
                        <li>Pravastatin 10&ndash;20 mg</li>
                        <li>Lovastatin 20 mg</li>
                        <li>Fluvastatin 20&ndash;40 mg</li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Pharmacokinetic Properties */}
            <h3 className="font-bold text-sm text-primary mb-2">Pharmacokinetic Properties</h3>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="text-left py-2 px-3">Statin</th>
                    <th className="text-left py-2 px-3">Metabolism</th>
                    <th className="text-left py-2 px-3">Half-Life</th>
                    <th className="text-left py-2 px-3">Hydrophilicity</th>
                    <th className="text-left py-2 px-3">Renal Excretion</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr><td className="py-2 px-3 font-medium">Atorvastatin</td><td className="py-2 px-3">CYP3A4</td><td className="py-2 px-3">14 h</td><td className="py-2 px-3">Lipophilic</td><td className="py-2 px-3">&lt;2%</td></tr>
                  <tr><td className="py-2 px-3 font-medium">Rosuvastatin</td><td className="py-2 px-3">CYP2C9 (minor)</td><td className="py-2 px-3">19 h</td><td className="py-2 px-3">Hydrophilic</td><td className="py-2 px-3">~10%</td></tr>
                  <tr><td className="py-2 px-3 font-medium">Simvastatin</td><td className="py-2 px-3">CYP3A4</td><td className="py-2 px-3">2 h</td><td className="py-2 px-3">Lipophilic</td><td className="py-2 px-3">&lt;1%</td></tr>
                  <tr><td className="py-2 px-3 font-medium">Pravastatin</td><td className="py-2 px-3">Non-CYP (sulfation)</td><td className="py-2 px-3">1.5 h</td><td className="py-2 px-3">Hydrophilic</td><td className="py-2 px-3">~20%</td></tr>
                  <tr><td className="py-2 px-3 font-medium">Pitavastatin</td><td className="py-2 px-3">Minimal CYP2C9</td><td className="py-2 px-3">12 h</td><td className="py-2 px-3">Lipophilic</td><td className="py-2 px-3">&lt;2%</td></tr>
                  <tr><td className="py-2 px-3 font-medium">Fluvastatin</td><td className="py-2 px-3">CYP2C9</td><td className="py-2 px-3">3 h</td><td className="py-2 px-3">Lipophilic</td><td className="py-2 px-3">&lt;6%</td></tr>
                  <tr><td className="py-2 px-3 font-medium">Lovastatin</td><td className="py-2 px-3">CYP3A4</td><td className="py-2 px-3">2 h</td><td className="py-2 px-3">Lipophilic</td><td className="py-2 px-3">&lt;10%</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <h2 className="card-header">Statin-Drug Interactions (Table 8)</h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-red-800 font-semibold">
                <strong>Avoid gemfibrozil with any statin</strong> &mdash; markedly increases risk of rhabdomyolysis by inhibiting statin glucuronidation and hepatic uptake transporters (OATP1B1).
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="text-left py-2 px-3">Interacting Drug</th>
                    <th className="text-left py-2 px-3">Affected Statins</th>
                    <th className="text-left py-2 px-3">Recommendation</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="py-2 px-3 font-medium">Strong CYP3A4 inhibitors (itraconazole, ketoconazole, posaconazole, clarithromycin, HIV protease inhibitors)</td>
                    <td className="py-2 px-3">Atorvastatin, simvastatin, lovastatin</td>
                    <td className="py-2 px-3">Avoid simvastatin/lovastatin; limit atorvastatin dose or use pravastatin/rosuvastatin/pitavastatin</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">Cyclosporine</td>
                    <td className="py-2 px-3">All statins (CYP3A4 + OATP1B1)</td>
                    <td className="py-2 px-3">Use lowest statin dose; pravastatin or fluvastatin preferred; avoid simvastatin</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">Diltiazem, verapamil, amlodipine</td>
                    <td className="py-2 px-3">Simvastatin, lovastatin</td>
                    <td className="py-2 px-3">Simvastatin max 10 mg with diltiazem/verapamil; max 20 mg with amlodipine</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">Amiodarone</td>
                    <td className="py-2 px-3">Simvastatin, lovastatin</td>
                    <td className="py-2 px-3">Simvastatin max 20 mg; consider alternative statin</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">Gemfibrozil</td>
                    <td className="py-2 px-3">All statins</td>
                    <td className="py-2 px-3 font-bold text-red-700">AVOID with any statin &mdash; use fenofibrate if fibrate needed</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">Warfarin</td>
                    <td className="py-2 px-3">All statins (variable)</td>
                    <td className="py-2 px-3">Monitor INR when starting/changing statin therapy; may potentiate warfarin</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">Grapefruit juice (&gt;1 quart/day)</td>
                    <td className="py-2 px-3">Atorvastatin, simvastatin, lovastatin</td>
                    <td className="py-2 px-3">Avoid large quantities with CYP3A4-metabolized statins</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Clinical Pearl:</strong> Pravastatin, rosuvastatin, and pitavastatin have the fewest CYP-mediated drug interactions and are preferred in patients on complex medication regimens (e.g., transplant recipients, HIV patients).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 3: NON-STATIN LDL-C THERAPY */}
      {/* ============================================================ */}
      {treatmentTab === 'nonstatin' && (
        <div className="space-y-4">
          {/* Medications Overview Table (Table 5) */}
          <div className="card">
            <h2 className="card-header">Non-Statin LDL-C Lowering Medications (Table 5)</h2>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="text-left py-2 px-3">Drug Class</th>
                    <th className="text-left py-2 px-3">Mechanism</th>
                    <th className="text-left py-2 px-3">Medication(s)</th>
                    <th className="text-left py-2 px-3">Dose</th>
                    <th className="text-left py-2 px-3">Frequency</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="py-2 px-3 font-medium">Cholesterol absorption inhibitor</td>
                    <td className="py-2 px-3">Blocks NPC1L1 at intestinal brush border, reducing cholesterol absorption</td>
                    <td className="py-2 px-3">Ezetimibe</td>
                    <td className="py-2 px-3">10 mg</td>
                    <td className="py-2 px-3">Once daily</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">PCSK9 monoclonal antibody</td>
                    <td className="py-2 px-3">Binds circulating PCSK9, preventing LDL receptor degradation and increasing LDL-C clearance</td>
                    <td className="py-2 px-3">Alirocumab<br />Evolocumab</td>
                    <td className="py-2 px-3">75&ndash;150 mg<br />140 mg or 420 mg</td>
                    <td className="py-2 px-3">SC q2wk<br />SC q2wk or q4wk</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">ACL inhibitor (bempedoic acid)</td>
                    <td className="py-2 px-3">Inhibits ATP citrate lyase upstream of HMG-CoA reductase; prodrug activated only in hepatocytes (not in skeletal muscle)</td>
                    <td className="py-2 px-3">Bempedoic acid<br />Bempedoic acid / ezetimibe</td>
                    <td className="py-2 px-3">180 mg<br />180/10 mg</td>
                    <td className="py-2 px-3">Once daily<br />Once daily</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">siRNA (PCSK9 silencing)</td>
                    <td className="py-2 px-3">Small interfering RNA that silences hepatic PCSK9 mRNA synthesis, reducing PCSK9 protein production</td>
                    <td className="py-2 px-3">Inclisiran</td>
                    <td className="py-2 px-3">284 mg</td>
                    <td className="py-2 px-3">SC at 0, 3 mo, then q6mo</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">Bile acid sequestrant</td>
                    <td className="py-2 px-3">Binds bile acids in intestine, interrupting enterohepatic circulation and upregulating hepatic LDL receptors</td>
                    <td className="py-2 px-3">Cholestyramine<br />Colesevelam<br />Colestipol</td>
                    <td className="py-2 px-3">4&ndash;24 g/day<br />3.75 g/day<br />5&ndash;30 g/day</td>
                    <td className="py-2 px-3">1&ndash;2 times daily<br />Once or twice daily<br />1&ndash;2 times daily</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Ezetimibe */}
          <div className="card">
            <h2 className="card-header">Ezetimibe</h2>
            <div className="border-l-4 border-green-500 bg-green-50 rounded-r-lg p-4 mb-4">
              <span className="badge-green">First-Line Add-On to Statin</span>
              <div className="mt-2 text-sm text-gray-600">
                <ul className="space-y-1">
                  <li><strong>LDL-C reduction:</strong> ~18% as monotherapy; ~25% when added to a statin (additional reduction)</li>
                  <li><strong>Dose:</strong> 10 mg once daily (no dose titration needed)</li>
                  <li><strong>Evidence:</strong> IMPROVE-IT trial demonstrated incremental ASCVD benefit when added to simvastatin 40 mg in post-ACS patients (NNT ~50 over 7 years)</li>
                  <li>Well tolerated; minimal side-effect profile; low cost (generic available)</li>
                  <li>Often the first non-statin agent added when statin alone is insufficient to achieve LDL-C goals</li>
                </ul>
              </div>
            </div>
          </div>

          {/* PCSK9 mAbs */}
          <div className="card">
            <h2 className="card-header">PCSK9 Monoclonal Antibodies</h2>
            <div className="border-l-4 border-blue-500 bg-blue-50 rounded-r-lg p-4 mb-4">
              <span className="badge-blue">Potent LDL-C Reduction</span>
              <div className="mt-2 text-sm text-gray-600">
                <ul className="space-y-1">
                  <li><strong>LDL-C reduction:</strong> 45&ndash;64% when added to statin therapy</li>
                  <li><strong>Alirocumab (Praluent):</strong> 75 mg or 150 mg SC every 2 weeks (ODYSSEY OUTCOMES &mdash; 15% MACE reduction in post-ACS)</li>
                  <li><strong>Evolocumab (Repatha):</strong> 140 mg SC q2wk or 420 mg SC q4wk (FOURIER &mdash; 15% reduction in CV death, MI, stroke, UA, coronary revascularization)</li>
                  <li>Generally well tolerated; injection-site reactions most common adverse effect</li>
                  <li>Consider when LDL-C is not at goal despite maximally tolerated statin + ezetimibe</li>
                  <li>High priority in very high-risk ASCVD patients, especially with recurrent events</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bempedoic Acid */}
          <div className="card">
            <h2 className="card-header">Bempedoic Acid</h2>
            <div className="border-l-4 border-purple-500 bg-purple-50 rounded-r-lg p-4 mb-4">
              <span className="badge-purple">ACL Inhibitor &mdash; No Myalgia Risk</span>
              <div className="mt-2 text-sm text-gray-600">
                <ul className="space-y-1">
                  <li><strong>LDL-C reduction:</strong> 21&ndash;24% as monotherapy; 17&ndash;18% when added to statin</li>
                  <li><strong>Dose:</strong> 180 mg once daily</li>
                  <li><strong>Combination tablet:</strong> Bempedoic acid 180 mg / ezetimibe 10 mg</li>
                  <li><strong>Evidence:</strong> CLEAR Outcomes trial demonstrated 13% reduction in MACE in statin-intolerant patients</li>
                  <li>Prodrug activated only in hepatocytes (not in skeletal muscle) &mdash; does not cause statin-associated myalgia</li>
                  <li>Particularly valuable for statin-intolerant patients</li>
                  <li><strong>Adverse effects:</strong> May increase uric acid and gout risk; monitor tendon rupture risk; can raise serum creatinine</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Inclisiran */}
          <div className="card">
            <h2 className="card-header">Inclisiran</h2>
            <div className="border-l-4 border-teal-500 bg-teal-50 rounded-r-lg p-4 mb-4">
              <span className="badge-teal">siRNA &mdash; Twice-Yearly Dosing</span>
              <div className="mt-2 text-sm text-gray-600">
                <ul className="space-y-1">
                  <li><strong>LDL-C reduction:</strong> 48&ndash;52% when added to statin</li>
                  <li><strong>Dose:</strong> 284 mg SC at day 0, month 3, then every 6 months (administered in-office)</li>
                  <li><strong>Mechanism:</strong> Small interfering RNA that silences PCSK9 mRNA in hepatocytes; durable effect allows twice-yearly dosing</li>
                  <li><strong>Evidence:</strong> ORION-10/11 demonstrated sustained LDL-C reduction; ORION-4 CV outcomes trial results pending</li>
                  <li>Favorable adherence profile due to healthcare professional-administered injections</li>
                  <li>Well tolerated; injection-site reactions most common side effect</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bile Acid Sequestrants */}
          <div className="card">
            <h2 className="card-header">Bile Acid Sequestrants</h2>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <ul className="text-sm space-y-1 text-gray-700">
                <li><strong>LDL-C reduction:</strong> 15&ndash;30% (dose-dependent)</li>
                <li><strong>Options:</strong> Colesevelam (best tolerated), cholestyramine, colestipol</li>
                <li>May raise triglycerides &mdash; <strong>avoid when TG &ge;300 mg/dL; contraindicated when TG &ge;500 mg/dL</strong></li>
                <li>GI side effects (constipation, bloating) limit tolerability</li>
                <li>Can interfere with absorption of other medications &mdash; administer other drugs 1 hour before or 4 hours after</li>
                <li>Colesevelam also lowers HbA1c ~0.5% in type 2 diabetes</li>
              </ul>
            </div>
          </div>

          {/* When to Add */}
          <div className="card">
            <h2 className="card-header">When to Add Non-Statin Therapy</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="text-left py-2 px-3">Clinical Scenario</th>
                    <th className="text-left py-2 px-3">Recommended Approach</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="py-2 px-3 font-medium">LDL-C not at goal on maximally tolerated statin</td>
                    <td className="py-2 px-3">Add ezetimibe first (low cost, generic, well-tolerated, proven outcomes benefit)</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">LDL-C still not at goal on statin + ezetimibe</td>
                    <td className="py-2 px-3">Add PCSK9 mAb (alirocumab or evolocumab) or inclisiran, especially in very high-risk ASCVD or FH</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">Statin-intolerant patients</td>
                    <td className="py-2 px-3">Bempedoic acid &plusmn; ezetimibe; consider PCSK9 mAb or inclisiran if insufficient</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">Very high-risk ASCVD with recurrent events</td>
                    <td className="py-2 px-3">Aggressive combination: maximally tolerated statin + ezetimibe + PCSK9 mAb/inclisiran</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">Adherence challenges</td>
                    <td className="py-2 px-3">Consider inclisiran (in-office, twice yearly) or combination pills (bempedoic acid/ezetimibe)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 4: TRIGLYCERIDE MANAGEMENT */}
      {/* ============================================================ */}
      {treatmentTab === 'tg-management' && (
        <div className="space-y-4">
          <div className="card">
            <h2 className="card-header">Triglyceride Severity Classification &amp; Management</h2>
            <p className="text-sm text-gray-600 mb-4">
              TG management is stratified by severity. Lifestyle modification is foundational at all levels. Pharmacotherapy targets differ by TG range: ASCVD risk reduction for moderate hypertriglyceridemia vs. pancreatitis prevention for severe hypertriglyceridemia.
            </p>

            {/* TG Severity Categories */}
            <h3 className="font-bold text-sm text-primary mb-2">TG Severity Categories</h3>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="text-left py-2 px-3">Category</th>
                    <th className="text-left py-2 px-3">TG Level</th>
                    <th className="text-left py-2 px-3">Primary Goal</th>
                    <th className="text-left py-2 px-3">Management Strategy</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr className="bg-yellow-50">
                    <td className="py-2 px-3 font-bold text-yellow-800">Mild&ndash;Moderate</td>
                    <td className="py-2 px-3 font-semibold">150&ndash;499 mg/dL</td>
                    <td className="py-2 px-3">ASCVD risk reduction</td>
                    <td className="py-2 px-3">Lifestyle + address secondary causes + optimize LDL-C. Consider icosapent ethyl if ASCVD or high-risk on statin.</td>
                  </tr>
                  <tr className="bg-orange-50">
                    <td className="py-2 px-3 font-bold text-orange-800">Severe</td>
                    <td className="py-2 px-3 font-semibold">500&ndash;999 mg/dL</td>
                    <td className="py-2 px-3">Pancreatitis prevention + ASCVD risk</td>
                    <td className="py-2 px-3">Aggressive lifestyle + fibrate therapy (fenofibrate preferred). Address secondary causes. Very-low-fat diet.</td>
                  </tr>
                  <tr className="bg-red-50">
                    <td className="py-2 px-3 font-bold text-red-800">Very Severe</td>
                    <td className="py-2 px-3 font-semibold">&ge;1000 mg/dL</td>
                    <td className="py-2 px-3">Pancreatitis prevention (urgent)</td>
                    <td className="py-2 px-3">Very-low-fat diet (&le;10&ndash;15% calories from fat), fibrate, NPO if pancreatitis. Refer to RDN. Evaluate for FCS. Consider olezarsen for FCS.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Health Behavior Interventions by TG Level (Figure 2) */}
          <div className="card">
            <h2 className="card-header">Health Behavior Interventions by TG Level (Figure 2)</h2>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="text-left py-2 px-3">Intervention</th>
                    <th className="text-left py-2 px-3">TG 150&ndash;499</th>
                    <th className="text-left py-2 px-3">TG 500&ndash;999</th>
                    <th className="text-left py-2 px-3">TG &ge;1000</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="py-2 px-3 font-medium">Heart-healthy diet</td>
                    <td className="py-2 px-3">Yes</td>
                    <td className="py-2 px-3">Yes &mdash; low-fat emphasis</td>
                    <td className="py-2 px-3">Very-low-fat diet (&le;10&ndash;15%)</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">Physical activity &ge;150 min/wk</td>
                    <td className="py-2 px-3">Yes</td>
                    <td className="py-2 px-3">Yes</td>
                    <td className="py-2 px-3">Yes</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">Weight management (5&ndash;10% loss)</td>
                    <td className="py-2 px-3">If overweight/obese</td>
                    <td className="py-2 px-3">Yes</td>
                    <td className="py-2 px-3">Yes</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">Alcohol reduction/cessation</td>
                    <td className="py-2 px-3">Reduce if excessive</td>
                    <td className="py-2 px-3">Cessation recommended</td>
                    <td className="py-2 px-3">Strict cessation</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">Limit refined carbohydrates/sugars</td>
                    <td className="py-2 px-3">Yes</td>
                    <td className="py-2 px-3">Yes &mdash; aggressively</td>
                    <td className="py-2 px-3">Yes &mdash; aggressively</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">Address secondary causes</td>
                    <td className="py-2 px-3">Yes (diabetes, hypothyroidism, medications)</td>
                    <td className="py-2 px-3">Yes</td>
                    <td className="py-2 px-3">Yes + evaluate for genetic causes (FCS, FCH)</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">Refer to RDN</td>
                    <td className="py-2 px-3">Consider</td>
                    <td className="py-2 px-3">Recommended</td>
                    <td className="py-2 px-3 font-bold text-red-700">Strongly recommended</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Icosapent Ethyl */}
          <div className="card">
            <h2 className="card-header">Icosapent Ethyl (IPE / Vascepa)</h2>
            <div className="border-l-4 border-green-500 bg-green-50 rounded-r-lg p-4 mb-4">
              <span className="badge-green">COR 1 for ASCVD + Elevated TG on Statin</span>
              <div className="mt-2 text-sm text-gray-600">
                <ul className="space-y-1">
                  <li><strong>Indication:</strong> Adults with ASCVD (or diabetes + &ge;2 risk factors) AND fasting TG 150&ndash;499 mg/dL on maximally tolerated statin</li>
                  <li><strong>Dose:</strong> 2 g twice daily with food (total 4 g/day)</li>
                  <li><strong>Evidence:</strong> REDUCE-IT trial &mdash; 25% relative risk reduction in MACE (NNT = 21 over 4.9 years)</li>
                  <li><strong>Mechanism:</strong> Purified EPA (icosapent ethyl); pleiotropic effects beyond TG lowering (anti-inflammatory, membrane stabilization, antioxidant)</li>
                  <li><strong>Note:</strong> Benefit is specific to icosapent ethyl (pure EPA), NOT mixed EPA/DHA omega-3 products (STRENGTH trial with carboxylic acid EPA+DHA showed no benefit)</li>
                  <li><strong>Adverse effects:</strong> Increased bleeding risk, atrial fibrillation (5.3% vs 3.9%); monitor in patients on antithrombotics</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Fibrates */}
          <div className="card">
            <h2 className="card-header">Fibrates</h2>
            <div className="border-l-4 border-yellow-500 bg-yellow-50 rounded-r-lg p-4 mb-4">
              <div className="mt-2 text-sm text-gray-600">
                <ul className="space-y-1">
                  <li><strong>Primary use:</strong> Severe hypertriglyceridemia (TG &ge;500 mg/dL) to prevent pancreatitis</li>
                  <li><strong>Fenofibrate (preferred):</strong> 48&ndash;145 mg daily; reduces TG ~30&ndash;50%; can be combined with statins safely</li>
                  <li><strong>Gemfibrozil:</strong> 600 mg twice daily &mdash; <strong>avoid with any statin</strong> (rhabdomyolysis risk via OATP1B1 and glucuronidation inhibition)</li>
                  <li>Limited evidence for ASCVD outcomes reduction as monotherapy (FIELD, ACCORD-Lipid) except possible benefit in the TG &ge;200 + HDL-C &le;35 subgroup</li>
                  <li><strong>Pemafibrate:</strong> Selective PPAR-alpha modulator; PROMINENT trial showed no ASCVD benefit despite TG lowering</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Olezarsen */}
          <div className="card">
            <h2 className="card-header">Olezarsen (Familial Chylomicronemia Syndrome)</h2>
            <div className="border-l-4 border-purple-500 bg-purple-50 rounded-r-lg p-4">
              <span className="badge-purple">FDA-Approved for FCS (2024)</span>
              <div className="mt-2 text-sm text-gray-600">
                <ul className="space-y-1">
                  <li><strong>Mechanism:</strong> Antisense oligonucleotide targeting apoC-III mRNA, reducing TG by decreasing VLDL production and enhancing TG-rich lipoprotein clearance</li>
                  <li><strong>Indication:</strong> Familial chylomicronemia syndrome (FCS) &mdash; patients with biallelic loss-of-function mutations in lipoprotein lipase pathway genes</li>
                  <li><strong>Dose:</strong> 50 mg or 80 mg SC monthly</li>
                  <li><strong>TG reduction:</strong> ~50&ndash;60% in BALANCE trial (FCS patients)</li>
                  <li>Also under investigation for severe hypertriglyceridemia without FCS (BRIDGE-TIMI 73a: 49&ndash;57% TG reduction)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 5: ELEVATED Lp(a) */}
      {/* ============================================================ */}
      {treatmentTab === 'lpa' && (
        <div className="space-y-4">
          <div className="card">
            <h2 className="card-header">Elevated Lipoprotein(a) [Lp(a)] Management</h2>
            <p className="text-sm text-gray-600 mb-4">
              Lp(a) is a genetically determined, independent causal risk factor for ASCVD and calcific aortic valve disease. Levels are &gt;90% determined by genetics and minimally affected by lifestyle or standard lipid-lowering therapy.
            </p>

            {/* Definition */}
            <div className="border-l-4 border-red-500 bg-red-50 rounded-r-lg p-4 mb-4">
              <h3 className="font-bold text-red-800">Elevated Lp(a) Defined</h3>
              <div className="mt-2 text-sm text-gray-600">
                <ul className="space-y-1">
                  <li><strong>Threshold:</strong> Lp(a) &ge;125 nmol/L (approximately &ge;50 mg/dL)</li>
                  <li>Present in ~20% of the global population</li>
                  <li>Higher prevalence and higher median levels in individuals of African descent</li>
                  <li>Lp(a) should be measured at least once in a lifetime as part of comprehensive risk assessment</li>
                  <li><strong>Assay note:</strong> nmol/L is preferred; mg/dL-to-nmol/L conversion is imprecise due to variable apo(a) isoform size</li>
                </ul>
              </div>
            </div>

            {/* Current Management */}
            <h3 className="font-bold text-sm text-primary mb-2">Current Management Approach</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="border-l-4 border-green-500 bg-green-50 rounded-r-lg p-4">
                <h4 className="font-bold text-green-800 text-sm mb-2">Optimize Modifiable Risk Factors</h4>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>Intensify lifestyle modifications</li>
                  <li>Optimize blood pressure control</li>
                  <li>Achieve glycemic targets in diabetes</li>
                  <li>Smoking cessation</li>
                  <li>Maintain healthy body weight</li>
                  <li>Lp(a) &ge;125 nmol/L serves as a risk-enhancing factor favoring statin initiation in borderline/intermediate risk</li>
                </ul>
              </div>
              <div className="border-l-4 border-blue-500 bg-blue-50 rounded-r-lg p-4">
                <h4 className="font-bold text-blue-800 text-sm mb-2">Intensify LDL-C Lowering</h4>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>Elevated Lp(a) increases total atherogenic particle burden</li>
                  <li>More aggressive LDL-C lowering may partially offset Lp(a)-mediated risk</li>
                  <li>Maximize statin therapy + ezetimibe</li>
                  <li>Consider earlier addition of PCSK9 inhibitors</li>
                  <li>PCSK9 mAbs reduce Lp(a) by ~20&ndash;30% (mechanism: increased hepatic LDL receptor-mediated clearance)</li>
                </ul>
              </div>
            </div>

            {/* PCSK9 for ASCVD + Lp(a) */}
            <div className="border-l-4 border-purple-500 bg-purple-50 rounded-r-lg p-4 mb-4">
              <h3 className="font-bold text-purple-800">PCSK9 mAb for ASCVD + Elevated Lp(a)</h3>
              <span className="badge-purple">May Be Reasonable (COR 2b)</span>
              <div className="mt-2 text-sm text-gray-600">
                <ul className="space-y-1">
                  <li>For patients with clinical ASCVD and elevated Lp(a) who are not at LDL-C goal despite maximally tolerated statin + ezetimibe</li>
                  <li>FOURIER and ODYSSEY OUTCOMES: patients with higher baseline Lp(a) derived greater absolute benefit from PCSK9 mAb therapy</li>
                  <li>Lp(a) reduction with PCSK9 mAbs contributes to ASCVD risk reduction beyond LDL-C lowering</li>
                </ul>
              </div>
            </div>

            {/* Pipeline / No Approved Therapy */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-bold text-yellow-800 text-sm mb-2">No Approved Lp(a)-Specific Therapy Yet</h3>
              <p className="text-sm text-gray-700 mb-3">
                There are currently no FDA-approved therapies that specifically and substantially lower Lp(a). Several agents are in advanced clinical development:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-primary text-white">
                      <th className="text-left py-2 px-3">Agent</th>
                      <th className="text-left py-2 px-3">Mechanism</th>
                      <th className="text-left py-2 px-3">Lp(a) Reduction</th>
                      <th className="text-left py-2 px-3">Phase</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="py-2 px-3 font-medium">Pelacarsen</td>
                      <td className="py-2 px-3">Antisense oligonucleotide targeting apo(a) mRNA</td>
                      <td className="py-2 px-3">~80%</td>
                      <td className="py-2 px-3">Phase 3 (Lp(a)HORIZON &mdash; MACE outcomes trial; results expected 2025&ndash;2026)</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-medium">Olpasiran</td>
                      <td className="py-2 px-3">Small interfering RNA targeting apo(a) mRNA</td>
                      <td className="py-2 px-3">~95&ndash;101%</td>
                      <td className="py-2 px-3">Phase 3 (OCEAN(a)-Outcomes; ongoing)</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-medium">Lepodisiran</td>
                      <td className="py-2 px-3">Small interfering RNA targeting apo(a) mRNA</td>
                      <td className="py-2 px-3">~96%</td>
                      <td className="py-2 px-3">Phase 3 (ACCLAIM-Lp(a); ongoing)</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-medium">Zerlasiran</td>
                      <td className="py-2 px-3">Small interfering RNA targeting apo(a) mRNA</td>
                      <td className="py-2 px-3">~90&ndash;97%</td>
                      <td className="py-2 px-3">Phase 2 completed</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-3 p-2 bg-blue-100 rounded text-xs text-blue-800">
                <strong>Clinical Pearl:</strong> Niacin reduces Lp(a) by ~20&ndash;30%, but neither AIM-HIGH nor HPS2-THRIVE demonstrated ASCVD benefit, and niacin is not recommended solely for Lp(a) lowering. Aspirin may provide greater absolute benefit in patients with elevated Lp(a) in primary prevention settings (per the ASPREE subanalysis), but this requires further validation.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 6: MONITORING & FOLLOW-UP */}
      {/* ============================================================ */}
      {treatmentTab === 'monitoring' && (
        <div className="space-y-4">
          <div className="card">
            <h2 className="card-header">Lipid Monitoring Schedule</h2>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="text-left py-2 px-3">Timepoint</th>
                    <th className="text-left py-2 px-3">Interval</th>
                    <th className="text-left py-2 px-3">Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr className="bg-green-50">
                    <td className="py-2 px-3 font-medium">After starting or changing therapy</td>
                    <td className="py-2 px-3 font-semibold">4&ndash;12 weeks</td>
                    <td className="py-2 px-3">Assess LDL-C response, adherence, tolerability. Determine if LDL-C goal is achieved. Assess for side effects (myalgia, hepatic transaminases).</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">Once stable on therapy</td>
                    <td className="py-2 px-3 font-semibold">Every 6&ndash;12 months</td>
                    <td className="py-2 px-3">Ongoing monitoring of efficacy, adherence, tolerability. Reassess risk factors and need for therapy intensification.</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">After adding non-statin agent</td>
                    <td className="py-2 px-3 font-semibold">4&ndash;12 weeks</td>
                    <td className="py-2 px-3">Confirm expected incremental LDL-C reduction. Evaluate for drug-specific adverse effects.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 mb-4">
              <h3 className="font-bold text-sm text-blue-800 mb-2">What to Assess at Each Visit</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-semibold text-sm text-gray-700 mb-1">Efficacy</h4>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li>Fasting lipid panel (LDL-C, TG, HDL-C, TC)</li>
                    <li>Percent LDL-C reduction from baseline</li>
                    <li>Achievement of LDL-C threshold/goal</li>
                    <li>Non-HDL-C if TG &ge;200 mg/dL</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-gray-700 mb-1">Adherence</h4>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li>Medication adherence assessment</li>
                    <li>Prescription refill patterns</li>
                    <li>Barriers to adherence (cost, side effects, complexity)</li>
                    <li>Lifestyle modification adherence</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-gray-700 mb-1">Tolerability</h4>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li>Muscle symptoms (myalgia, weakness, cramping)</li>
                    <li>New-onset diabetes screening</li>
                    <li>Hepatic function if clinically indicated</li>
                    <li>Drug-specific monitoring (e.g., uric acid with bempedoic acid)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Safety Monitoring */}
          <div className="card">
            <h2 className="card-header">Safety Monitoring Considerations</h2>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="text-left py-2 px-3">Medication</th>
                    <th className="text-left py-2 px-3">Monitoring</th>
                    <th className="text-left py-2 px-3">Key Concerns</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="py-2 px-3 font-medium">Statins</td>
                    <td className="py-2 px-3">Baseline hepatic transaminases; CK only if symptomatic; fasting glucose/HbA1c periodically</td>
                    <td className="py-2 px-3">Myopathy (0.1&ndash;0.2%), rhabdomyolysis (rare), new-onset DM (~0.1%/yr excess risk), hepatotoxicity (rare)</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">Ezetimibe</td>
                    <td className="py-2 px-3">No routine monitoring required</td>
                    <td className="py-2 px-3">Generally well tolerated; rare hepatotoxicity when combined with statins</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">PCSK9 mAbs</td>
                    <td className="py-2 px-3">Injection-site reactions; neurocognitive symptoms (monitor if reported)</td>
                    <td className="py-2 px-3">No signal for neurocognitive adverse effects in RCTs (EBBINGHAUS substudy)</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">Bempedoic acid</td>
                    <td className="py-2 px-3">Uric acid, serum creatinine; monitor for tendon symptoms</td>
                    <td className="py-2 px-3">Hyperuricemia/gout (~2% excess), tendon rupture (0.5% vs 0%), elevated creatinine</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">Inclisiran</td>
                    <td className="py-2 px-3">Injection-site reactions</td>
                    <td className="py-2 px-3">Administered in-office; favorable safety profile in ORION program</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">Icosapent ethyl</td>
                    <td className="py-2 px-3">Monitor for bleeding; ECG for AF if symptomatic</td>
                    <td className="py-2 px-3">Atrial fibrillation (5.3% vs 3.9%), bleeding risk (2.7% vs 2.1%)</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">Fibrates</td>
                    <td className="py-2 px-3">Renal function (serum creatinine), hepatic transaminases, CBC</td>
                    <td className="py-2 px-3">Fenofibrate may reversibly raise creatinine; cholelithiasis; myopathy (avoid gemfibrozil + statin)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Benefit-Risk Discussion (Table 10) */}
          <div className="card">
            <h2 className="card-header">Clinician&ndash;Patient Benefit-Risk Discussion Checklist (Table 10)</h2>
            <p className="text-sm text-gray-600 mb-4">
              A structured benefit-risk discussion should occur before initiating or intensifying lipid-lowering therapy, and should be revisited at follow-up encounters.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border-l-4 border-green-500 bg-green-50 rounded-r-lg p-4">
                <h3 className="font-bold text-green-800 text-sm mb-2">Benefits to Discuss</h3>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>Reduction in heart attack, stroke, and cardiovascular death</li>
                  <li>Magnitude of expected LDL-C lowering</li>
                  <li>Proportional ASCVD risk reduction (~22% per 1 mmol/L LDL-C reduction)</li>
                  <li>Greater absolute benefit with higher baseline risk</li>
                  <li>Long-term safety of statin therapy (decades of evidence)</li>
                  <li>Potential additional benefits (anti-inflammatory, plaque stabilization)</li>
                </ul>
              </div>
              <div className="border-l-4 border-yellow-500 bg-yellow-50 rounded-r-lg p-4">
                <h3 className="font-bold text-yellow-800 text-sm mb-2">Risks &amp; Considerations to Discuss</h3>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>Potential side effects (myalgia, GI symptoms)</li>
                  <li>Small absolute risk of new-onset diabetes with statins</li>
                  <li>Drug interactions (review current medications)</li>
                  <li>Cost and insurance coverage, especially for PCSK9 agents and inclisiran</li>
                  <li>Need for ongoing monitoring and follow-up</li>
                  <li>Patient values, preferences, and treatment goals</li>
                </ul>
              </div>
            </div>

            <div className="mt-4 bg-gray-50 rounded-lg p-4">
              <h3 className="font-bold text-sm text-primary mb-2">Shared Decision-Making Considerations</h3>
              <ul className="text-sm space-y-1 text-gray-700">
                <li><strong>For primary prevention:</strong> Discuss 10-year ASCVD risk, risk-enhancing factors, CAC score when relevant, net benefit, and patient preferences</li>
                <li><strong>For secondary prevention:</strong> Emphasize high absolute benefit; discuss intensity of therapy, combination therapy, and LDL-C goals</li>
                <li><strong>For statin-intolerant patients:</strong> Consider rechallenge with alternative statin, lower dose, alternate-day dosing, or transition to non-statin therapy</li>
                <li><strong>Address barriers:</strong> Cost, polypharmacy concerns, misinformation about statins, cultural beliefs</li>
                <li><strong>Document:</strong> The discussion and the agreed-upon plan in the medical record</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
