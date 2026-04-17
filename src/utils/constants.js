/**
 * Mock stock data - Replace with real API calls in production
 */
export const MOCK_STOCKS = [
  {
    id: 'RELIANCE',
    symbol: 'RELIANCE',
    name: 'Reliance Industries Ltd.',
    price: 2850.5,
    change: 45.25,
    changePercent: 1.62,
    volume: '2.5M',
    marketCap: '$200B',
    description: 'India\'s largest conglomerate with interests in energy, petrochemicals, and retail.',
    risk: 'Medium',
    about: 'Reliance Industries Limited is an Indian multinational conglomerate company. It is the largest company in India by market capitalization.',
    beginner_explanation: 'Think of Reliance as a big tech + energy company. They make everything from gas to phones. Great for long-term investments.',
  },
  {
    id: 'INFY',
    symbol: 'INFY',
    name: 'Infosys Limited',
    price: 1620.75,
    change: -25.50,
    changePercent: -1.55,
    volume: '1.8M',
    marketCap: '$68B',
    description: 'Global IT services and consulting company providing digital solutions.',
    risk: 'Low',
    about: 'Infosys is a leading global provider of consulting, technology, and outsourcing services.',
    beginner_explanation: 'Infosys is like a tech support company for big companies worldwide. Stable and good for beginners!',
  },
  {
    id: 'TCS',
    symbol: 'TCS',
    name: 'Tata Consultancy Services',
    price: 3950.25,
    change: 85.75,
    changePercent: 2.22,
    volume: '3.2M',
    marketCap: '$170B',
    description: 'Leading IT services company providing technology and consulting solutions globally.',
    risk: 'Low',
    about: 'TCS is the largest IT services company in India by revenue and market cap.',
    beginner_explanation: 'TCS is India\'s biggest tech company. Very stable and pays dividends (like free money!).',
  },
  {
    id: 'ITC',
    symbol: 'ITC',
    name: 'ITC Limited',
    price: 415.50,
    change: 12.25,
    changePercent: 3.04,
    volume: '4.1M',
    marketCap: '$45B',
    description: 'Diversified company with interests in FMCG, hotels, agribusiness, and packaging.',
    risk: 'Medium',
    about: 'ITC Limited is an Indian multinational conglomerate company.',
    beginner_explanation: 'ITC makes cigarettes, hotels, and food. Good dividend stock for income.',
  },
  {
    id: 'HDFC',
    symbol: 'HDFC',
    name: 'HDFC Bank Limited',
    price: 1650.0,
    change: 52.50,
    changePercent: 3.28,
    volume: '2.9M',
    marketCap: '$160B',
    description: 'Premier banking and financial services company in India.',
    risk: 'Low',
    about: 'HDFC Bank is one of India\'s leading private sector banks.',
    beginner_explanation: 'HDFC is like SBI but private. Super reliable and great for beginners.',
  },
  {
    id: 'WIPRO',
    symbol: 'WIPRO',
    name: 'Wipro Limited',
    price: 405.75,
    change: -15.25,
    changePercent: -3.63,
    volume: '1.5M',
    marketCap: '$25B',
    description: 'IT services and consulting company providing technology and business solutions.',
    risk: 'Medium',
    about: 'Wipro is a leading global IT services company.',
    beginner_explanation: 'Wipro is another tech company like Infosys. Good growth potential!',
  },
  {
    id: 'MARUTI',
    symbol: 'MARUTI',
    name: 'Maruti Suzuki India Limited',
    price: 9850.0,
    change: -120.50,
    changePercent: -1.21,
    volume: '0.8M',
    marketCap: '$35B',
    description: 'Leading automotive manufacturer in India.',
    risk: 'Medium',
    about: 'Maruti Suzuki is India\'s largest passenger vehicle manufacturer.',
    beginner_explanation: 'The company that makes the cars you see on Indian roads. Good for industry bets.',
  },
  {
    id: 'BAJAJFINSV',
    symbol: 'BAJAJFINSV',
    name: 'Bajaj Finserv Limited',
    price: 19850.5,
    change: 245.75,
    changePercent: 1.25,
    volume: '0.6M',
    marketCap: '$45B',
    description: 'Diversified financial services company.',
    risk: 'High',
    about: 'Bajaj Finserv Limited is a diversified financial services company.',
    beginner_explanation: 'Bajaj Finserv gives loans and insurance. Higher risk but good growth.',
  },
];

/**
 * Mock learning quizzes for gamification
 */
