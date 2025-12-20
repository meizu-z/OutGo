import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import {
  ArrowRight,
  Check,
  Calendar,
  Camera,
  ChartBar,
  User,
  CalendarPlus,
  CalendarBlank,
  Stack,
  Coffee,
  Train,
  Lightning,
  Tote,
  FirstAid,
  Confetti as ConfettiIcon,
  Sparkle,
  SignOut,
  CreditCard,
  Plus,
  Pencil,
  Trash,
  X,
  ArrowLeft,
  ShoppingCart,
  Hamburger,
  AirplaneTilt,
  Book,
  GameController,
  Heart,
  House,
  Car,
  Pizza,
  Barbell,
  Dog,
  Gift,
  Briefcase,
  Palette,
  Baby,
  Pill,
  Scissors,
  Wrench,
  Leaf,
  Tag,
  Trophy,
  Star,
  Crown,
  Medal,
  Fire,
  Target,
  Lock,
  ArrowsClockwise,
  TrendUp,
  ChartLine,
} from 'phosphor-react';

// Category configuration
const CATEGORIES = [
  { name: 'Coffee', icon: Coffee },
  { name: 'Transport', icon: Train },
  { name: 'Utilities', icon: Lightning },
  { name: 'Shopping', icon: Tote },
  { name: 'Health', icon: FirstAid },
  { name: 'Entertainment', icon: ConfettiIcon },
];

// Icon picker options for category customization
const CATEGORY_ICONS = [
  { name: 'Coffee', component: Coffee },
  { name: 'Train', component: Train },
  { name: 'Lightning', component: Lightning },
  { name: 'ShoppingCart', component: ShoppingCart },
  { name: 'FirstAid', component: FirstAid },
  { name: 'Confetti', component: ConfettiIcon },
  { name: 'Hamburger', component: Hamburger },
  { name: 'AirplaneTilt', component: AirplaneTilt },
  { name: 'Book', component: Book },
  { name: 'GameController', component: GameController },
  { name: 'Heart', component: Heart },
  { name: 'House', component: House },
  { name: 'Car', component: Car },
  { name: 'Pizza', component: Pizza },
  { name: 'Barbell', component: Barbell },
  { name: 'Dog', component: Dog },
  { name: 'Gift', component: Gift },
  { name: 'Briefcase', component: Briefcase },
  { name: 'Palette', component: Palette },
  { name: 'Baby', component: Baby },
  { name: 'Pill', component: Pill },
  { name: 'Scissors', component: Scissors },
  { name: 'Wrench', component: Wrench },
  { name: 'Leaf', component: Leaf },
  { name: 'Tag', component: Tag },
];

// Achievements definitions
const ACHIEVEMENTS = [
  // Quick Wins (Easy)
  {
    id: 'first_step',
    name: 'First Step',
    description: 'Log your first expense',
    icon: 'Sparkle',
    difficulty: 'easy',
    category: 'milestone',
    requirement: { type: 'transaction_count', target: 1 }
  },
  {
    id: 'getting_started',
    name: 'Getting Started',
    description: 'Log 5 expenses',
    icon: 'Sparkle',
    difficulty: 'easy',
    category: 'milestone',
    requirement: { type: 'transaction_count', target: 5 }
  },
  {
    id: 'card_setup',
    name: 'Card Setup',
    description: 'Add your first payment card',
    icon: 'CreditCard',
    difficulty: 'easy',
    category: 'milestone',
    requirement: { type: 'card_count', target: 1 }
  },
  {
    id: 'category_explorer',
    name: 'Category Explorer',
    description: 'Create your first custom category',
    icon: 'Tag',
    difficulty: 'easy',
    category: 'milestone',
    requirement: { type: 'custom_category_count', target: 1 }
  },
  {
    id: 'goal_setter',
    name: 'Goal Setter',
    description: 'Set your first spending limit',
    icon: 'Target',
    difficulty: 'easy',
    category: 'milestone',
    requirement: { type: 'spending_limit_set', target: 1 }
  },

  // Consistency Badges (Medium)
  {
    id: 'habit_forming',
    name: 'Habit Forming',
    description: 'Log expenses for 3 days in a row',
    icon: 'Fire',
    difficulty: 'medium',
    category: 'consistency',
    requirement: { type: 'consecutive_days', target: 3 }
  },
  {
    id: 'week_warrior',
    name: 'Week Warrior',
    description: 'Log expenses for 7 days in a row',
    icon: 'Trophy',
    difficulty: 'medium',
    category: 'consistency',
    requirement: { type: 'consecutive_days', target: 7 }
  },
  {
    id: 'dedicated_tracker',
    name: 'Dedicated Tracker',
    description: 'Log expenses for 14 days in a row',
    icon: 'Trophy',
    difficulty: 'medium',
    category: 'consistency',
    requirement: { type: 'consecutive_days', target: 14 }
  },
  {
    id: 'month_master',
    name: 'Month Master',
    description: 'Log expenses for 30 days in a row',
    icon: 'Crown',
    difficulty: 'hard',
    category: 'consistency',
    requirement: { type: 'consecutive_days', target: 30 }
  },

  // Spending Awareness (Medium)
  {
    id: 'budget_keeper',
    name: 'Budget Keeper',
    description: 'Stay under spending limit for a week',
    icon: 'Target',
    difficulty: 'medium',
    category: 'spending',
    requirement: { type: 'under_limit_days', target: 7 }
  },
  {
    id: 'frugal_friend',
    name: 'Frugal Friend',
    description: 'Stay under spending limit for a month',
    icon: 'Heart',
    difficulty: 'hard',
    category: 'spending',
    requirement: { type: 'under_limit_days', target: 30 }
  },
  {
    id: 'savings_star',
    name: 'Savings Star',
    description: 'Stay under 80% of limit for 2 weeks',
    icon: 'Star',
    difficulty: 'medium',
    category: 'spending',
    requirement: { type: 'under_limit_percentage', target: 80, days: 14 }
  },
  {
    id: 'detail_oriented',
    name: 'Detail Oriented',
    description: 'Add descriptions to 25 transactions',
    icon: 'Pencil',
    difficulty: 'medium',
    category: 'spending',
    requirement: { type: 'transactions_with_description', target: 25 }
  },
  {
    id: 'recovery_champion',
    name: 'Recovery Champion',
    description: 'Go back under limit after exceeding it',
    icon: 'TrendUp',
    difficulty: 'medium',
    category: 'spending',
    requirement: { type: 'recovery_from_over_limit', target: 1 }
  },

  // Category Mastery (Easy-Medium)
  {
    id: 'coffee_connoisseur',
    name: 'Coffee Connoisseur',
    description: 'Log 10 coffee purchases',
    icon: 'Coffee',
    difficulty: 'easy',
    category: 'category',
    requirement: { type: 'category_count', target: 10, condition: { category: 'Coffee' } }
  },
  {
    id: 'commuter',
    name: 'Commuter',
    description: 'Log 15 transport expenses',
    icon: 'Train',
    difficulty: 'medium',
    category: 'category',
    requirement: { type: 'category_count', target: 15, condition: { category: 'Transport' } }
  },
  {
    id: 'well_rounded',
    name: 'Well Rounded',
    description: 'Log expenses in all 6 default categories',
    icon: 'Star',
    difficulty: 'medium',
    category: 'category',
    requirement: { type: 'all_default_categories', target: 6 }
  },

  // Milestones (Hard)
  {
    id: 'century_club',
    name: 'Century Club',
    description: 'Log 100 total expenses',
    icon: 'Medal',
    difficulty: 'hard',
    category: 'milestone',
    requirement: { type: 'transaction_count', target: 100 }
  },
  {
    id: 'big_spender',
    name: 'Big Spender',
    description: 'Log a single expense over $100',
    icon: 'ChartBar',
    difficulty: 'medium',
    category: 'milestone',
    requirement: { type: 'single_transaction_amount', target: 100 }
  },
  {
    id: 'mega_purchase',
    name: 'Mega Purchase',
    description: 'Log a single expense over $500',
    icon: 'ChartBar',
    difficulty: 'hard',
    category: 'milestone',
    requirement: { type: 'single_transaction_amount', target: 500 }
  },
  {
    id: 'unstoppable',
    name: 'Unstoppable',
    description: 'Log expenses for 60 days in a row',
    icon: 'Crown',
    difficulty: 'hard',
    category: 'consistency',
    requirement: { type: 'consecutive_days', target: 60 }
  },

  // Special Achievements (Medium-Hard)
  {
    id: 'early_bird',
    name: 'Early Bird',
    description: 'Log an expense before 8 AM',
    icon: 'Fire',
    difficulty: 'medium',
    category: 'special',
    requirement: { type: 'time_based', target: 8, condition: { type: 'before' } }
  },
  {
    id: 'night_owl',
    name: 'Night Owl',
    description: 'Log an expense after 10 PM',
    icon: 'Fire',
    difficulty: 'medium',
    category: 'special',
    requirement: { type: 'time_based', target: 22, condition: { type: 'after' } }
  },
  {
    id: 'zero_spend_day',
    name: 'Zero Spend Day',
    description: 'Have a day with no expenses logged',
    icon: 'Star',
    difficulty: 'easy',
    category: 'special',
    requirement: { type: 'zero_spend_day', target: 1 }
  },
  {
    id: 'organized_mind',
    name: 'Organized Mind',
    description: 'Create 5 custom categories',
    icon: 'Stack',
    difficulty: 'medium',
    category: 'special',
    requirement: { type: 'custom_category_count', target: 5 }
  },
  {
    id: 'monthly_analyst',
    name: 'Monthly Analyst',
    description: 'Check analytics 5 times in one month',
    icon: 'ChartBar',
    difficulty: 'medium',
    category: 'special',
    requirement: { type: 'analytics_views', target: 5, period: 'month' }
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
};

const slideVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    x: -50,
    transition: { duration: 0.3, ease: 'easeIn' },
  },
};

// LocalStorage helpers
const STORAGE_KEY = 'outgo_transactions';

