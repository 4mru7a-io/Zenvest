import React, { useState, useEffect } from 'react';
import { useAuthStore, usePortfolioStore, useStockStore, useUIStore, useGamificationStore } from './stores';
import { LoginPage } from './pages/Auth';
import { PortfolioOverview, PortfolioBreakdown, QuickStats, HoldingsList, WatchlistWidget } from './components/dashboard';
import { StockSearch, StockDetail, BuyStockModal } from './components/stocks';
import { LearningQuiz, BadgesDisplay, LevelProgress, DailyStreaks, Leaderboard } from './components/gamification';
import { AIAssistant, AIRecommendations } from './components/ai';
import { Card, Button, Notification, Badge, ThemeCustomizer } from './components/common';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_STOCKS } from './utils/constants';
import './styles/index.css';

/**
 * Navigation Component
 */
const Navigation = ({ currentPage, onNavigate, user }) => {
  const navItems = [
    { id: 'home', label: '🏠 Home', icon: '🏦' },
    { id: 'stocks', label: '📊 Explore', icon: '🔍' },
    { id: 'learn', label: '🎮 Learn', icon: '🧠' },
    { id: 'ai', label: '🤖 AI Guide', icon: '💬' },
    { id: 'profile', label: '👤 Profile', icon: '⚙️' },
  ];

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 md:top-0 left-0 right-0 md:w-64 md:h-screen bg-card border-t md:border-r border-dark-border z-40"
    >
      <div className="hidden md:flex flex-col h-full">
        {/* Logo */}
        <div className="p-6 border-b border-dark-border">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent flex items-center gap-2">
            <span>🚀</span> Zenvest
          </h1>
          <p className="text-xs text-text-secondary mt-1">{user?.displayName || 'Investor'}</p>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                currentPage === item.id
                  ? 'bg-primary text-white'
                  : 'text-text-secondary hover:bg-dark-hover hover:text-text'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-dark-border">
          <Button variant="secondary" className="w-full" onClick={() => onNavigate('logout')}>
            🚪 Logout
          </Button>
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden flex justify-around items-center h-full px-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded transition-all ${
              currentPage === item.id ? 'text-primary' : 'text-text-secondary'
            }`}
            title={item.label}
          >
            <span className="text-2xl">{item.icon}</span>
          </button>
        ))}
        <button
          onClick={() => onNavigate('logout')}
          className="flex flex-col items-center gap-1 px-3 py-2 rounded transition-all text-text-secondary hover:text-secondary"
          title="Logout"
        >
          <span className="text-2xl">🚪</span>
        </button>
      </div>
    </motion.nav>
  );
};

/**
 * Home Dashboard Page
 */
const HomePage = ({ onBuyClick }) => {
  const [showNotification, setShowNotification] = useState(null);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="p-6 bg-gradient-to-r from-primary to-secondary rounded-lg text-white">
          <h1 className="text-3xl font-bold mb-2">Welcome, Investor! 👋</h1>
          <p className="opacity-90">Your wealth-building journey starts here. Keep learning, keep investing, keep growing!</p>
        </div>
      </motion.div>

      {/* Main Stats */}
      <QuickStats />

      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <PortfolioOverview />
        <PortfolioBreakdown />
      </div>

      {/* Holdings & Watchlist */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <HoldingsList onBuyClick={onBuyClick} />
        <WatchlistWidget stocks={MOCK_STOCKS} />
      </div>

      {/* AI Recommendations */}
      <AIRecommendations stocks={MOCK_STOCKS} />
    </div>
  );
};

/**
 * Explore Stocks Page
 */
const StocksPage = ({ onBuyClick, onSelectStock }) => {
  const [selectedStock, setSelectedStock] = useState(null);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-3xl font-bold text-text mb-2">📊 Explore Stocks</h1>
        <p className="text-text-secondary">Find and research Indian stocks for your portfolio</p>
      </motion.div>

      <StockSearch />

      <AnimatePresence>
        {selectedStock && (
          <StockDetail
            stock={selectedStock}
            onClose={() => setSelectedStock(null)}
            onBuyClick={() => {
              onSelectStock(selectedStock);
              setSelectedStock(null);
              onBuyClick();
            }}
            onSellClick={() => setSelectedStock(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

/**
 * Learning Page
 */
const LearningPage = () => {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-3xl font-bold text-text mb-2">🎮 Level Up Your Knowledge</h1>
        <p className="text-text-secondary">Learn investing basics, earn badges, and climb the leaderboard</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <LevelProgress />
          <DailyStreaks />
        </div>
        <div className="space-y-6">
          <BadgesDisplay />
          <Leaderboard />
        </div>
      </div>

      <LearningQuiz />
    </div>
  );
};

/**
 * AI Guide Page
 */
const AIPage = () => {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-3xl font-bold text-text mb-2">🤖 AI Investment Guide</h1>
        <p className="text-text-secondary">Ask anything about investing in simple language</p>
      </motion.div>

      <AIAssistant />
    </div>
  );
};

/**
 * Profile Page
 */
const ProfilePage = ({ user }) => {
  const { portfolio } = usePortfolioStore();
  const { user: gamUser } = useGamificationStore();

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Card className="text-center p-8">
          <div className="text-6xl mb-4 inline-block">👤</div>
          <h1 className="text-3xl font-bold text-text mb-2">{user?.displayName}</h1>
          <p className="text-text-secondary mb-4">{user?.email}</p>
          <Badge variant="primary">Level {gamUser.level} Investor</Badge>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <h3 className="text-lg font-bold text-text mb-4">Portfolio Stats</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-text-secondary">Total Balance</span>
              <span className="font-bold text-text">₹{portfolio.totalBalance.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Cash Available</span>
              <span className="font-bold text-text">₹{portfolio.cashBalance.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Invested Amount</span>
              <span className="font-bold text-text">₹{portfolio.investedAmount.toLocaleString()}</span>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-bold text-text mb-4">Gaming Stats</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-text-secondary">Current Level</span>
              <span className="font-bold text-text">{gamUser.level}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Total Points</span>
              <span className="font-bold text-text">{gamUser.totalPoints.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Badges Unlocked</span>
              <span className="font-bold text-text">{gamUser.badges.length}/6</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

/**
 * Main App Component
 */
export default function App() {
  const { user, isLoading } = useAuthStore();
  const [currentPage, setCurrentPage] = useState('home');
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const { notifications, removeNotification } = useUIStore();
  const { addPoints } = useGamificationStore();
  const [currentTheme, setCurrentTheme] = useState(() => {
    const saved = localStorage.getItem('zenvest-theme');
    return saved ? JSON.parse(saved) : { name: 'Zenvest', colors: {
      primary: '#8B5CF6',
      secondary: '#EC4899',
      accent: '#06B6D4',
      background: '#0f172a',
      card: '#1e293b',
    }};
  });

  // Save theme to localStorage
  useEffect(() => {
    localStorage.setItem('zenvest-theme', JSON.stringify(currentTheme));
  }, [currentTheme]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🚀</div>
          <p className="text-text-secondary">Loading Zenvest...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage onSuccess={() => {}} />;
  }

  const handleBuyStock = (quantity) => {
    if (selectedStock) {
      const { buyStock } = usePortfolioStore.getState();
      buyStock(selectedStock, quantity, selectedStock.price);
      addPoints(100);
      setShowBuyModal(false);
      setSelectedStock(null);

      // Show notification
      const { addNotification } = useUIStore.getState();
      addNotification({
        message: `✓ Bought ${quantity} shares of ${selectedStock.symbol}!`,
        type: 'success',
      });
    }
  };

  const handleLogout = () => {
    const { logout } = useAuthStore.getState();
    logout();
    window.location.reload();
  };

  if (currentPage === 'logout') {
    handleLogout();
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation
        currentPage={currentPage}
        onNavigate={(page) => {
          if (page === 'logout') handleLogout();
          else setCurrentPage(page);
        }}
        user={user}
      />

      {/* Main Content */}
      <main className="md:ml-64 mb-20 md:mb-0">
        <div className="container-responsive py-6 md:py-8 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {currentPage === 'home' && (
                <HomePage onBuyClick={() => setShowBuyModal(true)} />
              )}
              {currentPage === 'stocks' && (
                <StocksPage
                  onBuyClick={() => setShowBuyModal(true)}
                  onSelectStock={setSelectedStock}
                />
              )}
              {currentPage === 'learn' && <LearningPage />}
              {currentPage === 'ai' && <AIPage />}
              {currentPage === 'profile' && <ProfilePage user={user} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Buy Stock Modal */}
      <AnimatePresence>
        {showBuyModal && selectedStock && (
          <BuyStockModal
            stock={selectedStock}
            onClose={() => {
              setShowBuyModal(false);
              setSelectedStock(null);
            }}
            onConfirm={handleBuyStock}
          />
        )}
      </AnimatePresence>

      {/* Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
        <AnimatePresence>
          {notifications.map((notif) => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
            >
              <Notification
                message={notif.message}
                type={notif.type}
                onClose={() => removeNotification(notif.id)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Theme Customizer */}
      <ThemeCustomizer currentTheme={currentTheme} onThemeChange={setCurrentTheme} />
    </div>
  );
}
