# 🚀 Zenvest - Investing Made Simple for Gen Z

A modern, beginner-friendly investment app designed for Gen Z (18-25) with AI guidance, gamification, and mock trading features. Inspired by apps like Groww but reimagined for a new generation.

## 🎯 Features

### Core Functionality
- ✅ **User Authentication** - Firebase-based login/signup
- ✅ **Portfolio Dashboard** - Real-time portfolio tracking with visual charts
- ✅ **Stock Browsing** - Search and explore Indian stocks
- ✅ **Mock Trading** - Buy/sell with virtual money (practice mode)
- ✅ **Transaction History** - Track all your trades
- ✅ **Watchlist** - Save stocks to monitor

### 🧠 AI Investment Guide
- Explains investing concepts in Gen Z language
- Interactive chatbot for beginner questions
- Smart recommendations for first-time investors
- Examples: "Explain Reliance like I'm 18"

### 🎮 Gamified Learning
- **Quizzes** - Learn about SIP, risk management, dividends
- **Badges** - Unlock achievements (First Trade, Diamond Hands, Scholar, etc.)
- **Levels** - Progress from Novice to Finance Guru
- **Streaks** - Daily login, trading, and learning streaks
- **Leaderboard** - Compete with other Gen Z investors
- **Points System** - Earn points for every action

### 👁️ Beginner vs Pro Modes
- **Beginner Mode** - Simplified UI with explanations and tips
- **Pro Mode** - Advanced charts and analytics

### 💰 Virtual Money System
- Start with ₹10,000 virtual money
- Practice investing with zero risk
- Track performance and learning

### 🎯 Additional Features
- Dark mode by default (smooth on eyes at night 👀)
- Smooth animations and micro-interactions
- Fully responsive (mobile-first design)
- Clean, minimal Gen Z UI with vibrant colors
- Clean component architecture

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite (Lightning fast ⚡)
- **Styling**: Tailwind CSS + custom dark mode
- **Charts**: Recharts for beautiful visualizations
- **State Management**: Zustand (lightweight & simple)
- **Animations**: Framer Motion
- **Backend**: Firebase (Authentication, Firestore)
- **AI**: Claude API (ready for integration)
- **Icons**: Emojis (simple & fun!)

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm
- Firebase account (free tier available)

### Installation

1. **Clone the repo**
```bash
git clone https://github.com/yourusername/zenvest.git
cd zenvest
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up Firebase** (Optional - Demo mode works without it!)
   - Create a Firebase project at [firebase.google.com](https://firebase.google.com)
   - Copy your credentials
   - Create `.env` file:
```env
VITE_FIREBASE_API_KEY=your_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_domain.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. **Start development server**
```bash
npm run dev
```

5. **Open in browser**
```
http://localhost:5173
```

## 📱 How to Use

### For First-Time Users
1. Click "Try Demo Mode" - no login needed!
2. Start with ₹10,000 virtual money
3. Explore stocks and complete quizzes
4. Buy/sell stocks to practice
5. Earn badges and level up!

### Main Features to Try
- **Dashboard**: See your portfolio overview
- **Explore**: Browse and search Indian stocks
- **Learn**: Complete quizzes to earn points
- **AI Guide**: Chat with the investment bot
- **Profile**: Check your stats and achievements

## 🎨 Design System

### Color Palette
- **Primary**: `#8B5CF6` (Vibrant Purple)
- **Secondary**: `#EC4899` (Hot Pink)
- **Accent**: `#06B6D4` (Cyan)
- **Background**: `#0f172a` (Dark Navy)
- **Cards**: `#1e293b` (Slate)
- **Text**: `#f1f5f9` (Light Slate)

### Components
All UI components are reusable and well-documented:
- Button (variants: primary, secondary, ghost, outline)
- Card (flexible, hover-enabled)
- Input (with icons & validation)
- Badge (multiple variations)
- Modal
- Notification

## 📂 Project Structure

```
src/
├── components/          # Reusable React components
│   ├── ai/             # AI chatbot components
│   ├── common/         # Base UI components
│   ├── dashboard/      # Portfolio & overview components
│   ├── gamification/   # Badges, quizzes, leaderboards
│   └── stocks/         # Stock search and details
├── pages/              # Page components (auth, etc.)
├── stores/             # Zustand state management
├── services/           # Firebase & API services
├── hooks/              # Custom React hooks
├── utils/              # Helper functions & constants
├── styles/             # CSS and Tailwind
├── App.jsx             # Main app component
└── main.jsx            # Entry point
```

## 🎮 Mock Data

The app comes with mock data for:
- 8 popular Indian stocks (RELIANCE, TCS, INFOSYS, HDFC, etc.)
- Learning quizzes with beginner-friendly explanations
- Mock portfolio data for testing

To use real stock data, replace the mock API calls in `services/` with your actual API.

## 🔧 Configuration

### Tailwind CSS
Customized with:
- Gen Z color palette
- Custom animations (fade-in, slide-up, pulse)
- Dark mode utilities
- Custom components (btn-primary, card, etc.)

### Zustand Stores
- **authStore** - User authentication
- **portfolioStore** - Stocks and balance
- **gamificationStore** - Badges, levels, points
- **stockStore** - Stock data and watchlist
- **uiStore** - Modals, notifications

## 🚀 Deployment

### Deploy to Vercel (Recommended for React)
```bash
npm run build
npx vercel
```

### Deploy to Netlify
```bash
npm run build
# Upload the 'dist' folder to Netlify
```

### Deploy to Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

## 📚 Learning Resources

### For Understanding the Code
- [React Documentation](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Zustand Guide](https://github.com/pmndrs/zustand)
- [Framer Motion](https://www.framer.com/motion/)
- [Firebase Docs](https://firebase.google.com/docs)

### Stock Market Learning
- Use our built-in quizzes
- Read beginner tips in AI Guide
- Check stock explanations for each stock

## 🎯 Future Enhancements

- [ ] Real stock price API integration (use Polygon.io, IEX Cloud)
- [ ] Real money trading (with payment gateway)
- [ ] Social features (share portfolio, follow users)
- [ ] Push notifications
- [ ] Data export (PDF portfolio report)
- [ ] Advanced analytics and ML-based predictions
- [ ] Community forum
- [ ] Premium features

## ⚠️ Important Notes

- **Virtual Money Only**: Currently uses mock data and virtual money. No real trades.
- **Educational Purpose**: This is an educational app. Stock suggestions are for learning only.
- **Not Financial Advice**: Always consult with real financial advisors before investing real money.
- **Markets Closed**: Mock stock prices don't reflect real market conditions.

## 🤝 Contributing

Feel free to fork and contribute! Here's how:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 💬 Support

Have questions? Check these:
- 📖 Read the README first
- 🤖 Ask in the AI Guide (in-app)
- 📧 Create an issue on GitHub
- 💬 Start a discussion

## 🎉 Fun Facts

- Built with ❤️ for Gen Z investors
- 100% beginner-friendly
- Dark mode by default (because we respect sleep 😴)
- Mobile-first design (because everyone uses phones 📱)
- Gamified because learning should be fun! 🎮

---

**Made with 🚀 for Gen Z | Investing Made Simple**

Start your journey at **[zenvest.app](https://zenvest.app)**

Follow us: [@ZenvestApp](https://twitter.com/zenvestapp)
