# 🚀 Quick Start Guide

Get PawDash running locally in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- Git
- Text editor (VS Code recommended)

## Local Development Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Anthropic API key:

```env
ANTHROPIC_API_KEY=sk-ant-api03-your-key-here
```

> **Get Anthropic API Key**: Visit https://console.anthropic.com/

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

## What You Can Do Locally

Without AWS backend deployed:
- ✅ Explore the UI and design
- ✅ Test the AI chat assistant (requires Anthropic API key)
- ✅ Navigate through all pages
- ✅ Try the booking flow (frontend only)
- ✅ View walker application form

With AWS backend deployed:
- ✅ Full booking functionality
- ✅ Walker registration
- ✅ Dispatch system
- ✅ Real-time updates

## Project Structure Quick Tour

```
PawDash/
├── app/                    # Pages and routes
│   ├── page.tsx           # Homepage - start here!
│   ├── book/              # Booking page
│   ├── walker/            # Walker application
│   ├── pricing/           # Pricing info
│   ├── how-it-works/      # How it works
│   └── api/chat/          # Anthropic chat API
├── components/            # React components
│   ├── ChatAssistant.tsx  # AI chat widget
│   ├── GlassCard.tsx      # Glass UI component
│   └── Navigation.tsx     # Top nav
├── aws/                   # Backend infrastructure
│   ├── template.yaml      # CloudFormation template
│   └── lambda/            # Lambda functions
└── lib/                   # Utilities
    └── api.ts             # API client
```

## Testing the AI Chat

1. Make sure `ANTHROPIC_API_KEY` is in `.env.local`
2. Click the chat bubble (bottom right)
3. Ask questions like:
   - "How much does a 30-minute walk cost?"
   - "How do I become a walker?"
   - "What areas do you serve?"

## Customizing the UI

### Change Color Scheme

Edit [tailwind.config.ts](tailwind.config.ts):

```typescript
colors: {
  primary: {
    // Your custom blue/primary color
    500: '#0ea5e9',
  },
  accent: {
    // Your custom purple/accent color
    500: '#d946ef',
  },
}
```

### Modify Glassmorphism

Edit [app/globals.css](app/globals.css):

```css
.glass {
  @apply backdrop-blur-md bg-white/10 border border-white/20;
}
```

## Next Steps

### For Development
1. ✅ **Run locally** (you are here!)
2. 📖 Read [DEPLOYMENT.md](DEPLOYMENT.md) for production deployment
3. 🔧 Customize features and styling
4. 🧪 Add tests

### For Production
1. 🌩️ **Deploy AWS Backend** - See [DEPLOYMENT.md](DEPLOYMENT.md#1-backend-deployment-aws)
2. 🌐 **Deploy to Vercel** - See [DEPLOYMENT.md](DEPLOYMENT.md#3-frontend-deployment-vercel)
3. 🔐 Add authentication (Cognito/Auth0)
4. 💳 Integrate Stripe payments

## Helpful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint

# AWS Deployment
cd aws
sam build                # Build Lambda functions
sam deploy --guided      # Deploy to AWS
sam logs --tail          # Watch logs

# Vercel Deployment
vercel                   # Deploy to preview
vercel --prod            # Deploy to production
```

## Common Issues

### Port 3000 Already in Use

```bash
# Kill the process or use different port
PORT=3001 npm run dev
```

### Environment Variables Not Loading

- Restart dev server after editing `.env.local`
- Make sure file is named `.env.local` (not `.env`)
- Variables must start with `NEXT_PUBLIC_` for client-side access

### Chat Assistant Not Working

- Check Anthropic API key is valid
- Check browser console for errors
- Verify API route at `/api/chat`

## Getting Help

1. 💬 **AI Chat Assistant** - Use the built-in chat (if running)
2. 📖 **Documentation** - Check [README.md](README.md) and [DEPLOYMENT.md](DEPLOYMENT.md)
3. 🐛 **Debug** - Check browser console and terminal logs

## Key Features to Explore

1. **Homepage** (`/`) - Beautiful landing page with liquid-glass UI
2. **Book a Walk** (`/book`) - Multi-step booking flow
3. **Become a Walker** (`/walker`) - Walker application form
4. **How It Works** (`/how-it-works`) - Detailed process explanation
5. **Pricing** (`/pricing`) - Service pricing and subscriptions
6. **AI Chat** - Bottom right corner, powered by Anthropic

## Tips

- 🎨 The UI uses **glassmorphism** design - transparent, blurred backgrounds
- 🤖 The chat assistant knows all about PawDash - try asking complex questions
- 📱 Fully responsive - try resizing your browser
- ✨ Uses Framer Motion for smooth animations

---

Ready to deploy? Check out [DEPLOYMENT.md](DEPLOYMENT.md)

Questions? Ask the AI chat assistant! 🐾
