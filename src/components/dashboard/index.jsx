import React, { useState } from 'react';
import { usePortfolioStore, useGamificationStore, useStockStore } from '../../stores';
import { Card, Badge, Button } from '../common';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { generateChartData, formatCurrency } from '../../utils/constants';
import { motion } from 'framer-motion';

/**
 * Portfolio Overview Card - Shows total balance and daily gains
 */
export const PortfolioOverview = () => {
  const { portfolio } = usePortfolioStore();
  const chartData = generateChartData(30);

  const isPositive = portfolio.dailyGain >= 0;

  return (
    <Card className="md:col-span-2 overflow-hidden">
      <div className="mb-6">
        <p className="text-text-secondary text-sm mb-2">Total Balance</p>
        <h1 className="text-4xl md:text-5xl font-bold text-text mb-2">
          {formatCurrency(portfolio.totalBalance)}
        </h1>
        <div className="flex items-center gap-4">
          <Badge variant={isPositive ? 'success' : 'error'}>
            {isPositive ? '+' : ''}{formatCurrency(portfolio.dailyGain)} ({portfolio.dailyGainPercent.toFixed(2)}%)
          </Badge>
          <span className="text-text-secondary text-sm">Today's change</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="date" stroke="#cbd5e1" />
          <YAxis stroke="#cbd5e1" />
          <Tooltip
            contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
            labelStyle={{ color: '#f1f5f9' }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={isPositive ? '#10b981' : '#ef4444'}
            strokeWidth={2}
            dot={false}
            isAnimationActive={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

/**
 * Portfolio Breakdown Card - Shows distribution of investments
 */
export const PortfolioBreakdown = () => {
  const { portfolio } = usePortfolioStore();

  const breakdownData = [
    { name: 'Invested', value: portfolio.investedAmount },
    { name: 'Cash', value: portfolio.cashBalance },
  ];

  return (
    <Card>
      <h3 className="text-lg font-bold text-text mb-4 flex items-center gap-2">
        <span>💼</span> Breakdown
      </h3>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={breakdownData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="name" stroke="#cbd5e1" />
          <YAxis stroke="#cbd5e1" />
          <Tooltip
            contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
            labelStyle={{ color: '#f1f5f9' }}
          />
          <Bar dataKey="value" fill="#8B5CF6" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-text-secondary">Invested</span>
          <span className="text-text font-medium">{formatCurrency(portfolio.investedAmount)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-text-secondary">Available Cash</span>
          <span className="text-text font-medium">{formatCurrency(portfolio.cashBalance)}</span>
        </div>
      </div>
    </Card>
  );
};

/**
 * Quick Stats Cards
 */
export const QuickStats = () => {
  const { portfolio } = usePortfolioStore();
  const { user } = useGamificationStore();

  const stats = [
    {
      label: 'Total Returns',
      value: `${((portfolio.totalBalance - 10000) / 10000 * 100).toFixed(1)}%`,
      icon: '📊',
      color: 'from-purple-500 to-primary',
    },
    {
      label: 'Holdings',
      value: portfolio.stocks.length,
      icon: '📈',
      color: 'from-pink-500 to-secondary',
    },
    {
      label: 'Your Level',
      value: `Level ${user.level}`,
      icon: '🎮',
      color: 'from-cyan-500 to-accent',
    },
    {
      label: 'Points Earned',
      value: user.totalPoints,
      icon: '⭐',
      color: 'from-yellow-500 to-orange-500',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <Card className={`bg-gradient-to-br ${stat.color} p-4 border-0 text-white`}>
            <div className="text-3xl mb-2">{stat.icon}</div>
            <p className="text-sm opacity-90">{stat.label}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

/**
 * Holdings List - Shows current stock holdings
 */
export const HoldingsList = ({ onBuyClick }) => {
  const { portfolio } = usePortfolioStore();
  const { selectStock } = useStockStore();

  if (portfolio.stocks.length === 0) {
    return (
      <Card>
        <div className="text-center py-8">
          <p className="text-4xl mb-3">📭</p>
          <p className="text-text-secondary mb-4">No holdings yet. Start investing!</p>
          <Button variant="primary" onClick={onBuyClick}>
            Explore Stocks
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <h3 className="text-lg font-bold text-text mb-4">Your Holdings</h3>
      <div className="space-y-3">
        {portfolio.stocks.map((stock) => (
          <motion.div
            key={stock.id}
            whileHover={{ x: 5 }}
            className="flex items-center justify-between p-3 bg-dark-hover rounded-lg cursor-pointer hover:border-primary border border-transparent transition-all"
            onClick={() => selectStock(stock)}
          >
            <div className="flex-1">
              <p className="font-medium text-text">{stock.symbol}</p>
              <p className="text-sm text-text-secondary">{stock.quantity} shares</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-text">{formatCurrency(stock.quantity * stock.price)}</p>
              <p className="text-sm text-text-secondary">
                {formatCurrency(stock.purchasePrice)} (buy)
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
};

/**
 * Watchlist Component - Shows stocks to watch
 */
export const WatchlistWidget = ({ stocks }) => {
  const { watchlist, addToWatchlist, removeFromWatchlist } = useStockStore();

  return (
    <Card>
      <h3 className="text-lg font-bold text-text mb-4 flex items-center gap-2">
        <span>👁️</span> Watchlist
      </h3>

      {watchlist.length === 0 ? (
        <p className="text-text-secondary text-sm text-center py-4">
          Add stocks from the market to your watchlist
        </p>
      ) : (
        <div className="space-y-2">
          {watchlist.slice(0, 5).map((stock) => (
            <div
              key={stock.id}
              className="flex items-center justify-between p-2 bg-dark-hover rounded-lg"
            >
              <div className="flex-1">
                <p className="font-medium text-text text-sm">{stock.symbol}</p>
              </div>
              <div className="text-right mr-3">
                <p className="text-text font-medium text-sm">
                  {formatCurrency(stock.price)}
                </p>
                <p className={`text-xs ${stock.changePercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                </p>
              </div>
              <button
                onClick={() => removeFromWatchlist(stock.id)}
                className="text-text-secondary hover:text-secondary"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};
