import { useState } from 'react';
import { Eye, EyeOff, Briefcase, ChevronLeft, Zap } from 'lucide-react';
import type { NavProps } from '../types';

type AuthMode = 'signin' | 'signup' | 'forgot';

export function Auth({ navigate, goBack }: NavProps) {
  const [mode, setMode] = useState<AuthMode>('signin');
  const [showPass, setShowPass] = useState(false);
  const [role, setRole] = useState('Product Designer');

  const ROLES = ['Product Designer', 'Software Engineer', 'Data Scientist', 'Marketing Manager', 'Other'];

  if (mode === 'forgot') {
    return (
      <div className="flex flex-col flex-1 bg-background min-h-0 overflow-y-auto">
        <div className="px-6 pt-14">
          <button onClick={() => setMode('signin')} className="flex items-center gap-1 text-muted-foreground mb-8">
            <ChevronLeft className="w-5 h-5" />
            <span style={{ fontSize: '14px' }}>Back</span>
          </button>
          <h2 className="text-2xl font-bold">Reset Password</h2>
          <p className="text-muted-foreground mt-2" style={{ fontSize: '14px' }}>
            Enter your email and we'll send you a reset link.
          </p>
        </div>
        <div className="px-6 mt-8 flex flex-col gap-4">
          <input
            type="email"
            placeholder="your@email.com"
            className="w-full bg-input-background border border-border rounded-xl px-4 py-3.5 text-foreground outline-none focus:border-primary transition-colors"
            style={{ fontSize: '15px' }}
          />
          <button
            onClick={() => setMode('signin')}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold shadow-lg shadow-blue-500/20"
          >
            Send Reset Link
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 bg-background min-h-0 overflow-y-auto">
      {/* Header */}
      <div className="px-6 pt-14 flex items-center gap-3">
        <button onClick={goBack} className="text-muted-foreground">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center">
          <Briefcase className="w-4 h-4 text-white" />
        </div>
        <span className="font-bold text-foreground">JobHunter Pro</span>
        <div className="ml-auto">
          <Zap className="w-4 h-4 text-yellow-500" fill="currentColor" />
        </div>
      </div>

      <div className="px-6 mt-8">
        <h2 className="text-2xl font-bold text-foreground">
          {mode === 'signin' ? 'Welcome back!' : 'Create account'}
        </h2>
        <p className="text-muted-foreground mt-1" style={{ fontSize: '14px' }}>
          {mode === 'signin' ? 'Sign in to continue your job search.' : 'Start your AI-powered career journey.'}
        </p>

        {/* Mode toggle */}
        <div className="mt-6 bg-muted rounded-xl p-1 flex">
          <button
            onClick={() => setMode('signin')}
            className={`flex-1 py-2 rounded-lg transition-all font-medium ${
              mode === 'signin' ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground'
            }`}
            style={{ fontSize: '14px' }}
          >
            Sign In
          </button>
          <button
            onClick={() => setMode('signup')}
            className={`flex-1 py-2 rounded-lg transition-all font-medium ${
              mode === 'signup' ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground'
            }`}
            style={{ fontSize: '14px' }}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <div className="mt-6 flex flex-col gap-4">
          {mode === 'signup' && (
            <div>
              <label className="text-foreground mb-1.5 block" style={{ fontSize: '13px', fontWeight: 500 }}>Full Name</label>
              <input
                type="text"
                placeholder="Sarah Chen"
                className="w-full bg-input-background border border-border rounded-xl px-4 py-3.5 text-foreground outline-none focus:border-primary transition-colors"
                style={{ fontSize: '15px' }}
              />
            </div>
          )}

          <div>
            <label className="text-foreground mb-1.5 block" style={{ fontSize: '13px', fontWeight: 500 }}>Email</label>
            <input
              type="email"
              placeholder="sarah@example.com"
              className="w-full bg-input-background border border-border rounded-xl px-4 py-3.5 text-foreground outline-none focus:border-primary transition-colors"
              style={{ fontSize: '15px' }}
            />
          </div>

          <div>
            <label className="text-foreground mb-1.5 block" style={{ fontSize: '13px', fontWeight: 500 }}>Password</label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="••••••••"
                className="w-full bg-input-background border border-border rounded-xl px-4 py-3.5 pr-12 text-foreground outline-none focus:border-primary transition-colors"
                style={{ fontSize: '15px' }}
              />
              <button
                onClick={() => setShowPass(p => !p)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {mode === 'signup' && (
            <div>
              <label className="text-foreground mb-1.5 block" style={{ fontSize: '13px', fontWeight: 500 }}>I'm a...</label>
              <div className="flex flex-wrap gap-2">
                {ROLES.map(r => (
                  <button
                    key={r}
                    onClick={() => setRole(r)}
                    className={`px-3 py-1.5 rounded-full border transition-colors ${
                      role === r
                        ? 'bg-primary text-white border-primary'
                        : 'border-border text-muted-foreground hover:border-primary hover:text-primary'
                    }`}
                    style={{ fontSize: '13px' }}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          )}

          {mode === 'signin' && (
            <button onClick={() => setMode('forgot')} className="text-primary self-end" style={{ fontSize: '13px' }}>
              Forgot password?
            </button>
          )}

          <button
            onClick={() => navigate('home')}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold shadow-lg shadow-blue-500/20 mt-2"
          >
            {mode === 'signin' ? 'Sign In' : 'Create Account'}
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-border" />
          <span className="text-muted-foreground" style={{ fontSize: '13px' }}>or continue with</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Social */}
        <div className="flex flex-col gap-3 pb-8">
          {[
            { name: 'Google', color: '#4285F4', letter: 'G' },
            { name: 'LinkedIn', color: '#0A66C2', letter: 'in' },
            { name: 'Apple', color: '#000', letter: '' },
          ].map(({ name, color, letter }) => (
            <button
              key={name}
              onClick={() => navigate('home')}
              className="w-full py-3.5 rounded-xl border border-border bg-card flex items-center justify-center gap-3 hover:bg-muted transition-colors"
            >
              <div
                className="w-5 h-5 rounded flex items-center justify-center text-white font-bold"
                style={{ background: color, fontSize: '11px' }}
              >
                {letter}
              </div>
              <span className="text-foreground font-medium" style={{ fontSize: '15px' }}>
                Continue with {name}
              </span>
            </button>
          ))}
        </div>

        <p className="text-center text-muted-foreground mb-8" style={{ fontSize: '12px' }}>
          By continuing you agree to our{' '}
          <span className="text-primary">Terms of Service</span> and{' '}
          <span className="text-primary">Privacy Policy</span>
        </p>
      </div>
    </div>
  );
}
