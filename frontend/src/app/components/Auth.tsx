import { useState } from 'react';
import { Eye, EyeOff, Briefcase, ChevronLeft, Zap } from 'lucide-react';
import type { NavProps } from '../types';

type AuthMode = 'signin' | 'signup' | 'forgot';

const API_URL = 'http://localhost:4000';

export function Auth({ navigate, goBack }: NavProps) {
  const [mode, setMode] = useState<AuthMode>('signin');
  const [showPass, setShowPass] = useState(false);
  const [role, setRole] = useState('seeker');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const ROLES = [
    { label: 'Job Seeker', value: 'seeker' },
    { label: 'Recruiter', value: 'recruiter' },
  ];

  const handleSubmit = async () => {
    setError('');
    setLoading(true);
    try {
      const endpoint = mode === 'signin' ? '/api/auth/login' : '/api/auth/register';
      const body = mode === 'signin'
        ? { email, password }
        : { name, email, password, role };

      const res = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong');
        return;
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      if (data.user.role === 'recruiter') {
        navigate('recruiterDashboard');
      } else {
        navigate('home');
      }
    } catch (err) {
      setError('Cannot connect to server. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

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

        <div className="mt-6 bg-muted rounded-xl p-1 flex">
          <button
            onClick={() => { setMode('signin'); setError(''); }}
            className={`flex-1 py-2 rounded-lg transition-all font-medium ${mode === 'signin' ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground'
              }`}
            style={{ fontSize: '14px' }}
          >
            Sign In
          </button>
          <button
            onClick={() => { setMode('signup'); setError(''); }}
            className={`flex-1 py-2 rounded-lg transition-all font-medium ${mode === 'signup' ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground'
              }`}
            style={{ fontSize: '14px' }}
          >
            Sign Up
          </button>
        </div>

        {error && (
          <div className="mt-4 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl">
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        )}

        <div className="mt-6 flex flex-col gap-4">
          {mode === 'signup' && (
            <div>
              <label className="text-foreground mb-1.5 block" style={{ fontSize: '13px', fontWeight: 500 }}>Full Name</label>
              <input
                type="text"
                placeholder="Sarah Chen"
                value={name}
                onChange={e => setName(e.target.value)}
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
              value={email}
              onChange={e => setEmail(e.target.value)}
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
                value={password}
                onChange={e => setPassword(e.target.value)}
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
              <label className="text-foreground mb-1.5 block" style={{ fontSize: '13px', fontWeight: 500 }}>I am a...</label>
              <div className="flex gap-3">
                {ROLES.map(r => (
                  <button
                    key={r.value}
                    onClick={() => setRole(r.value)}
                    className={`flex-1 py-3 rounded-xl border transition-colors font-medium ${role === r.value
                      ? 'bg-primary text-white border-primary'
                      : 'border-border text-muted-foreground hover:border-primary hover:text-primary'
                      }`}
                    style={{ fontSize: '14px' }}
                  >
                    {r.label}
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
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold shadow-lg shadow-blue-500/20 mt-2 disabled:opacity-60"
          >
            {loading ? 'Please wait...' : mode === 'signin' ? 'Sign In' : 'Create Account'}
          </button>
        </div>

        <p className="text-center text-muted-foreground mt-8 mb-8" style={{ fontSize: '12px' }}>
          By continuing you agree to our{' '}
          <span className="text-primary">Terms of Service</span> and{' '}
          <span className="text-primary">Privacy Policy</span>
        </p>
      </div>
    </div>
  );
}
