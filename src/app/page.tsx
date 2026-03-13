'use client'

import Link from 'next/link'

const sections = [
  {
    href: '/diagnosis',
    title: 'Diagnosis',
    desc: 'Who to screen, what to measure, apoB and Lp(a), and secondary-cause workup.',
    icon: '🩺',
    color: 'border-emerald-500',
  },
  {
    href: '/classification',
    title: 'Risk Stratification',
    desc: 'PREVENT-based primary prevention, CAC, risk enhancers, severe hypercholesterolemia, diabetes, and secondary prevention.',
    icon: '📊',
    color: 'border-purple-500',
  },
  {
    href: '/treatment',
    title: 'Management',
    desc: 'Lifestyle, statins, ezetimibe, PCSK9, inclisiran, bempedoic acid, triglycerides, and Lp(a).',
    icon: '💊',
    color: 'border-red-500',
  },
  {
    href: '/specialists',
    title: 'Special Scenarios',
    desc: 'Children, pregnancy, CKD, older adults, inflammatory conditions, transplant, and statin intolerance.',
    icon: '⚠️',
    color: 'border-blue-500',
  },
  {
    href: '/calculator',
    title: 'Calculators',
    desc: 'Quick treatment goal helper and triglyceride severity categorizer for bedside use.',
    icon: '🧮',
    color: 'border-amber-500',
  },
  {
    href: '/ask',
    title: 'Ask NotebookLM',
    desc: 'AI-powered Q&A grounded in the DLP2026 notebook and source article.',
    icon: '🤖',
    color: 'border-pink-500',
  },
]

const top10 = [
  'Treat dyslipidemia earlier to reduce lifetime exposure to atherogenic lipoproteins.',
  'Use PREVENT rather than the older Pooled Cohort Equations for adults 30–79 years in primary prevention.',
  'Think CPR: Calculate risk, Personalize with risk enhancers, then Reclassify selectively with CAC.',
  'LDL-C and non–HDL-C treatment goals are back, alongside percentage LDL reduction goals.',
  'Measure Lp(a) at least once in all adults for risk assessment.',
  'Use apoB to refine residual risk, especially with diabetes, elevated triglycerides, CKM syndrome, or very low achieved LDL-C.',
  'For adults with CAC >0, especially CAC ≥100 or ≥75th percentile, lipid-lowering therapy should move from optional to expected.',
  'Severe hypercholesterolemia and familial hypercholesterolemia need aggressive treatment goals and earlier combination therapy.',
  'Hypertriglyceridemia changes both ASCVD risk and pancreatitis risk—recognize when TG lowering is urgent.',
  'Special scenarios matter: children, pregnancy, CKD, inflammatory disease, older adults, and statin intolerance all need tailored decisions.',
]

export default function HomePage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-primary">DLP2026 — Dyslipidemia Clinical Decision App</h1>
        <p className="text-gray-600 mt-2">
          Based on the 2026 ACC/AHA/AACVPR/ABC/ACPM/ADA/AGS/APhA/ASPC/NLA/PCNA guideline on the management of dyslipidemia.
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Blumenthal RS, Morris PB, et al. Circulation. 2026 guideline on dyslipidemia.
        </p>
      </div>

      <div className="card mb-6 border-l-4 border-primary">
        <h2 className="card-header">Core Scope</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-primary/20">
                <th className="text-left py-2 pr-4 font-semibold text-primary">Domain</th>
                <th className="text-left py-2 font-semibold text-primary">What the app covers</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="py-2 pr-4 font-medium">Evaluation</td>
                <td className="py-2">Screening, lipid testing, apoB, Lp(a), and follow-up measurement.</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-medium">Risk assessment</td>
                <td className="py-2">PREVENT categories, risk enhancers, reproductive risk markers, and CAC-based reclassification.</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-medium">Therapy</td>
                <td className="py-2">Lifestyle, LDL-lowering drugs, triglyceride management, and residual risk reduction.</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-medium">Special scenarios</td>
                <td className="py-2">Children, pregnancy, CKD, older adults, inflammatory disease, transplant, and intolerance.</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-medium">AI support</td>
                <td className="py-2">NotebookLM-guided question answering for nuance, edge cases, and source-grounded review.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="card mb-6">
        <h2 className="card-header">Top 10 Take-Home Messages</h2>
        <ol className="space-y-2">
          {top10.map((msg, i) => (
            <li key={i} className="flex gap-3 text-sm">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">
                {i + 1}
              </span>
              <span className="text-gray-700">{msg}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="card mb-6">
        <h2 className="card-header">3-Step Clinical Workflow</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border-2 border-blue-300 rounded-lg p-4 bg-blue-50">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">1</span>
              <h3 className="font-bold text-blue-800">Evaluate</h3>
            </div>
            <ul className="text-sm text-gray-700 space-y-1 ml-2">
              <li>Define prevention setting</li>
              <li>Get the right lipid measurements</li>
              <li>Check apoB, Lp(a), and secondary causes when appropriate</li>
            </ul>
          </div>
          <div className="border-2 border-teal-300 rounded-lg p-4 bg-teal-50">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold">2</span>
              <h3 className="font-bold text-teal-800">Stratify</h3>
            </div>
            <ul className="text-sm text-gray-700 space-y-1 ml-2">
              <li>Use PREVENT risk categories</li>
              <li>Add risk enhancers and reproductive markers</li>
              <li>Use CAC selectively when the treatment choice is uncertain</li>
            </ul>
          </div>
          <div className="border-2 border-orange-300 rounded-lg p-4 bg-orange-50">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold">3</span>
              <h3 className="font-bold text-orange-800">Treat & Monitor</h3>
            </div>
            <ul className="text-sm text-gray-700 space-y-1 ml-2">
              <li>Match intensity to risk and goals</li>
              <li>Escalate to combination therapy when targets are missed</li>
              <li>Follow lipids, adherence, tolerance, and special scenario needs</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((s) => (
          <Link key={s.href} href={s.href}>
            <div className={`card border-l-4 ${s.color} hover:shadow-lg transition-shadow cursor-pointer h-full`}>
              <div className="flex items-start gap-3">
                <span className="text-2xl">{s.icon}</span>
                <div>
                  <h3 className="font-bold text-primary">{s.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{s.desc}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-xs text-yellow-800">
        <strong>Disclaimer:</strong> This tool is for educational and clinician-reference use. It does not replace clinical judgment,
        local protocols, medication labeling, or shared decision-making with patients.
      </div>
    </div>
  )
}
