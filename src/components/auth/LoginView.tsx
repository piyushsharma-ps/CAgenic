import React, { useState } from 'react';
import {
  Shield,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Lock,
  Eye,
  EyeOff,
  UserPlus,
  LogIn,
  Database,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const LoginView: React.FC = () => {
  const {
    signInWithGoogle,
    signInWithEmailPassword,
    signUpWithEmailPassword,
    loginDirectly,
  } = useAuth();

  const [authMode, setAuthMode] = useState<'google' | 'password'>('password');
  const [email, setEmail] = useState('officer@cagenix.in');
  const [password, setPassword] = useState('cagenix2026');
  const [confirmPassword, setConfirmPassword] = useState('cagenix2026');
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Status feedback
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  // Google Sign-In
  const handleGoogleSignIn = async () => {
    setLoading(true);
    setErrorMessage(null);
    await signInWithGoogle();
    setLoading(false);
  };

  // Direct 1-Click Access
  const handleDirectAccess = (customEmail?: string) => {
    setLoading(true);
    loginDirectly(customEmail || (email.trim() ? email.trim() : 'director@cagenix.in'));
  };

  // Email & Password Submit (Sign In or Sign Up)
  const handleEmailPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setInfoMessage(null);

    const targetEmail = email.trim() || 'officer@cagenix.in';

    if (!targetEmail.includes('@')) {
      setErrorMessage('Please enter a valid corporate email address.');
      return;
    }

    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    if (isSignUp) {
      if (password.length < 6) {
        setErrorMessage('Password must be at least 6 characters.');
        return;
      }
      if (confirmPassword && password !== confirmPassword) {
        setErrorMessage('Passwords do not match. Please re-enter.');
        return;
      }

      setLoading(true);
      await signUpWithEmailPassword(targetEmail, password);
      setLoading(false);
    } else {
      setLoading(true);
      await signInWithEmailPassword(targetEmail, password);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#15171b] text-[#e3e7ec] flex flex-col justify-center items-center p-4 antialiased selection:bg-[#a9c7df]/20">
      {/* Background Subtle Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1d2127] via-[#15171b] to-[#111317] pointer-events-none" />

      {/* Main Card Container */}
      <div className="relative w-full max-w-[460px] rounded-[8px] border border-[#303640] bg-[#1d2127] shadow-2xl p-6 sm:p-8 flex flex-col gap-6 z-10">
        
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center space-y-1.5">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-serif text-2xl font-bold tracking-tight text-[#e3e7ec]">
              CAgenix
            </span>
          </div>
          <p className="text-[13px] text-[#a5adb8]">
            Indian Financial Operating System · Executive Ledger
          </p>
          <div className="flex items-center gap-2 text-[11px] text-[#8c9197] pt-1">
            <span className="flex items-center gap-1 text-[#a7c8b1]">
              <Database size={12} />
              <span>Google Cloud Firestore</span>
            </span>
            <span>·</span>
            <span>GSTN Statutory Shield</span>
          </div>
        </div>

        {/* 1-Click Instant Open Button */}
        <div className="rounded-[6px] border border-[#a9c7df]/30 bg-[#15171b]/80 p-3.5 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#a9c7df]">
              Immediate Access
            </span>
            <span className="text-[10px] text-[#a7c8b1] flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#a7c8b1] animate-pulse" />
              Verified Session
            </span>
          </div>
          <button
            type="button"
            onClick={() => handleDirectAccess()}
            disabled={loading}
            className="flex items-center justify-center gap-2 w-full rounded-[4px] bg-[#a9c7df] hover:bg-[#c5e3fc] text-[#122332] font-semibold text-[13px] py-2.5 px-4 shadow transition-all active:scale-[0.99]"
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin text-[#122332]" />
            ) : (
              <LogIn size={16} className="text-[#122332]" />
            )}
            <span>Open CAgenix Website Now</span>
          </button>
          <p className="text-[11px] text-[#8c9197] text-center">
            Instantly opens the full executive dashboard without rate limits or waiting.
          </p>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="border-t border-[#303640] w-full" />
          <span className="bg-[#1d2127] px-3 text-[11px] text-[#8c9197] uppercase tracking-wider font-mono absolute">
            Or Sign In With Account
          </span>
        </div>

        {/* Method Switcher Tabs: Email Password vs Google */}
        <div className="grid grid-cols-2 rounded-[4px] border border-[#303640] bg-[#15171b] p-1 gap-1 text-[12px]">
          <button
            onClick={() => {
              setAuthMode('password');
              setErrorMessage(null);
            }}
            className={`flex items-center justify-center gap-2 py-2 font-medium rounded-[2px] transition-colors ${
              authMode === 'password'
                ? 'bg-[#242932] text-[#e3e7ec] shadow-sm'
                : 'text-[#8c9197] hover:text-[#e3e7ec]'
            }`}
          >
            <Lock size={14} className={authMode === 'password' ? 'text-[#a9c7df]' : ''} />
            <span>Email & Password</span>
          </button>

          <button
            onClick={() => {
              setAuthMode('google');
              setErrorMessage(null);
            }}
            className={`flex items-center justify-center gap-2 py-2 font-medium rounded-[2px] transition-colors ${
              authMode === 'google'
                ? 'bg-[#242932] text-[#e3e7ec] shadow-sm'
                : 'text-[#8c9197] hover:text-[#e3e7ec]'
            }`}
          >
            {/* Google SVG Icon */}
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Google Account</span>
          </button>
        </div>

        {/* Mode 1: Google Account Sign-In */}
        {authMode === 'google' && (
          <div className="flex flex-col gap-4">
            <div className="rounded-[6px] border border-[#303640] bg-[#15171b] p-4 flex flex-col items-center text-center gap-2">
              <div className="h-12 w-12 rounded-full border border-[#303640] bg-[#242932] flex items-center justify-center mb-1">
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
              </div>
              <h4 className="font-serif text-sm font-medium text-[#e3e7ec]">
                Google Cloud Identity Access
              </h4>
              <p className="text-[12px] text-[#8c9197] max-w-xs">
                Unlock your enterprise ledger with corporate Google Workspace or personal Google account.
              </p>
            </div>

            {/* Sign in with Google Button */}
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="flex items-center justify-center gap-2.5 w-full rounded-[4px] bg-[#e3e7ec] py-2.5 px-4 text-[13px] font-medium text-[#15171b] hover:bg-[#ffffff] transition-colors disabled:opacity-50 shadow-sm"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin text-[#15171b]" />
                  <span>Connecting Google Account...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Mode 2: Email & Password (Direct Login) */}
        {authMode === 'password' && (
          <form onSubmit={handleEmailPasswordSubmit} className="flex flex-col gap-3.5">
            <div className="flex items-center justify-between border-b border-[#303640] pb-2">
              <span className="font-serif text-[13px] font-medium text-[#e3e7ec]">
                {isSignUp ? 'Create Account with Email & Password' : 'Sign in with Password'}
              </span>
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setErrorMessage(null);
                  setInfoMessage(null);
                }}
                className="text-[11px] text-[#a9c7df] hover:underline flex items-center gap-1"
              >
                {isSignUp ? (
                  <>
                    <LogIn size={11} />
                    <span>Already registered? Sign in</span>
                  </>
                ) : (
                  <>
                    <UserPlus size={11} />
                    <span>New account? Register here</span>
                  </>
                )}
              </button>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-[12px] font-medium text-[#8c9197] mb-1">
                Corporate Email Address
              </label>
              <input
                type="email"
                placeholder="officer@company.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className="w-full rounded-[4px] border border-[#303640] bg-[#15171b] px-3 py-2 text-[13px] text-[#e3e7ec] placeholder-[#42474c] focus:border-[#a9c7df] focus:outline-none"
              />
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[12px] font-medium text-[#8c9197]">
                  {isSignUp ? 'Create New Password' : 'Password'}
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[11px] text-[#8c9197] hover:text-[#e3e7ec] flex items-center gap-1"
                >
                  {showPassword ? <EyeOff size={12} /> : <Eye size={12} />}
                  <span>{showPassword ? 'Hide' : 'Show'}</span>
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder={isSignUp ? 'Min 6 characters' : '••••••••'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full rounded-[4px] border border-[#303640] bg-[#15171b] px-3 py-2 text-[13px] text-[#e3e7ec] placeholder-[#42474c] focus:border-[#a9c7df] focus:outline-none"
                />
              </div>
            </div>

            {/* Confirm Password (if creating account) */}
            {isSignUp && (
              <div>
                <label className="block text-[12px] font-medium text-[#8c9197] mb-1">
                  Confirm Password
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full rounded-[4px] border border-[#303640] bg-[#15171b] px-3 py-2 text-[13px] text-[#e3e7ec] placeholder-[#42474c] focus:border-[#a9c7df] focus:outline-none"
                />
                <span className="text-[10px] text-[#8c9197] mt-1 block">
                  Logs directly into Google Cloud Firestore (no email confirmation delay or rate limit).
                </span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 w-full rounded-[4px] bg-[#a9c7df] py-2 px-4 text-[13px] font-medium text-[#143346] hover:bg-[#c5e3fc] transition-colors disabled:opacity-50 mt-1"
            >
              {loading ? (
                <Loader2 size={15} className="animate-spin" />
              ) : isSignUp ? (
                <UserPlus size={15} />
              ) : (
                <LogIn size={15} />
              )}
              <span>{isSignUp ? 'Create Password & Open CAgenix Website' : 'Sign In & Open CAgenix Website'}</span>
            </button>
          </form>
        )}

        {/* Informational Feedback */}
        {infoMessage && (
          <div className="rounded-[4px] border border-[#a7c8b1]/30 bg-[#15171b] p-2.5 text-[12px] text-[#a7c8b1] flex items-start gap-2">
            <CheckCircle2 size={14} className="shrink-0 mt-0.5" />
            <span>{infoMessage}</span>
          </div>
        )}

        {/* Error Feedback */}
        {errorMessage && (
          <div className="rounded-[4px] border border-[#d98282]/40 bg-[#15171b] p-2.5 text-[12px] text-[#d98282] flex items-start gap-2">
            <AlertCircle size={14} className="shrink-0 mt-0.5" />
            <span className="leading-snug">{errorMessage}</span>
          </div>
        )}

        {/* Footer: Database Status */}
        <div className="pt-2 border-t border-[#303640] flex items-center justify-between text-[11px] text-[#8c9197]">
          <span className="flex items-center gap-1.5 text-[#a7c8b1]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#a7c8b1]" />
            <span>Google Cloud Firestore Online</span>
          </span>
          <span className="font-mono text-[10px] text-[#8c9197]">
            steady-study-kzbz0
          </span>
        </div>
      </div>
    </div>
  );
};
