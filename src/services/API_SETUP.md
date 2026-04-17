# Real API Integration & Deployment Configuration

## 🔑 API Keys Setup

### 1. Alpha Vantage (Free - Demo Tier)
**Best for:** Beginners, free tier (5 req/min)

```bash
# Get free key: https://www.alphavantage.co/api/

VITE_ALPHA_VANTAGE_KEY=your_key_here
```

### 2. Polygon.io (Recommended for Production)
**Best for:** Production, real-time data, reliable

```bash
# Get free tier: https://polygon.io

VITE_POLYGON_API_KEY=your_key_here
```

### 3. IEX Cloud
**Best for:** Reliable, US stocks, multiple endpoints

```bash
# Get free tier: https://iexcloud.io

VITE_IEX_API_KEY=your_key_here
```

### 4. Finnhub
**Best for:** Real-time quotes, news, company data

```bash
# Get free tier: https://finnhub.io

VITE_FINNHUB_API_KEY=your_key_here
```

## 🔐 Firebase Configuration

```bash
# Firebase Console: https://console.firebase.google.com

VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## 🎨 Design Customization

Edit `tailwind.config.js` colors:

```javascript
colors: {
  primary: '#8B5CF6',      // Main brand color
  secondary: '#EC4899',     // Accent color
  accent: '#06B6D4',        // Highlight color
  background: '#0f172a',    // Dark background
  card: '#1e293b',          // Card background
  text: '#f1f5f9',          // Text color
}
```

## 📦 Deployment Guides

### Vercel (Recommended - Fastest)
```bash
npm install -g vercel
vercel

# Or connect GitHub and auto-deploy
```

### Netlify
```bash
npm run build
# Drag dist folder to Netlify
# Or: netlify deploy --prod
```

### Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy --only hosting
```

See full deployment guide in DEPLOYMENT.md
