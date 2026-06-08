import { useState } from 'react';
import { ChevronLeft, ChevronRight, Bell, Lock, Eye, CreditCard, Palette, LogOut, Moon, User, Trash2 } from 'lucide-react';
import type { NavProps } from '../types';

interface ToggleProps {
  checked: boolean;
  onChange: (v: boolean) => void;
}

function Toggle({ checked, onChange }: ToggleProps) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${checked ? 'bg-primary' : 'bg-muted'}`}
    >
      <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  );
}

export function Settings({ navigate, goBack, darkMode, toggleDarkMode }: NavProps) {
  const [notifs, setNotifs] = useState({
    jobAlerts: true,
    interviews: true,
    messages: true,
    weeklyDigest: false,
    profileViews: true,
  });

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    salaryVisible: false,
    activeStatus: true,
  });

  return (
    <div className="flex flex-col flex-1 bg-background min-h-0 overflow-y-auto">
      {/* Header */}
      <div className="px-4 pt-14 pb-4 flex items-center gap-3 shrink-0">
        <button onClick={goBack} className="text-muted-foreground w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h1 className="font-bold text-foreground" style={{ fontSize: '18px' }}>Settings</h1>
      </div>

      <div className="px-5 flex flex-col gap-5 pb-8">
        {/* Profile section */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-border">
            <p className="text-muted-foreground" style={{ fontSize: '11px', fontWeight: 600 }}>ACCOUNT</p>
          </div>
          <div className="p-4 flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white font-bold" style={{ fontSize: '18px' }}>
              SC
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground">Sarah Chen</p>
              <p className="text-muted-foreground" style={{ fontSize: '13px' }}>sarah@example.com</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>

        {/* Subscription */}
        <div className="bg-gradient-to-r from-blue-600 to-violet-600 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-white/20 text-white rounded-full px-2 py-0.5" style={{ fontSize: '11px', fontWeight: 700 }}>PRO</span>
                <span className="text-white font-semibold" style={{ fontSize: '15px' }}>JobHunter Pro</span>
              </div>
              <p className="text-blue-100" style={{ fontSize: '13px' }}>Renews Jun 15, 2026 · $29/mo</p>
            </div>
            <CreditCard className="w-8 h-8 text-white/60" />
          </div>
          <button className="mt-3 bg-white/20 hover:bg-white/30 transition text-white rounded-xl px-4 py-2 w-full" style={{ fontSize: '13px', fontWeight: 600 }}>
            Manage Subscription
          </button>
        </div>

        {/* Notifications */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-border flex items-center gap-2">
            <Bell className="w-4 h-4 text-muted-foreground" />
            <p className="text-muted-foreground" style={{ fontSize: '11px', fontWeight: 600 }}>NOTIFICATIONS</p>
          </div>
          {([
            { key: 'jobAlerts', label: 'Job Alerts', sub: 'New matches based on your profile' },
            { key: 'interviews', label: 'Interview Reminders', sub: 'Upcoming interview notifications' },
            { key: 'messages', label: 'Recruiter Messages', sub: 'When a recruiter contacts you' },
            { key: 'weeklyDigest', label: 'Weekly Digest', sub: 'Summary of your job search activity' },
            { key: 'profileViews', label: 'Profile Views', sub: 'When someone views your profile' },
          ] as { key: keyof typeof notifs; label: string; sub: string }[]).map(({ key, label, sub }, i, arr) => (
            <div key={key} className={`flex items-center justify-between px-4 py-3.5 ${i < arr.length - 1 ? 'border-b border-border' : ''}`}>
              <div>
                <p className="text-foreground" style={{ fontSize: '14px' }}>{label}</p>
                <p className="text-muted-foreground" style={{ fontSize: '12px' }}>{sub}</p>
              </div>
              <Toggle checked={notifs[key]} onChange={v => setNotifs(n => ({ ...n, [key]: v }))} />
            </div>
          ))}
        </div>

        {/* Appearance */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-border flex items-center gap-2">
            <Palette className="w-4 h-4 text-muted-foreground" />
            <p className="text-muted-foreground" style={{ fontSize: '11px', fontWeight: 600 }}>APPEARANCE</p>
          </div>
          <div className="flex items-center justify-between px-4 py-3.5">
            <div className="flex items-center gap-3">
              <Moon className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-foreground" style={{ fontSize: '14px' }}>Dark Mode</p>
                <p className="text-muted-foreground" style={{ fontSize: '12px' }}>Switch to dark theme</p>
              </div>
            </div>
            <Toggle checked={darkMode} onChange={toggleDarkMode} />
          </div>
        </div>

        {/* Privacy */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-border flex items-center gap-2">
            <Eye className="w-4 h-4 text-muted-foreground" />
            <p className="text-muted-foreground" style={{ fontSize: '11px', fontWeight: 600 }}>PRIVACY</p>
          </div>
          {([
            { key: 'profileVisible', label: 'Public Profile', sub: 'Visible to recruiters and employers' },
            { key: 'salaryVisible', label: 'Show Salary Expectations', sub: 'Display in your public profile' },
            { key: 'activeStatus', label: 'Active Job Seeker', sub: 'Signal to recruiters you\'re open' },
          ] as { key: keyof typeof privacy; label: string; sub: string }[]).map(({ key, label, sub }, i, arr) => (
            <div key={key} className={`flex items-center justify-between px-4 py-3.5 ${i < arr.length - 1 ? 'border-b border-border' : ''}`}>
              <div>
                <p className="text-foreground" style={{ fontSize: '14px' }}>{label}</p>
                <p className="text-muted-foreground" style={{ fontSize: '12px' }}>{sub}</p>
              </div>
              <Toggle checked={privacy[key]} onChange={v => setPrivacy(p => ({ ...p, [key]: v }))} />
            </div>
          ))}
        </div>

        {/* Security */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-border flex items-center gap-2">
            <Lock className="w-4 h-4 text-muted-foreground" />
            <p className="text-muted-foreground" style={{ fontSize: '11px', fontWeight: 600 }}>SECURITY</p>
          </div>
          {[
            { label: 'Change Password', icon: Lock },
            { label: 'Two-Factor Authentication', icon: User },
            { label: 'Active Sessions', icon: Eye },
          ].map(({ label, icon: Icon }, i, arr) => (
            <div key={label} className={`flex items-center justify-between px-4 py-3.5 ${i < arr.length - 1 ? 'border-b border-border' : ''}`}>
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4 text-muted-foreground" />
                <span className="text-foreground" style={{ fontSize: '14px' }}>{label}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
          ))}
        </div>

        {/* Danger zone */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate('auth')}
            className="w-full py-3.5 rounded-xl border border-border bg-card flex items-center justify-center gap-2 text-muted-foreground hover:bg-muted transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span style={{ fontSize: '14px' }}>Sign Out</span>
          </button>
          <button className="w-full py-3.5 rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/20 flex items-center justify-center gap-2 text-red-500 hover:bg-red-100 transition-colors">
            <Trash2 className="w-4 h-4" />
            <span style={{ fontSize: '14px' }}>Delete Account</span>
          </button>
        </div>
      </div>
    </div>
  );
}
