#!/bin/bash

# PawDash AWS Deployment Script
# This script deploys the backend infrastructure to AWS using SAM

set -e

echo "🐾 PawDash AWS Deployment"
echo "========================="
echo ""

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI not found. Please install it first."
    exit 1
fi

# Check if SAM CLI is installed
if ! command -v sam &> /dev/null; then
    echo "❌ AWS SAM CLI not found. Please install it first."
    echo "Install: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html"
    exit 1
fi

echo "✅ Prerequisites checked"
echo ""

# Install Lambda dependencies
echo "📦 Installing Lambda dependencies..."
cd aws/lambda/bookings && npm install && cd ../../..
cd aws/lambda/walkers && npm install && cd ../../..
cd aws/lambda/dispatch && npm install && cd ../../..
echo "✅ Dependencies installed"
echo ""

# Navigate to AWS directory
cd aws

# Build SAM application
echo "🔨 Building SAM application..."
sam build
echo "✅ Build completed"
echo ""

# Deploy
echo "🚀 Deploying to AWS..."
echo ""
echo "You will be prompted for deployment configuration."
echo "Recommended settings:"
echo "  - Stack Name: pawdash-backend"
echo "  - AWS Region: us-east-1"
echo "  - Confirm changes: Y"
echo "  - Allow SAM CLI IAM role: Y"
echo "  - Save arguments: Y"
echo ""

sam deploy --guided

echo ""
echo "✅ Deployment completed!"
echo ""
echo "📋 Stack outputs:"
sam list stack-outputs --stack-name pawdash-backend

echo ""
echo "🎉 Backend deployed successfully!"
echo ""
echo "Next steps:"
echo "1. Copy the API URL from outputs above"
echo "2. Update your .env.local with: NEXT_PUBLIC_API_URL=<your-api-url>"
echo "3. Deploy frontend to Vercel: vercel --prod"
