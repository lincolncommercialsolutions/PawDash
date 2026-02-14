import { NextRequest, NextResponse } from 'next/server'

const SYSTEM_PROMPT = `You are a helpful customer service assistant for PawDash, an on-demand pet walking and sitting service (like Uber, but for dog walking).

Key information about PawDash:
- Instant dispatch: Request walks ASAP or schedule ahead
- Service types: 15-min, 30-min, 60-min walks; drop-in visits; 2-4 hour sitting; overnight (scheduled only)
- Real-time GPS tracking during walks
- Photo report cards after each service with bathroom logs and behavior notes
- All walkers are background-checked and insured
- Behavioral matching AI pairs pets with suitable walkers (e.g., certified for anxious dogs)
- Smart lock integration for safe, keyless access
- Pricing: Commission-based (20-30%), surge pricing during high-demand
- Subscription option: $19/month for priority dispatch and lower fees

Your role:
- Help users book walks or answer questions about the service
- Be friendly, professional, and helpful
- If users want to book, guide them to the /book page
- If they want to become walkers, guide them to /walker page
- Answer questions about safety, insurance, pricing, and how the service works
- Keep responses concise but informative`

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json()

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Convert history to OpenAI/OpenRouter format
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...history.map((msg: { role: string; content: string }) => ({
        role: msg.role,
        content: msg.content,
      })),
      {
        role: 'user',
        content: message,
      },
    ]

    // Call OpenRouter API
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPEN_ROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
        'X-Title': 'PawDash',
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3.5-sonnet',
        messages: messages,
        max_tokens: 1024,
      }),
    })

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.statusText}`)
    }

    const data = await response.json()
    const assistantMessage = data.choices?.[0]?.message?.content || 
      'I apologize, but I had trouble processing that. Could you rephrase?'

    return NextResponse.json({ message: assistantMessage })
  } catch (error) {
    console.error('OpenRouter API error:', error)
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    )
  }
}
