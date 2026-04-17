import axios from 'axios';
import { MOCK_STOCKS } from '../utils/constants';

/**
 * Real Stock Market API Integration
 * Supports: Alpha Vantage, Polygon.io, IEX Cloud, Finnhub
 */

const API_CONFIG = {
  alphaVantage: {
    baseURL: 'https://www.alphavantage.co/query',
    apiKey: import.meta.env.VITE_ALPHA_VANTAGE_KEY,
  },
  finnhub: {
    baseURL: 'https://finnhub.io/api/v1',
    apiKey: import.meta.env.VITE_FINNHUB_API_KEY,
  },
  polygon: {
    baseURL: 'https://api.polygon.io',
    apiKey: import.meta.env.VITE_POLYGON_API_KEY,
  },
  iex: {
    baseURL: 'https://cloud.iexapis.com/stable',
    apiKey: import.meta.env.VITE_IEX_API_KEY,
  },
};

// Use Alpha Vantage for free tier (no key required for demo, but supports real key)
const selectedAPI = 'alphaVantage';

/**
 * Fetch real stock data using Alpha Vantage API
 */
export const fetchStockDataAlphaVantage = async (symbol) => {
  try {
    const apiKey = API_CONFIG.alphaVantage.apiKey || 'demo';
    const response = await axios.get(API_CONFIG.alphaVantage.baseURL, {
      params: {
        function: 'GLOBAL_QUOTE',
        symbol: symbol,
        apikey: apiKey,
      },
      timeout: 10000,
    });

    const quote = response.data['Global Quote'];
    if (!quote || !quote['05. price']) {
      // Return mock data as fallback
      return getMockStockData(symbol);
    }

    return {
      symbol: quote['01. symbol'],
      price: parseFloat(quote['05. price']),
      change: parseFloat(quote['09. change']),
      changePercent: parseFloat(quote['10. change percent'].replace('%', '')),
      volume: quote['06. volume'],
      timestamp: quote['07. latest trading day'],
    };
  } catch (error) {
    console.error('Alpha Vantage API Error:', error);
    return getMockStockData(symbol);
  }
};

/**
 * Fetch stock data using Polygon.io API (more reliable for real trading)
 */
