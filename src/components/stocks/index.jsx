import React, { useState } from 'react';
import { Card, Button, Input, Badge } from '../common';
import { useStockStore, usePortfolioStore, useUIStore } from '../../stores';
import { MOCK_STOCKS, formatCurrency } from '../../utils/constants';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

/**
 * Stock Search and Filter Component
 */
export const StockSearch = () => {
  const { searchTerm, setSearchTerm, stocks, setStocks } = useStockStore();
  const [sortBy, setSortBy] = useState('change');

  React.useEffect(() => {
    setStocks(MOCK_STOCKS);
  }, []);

  const filteredStocks = stocks.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedStocks = [...filteredStocks].sort((a, b) => {
    switch (sortBy) {
      case 'change':
        return b.changePercent - a.changePercent;
      case 'price':
        return b.price - a.price;
      case 'volume':
        return parseInt(b.volume) - parseInt(a.volume);
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search stocks (e.g. RELIANCE, TCS)"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        icon={(props) => (
          <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        )}
      />

      <div className="flex gap-2 overflow-x-auto pb-2">
        {['change', 'price', 'volume'].map((option) => (
          <button
            key={option}
            onClick={() => setSortBy(option)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
              sortBy === option
                ? 'bg-primary text-white'
                : 'bg-dark-hover text-text-secondary hover:text-text'
            }`}
          >
            {option === 'change' && '📊 Trending'}
            {option === 'price' && '💰 Price'}
            {option === 'volume' && '📈 Volume'}
          </button>
        ))}
      </div>

      <StockList stocks={sortedStocks} />
    </div>
  );
};

/**
 * Stock List Component
 */
export const StockList = ({ stocks }) => {
  const { selectStock } = useStockStore();
  const { watchlist, addToWatchlist, removeFromWatchlist } = useStockStore();

  return (
    <div className="space-y-2">
      {stocks.map((stock) => {
        const isWatched = watchlist.some(s => s.id === stock.id);
        return (
          <motion.div
            key={stock.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card
              hover
              className="flex items-center justify-between p-4 cursor-pointer"
              onClick={() => selectStock(stock)}
            >
              <div className="flex-1">
                <h4 className="font-bold text-text">{stock.symbol}</h4>
                <p className="text-sm text-text-secondary">{stock.name}</p>
              </div>

              <div className="text-right mr-4">
                <p className="font-bold text-text">{formatCurrency(stock.price)}</p>
                <p className={`text-sm font-medium ${stock.changePercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {stock.changePercent >= 0 ? '↑' : '↓'} {Math.abs(stock.changePercent).toFixed(2)}%
                </p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (isWatched) {
                    removeFromWatchlist(stock.id);
                  } else {
                    addToWatchlist(stock);
                  }
                }}
                className={`p-2 rounded-lg transition-all ${
                  isWatched
                    ? 'bg-secondary text-white'
                    : 'bg-dark-hover text-text-secondary hover:text-text'
                }`}
              >
                {isWatched ? '👁️' : '🔍'}
              </button>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};

/**
 * Stock Detail Page Component
 */
export const StockDetail = ({ stock, onBuyClick, onSellClick, onClose }) => {
  const { watchlist, addToWatchlist, removeFromWatchlist } = useStockStore();
  const isWatched = watchlist.some(s => s.id === stock.id);

  // Generate mock chart data for the stock
  const chartData = Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (30 - i) * 86400000).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
    price: stock.price + (Math.random() - 0.5) * 200,
  }));

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end md:items-center justify-center p-4"
    >
      <Card className="w-full max-h-[90vh] md:max-w-2xl overflow-y-auto">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-text">{stock.symbol}</h1>
            <p className="text-text-secondary">{stock.name}</p>
          </div>
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-text text-2xl"
          >
            ✕
          </button>
        </div>

        <div className="mb-6">
          <div className="flex items-baseline gap-4 mb-2">
            <span className="text-4xl font-bold text-text">{formatCurrency(stock.price)}</span>
            <Badge variant={stock.changePercent >= 0 ? 'success' : 'error'}>
              {stock.changePercent >= 0 ? '↑' : '↓'} {Math.abs(stock.changePercent).toFixed(2)}%
            </Badge>
          </div>
          <p className="text-text-secondary text-sm">
            {stock.changePercent >= 0 ? '+' : ''}{formatCurrency(stock.change)} today
          </p>
        </div>

        {/* Chart */}
        <div className="mb-6 bg-dark-hover p-4 rounded-lg">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="date" stroke="#cbd5e1" />
              <YAxis stroke="#cbd5e1" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                labelStyle={{ color: '#f1f5f9' }}
              />
              <Line type="monotone" dataKey="price" stroke="#8B5CF6" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-dark-hover p-3 rounded-lg">
            <p className="text-text-secondary text-sm mb-1">Market Cap</p>
            <p className="text-text font-bold">{stock.marketCap}</p>
          </div>
          <div className="bg-dark-hover p-3 rounded-lg">
            <p className="text-text-secondary text-sm mb-1">Volume</p>
            <p className="text-text font-bold">{stock.volume}</p>
          </div>
          <div className="bg-dark-hover p-3 rounded-lg">
            <p className="text-text-secondary text-sm mb-1">Risk Level</p>
            <Badge variant={stock.risk === 'Low' ? 'success' : stock.risk === 'Medium' ? 'warning' : 'error'} size="sm">
              {stock.risk}
            </Badge>
          </div>
          <div className="bg-dark-hover p-3 rounded-lg">
            <p className="text-text-secondary text-sm mb-1">Status</p>
            <p className="text-text font-bold text-green-400">Active</p>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h3 className="font-bold text-text mb-2">About</h3>
          <p className="text-text-secondary text-sm leading-relaxed">{stock.about}</p>
        </div>

        {/* Beginner Explanation */}
        <div className="mb-6 bg-gradient-to-r from-primary to-secondary p-4 rounded-lg">
          <p className="text-white text-sm">
            <span className="font-bold">💡 Beginner's Tip:</span> {stock.beginner_explanation}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            variant="primary"
            className="flex-1"
            onClick={onBuyClick}
          >
            🛒 Buy Stock
          </Button>
          <Button
            variant="secondary"
            className="flex-1"
            onClick={onSellClick}
          >
            💸 Sell Stock
          </Button>
          <Button
            variant={isWatched ? 'secondary' : 'ghost'}
            onClick={() => {
              if (isWatched) {
                removeFromWatchlist(stock.id);
              } else {
                addToWatchlist(stock);
              }
            }}
          >
            {isWatched ? '👁️' : '🔍'}
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