const getTransactions = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveTransaction = (transaction) => {
  const transactions = getTransactions();
  transactions.push({
    ...transaction,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
};

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [wizardStep, setWizardStep] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showCustomDate, setShowCustomDate] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Form data
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    paymentType: '',
    cardId: '',
    cardNickname: '',
    date: new Date().toISOString(),
    description: '',
  });

  // Analytics data
  const [analyticsData, setAnalyticsData] = useState({
    period: 'today',
    total: 0,
    transactions: [],
  });

  // Profile data
  const [cards, setCards] = useState(() => {
    const saved = localStorage.getItem('outgo_cards');
    return saved ? JSON.parse(saved) : [];
  });
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('outgo_categories');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // If corrupted, fall back to defaults
      }
    }

    // First-time initialization: convert CATEGORIES to new format
    const defaults = CATEGORIES.map((cat, i) => ({
      id: `default-${i}`,
      name: cat.name,
      iconName: cat.icon.name || 'Coffee', // Fallback if icon name not available
      isDefault: true,
      createdAt: new Date().toISOString(),
    }));
    localStorage.setItem('outgo_categories', JSON.stringify(defaults));
    return defaults;
  });
  const [showAddCard, setShowAddCard] = useState(false);
  const [newCard, setNewCard] = useState({ nickname: '', lastFour: '' });
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: '', iconName: 'Tag' });

  // Spending Limit & Gamification
  const [spendingLimit, setSpendingLimit] = useState(() => {
    const saved = localStorage.getItem('outgo_spending_limit');
    return saved ? JSON.parse(saved) : { amount: 1000, period: 'month' };
  });
  const [showEditLimit, setShowEditLimit] = useState(false);
  const [tempLimit, setTempLimit] = useState({ amount: '', period: 'month' });

  // Achievements & Badges State
  const [achievements, setAchievements] = useState(() => {
    const saved = localStorage.getItem('outgo_achievements');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // If corrupted, fall back to defaults
      }
    }

    // First-time initialization
    const defaultAchievements = {
      unlockedBadges: [],
      progress: {},
      streaks: {
        currentStreak: 0,
        longestStreak: 0,
        lastLogDate: null,
      },
      stats: {
        totalTransactions: 0,
        analyticsViews: 0,
        customCategoriesCreated: 0,
        cardsAdded: 0,
      },
    };
    localStorage.setItem('outgo_achievements', JSON.stringify(defaultAchievements));
    return defaultAchievements;
  });
  const [showBadgeUnlock, setShowBadgeUnlock] = useState(false);
  const [newlyUnlockedBadge, setNewlyUnlockedBadge] = useState(null);
  const [hasNewAchievements, setHasNewAchievements] = useState(false);
  const [achievementTab, setAchievementTab] = useState('all');

  // Budget Goals State
  const [budgets, setBudgets] = useState(() => {
    const saved = localStorage.getItem('outgo_budgets');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });
  const [showAddBudget, setShowAddBudget] = useState(false);
  const [newBudget, setNewBudget] = useState({ categoryName: '', amount: '', period: 'month' });
  const [showBudgetAlert, setShowBudgetAlert] = useState(false);
  const [budgetAlert, setBudgetAlert] = useState(null);

  // Spending Insights State
  const [currentInsightIndex, setCurrentInsightIndex] = useState(() => {
    const saved = localStorage.getItem('outgo_current_insight_index');
    return saved ? parseInt(saved, 10) : 0;
  });

  // Update window size for confetti
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchAnalytics = (period) => {
    const now = new Date();
    let startDate = new Date();

    switch (period) {
      case 'today':
        startDate.setHours(0, 0, 0, 0);
        break;
      case 'week':
        startDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(now.getMonth() - 1);
        break;
      case 'year':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
    }

    const allTransactions = getTransactions();
    const filtered = allTransactions.filter(
      (t) => new Date(t.date) >= startDate
    );
    const total = filtered.reduce((sum, t) => sum + parseFloat(t.amount), 0);

    setAnalyticsData({
      period,
      total,
      transactions: filtered,
    });
  };

  const calculateCategoryTotals = (transactions) => {
    // Group transactions by category
    const totals = {};
    let grandTotal = 0;

    transactions.forEach((t) => {
      const amount = parseFloat(t.amount);
      totals[t.category] = (totals[t.category] || 0) + amount;
      grandTotal += amount;
    });

    // Convert to array with percentages
    return Object.entries(totals)
      .map(([category, amount]) => ({
        category,
        amount,
        percentage: grandTotal > 0 ? (amount / grandTotal) * 100 : 0,
      }))
      .sort((a, b) => b.amount - a.amount) // Sort by amount (highest first)
      .filter((item) => item.amount > 0); // Remove $0 categories
  };

  const calculateSpendingStatus = () => {
    const now = new Date();
    let startDate = new Date();

    if (spendingLimit.period === 'week') {
      startDate.setDate(now.getDate() - 7);
    } else if (spendingLimit.period === 'month') {
      startDate.setMonth(now.getMonth() - 1);
    }

    const allTransactions = getTransactions();
    const filtered = allTransactions.filter((t) => new Date(t.date) >= startDate);
    const totalSpent = filtered.reduce((sum, t) => sum + parseFloat(t.amount), 0);
    const percentage = (totalSpent / spendingLimit.amount) * 100;

    return {
      spent: totalSpent,
      limit: spendingLimit.amount,
      percentage: Math.min(percentage, 100),
      isOverLimit: totalSpent > spendingLimit.amount,
    };
  };

  const getThemeColors = () => {
    const status = calculateSpendingStatus();
    const percentage = status.percentage;

    // OutGo minimalist colors
    const cream = { r: 197, g: 185, b: 143 }; // #c5b98f
    const bronze = { r: 170, g: 161, b: 122 }; // #aaa17a
    const rust = { r: 153, g: 124, b: 92 }; // #997c5c
    const darkBrown = { r: 85, g: 85, b: 85 }; // #555555

    // Crimson red variations (pleasant tones)
    const lightCrimson = { r: 220, g: 120, b: 120 }; // Light crimson for cream
    const mediumCrimson = { r: 180, g: 60, b: 60 }; // Medium crimson for bronze
    const darkCrimson = { r: 140, g: 30, b: 30 }; // Dark crimson for rust
    const deepCrimson = { r: 80, g: 20, b: 20 }; // Deep crimson for dark brown

    // Interpolate colors based on percentage (smooth transition from 0% to 100%)
    const lerp = (start, end, t) => Math.round(start + (end - start) * t);
    const t = Math.min(percentage / 100, 1); // Clamp to 1

    const interpolate = (color1, color2, factor) => ({
      r: lerp(color1.r, color2.r, factor),
      g: lerp(color1.g, color2.g, factor),
      b: lerp(color1.b, color2.b, factor),
    });

    const newCream = interpolate(cream, lightCrimson, t);
    const newBronze = interpolate(bronze, mediumCrimson, t);
    const newRust = interpolate(rust, darkCrimson, t);
    const newDarkBrown = interpolate(darkBrown, deepCrimson, t);

    return {
      cream: `rgb(${newCream.r}, ${newCream.g}, ${newCream.b})`,
      bronze: `rgb(${newBronze.r}, ${newBronze.g}, ${newBronze.b})`,
      rust: `rgb(${newRust.r}, ${newRust.g}, ${newRust.b})`,
      darkBrown: `rgb(${newDarkBrown.r}, ${newDarkBrown.g}, ${newDarkBrown.b})`,
    };
  };

  // Achievement Helper Functions
  const getAchievementIcon = (iconName) => {
    const iconMap = {
      Sparkle, Trophy, Star, Crown, Medal, Fire, Target, Lock,
      Coffee, Train, CreditCard, Tag, Heart, Pencil, TrendUp,
      ChartBar, Stack
    };
    return iconMap[iconName] || Sparkle;
  };

  const updateStreak = () => {
    const today = new Date().toISOString().split('T')[0];
    const lastLogDate = achievements.streaks.lastLogDate;

    if (lastLogDate === today) {
      // Already logged today, no streak update needed
      return achievements.streaks.currentStreak;
    }

    let newStreak = 1;
    if (lastLogDate) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      if (lastLogDate === yesterdayStr) {
        // Logged yesterday, increment streak
        newStreak = achievements.streaks.currentStreak + 1;
      }
    }

    const updatedAchievements = {
      ...achievements,
      streaks: {
        currentStreak: newStreak,
        longestStreak: Math.max(newStreak, achievements.streaks.longestStreak),
        lastLogDate: today,
      },
    };

    setAchievements(updatedAchievements);
    localStorage.setItem('outgo_achievements', JSON.stringify(updatedAchievements));
    return newStreak;
  };

  const unlockAchievement = (achievementId) => {
    const alreadyUnlocked = achievements.unlockedBadges.some(
      (b) => b.achievementId === achievementId
    );
    if (alreadyUnlocked) return false;

    const newBadge = {
      achievementId,
      unlockedAt: new Date().toISOString(),
      showcased: achievements.unlockedBadges.length < 3, // Auto-showcase first 3
    };

    const updatedAchievements = {
      ...achievements,
      unlockedBadges: [...achievements.unlockedBadges, newBadge],
    };

    setAchievements(updatedAchievements);
    localStorage.setItem('outgo_achievements', JSON.stringify(updatedAchievements));
    return true;
  };

  const checkAchievements = () => {
    const transactions = getTransactions();
    const newlyUnlocked = [];

    ACHIEVEMENTS.forEach((achievement) => {
      // Skip if already unlocked
      if (achievements.unlockedBadges.some((b) => b.achievementId === achievement.id)) {
        return;
      }

      let isUnlocked = false;
      const req = achievement.requirement;

      switch (req.type) {
        case 'transaction_count':
          isUnlocked = transactions.length >= req.target;
          break;

        case 'consecutive_days':
          isUnlocked = achievements.streaks.currentStreak >= req.target;
          break;

        case 'category_count':
          if (req.condition && req.condition.category) {
            const categoryTransactions = transactions.filter(
              (t) => t.category === req.condition.category
            );
            isUnlocked = categoryTransactions.length >= req.target;
          }
          break;

        case 'single_transaction_amount':
          isUnlocked = transactions.some((t) => parseFloat(t.amount) >= req.target);
          break;

        case 'card_count':
          isUnlocked = cards.length >= req.target;
          break;

        case 'custom_category_count':
          const customCategories = categories.filter((c) => !c.isDefault);
          isUnlocked = customCategories.length >= req.target;
          break;

        case 'spending_limit_set':
          isUnlocked = spendingLimit.amount > 0;
          break;

        case 'transactions_with_description':
          const withDescription = transactions.filter((t) => t.description && t.description.trim());
          isUnlocked = withDescription.length >= req.target;
          break;

        case 'all_default_categories':
          const defaultCategories = ['Coffee', 'Transport', 'Utilities', 'Shopping', 'Health', 'Entertainment'];
          const usedCategories = new Set(transactions.map((t) => t.category));
          const usedDefaultCount = defaultCategories.filter((cat) => usedCategories.has(cat)).length;
          isUnlocked = usedDefaultCount >= req.target;
          break;

        case 'time_based':
          if (transactions.length > 0) {
            const lastTransaction = transactions[transactions.length - 1];
            const hour = new Date(lastTransaction.date).getHours();
            if (req.condition.type === 'before') {
              isUnlocked = hour < req.target;
            } else if (req.condition.type === 'after') {
              isUnlocked = hour >= req.target;
            }
          }
          break;

        default:
          break;
      }

      if (isUnlocked) {
        const wasUnlocked = unlockAchievement(achievement.id);
        if (wasUnlocked) {
          newlyUnlocked.push(achievement);
        }
      }
    });

    // Show badge unlock modal for first newly unlocked achievement
    if (newlyUnlocked.length > 0) {
      setNewlyUnlockedBadge(newlyUnlocked[0]);
      setShowBadgeUnlock(true);
      setHasNewAchievements(true);
    }

    return newlyUnlocked;
  };

  // Budget Goals Helper Functions
  const calculateBudgetStatus = (categoryName, budgetAmount, period) => {
    const now = new Date();
    let startDate = new Date();

    if (period === 'week') {
      startDate.setDate(now.getDate() - 7);
    } else {
      // month
      startDate.setMonth(now.getMonth() - 1);
    }

    const transactions = getTransactions();
    const categoryTransactions = transactions.filter(
      (t) => t.category === categoryName && new Date(t.date) >= startDate
    );

    const spent = categoryTransactions.reduce((sum, t) => sum + parseFloat(t.amount), 0);
    const percentage = budgetAmount > 0 ? (spent / budgetAmount) * 100 : 0;

    // Color thresholds
    let status = 'safe'; // green (0-70%)
    if (percentage >= 90) status = 'danger'; // red (90%+)
    else if (percentage >= 70) status = 'warning'; // yellow (70-90%)

    return {
      spent,
      budget: budgetAmount,
      remaining: budgetAmount - spent,
      percentage,
      status,
      isOverBudget: spent > budgetAmount,
    };
  };

  const handleAddBudget = () => {
    const amount = parseFloat(newBudget.amount);

    if (!newBudget.categoryName || !amount || amount <= 0) {
      return;
    }

    // Check if budget already exists for this category and period
    const exists = budgets.some(
      (b) => b.categoryName === newBudget.categoryName && b.period === newBudget.period
    );

    if (exists) {
      alert(`A ${newBudget.period}ly budget already exists for ${newBudget.categoryName}`);
      return;
    }

    const budget = {
      categoryName: newBudget.categoryName,
      amount,
      period: newBudget.period,
      createdAt: new Date().toISOString(),
    };

    const updated = [...budgets, budget];
    setBudgets(updated);
    localStorage.setItem('outgo_budgets', JSON.stringify(updated));
    setNewBudget({ categoryName: '', amount: '', period: 'month' });
    setShowAddBudget(false);
  };

  const handleDeleteBudget = (categoryName, period) => {
    const updated = budgets.filter(
      (b) => !(b.categoryName === categoryName && b.period === period)
    );
    setBudgets(updated);
    localStorage.setItem('outgo_budgets', JSON.stringify(updated));
  };

  const checkBudgetAlerts = (transactionCategory) => {
    // Find budgets for this category
    const categoryBudgets = budgets.filter((b) => b.categoryName === transactionCategory);

    categoryBudgets.forEach((budget) => {
      const status = calculateBudgetStatus(budget.categoryName, budget.amount, budget.period);

      // Show alert if warning or danger
      if (status.status === 'warning' || status.status === 'danger') {
        setBudgetAlert({
          categoryName: budget.categoryName,
          budget: budget.amount,
          spent: status.spent,
          period: budget.period,
          status: status.status,
        });
        setShowBudgetAlert(true);
      }
    });
  };

  // Spending Insights Functions
  const getMostExpensiveDay = () => {
    const transactions = getTransactions();
    const last30Days = transactions.filter(
      (t) => new Date(t.date) >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    );

    if (last30Days.length === 0) {
      return {
        type: 'most_expensive_day',
        title: 'Biggest Splurge Day',
        value: 'No data yet',
        subtitle: 'Start tracking to see insights',
        icon: 'Fire',
      };
    }

    const dailyTotals = {};
    last30Days.forEach((t) => {
      const date = new Date(t.date).toLocaleDateString();
      dailyTotals[date] = (dailyTotals[date] || 0) + parseFloat(t.amount);
    });

    const mostExpensive = Object.entries(dailyTotals).sort((a, b) => b[1] - a[1])[0];

    return {
      type: 'most_expensive_day',
      title: 'Biggest Splurge Day',
      value: `$${mostExpensive[1].toFixed(2)}`,
      subtitle: new Date(mostExpensive[0]).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
      }),
      icon: 'Fire',
    };
  };

  const getWeekendVsWeekday = () => {
    const transactions = getTransactions();
    const last30Days = transactions.filter(
      (t) => new Date(t.date) >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    );

    if (last30Days.length === 0) {
      return {
        type: 'weekend_vs_weekday',
        title: 'Weekend Warrior?',
        value: 'No data yet',
        subtitle: 'Start tracking to see insights',
        icon: 'CalendarBlank',
      };
    }

    let weekendTotal = 0;
    let weekdayTotal = 0;

    last30Days.forEach((t) => {
      const day = new Date(t.date).getDay();
      if (day === 0 || day === 6) {
        weekendTotal += parseFloat(t.amount);
      } else {
        weekdayTotal += parseFloat(t.amount);
      }
    });

    if (weekendTotal === 0 && weekdayTotal === 0) {
      return {
        type: 'weekend_vs_weekday',
        title: 'Weekend Warrior?',
        value: 'No spending yet',
        subtitle: 'Start tracking to compare',
        icon: 'CalendarBlank',
      };
    }

    let comparison;
    if (weekendTotal > weekdayTotal && weekdayTotal > 0) {
      comparison = `${((weekendTotal / weekdayTotal - 1) * 100).toFixed(0)}% more on weekends`;
    } else if (weekdayTotal > weekendTotal && weekendTotal > 0) {
      comparison = `${((weekdayTotal / weekendTotal - 1) * 100).toFixed(0)}% more on weekdays`;
    } else if (weekendTotal > 0 && weekdayTotal === 0) {
      comparison = 'Only weekend spending';
    } else if (weekdayTotal > 0 && weekendTotal === 0) {
      comparison = 'Only weekday spending';
    } else {
      comparison = 'Equal spending';
    }

    return {
      type: 'weekend_vs_weekday',
      title: 'Weekend Warrior?',
      value: comparison,
      subtitle: `Weekend: $${weekendTotal.toFixed(2)} | Weekday: $${weekdayTotal.toFixed(2)}`,
      icon: 'CalendarBlank',
    };
  };

  const getTopCategory = () => {
    const transactions = getTransactions();
    const thisMonth = transactions.filter(
      (t) => new Date(t.date).getMonth() === new Date().getMonth()
    );

    if (thisMonth.length === 0) {
      return {
        type: 'top_category',
        title: 'Top Category This Month',
        value: 'No data yet',
        subtitle: 'Start tracking to see trends',
        icon: 'TrendUp',
      };
    }

    const categoryTotals = {};
    thisMonth.forEach((t) => {
      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + parseFloat(t.amount);
    });

    const topCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];

    return {
      type: 'top_category',
      title: 'Top Category This Month',
      value: topCategory[0],
      subtitle: `$${topCategory[1].toFixed(2)} spent`,
      icon: 'TrendUp',
    };
  };

  const getAverageTransaction = () => {
    const transactions = getTransactions();
    const last30Days = transactions.filter(
      (t) => new Date(t.date) >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    );

    if (last30Days.length === 0) {
      return {
        type: 'average_transaction',
        title: 'Average Purchase',
        value: 'No data yet',
        subtitle: 'Start tracking to see average',
        icon: 'ChartLine',
      };
    }

    const average =
      last30Days.reduce((sum, t) => sum + parseFloat(t.amount), 0) / last30Days.length;

    return {
      type: 'average_transaction',
      title: 'Average Purchase',
      value: `$${average.toFixed(2)}`,
      subtitle: `Based on ${last30Days.length} transactions`,
      icon: 'ChartLine',
    };
  };

  const getStreakInsight = () => {
    const streak = achievements.streaks.currentStreak;

    const messages = [
      { min: 0, max: 2, text: 'Keep tracking daily!' },
      { min: 3, max: 6, text: 'Building a habit!' },
      { min: 7, max: 13, text: 'Consistency is key!' },
      { min: 14, max: 29, text: "You're on fire!" },
      { min: 30, max: 999, text: 'Tracking legend!' },
    ];

    const message = messages.find((m) => streak >= m.min && streak <= m.max);

    return {
      type: 'streak',
      title: 'Current Streak',
      value: `${streak} ${streak === 1 ? 'day' : 'days'}`,
      subtitle: message.text,
      icon: 'Fire',
    };
  };

  const getAllInsights = () => {
    return [
      getMostExpensiveDay(),
      getWeekendVsWeekday(),
      getTopCategory(),
      getAverageTransaction(),
      getStreakInsight(),
    ];
  };

  const rotateInsight = () => {
    const insights = getAllInsights();
    const nextIndex = (currentInsightIndex + 1) % insights.length;
    setCurrentInsightIndex(nextIndex);
    localStorage.setItem('outgo_current_insight_index', nextIndex.toString());
  };

  const getInsightIcon = (iconName) => {
    const iconMap = {
      Fire: Fire,
      CalendarBlank: CalendarBlank,
      TrendUp: TrendUp,
      ChartLine: ChartLine,
    };
    return iconMap[iconName] || Fire;
  };

  const handleStartTracking = () => {
    setWizardStep(1);
  };

  const handleSaveTransaction = async () => {
    setIsSaving(true);

    // Simulate saving delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 800));

    saveTransaction({
      amount: parseFloat(formData.amount),
      category: formData.category,
      paymentType: formData.paymentType,
      cardId: formData.cardId,
      cardNickname: formData.cardNickname,
      date: formData.date,
      description: formData.description,
      hasPhoto: false,
    });

    // Update streak and check for achievements
    updateStreak();
    checkAchievements();

    // Check budget alerts for this category
    checkBudgetAlerts(formData.category);

    setIsSaving(false);
    setShowConfetti(true);
    setWizardStep(7);

    // Stop confetti after 5 seconds
    setTimeout(() => setShowConfetti(false), 5000);
  };

  const handleTrackAnother = () => {
    setFormData({
      amount: '',
      category: '',
      paymentType: '',
      cardId: '',
      cardNickname: '',
      date: new Date().toISOString(),
      description: '',
    });
    setShowConfetti(false);
    setWizardStep(1);
  };

  const handleDone = () => {
    setFormData({
      amount: '',
      category: '',
      paymentType: '',
      cardId: '',
      cardNickname: '',
      date: new Date().toISOString(),
      description: '',
    });
    setShowConfetti(false);
    setWizardStep(0);
  };

  const handleSetDate = (type) => {
    const date = new Date();
    if (type === 'yesterday') {
      date.setDate(date.getDate() - 1);
    }
    setFormData({ ...formData, date: date.toISOString() });
    setWizardStep(6);
  };

  const handleGoBack = () => {
    // Handle going back in wizard, accounting for conditional card selection step
    if (wizardStep === 1) {
      // From amount input, go back to home
      setWizardStep(0);
      setCurrentView('home');
    } else if (wizardStep === 2) {
      // From category selection, go back to amount
      setWizardStep(1);
    } else if (wizardStep === 3) {
      // From payment type, go back to category
      setWizardStep(2);
    } else if (wizardStep === 4) {
      // From card selection, go back to payment type
      setWizardStep(3);
    } else if (wizardStep === 5) {
      // From date selection, check if we came from card selection or payment type
      if (formData.paymentType === 'Card') {
        setWizardStep(4); // Go back to card selection
      } else {
        setWizardStep(3); // Go back to payment type
      }
      setShowCustomDate(false); // Reset custom date picker
    } else if (wizardStep === 6) {
      // From description, go back to date
      setWizardStep(5);
    }
  };

  const handleAddCard = () => {
    if (newCard.nickname && newCard.lastFour.length === 4) {
      const updatedCards = [...cards, { ...newCard, id: Date.now().toString() }];
      setCards(updatedCards);
      localStorage.setItem('outgo_cards', JSON.stringify(updatedCards));
      setNewCard({ nickname: '', lastFour: '' });
      setShowAddCard(false);
    }
  };

  const handleDeleteCard = (id) => {
    const updatedCards = cards.filter((card) => card.id !== id);
    setCards(updatedCards);
    localStorage.setItem('outgo_cards', JSON.stringify(updatedCards));
  };

  const handleAddCategory = () => {
    if (!newCategory.name.trim()) return;

    const category = {
      id: Date.now().toString(),
      name: newCategory.name.trim(),
      iconName: newCategory.iconName,
      isDefault: false,
      createdAt: new Date().toISOString(),
    };

    const updated = [...categories, category];
    setCategories(updated);
    localStorage.setItem('outgo_categories', JSON.stringify(updated));
    setNewCategory({ name: '', iconName: 'Tag' });
    setShowAddCategory(false);
  };

  const handleDeleteCategory = (id) => {
    // Check if category has transactions
    const transactions = getTransactions();
    const category = categories.find((c) => c.id === id);
    if (!category) return;

    const usageCount = transactions.filter((t) => t.category === category.name).length;

    if (usageCount > 0) {
      alert(`Cannot delete: ${usageCount} transaction(s) use this category`);
      return;
    }

    // Prevent deleting default categories
    if (category.isDefault) {
      alert('Cannot delete default categories');
      return;
    }

    const updated = categories.filter((c) => c.id !== id);
    setCategories(updated);
    localStorage.setItem('outgo_categories', JSON.stringify(updated));
  };

  const handleUpdateSpendingLimit = () => {
    const amount = parseFloat(tempLimit.amount);
    if (!amount || amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    const newLimit = {
      amount,
      period: tempLimit.period,
    };

    setSpendingLimit(newLimit);
    localStorage.setItem('outgo_spending_limit', JSON.stringify(newLimit));
    setShowEditLimit(false);
    setTempLimit({ amount: '', period: 'month' });
  };

  // =============================================
  // RENDER: Achievements View
  // =============================================
  if (currentView === 'achievements') {
    const unlockedCount = achievements.unlockedBadges.length;
    const currentStreak = achievements.streaks.currentStreak;
    const completionPercentage = Math.round((unlockedCount / ACHIEVEMENTS.length) * 100);

    // Filter achievements based on active tab
    let filteredAchievements = ACHIEVEMENTS;
    if (achievementTab === 'unlocked') {
      filteredAchievements = ACHIEVEMENTS.filter((a) =>
        achievements.unlockedBadges.some((b) => b.achievementId === a.id)
      );
    } else if (achievementTab === 'locked') {
      filteredAchievements = ACHIEVEMENTS.filter(
        (a) => !achievements.unlockedBadges.some((b) => b.achievementId === a.id)
      );
    } else if (achievementTab === 'in progress') {
      filteredAchievements = ACHIEVEMENTS.filter((a) => {
        const isUnlocked = achievements.unlockedBadges.some((b) => b.achievementId === a.id);
        if (isUnlocked) return false;

        const progress = achievements.progress[a.id];
        return progress && progress.current > 0 && progress.current < progress.target;
      });
    }

    const toggleShowcase = (achievementId) => {
      const badge = achievements.unlockedBadges.find((b) => b.achievementId === achievementId);
      if (!badge) return;

      const showcasedCount = achievements.unlockedBadges.filter((b) => b.showcased).length;

      // If already showcased, remove from showcase
      if (badge.showcased) {
        const updatedBadges = achievements.unlockedBadges.map((b) =>
          b.achievementId === achievementId ? { ...b, showcased: false } : b
        );
        const updatedAchievements = { ...achievements, unlockedBadges: updatedBadges };
        setAchievements(updatedAchievements);
        localStorage.setItem('outgo_achievements', JSON.stringify(updatedAchievements));
      } else if (showcasedCount < 3) {
        // Add to showcase if less than 3
        const updatedBadges = achievements.unlockedBadges.map((b) =>
          b.achievementId === achievementId ? { ...b, showcased: true } : b
        );
        const updatedAchievements = { ...achievements, unlockedBadges: updatedBadges };
        setAchievements(updatedAchievements);
        localStorage.setItem('outgo_achievements', JSON.stringify(updatedAchievements));
      }
    };

    return (
      <div className="min-h-screen bg-[#c5b98f] p-4">
        <div className="w-full max-w-md mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => {
                setCurrentView('home');
                setHasNewAchievements(false);
              }}
              className="text-sm text-[#555555] hover:text-[#784c33] transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft size={14} weight="regular" />
              <span>Back</span>
            </button>
            <h1 className="text-[#555555] text-2xl font-bold">Achievements</h1>
            <div className="w-10" />
          </div>

          {/* Stats Card */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white rounded-xl p-5 mb-4"
          >
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-3xl font-bold text-[#997c5c]">{unlockedCount}</p>
                <p className="text-xs text-[#aaa17a]">Unlocked</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[#997c5c]">{currentStreak}</p>
                <p className="text-xs text-[#aaa17a]">Day Streak</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[#997c5c]">{completionPercentage}%</p>
                <p className="text-xs text-[#aaa17a]">Complete</p>
              </div>
            </div>
          </motion.div>

          {/* Category Tabs */}
          <div className="flex gap-2 mb-4 overflow-x-auto">
            {['all', 'unlocked', 'locked', 'in progress'].map((tab) => (
              <button
                key={tab}
                onClick={() => setAchievementTab(tab)}
                className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap transition ${
                  achievementTab === tab
                    ? 'bg-[#997c5c] text-white'
                    : 'bg-white text-[#555555] border border-[#aaa17a]'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Achievements List */}
          <div className="space-y-3">
            {filteredAchievements.map((achievement, index) => {
              const isUnlocked = achievements.unlockedBadges.some(
                (b) => b.achievementId === achievement.id
              );
              const progress = achievements.progress[achievement.id];
              const badge = achievements.unlockedBadges.find((b) => b.achievementId === achievement.id);
              const isShowcased = badge?.showcased || false;
              const AchievementIcon = getAchievementIcon(achievement.icon);

              return (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`bg-white rounded-xl p-4 border ${
                    isUnlocked ? 'border-[#997c5c]' : 'border-[#aaa17a]/30'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Badge Icon */}
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isUnlocked
                          ? 'bg-gradient-to-br from-[#c5b98f] to-[#aaa17a]'
                          : 'bg-gray-200'
                      }`}
                    >
                      <AchievementIcon
                        size={28}
                        className={isUnlocked ? 'text-[#997c5c]' : 'text-gray-400'}
                        weight={isUnlocked ? 'fill' : 'regular'}
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3
                          className={`font-bold ${
                            isUnlocked ? 'text-[#555555]' : 'text-gray-500'
                          }`}
                        >
                          {achievement.name}
                        </h3>
                        {isUnlocked && (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => toggleShowcase(achievement.id)}
                            className={`p-1 rounded-full ${
                              isShowcased ? 'bg-[#997c5c]' : 'bg-gray-300'
                            }`}
                          >
                            <Star
                              size={16}
                              className="text-white"
                              weight={isShowcased ? 'fill' : 'regular'}
                            />
                          </motion.button>
                        )}
                      </div>

                      <p className="text-xs text-[#aaa17a] mb-2">{achievement.description}</p>

                      {/* Progress Bar (for locked/in-progress) */}
                      {!isUnlocked && progress && (
                        <div>
                          <div className="flex items-center justify-between text-xs text-[#aaa17a] mb-1">
                            <span>Progress</span>
                            <span>
                              {progress.current} / {progress.target}
                            </span>
                          </div>
                          <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{
                                width: `${(progress.current / progress.target) * 100}%`,
                              }}
                              className="h-full bg-[#997c5c] rounded-full"
                            />
                          </div>
                        </div>
                      )}

                      {/* Unlock Date */}
                      {isUnlocked && badge && (
                        <p className="text-xs text-green-600 font-medium">
                          ✓ Unlocked {new Date(badge.unlockedAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // =============================================
  // RENDER: Profile View
  // =============================================
  if (currentView === 'profile') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-[#c5b98f] p-4"
      >
        <div className="w-full max-w-md mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setCurrentView('home')}
              className="text-sm text-[#555555] hover:text-[#784c33] transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft size={14} weight="regular" />
              <span>Back</span>
            </button>
            <h1 className="text-[#555555] text-2xl font-bold">Profile</h1>
            <div className="w-10" />
          </div>

          {/* Badge Showcase */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.05 }}
            className="bg-gradient-to-br from-[#997c5c] to-[#555555] rounded-xl p-5 mb-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[#c5b98f] text-lg font-bold">Badge Showcase</h2>
              <span className="text-[#aaa17a] text-sm">
                {achievements.unlockedBadges.length}/{ACHIEVEMENTS.length} Unlocked
              </span>
            </div>

            {/* Showcased Badges Grid */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              {achievements.unlockedBadges
                .filter((badge) => badge.showcased)
                .slice(0, 3)
                .map((badge, index) => {
                  const achievement = ACHIEVEMENTS.find((a) => a.id === badge.achievementId);
                  if (!achievement) return null;

                  const AchievementIcon = getAchievementIcon(achievement.icon);

                  return (
                    <motion.div
                      key={badge.achievementId}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative flex flex-col items-center"
                    >
                      <div className="w-16 h-16 bg-[#c5b98f] rounded-full flex items-center justify-center mb-2">
                        <AchievementIcon size={32} className="text-[#997c5c]" weight="fill" />
                      </div>
                      <span className="text-[#c5b98f] text-xs text-center font-medium">
                        {achievement.name}
                      </span>
                    </motion.div>
                  );
                })}

              {/* Empty slots if less than 3 badges */}
              {[
                ...Array(
                  Math.max(
                    0,
                    3 - achievements.unlockedBadges.filter((b) => b.showcased).length
                  )
                ),
              ].map((_, i) => (
                <div key={`empty-${i}`} className="flex flex-col items-center">
                  <div className="w-16 h-16 border border-dashed border-[#aaa17a] rounded-full flex items-center justify-center mb-2">
                    <Lock size={24} className="text-[#aaa17a]" />
                  </div>
                  <span className="text-[#aaa17a] text-xs">Empty</span>
                </div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setCurrentView('achievements')}
              className="w-full py-2 bg-[#c5b98f] text-[#555555] rounded-xl font-semibold hover:bg-[#aaa17a] hover:text-white transition"
            >
              View All Achievements
            </motion.button>
          </motion.div>

          {/* Account Section */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-5 mb-4"
          >
            <h2 className="text-[#555555] text-lg font-bold mb-4">Account</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#555555] font-medium">Guest User</p>
                <p className="text-[#aaa17a] text-sm">Using LocalStorage</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-[#997c5c] text-white rounded-xl text-sm font-semibold"
              >
                <SignOut size={18} />
                Logout
              </motion.button>
            </div>
          </motion.div>

          {/* Payment Methods Section */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-5 mb-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[#555555] text-lg font-bold">Payment Methods</h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAddCard(!showAddCard)}
                className="p-2 bg-[#997c5c] text-white rounded-full"
              >
                {showAddCard ? <X size={20} /> : <Plus size={20} />}
              </motion.button>
            </div>

            {/* Add Card Form */}
            <AnimatePresence>
              {showAddCard && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mb-4 overflow-hidden"
                >
                  <div className="border border-[#aaa17a] rounded-xl p-4">
                    <input
                      type="text"
                      placeholder="Card Nickname (e.g., Chase Sapphire)"
                      value={newCard.nickname}
                      onChange={(e) =>
                        setNewCard({ ...newCard, nickname: e.target.value })
                      }
                      className="w-full mb-3 px-3 py-2 border border-[#aaa17a] rounded-lg text-[#555555] outline-none focus:ring-2 focus:ring-[#997c5c]"
                    />
                    <input
                      type="text"
                      placeholder="Last 4 Digits"
                      maxLength={4}
                      value={newCard.lastFour}
                      onChange={(e) =>
                        setNewCard({ ...newCard, lastFour: e.target.value.replace(/\D/g, '') })
                      }
                      className="w-full mb-3 px-3 py-2 border border-[#aaa17a] rounded-lg text-[#555555] outline-none focus:ring-2 focus:ring-[#997c5c]"
                    />
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleAddCard}
                      className="w-full py-2 bg-[#997c5c] text-white rounded-lg font-semibold"
                    >
                      Add Card
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Cards List */}
            <div className="space-y-3">
              {cards.length === 0 ? (
                <p className="text-[#aaa17a] text-sm text-center py-4">
                  No cards added yet
                </p>
              ) : (
                cards.map((card, index) => (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-3 border border-[#aaa17a] rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard size={24} className="text-[#997c5c]" />
                      <div>
                        <p className="text-[#555555] font-medium">{card.nickname}</p>
                        <p className="text-[#aaa17a] text-sm">•••• {card.lastFour}</p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDeleteCard(card.id)}
                      className="p-2 text-[#997c5c] hover:bg-[#997c5c]/10 rounded-lg"
                    >
                      <Trash size={20} />
                    </motion.button>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>

          {/* Spending Limit Section */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-5 mb-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[#555555] text-lg font-bold">Spending Limit</h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setShowEditLimit(!showEditLimit);
                  if (!showEditLimit) {
                    setTempLimit({ amount: spendingLimit.amount.toString(), period: spendingLimit.period });
                  }
                }}
                className="p-2 bg-[#997c5c] text-white rounded-full"
              >
                {showEditLimit ? <X size={20} /> : <Pencil size={20} />}
              </motion.button>
            </div>

            {/* Current Limit Display */}
            {!showEditLimit && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border border-[#aaa17a] rounded-xl p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#aaa17a] text-sm">Current Limit</span>
                  <span className="text-[#555555] text-2xl font-bold">${spendingLimit.amount}</span>
                </div>
                <p className="text-[#aaa17a] text-xs">
                  Per {spendingLimit.period === 'week' ? 'Week' : 'Month'}
                </p>
                {(() => {
                  const status = calculateSpendingStatus();
                  return (
                    <div className="mt-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-[#aaa17a]">
                          ${status.spent.toFixed(2)} spent
                        </span>
                        <span className="text-xs text-[#aaa17a]">
                          {status.percentage.toFixed(0)}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-[#aaa17a]/20 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${status.percentage}%` }}
                          transition={{ duration: 0.5 }}
                          className={`h-full rounded-full ${
                            status.isOverLimit ? 'bg-red-500' : 'bg-[#997c5c]'
                          }`}
                        />
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            )}

            {/* Edit Limit Form */}
            <AnimatePresence>
              {showEditLimit && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="border border-[#aaa17a] rounded-xl p-4">
                    <input
                      type="number"
                      placeholder="Amount (e.g., 1000)"
                      value={tempLimit.amount}
                      onChange={(e) => setTempLimit({ ...tempLimit, amount: e.target.value })}
                      className="w-full mb-3 px-3 py-2 border border-[#aaa17a] rounded-lg text-[#555555] outline-none focus:ring-2 focus:ring-[#997c5c]"
                    />

                    {/* Period Selector */}
                    <div className="flex gap-2 mb-3">
                      <button
                        onClick={() => setTempLimit({ ...tempLimit, period: 'week' })}
                        className={`flex-1 py-2 rounded-lg border transition ${
                          tempLimit.period === 'week'
                            ? 'border-[#997c5c] bg-[#997c5c] text-white'
                            : 'border-[#aaa17a] text-[#555555] hover:border-[#997c5c]'
                        }`}
                      >
                        Weekly
                      </button>
                      <button
                        onClick={() => setTempLimit({ ...tempLimit, period: 'month' })}
                        className={`flex-1 py-2 rounded-lg border transition ${
                          tempLimit.period === 'month'
                            ? 'border-[#997c5c] bg-[#997c5c] text-white'
                            : 'border-[#aaa17a] text-[#555555] hover:border-[#997c5c]'
                        }`}
                      >
                        Monthly
                      </button>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleUpdateSpendingLimit}
                      className="w-full py-2 bg-[#997c5c] text-white rounded-lg font-semibold"
                    >
                      Update Limit
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Budget Goals Section */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="bg-white rounded-xl p-5 mb-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[#555555] text-lg font-bold">Budget Goals</h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAddBudget(!showAddBudget)}
                className="p-2 bg-[#997c5c] text-white rounded-full"
              >
                {showAddBudget ? <X size={20} /> : <Plus size={20} />}
              </motion.button>
            </div>

            {/* Add Budget Form */}
            <AnimatePresence>
              {showAddBudget && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mb-4 overflow-hidden"
                >
                  <div className="border border-[#aaa17a] rounded-xl p-4">
                    {/* Category Selector */}
                    <select
                      value={newBudget.categoryName}
                      onChange={(e) =>
                        setNewBudget({ ...newBudget, categoryName: e.target.value })
                      }
                      className="w-full mb-3 px-3 py-2 border border-[#aaa17a] rounded-lg text-[#555555] outline-none focus:ring-2 focus:ring-[#997c5c]"
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.name}>
                          {cat.name}
                        </option>
                      ))}
                    </select>

                    {/* Amount Input */}
                    <input
                      type="number"
                      placeholder="Budget Amount (e.g., 100)"
                      value={newBudget.amount}
                      onChange={(e) => setNewBudget({ ...newBudget, amount: e.target.value })}
                      className="w-full mb-3 px-3 py-2 border border-[#aaa17a] rounded-lg text-[#555555] outline-none focus:ring-2 focus:ring-[#997c5c]"
                    />

                    {/* Period Selector */}
                    <div className="flex gap-2 mb-3">
                      <button
                        onClick={() => setNewBudget({ ...newBudget, period: 'week' })}
                        className={`flex-1 py-2 rounded-lg border transition ${
                          newBudget.period === 'week'
                            ? 'border-[#997c5c] bg-[#997c5c] text-white'
                            : 'border-[#aaa17a] text-[#555555]'
                        }`}
                      >
                        Weekly
                      </button>
                      <button
                        onClick={() => setNewBudget({ ...newBudget, period: 'month' })}
                        className={`flex-1 py-2 rounded-lg border transition ${
                          newBudget.period === 'month'
                            ? 'border-[#997c5c] bg-[#997c5c] text-white'
                            : 'border-[#aaa17a] text-[#555555]'
                        }`}
                      >
                        Monthly
                      </button>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleAddBudget}
                      className="w-full py-2 bg-[#997c5c] text-white rounded-lg font-semibold"
                    >
                      Add Budget Goal
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Budget List */}
            <div className="space-y-3">
              {budgets.length === 0 ? (
                <p className="text-[#aaa17a] text-sm text-center py-4">
                  No budget goals set yet
                </p>
              ) : (
                budgets.map((budget, index) => {
                  const status = calculateBudgetStatus(
                    budget.categoryName,
                    budget.amount,
                    budget.period
                  );
                  const category = categories.find((c) => c.name === budget.categoryName);
                  const IconComponent = category
                    ? CATEGORY_ICONS.find((ic) => ic.name === category.iconName)?.component
                    : Tag;

                  // Color based on status
                  const statusColors = {
                    safe: { bg: 'bg-green-500', text: 'text-green-600' },
                    warning: { bg: 'bg-amber-500', text: 'text-amber-600' },
                    danger: { bg: 'bg-red-500', text: 'text-red-600' },
                  };

                  return (
                    <motion.div
                      key={`${budget.categoryName}-${budget.period}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border border-[#aaa17a] rounded-xl p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <IconComponent size={20} className="text-[#997c5c]" />
                          <span className="text-[#555555] font-semibold">
                            {budget.categoryName}
                          </span>
                          <span className="text-xs text-[#aaa17a]">
                            ({budget.period === 'week' ? 'Weekly' : 'Monthly'})
                          </span>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDeleteBudget(budget.categoryName, budget.period)}
                          className="p-1 text-[#997c5c] hover:bg-[#997c5c]/10 rounded"
                        >
                          <Trash size={16} />
                        </motion.button>
                      </div>

                      <div className="flex items-center justify-between mb-1 text-sm">
                        <span className={statusColors[status.status].text}>
                          ${status.spent.toFixed(2)} / ${budget.amount}
                        </span>
                        <span className={statusColors[status.status].text + ' font-semibold'}>
                          {status.percentage.toFixed(0)}%
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(status.percentage, 100)}%` }}
                          transition={{ duration: 0.5 }}
                          className={`h-full rounded-full ${statusColors[status.status].bg}`}
                        />
                      </div>

                      {/* Status Messages */}
                      {status.isOverBudget && (
                        <p className="text-xs text-red-600 mt-2 font-medium">
                          Over budget by ${Math.abs(status.remaining).toFixed(2)}!
                        </p>
                      )}
                      {status.status === 'warning' && !status.isOverBudget && (
                        <p className="text-xs text-amber-600 mt-2 font-medium">
                          ${status.remaining.toFixed(2)} remaining - watch your spending!
                        </p>
                      )}
                      {status.status === 'safe' && (
                        <p className="text-xs text-green-600 mt-2 font-medium">
                          ${status.remaining.toFixed(2)} remaining - looking good!
                        </p>
                      )}
                    </motion.div>
                  );
                })
              )}
            </div>
          </motion.div>

          {/* Categories Section */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[#555555] text-lg font-bold">Categories</h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowAddCategory(!showAddCategory)}
                className="p-2 bg-[#997c5c] text-white rounded-full"
              >
                {showAddCategory ? <X size={20} /> : <Plus size={20} />}
              </motion.button>
            </div>

            {/* Add Category Form */}
            <AnimatePresence>
              {showAddCategory && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mb-4 overflow-hidden"
                >
                  <div className="border border-[#aaa17a] rounded-xl p-4">
                    <input
                      type="text"
                      placeholder="Category Name (e.g., Groceries)"
                      value={newCategory.name}
                      onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                      className="w-full mb-3 px-3 py-2 border border-[#aaa17a] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#997c5c]"
                    />

                    {/* Icon Selector Button */}
                    <button
                      onClick={() => setShowIconPicker(true)}
                      className="w-full mb-3 p-3 border border-[#aaa17a] rounded-xl flex items-center justify-between hover:border-[#997c5c] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {(() => {
                          const CurrentIcon = CATEGORY_ICONS.find((ic) => ic.name === newCategory.iconName)?.component || Tag;
                          return <CurrentIcon size={24} className="text-[#997c5c]" />;
                        })()}
                        <span className="text-[#555555]">Select Icon</span>
                      </div>
                      <ArrowRight size={20} className="text-[#aaa17a]" />
                    </button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleAddCategory}
                      className="w-full py-2 bg-[#997c5c] text-white rounded-lg font-semibold"
                    >
                      Add Category
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Categories Grid */}
            <div className="grid grid-cols-3 gap-3">
              {categories.map((cat, index) => {
                const IconComponent = CATEGORY_ICONS.find((ic) => ic.name === cat.iconName)?.component || Tag;

                return (
                  <motion.div
                    key={cat.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="relative flex flex-col items-center gap-2 p-3 border border-[#aaa17a] rounded-xl"
                  >
                    <IconComponent size={28} className="text-[#997c5c]" />
                    <span className="text-xs text-[#555555] font-medium text-center">
                      {cat.name}
                    </span>

                    {/* Delete button (only for non-default categories) */}
                    {!cat.isDefault && (
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDeleteCategory(cat.id)}
                        className="absolute -top-2 -right-2 p-1 bg-[#997c5c] text-white rounded-full"
                      >
                        <X size={12} />
                      </motion.button>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Icon Picker Modal */}
        <AnimatePresence>
          {showIconPicker && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={() => setShowIconPicker(false)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-xl p-5 max-w-md w-full"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-[#555555] text-xl font-bold">Choose Icon</h3>
                  <button onClick={() => setShowIconPicker(false)}>
                    <X size={24} className="text-[#555555]" />
                  </button>
                </div>

                <div className="grid grid-cols-5 gap-3 max-h-96 overflow-y-auto">
                  {CATEGORY_ICONS.map((iconObj) => {
                    const Icon = iconObj.component;
                    const isSelected = newCategory.iconName === iconObj.name;

                    return (
                      <motion.button
                        key={iconObj.name}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setNewCategory({ ...newCategory, iconName: iconObj.name });
                          setShowIconPicker(false);
                        }}
                        className={`aspect-square p-3 rounded-xl border flex items-center justify-center ${
                          isSelected
                            ? 'border-[#997c5c] bg-[#997c5c]/10'
                            : 'border-[#aaa17a] hover:border-[#997c5c]'
                        }`}
                      >
                        <Icon size={28} className={isSelected ? 'text-[#997c5c]' : 'text-[#aaa17a]'} />
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }

  // =============================================
  // RENDER: Analytics View
  // =============================================
  if (currentView === 'analytics') {
    console.log('Rendering analytics view');
    const spendingStatus = calculateSpendingStatus();
    const periodLabels = {
      today: 'Today',
      week: 'This Week',
      month: 'This Month',
      year: 'This Year',
    };

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-[#c5b98f] flex items-center justify-center p-4"
      >
        <div className="w-full max-w-md">
          {/* Spending Limit Overview */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.05 }}
            className="bg-[#c5b98f] rounded-xl p-5 border border-[#aaa17a]/20 mb-4"
          >
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-tiny text-[#503f37]/70">
                {spendingLimit.period === 'week' ? 'This Week' : 'This Month'}
              </span>
              <span className="text-tiny text-[#503f37]/70">
                of ${spendingLimit.amount}
              </span>
            </div>

            <div className="text-display text-[#555555] mb-3">
              ${spendingStatus.spent.toFixed(2)}
            </div>

            <div className="w-full h-1.5 bg-[#aaa17a]/20 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(spendingStatus.percentage, 100)}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="h-full rounded-full"
                style={{
                  backgroundColor: spendingStatus.isOverLimit ? '#ef4444' : '#784c33',
                }}
              />
            </div>

            {spendingStatus.isOverLimit && (
              <p className="text-tiny text-red-600 mt-2 text-center">
                You've exceeded your spending limit
              </p>
            )}
          </motion.div>

          {/* Main Analytics Card */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-[#555555] rounded-xl p-5 mb-6"
          >
            {/* Top Section: Spent Amount */}
            <div className="flex items-start justify-between mb-8">
              {/* Left: Focus */}
              <div>
                <motion.p
                  key={analyticsData.period}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[#aaa17a] text-sm mb-2"
                >
                  Spent {periodLabels[analyticsData.period]}
                </motion.p>
                <motion.p
                  key={analyticsData.total}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="text-[#c5b98f] text-5xl font-bold"
                >
                  ${analyticsData.total.toFixed(2)}
                </motion.p>
              </div>

              {/* Right: Period Selector */}
              <div className="flex flex-col gap-3">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => fetchAnalytics('week')}
                  className={`p-2 rounded-lg transition ${
                    analyticsData.period === 'week'
                      ? 'bg-[#997c5c] text-[#c5b98f]'
                      : 'text-[#aaa17a] hover:bg-[#997c5c]/20'
                  }`}
                >
                  <CalendarPlus size={24} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => fetchAnalytics('month')}
                  className={`p-2 rounded-lg transition ${
                    analyticsData.period === 'month'
                      ? 'bg-[#997c5c] text-[#c5b98f]'
                      : 'text-[#aaa17a] hover:bg-[#997c5c]/20'
                  }`}
                >
                  <CalendarBlank size={24} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => fetchAnalytics('year')}
                  className={`p-2 rounded-lg transition ${
                    analyticsData.period === 'year'
                      ? 'bg-[#997c5c] text-[#c5b98f]'
                      : 'text-[#aaa17a] hover:bg-[#997c5c]/20'
                  }`}
                >
                  <Stack size={24} />
                </motion.button>
              </div>
            </div>

            {/* Bottom Section: Ledger */}
            <div>
              <h3 className="text-[#aaa17a] text-sm mb-4">
                {periodLabels[analyticsData.period]}'s Ledger
              </h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                <AnimatePresence>
                  {analyticsData.transactions.map((transaction, index) => {
                    const category = categories.find((c) => c.name === transaction.category);
                    const CategoryIcon = category
                      ? CATEGORY_ICONS.find((ic) => ic.name === category.iconName)?.component
                      : null;
                    const FinalIcon = CategoryIcon || Tag;

                    return (
                      <motion.div
                        key={transaction.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center justify-between text-[#c5b98f]"
                      >
                        <div className="flex items-center gap-3">
                          <FinalIcon size={20} className="text-[#aaa17a]" />
                          <span className="text-sm">
                            {transaction.description || transaction.category}
                          </span>
                        </div>
                        <span className="font-semibold">
                          ${parseFloat(transaction.amount).toFixed(2)}
                        </span>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Category Spending Breakdown */}
          {analyticsData.transactions.length > 0 && (() => {
            const categoryBreakdown = calculateCategoryTotals(analyticsData.transactions);

            return categoryBreakdown.length > 0 ? (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-[#555555] rounded-xl p-5 mb-6"
              >
                <h3 className="text-[#aaa17a] text-sm mb-4">Breakdown by Category</h3>

                <div className="space-y-4">
                  {categoryBreakdown.map((item, index) => {
                    const category = categories.find((c) => c.name === item.category);
                    const IconComponent = category
                      ? CATEGORY_ICONS.find((ic) => ic.name === category.iconName)?.component
                      : null;
                    const FinalIcon = IconComponent || Tag;

                    return (
                      <motion.div
                        key={item.category}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center gap-3"
                      >
                        {/* Icon */}
                        <FinalIcon size={20} className="text-[#aaa17a] flex-shrink-0" />

                        {/* Category Name */}
                        <span className="text-[#c5b98f] text-sm w-24 flex-shrink-0">
                          {item.category}
                        </span>

                        {/* Amount */}
                        <span className="text-[#c5b98f] text-sm font-semibold w-16 text-right flex-shrink-0">
                          ${item.amount.toFixed(2)}
                        </span>

                        {/* Progress Bar */}
                        <div className="flex-1 h-2 bg-[#aaa17a]/20 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${item.percentage}%` }}
                            transition={{ duration: 0.5, delay: index * 0.05 + 0.2 }}
                            className="h-full bg-[#c5b98f] rounded-full"
                          />
                        </div>

                        {/* Percentage */}
                        <span className="text-[#aaa17a] text-xs w-10 text-right flex-shrink-0">
                          {item.percentage.toFixed(0)}%
                        </span>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Total */}
                <div className="mt-6 pt-4 border-t border-[#aaa17a]/30 flex items-center justify-between">
                  <span className="text-[#aaa17a] text-sm font-semibold">Total</span>
                  <span className="text-[#c5b98f] text-lg font-bold">
                    ${analyticsData.total.toFixed(2)}
                  </span>
                </div>
              </motion.div>
            ) : null;
          })()}

          {/* Spending Insights Card */}
          {(() => {
            const insights = getAllInsights();
            const currentInsight = insights[currentInsightIndex % insights.length];
            const InsightIcon = getInsightIcon(currentInsight.icon);

            return (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="w-full bg-[#555555] rounded-xl p-5 mb-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <InsightIcon size={20} className="text-[#c5b98f]" weight="regular" />
                    <h3 className="text-[#c5b98f] text-sm">
                      {currentInsight.title}
                    </h3>
                  </div>
                  <button
                    onClick={rotateInsight}
                    className="p-1 text-[#aaa17a] hover:text-[#c5b98f] transition-colors"
                  >
                    <ArrowsClockwise size={16} />
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentInsight.type}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-[#c5b98f] text-2xl mb-1">
                      {currentInsight.value}
                    </p>
                    <p className="text-[#aaa17a] text-tiny">{currentInsight.subtitle}</p>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            );
          })()}

          {/* Back to Home Button */}
          <button
            onClick={() => setCurrentView('home')}
            className="text-sm text-center text-[#555555] hover:text-[#784c33] transition-colors w-full flex items-center justify-center gap-1.5 mt-4"
          >
            <ArrowLeft size={14} weight="regular" />
            <span>Back to Home</span>
          </button>
        </div>
      </motion.div>
    );
  }

  // =============================================
  // RENDER: Home View (Wizard)
  // =============================================
  const themeColors = getThemeColors();
  const spendingStatus = calculateSpendingStatus();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-1000"
      style={{ backgroundColor: themeColors.cream }}
    >
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
          colors={['#c5b98f', '#555555', '#aaa17a', '#997c5c']}
        />
      )}

      <div className="w-full max-w-md">
        <AnimatePresence mode="wait">
          {/* Step 0: Resting State */}
          {wizardStep === 0 && (
            <motion.div
              key="step-0"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col items-center justify-center min-h-[60vh]"
            >

              {/* Start Tracking Button */}
              <button
                onClick={handleStartTracking}
                className="w-40 h-40 rounded-full border border-[#aaa17a] bg-[#997c5c]/10 flex items-center justify-center text-lg font-semibold text-[#555555] hover:bg-[#997c5c]/20 hover:border-[#784c33] transition-all mb-12"
              >
                Start Tracking
              </button>

              {/* Bottom Navigation */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex gap-6"
              >
                <button
                  type="button"
                  onClick={() => {
                    console.log('Analytics button clicked');
                    setCurrentView('analytics');
                    fetchAnalytics('today');
                  }}
                  className="relative p-2 rounded-lg transition-colors text-[#555555] hover:text-[#784c33]"
                >
                  <ChartBar size={20} weight="regular" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentView('achievements');
                    setHasNewAchievements(false);
                  }}
                  className="relative p-2 rounded-lg transition-colors text-[#555555] hover:text-[#784c33]"
                >
                  <Trophy size={20} weight="regular" />
                  {hasNewAchievements && (
                    <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentView('profile')}
                  className="relative p-2 rounded-lg transition-colors text-[#555555] hover:text-[#784c33]"
                >
                  <User size={20} weight="regular" />
                </button>
              </motion.div>
            </motion.div>
          )}

          {/* Step 1: Amount Input */}
          {wizardStep === 1 && (
            <>
              <motion.div
                key="step-1"
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-white rounded-xl p-8"
              >
                <motion.h2
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-[#555555] text-2xl font-bold mb-6 text-center"
                >
                  How much?
                </motion.h2>

                {/* Styled Input Container */}
                <div className="flex items-center justify-center mb-6">
                  <div
                    className="w-[280px] h-[80px] flex items-center justify-center rounded-[40px] overflow-hidden cursor-pointer"
                    style={{
                      background: 'linear-gradient(to bottom, #c5b98f, #f5e6cc)',
                      boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.075)',
                    }}
                  >
                    <div className="relative w-[268px] h-[68px]">
                      <span
                        className="absolute left-[24px] top-1/2 -translate-y-1/2 text-[#555555] font-bold pointer-events-none"
                        style={{ fontSize: '2.5rem' }}
                      >
                        $
                      </span>
                      <input
                        type="number"
                        autoFocus
                        value={formData.amount}
                        onChange={(e) =>
                          setFormData({ ...formData, amount: e.target.value })
                        }
                        className="w-full h-full border-none outline-none bg-white rounded-[30px] text-[#555555] font-bold text-center"
                        style={{
                          caretColor: '#997c5c',
                          paddingLeft: '48px',
                          letterSpacing: '1px',
                          fontSize: '2.5rem',
                        }}
                        placeholder="0.00"
                        step="0.01"
                      />
                    </div>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => formData.amount && setWizardStep(2)}
                  disabled={!formData.amount}
                  className="mt-6 mx-auto px-8 py-2.5 bg-[#997c5c] text-white rounded-lg text-sm font-medium flex items-center justify-center gap-1.5 hover:bg-[#784c33] transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next <ArrowRight size={16} weight="regular" />
                </motion.button>
              </motion.div>

              {/* Back Button - Below Card */}
              <button
                onClick={handleGoBack}
                className="text-sm text-center text-[#555555] hover:text-[#784c33] transition-colors w-full mt-4 flex items-center justify-center gap-1.5"
              >
                <ArrowLeft size={14} weight="regular" />
                <span>Go Back</span>
              </button>
            </>
          )}

          {/* Step 2: Category Selection */}
          {wizardStep === 2 && (
            <>
              <motion.div
                key="step-2"
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-white rounded-xl p-8"
              >
                <div className="mb-6">
                  <span className="text-tiny text-[#555555]/60">Step 2 of 5</span>
                  <h2 className="text-h1 text-[#555555] mt-1">What category?</h2>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {categories.map((cat, index) => {
                    const IconComponent = CATEGORY_ICONS.find((ic) => ic.name === cat.iconName)?.component || Tag;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setFormData({ ...formData, category: cat.name });
                          setWizardStep(3);
                        }}
                        className="p-4 bg-[#c5b98f] border border-[#aaa17a]/20 rounded-lg hover:border-[#784c33] hover:bg-[#aaa17a]/20 transition-all flex items-center gap-3"
                      >
                        <IconComponent
                          size={24}
                          className="text-[#555555]"
                        />
                        <span className="text-sm text-[#555555]">
                          {cat.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>

              {/* Back Button - Below Card */}
              <button
                onClick={handleGoBack}
                className="text-sm text-center text-[#555555] hover:text-[#784c33] transition-colors w-full mt-4 flex items-center justify-center gap-1.5"
              >
                <ArrowLeft size={14} weight="regular" />
                <span>Go Back</span>
              </button>
            </>
          )}

          {/* Step 3: Payment Type */}
          {wizardStep === 3 && (
            <>
              <motion.div
                key="step-3"
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-white rounded-xl p-8"
              >
                <h2 className="text-[#555555] text-2xl font-bold mb-6 text-center">
                  How did you pay?
                </h2>
                <div className="flex flex-col gap-4">
                  {['Cash', 'Card', 'Wallet'].map((type, index) => (
                    <motion.button
                      key={type}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.03, x: 10 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setFormData({ ...formData, paymentType: type });
                        // If Card is selected, go to card selection step, otherwise skip to date
                        setWizardStep(type === 'Card' ? 4 : 5);
                      }}
                      className="py-4 px-6 border border-[#aaa17a] rounded-xl text-[#555555] font-semibold hover:bg-[#997c5c] hover:text-white hover:border-[#997c5c] transition"
                    >
                      {type}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Back Button - Below Card */}
              <button
                onClick={handleGoBack}
                className="text-sm text-center text-[#555555] hover:text-[#784c33] transition-colors w-full mt-4 flex items-center justify-center gap-1.5"
              >
                <ArrowLeft size={14} weight="regular" />
                <span>Go Back</span>
              </button>
            </>
          )}

          {/* Step 4: Card Selection */}
          {wizardStep === 4 && (
            <>
              <motion.div
                key="step-4"
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-white rounded-xl p-8"
              >
                <h2 className="text-[#555555] text-2xl font-bold mb-6 text-center">
                  Which card?
                </h2>
                {cards.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-[#aaa17a] mb-4">No cards added yet</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCurrentView('profile')}
                      className="px-6 py-2.5 bg-[#997c5c] text-white rounded-xl font-semibold"
                    >
                      Add Card in Profile
                    </motion.button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {cards.map((card, index) => (
                      <motion.button
                        key={card.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.03, x: 10 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setFormData({
                            ...formData,
                            cardId: card.id,
                            cardNickname: card.nickname,
                          });
                          setWizardStep(5);
                        }}
                        className="py-4 px-6 border border-[#aaa17a] rounded-xl text-[#555555] font-semibold hover:bg-[#997c5c] hover:text-white hover:border-[#997c5c] transition flex items-center justify-between"
                      >
                        <span>{card.nickname}</span>
                        <span className="text-sm opacity-70">•••• {card.lastFour}</span>
                      </motion.button>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Back Button - Below Card */}
              <button
                onClick={handleGoBack}
                className="text-sm text-center text-[#555555] hover:text-[#784c33] transition-colors w-full mt-4 flex items-center justify-center gap-1.5"
              >
              <ArrowLeft size={14} weight="regular" />
              <span>Go Back</span>
            </button>
            </>
          )}

          {/* Step 5: Date Selection */}
          {wizardStep === 5 && (
            <>
            <motion.div
              key="step-5"
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-xl p-8"
            >
              <h2 className="text-[#555555] text-2xl font-bold mb-6 text-center">
                When was this?
              </h2>
              <div className="flex gap-4 mb-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSetDate('today')}
                  className="flex-1 py-4 border border-[#aaa17a] rounded-xl text-[#555555] font-semibold hover:bg-[#997c5c] hover:text-white hover:border-[#997c5c] transition"
                >
                  Today
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSetDate('yesterday')}
                  className="flex-1 py-4 border border-[#aaa17a] rounded-xl text-[#555555] font-semibold hover:bg-[#997c5c] hover:text-white hover:border-[#997c5c] transition"
                >
                  Yesterday
                </motion.button>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowCustomDate(!showCustomDate)}
                className="w-full py-4 border border-[#aaa17a] rounded-xl text-[#555555] font-semibold hover:bg-[#997c5c] hover:text-white hover:border-[#997c5c] transition flex items-center justify-center gap-2"
              >
                <Calendar size={20} />
                Pick Another Date
              </motion.button>

              {/* Custom Date Picker */}
              <AnimatePresence>
                {showCustomDate && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-4 overflow-hidden"
                  >
                    <input
                      type="date"
                      onChange={(e) => {
                        if (e.target.value) {
                          const selectedDate = new Date(e.target.value + 'T00:00:00');
                          setFormData({ ...formData, date: selectedDate.toISOString() });
                          setShowCustomDate(false);
                          setWizardStep(6);
                        }
                      }}
                      className="w-full px-4 py-2.5 border border-[#aaa17a] rounded-xl text-[#555555] focus:outline-none focus:ring-2 focus:ring-[#997c5c]"
                      max={new Date().toISOString().split('T')[0]}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Back Button - Below Card */}
            <button
              onClick={handleGoBack}
              className="text-sm text-center text-[#555555] hover:text-[#784c33] transition-colors w-full mt-4 flex items-center justify-center gap-1.5"
            >
              <ArrowLeft size={14} weight="regular" />
              <span>Go Back</span>
            </button>
            </>
          )}

          {/* Step 6: Description & Save */}
          {wizardStep === 6 && (
            <>
            <motion.div
              key="step-6"
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-xl p-8"
            >
              <h2 className="text-[#555555] text-2xl font-bold mb-6 text-center">
                What was this for?
              </h2>
              <motion.input
                type="text"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                whileFocus={{ scale: 1.02 }}
                className="w-full px-4 py-2.5 border border-[#aaa17a] rounded-xl text-[#555555] focus:outline-none focus:ring-2 focus:ring-[#997c5c] mb-6 transition-all"
                placeholder="e.g., Morning coffee"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSaveTransaction}
                disabled={isSaving}
                className="w-full bg-[#997c5c] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#555555] transition disabled:opacity-50 relative overflow-hidden"
              >
                {isSaving ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-center gap-2"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                      className="w-5 h-5 border border-white border-t-transparent rounded-full"
                    />
                    Saving...
                  </motion.div>
                ) : (
                  'SAVE TRANSACTION'
                )}
              </motion.button>
            </motion.div>

            {/* Back Button - Below Card */}
            <button
              onClick={handleGoBack}
              className="text-sm text-center text-[#555555] hover:text-[#784c33] transition-colors w-full mt-4 flex items-center justify-center gap-1.5"
            >
              <ArrowLeft size={14} weight="regular" />
              <span>Go Back</span>
            </button>
            </>
          )}

          {/* Step 7: Success / Scrapbook */}
          {wizardStep === 7 && (
            <motion.div
              key="step-7"
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-xl p-8 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 15,
                }}
                className="w-24 h-24 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center"
              >
                <Check size={48} className="text-green-600" weight="bold" />
              </motion.div>
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-[#555555] text-2xl font-bold mb-2"
              >
                Transaction Saved!
              </motion.h2>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-[#aaa17a] mb-8"
              >
                ${formData.amount} spent on {formData.category}
              </motion.p>
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleTrackAnother}
                  className="flex-1 py-2.5 border border-[#aaa17a] rounded-xl text-[#555555] font-semibold hover:bg-[#aaa17a] hover:text-white transition"
                >
                  Track Another
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDone}
                  className="flex-1 py-2.5 bg-[#997c5c] text-white rounded-xl font-semibold hover:bg-[#555555] transition"
                >
                  Done
                </motion.button>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-4 py-2.5 border border-dashed border-[#aaa17a] rounded-xl text-[#aaa17a] font-semibold hover:bg-[#aaa17a]/10 transition flex items-center justify-center gap-2"
              >
                <Camera size={20} />
                Add Photo
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Badge Unlock Modal */}
        <AnimatePresence>
          {showBadgeUnlock && newlyUnlockedBadge && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
            >
              {/* Confetti for achievement unlock */}
              <Confetti
                width={windowSize.width}
                height={windowSize.height}
                recycle={false}
                numberOfPieces={500}
              />

              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ type: 'spring', duration: 0.8 }}
                className="bg-white rounded-xl p-8 max-w-sm w-full text-center relative z-10"
              >
                {/* Badge icon with glow effect */}
                <motion.div
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(116, 48, 20, 0.3)',
                      '0 0 40px rgba(116, 48, 20, 0.6)',
                      '0 0 20px rgba(116, 48, 20, 0.3)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-[#c5b98f] to-[#aaa17a] rounded-full flex items-center justify-center"
                >
                  {React.createElement(getAchievementIcon(newlyUnlockedBadge.icon), {
                    size: 48,
                    className: 'text-[#997c5c]',
                    weight: 'fill',
                  })}
                </motion.div>

                <h2 className="text-[#555555] text-2xl font-bold mb-2">
                  Achievement Unlocked!
                </h2>
                <p className="text-[#997c5c] text-xl font-semibold mb-2">
                  {newlyUnlockedBadge.name}
                </p>
                <p className="text-[#aaa17a] text-sm mb-6">
                  {newlyUnlockedBadge.description}
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setShowBadgeUnlock(false);
                    setNewlyUnlockedBadge(null);
                  }}
                  className="w-full py-2.5 bg-[#997c5c] text-white rounded-xl font-semibold"
                >
                  Awesome!
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Budget Alert Modal */}
        <AnimatePresence>
          {showBudgetAlert && budgetAlert && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ type: 'spring', duration: 0.5 }}
                className={`rounded-xl p-5 max-w-sm w-full text-center ${
                  budgetAlert.status === 'danger' ? 'bg-red-50' : 'bg-amber-50'
                }`}
              >
                <motion.div
                  animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                  className="text-6xl mb-4"
                >
                  {budgetAlert.status === 'danger' ? '🚨' : '⚠️'}
                </motion.div>

                <h3 className="text-xl font-bold text-[#555555] mb-2">
                  {budgetAlert.status === 'danger' ? 'Budget Exceeded!' : 'Budget Warning!'}
                </h3>

                <p className="text-[#aaa17a] mb-4">
                  You've spent <strong>${budgetAlert.spent.toFixed(2)}</strong> on{' '}
                  <strong>{budgetAlert.categoryName}</strong> this {budgetAlert.period}.
                  <br />
                  Budget: ${budgetAlert.budget.toFixed(2)}
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setShowBudgetAlert(false);
                    setBudgetAlert(null);
                  }}
                  className="w-full py-2.5 bg-[#997c5c] text-white rounded-xl font-semibold"
                >
                  Got it!
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
