#!/bin/bash

# 🚀 Zenvest One-Click Deployment Script
# Usage: ./deploy.sh [vercel|netlify|docker|firebase]

set -e

ENVIRONMENT=${1:-vercel}
PROJECT_NAME="zenvest"

echo "🚀 Zenvest Deployment Script"
echo "=============================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
  echo -e "${RED}Error: package.json not found. Are you in the project root?${NC}"
  exit 1
fi

# Build the project first
echo -e "${YELLOW}📦 Building project...${NC}"
npm run build

if [ ! -d "dist" ]; then
  echo -e "${RED}Error: Build failed - dist directory not found${NC}"
  exit 1
fi

echo -e "${GREEN}✅ Build successful!${NC}"
echo ""

# Deploy based on environment
case $ENVIRONMENT in
  vercel)
    echo -e "${YELLOW}🌐 Deploying to Vercel...${NC}"
    
    # Check if Vercel CLI is installed
    if ! command -v vercel &> /dev/null; then
      echo -e "${RED}Error: Vercel CLI not found. Install with: npm install -g vercel${NC}"
      exit 1
    fi
    
    # Deploy
    vercel --prod
    echo -e "${GREEN}✅ Deployed to Vercel!${NC}"
    ;;

  netlify)
    echo -e "${YELLOW}🌐 Deploying to Netlify...${NC}"
    
    # Check if Netlify CLI is installed
    if ! command -v netlify &> /dev/null; then
      echo -e "${RED}Error: Netlify CLI not found. Install with: npm install -g netlify-cli${NC}"
      exit 1
    fi
    
    # Deploy
    netlify deploy --prod --dir=dist
    echo -e "${GREEN}✅ Deployed to Netlify!${NC}"
    ;;

  firebase)
    echo -e "${YELLOW}🔥 Deploying to Firebase...${NC}"
    
    # Check if Firebase CLI is installed
    if ! command -v firebase &> /dev/null; then
      echo -e "${RED}Error: Firebase CLI not found. Install with: npm install -g firebase-tools${NC}"
      exit 1
    fi
    
    # Check if .firebaserc exists
    if [ ! -f ".firebaserc" ]; then
      echo -e "${RED}Error: .firebaserc not found. Run 'firebase init' first${NC}"
      exit 1
    fi
    
    # Deploy
    firebase deploy --only hosting
    echo -e "${GREEN}✅ Deployed to Firebase Hosting!${NC}"
    ;;

  docker)
    echo -e "${YELLOW}🐳 Building Docker image...${NC}"
    
    # Check if Docker is installed
    if ! command -v docker &> /dev/null; then
      echo -e "${RED}Error: Docker not found. Install Docker from https://docker.com${NC}"
      exit 1
    fi
    
    # Build Docker image
    docker build -t $PROJECT_NAME:latest .
    
    echo -e "${GREEN}✅ Docker image built successfully!${NC}"
    echo ""
    echo "Run the following to start the container:"
    echo "  docker run -p 3000:3000 $PROJECT_NAME:latest"
    echo ""
    echo "Or with docker-compose:"
    echo "  docker-compose up"
    ;;

  *)
    echo -e "${RED}Error: Unknown deployment target '$ENVIRONMENT'${NC}"
    echo ""
    echo "Usage: ./deploy.sh [vercel|netlify|firebase|docker]"
    echo ""
    echo "Examples:"
    echo "  ./deploy.sh vercel     # Deploy to Vercel"
    echo "  ./deploy.sh netlify    # Deploy to Netlify"
    echo "  ./deploy.sh firebase   # Deploy to Firebase Hosting"
    echo "  ./deploy.sh docker     # Build Docker image"
    exit 1
    ;;
esac

echo ""
echo -e "${GREEN}🎉 Deployment complete!${NC}"
echo ""
