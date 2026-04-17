# 🚀 Zenvest Deployment Guide

Complete guide to deploy Zenvest to production with real APIs and custom design.

## Prerequisites
- **Node.js 16+** for building
- **GitHub account** (for CI/CD)
- **Domain name** (optional)
- **API keys** from at least one stock market provider

---

## 📋 Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] Firebase project created and APIs enabled
- [ ] Stock API keys obtained
- [ ] Production build tested locally: `npm run build`
- [ ] No console errors or warnings
- [ ] Mobile responsive verified
- [ ] All features working in demo mode

---

## ⚡ Quick Deploy (One Command)

We provide helper scripts for instant deployment!

### On macOS/Linux:
```bash
# Make script executable
chmod +x deploy.sh

# Deploy to your chosen platform
./deploy.sh vercel      # Single command deploy to Vercel!
./deploy.sh netlify     # Deploy to Netlify
./deploy.sh firebase    # Deploy to Firebase Hosting
./deploy.sh docker      # Build Docker image
```

### On Windows:
```bash
# Run the batch file
deploy.bat vercel       # Deploy to Vercel
deploy.bat netlify      # Deploy to Netlify
deploy.bat firebase     # Deploy to Firebase Hosting
deploy.bat docker       # Build Docker image
```

The scripts automatically:
1. ✅ Build the project
2. ✅ Verify build success
3. ✅ Deploy to your chosen platform
4. ✅ Show deployment status

---

## 🚀 Option 1: Vercel (Recommended - Super Easy)

## 🚀 Option 1: Vercel (Recommended - Super Easy)

