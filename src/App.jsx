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
  const [activeCarouselSlide, setActiveCarouselSlide] = useState(0);
  const carouselRef = React.useRef(null);

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
      <div className="min-h-screen" style={{ backgroundColor: '#020202' }}>
        {/* Black Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-6 pt-8 pb-16"
          style={{ backgroundColor: '#020202' }}
        >
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-6" style={{ color: '#FFFFFF' }}>
              Achievements
            </h1>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-2xl" style={{ backgroundColor: '#2A2A2A' }}>
                <p className="text-3xl font-bold" style={{ color: '#EBCDAA' }}>{unlockedCount}</p>
                <p className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Unlocked</p>
              </div>
              <div className="text-center p-4 rounded-2xl" style={{ backgroundColor: '#2A2A2A' }}>
                <p className="text-3xl font-bold" style={{ color: '#EBCDAA' }}>{currentStreak}</p>
                <p className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Day Streak</p>
              </div>
              <div className="text-center p-4 rounded-2xl" style={{ backgroundColor: '#2A2A2A' }}>
                <p className="text-3xl font-bold" style={{ color: '#EBCDAA' }}>{completionPercentage}%</p>
                <p className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Complete</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* White Floating Sheet */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="px-6 pt-6 pb-32 -mt-4"
          style={{
            backgroundColor: '#FFFFFF',
            borderTopLeftRadius: '2rem',
            borderTopRightRadius: '2rem',
            boxShadow: '0 -10px 40px rgba(2, 2, 2, 0.15)',
            minHeight: 'calc(100vh - 200px)',
          }}
        >
          <div className="max-w-2xl mx-auto lg:max-w-5xl">
            {/* Unlocked Achievements Carousel with Dot Indicators */}
            {achievements.unlockedBadges.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-bold mb-4" style={{ color: '#4D4D4D' }}>Your Achievements</h3>
                
                {/* Carousel Container */}
                <div 
                  ref={carouselRef}
                  onScroll={(e) => {
                    const scrollLeft = e.target.scrollLeft;
                    const cardWidth = 296; // 280px + 16px gap
                    const newIndex = Math.round(scrollLeft / cardWidth);
                    setActiveCarouselSlide(Math.min(newIndex, achievements.unlockedBadges.length - 1));
                  }}
                  className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
                >
                  {achievements.unlockedBadges.map((badge, index) => {
                    const achievement = ACHIEVEMENTS.find((a) => a.id === badge.achievementId);
                    if (!achievement) return null;
                    const AchievementIcon = getAchievementIcon(achievement.icon);

                    return (
                      <motion.div
                        key={badge.achievementId}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex-shrink-0 snap-start rounded-2xl p-4 flex items-center gap-4"
                        style={{ 
                          width: '280px',
                          height: '100px',
                          backgroundColor: '#2A2A2A',
                          boxShadow: '0 8px 24px rgba(2, 2, 2, 0.15)',
                        }}
                      >
                        {/* Icon Area */}
                        <div 
                          className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0" 
                          style={{ backgroundColor: '#020202' }}
                        >
                          <AchievementIcon size={32} style={{ color: '#EBCDAA' }} weight="fill" />
                        </div>
                        
                        {/* Text Content */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-sm mb-1 truncate" style={{ color: '#FFFFFF' }}>
                            {achievement.name}
                          </h4>
                          <p className="text-xs mb-1 line-clamp-2" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                            {achievement.description}
                          </p>
                          <p className="text-xs font-medium" style={{ color: '#EBCDAA' }}>
                            {new Date(badge.unlockedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Dot Indicators */}
                {achievements.unlockedBadges.length > 1 && (
                  <div className="flex justify-center gap-2 mt-3">
                    {achievements.unlockedBadges.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          if (carouselRef.current) {
                            carouselRef.current.scrollTo({
                              left: index * 296,
                              behavior: 'smooth'
                            });
                          }
                        }}
                        className="w-2 h-2 rounded-full transition-all duration-200"
                        style={{
                          backgroundColor: index === activeCarouselSlide ? '#EBCDAA' : 'rgba(77, 77, 77, 0.2)',
                          transform: index === activeCarouselSlide ? 'scale(1.2)' : 'scale(1)',
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Category Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {['all', 'unlocked', 'locked', 'in progress'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setAchievementTab(tab)}
                  className="px-5 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap"
                  style={{
                    backgroundColor: achievementTab === tab ? '#020202' : 'rgba(77, 77, 77, 0.08)',
                    color: achievementTab === tab ? '#FFFFFF' : '#4D4D4D',
                    boxShadow: achievementTab === tab ? '0 4px 15px rgba(2, 2, 2, 0.2)' : 'none',
                  }}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Grouped Achievements by Difficulty */}
            {(() => {
              // Group filtered achievements by difficulty
              const easyAchievements = filteredAchievements.filter(a => a.difficulty === 'easy');
              const mediumAchievements = filteredAchievements.filter(a => a.difficulty === 'medium');
              const hardAchievements = filteredAchievements.filter(a => a.difficulty === 'hard');

              const difficultyGroups = [
                { name: 'Getting Started', key: 'easy', items: easyAchievements, color: '#4CAF50' },
                { name: 'Keep Going', key: 'medium', items: mediumAchievements, color: '#FF9800' },
                { name: 'Master Level', key: 'hard', items: hardAchievements, color: '#F44336' },
              ].filter(group => group.items.length > 0);

              const renderAchievementCard = (achievement, index) => {
                const isUnlocked = achievements.unlockedBadges.some(
                  (b) => b.achievementId === achievement.id
                );
                const progress = achievements.progress[achievement.id];
                const badge = achievements.unlockedBadges.find((b) => b.achievementId === achievement.id);
                const AchievementIcon = getAchievementIcon(achievement.icon);

                return (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="flex-shrink-0 snap-start rounded-2xl p-4 flex items-center gap-4"
                    style={{
                      width: '280px',
                      height: '100px',
                      backgroundColor: isUnlocked ? '#2A2A2A' : '#FFFFFF',
                      boxShadow: isUnlocked
                        ? '0 8px 24px rgba(2, 2, 2, 0.15)'
                        : '0 4px 16px rgba(2, 2, 2, 0.06)',
                      border: isUnlocked ? '2px solid #EBCDAA' : '2px solid rgba(77, 77, 77, 0.1)',
                    }}
                  >
                    {/* Icon Area */}
                    <div
                      className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        backgroundColor: isUnlocked ? '#020202' : 'rgba(77, 77, 77, 0.08)',
                      }}
                    >
                      <AchievementIcon
                        size={28}
                        style={{ color: isUnlocked ? '#EBCDAA' : 'rgba(77, 77, 77, 0.3)' }}
                        weight={isUnlocked ? 'fill' : 'regular'}
                      />
                    </div>

                    {/* Text Content */}
                    <div className="flex-1 min-w-0">
                      <h4
                        className="font-bold text-sm mb-1 truncate"
                        style={{ color: isUnlocked ? '#FFFFFF' : '#4D4D4D' }}
                      >
                        {achievement.name}
                      </h4>

                      {/* Progress or Description */}
                      {!isUnlocked && progress ? (
                        <div>
                          <div className="flex items-center justify-between text-xs mb-1" style={{ color: 'rgba(77, 77, 77, 0.5)' }}>
                            <span>{progress.current} / {progress.target}</span>
                          </div>
                          <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(77, 77, 77, 0.1)' }}>
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${(progress.current / progress.target) * 100}%` }}
                              className="h-full rounded-full"
                              style={{ backgroundColor: '#EBCDAA' }}
                            />
                          </div>
                        </div>
                      ) : (
                        <p className="text-xs line-clamp-2" style={{ color: isUnlocked ? 'rgba(255, 255, 255, 0.6)' : 'rgba(77, 77, 77, 0.5)' }}>
                          {achievement.description}
                        </p>
                      )}

                      {/* Unlock Date for unlocked */}
                      {isUnlocked && badge && (
                        <p className="text-xs font-medium mt-1" style={{ color: '#EBCDAA' }}>
                          ✓ {new Date(badge.unlockedAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </motion.div>
                );
              };

              return (
                <div className="space-y-6">
                  {difficultyGroups.map((group) => (
                    <div key={group.key}>
                      {/* Group Header */}
                      <div className="flex items-center gap-2 mb-3">
                        <div 
                          className="w-2 h-2 rounded-full" 
                          style={{ backgroundColor: group.color }}
                        />
                        <h4 className="text-sm font-semibold" style={{ color: '#4D4D4D' }}>
                          {group.name}
                        </h4>
                        <span className="text-xs" style={{ color: 'rgba(77, 77, 77, 0.5)' }}>
                          {group.items.filter(a => achievements.unlockedBadges.some(b => b.achievementId === a.id)).length}/{group.items.length}
                        </span>
                      </div>

                      {/* Horizontal Scroll Row with Scroll Indicator */}
                      <div className="relative">
                        <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-achievements snap-x snap-mandatory scroll-smooth">
                          {group.items.map((achievement, index) => renderAchievementCard(achievement, index))}
                        </div>
                        {/* Scroll Indicator */}
                        {group.items.length > 3 && (
                          <div 
                            className="absolute right-0 top-0 bottom-2 w-12 flex items-center justify-end pointer-events-none"
                            style={{ background: 'linear-gradient(to right, transparent, #FFFFFF)' }}
                          >
                            <ArrowRight size={20} style={{ color: '#4D4D4D', marginRight: '4px' }} />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        </motion.div>

        {/* Floating Navigation - Bottom on mobile, Left side vertical on desktop */}
        <motion.div 
          layoutId="floating-nav"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 lg:left-8 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-0 lg:bottom-auto flex lg:flex-col items-center gap-1 px-3 py-2 lg:px-2 lg:py-3 rounded-full z-50" 
          style={{ backgroundColor: '#020202', boxShadow: '0 8px 32px rgba(235, 205, 170, 0.3)' }}
        >
          <button
            onClick={() => {
              setCurrentView('home');
              setHasNewAchievements(false);
            }}
            className="p-3 rounded-full transition-all duration-200"
            style={{ color: '#FFFFFF' }}
          >
            <ArrowLeft size={24} weight="regular" />
          </button>
          <div className="w-px h-6 lg:w-6 lg:h-px mx-1 lg:my-1" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
          <button
            onClick={() => {
              setCurrentView('analytics');
              fetchAnalytics('today');
            }}
            className="p-3 rounded-full transition-all duration-200 hover:bg-[#2A2A2A]"
            style={{ color: '#FFFFFF' }}
          >
            <ChartBar size={24} weight="regular" />
          </button>
          <button
            className="p-3 rounded-full transition-all duration-200"
            style={{ backgroundColor: '#EBCDAA', color: '#020202' }}
          >
            <Trophy size={24} weight="regular" />
          </button>
          <button
            onClick={() => setCurrentView('profile')}
            className="p-3 rounded-full transition-all duration-200 hover:bg-[#2A2A2A]"
            style={{ color: '#FFFFFF' }}
          >
            <User size={24} weight="regular" />
          </button>
        </motion.div>
      </div>
    );
  }

  // =============================================
  // RENDER: Profile View
  // =============================================
  if (currentView === 'profile') {
    const status = calculateSpendingStatus();

    return (
      <div className="min-h-screen" style={{ backgroundColor: '#020202' }}>
        {/* Black Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-6 pt-8 pb-16"
          style={{ backgroundColor: '#020202' }}
        >
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold" style={{ color: '#FFFFFF' }}>
              Profile
            </h1>
          </div>
        </motion.div>

        {/* White Floating Sheet */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="px-6 pt-6 pb-32 -mt-4"
          style={{
            backgroundColor: '#FFFFFF',
            borderTopLeftRadius: '2rem',
            borderTopRightRadius: '2rem',
            boxShadow: '0 -10px 40px rgba(2, 2, 2, 0.15)',
            minHeight: 'calc(100vh - 200px)',
          }}
        >
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Account Section */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="rounded-3xl p-6"
              style={{
                backgroundColor: '#2A2A2A',
                boxShadow: '0 8px 32px rgba(2, 2, 2, 0.08)',
              }}
            >
              <h2 className="text-lg font-bold mb-4" style={{ color: '#FFFFFF' }}>Account</h2>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium" style={{ color: '#FFFFFF' }}>Guest User</p>
                  <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Using LocalStorage</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all"
                  style={{
                    backgroundColor: '#EBCDAA',
                    color: '#FFFFFF',
                    boxShadow: '0 4px 15px rgba(235, 205, 170, 0.3)',
                  }}
                >
                  <SignOut size={18} />
                  Logout
                </motion.button>
              </div>
            </motion.div>

            {/* Payment Methods & Spending Limit - Two Column Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Payment Methods */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="rounded-3xl p-6"
                style={{
                  backgroundColor: '#2A2A2A',
                  boxShadow: '0 8px 32px rgba(2, 2, 2, 0.08)',
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold" style={{ color: '#FFFFFF' }}>Payment Methods</h2>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowAddCard(!showAddCard)}
                    className="p-2.5 rounded-full transition-all"
                    style={{
                      backgroundColor: '#EBCDAA',
                      color: '#FFFFFF',
                    }}
                  >
                    {showAddCard ? <X size={20} /> : <Plus size={20} />}
                  </motion.button>
                </div>

                <AnimatePresence>
                  {showAddCard && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mb-4 overflow-hidden"
                    >
                      <div className="p-4 rounded-2xl mb-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}>
                        <input
                          type="text"
                          placeholder="Card Nickname"
                          value={newCard.nickname}
                          onChange={(e) => setNewCard({ ...newCard, nickname: e.target.value })}
                          className="input w-full mb-3"
                        />
                        <input
                          type="text"
                          placeholder="Last 4 Digits"
                          maxLength={4}
                          value={newCard.lastFour}
                          onChange={(e) => setNewCard({ ...newCard, lastFour: e.target.value.replace(/\D/g, '') })}
                          className="input w-full mb-3"
                        />
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleAddCard}
                          className="btn-primary w-full"
                        >
                          Add Card
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="space-y-3">
                  {cards.length === 0 ? (
                    <p className="text-sm text-center py-4" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
                      No cards yet
                    </p>
                  ) : (
                    cards.map((card, index) => (
                      <motion.div
                        key={card.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center justify-between p-3 rounded-xl"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(235, 205, 170, 0.2)' }}>
                            <CreditCard size={20} style={{ color: '#EBCDAA' }} />
                          </div>
                          <div>
                            <p className="text-sm font-medium" style={{ color: '#FFFFFF' }}>{card.nickname}</p>
                            <p className="text-xs" style={{ color: '#EBCDAA' }}>•••• {card.lastFour}</p>
                          </div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDeleteCard(card.id)}
                          className="p-2 rounded-lg transition-colors"
                          style={{ color: '#EBCDAA' }}
                        >
                          <Trash size={18} />
                        </motion.button>
                      </motion.div>
                    ))
                  )}
                </div>
              </motion.div>

              {/* Spending Limit */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="rounded-3xl p-6"
                style={{
                  backgroundColor: '#2A2A2A',
                  boxShadow: '0 8px 32px rgba(2, 2, 2, 0.08)',
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold" style={{ color: '#FFFFFF' }}>Spending Limit</h2>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setShowEditLimit(!showEditLimit);
                      if (!showEditLimit) {
                        setTempLimit({ amount: spendingLimit.amount.toString(), period: spendingLimit.period });
                      }
                    }}
                    className="p-2.5 rounded-full transition-all"
                    style={{
                      backgroundColor: '#EBCDAA',
                      color: '#FFFFFF',
                    }}
                  >
                    {showEditLimit ? <X size={20} /> : <Pencil size={20} />}
                  </motion.button>
                </div>

                {!showEditLimit && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 rounded-2xl mb-4"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
                  >
                    <div className="flex items-baseline justify-between mb-2">
                      <span className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Current Limit</span>
                      <span className="text-2xl font-bold" style={{ color: '#FFFFFF' }}>${spendingLimit.amount}</span>
                    </div>
                    <p className="text-xs mb-4" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                      Per {spendingLimit.period === 'week' ? 'Week' : 'Month'}
                    </p>
                    <div>
                      <div className="flex items-center justify-between mb-1 text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                        <span>${status.spent.toFixed(2)} spent</span>
                        <span>{status.percentage.toFixed(0)}%</span>
                      </div>
                      <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${status.percentage}%` }}
                          transition={{ duration: 0.5 }}
                          className="h-full rounded-full"
                          style={{
                            backgroundColor: status.isOverLimit ? '#ef4444' : '#EBCDAA',
                          }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                <AnimatePresence>
                  {showEditLimit && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 rounded-2xl" style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}>
                        <input
                          type="number"
                          placeholder="Amount"
                          value={tempLimit.amount}
                          onChange={(e) => setTempLimit({ ...tempLimit, amount: e.target.value })}
                          className="input w-full mb-3"
                        />
                        <div className="flex gap-2 mb-3">
                          <button
                            onClick={() => setTempLimit({ ...tempLimit, period: 'week' })}
                            className="flex-1 py-2.5 rounded-xl font-medium transition-all"
                            style={{
                              backgroundColor: tempLimit.period === 'week' ? '#EBCDAA' : 'rgba(235, 205, 170, 0.1)',
                              color: tempLimit.period === 'week' ? '#FFFFFF' : '#EBCDAA',
                            }}
                          >
                            Weekly
                          </button>
                          <button
                            onClick={() => setTempLimit({ ...tempLimit, period: 'month' })}
                            className="flex-1 py-2.5 rounded-xl font-medium transition-all"
                            style={{
                              backgroundColor: tempLimit.period === 'month' ? '#EBCDAA' : 'rgba(235, 205, 170, 0.1)',
                              color: tempLimit.period === 'month' ? '#FFFFFF' : '#EBCDAA',
                            }}
                          >
                            Monthly
                          </button>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleUpdateSpendingLimit}
                          className="btn-primary w-full"
                        >
                          Update Limit
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Categories Section */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="rounded-3xl p-6"
              style={{
                backgroundColor: '#2A2A2A',
                boxShadow: '0 8px 32px rgba(2, 2, 2, 0.08)',
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold" style={{ color: '#FFFFFF' }}>Categories</h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAddCategory(!showAddCategory)}
                  className="p-2.5 rounded-full transition-all"
                  style={{
                    backgroundColor: '#EBCDAA',
                    color: '#020202',
                  }}
                >
                  {showAddCategory ? <X size={20} /> : <Plus size={20} />}
                </motion.button>
              </div>

              <AnimatePresence>
                {showAddCategory && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mb-4 overflow-hidden"
                  >
                    <div className="p-4 rounded-2xl mb-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}>
                      <input
                        type="text"
                        placeholder="Category Name"
                        value={newCategory.name}
                        onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                        className="input w-full mb-3"
                      />
                      <button
                        onClick={() => setShowIconPicker(true)}
                        className="w-full mb-3 p-3 rounded-xl flex items-center justify-between transition-colors"
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.08)',
                          border: '2px solid transparent',
                        }}
                      >
                        <div className="flex items-center gap-3">
                          {(() => {
                            const CurrentIcon = CATEGORY_ICONS.find((ic) => ic.name === newCategory.iconName)?.component || Tag;
                            return <CurrentIcon size={24} style={{ color: '#EBCDAA' }} />;
                          })()}
                          <span style={{ color: '#FFFFFF' }}>Select Icon</span>
                        </div>
                        <ArrowRight size={20} style={{ color: 'rgba(255, 255, 255, 0.5)' }} />
                      </button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleAddCategory}
                        className="btn-primary w-full"
                      >
                        Add Category
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="grid grid-cols-3 gap-3">
                {categories.map((cat, index) => {
                  const IconComponent = CATEGORY_ICONS.find((ic) => ic.name === cat.iconName)?.component || Tag;

                  return (
                    <motion.div
                      key={cat.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="relative flex flex-col items-center gap-2 p-4 rounded-2xl transition-all"
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
                    >
                      <IconComponent size={28} style={{ color: '#EBCDAA' }} />
                      <span className="text-xs font-medium text-center" style={{ color: '#FFFFFF' }}>
                        {cat.name}
                      </span>

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDeleteCategory(cat.id)}
                        className="absolute -top-2 -right-2 p-1 rounded-full"
                        style={{ backgroundColor: '#EBCDAA', color: '#020202' }}
                      >
                        <X size={12} />
                      </motion.button>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Icon Picker Modal */}
        <AnimatePresence>
          {showIconPicker && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              style={{ backgroundColor: 'rgba(2, 2, 2, 0.8)' }}
              onClick={() => setShowIconPicker(false)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
                className="rounded-3xl p-6 max-w-md w-full"
                style={{ backgroundColor: '#2A2A2A' }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold" style={{ color: '#FFFFFF' }}>Choose Icon</h3>
                  <button onClick={() => setShowIconPicker(false)}>
                    <X size={24} style={{ color: '#FFFFFF' }} />
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
                        className="aspect-square p-3 rounded-2xl transition-all"
                        style={{
                          backgroundColor: isSelected ? '#EBCDAA' : 'rgba(255, 255, 255, 0.08)',
                          border: isSelected ? '2px solid #EBCDAA' : '2px solid transparent',
                        }}
                      >
                        <Icon size={28} style={{ color: isSelected ? '#020202' : '#FFFFFF' }} />
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Navigation */}
        <motion.div 
          layoutId="floating-nav"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 lg:left-8 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-0 lg:bottom-auto flex lg:flex-col items-center gap-1 px-3 py-2 lg:px-2 lg:py-3 rounded-full z-50" 
          style={{ backgroundColor: '#020202', boxShadow: '0 8px 32px rgba(235, 205, 170, 0.3)' }}
        >
          <button
            onClick={() => setCurrentView('home')}
            className="p-3 rounded-full transition-all duration-200"
            style={{ color: '#FFFFFF' }}
          >
            <ArrowLeft size={24} weight="regular" />
          </button>
          <div className="w-px h-6 lg:w-6 lg:h-px mx-1 lg:my-1" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
          <button
            onClick={() => {
              setCurrentView('analytics');
              fetchAnalytics('today');
            }}
            className="p-3 rounded-full transition-all duration-200 hover:bg-white/10"
            style={{ color: '#FFFFFF' }}
          >
            <ChartBar size={24} weight="regular" />
          </button>
          <button
            onClick={() => {
              setCurrentView('achievements');
              setHasNewAchievements(false);
            }}
            className="p-3 rounded-full transition-all duration-200 hover:bg-white/10"
            style={{ color: '#FFFFFF' }}
          >
            <Trophy size={24} weight="regular" />
          </button>
          <button
            className="p-3 rounded-full transition-all duration-200"
            style={{ backgroundColor: '#EBCDAA', color: '#020202' }}
          >
            <User size={24} weight="regular" />
          </button>
        </motion.div>
      </div>
    );
  }

  // =============================================
  // RENDER: Analytics View
  // =============================================
  if (currentView === 'analytics') {
    const spendingStatus = calculateSpendingStatus();
    const periodLabels = {
      today: 'Today',
      week: 'This Week',
      month: 'This Month',
      year: 'This Year',
    };

    return (
      <div className="min-h-screen" style={{ backgroundColor: '#FFFFFF' }}>
        {/* Espresso Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-6 pt-8 pb-16"
          style={{ backgroundColor: '#020202' }}
        >
          <div className="max-w-2xl mx-auto">
            <p className="text-sm mb-1" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              {spendingLimit.period === 'week' ? 'This Week' : 'This Month'}
            </p>
            <div className="flex items-baseline gap-2">
              <motion.span
                key={spendingStatus.spent}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-5xl font-bold"
                style={{ color: '#EBCDAA' }}
              >
                ${spendingStatus.spent.toFixed(2)}
              </motion.span>
              <span className="text-lg" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                / ${spendingLimit.amount}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="mt-4 w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(spendingStatus.percentage, 100)}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="h-full rounded-full"
                style={{
                  backgroundColor: spendingStatus.isOverLimit ? '#ef4444' : '#EBCDAA',
                }}
              />
            </div>
            {spendingStatus.isOverLimit && (
              <p className="text-sm text-red-400 mt-2">
                You've exceeded your spending limit
              </p>
            )}
          </div>
        </motion.div>

        {/* Cream Floating Sheet */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex-1 px-6 pt-8 pb-32 -mt-4"
          style={{
            backgroundColor: '#FFFFFF',
            borderTopLeftRadius: '2rem',
            borderTopRightRadius: '2rem',
            boxShadow: '0 -10px 40px rgba(2, 2, 2, 0.15)',
            minHeight: 'calc(100vh - 180px)',
          }}
        >
          <div className="max-w-2xl mx-auto">
            {/* Period Selector */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {['today', 'week', 'month', 'year'].map((period) => (
                <motion.button
                  key={period}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => fetchAnalytics(period)}
                  className="px-5 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap"
                  style={{
                    backgroundColor: analyticsData.period === period ? '#020202' : 'rgba(2, 2, 2, 0.08)',
                    color: analyticsData.period === period ? '#FFFFFF' : '#4D4D4D',
                    boxShadow: analyticsData.period === period ? '0 4px 15px rgba(235, 205, 170, 0.3)' : 'none',
                  }}
                >
                  {periodLabels[period]}
                </motion.button>
              ))}
            </div>

            {/* Main Spending Card */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="rounded-3xl p-6 mb-6"
              style={{
                backgroundColor: '#2A2A2A',
                boxShadow: '0 12px 40px rgba(2, 2, 2, 0.15)',
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm mb-1" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                    Spent {periodLabels[analyticsData.period]}
                  </p>
                  <motion.p
                    key={analyticsData.total}
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="text-4xl font-bold"
                    style={{ color: '#EBCDAA' }}
                  >
                    ${analyticsData.total.toFixed(2)}
                  </motion.p>
                </div>
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                  <ChartBar size={28} style={{ color: '#EBCDAA' }} />
                </div>
              </div>

              {/* Ledger */}
              <div>
                <h3 className="text-sm mb-4" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                  {periodLabels[analyticsData.period]}'s Transactions
                </h3>
                <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-minimal">
                  {analyticsData.transactions.length === 0 ? (
                    <p className="text-center py-4" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
                      No transactions yet
                    </p>
                  ) : (
                    analyticsData.transactions.map((transaction, index) => {
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
                          transition={{ delay: index * 0.03 }}
                          className="flex items-center justify-between py-2"
                          style={{ color: '#FFFFFF' }}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                              <FinalIcon size={20} style={{ color: '#EBCDAA' }} />
                            </div>
                            <div>
                              <span className="text-sm font-medium">
                                {transaction.description || transaction.category}
                              </span>
                              <p className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                                {transaction.category}
                              </p>
                            </div>
                          </div>
                          <span className="font-semibold">
                            ${parseFloat(transaction.amount).toFixed(2)}
                          </span>
                        </motion.div>
                      );
                    })
                  )}
                </div>
              </div>
            </motion.div>

            {/* Category Breakdown */}
            {analyticsData.transactions.length > 0 && (() => {
              const categoryBreakdown = calculateCategoryTotals(analyticsData.transactions);

              return categoryBreakdown.length > 0 ? (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  className="rounded-3xl p-6 mb-6"
                  style={{
                    backgroundColor: '#2A2A2A',
                    boxShadow: '0 8px 32px rgba(2, 2, 2, 0.08)',
                  }}
                >
                  <h3 className="text-sm font-semibold uppercase tracking-wide mb-4" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                    Breakdown by Category
                  </h3>

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
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}>
                            <FinalIcon size={20} style={{ color: '#EBCDAA' }} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium" style={{ color: '#FFFFFF' }}>
                                {item.category}
                              </span>
                              <span className="text-sm font-semibold" style={{ color: '#FFFFFF' }}>
                                ${item.amount.toFixed(2)}
                              </span>
                            </div>
                            <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${item.percentage}%` }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                className="h-full rounded-full"
                                style={{ backgroundColor: '#EBCDAA' }}
                              />
                            </div>
                          </div>
                          <span className="text-xs w-10 text-right" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                            {item.percentage.toFixed(0)}%
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              ) : null;
            })()}

            {/* Insights Card */}
            {(() => {
              const insights = getAllInsights();
              const currentInsight = insights[currentInsightIndex % insights.length];
              const InsightIcon = getInsightIcon(currentInsight.icon);

              return (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.35 }}
                  className="rounded-3xl p-6"
                  style={{
                    backgroundColor: '#020202',
                    boxShadow: '0 8px 32px rgba(235, 205, 170, 0.15)',
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <InsightIcon size={20} style={{ color: '#EBCDAA' }} weight="regular" />
                      <h3 className="text-sm" style={{ color: '#EBCDAA' }}>
                        {currentInsight.title}
                      </h3>
                    </div>
                    <button
                      onClick={rotateInsight}
                      className="p-2 rounded-full transition-colors"
                      style={{ color: 'rgba(255, 255, 255, 0.6)' }}
                    >
                      <ArrowsClockwise size={18} />
                    </button>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentInsight.type}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <p className="text-2xl font-bold mb-1" style={{ color: '#FFFFFF' }}>
                        {currentInsight.value}
                      </p>
                      <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                        {currentInsight.subtitle}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              );
            })()}
          </div>
        </motion.div>

        {/* Floating Navigation */}
        <motion.div 
          layoutId="floating-nav"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 lg:left-8 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-0 lg:bottom-auto flex lg:flex-col items-center gap-1 px-3 py-2 lg:px-2 lg:py-3 rounded-full z-50" 
          style={{ backgroundColor: '#020202', boxShadow: '0 8px 32px rgba(235, 205, 170, 0.3)' }}
        >
          <button
            onClick={() => setCurrentView('home')}
            className="p-3 rounded-full transition-all duration-200"
            style={{ color: '#FFFFFF' }}
          >
            <ArrowLeft size={24} weight="regular" />
          </button>
          <div className="w-px h-6 lg:w-6 lg:h-px mx-1 lg:my-1" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
          <button
            className="p-3 rounded-full transition-all duration-200"
            style={{ backgroundColor: '#EBCDAA', color: '#020202' }}
          >
            <ChartBar size={24} weight="regular" />
          </button>
          <button
            onClick={() => {
              setCurrentView('achievements');
              setHasNewAchievements(false);
            }}
            className="p-3 rounded-full transition-all duration-200 hover:bg-white/10"
            style={{ color: '#FFFFFF' }}
          >
            <Trophy size={24} weight="regular" />
          </button>
          <button
            onClick={() => setCurrentView('profile')}
            className="p-3 rounded-full transition-all duration-200 hover:bg-white/10"
            style={{ color: '#FFFFFF' }}
          >
            <User size={24} weight="regular" />
          </button>
        </motion.div>
      </div>
    );
  }

  // =============================================
  // RENDER: Home View (Wizard)
  // =============================================
  const themeColors = getThemeColors();
  const spendingStatus = calculateSpendingStatus();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 transition-colors duration-1000"
      style={{ backgroundColor: '#FFFFFF' }}
    >
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
          colors={['#EBCDAA', '#020202', '#4D4D4D', '#2A2A2A']}
        />
      )}

      {/* Step 0 Navigation - Outside AnimatePresence for immediate hide */}
      <AnimatePresence>
        {wizardStep === 0 && (
          <motion.div
            key="step-0-nav"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.15 }}
            className="fixed left-6 top-[45%] -translate-y-1/2 flex flex-col items-center gap-1 px-2 py-3 rounded-full z-50"
            style={{ backgroundColor: '#020202', boxShadow: '0 8px 32px rgba(235, 205, 170, 0.3)' }}
          >
            <button
              onClick={() => {
                setCurrentView('analytics');
                fetchAnalytics('today');
              }}
              className="p-3 rounded-full transition-all duration-200 hover:bg-[#2A2A2A]"
              style={{ color: '#FFFFFF' }}
            >
              <ChartBar size={24} weight="regular" />
            </button>
            <button
              onClick={() => {
                setCurrentView('achievements');
                setHasNewAchievements(false);
              }}
              className="p-3 rounded-full transition-all duration-200 hover:bg-[#2A2A2A] relative"
              style={{ color: '#FFFFFF' }}
            >
              <Trophy size={24} weight="regular" />
              {hasNewAchievements && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-[#EBCDAA]" />
              )}
            </button>
            <button
              onClick={() => setCurrentView('profile')}
              className="p-3 rounded-full transition-all duration-200 hover:bg-[#2A2A2A]"
              style={{ color: '#FFFFFF' }}
            >
              <User size={24} weight="regular" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full max-w-md md:max-w-2xl lg:max-w-3xl mx-auto">
        <AnimatePresence mode="wait">
          {/* Step 0: Resting State */}
          {wizardStep === 0 && (
            <motion.div
              key="step-0"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col items-center justify-center min-h-[60vh] lg:min-h-screen w-full"
            >

              {/* Start Tracking Button with pulsing glow */}
              <motion.button
                onClick={handleStartTracking}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.92 }}
                className="w-44 h-44 md:w-52 md:h-52 lg:w-64 lg:h-64 rounded-full flex items-center justify-center text-lg md:text-xl font-semibold animate-pulse-glow"
                style={{
                  backgroundColor: '#020202',
                  color: '#FFFFFF',
                }}
              >
                Start Tracking
              </motion.button>
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
                className="rounded-3xl p-6 md:p-8 lg:p-10"
                style={{
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 12px 40px rgba(2, 2, 2, 0.15)',
                }}
              >
                <motion.h2
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-xl md:text-2xl font-semibold mb-8 text-center"
                  style={{ color: '#4D4D4D' }}
                >
                  How much?
                </motion.h2>

                {/* Clean Number Input */}
                <div className="flex items-center justify-center mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl md:text-5xl lg:text-6xl font-bold" style={{ color: '#4D4D4D' }}>$</span>
                    <input
                      type="number"
                      autoFocus
                      value={formData.amount}
                      onChange={(e) =>
                        setFormData({ ...formData, amount: e.target.value })
                      }
                      className="text-5xl md:text-6xl lg:text-7xl font-bold text-center border-none outline-none bg-transparent"
                      style={{
                        color: '#4D4D4D',
                        caretColor: '#EBCDAA',
                        width: '200px',
                      }}
                      placeholder="0"
                      step="0.01"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Next & Back Button Row - Outside Card */}
              <div className="mt-6 flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleGoBack}
                  className="flex-1 px-6 py-3 rounded-full font-semibold transition-all duration-200 flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: 'transparent',
                    color: '#4D4D4D',
                    border: '2px solid #4D4D4D',
                  }}
                >
                  <ArrowLeft size={20} weight="bold" />
                  <span>Back</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => formData.amount && setWizardStep(2)}
                  disabled={!formData.amount}
                  className="flex-1 px-6 py-3 rounded-full font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: '#020202',
                    color: '#FFFFFF',
                    opacity: formData.amount ? 1 : 0.5,
                  }}
                >
                  <span>Next</span>
                  <ArrowRight size={20} weight="bold" />
                </motion.button>
              </div>
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
                className="rounded-3xl p-8"
                style={{
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 12px 40px rgba(2, 2, 2, 0.15)',
                }}
              >
                <div className="mb-8">
                  <span className="text-sm font-medium" style={{ color: 'rgba(77, 77, 77, 0.6)' }}>Step 2 of 5</span>
                  <h2 className="text-2xl md:text-3xl font-bold mt-2" style={{ color: '#4D4D4D' }}>What category?</h2>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {categories.map((cat, index) => {
                    const IconComponent = CATEGORY_ICONS.find((ic) => ic.name === cat.iconName)?.component || Tag;
                    return (
                      <motion.button
                        key={cat.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => {
                          setFormData({ ...formData, category: cat.name });
                          setWizardStep(3);
                        }}
                        className="p-4 rounded-2xl transition-all"
                        style={{
                          backgroundColor: '#2A2A2A',
                          border: '2px solid transparent',
                          cursor: 'pointer',
                        }}
                        whileHover={{
                          backgroundColor: '#020202',
                          scale: 1.02,
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex flex-col items-center justify-center gap-3">
                          <IconComponent size={32} style={{ color: '#EBCDAA' }} />
                          <span className="text-sm font-medium text-center" style={{ color: '#FFFFFF' }}>
                            {cat.name}
                          </span>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
              
              {/* Back & Next Button Row - Outside Card */}
              <div className="mt-6 flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleGoBack}
                  className="flex-1 px-6 py-3 rounded-full font-semibold transition-all duration-200 flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: 'transparent',
                    color: '#4D4D4D',
                    border: '2px solid #4D4D4D',
                  }}
                >
                  <ArrowLeft size={20} weight="bold" />
                  <span>Back</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => formData.category && setWizardStep(3)}
                  disabled={!formData.category}
                  className="flex-1 px-6 py-3 rounded-full font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: '#020202',
                    color: '#FFFFFF',
                    opacity: formData.category ? 1 : 0.5,
                  }}
                >
                  <span>Next</span>
                  <ArrowRight size={20} weight="bold" />
                </motion.button>
              </div>
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
                className="rounded-3xl p-8"
                style={{
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 12px 40px rgba(2, 2, 2, 0.15)',
                }}
              >
                <h2 className="font-bold mb-8 text-center text-2xl md:text-3xl" style={{ color: '#4D4D4D' }}>
                  How did you pay?
                </h2>
                <div className="flex flex-col gap-3">
                  {['Cash', 'Card', 'Wallet'].map((type, index) => (
                    <motion.button
                      key={type}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.03, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setFormData({ ...formData, paymentType: type });
                        setWizardStep(type === 'Card' ? 4 : 5);
                      }}
                      className="py-4 px-6 rounded-2xl font-semibold text-lg transition-all"
                      style={{
                        backgroundColor: '#2A2A2A',
                        color: '#FFFFFF',
                        border: '2px solid transparent',
                      }}
                    >
                      {type}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Back Button Row - Outside Card */}
              <div className="mt-6 flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleGoBack}
                  className="flex-1 px-6 py-3 rounded-full font-semibold transition-all duration-200 flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: 'transparent',
                    color: '#4D4D4D',
                    border: '2px solid #4D4D4D',
                  }}
                >
                  <ArrowLeft size={20} weight="bold" />
                  <span>Back</span>
                </motion.button>
              </div>
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
                className="rounded-3xl p-8"
                style={{
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 12px 40px rgba(2, 2, 2, 0.15)',
                }}
              >
                <h2 className="font-bold mb-8 text-center text-2xl md:text-3xl" style={{ color: '#4D4D4D' }}>
                  Which card?
                </h2>
                {cards.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="mb-4" style={{ color: 'rgba(77, 77, 77, 0.5)' }}>No cards added yet</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCurrentView('profile')}
                      className="px-6 py-2.5 rounded-xl font-semibold"
                      style={{
                        backgroundColor: '#EBCDAA',
                        color: '#FFFFFF',
                      }}
                    >
                      Add Card in Profile
                    </motion.button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {cards.map((card, index) => (
                      <motion.button
                        key={card.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setFormData({
                            ...formData,
                            cardId: card.id,
                            cardNickname: card.nickname,
                          });
                          setWizardStep(5);
                        }}
                        className="w-full py-4 px-6 rounded-2xl font-semibold text-lg transition-all flex items-center justify-between"
                        style={{
                          backgroundColor: '#2A2A2A',
                          color: '#FFFFFF',
                        }}
                      >
                        <span>{card.nickname}</span>
                        <span className="text-sm" style={{ color: '#EBCDAA' }}>•••• {card.lastFour}</span>
                      </motion.button>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Back Button Row - Outside Card */}
              <div className="mt-6 flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleGoBack}
                  className="flex-1 px-6 py-3 rounded-full font-semibold transition-all duration-200 flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: 'transparent',
                    color: '#4D4D4D',
                    border: '2px solid #4D4D4D',
                  }}
                >
                  <ArrowLeft size={20} weight="bold" />
                  <span>Back</span>
                </motion.button>
              </div>
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
                className="rounded-3xl p-8"
                style={{
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 12px 40px rgba(2, 2, 2, 0.15)',
                }}
              >
                <h2 className="font-bold mb-8 text-center text-2xl md:text-3xl" style={{ color: '#4D4D4D' }}>
                  When was this?
                </h2>
                <div className="flex flex-col md:flex-row gap-3 mb-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSetDate('today')}
                    className="flex-1 py-4 rounded-2xl font-semibold transition-all"
                    style={{
                      backgroundColor: '#2A2A2A',
                      color: '#FFFFFF',
                    }}
                  >
                    Today
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSetDate('yesterday')}
                    className="flex-1 py-4 rounded-2xl font-semibold transition-all"
                    style={{
                      backgroundColor: '#2A2A2A',
                      color: '#FFFFFF',
                    }}
                  >
                    Yesterday
                  </motion.button>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowCustomDate(!showCustomDate)}
                  className="w-full py-4 rounded-2xl font-semibold transition-all flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: '#2A2A2A',
                    color: '#FFFFFF',
                  }}
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
                        className="w-full px-4 py-2.5 border-none rounded-2xl focus:outline-none transition-all"
                        style={{
                          backgroundColor: '#2A2A2A',
                          color: '#FFFFFF',
                        }}
                        max={new Date().toISOString().split('T')[0]}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Back Button Row */}
              <div className="mt-6 flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleGoBack}
                  className="flex-1 px-6 py-3 rounded-full font-semibold transition-all duration-200 flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: 'transparent',
                    color: '#4D4D4D',
                    border: '2px solid #4D4D4D',
                  }}
                >
                  <ArrowLeft size={20} weight="bold" />
                  <span>Back</span>
                </motion.button>
              </div>
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
                className="rounded-3xl p-8"
                style={{
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 12px 40px rgba(2, 2, 2, 0.15)',
                }}
              >
                <h2 className="font-bold mb-8 text-center text-2xl md:text-3xl" style={{ color: '#4D4D4D' }}>
                  What was this for?
                </h2>
                <motion.input
                  type="text"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  whileFocus={{ scale: 1.02 }}
                  className="w-full px-4 md:px-6 py-3 md:py-4 border-none rounded-2xl mb-8 focus:outline-none transition-all text-lg md:text-xl"
                  style={{
                    backgroundColor: '#2A2A2A',
                    color: '#FFFFFF',
                  }}
                  placeholder="e.g., Morning coffee"
                />
              </motion.div>

              {/* Back & Save Button Row - Outside Card */}
              <div className="mt-6 flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleGoBack}
                  className="flex-1 px-6 py-3 rounded-full font-semibold transition-all duration-200 flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: 'transparent',
                    color: '#4D4D4D',
                    border: '2px solid #4D4D4D',
                  }}
                >
                  <ArrowLeft size={20} weight="bold" />
                  <span>Back</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSaveTransaction}
                  disabled={isSaving}
                  className="flex-1 px-6 py-3 rounded-full font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: '#EBCDAA',
                    color: '#FFFFFF',
                  }}
                >
                  {isSaving ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                      >
                        <Check size={20} weight="bold" />
                      </motion.div>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <span>Save</span>
                      <Check size={20} weight="bold" />
                    </>
                  )}
                </motion.button>
              </div>
            </>
          )}

          {/* Step 7: Success / Scrapbook */}
          {wizardStep === 7 && (
            <>
              <motion.div
                key="step-7"
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="rounded-3xl p-8 text-center"
                style={{
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 12px 40px rgba(2, 2, 2, 0.15)',
                }}
              >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 15,
                }}
                className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: '#2A2A2A',
                }}
              >
                <Check size={48} style={{ color: '#EBCDAA' }} weight="bold" />
              </motion.div>
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-bold mb-2"
                style={{ color: '#4D4D4D' }}
              >
                Transaction Saved!
              </motion.h2>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mb-8"
                style={{ color: 'rgba(77, 77, 77, 0.6)' }}
              >
                ${formData.amount} spent on {formData.category}
              </motion.p>
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleTrackAnother}
                  className="flex-1 py-2.5 rounded-xl font-semibold transition"
                  style={{
                    backgroundColor: 'transparent',
                    color: '#4D4D4D',
                    border: '2px solid #4D4D4D',
                  }}
                >
                  Track Another
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDone}
                  className="flex-1 py-2.5 rounded-xl font-semibold transition"
                  style={{
                    backgroundColor: '#020202',
                    color: '#FFFFFF',
                  }}
                >
                  Done
                </motion.button>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-4 py-2.5 border border-dashed border-[#4D4D4D] rounded-xl text-[#4D4D4D] font-semibold hover:bg-[#4D4D4D]/10 transition flex items-center justify-center gap-2"
              >
                <Camera size={20} />
                Add Photo
              </motion.button>
            </motion.div>
            </>
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
                className="rounded-3xl p-8 max-w-sm w-full text-center relative z-10"
                style={{ backgroundColor: '#2A2A2A' }}
              >
                {/* Badge icon with glow effect */}
                <motion.div
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(235, 205, 170, 0.3)',
                      '0 0 40px rgba(235, 205, 170, 0.6)',
                      '0 0 20px rgba(235, 205, 170, 0.3)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: '#020202' }}
                >
                  {React.createElement(getAchievementIcon(newlyUnlockedBadge.icon), {
                    size: 48,
                    style: { color: '#EBCDAA' },
                    weight: 'fill',
                  })}
                </motion.div>

                <h2 className="text-2xl font-bold mb-2" style={{ color: '#FFFFFF' }}>
                  Achievement Unlocked!
                </h2>
                <p className="text-xl font-semibold mb-2" style={{ color: '#EBCDAA' }}>
                  {newlyUnlockedBadge.name}
                </p>
                <p className="text-sm mb-6" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                  {newlyUnlockedBadge.description}
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setShowBadgeUnlock(false);
                    setNewlyUnlockedBadge(null);
                  }}
                  className="w-full py-3 rounded-xl font-semibold"
                  style={{ backgroundColor: '#EBCDAA', color: '#020202' }}
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
              className="fixed inset-0 z-40 flex items-center justify-center p-4"
              style={{ backgroundColor: 'rgba(2, 2, 2, 0.8)' }}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ type: 'spring', duration: 0.5 }}
                className="rounded-3xl p-6 max-w-sm w-full text-center"
                style={{ backgroundColor: budgetAlert.status === 'danger' ? '#2A2A2A' : '#2A2A2A' }}
              >
                <motion.div
                  animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                  className="text-6xl mb-4"
                >
                  {budgetAlert.status === 'danger' ? '🚨' : '⚠️'}
                </motion.div>

                <h3 className="text-xl font-bold mb-2" style={{ color: '#FFFFFF' }}>
                  {budgetAlert.status === 'danger' ? 'Budget Exceeded!' : 'Budget Warning!'}
                </h3>

                <p className="mb-4" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                  You've spent <strong style={{ color: '#EBCDAA' }}>${budgetAlert.spent.toFixed(2)}</strong> on{' '}
                  <strong style={{ color: '#EBCDAA' }}>{budgetAlert.categoryName}</strong> this {budgetAlert.period}.
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
                  className="w-full py-3 rounded-xl font-semibold"
                  style={{ backgroundColor: '#EBCDAA', color: '#020202' }}
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
