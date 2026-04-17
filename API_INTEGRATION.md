# 📊 Real API Integration Guide

This guide explains how to integrate real stock market data into your Zenvest components.

---

## 🎯 Overview

Zenvest includes a sophisticated API service layer (`src/services/stocks.js`) that handles:
- ✅ Multiple API provider support (4 major providers)
- ✅ Automatic fallback to mock data if API fails
- ✅ Real-time price polling
- ✅ Historical data fetching for charts
- ✅ Batch stock lookups

---

## 🔑 Getting API Keys

### 1️⃣ Alpha Vantage (Free - Start Here)

**Best for:** Getting started, demo mode (no key needed!)

```
Website: https://www.alphavantage.co/
Free Tier: 5 requests/minute
Sign up: Enter email on homepage
API Key: Sent immediately
```

### 2️⃣ Polygon.io (Recommended for Production)

**Best for:** Production apps with real data

```
Website: https://polygon.io/
Free Tier: Limited, paid plans start at $35/month
Sign up: Create account → Get API key from dashboard
Documentation: https://polygon.io/docs/stocks
Features: Real-time data, excellent reliability
```

### 3️⃣ IEX Cloud (Reliable US Stocks)

**Best for:** US stock market focus

```
Website: https://iexcloud.io/
Free Tier: 100 messages/month
Sign up: Create account → Get token
Cost: $0.01 per message after free tier
Features: Reliable, fast API, good documentation
```

### 4️⃣ Finnhub (Real-time Quotes)

**Best for:** Real-time stock quotes and news

```
Website: https://finnhub.io/
Free Tier: Generous free tier
Sign up: Create account immediately
Cost: Free tier sufficient for most apps
Features: Real-time quotes, company news, earnings
```

---

## 🔧 Setting Up Environment Variables

### Local Development

Create `.env` file in project root:

```env
# Alpha Vantage (demo doesn't need key)
VITE_ALPHA_VANTAGE_KEY=demo

# Polygon.io
VITE_POLYGON_API_KEY=your_polygon_key

# IEX Cloud
VITE_IEX_API_KEY=your_iex_token

# Finnhub
VITE_FINNHUB_API_KEY=your_finnhub_key
```

### Production Deployment

#### Vercel
1. Go to Project Settings → Environment Variables
2. Add all 4 API keys
3. Vercel automatically uses them on deploy

#### Netlify
1. Go to Site Settings → Build & Deploy → Environment
2. Click "Edit variables"
3. Add all 4 API keys

#### Firebase Hosting
1. Create `.env.production` with production keys
2. Build: `npm run build`
3. Deploy: `firebase deploy`

#### Docker
```bash
docker run -p 3000:3000 \
  -e VITE_POLYGON_API_KEY=your_key \
  -e VITE_ALPHA_VANTAGE_KEY=your_key \
  zenvest:latest
```

---

## 📚 API Service Functions

All functions in `src/services/stocks.js`:

### Fetch Single Stock Data

```javascript
import { fetchStockData } from './services/stocks';

// Fetch current price for a stock
const data = await fetchStockData('AAPL', 'polygon');
// Returns: {
//   symbol: 'AAPL',
//   price: 150.25,
//   change: 2.50,
//   changePercent: 1.70,
//   volume: 5000000,
//   timestamp: '2024-01-15T15:30:00Z'
// }
```

### Fetch Historical Data

```javascript
import { fetchHistoricalData } from './services/stocks';

// Get 30-day price history
const history = await fetchHistoricalData('AAPL', 30);
// Returns: [{
//   date: '2024-01-15',
//   price: 150.25,
//   open: 149.00,
//   high: 151.50,
//   low: 148.75
// }, ...]
```

### Fetch Multiple Stocks

```javascript
import { fetchMultipleStocks } from './services/stocks';

// Get prices for multiple stocks at once
const stocks = await fetchMultipleStocks(['AAPL', 'GOOGL', 'MSFT']);
// Returns array of stock data
```

### Real-time Price Updates

```javascript
import { startPriceUpdates, stopPriceUpdates } from './services/stocks';

// Start polling for price updates every 10 seconds
startPriceUpdates(['AAPL', 'GOOGL'], (prices) => {
  console.log('Updated prices:', prices);
  // Update your store here
}, 10000);

// Stop polling when component unmounts
stopPriceUpdates();
```

---

## 🔌 Integration Examples

### Example 1: Integrate into Dashboard

**File:** `src/components/dashboard/index.jsx`

```javascript
import { useEffect, useState } from 'react';
import { fetchStockData, fetchHistoricalData } from '../../services/stocks';

export const PortfolioOverview = () => {
  const [prices, setPrices] = useState({});
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch current stock prices
        const aapl = await fetchStockData('AAPL', 'polygon');
        const googl = await fetchStockData('GOOGL', 'polygon');
        
        setPrices({ AAPL: aapl, GOOGL: googl });

        // Fetch historical data for chart
        const priceHistory = await fetchHistoricalData('AAPL', 30);
        setHistory(priceHistory);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading prices...</p>
      ) : (
        <div>
          <p>AAPL: ${prices.AAPL?.price}</p>
          <p>GOOGL: ${prices.GOOGL?.price}</p>
        </div>
      )}
    </div>
  );
};
```

### Example 2: Real-time Price Updates

**File:** `src/components/stocks/index.jsx`

