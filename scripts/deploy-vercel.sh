#!/bin/bash

# PawDash Vercel Deployment Script
# This script deploys the frontend to Vercel

set -e

echo "🐾 PawDash Vercel Deployment"
echo "============================"
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

echo "✅ Vercel CLI ready"
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "⚠️  .env.local not found. Creating from example..."
    cp .env.example .env.local
    echo "⚠️  Please update .env.local with your credentials before deploying!"
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

echo ""
echo "🔨 Building Next.js application..."
npm run build

echo ""
echo "🚀 Deploying to Vercel..."
echo ""
echo "Make sure you have configured these environment variables in Vercel:"
echo "  - ANTHROPIC_API_KEY"
echo "  - NEXT_PUBLIC_API_URL"
echo "  - AWS_REGION"
echo "  - AWS_ACCESS_KEY_ID"
echo "  - AWS_SECRET_ACCESS_KEY"
echo ""

vercel --prod

echo ""
echo "✅ Deployment completed!"
echo ""
echo "🎉 PawDash is now live on Vercel!"
echo ""
echo "Don't forget to:"
echo "1. Configure environment variables in Vercel dashboard"
echo "2. Set up custom domain (optional)"
echo "3. Test the AI chat assistant"
echo "4. Test booking flow with AWS backend"
