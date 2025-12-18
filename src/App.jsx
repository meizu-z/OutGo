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
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Form data
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    paymentType: '',
    date: new Date().toISOString(),
    description: '',
  });

  // Analytics data
  const [analyticsData, setAnalyticsData] = useState({
    period: 'today',
    total: 0,
    transactions: [],
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
      date: formData.date,
      description: formData.description,
      hasPhoto: false,
    });

    setIsSaving(false);
    setShowConfetti(true);
    setWizardStep(6);

    // Stop confetti after 5 seconds
    setTimeout(() => setShowConfetti(false), 5000);
  };

  const handleTrackAnother = () => {
    setFormData({
      amount: '',
      category: '',
      paymentType: '',
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
    setWizardStep(5);
  };

  // =============================================
  // RENDER: Analytics View
  // =============================================
  if (currentView === 'analytics') {
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
        className="min-h-screen bg-[#E8D1A7] flex items-center justify-center p-4"
      >
        <div className="w-full max-w-md">
          {/* Main Analytics Card */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-[#442D1C] rounded-3xl p-6 mb-6"
          >
            {/* Top Section: Spent Amount */}
            <div className="flex items-start justify-between mb-8">
              {/* Left: Focus */}
              <div>
                <motion.p
                  key={analyticsData.period}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[#84592B] text-sm mb-2"
                >
                  Spent {periodLabels[analyticsData.period]}
                </motion.p>
                <motion.p
                  key={analyticsData.total}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="text-[#E8D1A7] text-5xl font-bold"
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
                      ? 'bg-[#743014] text-[#E8D1A7]'
                      : 'text-[#84592B] hover:bg-[#743014]/20'
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
                      ? 'bg-[#743014] text-[#E8D1A7]'
                      : 'text-[#84592B] hover:bg-[#743014]/20'
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
                      ? 'bg-[#743014] text-[#E8D1A7]'
                      : 'text-[#84592B] hover:bg-[#743014]/20'
                  }`}
                >
                  <Stack size={24} />
                </motion.button>
              </div>
            </div>

            {/* Bottom Section: Ledger */}
            <div>
              <h3 className="text-[#84592B] text-sm mb-4">
                {periodLabels[analyticsData.period]}'s Ledger
              </h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                <AnimatePresence>
                  {analyticsData.transactions.map((transaction, index) => {
                    const CategoryIcon = CATEGORIES.find(
                      (c) => c.name === transaction.category
                    )?.icon || Coffee;

                    return (
                      <motion.div
                        key={transaction.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center justify-between text-[#E8D1A7]"
                      >
                        <div className="flex items-center gap-3">
                          <CategoryIcon size={20} className="text-[#84592B]" />
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

          {/* Back to Home Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setCurrentView('home')}
            className="w-full py-3 bg-[#442D1C] text-[#E8D1A7] rounded-xl hover:bg-[#743014] transition"
          >
            Back to Home
          </motion.button>
        </div>
      </motion.div>
    );
  }

  // =============================================
  // RENDER: Home View (Wizard)
  // =============================================
  return (
    <div className="min-h-screen bg-[#E8D1A7] flex flex-col items-center justify-center p-4">
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
          colors={['#E8D1A7', '#442D1C', '#84592B', '#743014']}
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
              {/* Big Circle Button with Pulse Animation */}
              <motion.button
                onClick={handleStartTracking}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="w-48 h-48 rounded-full border-4 border-dashed border-[#84592B] flex items-center justify-center text-[#442D1C] text-xl font-semibold hover:bg-[#84592B]/10 transition mb-20 relative"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0"
                >
                  <Sparkle
                    size={24}
                    className="absolute top-4 right-8 text-[#743014]"
                    weight="fill"
                  />
                </motion.div>
                Start Tracking!
              </motion.button>

              {/* Bottom Navigation */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex gap-8"
              >
                <motion.button
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setCurrentView('analytics');
                    fetchAnalytics('today');
                  }}
                  className="flex flex-col items-center gap-2 text-[#442D1C] hover:text-[#743014] transition"
                >
                  <ChartBar size={32} weight="duotone" />
                  <span className="text-sm">Analytics</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center gap-2 text-[#442D1C] hover:text-[#743014] transition"
                >
                  <User size={32} weight="duotone" />
                  <span className="text-sm">Profile</span>
                </motion.button>
              </motion.div>
            </motion.div>
          )}

          {/* Step 1: Amount Input */}
          {wizardStep === 1 && (
            <motion.div
              key="step-1"
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-3xl p-8 shadow-lg"
            >
              <motion.h2
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-[#442D1C] text-2xl font-bold mb-6 text-center"
              >
                How much?
              </motion.h2>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#84592B] text-3xl">
                  $
                </span>
                <motion.input
                  type="number"
                  autoFocus
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                  whileFocus={{ scale: 1.02 }}
                  className="w-full pl-12 pr-4 py-4 text-4xl font-bold text-[#442D1C] border-2 border-[#84592B] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#743014] transition-all"
                  placeholder="0.00"
                  step="0.01"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => formData.amount && setWizardStep(2)}
                disabled={!formData.amount}
                className="mt-6 w-full bg-[#743014] text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-[#442D1C] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next <ArrowRight size={20} weight="bold" />
              </motion.button>
            </motion.div>
          )}

          {/* Step 2: Category Selection */}
          {wizardStep === 2 && (
            <motion.div
              key="step-2"
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-3xl p-8 shadow-lg"
            >
              <h2 className="text-[#442D1C] text-2xl font-bold mb-6 text-center">
                What category?
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {CATEGORIES.map((cat, index) => {
                  const Icon = cat.icon;
                  return (
                    <motion.button
                      key={cat.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setFormData({ ...formData, category: cat.name });
                        setWizardStep(3);
                      }}
                      className="aspect-square flex flex-col items-center justify-center gap-2 border-2 border-[#84592B] rounded-2xl hover:bg-[#743014] hover:text-white hover:border-[#743014] transition group"
                    >
                      <Icon
                        size={32}
                        className="group-hover:text-white text-[#743014]"
                      />
                      <span className="text-xs font-medium text-[#442D1C] group-hover:text-white">
                        {cat.name}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Step 3: Payment Type */}
          {wizardStep === 3 && (
            <motion.div
              key="step-3"
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-3xl p-8 shadow-lg"
            >
              <h2 className="text-[#442D1C] text-2xl font-bold mb-6 text-center">
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
                      setWizardStep(4);
                    }}
                    className="py-4 px-6 border-2 border-[#84592B] rounded-xl text-[#442D1C] font-semibold hover:bg-[#743014] hover:text-white hover:border-[#743014] transition"
                  >
                    {type}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 4: Date Selection */}
          {wizardStep === 4 && (
            <motion.div
              key="step-4"
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-3xl p-8 shadow-lg"
            >
              <h2 className="text-[#442D1C] text-2xl font-bold mb-6 text-center">
                When was this?
              </h2>
              <div className="flex gap-4 mb-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSetDate('today')}
                  className="flex-1 py-4 border-2 border-[#84592B] rounded-xl text-[#442D1C] font-semibold hover:bg-[#743014] hover:text-white hover:border-[#743014] transition"
                >
                  Today
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSetDate('yesterday')}
                  className="flex-1 py-4 border-2 border-[#84592B] rounded-xl text-[#442D1C] font-semibold hover:bg-[#743014] hover:text-white hover:border-[#743014] transition"
                >
                  Yesterday
                </motion.button>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setWizardStep(5)}
                className="w-full py-4 border-2 border-[#84592B] rounded-xl text-[#442D1C] font-semibold hover:bg-[#743014] hover:text-white hover:border-[#743014] transition flex items-center justify-center gap-2"
              >
                <Calendar size={20} />
                Pick Another Date
              </motion.button>
            </motion.div>
          )}

          {/* Step 5: Description & Save */}
          {wizardStep === 5 && (
            <motion.div
              key="step-5"
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-3xl p-8 shadow-lg"
            >
              <h2 className="text-[#442D1C] text-2xl font-bold mb-6 text-center">
                What was this for?
              </h2>
              <motion.input
                type="text"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                whileFocus={{ scale: 1.02 }}
                className="w-full px-4 py-3 border-2 border-[#84592B] rounded-xl text-[#442D1C] focus:outline-none focus:ring-2 focus:ring-[#743014] mb-6 transition-all"
                placeholder="e.g., Morning coffee"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSaveTransaction}
                disabled={isSaving}
                className="w-full bg-[#743014] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#442D1C] transition disabled:opacity-50 relative overflow-hidden"
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
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    Saving...
                  </motion.div>
                ) : (
                  'SAVE TRANSACTION'
                )}
              </motion.button>
            </motion.div>
          )}

          {/* Step 6: Success / Scrapbook */}
          {wizardStep === 6 && (
            <motion.div
              key="step-6"
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-3xl p-8 shadow-lg text-center"
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
                className="text-[#442D1C] text-2xl font-bold mb-2"
              >
                Transaction Saved!
              </motion.h2>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-[#84592B] mb-8"
              >
                ${formData.amount} spent on {formData.category}
              </motion.p>
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleTrackAnother}
                  className="flex-1 py-3 border-2 border-[#84592B] rounded-xl text-[#442D1C] font-semibold hover:bg-[#84592B] hover:text-white transition"
                >
                  Track Another
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDone}
                  className="flex-1 py-3 bg-[#743014] text-white rounded-xl font-semibold hover:bg-[#442D1C] transition"
                >
                  Done
                </motion.button>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-4 py-3 border-2 border-dashed border-[#84592B] rounded-xl text-[#84592B] font-semibold hover:bg-[#84592B]/10 transition flex items-center justify-center gap-2"
              >
                <Camera size={20} />
                Add Photo
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
