import React, { useState } from 'react';
import { Card, Button, Input } from '../common';
import { useAuthStore } from '../../stores';
import { motion } from 'framer-motion';

/**
 * Login Page Component
 */
export const LoginPage = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setUser, setLoading } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate Firebase auth
    if (email && password.length >= 6) {
      setTimeout(() => {
        setUser({
          uid: 'user-' + Date.now(),
          email,
          displayName: email.split('@')[0],
          photoURL: null,
          createdAt: new Date(),
        });
        setLoading(false);
        onSuccess();
      }, 1000);
    } else {
      setError('Email and password (6+ chars) required');
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setUser({
      uid: 'demo-user',
      email: 'demo@zenvest.com',
      displayName: 'Gen Z Investor',
      photoURL: null,
      createdAt: new Date(),
    });
    setLoading(false);
    onSuccess();
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4 inline-block animate-float">
            🚀
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
            Zenvest
          </h1>
          <p className="text-text-secondary">Investing made simple for Gen Z</p>
        </div>

        <Card className="p-6">
          <h2 className="text-2xl font-bold text-text mb-6">Get Started</h2>

          <form onSubmit={handleLogin} className="space-y-4 mb-6">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              error={error && !email ? 'Email required' : ''}
              icon={(props) => (
                <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              )}
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              error={error && !password ? 'Password required' : ''}
              icon={(props) => (
                <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              )}
            />

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-3 bg-red-500 bg-opacity-20 border border-red-500 rounded-lg text-red-400 text-sm"
              >
                {error}
              </motion.div>
            )}

            <Button
              variant="primary"
              className="w-full"
              isLoading={isLoading}
              type="submit"
            >
              Sign In
            </Button>
          </form>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-dark-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-card text-text-secondary">Or continue with</span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full mb-3"
            onClick={handleDemoLogin}
          >
            🎮 Try Demo Mode
          </Button>

          <p className="text-center text-text-secondary text-sm">
            Demo mode lets you explore with virtual money. No sign-up needed!
          </p>
        </Card>

        {/* Features List */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <motion.div whileHover={{ y: -5 }}>
            <div className="text-3xl mb-2">📱</div>
            <p className="text-xs text-text-secondary">Clean &amp; Simple</p>
          </motion.div>
          <motion.div whileHover={{ y: -5 }}>
            <div className="text-3xl mb-2">🎮</div>
            <p className="text-xs text-text-secondary">Gamified Learning</p>
          </motion.div>
          <motion.div whileHover={{ y: -5 }}>
            <div className="text-3xl mb-2">🤖</div>
            <p className="text-xs text-text-secondary">AI Guidance</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

/**
 * Signup Page Component
 */
export const SignupPage = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAuthStore();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setUser({
        uid: 'user-' + Date.now(),
        email: formData.email,
        displayName: formData.name,
        photoURL: null,
        createdAt: new Date(),
      });
      onSuccess();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
            Join Zenvest
          </h1>
          <p className="text-text-secondary">Start your investing journey today</p>
        </div>

        <Card className="p-6">
          <form onSubmit={handleSignup} className="space-y-4">
            <Input
              label="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Your name"
            />

            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="you@example.com"
            />

            <Input
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••••"
            />

            <Input
              label="Confirm Password"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              placeholder="••••••••"
            />

            <Button
              variant="primary"
              className="w-full"
              isLoading={isLoading}
              type="submit"
            >
              Create Account
            </Button>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};
