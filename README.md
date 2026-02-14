# PawDash - On-Demand Pet Care Platform

![PawDash](https://img.shields.io/badge/PawDash-On--Demand%20Pet%20Care-blue)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![AWS](https://img.shields.io/badge/AWS-Serverless-orange)
![Anthropic](https://img.shields.io/badge/Anthropic-Claude-purple)

An on-demand pet walking and sitting service built with Next.js, AWS serverless infrastructure, and Anthropic AI assistant. Like Uber, but for your furry friends.

## 🌟 Features

- **Instant Dispatch**: ASAP or scheduled pet walks
- **Real-Time Tracking**: GPS tracking during walks
- **AI-Powered Matching**: Behavioral compatibility between pets and walkers
- **Photo Report Cards**: Detailed post-service reports
- **Anthropic Chat Assistant**: AI-powered customer support
- **Liquid-Glass UI**: Modern, beautiful glassmorphism design
- **Fully Insured**: Comprehensive coverage for all services

## 🏗️ Tech Stack

### Frontend
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom glassmorphism
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **State**: Zustand
- **Deployment**: Vercel

### Backend
- **Infrastructure**: AWS Serverless (SAM)
- **API**: API Gateway + Lambda Functions
- **Database**: DynamoDB
- **Storage**: S3
- **Runtime**: Node.js 18
- **AI**: Anthropic Claude 3.5 Sonnet

## 📁 Project Structure

```
PawDash/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   └── chat/         # Anthropic chat endpoint
│   ├── book/             # Customer booking page
│   ├── walker/           # Walker application page
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Homepage
│   └── globals.css       # Global styles
├── components/            # React components
│   ├── ChatAssistant.tsx # AI chat widget
│   ├── GlassCard.tsx     # Reusable glass card
│   └── Navigation.tsx    # Main navigation
├── aws/                   # AWS infrastructure
│   ├── template.yaml     # SAM CloudFormation template
│   └── lambda/           # Lambda functions
│       ├── bookings/     # Booking management
│       ├── walkers/      # Walker management
│       └── dispatch/     # Walker dispatch logic
└── public/               # Static assets

```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- AWS CLI configured with credentials
- AWS SAM CLI
- Anthropic API key
- Vercel account (for deployment)

### Installation

1. **Clone and install dependencies**
```bash
cd PawDash
npm install
```

2. **Configure environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:
```env
ANTHROPIC_API_KEY=your_anthropic_api_key
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
```

3. **Run development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## ☁️ AWS Deployment

### Deploy Backend Infrastructure

1. **Navigate to AWS directory**
```bash
cd aws
```

2. **Install Lambda dependencies**
```bash
cd lambda/bookings && npm install && cd ../..
cd lambda/walkers && npm install && cd ../..
cd lambda/dispatch && npm install && cd ../..
```

3. **Build and deploy with SAM**
```bash
sam build
sam deploy --guided
```

Follow the prompts:
- Stack Name: `pawdash-backend`
- AWS Region: `us-east-1`
- Confirm changes: `Y`
- Allow SAM CLI IAM role: `Y`
- Save arguments: `Y`

4. **Note the API URL** from outputs
```bash
sam list stack-outputs --stack-name pawdash-backend
```

5. **Update frontend environment**
```bash
# Add to .env.local
NEXT_PUBLIC_API_URL=https://your-api-id.execute-api.us-east-1.amazonaws.com/prod
```

## 🌐 Vercel Deployment

### Deploy Frontend

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Deploy to Vercel**
```bash
vercel
```

Or connect your GitHub repo to Vercel for automatic deployments.

3. **Configure environment variables in Vercel**

Go to your project settings and add:
- `ANTHROPIC_API_KEY`
- `NEXT_PUBLIC_API_URL`
- All other required env vars

## 📱 Features Walkthrough

### Customer Experience
1. **Book a Walk**: Choose service type (15/30/60 min walks, sitting)
2. **Select Timing**: ASAP dispatch or scheduled
3. **Real-Time Tracking**: Watch walker's live location
4. **Photo Reports**: Receive detailed service reports

### Walker Experience
1. **Apply**: Submit application with experience
2. **Verification**: Background check + orientation
3. **Toggle Availability**: Control when you're active
4. **Accept Jobs**: First-come-first-served dispatch

### AI Chat Assistant
- Powered by Anthropic Claude 3.5 Sonnet
- Helps with booking, questions, and support
- Context-aware responses about PawDash services

## 🎨 UI Design

The app features a modern **liquid-glass** (glassmorphism) design:
- Backdrop blur effects
- Semi-transparent cards
- Gradient accents
- Smooth animations
- Dark theme with purple/blue gradients

## 🔒 Security & Safety

- Background-checked walkers
- Smart lock integration
- GPS tracking
- Photo verification
- Comprehensive insurance coverage
- Incident reporting

## 🗄️ Database Schema

### DynamoDB Tables

**Users Table**
- `userId` (PK)
- `email` (GSI)
- Profile information

**Pets Table**
- `petId` (PK)
- `ownerId` (GSI)
- Breed, temperament, special needs

**Bookings Table**
- `bookingId` (PK)
- `userId`, `walkerId` (GSI)
- `status` (GSI): pending, dispatched, accepted, in-progress, completed

**Walkers Table**
- `walkerId` (PK)
- `email`, `status` (GSI)
- Rating, certifications, availability

## 📊 API Endpoints

```
POST   /bookings          # Create new booking
GET    /bookings/{id}     # Get booking details
POST   /dispatch          # Dispatch walkers for booking
POST   /walkers           # Create walker application
GET    /walkers/{id}      # Get walker profile
POST   /api/chat          # Anthropic chat endpoint
```

## 💰 Business Model

- 20-30% commission per booking
- Surge pricing during peak times
- Optional subscriptions:
  - Owners: $19/month for priority dispatch
  - Walkers: $10-20/month for premium job access

## 🚧 Future Enhancements

- [ ] Real-time WebSocket updates
- [ ] Push notifications
- [ ] Stripe payment integration
- [ ] Mobile apps (React Native)
- [ ] Advanced behavioral AI matching
- [ ] Pet health tracking
- [ ] Vet telemedicine integration
- [ ] Referral rewards program

## 📄 License

This project is proprietary. See business plan for details.

## 👥 Contributing

This is a proprietary business project. Contact the team for collaboration opportunities.

## 📞 Support

For questions or support, use the in-app AI chat assistant or contact support@pawdash.com

---

**Built with ❤️ for pet lovers everywhere** 🐾
