import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AppState {
  diagnosisTab: string
  setDiagnosisTab: (tab: string) => void

  classificationTab: string
  setClassificationTab: (tab: string) => void

  treatmentTab: string
  setTreatmentTab: (tab: string) => void

  specialistsTab: string
  setSpecialistsTab: (tab: string) => void

  calculatorTab: string
  setCalculatorTab: (tab: string) => void

  resetAll: () => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      diagnosisTab: 'approach',
      setDiagnosisTab: (tab) => set({ diagnosisTab: tab }),

      classificationTab: 'prevent',
      setClassificationTab: (tab) => set({ classificationTab: tab }),

      treatmentTab: 'lifestyle',
      setTreatmentTab: (tab) => set({ treatmentTab: tab }),

      specialistsTab: 'children',
      setSpecialistsTab: (tab) => set({ specialistsTab: tab }),

      calculatorTab: 'prevent-ascvd',
      setCalculatorTab: (tab) => set({ calculatorTab: tab }),

      resetAll: () => set({
        diagnosisTab: 'approach',
        classificationTab: 'prevent',
        treatmentTab: 'lifestyle',
        specialistsTab: 'children',
        calculatorTab: 'prevent-ascvd',
      }),
    }),
    { name: 'dlp2026-app' }
  )
)