### Step 1: Sign Up
Visit [vercel.com](https://vercel.com) and sign up with GitHub

### Step 2: Connect Repository
1. Click "New Project"
2. Import your GitHub repo
3. Select Zenvest project

### Step 3: Configure Environment Variables
In Vercel Dashboard:
1. Go to Settings → Environment Variables
2. Add all variables from `.env.example`:
```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
... (add all others)
```

### Step 4: Deploy
1. Click "Deploy"
2. Wait ~2-3 minutes
3. Your app is live! 🎉

**Automatic Updates:**
- Vercel auto-deploys on every GitHub push
- Easy rollbacks if needed
- Custom domain support

---

## 🚀 Option 2: Netlify

### Step 1: Build Your App
```bash
npm run build
```

### Step 2: Sign Up
Visit [netlify.com](https://netlify.com) and sign up

### Step 3: Deploy via Drag & Drop
1. Drag `dist` folder to Netlify
2. Set environment variables in Site settings
3. Deploy!

### Step 4: Connect GitHub (Optional)
For automatic deploys:
1. Click "Connect to Git"
2. Select your GitHub repo
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

---

## 🚀 Option 3: Firebase Hosting

### Step 1: Install Firebase CLI
```bash
npm install -g firebase-tools
```

### Step 2: Initialize Firebase
```bash
firebase login
firebase init hosting

# When prompted:
# ✓ Select your Firebase project
# ✓ Public directory: dist
# ✓ Single page app: Yes
```

### Step 3: Build and Deploy
```bash
npm run build
firebase deploy --only hosting
```

**Your Firebase URL:**
```
https://your-project.web.app
```

---

## 🚀 Option 4: Docker (Self-Hosted)

Docker containerization for easy deployment anywhere!

### Prerequisites
```bash
# Install Docker
# macOS: brew install docker
# Windows: Download from docker.com
# Linux: sudo apt-get install docker.io
```

### Quick Deploy with Docker

```bash
# Build the image
docker build -t zenvest:latest .

# Run locally
docker run -p 3000:3000 \
  -e VITE_POLYGON_API_KEY=your_key \
  zenvest:latest

# Visit http://localhost:3000
```

### Deploy with Docker Compose

```bash
# Copy .env.example to .env and fill in your values
cp .env.example .env

# Start the app with all services
docker-compose up

# Stop
docker-compose down

# Production with nginx reverse proxy:
docker-compose --profile production up
```

### Docker on AWS EC2

```bash
# SSH into your EC2 instance
ssh -i your-key.pem ec2-user@your-instance-ip

# Install Docker
sudo yum update -y
sudo yum install docker -y
sudo systemctl start docker

# Clone your repo
git clone https://github.com/your-user/zenvest.git
cd zenvest

# Build and run
docker build -t zenvest:latest .
docker run -d -p 80:3000 \
  -e VITE_POLYGON_API_KEY=your_key \
  zenvest:latest

# Your app is now live on your EC2 IP!
```

### Docker on DigitalOcean App Platform

1. Push your repo to GitHub (with Dockerfile)
2. Go to [DigitalOcean App Platform](https://cloud.digitalocean.com/apps)
3. Click "Create App"
4. Select your GitHub repo
5. DigitalOcean auto-detects Dockerfile
6. Set environment variables
7. Deploy! (Takes ~2 minutes)

**Cost:** $5-12/month

---

## 🚀 Option 5: Self-Hosted (AWS, Heroku, DigitalOcean)

## 🚀 Option 5: Self-Hosted (AWS, Heroku, DigitalOcean)

### Deploy to Heroku

```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create zenvest-your-name

# Set environment variables
heroku config:set VITE_POLYGON_API_KEY=your_key

# Deploy
git push heroku main

# Open your app
heroku open
```

**Cost:** Free tier available, $7+/month for production

### Deploy to AWS Lightsail

1. Go to [AWS Lightsail](https://lightsail.aws.amazon.com/)
2. Create Node.js container
3. Upload your code
4. Set environment variables in container configuration
5. Deploy from container registry

**Cost:** $3.50-50/month depending on specs

---

## 🎨 Customizing Design

### Built-in Theme Customizer

Zenvest includes a floating design panel (bottom-right corner) that lets you:

✅ Choose from 5 pre-built theme presets:
  - 🚀 Zenvest (Default)
  - 🌊 Ocean Vibes
  - 🌅 Sunset
  - 🌲 Forest
  - 🌙 Midnight
  - 🍒 Cherry Blossom

✅ Create custom themes with color picker
✅ Save themes to localStorage
✅ Export themes as JSON

### How to Use

1. **In the app:** Click 🎨 button in bottom-right corner
2. **Select preset:** Click any theme to apply instantly
3. **Create custom:** Click "+ Create Custom Theme"
4. **Adjust colors:** Use color picker for each color
5. **Save:** Click "Save Theme" - it persists automatically!

### Programmatic Theme Usage

### Programmatic Theme Usage

```javascript
// Import theme components in your custom components
import { 
  ThemeCustomizer, 
  ColorPalette, 
  DesignSystemGuide,
  exportThemeAsCSS,
  downloadTheme 
} from './components/common';

// Use themes in your components
const [currentTheme, setCurrentTheme] = useState({
  name: 'Custom',
  colors: {
    primary: '#8B5CF6',
    secondary: '#EC4899',
    accent: '#06B6D4',
    background: '#0f172a',
    card: '#1e293b'
  }
});

// Export theme as CSS
const cssCode = exportThemeAsCSS(currentTheme.colors);

// Download theme configuration
downloadTheme(currentTheme.colors, 'my-theme');
```

### Tailwind CSS Customization

Edit `tailwind.config.js` to change default colors:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#YOUR_COLOR',
        secondary: '#YOUR_COLOR',
        accent: '#YOUR_COLOR',
      },
    },
  },
};
```

Then rebuild:
```bash
npm run build
```

---

```env
# Production Firebase
VITE_FIREBASE_API_KEY=your_production_key
VITE_FIREBASE_PROJECT_ID=your_production_project

# Production APIs
VITE_ALPHA_VANTAGE_KEY=your_production_key
VITE_POLYGON_API_KEY=your_production_key

