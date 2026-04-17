import React, { useState } from 'react';
import { Card, Button, Badge } from '../common';
import { useGamificationStore } from '../../stores';
import { LEARNING_QUIZZES, BADGES } from '../../utils/constants';
import { motion } from 'framer-motion';

/**
 * Badges Display Component
 */
export const BadgesDisplay = () => {
  const { user } = useGamificationStore();

  return (
    <Card>
      <h3 className="text-lg font-bold text-text mb-4 flex items-center gap-2">
        <span>🏆</span> Achievements
      </h3>

      <div className="grid grid-cols-3 gap-4">
        {BADGES.map((badge) => {
          const unlocked = user.badges.some(b => b.id === badge.id);
          return (
            <motion.div
              key={badge.id}
              whileHover={unlocked ? { scale: 1.05 } : {}}
              className={`text-center p-4 rounded-lg transition-all ${
                unlocked
                  ? `bg-gradient-to-br ${badge.color}`
                  : 'bg-dark-hover opacity-50'
              }`}
              title={badge.description}
            >
              <div className="text-3xl mb-2">{badge.icon}</div>
              <p className={`text-sm font-bold ${unlocked ? 'text-white' : 'text-text-secondary'}`}>
                {badge.name}
              </p>
              {!unlocked && (
                <p className="text-xs text-text-secondary mt-1">🔒 Locked</p>
              )}
            </motion.div>
          );
        })}
      </div>
    </Card>
  );
};

/**
 * Learning Quiz Component
 */
