'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAppStore } from '@/store/appStore'
import { useChatStore } from '@/store/chatStore'

const navItems = [
  { href: '/', label: 'Home', icon: '🏠' },
  { href: '/diagnosis', label: 'Diagnosis', icon: '🩺' },
  { href: '/classification', label: 'Risk Stratification', icon: '📊' },
  { href: '/treatment', label: 'Management', icon: '💊' },
  { href: '/specialists', label: 'Special Scenarios', icon: '⚠️' },
  { href: '/calculator', label: 'Calculators', icon: '🧮' },
  { href: '/ask', label: 'Ask NotebookLM', icon: '🤖' },
]

export function Navigation() {
  const [open, setOpen] = useState(false)
  const [confirmReset, setConfirmReset] = useState(false)
  const pathname = usePathname()
  const resetAll = useAppStore((s) => s.resetAll)
  const clearMessages = useChatStore((s) => s.clearMessages)

  const handleReset = () => {
    if (confirmReset) {
      resetAll()
      clearMessages()
      setConfirmReset(false)
      setOpen(false)
    } else {
      setConfirmReset(true)
      setTimeout(() => setConfirmReset(false), 3000)
    }
  }

  const NavContent = () => (
    <>
      <div className="p-4 border-b border-white/20">
        <h1 className="text-xl font-bold text-white">DLP2026</h1>
        <p className="text-xs text-blue-200 mt-1">Dyslipidemia Clinical Decision App</p>
        <p className="text-[10px] text-blue-300/70 mt-1">2026 ACC/AHA Guideline</p>
      </div>
      <nav className="flex-1 overflow-y-auto py-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
              pathname === item.href
                ? 'bg-white/20 text-white font-semibold'
                : 'text-blue-100 hover:bg-white/10 hover:text-white'
            }`}
          >
            <span className="text-base">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-white/20">
        <button
          onClick={handleReset}
          className={`w-full text-sm py-2 px-3 rounded-lg transition-colors ${
            confirmReset
              ? 'bg-red-600 text-white'
              : 'bg-white/10 text-blue-200 hover:bg-white/20'
          }`}
        >
          {confirmReset ? 'Tap again to confirm reset' : 'Reset App Data'}
        </button>
      </div>
    </>
  )

  return (
    <>
      <aside className="hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 bg-primary">
        <NavContent />
      </aside>

      <button
        onClick={() => setOpen(!open)}
        className="md:hidden fixed bottom-4 right-4 z-50 w-14 h-14 rounded-full bg-primary text-white shadow-lg flex items-center justify-center text-2xl"
        aria-label="Menu"
      >
        {open ? '✕' : '☰'}
      </button>

      {open && (
        <div className="md:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <aside className="absolute right-0 top-0 bottom-0 w-72 bg-primary flex flex-col">
            <NavContent />
          </aside>
        </div>
      )}
    </>
  )
}