# Feature flags
VITE_ENV=production
VITE_ENABLE_REAL_TRADING=false
```

---

## ✅ Post-Deployment Verification

After deployment, verify:

```bash
# Check if app loads
curl https://your-domain.com/

# Check if API calls work
# Manually test trading, quizzes, AI chat

# Check performance
# Lighthouse: lighthouse CI
# GTmetrix: https://gtmetrix.com

# Monitor errors
# Check browser console for JS errors
# Check Firebase console for auth errors
```

---

## 📊 Performance Optimization Pre-Deployment

### 1. Build Optimization
```bash
npm run build
# Check bundle size:
ls -lh dist/
```

Target: `< 250KB` gzipped

### 2. Image Optimization
- We use emojis instead of images ✅
- No image assets needed

### 3. Code Splitting
Already done by Vite:
- Automatic chunk splitting
- Lazy loading of components

### 4. Minification
```bash
# Vite handles this automatically
npm run build
```

---

## 🔍 Troubleshooting Deployment

### Issue: "Cannot find module X"
**Solution:**
1. Check all imports are correct
2. Run `npm install` again
3. Clear node_modules: `rm -rf node_modules && npm install`

### Issue: Firebase authentication fails
**Solution:**
1. Check `.env` variables in deployment platform
2. Verify Firebase project settings
3. Allow domain in Firebase Console → Authentication → Authorized domains

### Issue: Stock API returns 429 (rate limit)
**Solution:**
1. Use a better API (Polygon.io instead of Alpha Vantage)
2. Implement caching
3. Add request throttling

### Issue: App works locally but fails after deploy
**Solution:**
1. Check browser console for errors (F12)
2. Verify environment variables are set
3. Check network tab for failed requests
4. Test in incognito mode

---

## 🎯 Continuous Deployment (CI/CD)

### GitHub Actions Workflow
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - run: npm install
      - run: npm run build
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: ./
```

---

## 📈 Monitoring & Analytics

### Add Sentry (Error Tracking)
```bash
npm install @sentry/react @sentry/tracing
```

```javascript
// In App.jsx
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.VITE_ENV,
});
```

### Add Google Analytics
```bash
npm install react-ga4
```

### Real-time Monitoring
- Firebase Console (users, events)
- Vercel Analytics Dashboard
- Netlify Analytics

---

## 💰 Cost Estimation

| Service | Free Tier | Production |
|---------|-----------|-----------|
| Vercel | Up to 100GB/month | $20+/month |
| Netlify | Up to 300 minutes/month | $19+/month |
| Firebase Hosting | 10GB/month | $0.18/GB |
| Alpha Vantage | 5 req/min | $200-450/month |
| Polygon.io | 5 stocks/month | $35+/month |

**Recommended Stack Costs:**
- Vercel: Free during launch
- Firebase Auth/Hosting: ~$0-20/month (free tier)
- Polygon.io: $35/month (for real data)
- **Total: ~$35-50/month**

---

## 🔄 Update & Maintenance

### Regular Updates
```bash
# Update dependencies monthly
npm update

# Major version updates
npm outdated
npm install package@latest
```

### Rollback if Needed
- Vercel: Click "Rollback"
- Firebase: Redeploy previous commit
- Netlify: Deploy previous version

---

## 📞 Deployment Support

- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **Firebase Docs:** [firebase.google.com/docs](https://firebase.google.com/docs)
- **Netlify Docs:** [netlify.com/docs](https://netlify.com/docs)

---

## ✨ Your Deployment Checklist

### Before Going Live
- [ ] `.env.example` has all variables
- [ ] Production API keys are secure
- [ ] Firebase security rules configured
- [ ] Domain purchased (if custom)
- [ ] SSL certificate enabled
- [ ] Error monitoring set up

### Day 1 Launch
- [ ] Deploy to production
- [ ] Smoke test all features
- [ ] Check mobile responsiveness
- [ ] Monitor errors in console
- [ ] Celebrate! 🎉

---

**Ready to deploy? Choose Vercel for easiest setup!** 🚀