export const LearningQuiz = () => {
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [completedQuizzes, setCompletedQuizzes] = useState([]);
  const { addPoints, addBadge } = useGamificationStore();

  const handleQuizSelect = (quiz) => {
    setCurrentQuiz(quiz);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const handleSubmitAnswer = () => {
    setShowResult(true);
    const isCorrect = selectedAnswer === currentQuiz.correct;

    if (isCorrect) {
      addPoints(currentQuiz.points);
      setCompletedQuizzes([...completedQuizzes, currentQuiz.id]);

      if (completedQuizzes.length === 4) {
        addBadge({
          id: 'scholar',
          name: 'Scholar',
          description: 'Completed 5 learning quizzes',
        });
      }
    }
  };

  const handleNextQuiz = () => {
    const remainingQuizzes = LEARNING_QUIZZES.filter(q => !completedQuizzes.includes(q.id));
    if (remainingQuizzes.length > 0) {
      handleQuizSelect(remainingQuizzes[0]);
    }
  };

  if (!currentQuiz) {
    return (
      <Card>
        <h3 className="text-lg font-bold text-text mb-4 flex items-center gap-2">
          <span>🧠</span> Learn & Earn
        </h3>

        <p className="text-text-secondary mb-4">
          Complete quizzes to learn about investing and earn points!
        </p>

        <div className="space-y-3">
          {LEARNING_QUIZZES.map((quiz) => {
            const completed = completedQuizzes.includes(quiz.id);
            return (
              <motion.button
                key={quiz.id}
                whileHover={{ x: 5 }}
                onClick={() => handleQuizSelect(quiz)}
                className={`w-full p-4 rounded-lg text-left transition-all border ${
                  completed
                    ? 'bg-dark-hover border-green-500 opacity-60'
                    : 'bg-dark-hover border-dark-border hover:border-primary'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-text flex items-center gap-2">
                      {completed && '✓'}
                      {quiz.title}
                    </p>
                    <p className="text-sm text-text-secondary">{quiz.category}</p>
                  </div>
                  <Badge variant="primary" size="sm">
                    +{quiz.points} pts
                  </Badge>
                </div>
              </motion.button>
            );
          })}
        </div>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
    >
      <Card className="w-full max-w-lg">
        <div className="flex items-center justify-between mb-6">
          <Badge variant="primary">{currentQuiz.category}</Badge>
          <Badge variant="secondary">+{currentQuiz.points} pts</Badge>
        </div>

        <h2 className="text-2xl font-bold text-text mb-6">{currentQuiz.question}</h2>

        <div className="space-y-3 mb-6">
          {currentQuiz.options.map((option, idx) => (
            <motion.button
              key={idx}
              whileHover={{ x: 5 }}
              onClick={() => !showResult && setSelectedAnswer(idx)}
              className={`w-full p-4 rounded-lg text-left transition-all border-2 ${
                selectedAnswer === idx
                  ? 'border-primary bg-primary bg-opacity-20 text-text'
                  : 'border-dark-border bg-dark-hover text-text-secondary hover:border-primary'
              } ${
                showResult && idx === currentQuiz.correct
                  ? 'border-green-500 bg-green-500 bg-opacity-20 text-green-400'
                  : showResult && idx === selectedAnswer && selectedAnswer !== currentQuiz.correct
                  ? 'border-red-500 bg-red-500 bg-opacity-20 text-red-400'
                  : ''
              }`}
              disabled={showResult}
            >
              {option}
            </motion.button>
          ))}
        </div>

        {showResult && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`p-4 rounded-lg mb-6 ${
              selectedAnswer === currentQuiz.correct
                ? 'bg-green-500 bg-opacity-20 border border-green-500'
                : 'bg-red-500 bg-opacity-20 border border-red-500'
            }`}
          >
            <p className="font-bold text-text mb-2">
              {selectedAnswer === currentQuiz.correct ? '✓ Correct!' : '✗ Incorrect'}
            </p>
            <p className="text-text-secondary text-sm">{currentQuiz.explanation}</p>
            {selectedAnswer === currentQuiz.correct && (
              <p className="text-green-400 text-sm mt-2 font-bold">+{currentQuiz.points} points earned!</p>
            )}
          </motion.div>
        )}

        <div className="flex gap-3">
          <Button
            variant="ghost"
            className="flex-1"
            onClick={() => setCurrentQuiz(null)}
          >
            Back
          </Button>
          {!showResult ? (
            <Button
              variant="primary"
              className="flex-1"
              disabled={selectedAnswer === null}
              onClick={handleSubmitAnswer}
            >
              Submit Answer
            </Button>
          ) : (
            <Button
              variant="primary"
              className="flex-1"
              onClick={handleNextQuiz}
            >
              Next Quiz →
            </Button>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

/**
 * Level Progress Component
 */
export const LevelProgress = () => {
  const { user } = useGamificationStore();
  const pointsToNextLevel = (user.level * 500) - (user.totalPoints % (user.level * 500));
  const progressPercent = ((user.totalPoints % (user.level * 500)) / (user.level * 500)) * 100;

  const levelTitles = [
    'Novice Investor',
    'Smart Learner',
    'Market Watcher',
    'Stock Expert',
    'Portfolio Master',
    'Finance Guru',
  ];

  return (
    <Card>
      <h3 className="text-lg font-bold text-text mb-4">📊 Your Journey</h3>

      <div className="text-center mb-6">
        <div className="text-5xl mb-2">
          {user.level === 1 ? '🌱' : user.level === 2 ? '🌿' : user.level === 3 ? '🌳' : '🚀'}
        </div>
        <p className="text-2xl font-bold text-text">Level {user.level}</p>
        <p className="text-text-secondary">{levelTitles[Math.min(user.level - 1, 5)]}</p>
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-text-secondary">Progress to Level {user.level + 1}</span>
          <span className="text-text font-bold">{pointsToNextLevel.toLocaleString()} points</span>
        </div>
        <div className="w-full bg-dark-hover rounded-full h-3 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.5 }}
            className="h-full bg-gradient-to-r from-primary to-secondary"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-dark-hover p-3 rounded-lg">
          <p className="text-text-secondary text-sm mb-1">Total Points</p>
          <p className="text-2xl font-bold text-text">{user.totalPoints.toLocaleString()}</p>
        </div>
        <div className="bg-dark-hover p-3 rounded-lg">
          <p className="text-text-secondary text-sm mb-1">Badges Earned</p>
          <p className="text-2xl font-bold text-text">{user.badges.length}/6</p>
        </div>
      </div>
    </Card>
  );
};

/**
 * Daily Streaks Component
 */
export const DailyStreaks = () => {
  const { user, updateStreak } = useGamificationStore();

  const streakEmojis = {
    dailyLogin: '🔥',
    trades: '📈',
    learning: '🧠',
  };

  return (
    <Card>
      <h3 className="text-lg font-bold text-text mb-4 flex items-center gap-2">
        <span>⚡</span> Streaks
      </h3>

      <div className="space-y-3">
        {Object.entries(user.streaks).map(([key, value]) => (
          <div key={key} className="flex items-center gap-3">
            <div className="text-2xl">{streakEmojis[key]}</div>
            <div className="flex-1">
              <p className="text-text font-medium capitalize">
                {key === 'dailyLogin' && 'Daily Login'}
                {key === 'trades' && 'Trading Streak'}
                {key === 'learning' && 'Learning Streak'}
              </p>
              <p className="text-text-secondary text-sm">{value} day{value !== 1 ? 's' : ''}</p>
            </div>
            <div className="text-3xl">{value > 0 ? '🔥' : '❄️'}</div>
          </div>
        ))}
      </div>

      <Button
        variant="primary"
        className="w-full mt-4"
        onClick={() => {
          updateStreak('dailyLogin');
        }}
      >
        ✓ Daily Check-in
      </Button>
    </Card>
  );
};

/**
 * Leaderboard Component
 */
export const Leaderboard = () => {
  const mockLeaderboard = [
    { rank: 1, name: 'Crypto King', points: 12500, level: 5 },
    { rank: 2, name: 'Stock Wizard', points: 11200, level: 5 },
    { rank: 3, name: 'Market Hunter', points: 9800, level: 4 },
    { rank: 4, name: 'You (Anonymous)', points: 4320, level: 2, isYou: true },
    { rank: 5, name: 'Beginner Bull', points: 2100, level: 2 },
  ];

  return (
    <Card>
      <h3 className="text-lg font-bold text-text mb-4 flex items-center gap-2">
        <span>🏅</span> Leaderboard
      </h3>

      <div className="space-y-2">
        {mockLeaderboard.map((entry) => (
          <motion.div
            key={entry.rank}
            whileHover={{ x: 5 }}
            className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
              entry.isYou
                ? 'bg-gradient-to-r from-primary to-secondary'
                : 'bg-dark-hover hover:border-primary border border-transparent'
            }`}
          >
            <div
              className={`text-2xl font-bold w-8 text-center ${
                entry.rank === 1
                  ? '🥇'
                  : entry.rank === 2
                  ? '🥈'
                  : entry.rank === 3
                  ? '🥉'
                  : entry.rank
              }`}
            />
            <div className="flex-1">
              <p className={`font-bold ${entry.isYou ? 'text-white' : 'text-text'}`}>
                {entry.name}
              </p>
              <p className={`text-sm ${entry.isYou ? 'text-gray-200' : 'text-text-secondary'}`}>
                Level {entry.level}
              </p>
            </div>
            <div className={`text-right font-bold ${entry.isYou ? 'text-white' : 'text-text'}`}>
              {entry.points.toLocaleString()} pts
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
};
