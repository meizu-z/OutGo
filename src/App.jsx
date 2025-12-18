import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
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
  Confetti,
} from 'phosphor-react';

// Initialize Supabase client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// Category configuration
const CATEGORIES = [
  { name: 'Coffee', icon: Coffee },
  { name: 'Transport', icon: Train },
  { name: 'Utilities', icon: Lightning },
  { name: 'Shopping', icon: Tote },
  { name: 'Health', icon: FirstAid },
  { name: 'Entertainment', icon: Confetti },
];

function App() {
  // View management: 'home' or 'analytics'
  const [currentView, setCurrentView] = useState('home');

  // Wizard step: 0 (resting) to 6 (success)
  const [wizardStep, setWizardStep] = useState(0);

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
    period: 'today', // 'today', 'week', 'month', 'year'
    total: 0,
    transactions: [],
  });

  // Payment sources (fetched from DB)
  const [paymentSources, setPaymentSources] = useState([]);

  // Fetch payment sources on mount
  useEffect(() => {
    fetchPaymentSources();
  }, []);

  const fetchPaymentSources = async () => {
    const { data, error } = await supabase
      .from('payment_sources')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setPaymentSources(data);
    }
  };

  const fetchAnalytics = async (period) => {
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

    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .gte('date', startDate.toISOString())
      .order('date', { ascending: false });

    if (!error && data) {
      const total = data.reduce((sum, t) => sum + parseFloat(t.amount), 0);
      setAnalyticsData({
        period,
        total,
        transactions: data,
      });
    }
  };

  const handleStartTracking = () => {
    setWizardStep(1);
  };

  const handleSaveTransaction = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      alert('Please log in to save transactions');
      return;
    }

    const { error } = await supabase.from('transactions').insert({
      user_id: user.id,
      amount: parseFloat(formData.amount),
      category: formData.category,
      payment_source_id: null, // Link to payment source if needed
      date: formData.date,
      description: formData.description,
      has_photo: false,
    });

    if (error) {
      console.error('Error saving transaction:', error);
      alert('Failed to save transaction');
    } else {
      setWizardStep(6); // Success step
    }
  };

  const handleTrackAnother = () => {
    setFormData({
      amount: '',
      category: '',
      paymentType: '',
      date: new Date().toISOString(),
      description: '',
    });
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
      <div className="min-h-screen bg-[#E8D1A7] flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Main Analytics Card */}
          <div className="bg-[#442D1C] rounded-3xl p-6 mb-6">
            {/* Top Section: Spent Amount */}
            <div className="flex items-start justify-between mb-8">
              {/* Left: Focus */}
              <div>
                <p className="text-[#84592B] text-sm mb-2">
                  Spent {periodLabels[analyticsData.period]}
                </p>
                <p className="text-[#E8D1A7] text-5xl font-bold">
                  ${analyticsData.total.toFixed(2)}
                </p>
              </div>

              {/* Right: Period Selector */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => fetchAnalytics('week')}
                  className={`p-2 rounded-lg transition ${
                    analyticsData.period === 'week'
                      ? 'bg-[#743014] text-[#E8D1A7]'
                      : 'text-[#84592B] hover:bg-[#743014]/20'
                  }`}
                >
                  <CalendarPlus size={24} />
                </button>
                <button
                  onClick={() => fetchAnalytics('month')}
                  className={`p-2 rounded-lg transition ${
                    analyticsData.period === 'month'
                      ? 'bg-[#743014] text-[#E8D1A7]'
                      : 'text-[#84592B] hover:bg-[#743014]/20'
                  }`}
                >
                  <CalendarBlank size={24} />
                </button>
                <button
                  onClick={() => fetchAnalytics('year')}
                  className={`p-2 rounded-lg transition ${
                    analyticsData.period === 'year'
                      ? 'bg-[#743014] text-[#E8D1A7]'
                      : 'text-[#84592B] hover:bg-[#743014]/20'
                  }`}
                >
                  <Stack size={24} />
                </button>
              </div>
            </div>

            {/* Bottom Section: Ledger */}
            <div>
              <h3 className="text-[#84592B] text-sm mb-4">
                {periodLabels[analyticsData.period]}'s Ledger
              </h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {analyticsData.transactions.map((transaction) => {
                  const CategoryIcon = CATEGORIES.find(
                    (c) => c.name === transaction.category
                  )?.icon || Coffee;

                  return (
                    <div
                      key={transaction.id}
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
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Back to Home Button */}
          <button
            onClick={() => setCurrentView('home')}
            className="w-full py-3 bg-[#442D1C] text-[#E8D1A7] rounded-xl hover:bg-[#743014] transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // =============================================
  // RENDER: Home View (Wizard)
  // =============================================
  return (
    <div className="min-h-screen bg-[#E8D1A7] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Step 0: Resting State */}
        {wizardStep === 0 && (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            {/* Big Circle Button */}
            <button
              onClick={handleStartTracking}
              className="w-48 h-48 rounded-full border-4 border-dashed border-[#84592B] flex items-center justify-center text-[#442D1C] text-xl font-semibold hover:bg-[#84592B]/10 transition mb-20"
            >
              Start Tracking!
            </button>

            {/* Bottom Navigation */}
            <div className="flex gap-8">
              <button
                onClick={() => {
                  setCurrentView('analytics');
                  fetchAnalytics('today');
                }}
                className="flex flex-col items-center gap-2 text-[#442D1C] hover:text-[#743014] transition"
              >
                <ChartBar size={32} weight="duotone" />
                <span className="text-sm">Analytics</span>
              </button>
              <button
                className="flex flex-col items-center gap-2 text-[#442D1C] hover:text-[#743014] transition"
              >
                <User size={32} weight="duotone" />
                <span className="text-sm">Profile</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 1: Amount Input */}
        {wizardStep === 1 && (
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <h2 className="text-[#442D1C] text-2xl font-bold mb-6 text-center">
              How much?
            </h2>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#84592B] text-3xl">
                $
              </span>
              <input
                type="number"
                autoFocus
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
                className="w-full pl-12 pr-4 py-4 text-4xl font-bold text-[#442D1C] border-2 border-[#84592B] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#743014]"
                placeholder="0.00"
                step="0.01"
              />
            </div>
            <button
              onClick={() => formData.amount && setWizardStep(2)}
              disabled={!formData.amount}
              className="mt-6 w-full bg-[#743014] text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-[#442D1C] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next <ArrowRight size={20} weight="bold" />
            </button>
          </div>
        )}

        {/* Step 2: Category Selection */}
        {wizardStep === 2 && (
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <h2 className="text-[#442D1C] text-2xl font-bold mb-6 text-center">
              What category?
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.name}
                    onClick={() => {
                      setFormData({ ...formData, category: cat.name });
                      setWizardStep(3);
                    }}
                    className="aspect-square flex flex-col items-center justify-center gap-2 border-2 border-[#84592B] rounded-2xl hover:bg-[#743014] hover:text-white hover:border-[#743014] transition group"
                  >
                    <Icon size={32} className="group-hover:text-white text-[#743014]" />
                    <span className="text-xs font-medium text-[#442D1C] group-hover:text-white">
                      {cat.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 3: Payment Type */}
        {wizardStep === 3 && (
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <h2 className="text-[#442D1C] text-2xl font-bold mb-6 text-center">
              How did you pay?
            </h2>
            <div className="flex flex-col gap-4">
              {['Cash', 'Card', 'Wallet'].map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setFormData({ ...formData, paymentType: type });
                    setWizardStep(4);
                  }}
                  className="py-4 px-6 border-2 border-[#84592B] rounded-xl text-[#442D1C] font-semibold hover:bg-[#743014] hover:text-white hover:border-[#743014] transition"
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Date Selection */}
        {wizardStep === 4 && (
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <h2 className="text-[#442D1C] text-2xl font-bold mb-6 text-center">
              When was this?
            </h2>
            <div className="flex gap-4 mb-4">
              <button
                onClick={() => handleSetDate('today')}
                className="flex-1 py-4 border-2 border-[#84592B] rounded-xl text-[#442D1C] font-semibold hover:bg-[#743014] hover:text-white hover:border-[#743014] transition"
              >
                Today
              </button>
              <button
                onClick={() => handleSetDate('yesterday')}
                className="flex-1 py-4 border-2 border-[#84592B] rounded-xl text-[#442D1C] font-semibold hover:bg-[#743014] hover:text-white hover:border-[#743014] transition"
              >
                Yesterday
              </button>
            </div>
            <button
              onClick={() => setWizardStep(5)}
              className="w-full py-4 border-2 border-[#84592B] rounded-xl text-[#442D1C] font-semibold hover:bg-[#743014] hover:text-white hover:border-[#743014] transition flex items-center justify-center gap-2"
            >
              <Calendar size={20} />
              Pick Another Date
            </button>
          </div>
        )}

        {/* Step 5: Description & Save */}
        {wizardStep === 5 && (
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <h2 className="text-[#442D1C] text-2xl font-bold mb-6 text-center">
              What was this for?
            </h2>
            <input
              type="text"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-4 py-3 border-2 border-[#84592B] rounded-xl text-[#442D1C] focus:outline-none focus:ring-2 focus:ring-[#743014] mb-6"
              placeholder="e.g., Morning coffee"
            />
            <button
              onClick={handleSaveTransaction}
              className="w-full bg-[#743014] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#442D1C] transition"
            >
              SAVE TRANSACTION
            </button>
          </div>
        )}

        {/* Step 6: Success / Scrapbook */}
        {wizardStep === 6 && (
          <div className="bg-white rounded-3xl p-8 shadow-lg text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
              <Check size={48} className="text-green-600" weight="bold" />
            </div>
            <h2 className="text-[#442D1C] text-2xl font-bold mb-2">
              Transaction Saved!
            </h2>
            <p className="text-[#84592B] mb-8">
              ${formData.amount} spent on {formData.category}
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleTrackAnother}
                className="flex-1 py-3 border-2 border-[#84592B] rounded-xl text-[#442D1C] font-semibold hover:bg-[#84592B] hover:text-white transition"
              >
                Track Another
              </button>
              <button
                onClick={handleDone}
                className="flex-1 py-3 bg-[#743014] text-white rounded-xl font-semibold hover:bg-[#442D1C] transition"
              >
                Done
              </button>
            </div>
            <button className="w-full mt-4 py-3 border-2 border-dashed border-[#84592B] rounded-xl text-[#84592B] font-semibold hover:bg-[#84592B]/10 transition flex items-center justify-center gap-2">
              <Camera size={20} />
              Add Photo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
