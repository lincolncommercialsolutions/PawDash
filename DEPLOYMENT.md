# PawDash Deployment Guide

This guide walks you through deploying PawDash to production.

## Prerequisites

Before deploying, ensure you have:

- [ ] Node.js 18+ installed
- [ ] AWS account with CLI configured
- [ ] AWS SAM CLI installed
- [ ] Vercel account
- [ ] Anthropic API key
- [ ] (Optional) Custom domain

## Deployment Steps

### 1. Backend Deployment (AWS)

#### Install AWS SAM CLI

**macOS:**
```bash
brew install aws-sam-cli
```

**Linux:**
```bash
# Download from: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html
```

**Windows:**
```bash
# Use MSI installer from AWS documentation
```

#### Configure AWS Credentials

```bash
aws configure
# Enter your AWS Access Key ID
# Enter your AWS Secret Access Key
# Default region: us-east-1
# Default output format: json
```

#### Deploy Backend

```bash
# Option 1: Use deployment script
chmod +x scripts/deploy-aws.sh
./scripts/deploy-aws.sh

# Option 2: Manual deployment
cd aws
cd lambda/bookings && npm install && cd ../..
cd lambda/walkers && npm install && cd ../..
cd lambda/dispatch && npm install && cd ../..
sam build
sam deploy --guided
```

#### SAM Deploy Configuration

When prompted during `sam deploy --guided`:

1. **Stack Name**: `pawdash-backend`
2. **AWS Region**: `us-east-1` (or your preferred region)
3. **Confirm changes before deploy**: `Y`
4. **Allow SAM CLI IAM role creation**: `Y`
5. **Disable rollback**: `N`
6. **Save arguments to configuration file**: `Y`
7. **SAM configuration file**: `samconfig.toml`
8. **SAM configuration environment**: `default`

#### Get API URL

After deployment:
```bash
sam list stack-outputs --stack-name pawdash-backend
```

Look for the `ApiUrl` output. Copy this URL.

### 2. Configure Environment Variables

Update your `.env.local`:

```env
# Anthropic
ANTHROPIC_API_KEY=sk-ant-api03-...

# AWS
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=...
NEXT_PUBLIC_API_URL=https://xxxxx.execute-api.us-east-1.amazonaws.com/prod

# Database Tables
DYNAMODB_TABLE_USERS=pawdash-users
DYNAMODB_TABLE_PETS=pawdash-pets
DYNAMODB_TABLE_BOOKINGS=pawdash-bookings
DYNAMODB_TABLE_WALKERS=pawdash-walkers

# S3
S3_BUCKET_NAME=pawdash-uploads-XXXXXXXXXXXX
```

### 3. Frontend Deployment (Vercel)

#### Option A: GitHub Integration (Recommended)

1. Push code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/pawdash.git
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Configure environment variables in Vercel dashboard
6. Deploy!

#### Option B: CLI Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
chmod +x scripts/deploy-vercel.sh
./scripts/deploy-vercel.sh

# Or manually
vercel --prod
```

#### Vercel Environment Variables

Add these in Vercel dashboard (Settings → Environment Variables):

```
ANTHROPIC_API_KEY
NEXT_PUBLIC_API_URL
AWS_REGION
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
NEXT_PUBLIC_MAPBOX_TOKEN (optional)
STRIPE_SECRET_KEY (optional)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY (optional)
```

### 4. Post-Deployment Verification

#### Test Backend API

```bash
# Get API URL from SAM outputs
API_URL=$(sam list stack-outputs --stack-name pawdash-backend --output json | grep ApiUrl)

# Test health (if you add a health endpoint)
curl $API_URL/health
```

#### Test Frontend

1. Visit your Vercel URL
2. Test chat assistant (bottom right)
3. Try booking flow
4. Test walker application

#### Test Integration

1. Open browser console
2. Try creating a booking
3. Check AWS CloudWatch logs:
```bash
sam logs --stack-name pawdash-backend --tail
```

### 5. Custom Domain (Optional)

#### Vercel Domain

1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

#### SSL/TLS

Vercel automatically provisions SSL certificates.

## Monitoring

### CloudWatch Logs

View Lambda logs:
```bash
# All functions
sam logs --stack-name pawdash-backend --tail