export const LEARNING_QUIZZES = [
  {
    id: 1,
    title: 'What is SIP?',
    points: 50,
    category: 'Basics',
    question: 'SIP stands for Systematic Investment Plan. What is its main benefit?',
    options: [
      'Investing a fixed amount regularly to build wealth over time',
      'Buying and selling stocks in one day',
      'Getting guaranteed 100% returns',
      'Free stock trading',
    ],
    correct: 0,
    explanation: 'SIP is investing the same amount regularly (like ₹500 every month). It builds discipline and reduces risk through averaging!',
  },
  {
    id: 2,
    title: 'What is Risk?',
    points: 50,
    category: 'Risk Management',
    question: 'Which stock is generally considered lower risk?',
    options: [
      'New startup companies',
      'Established large companies like TCS, Infosys',
      'Penny stocks (< ₹10)',
      'Options trading',
    ],
    correct: 1,
    explanation: 'Larger, established companies are more stable. Startups and penny stocks are riskier but have higher growth potential!',
  },
  {
    id: 3,
    title: 'Dividends 101',
    points: 50,
    category: 'Income',
    question: 'What is a dividend?',
    options: [
      'A penalty for holding stocks',
      'Money companies pay to shareholders from profits',
      'A fee for buying stocks',
      'A type of trading strategy',
    ],
    correct: 1,
    explanation: 'Dividends are like free money! When companies make profit, they share some with you as a reward for owning their stock.',
  },
  {
    id: 4,
    title: 'Bull vs Bear Markets',
    points: 50,
    category: 'Market Basics',
    question: 'What is a Bull Market?',
    options: [
      'Market going down',
      'Market going up (prices rising)',
      'Sideways market',
      'Market closed',
    ],
    correct: 1,
    explanation: 'Bull = prices UP. Bear = prices DOWN. Remember: Bull pushes UP with horns! 📈',
  },
  {
    id: 5,
    title: 'Portfolio Diversification',
    points: 50,
    category: 'Strategy',
    question: 'Why should you diversify your portfolio?',
    options: [
      'To spend more money',
      'It wastes time',
      'To reduce risk by investing in different stocks/sectors',
      'Everyone says so',
    ],
    correct: 2,
    explanation: 'Don\'t put all eggs in one basket! Investing in different companies and industries reduces your risk.',
  },
];

/**
 * Mock badges and achievements
 */
export const BADGES = [
  {
    id: 'first_trade',
    name: 'First Trade',
    description: 'Made your first stock purchase',
    icon: '🚀',
    color: 'bg-blue-500',
  },
  {
    id: 'diamond_hands',
    name: 'Diamond Hands',
    description: 'Held a stock for 30 days',
    icon: '💎',
    color: 'bg-cyan-500',
  },
  {
    id: 'scholar',
    name: 'Scholar',
    description: 'Completed 5 learning quizzes',
    icon: '🧠',
    color: 'bg-purple-500',
  },
  {
    id: 'profit_maker',
    name: 'Profit Maker',
    description: 'Made ₹1,000 profit',
    icon: '📈',
    color: 'bg-green-500',
  },
  {
    id: 'social_butterfly',
    name: 'Social Butterfly',
    description: 'Shared your portfolio',
    icon: '🦋',
    color: 'bg-pink-500',
  },
  {
    id: 'risk_taker',
    name: 'Risk Taker',
    description: 'Invested in 5 different stocks',
    icon: '🎲',
    color: 'bg-red-500',
  },
];

/**
 * Utility function to format currency
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(amount);
};

/**
 * Utility function to format large numbers
 */
export const formatNumber = (num) => {
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'B' },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const item = lookup
    .slice()
    .reverse()
    .find((item) => num >= item.value);
  return item ? (num / item.value).toFixed(1).replace(rx, '$1') + item.symbol : '0';
};

/**
 * Generate mock chart data
 */
export const generateChartData = (days = 30) => {
  const data = [];
  let value = 10000;
  for (let i = 0; i < days; i++) {
    value += (Math.random() - 0.45) * 100;
    data.push({
      date: new Date(Date.now() - (days - i) * 86400000).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
      value: Math.round(value),
    });
  }
  return data;
};

/**
 * Simulate stock price change
 */
export const updateStockPrice = (stock) => {
  const changePercent = (Math.random() - 0.5) * 3; // Random change between -1.5% to +1.5%
  const change = (stock.price * changePercent) / 100;
  return {
    ...stock,
    price: stock.price + change,
    change,
    changePercent,
  };
};
