import { createClient } from '@supabase/supabase-js';

// Supabase configuration
// Replace these with your actual Supabase project credentials
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// =============================================
// AUTH HELPERS
// =============================================

export const auth = {
  // Sign up with email and password
  signUp: async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    return { data, error };
  },

  // Sign in with email and password
  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  },

  // Sign out
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  // Get current user
  getUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
  },

  // Get current session
  getSession: async () => {
    const { data: { session }, error } = await supabase.auth.getSession();
    return { session, error };
  },

  // Listen to auth state changes
  onAuthStateChange: (callback) => {
    return supabase.auth.onAuthStateChange(callback);
  },
};

// =============================================
// TRANSACTIONS API
// =============================================

export const transactions = {
  // Get all transactions for current user
  getAll: async () => {
    const { data, error } = await supabase
      .from('transactions')
      .select('*, payment_sources(nickname, type)')
      .order('date', { ascending: false });
    return { data, error };
  },

  // Get transactions by date range
  getByDateRange: async (startDate, endDate) => {
    const { data, error } = await supabase
      .from('transactions')
      .select('*, payment_sources(nickname, type)')
      .gte('date', startDate)
      .lte('date', endDate)
      .order('date', { ascending: false });
    return { data, error };
  },

  // Get transactions for a specific period
  getByPeriod: async (period) => {
    const now = new Date();
    let startDate;

    switch (period) {
      case 'today':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case 'week':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      default:
        startDate = new Date(0);
    }

    return transactions.getByDateRange(startDate.toISOString(), now.toISOString());
  },

  // Create a new transaction
  create: async (transaction) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { data: null, error: { message: 'Not authenticated' } };

    const { data, error } = await supabase
      .from('transactions')
      .insert({
        ...transaction,
        user_id: user.id,
      })
      .select()
      .single();
    return { data, error };
  },

  // Update a transaction
  update: async (id, updates) => {
    const { data, error } = await supabase
      .from('transactions')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  },

  // Delete a transaction
  delete: async (id) => {
    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', id);
    return { error };
  },

  // Get category totals for a period
  getCategoryTotals: async (period) => {
    const { data, error } = await transactions.getByPeriod(period);
    if (error) return { data: null, error };

    const totals = data.reduce((acc, tx) => {
      acc[tx.category] = (acc[tx.category] || 0) + parseFloat(tx.amount);
      return acc;
    }, {});

    return { data: totals, error: null };
  },
};

// =============================================
// PAYMENT SOURCES API
// =============================================

export const paymentSources = {
  // Get all payment sources for current user
  getAll: async () => {
    const { data, error } = await supabase
      .from('payment_sources')
      .select('*')
      .order('created_at', { ascending: false });
    return { data, error };
  },

  // Create a new payment source
  create: async (source) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { data: null, error: { message: 'Not authenticated' } };

    const { data, error } = await supabase
      .from('payment_sources')
      .insert({
        ...source,
        user_id: user.id,
      })
      .select()
      .single();
    return { data, error };
  },

  // Update a payment source
  update: async (id, updates) => {
    const { data, error } = await supabase
      .from('payment_sources')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  },

  // Delete a payment source
  delete: async (id) => {
    const { error } = await supabase
      .from('payment_sources')
      .delete()
      .eq('id', id);
    return { error };
  },
};

// =============================================
// CATEGORIES API
// =============================================

export const categories = {
  // Get all categories (default + custom)
  getAll: async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('is_default', { ascending: false })
      .order('name', { ascending: true });
    return { data, error };
  },

  // Get only custom categories for current user
  getCustom: async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('is_default', false)
      .order('name', { ascending: true });
    return { data, error };
  },

  // Create a custom category
  create: async (category) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { data: null, error: { message: 'Not authenticated' } };

    const { data, error } = await supabase
      .from('categories')
      .insert({
        ...category,
        user_id: user.id,
        is_default: false,
      })
      .select()
      .single();
    return { data, error };
  },

  // Update a custom category
  update: async (id, updates) => {
    const { data, error } = await supabase
      .from('categories')
      .update(updates)
      .eq('id', id)
      .eq('is_default', false) // Can only update custom categories
      .select()
      .single();
    return { data, error };
  },

  // Delete a custom category
  delete: async (id) => {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id)
      .eq('is_default', false); // Can only delete custom categories
    return { error };
  },
};

// =============================================
// USER SETTINGS API
// =============================================

export const userSettings = {
  // Get user settings
  get: async () => {
    const { data, error } = await supabase
      .from('user_settings')
      .select('*')
      .single();
    return { data, error };
  },

  // Create or update user settings (upsert)
  upsert: async (settings) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { data: null, error: { message: 'Not authenticated' } };

    const { data, error } = await supabase
      .from('user_settings')
      .upsert({
        ...settings,
        user_id: user.id,
      })
      .select()
      .single();
    return { data, error };
  },
};

// =============================================
// SPENDING LIMITS API
// =============================================

export const spendingLimits = {
  // Get all spending limits for current user
  getAll: async () => {
    const { data, error } = await supabase
      .from('spending_limits')
      .select('*')
      .order('category', { ascending: true });
    return { data, error };
  },

  // Create or update a spending limit
  upsert: async (limit) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { data: null, error: { message: 'Not authenticated' } };

    const { data, error } = await supabase
      .from('spending_limits')
      .upsert({
        ...limit,
        user_id: user.id,
      })
      .select()
      .single();
    return { data, error };
  },

  // Delete a spending limit
  delete: async (id) => {
    const { error } = await supabase
      .from('spending_limits')
      .delete()
      .eq('id', id);
    return { error };
  },
};

// =============================================
// USER ACHIEVEMENTS API
// =============================================

export const achievements = {
  // Get all unlocked achievements for current user
  getUnlocked: async () => {
    const { data, error } = await supabase
      .from('user_achievements')
      .select('*')
      .order('unlocked_at', { ascending: false });
    return { data, error };
  },

  // Unlock an achievement
  unlock: async (achievementId) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { data: null, error: { message: 'Not authenticated' } };

    const { data, error } = await supabase
      .from('user_achievements')
      .insert({
        user_id: user.id,
        achievement_id: achievementId,
        unlocked_at: new Date().toISOString(),
      })
      .select()
      .single();
    return { data, error };
  },

  // Check if an achievement is unlocked
  isUnlocked: async (achievementId) => {
    const { data, error } = await supabase
      .from('user_achievements')
      .select('id')
      .eq('achievement_id', achievementId)
      .single();
    return { isUnlocked: !!data, error };
  },
};

export default supabase;
