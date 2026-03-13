'use client'

import { useAppStore } from '@/store/appStore'

const tabs = [
  { id: 'approach', label: 'Clinical Approach' },
  { id: 'screening', label: 'Screening' },
  { id: 'measurements', label: 'Lipid Measurements' },
  { id: 'apob-lpa', label: 'ApoB & Lp(a)' },
  { id: 'secondary', label: 'Secondary Causes' },
]

export default function DiagnosisPage() {
  const { diagnosisTab, setDiagnosisTab } = useAppStore()

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-primary mb-1">Diagnosis / Evaluation</h1>
      <p className="text-sm text-gray-500 mb-4">Sections 3 and 4.1–4.2 of the 2026 guideline</p>

      <div className="flex flex-wrap gap-1 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setDiagnosisTab(tab.id)}
            className={`tab-btn ${diagnosisTab === tab.id ? 'tab-btn-active' : 'tab-btn-inactive'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {diagnosisTab === 'approach' && (
        <div className="space-y-4">
          <div className="card border-l-4 border-blue-500">
            <h2 className="card-header text-blue-700">Practical Evaluation Framework</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h3 className="font-bold text-sm text-blue-800 mb-2">1. Define context</h3>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>Primary prevention vs clinical ASCVD</li>
                  <li>Severe hypercholesterolemia or suspected FH</li>
                  <li>Diabetes, CKD, inflammatory disease, or CKM syndrome</li>
                  <li>Pancreatitis risk from hypertriglyceridemia</li>
                </ul>
              </div>
              <div className="bg-teal-50 rounded-lg p-4 border border-teal-200">
                <h3 className="font-bold text-sm text-teal-800 mb-2">2. Measure the right things</h3>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>TC, LDL-C, HDL-C, TG, non–HDL-C</li>
                  <li>Use Martin/Hopkins or Sampson/NIH for LDL-C estimation</li>
                  <li>Add apoB when residual risk may be underestimated</li>
                  <li>Measure Lp(a) at least once in adulthood</li>
                </ul>
              </div>
              <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                <h3 className="font-bold text-sm text-orange-800 mb-2">3. Plan follow-up</h3>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>Reassess response after starting or intensifying therapy</li>
                  <li>Track both LDL-C lowering and goal attainment</li>
                  <li>Check adherence, tolerability, and secondary causes</li>
                  <li>Escalate when goals are not achieved</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="card-header">What should trigger extra attention?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                ['LDL-C ≥190 mg/dL', 'Think severe hypercholesterolemia and evaluate for familial hypercholesterolemia.'],
                ['TG ≥500 mg/dL', 'Pancreatitis prevention becomes a parallel priority; urgent diet and drug strategy may be needed.'],
                ['Lp(a) ≥125 nmol/L (50 mg/dL)', 'Treat as a risk enhancer and intensify LDL-lowering strategy.'],
                ['apoB elevated despite “good” LDL-C', 'Residual atherogenic particle burden may still be high.'],
                ['Borderline/intermediate PREVENT risk', 'This is the zone where enhancers and CAC often change treatment decisions.'],
                ['Premature family ASCVD', 'Raises suspicion for inherited risk and supports earlier therapy.'],
              ].map(([title, note]) => (
                <div key={title} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h3 className="font-semibold text-primary text-sm">{title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {diagnosisTab === 'screening' && (
        <div className="space-y-4">
          <div className="card">
            <h2 className="card-header">Screening in Children and Adults</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="text-left py-2 px-3">Population</th>
                    <th className="text-left py-2 px-3">Practical message</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="py-2 px-3 font-medium">Children / adolescents</td>
                    <td className="py-2 px-3">Start prevention early; evaluate strongly for FH when LDL-C is markedly elevated or family history is compelling.</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">Adults 30–79 years</td>
                    <td className="py-2 px-3">Use PREVENT for 10-year risk assessment in primary prevention when LDL-C is 70–189 mg/dL and no ASCVD is present.</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">All adults</td>
                    <td className="py-2 px-3">Measure Lp(a) once for risk assessment.</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">High-risk families</td>
                    <td className="py-2 px-3">Use family history and, when appropriate, genetic testing to identify FH and support cascade screening.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {diagnosisTab === 'measurements' && (
        <div className="space-y-4">
          <div className="card">
            <h2 className="card-header">Lipid Measurements That Matter</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="text-left py-2 px-3">Measurement</th>
                    <th className="text-left py-2 px-3">Clinical role</th>
                    <th className="text-left py-2 px-3">Pearl</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="py-2 px-3 font-medium">LDL-C</td>
                    <td className="py-2 px-3">Primary treatment target plus % reduction target</td>
                    <td className="py-2 px-3">Use Martin/Hopkins or Sampson/NIH instead of Friedewald.</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">Non–HDL-C</td>
                    <td className="py-2 px-3">Companion target, especially useful with elevated TG</td>
                    <td className="py-2 px-3">Often tells the story better when triglycerides rise.</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">Triglycerides</td>
                    <td className="py-2 px-3">ASCVD and pancreatitis risk modifier</td>
                    <td className="py-2 px-3">Fast action is needed when fasting TG is very high.</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">HDL-C / TC</td>
                    <td className="py-2 px-3">Context and baseline lipid phenotype</td>
                    <td className="py-2 px-3">Useful, but not where treatment goals should stop.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-gray-700">
              <strong>Guideline update:</strong> LDL-C and non–HDL-C goals are back. Percentage LDL lowering still matters, but now goal-based treatment is explicitly back in the workflow.
            </div>
          </div>
        </div>
      )}

      {diagnosisTab === 'apob-lpa' && (
        <div className="space-y-4">
          <div className="card">
            <h2 className="card-header">ApoB and Lp(a)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-bold text-sm text-blue-800 mb-2">ApoB</h3>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>Useful once LDL-C and/or non–HDL-C goals seem achieved but residual risk still feels high.</li>
                  <li>Especially helpful in ASCVD, CKM syndrome, diabetes, or TG &gt;200 mg/dL.</li>
                  <li>May uncover atherogenic particle burden that the standard profile underestimates.</li>
                </ul>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h3 className="font-bold text-sm text-purple-800 mb-2">Lp(a)</h3>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>Measure at least once in all adults.</li>
                  <li>≥125 nmol/L (50 mg/dL) is a meaningful risk enhancer.</li>
                  <li>≥250 nmol/L (100 mg/dL) suggests roughly ≥2-fold higher estimated risk.</li>
                  <li>Elevated Lp(a) should push the clinician toward more intensive LDL lowering.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {diagnosisTab === 'secondary' && (
        <div className="space-y-4">
          <div className="card">
            <h2 className="card-header">Secondary Causes Checklist</h2>
            <p className="text-sm text-gray-600 mb-3">Before escalating treatment, make sure a secondary driver is not hiding in plain sight.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4 border">
                <h3 className="font-semibold text-sm text-primary mb-2">Common drivers</h3>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>Hypothyroidism</li>
                  <li>Nephrotic syndrome / CKD</li>
                  <li>Diabetes / insulin resistance</li>
                  <li>Obesity and excess refined carbohydrate intake</li>
                  <li>Alcohol excess</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border">
                <h3 className="font-semibold text-sm text-primary mb-2">Medication contributors</h3>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>Some estrogens and hormonal therapies</li>
                  <li>Retinoids</li>
                  <li>Immunosuppressive agents</li>
                  <li>Selected antiretrovirals / psychiatric drugs</li>
                  <li>Drug interactions that worsen statin tolerability</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
