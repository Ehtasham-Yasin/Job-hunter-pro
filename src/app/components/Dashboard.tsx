import { Bell, Search, TrendingUp, Calendar, FileText, Briefcase, ChevronRight, Star, Zap, ArrowUpRight } from 'lucide-react';
import type { NavProps } from '../types';

const STATS = [
  { label: 'Applied', value: '24', color: 'from-blue-500 to-blue-600', icon: Briefcase },
  { label: 'Interviews', value: '8', color: 'from-violet-500 to-violet-600', icon: Calendar },
  { label: 'Offers', value: '3', color: 'from-emerald-500 to-emerald-600', icon: Star },
];

const QUICK_ACTIONS = [
  { label: 'Search Jobs', icon: Search, color: 'bg-blue-50 dark:bg-blue-950/50', iconColor: 'text-blue-600', screen: 'jobs' as const },
  { label: 'Resume', icon: FileText, color: 'bg-violet-50 dark:bg-violet-950/50', iconColor: 'text-violet-600', screen: 'resume' as const },
  { label: 'Interview Prep', icon: Briefcase, color: 'bg-amber-50 dark:bg-amber-950/50', iconColor: 'text-amber-600', screen: 'interviews' as const },
  { label: 'Insights', icon: TrendingUp, color: 'bg-emerald-50 dark:bg-emerald-950/50', iconColor: 'text-emerald-600', screen: 'careerInsights' as const },
];

const ACTIVITY = [
  { company: 'Google', action: 'Viewed your profile', time: '2h ago', color: '#4285F4', initials: 'G', positive: true },
  { company: 'Stripe', action: 'Moved to Interview stage', time: '1d ago', color: '#635BFF', initials: 'S', positive: true },
  { company: 'Netflix', action: 'New 94% match found', time: '3h ago', color: '#E50914', initials: 'N', positive: true },
  { company: 'Meta', action: 'Application reviewed', time: '2d ago', color: '#1877F2', initials: 'M', positive: false },
];

