import { create } from 'zustand';

/**
 * Auth Store - Manages user authentication state
 */
export const useAuthStore = create((set) => ({
  user: null,
  isLoading: true,
  error: null,

  // Set authenticated user
  setUser: (user) => set({ user }),

  // Update loading state
  setLoading: (isLoading) => set({ isLoading }),

  // Set error
  setError: (error) => set({ error }),

  // Clear error
  clearError: () => set({ error: null }),

  // Logout
  logout: () => set({ user: null, error: null }),
}));

/**
 * Portfolio Store - Manages user portfolio and balance
 */
export const usePortfolioStore = create((set, get) => ({
  portfolio: {
    totalBalance: 10000, // Starting virtual money
    investedAmount: 0,
    cashBalance: 10000,
    dailyGain: 0,
    dailyGainPercent: 0,
    stocks: [],
  },

  // Update balance
  setBalance: (totalBalance) => set((state) => ({
    portfolio: {
      ...state.portfolio,
      totalBalance,
      cashBalance: totalBalance - state.portfolio.investedAmount,
    },
  })),

  // Add stock to portfolio
  buyStock: (stock, quantity, price) => set((state) => {
    const cost = quantity * price;
    return {
      portfolio: {
        ...state.portfolio,
        stocks: [
          ...state.portfolio.stocks,
          { ...stock, quantity, purchasePrice: price, id: stock.symbol },
        ],
        investedAmount: state.portfolio.investedAmount + cost,
        cashBalance: state.portfolio.cashBalance - cost,
      },
    };
  }),

  // Remove stock from portfolio
  sellStock: (stockId, quantity, price) => set((state) => {
    const proceeds = quantity * price;
    const stockIndex = state.portfolio.stocks.findIndex((s) => s.id === stockId);

    if (stockIndex === -1) return state;

    const stock = state.portfolio.stocks[stockIndex];
    const newQuantity = stock.quantity - quantity;

    let updatedStocks = [...state.portfolio.stocks];
    if (newQuantity > 0) {
      updatedStocks[stockIndex] = { ...stock, quantity: newQuantity };
    } else {
      updatedStocks = updatedStocks.filter((_, i) => i !== stockIndex);
    }

    return {
      portfolio: {
        ...state.portfolio,
        stocks: updatedStocks,
        investedAmount: state.portfolio.investedAmount - (stock.purchasePrice * quantity),
        cashBalance: state.portfolio.cashBalance + proceeds,
      },
    };
  }),

  // Update daily gains
  setDailyGain: (gain, percent) => set((state) => ({
    portfolio: { ...state.portfolio, dailyGain: gain, dailyGainPercent: percent },
  })),
}));

/**
 * Gamification Store - Manages badges, levels, and points
 */
export const useGamificationStore = create((set) => ({
  user: {
    level: 1,
    points: 0,
    totalPoints: 0,
    badges: [],
    streaks: {
      dailyLogin: 0,
      trades: 0,
      learning: 0,
    },
  },

  // Add points
  addPoints: (points) => set((state) => ({
    user: {
      ...state.user,
      points: state.user.points + points,
      totalPoints: state.user.totalPoints + points,
    },
  })),

  // Add badge
  addBadge: (badge) => set((state) => ({
    user: {
      ...state.user,
      badges: [...state.user.badges, badge],
    },
  })),

  // Update level
  setLevel: (level) => set((state) => ({
    user: { ...state.user, level },
  })),

  // Update streak
  updateStreak: (type) => set((state) => ({
    user: {
      ...state.user,
      streaks: { ...state.user.streaks, [type]: state.user.streaks[type] + 1 },
    },
  })),

  // Reset points
  resetPoints: () => set((state) => ({
    user: { ...state.user, points: 0 },
  })),
}));

/**
 * Stock Store - Manages stock data and watchlist
 */
export const useStockStore = create((set) => ({
  stocks: [],
  watchlist: [],
  selectedStock: null,
  searchTerm: '',

  // Set all stocks
  setStocks: (stocks) => set({ stocks }),

  // Add to watchlist
  addToWatchlist: (stock) => set((state) => ({
    watchlist: [...state.watchlist, stock],
  })),

  // Remove from watchlist
  removeFromWatchlist: (stockId) => set((state) => ({
    watchlist: state.watchlist.filter((s) => s.id !== stockId),
  })),

  // Select stock for details view
  selectStock: (stock) => set({ selectedStock: stock }),

  // Set search term
  setSearchTerm: (term) => set({ searchTerm: term }),
}));

/**
 * UI Store - Manages UI state (modals, notifications, etc.)
 */
export const useUIStore = create((set) => ({
  notifications: [],
  modals: {
    buyStock: false,
    sellStock: false,
    settings: false,
  },

  // Add notification
  addNotification: (notification) => set((state) => ({
    notifications: [...state.notifications, { ...notification, id: Date.now() }],
  })),

  // Remove notification
  removeNotification: (id) => set((state) => ({
    notifications: state.notifications.filter((n) => n.id !== id),
  })),

  // Toggle modal
  toggleModal: (modalName) => set((state) => ({
    modals: { ...state.modals, [modalName]: !state.modals[modalName] },
  })),

  // Close modal
  closeModal: (modalName) => set((state) => ({
    modals: { ...state.modals, [modalName]: false },
  })),
}));