/**
 * Buy Stock Modal
 */
export const BuyStockModal = ({ stock, onClose, onConfirm }) => {
  const [quantity, setQuantity] = useState(1);
  const { portfolio } = usePortfolioStore();

  const cost = quantity * stock.price;
  const canAfford = cost <= portfolio.cashBalance;

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
    >
      <Card className="w-full max-w-sm">
        <h2 className="text-2xl font-bold text-text mb-4 flex items-center gap-2">
          <span>🛒</span> Buy {stock.symbol}
        </h2>

        <div className="bg-dark-hover p-4 rounded-lg mb-6">
          <p className="text-text-secondary text-sm mb-2">Price per Share</p>
          <p className="text-2xl font-bold text-text">{formatCurrency(stock.price)}</p>
        </div>

        <div className="mb-6">
          <label className="block text-text mb-2 font-medium">Quantity</label>
          <div className="flex gap-2">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-4 py-2 bg-dark-hover rounded-lg text-text hover:bg-dark-border"
            >
              −
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="flex-1 px-4 py-2 bg-dark-hover rounded-lg text-text text-center"
            />
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-4 py-2 bg-dark-hover rounded-lg text-text hover:bg-dark-border"
            >
              +
            </button>
          </div>
        </div>

        <div className="space-y-2 mb-6 bg-dark-hover p-4 rounded-lg">
          <div className="flex justify-between text-text-secondary text-sm">
            <span>Total Cost</span>
            <span className="text-text font-bold">{formatCurrency(cost)}</span>
          </div>
          <div className="flex justify-between text-text-secondary text-sm">
            <span>Available Cash</span>
            <span className={`font-bold ${canAfford ? 'text-green-400' : 'text-red-400'}`}>
              {formatCurrency(portfolio.cashBalance)}
            </span>
          </div>
          {!canAfford && (
            <p className="text-red-400 text-sm mt-2">❌ Insufficient balance</p>
          )}
        </div>

        <div className="flex gap-3">
          <Button variant="ghost" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            className="flex-1"
            disabled={!canAfford}
            onClick={() => onConfirm(quantity)}
          >
            Confirm Buy
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};
