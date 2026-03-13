import { NextRequest, NextResponse } from 'next/server'

const NOTEBOOK_ID = process.env.NLM_NOTEBOOK_ID || 'd06ca6ae-e7f2-451b-ba7a-d40eb1138d0f'

const MODE_PREFIXES: Record<string, string> = {
  brief:
    'Answer as a numbered list. Each item starts with a bold key phrase. Maximum 4-5 items. Example format:\n1. **Key phrase** rest of the point.\n2. **Key phrase** rest of the point.\n\n',
  explanatory:
    'Answer as a numbered list. Each item must start with a bold key phrase summarizing that point. Example format:\n1. **Key phrase** rest of the explanation.\n2. **Key phrase** rest of the explanation.\nUse this numbered+bold format for all points.\n\n',
}

export async function POST(req: NextRequest) {
  try {
    const { question, conversationId, mode } = await req.json()

    if (!question || typeof question !== 'string') {
      return NextResponse.json({ error: 'Question is required' }, { status: 400 })
    }

    const proxyUrl = process.env.NLM_PROXY_URL || 'http://localhost:3847'
    const apiKey = process.env.NLM_PROXY_KEY || 'cto-coach-2026'

    const prefix = MODE_PREFIXES[mode as string] ?? ''
    const fullQuestion = prefix + question

    const response = await fetch(`${proxyUrl}/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify({
        notebook_id: NOTEBOOK_ID,
        question: fullQuestion,
        conversation_id: conversationId ?? undefined,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('nlm-proxy error:', response.status, errorText)
      return NextResponse.json({ error: 'Failed to query NotebookLM' }, { status: 502 })
    }

    const data = await response.json()

    return NextResponse.json({
      answer: data.answer ?? '',
      conversationId: data.conversation_id ?? data.conversationId ?? null,
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
