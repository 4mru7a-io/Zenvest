import React, { useState, useRef, useEffect } from 'react';
import { Card, Button, Input } from '../common';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * AI Investment Guide Chatbot Component
 * Features beginner-friendly investment guidance through conversation
 */
export const AIAssistant = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: "Hey there! 👋 I'm Zenvest AI, your personal investment guide.\n\nNew to investing? I'm here to explain everything in simple terms - from choosing your first stock to building a diversified portfolio.\n\nWhat would you like to learn about?",
      suggestions: [
        "Explain stocks like I'm 18",
        "Which stocks are beginner-friendly?",
        "What is SIP?",
        "How do I start investing?"
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const botResponses = {
    'stocks': `📚 **What are Stocks?**

A stock represents a tiny piece of ownership in a company. When you buy 1 share of Reliance at ₹2,850, you own a small part of that company!

**Why invest in stocks?**
- 📈 Potential for growing your money over time
- 💰 Dividends (free money from companies!)
- 🎯 Achieve financial goals faster
- 🧠 Learn about business and economy

**Think of it like this:** If you start a coffee shop with a friend and they own 50%, they can sell you 25% for ₹5,000. That's exactly what stocks do!`,

    'beginner': `🌱 **Best Stocks for Beginners**

Start with established, stable companies:

1. **TCS** 🏢
   - India's biggest IT company
   - Very stable & pays dividends
   - Great for long-term holdings

2. **HDFC Bank** 🏦
   - Strong banking sector
   - Consistent performance
   - Good for first-time investors

3. **Infosys** 💻
   - Tech services leader
   - Predictable growth
   - International exposure

**Pro Tip:** Start small! Invest ₹5,000-10,000 in 2-3 stocks to learn without stress. As you gain confidence, increase your investments.`,

    'sip': `💎 **What is SIP? (Systematic Investment Plan)**

Instead of investing all money at once, SIP lets you invest a fixed amount regularly.

**Example:**
- Invest ₹500 every month for 12 months = ₹6,000 total
- Reduces risk through "rupee cost averaging"
- Builds investing habits! ✅

**Why SIP is awesome:**
1. **Discipline** - Automatic monthly investment
2. **Lower Risk** - Average out market ups and downs
3. **Money grows** - Compound interest magic!
4. **Less stressful** - No need to time the market

**Real example:**
If you invest ₹500 monthly for 10 years at 12% return, you'll have ₹1,08,000+ from ₹60,000 invested. That's ₹48,000 in pure gains! 🚀`,

    'start': `🚀 **How to Start Investing (Ultimate Beginner Guide)**

**Step 1: Open an Account** (5 mins)
- Create account on Zenvest ✓ (you're here!)
- Verify your phone & email
- Done!

**Step 2: Learn the Basics**
- Complete our learning quizzes
- Read beginner-friendly explanations
- Start with virtual money (no risk!)

**Step 3: Make Your First Trade**
- Start with ₹5,000-10,000
- Pick 2-3 well-known companies
- Hold for at least 6 months

**Step 4: Enjoy the Journey**
- Track your portfolio daily
- Earn badges & points
- Learn from mistakes (virtual money!)

**Remember:** 
- Start small, think big 💭
- Investing is a long-term game 📅
- Don't panic during market dips 🆘`,

    'risk': `⚠️ **Understanding Risk vs Return**

**High Risk = High Potential Gain (but also losses!)**
- New startup companies
- Penny stocks (< ₹10)
- Sector-specific bets
- Perfect for: Learning & gaming

**Medium Risk = Balanced Approach**
- Growing tech/finance companies
- Mid-cap stocks
- Good for: Most investors

**Low Risk = Stable & Predictable**
- Established mega-cap companies
- Dividend aristocrats (pay consistently)
- Banks, utilities, FMCG
- Perfect for: Beginners & long-term wealth

**Pro Tip - Diversify!**
Don't put all money in one stock. Spread across different risk levels:
- 40% Low Risk (HDFC, TCS)
- 40% Medium Risk (growing companies)
- 20% High Risk (experimenting)`,

    'dividend': `🎁 **Dividends - Free Money from Companies!**

When companies make profits, they share some with shareholders (that's you!) as dividends.

**Example:**
- You own 100 shares of HDFC Bank
- Company pays ₹50 dividend per share
- You get ₹5,000 FREE! 💰

**Types:**
1. **Cash Dividend** - Money directly to your account
2. **Bonus Shares** - Extra free shares
3. **Dividend Growth** - Increasing dividends over time

**Best dividend stocks to watch:**
- HDFC Bank 🏦
- ITC 🚬 (old-school but reliable)
- Reliance 🏢
- TCS 💻

**Cool fact:** If you keep getting ₹1,000/month in dividends, that's ₹12,000/year! Eventually that becomes significant passive income.`,

    'portfolio': `🎯 **Building Your First Portfolio**

**For Beginners (₹10,000):**
- TCS: ₹5,000 (stability)
- Infosys: ₹3,000 (growth)
- HDFC Bank: ₹2,000 (dividends)

**For Intermediate (₹25,000):**
Add variety across sectors:
- IT: TCS, Infosys
- Banking: HDFC
- FMCG: ITC, HUL
- Energy: Reliance

**Golden Rules:**
1. Never invest more than 10% in one stock
2. Review quarterly (every 3 months)
3. Reinvest dividends for compound growth
4. Stay invested for 5+ years minimum

**Zenvest Hack:**
Use our beginner mode! We'll suggest balanced portfolios based on your goals. 🎯`
  };

  const generateResponse = (userMessage) => {
    const lower = userMessage.toLowerCase();

    if (lower.includes('stock') && lower.includes('explain')) return botResponses['stocks'];
    if (lower.includes('beginner') || lower.includes('first time')) return botResponses['beginner'];
    if (lower.includes('sip')) return botResponses['sip'];
    if (lower.includes('start') || lower.includes('how do i')) return botResponses['start'];
    if (lower.includes('risk')) return botResponses['risk'];
    if (lower.includes('dividend')) return botResponses['dividend'];
    if (lower.includes('portfolio')) return botResponses['portfolio'];

    // Default responses for other inputs
    if (lower.includes('thank') || lower.includes('thanks')) {
      return "Happy to help! Any other questions about investing? I'm always here! 😊";
    }
    if (lower.includes('hello') || lower.includes('hi')) {
      return "Hey! Welcome to Zenvest! 👋 Ready to start your investing journey? What would you like to know?";
    }

    return "That's a great question! 🤔\n\nTry asking me about:\n- How to start investing\n- Best stocks for beginners\n- What is SIP?\n- Understanding risk\n- Dividends explained\n- Building a portfolio\n\nOr ask anything investment-related and I'll do my best to explain it simply!";
  };

  const handleSendMessage = (text) => {
    if (!text.trim()) return;

    // Add user message
    setMessages(prev => [...prev, {
      id: Date.now(),
      type: 'user',
      text: text
    }]);

    setInput('');
    setIsLoading(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const response = generateResponse(text);
      setMessages(prev => [...prev, {
        id: Date.now(),
        type: 'bot',
        text: response
      }]);
      setIsLoading(false);
    }, 800);
  };

  return (
    <Card className="flex flex-col h-[600px] md:h-[700px]">
      {/* Header */}
      <div className="border-b border-dark-border pb-4 mb-4">
        <h3 className="text-lg font-bold text-text flex items-center gap-2">
          <span className="text-2xl">🤖</span> Zenvest AI Guide
        </h3>
        <p className="text-xs text-text-secondary mt-1">Ask me anything about investing!</p>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-4 py-3 rounded-lg ${
                  msg.type === 'user'
                    ? 'bg-primary text-white rounded-br-none'
                    : 'bg-dark-hover text-text rounded-bl-none border border-primary border-opacity-30'
                }`}
              >
                <p className="text-sm whitespace-pre-line">{msg.text}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 bg-dark-hover rounded-lg flex items-center justify-center">
              <div className="flex gap-1">
                <div className="w-1 h-1 bg-primary rounded-full animate-bounce" />
                <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          </motion.div>
        )}

        {/* Suggestions for first message */}
        {messages.length === 1 && (
          <div className="mt-4 space-y-2">
            {messages[0].suggestions.map((suggestion, i) => (
              <motion.button
                key={i}
                whileHover={{ x: 5 }}
                onClick={() => handleSendMessage(suggestion)}
                className="w-full text-left p-3 bg-dark-hover hover:bg-dark-border rounded-lg text-sm text-text-secondary hover:text-text transition-all border border-dark-border"
              >
                → {suggestion}
              </motion.button>
            ))}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-dark-border pt-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(input)}
            placeholder="Ask about investing..."
            className="flex-1 px-4 py-2 bg-dark-hover rounded-lg text-text placeholder-text-secondary outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
          />
          <Button
            variant="primary"
            onClick={() => handleSendMessage(input)}
            disabled={!input.trim() || isLoading}
            className="px-6"
          >
            Send
          </Button>
        </div>
      </div>
    </Card>
  );
};

/**
 * AI Recommendations Widget (for dashboard)
 */
export const AIRecommendations = ({ stocks }) => {
  const recommendations = [
    {
      title: '🌱 Perfect for Beginners',
      stocks: ['TCS', 'HDFC', 'Infosys'],
      reason: 'Established, stable, and beginner-friendly'
    },
    {
      title: '📈 High Growth Potential',
      stocks: ['Reliance', 'WIPRO'],
      reason: 'Good momentum with diversified business'
    },
    {
      title: '💰 Dividend Income',
      stocks: ['ITC', 'HDFC'],
      reason: 'Regular dividend payouts for passive income'
    }
  ];

  return (
    <Card>
      <h3 className="text-lg font-bold text-text mb-4 flex items-center gap-2">
        <span>✨</span> AI Recommendations
      </h3>

      <div className="space-y-4">
        {recommendations.map((rec, i) => (
          <div key={i} className="p-3 bg-dark-hover rounded-lg border border-primary border-opacity-20">
            <p className="font-bold text-text mb-2">{rec.title}</p>
            <div className="flex gap-2 mb-2 flex-wrap">
              {rec.stocks.map(symbol => (
                <Badge key={symbol} variant="primary" size="sm">
                  {symbol}
                </Badge>
              ))}
            </div>
            <p className="text-xs text-text-secondary">{rec.reason}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};