```javascript
import { useEffect } from 'react';
import { startPriceUpdates, stopPriceUpdates } from '../../services/stocks';
import { useStockStore } from '../../stores';

export const StockDetail = ({ symbol }) => {
  const { stocks, updateStockPrice } = useStockStore();

  useEffect(() => {
    // Start real-time updates
    startPriceUpdates([symbol], (prices) => {
      prices.forEach((price) => {
        updateStockPrice(price.symbol, price.price, price.changePercent);
      });
    });

    // Cleanup on unmount
    return () => stopPriceUpdates();
  }, [symbol, updateStockPrice]);

  const stock = stocks.find(s => s.symbol === symbol);

  return (
    <div>
      <h2>{symbol}</h2>
      <p>Price: ${stock?.price}</p>
      <p>Change: {stock?.changePercent}%</p>
    </div>
  );
};
```

### Example 3: Search with Real Data

**File:** `src/components/stocks/index.jsx`

```javascript
import { useState } from 'react';
import { fetchStockData } from '../../services/stocks';

export const StockSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) return;
    
    setLoading(true);
    try {
      // Try to fetch real data
      const data = await fetchStockData(query.toUpperCase(), 'polygon');
      setResults([data]);
    } catch (error) {
      console.error('Search failed:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input 
        value={query} 
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search stocks..."
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </button>
      
      {results.map(stock => (
        <div key={stock.symbol}>
          <h3>{stock.symbol}</h3>
          <p>${stock.price}</p>
          <p style={{ color: stock.changePercent > 0 ? 'green' : 'red' }}>
            {stock.changePercent > 0 ? '+' : ''}{stock.changePercent}%
          </p>
        </div>
      ))}
    </div>
  );
};
```

---

## 🐛 Testing APIs Locally

### Test with cURL

```bash
# Test Alpha Vantage
curl "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=AAPL&apikey=demo"

# Test Polygon (replace YOUR_KEY)
curl "https://api.polygon.io/v2/aggs/ticker/AAPL/prev?apiKey=YOUR_KEY"

# Test IEX Cloud (replace YOUR_TOKEN)
curl "https://cloud.iexapis.com/stable/quote/AAPL?token=YOUR_TOKEN"

# Test Finnhub (replace YOUR_KEY)
curl "https://finnhub.io/api/v1/quote?symbol=AAPL&token=YOUR_KEY"
```

### Test in Browser Console

```javascript
// In browser DevTools console (with Vite dev server)
import { fetchStockData } from './services/stocks.js';

// Test fetching
const data = await fetchStockData('AAPL', 'polygon');
console.log(data);
```

### Jest Unit Tests

```javascript
// test/stocks.test.js
import { fetchStockData } from '../src/services/stocks';

test('fetches stock data', async () => {
  const data = await fetchStockData('AAPL', 'alphaVantage');
  expect(data).toHaveProperty('symbol');
  expect(data).toHaveProperty('price');
  expect(data.price).toBeGreaterThan(0);
});
```

---

## ⚡ Performance Tips

### 1. Cache API Responses

```javascript
const cache = new Map();

export const getCachedStockData = async (symbol, provider, ttl = 60000) => {
  const cacheKey = `${symbol}-${provider}`;
  
  if (cache.has(cacheKey)) {
    const { data, timestamp } = cache.get(cacheKey);
    if (Date.now() - timestamp < ttl) {
      return data; // Return cached data if fresh
    }
  }
  
  const data = await fetchStockData(symbol, provider);
  cache.set(cacheKey, { data, timestamp: Date.now() });
  return data;
};
```

### 2. Rate Limiting

```javascript
import pLimit from 'p-limit';

// Limit to 5 simultaneous requests
const limit = pLimit(5);

export const fetchMultipleStocksRateLimited = async (symbols, provider) => {
  const promises = symbols.map(symbol =>
    limit(() => fetchStockData(symbol, provider))
  );
  return Promise.all(promises);
};
```

### 3. Debounce Requests

```javascript
import { debounce } from 'lodash';

export const debouncedSearch = debounce(async (query) => {
  const results = await fetchStockData(query, 'polygon');
  return results;
}, 500); // Wait 500ms after user stops typing
```

---

## 🚨 Error Handling

All functions include error handling:

```javascript
try {
  const data = await fetchStockData('AAPL', 'polygon');
} catch (error) {
  if (error.response?.status === 429) {
    console.error('Rate limited - implement exponential backoff');
  } else if (error.response?.status === 401) {
    console.error('Invalid API key');
  } else {
    console.error('Network error - using fallback mock data');
  }
  // Gracefully falls back to mock data automatically
}
```

---

## 📈 Monitoring & Debugging

### Enable Debug Logging

In `src/services/stocks.js`, uncomment console logs:

```javascript
// In API functions
console.log('Fetching from API:', provider);
console.log('Response:', response.data);
console.log('Error:', error.message);
```

### Monitor API Usage

Track API calls to avoid rate limits:

```javascript
const apiCallCount = new Map();

export const trackApiCall = (provider) => {
  const count = (apiCallCount.get(provider) || 0) + 1;
  apiCallCount.set(provider, count);
  console.log(`${provider} API calls today: ${count}`);
};
```

---

## 🎯 Production Checklist

- [ ] All 4 API providers have valid keys set in production environment variables
- [ ] API error handling tested (simulate network failures)
- [ ] Rate limiting implemented for high-traffic scenarios
- [ ] Response caching enabled for frequently accessed stocks
- [ ] Monitoring setup (Sentry/LogRocket) for API failures
- [ ] API usage tracked to stay within tier limits
- [ ] Real-time updates performance tested under load
- [ ] Fallback to mock data tested and verified
- [ ] API dashboard monitored for quota warnings

---

## 📞 Support

- **Polygon.io Docs:** https://polygon.io/docs/stocks
- **IEX Cloud Docs:** https://iexcloud.io/docs
- **Finnhub Docs:** https://finnhub.io/docs
- **Alpha Vantage Docs:** https://www.alphavantage.co/documentation/

---

**Happy coding! 🚀**
