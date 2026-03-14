'use client'

import { useMemo, useState } from 'react'
import {
  calculatePreventAscvd,
  validatePreventInputs,
  validatePreventImplementation,
  type PreventInputs,
} from '@/lib/prevent'

export function PreventAscvdCalculator() {
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [prevent, setPrevent] = useState<PreventInputs>({
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
    hba1c: undefined,
    uacr: undefined,
    zipCode: undefined,
    sdi: undefined,
  })

  const preventErrors = useMemo(() => validatePreventInputs(prevent), [prevent])
  const preventResult = useMemo(() => {
    if (preventErrors.length > 0) return null
    return calculatePreventAscvd(prevent)
  }, [prevent, preventErrors])
  const validationRows = useMemo(() => validatePreventImplementation(), [])

  const updatePrevent = <K extends keyof PreventInputs>(key: K, value: PreventInputs[K]) => {
    setPrevent((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-4">
      <div className="card space-y-4">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h2 className="card-header mb-1">PREVENT ASCVD Calculator</h2>
            <p className="text-sm text-gray-600">
              10-year <strong>ASCVD only</strong> implementation of PREVENT for adults 30–79 without known CVD.
            </p>
          </div>
          <a
            href="https://professional.heart.org/en/guidelines-and-statements/prevent-calculator"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-primary hover:underline"
          >
            Open official calculator ↗
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Age (30–79)</label>
            <input className="input-field mt-1" type="number" value={prevent.age} onChange={(e) => updatePrevent('age', Number(e.target.value))} />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Sex</label>
            <select className="input-field mt-1" value={prevent.sex} onChange={(e) => updatePrevent('sex', e.target.value as PreventInputs['sex'])}>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Systolic BP (mmHg)</label>
            <input className="input-field mt-1" type="number" value={prevent.systolicBp} onChange={(e) => updatePrevent('systolicBp', Number(e.target.value))} />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Total cholesterol (mg/dL)</label>
            <input className="input-field mt-1" type="number" value={prevent.totalCholesterol} onChange={(e) => updatePrevent('totalCholesterol', Number(e.target.value))} />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">HDL-C (mg/dL)</label>
            <input className="input-field mt-1" type="number" value={prevent.hdlCholesterol} onChange={(e) => updatePrevent('hdlCholesterol', Number(e.target.value))} />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">BMI (kg/m²)</label>
            <input className="input-field mt-1" type="number" step="0.1" value={prevent.bmi} onChange={(e) => updatePrevent('bmi', Number(e.target.value))} />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">eGFR (mL/min/1.73m²)</label>
            <input className="input-field mt-1" type="number" value={prevent.egfr} onChange={(e) => updatePrevent('egfr', Number(e.target.value))} />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            ['On BP treatment', 'onBpMeds'],
            ['On statin', 'onStatin'],
            ['Current smoker', 'smoker'],
            ['Diabetes', 'diabetes'],
          ].map(([label, key]) => (
            <label key={key} className="flex items-center gap-2 p-3 border rounded-lg bg-gray-50 text-sm">
              <input
                type="checkbox"
                checked={Boolean(prevent[key as keyof PreventInputs])}
                onChange={(e) => updatePrevent(key as keyof PreventInputs, e.target.checked as never)}
              />
              <span>{label}</span>
            </label>
          ))}
        </div>

        <div className="border rounded-lg">
          <button
            onClick={() => setShowAdvanced((v) => !v)}
            className="w-full text-left p-3 font-medium text-sm text-primary bg-blue-50 hover:bg-blue-100"
          >
            {showAdvanced ? 'Hide' : 'Show'} advanced optional inputs for closer official-calculator parity
          </button>
          {showAdvanced && (
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 border-t">
              <div>
                <label className="text-sm font-medium text-gray-700">HbA1c (%)</label>
                <input className="input-field mt-1" type="number" step="0.1" value={prevent.hba1c ?? ''} onChange={(e) => updatePrevent('hba1c', e.target.value === '' ? undefined : Number(e.target.value))} />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">UACR (mg/g)</label>
                <input className="input-field mt-1" type="number" step="0.1" value={prevent.uacr ?? ''} onChange={(e) => updatePrevent('uacr', e.target.value === '' ? undefined : Number(e.target.value))} />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">ZIP code (preferred for SDI)</label>
                <input className="input-field mt-1" type="text" inputMode="numeric" maxLength={5} value={prevent.zipCode ?? ''} onChange={(e) => updatePrevent('zipCode', e.target.value === '' ? undefined : e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Manual SDI decile (fallback)</label>
                <input className="input-field mt-1" type="number" min={1} max={10} value={prevent.sdi ?? ''} onChange={(e) => updatePrevent('sdi', e.target.value === '' ? undefined : Number(e.target.value))} />
              </div>
            </div>
          )}
        </div>

        {preventErrors.length > 0 ? (
          <div className="p-4 rounded-lg border border-red-200 bg-red-50">
            <h3 className="font-semibold text-red-800 mb-2 text-sm">Input issues</h3>
            <ul className="text-sm text-red-700 list-disc ml-5 space-y-1">
              {preventErrors.map((err) => (
                <li key={err}>{err}</li>
              ))}
            </ul>
          </div>
        ) : preventResult ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-xs font-semibold uppercase text-blue-800">10-year PREVENT ASCVD</p>
              <p className="text-4xl font-bold text-blue-900 mt-2">{preventResult.percent.toFixed(1)}%</p>
              <p className="text-sm text-gray-600 mt-2">Model used: <strong>{preventResult.model.replace('_10', '')}</strong></p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 md:col-span-2">
              <p className="text-sm text-gray-700">
                This app computes <strong>ASCVD only</strong> from the PREVENT equations. It does <strong>not</strong> show total CVD or heart failure risk here.
              </p>
              <ul className="text-sm text-gray-600 mt-3 space-y-1 list-disc ml-5">
                <li>Outcome: 10-year ASCVD only</li>
                <li>Race is not used in PREVENT</li>
                <li>ZIP code now maps to SDI when available; manual SDI remains as fallback</li>
                <li>Optional fields can shift the calculator from base to HbA1c/UACR/SDI/full model</li>
              </ul>
            </div>
          </div>
        ) : null}
      </div>

      <div className="card">
        <h2 className="card-header">Validation Snapshot</h2>
        <p className="text-sm text-gray-600 mb-3">
          These reference cases were checked against published/open PREVENT implementations before integrating this calculator.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-primary text-white">
                <th className="text-left py-2 px-3">Case</th>
                <th className="text-left py-2 px-3">Expected %</th>
                <th className="text-left py-2 px-3">Calculated %</th>
                <th className="text-left py-2 px-3">Abs diff</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {validationRows.map((row) => (
                <tr key={row.label}>
                  <td className="py-2 px-3 font-medium">{row.label}</td>
                  <td className="py-2 px-3">{row.expectedPercent.toFixed(6)}</td>
                  <td className="py-2 px-3">{row.actualPercent.toFixed(6)}</td>
                  <td className="py-2 px-3">{row.absDiff.toFixed(8)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-xs text-yellow-800">
          <strong>Fallback plan:</strong> if future spot-checks against the official AHA calculator show material drift, keep this validated base/advanced PREVENT-ASCVD engine for local estimation and direct users to the official online calculator for final confirmation.
        </div>
      </div>
    </div>
  )
}
