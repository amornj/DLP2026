'use client'

import { useState, useRef, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { useChatStore, ChatMessage } from '@/store/chatStore'

const exampleQuestions = [
  'When should I use PREVENT vs CAC in primary prevention?',
  'How does the guideline handle LDL-C and non–HDL-C goals?',
  'What should I do with an adult whose LDL-C is 185 mg/dL and family history is strong?',
  'How should elevated Lp(a) change treatment intensity?',
  'What is the approach to severe hypertriglyceridemia and pancreatitis prevention?',
  'How should I manage dyslipidemia in CKD stage 3 or higher?',
  'What does the guideline say about pregnancy and hypertriglyceridemia?',
  'How do apoB and non–HDL-C help when triglycerides are elevated?',
]

export default function AskPage() {
  const { messages, mode, conversationId, addMessage, setMode, setConversationId, clearMessages } = useChatStore()
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const handleSend = async (text?: string) => {
    const question = text || input.trim()
    if (!question || loading) return
    setInput('')

    const userMsg: ChatMessage = { role: 'user', content: question, timestamp: Date.now() }
    addMessage(userMsg)
    setLoading(true)

    try {
      const res = await fetch('/api/notebooklm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, mode, conversationId }),
      })

      if (!res.ok) throw new Error(`Error: ${res.status}`)
      const data = await res.json()

      if (data.conversationId) setConversationId(data.conversationId)
      addMessage({ role: 'assistant', content: data.answer || 'No response received.', timestamp: Date.now() })
    } catch {
      addMessage({ role: 'assistant', content: 'Failed to get a response. Please check the NotebookLM proxy settings and try again.', timestamp: Date.now() })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] md:h-[calc(100vh-3rem)]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
            <span>🤖</span> Ask NotebookLM
          </h1>
          <p className="text-xs text-gray-500">Notebook: DLP2026 • grounded Q&A on the dyslipidemia guideline</p>
        </div>
        {messages.length > 0 && (
          <button onClick={clearMessages} className="text-xs text-red-500 hover:text-red-700 px-2 py-1 rounded border border-red-200">
            Clear History
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 mb-4">
        {messages.length === 0 && !loading && (
          <div className="space-y-3">
            <p className="text-sm text-gray-500">Ask any question about the 2026 dyslipidemia guideline:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {exampleQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(q)}
                  className="text-left text-sm p-3 bg-white border border-gray-200 rounded-lg hover:border-primary hover:bg-blue-50 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-lg px-4 py-3 ${msg.role === 'user' ? 'bg-primary text-white' : 'bg-white border border-gray-200'}`}>
              {msg.role === 'assistant' ? (
                <div className="prose prose-sm max-w-none">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              ) : (
                <p className="text-sm">{msg.content}</p>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 rounded-lg px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="border-t pt-3 space-y-2">
        <form onSubmit={(e) => { e.preventDefault(); handleSend() }} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about dyslipidemia, FH, Lp(a), CAC, triglycerides..."
            className="input-field flex-1"
            disabled={loading}
          />
          <button type="submit" disabled={loading || !input.trim()} className="btn-primary disabled:opacity-50">
            Send
          </button>
        </form>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-gray-500">Mode:</span>
          <button onClick={() => setMode('brief')} className={`px-2 py-1 rounded ${mode === 'brief' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}`}>
            Brief
          </button>
          <button onClick={() => setMode('explanatory')} className={`px-2 py-1 rounded ${mode === 'explanatory' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}`}>
            Explanatory
          </button>
        </div>
      </div>
    </div>
  )
}
