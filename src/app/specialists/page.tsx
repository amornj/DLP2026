'use client'

import { useAppStore } from '@/store/appStore'

const tabs = [
  { id: 'children', label: 'Children & Adolescents' },
  { id: 'pregnancy', label: 'Pregnancy & Lactation' },
  { id: 'ckd', label: 'CKD Stage 3+' },
  { id: 'older-adults', label: 'Older Adults' },
  { id: 'inflammatory', label: 'Inflammatory & Other Conditions' },
  { id: 'statin-intolerance', label: 'Statin Intolerance' },
]

export default function SpecialistsPage() {
  const { specialistsTab, setSpecialistsTab } = useAppStore()

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-primary mb-1">Special Scenarios</h1>
      <p className="text-sm text-gray-500 mb-4">2026 ACC/AHA Dyslipidemia Guideline &mdash; Special Populations &amp; Clinical Considerations</p>

      <div className="flex flex-wrap gap-1 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSpecialistsTab(tab.id)}
            className={`tab-btn ${specialistsTab === tab.id ? 'tab-btn-active' : 'tab-btn-inactive'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ─── Children & Adolescents ─── */}
      {specialistsTab === 'children' && (
        <div className="space-y-4">
          <div className="card">
            <h2 className="card-header">Lipid Screening in Children &amp; Adolescents</h2>
            <p className="text-sm text-gray-600 mb-4">
              Universal lipid screening is recommended at ages 9&ndash;11 years and again at 17&ndash;21 years. Targeted screening should begin earlier in children with risk factors or family history of premature ASCVD or familial hypercholesterolemia (FH).
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="border-2 border-blue-300 rounded-lg p-3">
                <h3 className="font-bold text-sm text-blue-800 mb-2">Universal Screening</h3>
                <ul className="text-xs space-y-1 text-gray-700">
                  <li><span className="badge-blue">Ages 9&ndash;11y</span> Fasting or non-fasting lipid panel</li>
                  <li><span className="badge-blue">Ages 17&ndash;21y</span> Repeat lipid panel</li>
                  <li>Non-HDL-C preferred for non-fasting specimens</li>
                  <li>If abnormal, confirm with fasting lipid panel</li>
                </ul>
              </div>
              <div className="border-2 border-red-300 rounded-lg p-3">
                <h3 className="font-bold text-sm text-red-800 mb-2">Targeted / Early Screening</h3>
                <ul className="text-xs space-y-1 text-gray-700">
                  <li><span className="badge-red">Age &ge;2y</span> Cascade screening if parent or sibling with FH</li>
                  <li>Family history of premature ASCVD (&lt;55 M / &lt;65 F)</li>
                  <li>Parental total cholesterol &ge;240 mg/dL</li>
                  <li>Obesity, diabetes, hypertension, or other risk factors</li>
                  <li>Genetic testing for FH in children with clinical presentation</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="card-header">FH Diagnosis &amp; Management in Pediatric Patients</h2>

            <h3 className="font-bold text-sm text-primary mb-2">Diagnostic Criteria</h3>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
              <ul className="text-sm space-y-1 text-gray-700">
                <li><strong>LDL-C &ge;160 mg/dL:</strong> Suspect FH, especially with family history of premature ASCVD or FH</li>
                <li><strong>LDL-C &ge;190 mg/dL:</strong> Clinically diagnosed FH (even without family history)</li>
                <li><strong>LDL-C &ge;400 mg/dL:</strong> Consider homozygous FH (HoFH)</li>
                <li>Genetic testing (cascade) recommended for all children with clinically suspected FH</li>
              </ul>
            </div>

            <h3 className="font-bold text-sm text-primary mb-2">Treatment Approach</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="text-left py-2 px-3">Age</th>
                    <th className="text-left py-2 px-3">Intervention</th>
                    <th className="text-left py-2 px-3">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="py-2 px-3 font-medium">&ge;2 years</td>
                    <td className="py-2 px-3">Therapeutic lifestyle changes (TLC)</td>
                    <td className="py-2 px-3">Heart-healthy diet, physical activity, weight management</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">&ge;8&ndash;10 years</td>
                    <td className="py-2 px-3">Statin therapy</td>
                    <td className="py-2 px-3">If LDL-C &ge;160 mg/dL with FH or family history after 6&ndash;12 months TLC; start low-dose</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">&ge;10 years</td>
                    <td className="py-2 px-3">Ezetimibe add-on</td>
                    <td className="py-2 px-3">If statin alone insufficient; may use as monotherapy if statin-intolerant</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">HoFH</td>
                    <td className="py-2 px-3">Combination therapy + specialist referral</td>
                    <td className="py-2 px-3">PCSK9 inhibitors, lomitapide, evinacumab; consider LDL apheresis</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <h4 className="font-bold text-sm text-yellow-800">Key Considerations</h4>
              <ul className="text-xs text-gray-700 space-y-1">
                <li>Monitor growth, development, and liver function on statin therapy</li>
                <li>Statins are contraindicated in pregnancy &mdash; counsel adolescent females about contraception</li>
                <li>LDL-C goal: &ge;50% reduction from baseline; aim for LDL-C &lt;130 mg/dL (or &lt;100 mg/dL if additional risk factors)</li>
                <li>Early detection and treatment of FH in childhood prevents premature ASCVD events in adulthood</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ─── Pregnancy & Lactation ─── */}
      {specialistsTab === 'pregnancy' && (
        <div className="space-y-4">
          <div className="card">
            <h2 className="card-header">Lipid Management During Pregnancy &amp; Lactation</h2>
            <p className="text-sm text-gray-600 mb-4">
              Physiologic dyslipidemia occurs during pregnancy with total cholesterol increasing 25&ndash;50% and triglycerides 2&ndash;4 fold. Most lipid-lowering medications are contraindicated during pregnancy and breastfeeding.
            </p>

            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <h3 className="font-bold text-sm text-red-800 mb-2">Contraindicated Medications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <h4 className="font-semibold text-xs text-red-700">During Pregnancy</h4>
                  <ul className="text-xs space-y-1 text-gray-700">
                    <li><span className="badge-red">Contraindicated</span> Statins (all)</li>
                    <li><span className="badge-red">Contraindicated</span> Ezetimibe</li>
                    <li><span className="badge-red">Contraindicated</span> PCSK9 inhibitors</li>
                    <li><span className="badge-red">Contraindicated</span> Bempedoic acid</li>
                    <li><span className="badge-red">Contraindicated</span> Inclisiran</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-xs text-red-700">During Breastfeeding</h4>
                  <ul className="text-xs space-y-1 text-gray-700">
                    <li><span className="badge-red">Contraindicated</span> Statins (all)</li>
                    <li><span className="badge-yellow">Avoid</span> Most lipid-lowering agents (limited safety data)</li>
                    <li>Bile acid sequestrants may be considered if essential</li>
                  </ul>
                </div>
              </div>
            </div>

            <h3 className="font-bold text-sm text-primary mb-2">Preconception Planning</h3>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
              <ul className="text-sm space-y-1 text-gray-700">
                <li>Discontinue statins and other contraindicated agents <strong>at least 4&ndash;6 weeks before</strong> planned conception</li>
                <li>Women with FH: discuss risks of treatment interruption with lipid specialist</li>
                <li>LDL apheresis may be considered in severe HeFH or HoFH during pregnancy</li>
                <li>Bile acid sequestrants (cholestyramine, colesevelam) are pregnancy category B &mdash; can be used if needed</li>
              </ul>
            </div>
          </div>

          <div className="card">
            <h2 className="card-header">Hypertriglyceridemia in Pregnancy</h2>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
              <h3 className="font-bold text-sm text-yellow-800">Severe Hypertriglyceridemia (TG &ge;500 mg/dL)</h3>
              <p className="text-xs text-gray-700 mb-2">
                Carries significant risk of acute pancreatitis, which is associated with maternal and fetal morbidity/mortality. Requires active management.
              </p>
              <ul className="text-xs space-y-1 text-gray-700">
                <li><strong>Dietary:</strong> Very low-fat diet (&lt;20% calories from fat), avoid simple sugars and alcohol</li>
                <li><strong>Omega-3 fatty acids:</strong> EPA+DHA 2&ndash;4 g/day (generally considered safe in pregnancy)</li>
                <li><strong>Fibrates:</strong> Fenofibrate or gemfibrozil may be used <strong>after first trimester</strong> if TG remains &ge;500 mg/dL despite diet</li>
                <li><strong>Hospitalization:</strong> Consider for TG &ge;1,000 mg/dL or symptoms of pancreatitis</li>
              </ul>
            </div>

            <h3 className="font-bold text-sm text-primary mb-2">Reproductive Risk Markers &amp; Future ASCVD Risk</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Adverse Pregnancy Outcomes as Risk Enhancers</h4>
                <ul className="text-xs space-y-1 text-gray-700">
                  <li><span className="badge-purple">Risk Enhancer</span> Preeclampsia / eclampsia</li>
                  <li><span className="badge-purple">Risk Enhancer</span> Gestational diabetes</li>
                  <li><span className="badge-purple">Risk Enhancer</span> Preterm delivery (&lt;37 weeks)</li>
                  <li><span className="badge-purple">Risk Enhancer</span> Small-for-gestational-age infant</li>
                  <li><span className="badge-purple">Risk Enhancer</span> Pregnancy-associated hypertension</li>
                </ul>
              </div>
              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Post-Pregnancy Considerations</h4>
                <ul className="text-xs space-y-1 text-gray-700">
                  <li>Reassess lipid levels 6&ndash;12 weeks postpartum</li>
                  <li>Adverse pregnancy outcomes should be documented as ASCVD risk enhancers for future risk assessment</li>
                  <li>Restart statin therapy after delivery if breastfeeding is not planned</li>
                  <li>Counsel on long-term cardiovascular risk and lifestyle modification</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── CKD Stage 3+ ─── */}
      {specialistsTab === 'ckd' && (
        <div className="space-y-4">
          <div className="card">
            <h2 className="card-header">Lipid Management in CKD Stage 3+ (eGFR &lt;60 mL/min/1.73 m&sup2;)</h2>
            <p className="text-sm text-gray-600 mb-4">
              CKD is associated with accelerated atherosclerosis and markedly elevated ASCVD risk. Patients with CKD stage 3+ should be treated as at least high-risk for ASCVD. Statin therapy has demonstrated benefit in CKD (non-dialysis) populations.
            </p>

            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
              <h3 className="font-bold text-sm text-green-800 mb-2">
                <span className="badge-green">COR 1</span> Clinical ASCVD + CKD Stage 3+
              </h3>
              <ul className="text-sm space-y-1 text-gray-700">
                <li><strong>High-intensity statin</strong> +/&minus; ezetimibe and/or PCSK9 monoclonal antibody</li>
                <li>Target: <span className="badge-blue">&ge;50% LDL-C reduction</span></li>
                <li>Goal: <span className="badge-green">LDL-C &lt;55 mg/dL</span> and <span className="badge-green">non-HDL-C &lt;85 mg/dL</span></li>
                <li>Combination therapy is often needed to achieve these targets</li>
              </ul>
            </div>

            <h3 className="font-bold text-sm text-primary mb-2">CKD Without Clinical ASCVD</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="text-left py-2 px-3">CKD Stage</th>
                    <th className="text-left py-2 px-3">Statin Recommendation</th>
                    <th className="text-left py-2 px-3">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="py-2 px-3 font-medium">Stage 3a&ndash;3b</td>
                    <td className="py-2 px-3"><span className="badge-green">COR 1</span> Moderate- to high-intensity statin</td>
                    <td className="py-2 px-3">No dose adjustment needed for most statins</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">Stage 4</td>
                    <td className="py-2 px-3"><span className="badge-green">COR 1</span> Moderate-intensity statin</td>
                    <td className="py-2 px-3">Avoid high-dose rosuvastatin (&gt;10 mg); adjust atorvastatin as needed</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">Stage 5 / Dialysis</td>
                    <td className="py-2 px-3"><span className="badge-yellow">COR 2b</span> Continue if already on statin</td>
                    <td className="py-2 px-3">Do not initiate statin in dialysis patients (AURORA, 4D trials); continue if started pre-dialysis</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">Kidney Transplant</td>
                    <td className="py-2 px-3"><span className="badge-green">COR 1</span> Statin therapy</td>
                    <td className="py-2 px-3">Check drug interactions with cyclosporine, tacrolimus; prefer pravastatin or fluvastatin</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <h2 className="card-header">Practical Considerations in CKD</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border-2 border-blue-300 rounded-lg p-3">
                <h3 className="font-bold text-sm text-blue-800 mb-2">Drug Interactions &amp; Dosing</h3>
                <ul className="text-xs space-y-1 text-gray-700">
                  <li><strong>Rosuvastatin:</strong> Max 10 mg/day with eGFR &lt;30</li>
                  <li><strong>Simvastatin:</strong> Max 20 mg with cyclosporine</li>
                  <li><strong>PCSK9 mAbs:</strong> No dose adjustment required in CKD</li>
                  <li><strong>Ezetimibe:</strong> No dose adjustment needed</li>
                  <li><strong>Bempedoic acid:</strong> No dose adjustment; avoid in severe hepatic impairment</li>
                  <li><strong>Fibrates:</strong> Dose-reduce or avoid with eGFR &lt;30; increased myopathy risk with statins</li>
                </ul>
              </div>
              <div className="border-2 border-orange-300 rounded-lg p-3">
                <h3 className="font-bold text-sm text-orange-800 mb-2">Monitoring &amp; Safety</h3>
                <ul className="text-xs space-y-1 text-gray-700">
                  <li>Check lipid panel 4&ndash;12 weeks after starting or changing therapy</li>
                  <li>Monitor CK if muscle symptoms develop (higher risk in CKD)</li>
                  <li>CKD patients have increased risk of statin-associated myopathy</li>
                  <li>Nephrotic syndrome: treat underlying cause; statins for persistent hyperlipidemia</li>
                  <li>Reassess statin benefit if transitioning to dialysis</li>
                </ul>
              </div>
            </div>

            <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <h4 className="font-bold text-sm text-yellow-800">CKD as ASCVD Risk Enhancer</h4>
              <p className="text-xs text-gray-700">
                CKD stage 3+ (eGFR &lt;60) is an independent ASCVD risk enhancer. In borderline or intermediate-risk patients, CKD should favor statin initiation. CKD is also associated with elevated Lp(a), which compounds cardiovascular risk.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ─── Older Adults ─── */}
      {specialistsTab === 'older-adults' && (
        <div className="space-y-4">
          <div className="card">
            <h2 className="card-header">Lipid Management in Older Adults (&ge;75 Years)</h2>
            <p className="text-sm text-gray-600 mb-4">
              Statin therapy should be continued in older adults who are tolerating it. The decision to initiate or intensify statin therapy in those &ge;75 years requires shared decision-making, incorporating life expectancy, goals of care, frailty, polypharmacy, and patient preferences.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <h3 className="font-bold text-sm text-green-800 mb-2">Continuation of Therapy</h3>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li><span className="badge-green">COR 1</span> <strong>Continue statin</strong> in patients &ge;75y already tolerating therapy</li>
                  <li>Statin benefit persists in older adults with established ASCVD</li>
                  <li>Discontinuation associated with increased ASCVD events</li>
                  <li>Do not stop statin solely based on age</li>
                </ul>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <h3 className="font-bold text-sm text-blue-800 mb-2">Initiation of Therapy</h3>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li><span className="badge-green">COR 1</span> Initiate statin for clinical ASCVD regardless of age</li>
                  <li><span className="badge-blue">COR 2a</span> Initiate moderate-intensity statin for primary prevention if life expectancy &ge;5 years and reasonable ASCVD risk</li>
                  <li>Use shared decision-making accounting for patient preferences</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="card-header">Special Considerations in Older Adults</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="border-2 border-purple-300 rounded-lg p-3">
                <h3 className="font-bold text-sm text-purple-800 mb-2">Factors Favoring Treatment</h3>
                <ul className="text-xs space-y-1 text-gray-700">
                  <li>Established ASCVD</li>
                  <li>Life expectancy &ge;5 years</li>
                  <li>High LDL-C (&ge;190 mg/dL)</li>
                  <li>Diabetes mellitus</li>
                  <li>Subclinical atherosclerosis (CAC &gt;0)</li>
                  <li>Multiple ASCVD risk factors</li>
                </ul>
              </div>
              <div className="border-2 border-orange-300 rounded-lg p-3">
                <h3 className="font-bold text-sm text-orange-800 mb-2">Factors Favoring Caution</h3>
                <ul className="text-xs space-y-1 text-gray-700">
                  <li>Limited life expectancy (&lt;2&ndash;3 years)</li>
                  <li>Advanced frailty or functional decline</li>
                  <li>Severe polypharmacy (&ge;10 medications)</li>
                  <li>History of statin intolerance</li>
                  <li>Advanced dementia</li>
                  <li>Patient preference to minimize medications</li>
                </ul>
              </div>
              <div className="border-2 border-teal-300 rounded-lg p-3">
                <h3 className="font-bold text-sm text-teal-800 mb-2">Prescribing Tips</h3>
                <ul className="text-xs space-y-1 text-gray-700">
                  <li>Start at lower intensity and titrate up as tolerated</li>
                  <li>Prefer statins with fewer drug interactions (pravastatin, rosuvastatin, pitavastatin)</li>
                  <li>Monitor for myalgia; CKD and low body weight increase risk</li>
                  <li>Consider ezetimibe if statin dose is limited</li>
                  <li>Reassess periodically with goals-of-care discussions</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <h4 className="font-bold text-sm text-yellow-800">Deprescribing Considerations</h4>
              <p className="text-xs text-gray-700">
                Statin deprescribing may be appropriate in patients with limited life expectancy (&lt;1&ndash;2 years), severe functional decline, or when goals of care shift to comfort-focused. This should be a shared decision. Statins in secondary prevention (established ASCVD) should generally be continued longer than those in primary prevention.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ─── Inflammatory & Other Conditions ─── */}
      {specialistsTab === 'inflammatory' && (
        <div className="space-y-4">
          <div className="card">
            <h2 className="card-header">HIV &amp; Lipid Management</h2>
            <p className="text-sm text-gray-600 mb-4">
              Persons living with HIV have elevated ASCVD risk due to chronic inflammation, immune activation, and metabolic effects of antiretroviral therapy (ART). Statin therapy is recommended for primary prevention in appropriate patients.
            </p>

            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
              <h3 className="font-bold text-sm text-green-800 mb-2">
                <span className="badge-green">COR 1</span> Statin Therapy in HIV
              </h3>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>Recommended for adults <strong>ages 40&ndash;75</strong> on stable ART with LDL-C &ge;70 mg/dL and estimated 10-year ASCVD risk &ge;7.5%</li>
                <li>REPRIEVE trial demonstrated pitavastatin 4 mg reduced MACE by 35% in PLWH</li>
                <li><span className="badge-blue">Preferred:</span> Pitavastatin or rosuvastatin (minimal CYP3A4 interactions)</li>
                <li><span className="badge-red">Avoid:</span> Simvastatin and lovastatin (CYP3A4 interactions with protease inhibitors)</li>
              </ul>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="text-left py-2 px-3">Statin</th>
                    <th className="text-left py-2 px-3">PI Interaction</th>
                    <th className="text-left py-2 px-3">NNRTI Interaction</th>
                    <th className="text-left py-2 px-3">INSTI Interaction</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="py-2 px-3 font-medium">Pitavastatin</td>
                    <td className="py-2 px-3"><span className="badge-green">Minimal</span></td>
                    <td className="py-2 px-3"><span className="badge-green">Minimal</span></td>
                    <td className="py-2 px-3"><span className="badge-green">None</span></td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">Rosuvastatin</td>
                    <td className="py-2 px-3"><span className="badge-yellow">Dose limit</span></td>
                    <td className="py-2 px-3"><span className="badge-green">Minimal</span></td>
                    <td className="py-2 px-3"><span className="badge-green">None</span></td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">Atorvastatin</td>
                    <td className="py-2 px-3"><span className="badge-yellow">Dose limit</span></td>
                    <td className="py-2 px-3"><span className="badge-yellow">May reduce levels</span></td>
                    <td className="py-2 px-3"><span className="badge-green">None</span></td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">Simvastatin</td>
                    <td className="py-2 px-3"><span className="badge-red">Contraindicated</span></td>
                    <td className="py-2 px-3"><span className="badge-yellow">May reduce levels</span></td>
                    <td className="py-2 px-3"><span className="badge-green">None</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <h2 className="card-header">Cancer Survivors &amp; Chronic Inflammatory Diseases</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="border-2 border-blue-300 rounded-lg p-3">
                <h3 className="font-bold text-sm text-blue-800 mb-2">Cancer Survivors</h3>
                <ul className="text-xs space-y-1 text-gray-700">
                  <li>Treat lipids similar to general population if <strong>life expectancy &ge;2 years</strong></li>
                  <li>Cardiotoxic cancer therapies (anthracyclines, radiation, HER2 agents) increase ASCVD risk</li>
                  <li>History of chest radiation is an ASCVD risk enhancer</li>
                  <li>Check drug interactions between statins and cancer therapies</li>
                  <li>Coordinate with oncology for timing of lipid-lowering initiation</li>
                  <li>Monitor liver function (shared hepatotoxicity with some cancer therapies)</li>
                </ul>
              </div>
              <div className="border-2 border-purple-300 rounded-lg p-3">
                <h3 className="font-bold text-sm text-purple-800 mb-2">Chronic Inflammatory Diseases</h3>
                <ul className="text-xs space-y-1 text-gray-700">
                  <li><span className="badge-purple">Risk Enhancer</span> Rheumatoid arthritis</li>
                  <li><span className="badge-purple">Risk Enhancer</span> Systemic lupus erythematosus</li>
                  <li><span className="badge-purple">Risk Enhancer</span> Psoriasis / psoriatic arthritis</li>
                  <li><span className="badge-purple">Risk Enhancer</span> Inflammatory bowel disease</li>
                  <li><span className="badge-purple">Risk Enhancer</span> Ankylosing spondylitis</li>
                  <li>Chronic systemic inflammation accelerates atherosclerosis</li>
                  <li>Consider applying a 1.5x multiplier to calculated ASCVD risk (RA)</li>
                  <li>Active inflammation may lower LDL-C &mdash; treat based on overall risk, not LDL-C alone</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <h4 className="font-bold text-sm text-blue-800">Other Conditions as Risk Enhancers</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
                <div className="text-xs text-gray-700">
                  <p className="font-semibold">Metabolic</p>
                  <ul className="space-y-1">
                    <li>Metabolic syndrome</li>
                    <li>PCOS</li>
                    <li>NAFLD / MASLD</li>
                  </ul>
                </div>
                <div className="text-xs text-gray-700">
                  <p className="font-semibold">Psychosocial</p>
                  <ul className="space-y-1">
                    <li>South Asian ancestry</li>
                    <li>Severe mental illness</li>
                    <li>Social determinants of health</li>
                  </ul>
                </div>
                <div className="text-xs text-gray-700">
                  <p className="font-semibold">Biomarkers</p>
                  <ul className="space-y-1">
                    <li>Lp(a) &ge;50 mg/dL (&ge;125 nmol/L)</li>
                    <li>hsCRP &ge;2 mg/L</li>
                    <li>ABI &lt;0.9</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── Statin Intolerance ─── */}
      {specialistsTab === 'statin-intolerance' && (
        <div className="space-y-4">
          <div className="card">
            <h2 className="card-header">Statin-Associated Muscle Symptoms (SAMS) &mdash; Section 5.1</h2>
            <p className="text-sm text-gray-600 mb-4">
              SAMS is the most common reason for statin discontinuation, reported in 5&ndash;20% of patients. True statin intolerance (inability to tolerate &ge;2 statins at any dose) is much rarer (2&ndash;5%). Nocebo effect accounts for a significant proportion of reported muscle symptoms.
            </p>

            <h3 className="font-bold text-sm text-primary mb-2">SAMS Assessment</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="border-2 border-green-300 rounded-lg p-3">
                <h3 className="font-bold text-sm text-green-800 mb-2">Typical SAMS Features</h3>
                <ul className="text-xs space-y-1 text-gray-700">
                  <li>Bilateral, symmetric myalgias</li>
                  <li>Large proximal muscle groups (thighs, buttocks, calves)</li>
                  <li>Onset within 4&ndash;6 weeks of initiation or dose increase</li>
                  <li>Resolution within 2&ndash;4 weeks of discontinuation</li>
                  <li>CK typically normal or mildly elevated</li>
                </ul>
              </div>
              <div className="border-2 border-red-300 rounded-lg p-3">
                <h3 className="font-bold text-sm text-red-800 mb-2">Red Flags (Evaluate Urgently)</h3>
                <ul className="text-xs space-y-1 text-gray-700">
                  <li>CK &gt;10x ULN</li>
                  <li>Dark or brown urine (myoglobinuria)</li>
                  <li>Muscle weakness (not just pain)</li>
                  <li>Fever, malaise, or systemic illness</li>
                  <li>Symptoms of rhabdomyolysis</li>
                  <li>Elevated creatinine or acute kidney injury</li>
                </ul>
              </div>
              <div className="border-2 border-yellow-300 rounded-lg p-3">
                <h3 className="font-bold text-sm text-yellow-800 mb-2">Risk Factors for SAMS</h3>
                <ul className="text-xs space-y-1 text-gray-700">
                  <li>Advanced age (&ge;75 years)</li>
                  <li>Female sex, low BMI</li>
                  <li>CKD (eGFR &lt;60)</li>
                  <li>Hypothyroidism (untreated)</li>
                  <li>High-dose statin therapy</li>
                  <li>Drug interactions (CYP3A4/2C9 inhibitors)</li>
                  <li>Heavy alcohol use</li>
                  <li>Vitamin D deficiency</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="card-header">Statin Rechallenge &amp; Alternative Strategies</h2>

            <h3 className="font-bold text-sm text-primary mb-2">Rechallenge Protocol</h3>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
              <ol className="text-sm space-y-2 text-gray-700 list-decimal list-inside">
                <li><strong>Washout period:</strong> Discontinue statin for 2&ndash;4 weeks to confirm symptom resolution</li>
                <li><strong>Rechallenge with same statin:</strong> Restart at lower dose to confirm causality</li>
                <li><strong>Try a different statin:</strong> Switch to a different statin (e.g., rosuvastatin, pitavastatin, or fluvastatin) at low dose</li>
                <li><strong>Alternate-day dosing:</strong> Rosuvastatin or atorvastatin every other day (long half-life allows this approach)</li>
                <li><strong>Twice-weekly dosing:</strong> Rosuvastatin 5&ndash;10 mg twice weekly may achieve 20&ndash;30% LDL-C reduction</li>
              </ol>
            </div>

            <h3 className="font-bold text-sm text-primary mb-2">Non-Statin Alternatives</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="text-left py-2 px-3">Agent</th>
                    <th className="text-left py-2 px-3">LDL-C Reduction</th>
                    <th className="text-left py-2 px-3">Key Considerations</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="py-2 px-3 font-medium">Ezetimibe</td>
                    <td className="py-2 px-3">~18&ndash;25%</td>
                    <td className="py-2 px-3">First-line add-on or monotherapy; well-tolerated; proven CV benefit (IMPROVE-IT)</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">Bempedoic acid</td>
                    <td className="py-2 px-3">~15&ndash;25%</td>
                    <td className="py-2 px-3">ACL inhibitor; does NOT cause myalgia (prodrug not activated in muscle); CLEAR Outcomes showed 13% MACE reduction</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">Bempedoic acid + ezetimibe</td>
                    <td className="py-2 px-3">~35&ndash;40%</td>
                    <td className="py-2 px-3">Fixed-dose combination available; good option for statin-intolerant patients</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">PCSK9 mAb (evolocumab, alirocumab)</td>
                    <td className="py-2 px-3">~50&ndash;60%</td>
                    <td className="py-2 px-3">Subcutaneous injection q2w or monthly; well-tolerated; injection site reactions</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">Inclisiran</td>
                    <td className="py-2 px-3">~50%</td>
                    <td className="py-2 px-3">siRNA; administered q6 months by HCP; no myalgia; CV outcomes data pending</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">Bile acid sequestrants</td>
                    <td className="py-2 px-3">~15&ndash;30%</td>
                    <td className="py-2 px-3">GI side effects common; may raise TG; drug absorption interactions</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <h2 className="card-header">Medication Safety (Section 5.1)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-3">
                <h3 className="font-semibold text-sm mb-2">Before Labeling &ldquo;Statin-Intolerant&rdquo;</h3>
                <ul className="text-xs space-y-1 text-gray-700">
                  <li>Rule out other causes of myalgia (hypothyroidism, vitamin D deficiency, fibromyalgia, overexertion)</li>
                  <li>Evaluate drug interactions (CYP3A4 inhibitors, gemfibrozil, cyclosporine)</li>
                  <li>Check baseline CK before starting statin</li>
                  <li>Trial of at least 3 different statins at various doses before declaring intolerance</li>
                  <li>Consider nocebo effect &mdash; patient expectations may drive symptoms</li>
                  <li>Use SAMS-CI (Clinical Index) to assess probability of true statin-related symptoms</li>
                </ul>
              </div>
              <div className="border rounded-lg p-3">
                <h3 className="font-semibold text-sm mb-2">Safety Monitoring on Lipid-Lowering Therapy</h3>
                <ul className="text-xs space-y-1 text-gray-700">
                  <li><strong>Statins:</strong> Baseline ALT; repeat if symptoms; routine CK monitoring not recommended unless symptomatic</li>
                  <li><strong>Bempedoic acid:</strong> Monitor uric acid (can raise levels); check for tendon issues; do not combine with &gt;40 mg simvastatin</li>
                  <li><strong>PCSK9 mAb:</strong> Monitor for injection site reactions; neurocognitive effects not confirmed in trials</li>
                  <li><strong>Ezetimibe:</strong> Rarely elevates transaminases when combined with statin; monitor if symptomatic</li>
                  <li><strong>Fibrates:</strong> Monitor renal function and CK when combined with statins; avoid gemfibrozil + statin</li>
                </ul>
              </div>
            </div>

            <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3">
              <h4 className="font-bold text-sm text-green-800">Bottom Line</h4>
              <p className="text-xs text-gray-700">
                True statin intolerance is uncommon. Most patients can tolerate at least a low-dose statin or alternate-day dosing. For those who truly cannot take any statin, bempedoic acid + ezetimibe combination provides meaningful LDL-C reduction with proven cardiovascular benefit. PCSK9 inhibitors should be considered for very-high-risk patients who cannot achieve goals with oral non-statin therapy alone.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