export function Dashboard({ navigate }: NavProps) {
  return (
    <div className="flex flex-col flex-1 bg-background min-h-0 overflow-y-auto">
      {/* Header */}
      <div className="px-5 pt-14 pb-2 flex items-center justify-between shrink-0">
        <div>
          <p className="text-muted-foreground" style={{ fontSize: '13px' }}>Good morning 👋</p>
          <h1 className="font-bold text-foreground" style={{ fontSize: '22px' }}>Sarah Chen</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('notifications')}
            className="relative w-10 h-10 bg-card border border-border rounded-full flex items-center justify-center"
          >
            <Bell className="w-4 h-4 text-foreground" />
            <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white font-semibold" style={{ fontSize: '14px' }}>
            SC
          </div>
        </div>
      </div>

      {/* AI Banner */}
      <div className="mx-5 mt-4">
        <button
          onClick={() => navigate('jobs')}
          className="w-full bg-gradient-to-r from-blue-600 to-violet-600 rounded-2xl p-4 flex items-center gap-4 text-left hover:opacity-95 transition"
        >
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
            <Zap
              className="w-6 h-6 text-white"
              fill="rgba(255,255,255,0.5)"
            />
          </div>

          <div className="flex-1">
            <p
              className="text-white font-semibold"
              style={{ fontSize: '14px' }}
            >
              AI Found 12 New Matches
            </p>

            <p
              className="text-blue-100"
              style={{ fontSize: '12px' }}
            >
              Based on your updated profile
            </p>
          </div>

          <div className="bg-white/20 rounded-xl p-2">
            <ChevronRight className="w-4 h-4 text-white" />
          </div>
        </button>
      </div>

      {/* Stats */}
      <div className="px-5 mt-5 grid grid-cols-3 gap-3">
        {STATS.map(({ label, value, color, icon: Icon }) => (
          <div key={label} className={`bg-gradient-to-br ${color} rounded-2xl p-3.5 text-white`}>
            <Icon className="w-4 h-4 mb-2 opacity-80" />
            <p className="font-bold" style={{ fontSize: '22px' }}>{value}</p>
            <p className="opacity-80" style={{ fontSize: '11px' }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Resume Score */}
      <div className="mx-5 mt-4">
        <div className="bg-card border border-border rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-muted-foreground" />
              <span className="font-semibold text-foreground" style={{ fontSize: '14px' }}>Resume Score</span>
            </div>
            <button onClick={() => navigate('resume')} className="flex items-center gap-1 text-primary" style={{ fontSize: '12px' }}>
              Improve <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
          <div className="flex items-end gap-3 mb-3">
            <span className="font-bold text-foreground" style={{ fontSize: '36px' }}>87</span>
            <span className="text-muted-foreground mb-2" style={{ fontSize: '16px' }}>/100</span>
            <span className="ml-auto mb-2 text-emerald-500 flex items-center gap-0.5" style={{ fontSize: '13px', fontWeight: 600 }}>
              <ArrowUpRight className="w-3 h-3" />+5 this week
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-violet-500" style={{ width: '87%' }} />
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-muted-foreground" style={{ fontSize: '11px' }}>ATS Score: 91%</span>
            <span className="text-muted-foreground" style={{ fontSize: '11px' }}>Keywords: 78%</span>
          </div>
        </div>
      </div>

      {/* Upcoming Interview */}
      <div className="mx-5 mt-4">
        <div className="bg-card border border-border rounded-2xl p-4 flex gap-4 items-center">
          <div className="w-12 h-12 bg-violet-100 dark:bg-violet-950/50 rounded-xl flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5 text-violet-600" />
          </div>
          <div className="flex-1">
            <p className="text-muted-foreground" style={{ fontSize: '11px', fontWeight: 600 }}>TOMORROW · 2:00 PM</p>
            <p className="font-semibold text-foreground" style={{ fontSize: '14px' }}>TechCorp — Final Round</p>
            <p className="text-muted-foreground" style={{ fontSize: '12px' }}>Senior Product Designer</p>
          </div>
          <button
            onClick={() => navigate('interviews')}
            className="bg-violet-100 dark:bg-violet-950/50 text-violet-600 rounded-xl px-3 py-2"
            style={{ fontSize: '12px', fontWeight: 600 }}
          >
            Prep
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-5 mt-5">
        <h2 className="font-semibold text-foreground mb-3" style={{ fontSize: '15px' }}>Quick Actions</h2>
        <div className="grid grid-cols-4 gap-3">
          {QUICK_ACTIONS.map(({ label, icon: Icon, color, iconColor, screen }) => (
            <button
              key={label}
              onClick={() => navigate(screen)}
              className={`${color} rounded-2xl p-3 flex flex-col items-center gap-2 hover:opacity-90 transition-opacity`}
            >
              <Icon className={`w-5 h-5 ${iconColor}`} />
              <span className="text-foreground text-center leading-tight" style={{ fontSize: '11px', fontWeight: 500 }}>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="px-5 mt-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-foreground" style={{ fontSize: '15px' }}>Recent Activity</h2>
          <button className="text-primary" style={{ fontSize: '13px' }}>See all</button>
        </div>
        <div className="bg-card border border-border rounded-2xl overflow-hidden divide-y divide-border">
          {ACTIVITY.map(({ company, action, time, color, initials, positive }) => (
            <div key={company} className="flex items-center gap-3 p-3.5">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white shrink-0"
                style={{ background: color, fontSize: '12px', fontWeight: 700 }}
              >
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground" style={{ fontSize: '13px' }}>{company}</p>
                <p className="text-muted-foreground truncate" style={{ fontSize: '12px' }}>{action}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-muted-foreground" style={{ fontSize: '11px' }}>{time}</span>
                {positive && <ArrowUpRight className="w-3 h-3 text-emerald-500" />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
