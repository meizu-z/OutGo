import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  EnvelopeSimple, 
  Lock, 
  Eye, 
  EyeSlash, 
  ArrowRight,
  SpinnerGap,
  CheckCircle,
  WarningCircle
} from 'phosphor-react';
import { auth } from '../lib/supabase';

const Auth = ({ onAuthSuccess }) => {
  const [mode, setMode] = useState('login'); // 'login' | 'signup' | 'forgot'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (mode === 'signup') {
        if (password !== confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }
        if (password.length < 6) {
          setError('Password must be at least 6 characters');
          setLoading(false);
          return;
        }

        const { data, error } = await auth.signUp(email, password);
        if (error) throw error;
        
        setSuccess('Check your email to confirm your account!');
        setMode('login');
      } else if (mode === 'login') {
        const { data, error } = await auth.signIn(email, password);
        if (error) throw error;
        
        if (data?.user) {
          onAuthSuccess?.(data.user);
        }
      } else if (mode === 'forgot') {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: window.location.origin,
        });
        if (error) throw error;
        
        setSuccess('Password reset email sent!');
        setMode('login');
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const inputStyles = {
    backgroundColor: 'rgba(77, 77, 77, 0.08)',
    color: '#4D4D4D',
    border: '2px solid transparent',
  };

  const inputFocusStyles = {
    border: '2px solid #EBCDAA',
    outline: 'none',
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: '#FFFFFF' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        {/* Logo / Title */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h1 
            className="text-4xl font-bold mb-2"
            style={{ color: '#020202' }}
          >
            OutGo
          </h1>
          <p style={{ color: '#4D4D4D' }}>
            {mode === 'login' && 'Welcome back'}
            {mode === 'signup' && 'Create your account'}
            {mode === 'forgot' && 'Reset your password'}
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          className="rounded-3xl p-6"
          style={{
            backgroundColor: '#FFFFFF',
            boxShadow: '0 12px 40px rgba(2, 2, 2, 0.1)',
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-2 p-3 rounded-xl"
                  style={{ backgroundColor: 'rgba(244, 67, 54, 0.1)' }}
                >
                  <WarningCircle size={20} style={{ color: '#F44336' }} />
                  <span className="text-sm" style={{ color: '#F44336' }}>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Success Message */}
            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-2 p-3 rounded-xl"
                  style={{ backgroundColor: 'rgba(76, 175, 80, 0.1)' }}
                >
                  <CheckCircle size={20} style={{ color: '#4CAF50' }} />
                  <span className="text-sm" style={{ color: '#4CAF50' }}>{success}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email Input */}
            <div className="relative">
              <EnvelopeSimple 
                size={20} 
                className="absolute left-4 top-1/2 -translate-y-1/2"
                style={{ color: '#4D4D4D' }}
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-3.5 rounded-xl text-base transition-all duration-200"
                style={inputStyles}
                onFocus={(e) => Object.assign(e.target.style, inputFocusStyles)}
                onBlur={(e) => Object.assign(e.target.style, inputStyles)}
              />
            </div>

            {/* Password Input */}
            {mode !== 'forgot' && (
              <div className="relative">
                <Lock 
                  size={20} 
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                  style={{ color: '#4D4D4D' }}
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-12 py-3.5 rounded-xl text-base transition-all duration-200"
                  style={inputStyles}
                  onFocus={(e) => Object.assign(e.target.style, inputFocusStyles)}
                  onBlur={(e) => Object.assign(e.target.style, inputStyles)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1"
                  style={{ color: '#4D4D4D' }}
                >
                  {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                </button>
              </div>
            )}

            {/* Confirm Password (Signup only) */}
            {mode === 'signup' && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="relative"
              >
                <Lock 
                  size={20} 
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                  style={{ color: '#4D4D4D' }}
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl text-base transition-all duration-200"
                  style={inputStyles}
                  onFocus={(e) => Object.assign(e.target.style, inputFocusStyles)}
                  onBlur={(e) => Object.assign(e.target.style, inputStyles)}
                />
              </motion.div>
            )}

            {/* Forgot Password Link */}
            {mode === 'login' && (
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => {
                    setMode('forgot');
                    setError('');
                    setSuccess('');
                  }}
                  className="text-sm hover:underline"
                  style={{ color: '#EBCDAA' }}
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="w-full py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-200"
              style={{
                backgroundColor: '#020202',
                color: '#FFFFFF',
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <SpinnerGap size={20} weight="bold" />
                </motion.div>
              ) : (
                <>
                  <span>
                    {mode === 'login' && 'Sign In'}
                    {mode === 'signup' && 'Create Account'}
                    {mode === 'forgot' && 'Send Reset Email'}
                  </span>
                  <ArrowRight size={20} weight="bold" />
                </>
              )}
            </motion.button>
          </form>

          {/* Toggle Mode */}
          <div className="mt-6 text-center">
            {mode === 'login' && (
              <p style={{ color: '#4D4D4D' }}>
                Don't have an account?{' '}
                <button
                  onClick={() => {
                    setMode('signup');
                    setError('');
                    setSuccess('');
                  }}
                  className="font-semibold hover:underline"
                  style={{ color: '#020202' }}
                >
                  Sign up
                </button>
              </p>
            )}
            {mode === 'signup' && (
              <p style={{ color: '#4D4D4D' }}>
                Already have an account?{' '}
                <button
                  onClick={() => {
                    setMode('login');
                    setError('');
                    setSuccess('');
                  }}
                  className="font-semibold hover:underline"
                  style={{ color: '#020202' }}
                >
                  Sign in
                </button>
              </p>
            )}
            {mode === 'forgot' && (
              <button
                onClick={() => {
                  setMode('login');
                  setError('');
                  setSuccess('');
                }}
                className="font-semibold hover:underline"
                style={{ color: '#020202' }}
              >
                Back to sign in
              </button>
            )}
          </div>
        </motion.div>

        {/* Footer */}
        <p 
          className="text-center mt-6 text-sm"
          style={{ color: 'rgba(77, 77, 77, 0.5)' }}
        >
          Track your expenses, achieve your goals
        </p>
      </motion.div>
    </div>
  );
};

export default Auth;