export const fetchStockDataPolygon = async (symbol) => {
  try {
    const apiKey = API_CONFIG.polygon.apiKey;
    if (!apiKey) {
      console.warn('Polygon API key not configured');
      return getMockStockData(symbol);
    }

    const response = await axios.get(
      `${API_CONFIG.polygon.baseURL}/v2/snapshot/locale/us/markets/stocks/tickers/${symbol}`,
      {
        params: { apiKey },
        timeout: 10000,
      }
    );

    const data = response.data.results;
    if (!data || !data.last) {
      return getMockStockData(symbol);
    }

    return {
      symbol: symbol,
      price: data.last.price,
      change: data.last.price - data.prevDay.c,
      changePercent: ((data.last.price - data.prevDay.c) / data.prevDay.c * 100).toFixed(2),
      volume: data.last.size,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Polygon API Error:', error);
    return getMockStockData(symbol);
  }
};

/**
 * Fetch stock data using IEX Cloud API
 */
export const fetchStockDataIEX = async (symbol) => {
  try {
    const apiKey = API_CONFIG.iex.apiKey;
    if (!apiKey) {
      console.warn('IEX API key not configured');
      return getMockStockData(symbol);
    }

    const response = await axios.get(
      `${API_CONFIG.iex.baseURL}/stock/${symbol}/quote`,
      {
        params: { token: apiKey },
        timeout: 10000,
      }
    );

    const data = response.data;
    return {
      symbol: data.symbol,
      price: data.latestPrice,
      change: data.change,
      changePercent: data.changePercent,
      volume: data.latestVolume,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error('IEX API Error:', error);
    return getMockStockData(symbol);
  }
};

/**
 * Fetch stock data using Finnhub API
 */
export const fetchStockDataFinnhub = async (symbol) => {
  try {
    const apiKey = API_CONFIG.finnhub.apiKey;
    if (!apiKey) {
      console.warn('Finnhub API key not configured');
      return getMockStockData(symbol);
    }

    const response = await axios.get(`${API_CONFIG.finnhub.baseURL}/quote`, {
      params: {
        symbol: symbol,
        token: apiKey,
      },
      timeout: 10000,
    });

    const data = response.data;
    return {
      symbol: symbol,
      price: data.c,
      change: data.d,
      changePercent: data.dp,
      volume: 0, // Finnhub quote doesn't include volume
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Finnhub API Error:', error);
    return getMockStockData(symbol);
  }
};

/**
 * Get mock data as fallback
 */
export const getMockStockData = (symbol) => {
  const mockStock = MOCK_STOCKS.find(s => s.symbol === symbol);
  if (mockStock) {
    return {
      symbol: mockStock.symbol,
      price: mockStock.price + (Math.random() - 0.5) * 10,
      change: mockStock.change,
      changePercent: mockStock.changePercent,
      volume: mockStock.volume,
      timestamp: new Date().toISOString(),
    };
  }
  return null;
};

/**
 * Main function to fetch stock data with fallback
 * Tries real API first, falls back to mock data
 */
export const fetchStockData = async (symbol, apiProvider = 'alphaVantage') => {
  switch (apiProvider) {
    case 'polygon':
      return fetchStockDataPolygon(symbol);
    case 'iex':
      return fetchStockDataIEX(symbol);
    case 'finnhub':
      return fetchStockDataFinnhub(symbol);
    case 'alphaVantage':
    default:
      return fetchStockDataAlphaVantage(symbol);
  }
};

/**
 * Fetch historical data for charts
 */
export const fetchHistoricalData = async (symbol, days = 30) => {
  try {
    // Using Alpha Vantage TIME_SERIES_DAILY
    const apiKey = API_CONFIG.alphaVantage.apiKey || 'demo';
    const response = await axios.get(API_CONFIG.alphaVantage.baseURL, {
      params: {
        function: 'TIME_SERIES_DAILY',
        symbol: symbol,
        apikey: apiKey,
      },
      timeout: 10000,
    });

    const timeSeries = response.data['Time Series (Daily)'];
    if (!timeSeries) {
      return generateMockHistoricalData(symbol, days);
    }

    const data = Object.entries(timeSeries)
      .slice(0, days)
      .reverse()
      .map(([date, values]) => ({
        date: new Date(date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
        price: parseFloat(values['4. close']),
        open: parseFloat(values['1. open']),
        high: parseFloat(values['2. high']),
        low: parseFloat(values['3. low']),
      }));

    return data;
  } catch (error) {
    console.error('Historical data fetch error:', error);
    return generateMockHistoricalData(symbol, days);
  }
};

/**
 * Generate mock historical data as fallback
 */
export const generateMockHistoricalData = (symbol, days = 30) => {
  let price = 1000 + Math.random() * 5000;
  const data = [];

  for (let i = days; i > 0; i--) {
    const change = (Math.random() - 0.45) * 100;
    price += change;
    const date = new Date();
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
      price: Math.round(price),
      open: Math.round(price - Math.random() * 50),
      high: Math.round(price + Math.random() * 50),
      low: Math.round(price - Math.random() * 50),
    });
  }

  return data;
};

/**
 * Batch fetch multiple stocks
 */
export const fetchMultipleStocks = async (symbols) => {
  const promises = symbols.map(symbol => fetchStockData(symbol));
  return Promise.all(promises);
};

/**
 * Real-time price update (polling)
 */
export let priceUpdateInterval = null;

export const startPriceUpdates = (symbols, callback, interval = 10000) => {
  if (priceUpdateInterval) clearInterval(priceUpdateInterval);

  priceUpdateInterval = setInterval(async () => {
    const prices = await fetchMultipleStocks(symbols);
    callback(prices);
  }, interval);
};

export const stopPriceUpdates = () => {
  if (priceUpdateInterval) {
    clearInterval(priceUpdateInterval);
    priceUpdateInterval = null;
  }
};

/**
 * WebSocket for real-time updates (premium feature)
 * Currently not implemented - requires real API with WebSocket support
 */
export const initWebSocketUpdates = (symbols, callback) => {
  console.log('WebSocket updates would be implemented here with premium API');
  // This would be implemented with APIs like Finnhub or Polygon that support WebSockets
};
