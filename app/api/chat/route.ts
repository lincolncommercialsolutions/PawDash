import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
})

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

    // Convert history to Anthropic format
    const messages = [
      ...history.map((msg: { role: string; content: string }) => ({
        role: msg.role === 'assistant' ? 'assistant' : 'user',
        content: msg.content,
      })),
      {
        role: 'user',
        content: message,
      },
    ]

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: messages,
    })

    const assistantMessage = response.content[0].type === 'text' 
      ? response.content[0].text 
      : 'I apologize, but I had trouble processing that. Could you rephrase?'

    return NextResponse.json({ message: assistantMessage })
  } catch (error) {
    console.error('Anthropic API error:', error)
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    )
  }
}