# Specific function
aws logs tail /aws/lambda/pawdash-backend-CreateBookingFunction --follow
```

### DynamoDB Tables

Check tables:
```bash
aws dynamodb list-tables

# Scan bookings table
aws dynamodb scan --table-name pawdash-bookings --max-items 10
```

### S3 Bucket

List uploads:
```bash
aws s3 ls s3://pawdash-uploads-XXXXXXXXXXXX/
```

## Troubleshooting

### Lambda Function Errors

```bash
# View recent errors
sam logs -n CreateBookingFunction --stack-name pawdash-backend --tail

# Check IAM permissions
aws iam get-role --role-name pawdash-backend-CreateBookingFunctionRole
```

### Vercel Build Failures

```bash
# Local build test
npm run build

# Check build logs in Vercel dashboard
```

### CORS Issues

Verify API Gateway CORS configuration in `aws/template.yaml`:
```yaml
Cors:
  AllowMethods: "'GET,POST,PUT,DELETE,OPTIONS'"
  AllowHeaders: "'Content-Type,Authorization'"
  AllowOrigin: "'*'"  # Update to your domain in production
```

### Anthropic API Errors

Check API key:
```bash
# Test with curl
curl https://api.anthropic.com/v1/messages \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "content-type: application/json" \
  -d '{
    "model": "claude-3-5-sonnet-20241022",
    "max_tokens": 1024,
    "messages": [{"role": "user", "content": "Hello"}]
  }'
```

## Update Deployment

### Update Backend

```bash
cd aws
sam build
sam deploy
```

### Update Frontend

**If using GitHub:**
- Push to main branch, Vercel auto-deploys

**If using CLI:**
```bash
vercel --prod
```

## Rollback

### Rollback Backend

```bash
# List CloudFormation stacks
aws cloudformation list-stacks

# Rollback to previous version
aws cloudformation continue-update-rollback --stack-name pawdash-backend
```

### Rollback Frontend

In Vercel dashboard:
1. Go to Deployments
2. Find previous working deployment
3. Click "Promote to Production"

## Costs Estimate

### AWS (per month)

- **API Gateway**: ~$3.50 per million requests
- **Lambda**: First 1M requests free, then $0.20 per 1M
- **DynamoDB**: First 25 GB free, then $0.25/GB
- **S3**: $0.023 per GB
- **Data Transfer**: $0.09 per GB

**Estimated**: $10-50/month for MVP

### Vercel

- **Hobby**: Free (with limits)
- **Pro**: $20/month
- **Enterprise**: Custom

### Anthropic

- **Claude 3.5 Sonnet**: ~$3 per million input tokens
- **Estimated**: $5-20/month for chat

**Total MVP Cost**: ~$15-70/month

## Security Checklist

- [ ] Rotate AWS access keys regularly
- [ ] Use IAM roles with least privilege
- [ ] Enable CloudWatch alarms
- [ ] Restrict CORS origins in production
- [ ] Use Vercel environment variables (not committed)
- [ ] Enable DynamoDB point-in-time recovery
- [ ] Set up S3 bucket policies
- [ ] Monitor API usage and set limits
- [ ] Implement rate limiting
- [ ] Add authentication (Cognito/Auth0)

## Next Steps

1. **Add Authentication**: AWS Cognito or Auth0
2. **Stripe Integration**: Payment processing
3. **WebSocket**: Real-time tracking updates
4. **Push Notifications**: SNS + Mobile
5. **Monitoring**: CloudWatch Dashboards
6. **CI/CD**: GitHub Actions
7. **Testing**: Jest + Cypress
8. **Analytics**: Google Analytics / Mixpanel

---

Need help? Contact support@pawdash.com or use the AI chat assistant.
