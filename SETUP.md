# Zenvest Setup & Configuration Guide

## 🚀 Quick Start

### 1. Installation (2 minutes)
```bash
cd zenvest
npm install
npm run dev
```

Visit `http://localhost:5173` and click **"Try Demo Mode"** to start!

---

## 🔐 Firebase Setup (Optional)

### Step 1: Create Firebase Project
1. Go to [firebase.google.com](https://firebase.google.com)
2. Click "Get started" or "Add project"
3. Create a new project for Zenvest
4. Enable Google analytics (optional)

### Step 2: Add Firebase to Your App
1. In Firebase Console, click `</>` (Add Firebase to your web app)
2. Register your app
3. Copy the config object

### Step 3: Update `.env` File
Create a `.env` file in the project root:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Step 4: Enable Authentication
1. In Firebase Console, go to "Authentication"
2. Click "Get started"
3. Enable "Email/Password" provider
4. (Optional) Enable Google, Apple sign-in

### Step 5: Create Firestore Database
1. Go to "Firestore Database"
2. Click "Create database"
3. Choose location (close to your users)
4. Start in **Test mode** (for development)
5. Create collection `users`

---

## 📊 Real Stock Data Integration

### Option 1: Polygon.io API (Recommended)
```javascript
// Replace mock API in services/stocks.js
const POLYGON_API_KEY = import.meta.env.VITE_POLYGON_API_KEY;

export const fetchStockData = async (symbol) => {
  const response = await fetch(
    `https://api.polygon.io/v1/open-close/${symbol}/2024-01-01?apiKey=${POLYGON_API_KEY}`
  );
  return response.json();
};
```

Get API key: [polygon.io](https://polygon.io)

### Option 2: IEX Cloud
```javascript
const IEX_TOKEN = import.meta.env.VITE_IEX_TOKEN;

export const fetchStockData = async (symbol) => {
  const response = await fetch(
    `https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${IEX_TOKEN}`
  );
  return response.json();
};
```

Get API key: [iexcloud.io](https://iexcloud.io)

### Option 3: Alpha Vantage (Free)
```javascript
const ALPHA_VANTAGE_KEY = import.meta.env.VITE_ALPHA_VANTAGE_KEY;

export const fetchStockData = async (symbol) => {
  const response = await fetch(
    `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_KEY}`
  );
  return response.json();
};
```

Get API key: [alphavantage.co](https://www.alphavantage.co/api/)

---

## 🤖 Claude AI Setup (Optional)

### Step 1: Get API Key
1. Visit [claude.ai](https://claude.ai)
2. Sign up or login
3. Go to API section
4. Create API key
5. Copy the key

### Step 2: Add to `.env`
```env
VITE_CLAUDE_API_KEY=your_claude_api_key
```

### Step 3: Update AI Component
In `src/components/ai/index.jsx`:

```javascript
const callClaudeAPI = async (message) => {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': import.meta.env.VITE_CLAUDE_API_KEY,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 1024,
      messages: [{ role: 'user', content: message }],
    }),
  });
  return response.json();
};
```

---

## 🎨 Customization

### Change Color Palette
Edit `tailwind.config.js`:

```javascript
colors: {
  primary: '#8B5CF6',      // Change purple
  secondary: '#EC4899',    // Change pink
  accent: '#06B6D4',       // Change cyan
  background: '#0f172a',   // Change background
  // ... more colors
}
```

### Add New Stocks
Edit `src/utils/constants.js`:

```javascript
export const MOCK_STOCKS = [
  {
    id: 'YOURSTOCK',
    symbol: 'YOURSTOCK',
    name: 'Your Stock Name',
    price: 1000,
    change: 50,
    changePercent: 5,
    // ... more fields
  },
  // ... more stocks
];
```

### Add New Quizzes
Edit `src/utils/constants.js`:

```javascript
export const LEARNING_QUIZZES = [
  {
    id: 99,
    title: 'Your Quiz Title',
    points: 50,
    category: 'Your Category',
    question: 'Your question?',
    options: ['Option 1', 'Option 2', 'Option 3'],
    correct: 0, // Index of correct answer
    explanation: 'Explanation here',
  },
];
```

---

## 📦 Build & Deploy

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Upload 'dist' folder to Netlify
```

### Deploy to Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

---

## 🐛 Troubleshooting

### Issue: Colors not showing correctly
- Clear browser cache: `Ctrl+Shift+Delete`
- Restart dev server: `npm run dev`
- Check `tailwind.config.js` is in root

### Issue: Firebase not connecting
- Check `.env` file has correct credentials
- Verify Firestore rules allow read/write
- Check browser console for errors

### Issue: Stock prices not updating
- Check API key is valid (if using real API)
- Verify API response format matches expected
- Check browser network tab for API errors

### Issue: Build fails
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Check Node version: `node --version` (should be 16+)

---

## 🚀 Performance Optimization

### Code Splitting
Auto-handled by Vite. To manually split:

```javascript
// Lazy load components
const AIAssistant = React.lazy(() => import('./components/ai'));
```

### Image Optimization
- Use SVG for icons (we use emojis!)
- Compress images before uploading
- Use appropriate formats (webp for photos)

### Bundle Size
Check with:
```bash
npm run build
# Check dist folder size
```

---

## 📚 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_FIREBASE_API_KEY` | Firebase API key | Optional (demo works without) |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase domain | Optional |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID | Optional |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase storage | Optional |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase sender ID | Optional |
| `VITE_FIREBASE_APP_ID` | Firebase app ID | Optional |
| `VITE_CLAUDE_API_KEY` | Claude API key | Optional |
| `VITE_POLYGON_API_KEY` | Polygon stock API key | Optional |

---

## 🎯 Next Steps

1. ✅ Try demo mode
2. 🔐 Set up Firebase (optional)
3. 📊 Add real stock data API
4. 🤖 Integrate Claude AI
5. 🚀 Deploy to production
6. 📈 Add more features!

---

## 📞 Support

- 📖 Check README.md
- 🤖 Ask in AI Guide
- 🐛 Create GitHub issue
- 💬 Check discussion forums

Happy investing! 🚀📈
