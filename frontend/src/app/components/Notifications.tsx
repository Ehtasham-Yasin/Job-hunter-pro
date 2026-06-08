import { ChevronLeft, Briefcase, Calendar, Bell, TrendingUp, CheckCircle, Clock } from 'lucide-react';
import type { NavProps } from '../types';

const NOTIFICATIONS = [
  {
    id: '1',
    type: 'match',
    icon: Briefcase,
    iconBg: 'bg-blue-100 dark:bg-blue-950/60',
    iconColor: 'text-blue-600',
    title: 'New Job Match — 94%',
    body: 'Netflix · Senior UX Designer · $170k · Remote',
    time: '5m ago',
    unread: true,
  },
  {
    id: '2',
    type: 'interview',
    icon: Calendar,
    iconBg: 'bg-violet-100 dark:bg-violet-950/60',
    iconColor: 'text-violet-600',
    title: 'Interview Tomorrow at 2:00 PM',
    body: 'TechCorp — Final Round · Don\'t forget to practice!',
    time: '1h ago',
    unread: true,
  },
  {
    id: '3',
    type: 'update',
    icon: CheckCircle,
    iconBg: 'bg-emerald-100 dark:bg-emerald-950/60',
    iconColor: 'text-emerald-600',
    title: 'Application Status Update',
    body: 'Stripe moved your application to Interview stage',
    time: '3h ago',
    unread: true,
  },
  {
    id: '4',
    type: 'view',
    icon: TrendingUp,
    iconBg: 'bg-amber-100 dark:bg-amber-950/60',
    iconColor: 'text-amber-600',
    title: 'Google Viewed Your Profile',
    body: 'A recruiter at Google looked at your profile',
    time: '6h ago',
    unread: false,
  },
  {
    id: '5',
    type: 'reminder',
    icon: Clock,
    iconBg: 'bg-slate-100 dark:bg-slate-700/60',
    iconColor: 'text-slate-600 dark:text-slate-400',
    title: 'Weekly Job Digest Ready',
    body: '12 new jobs match your preferences this week',
    time: '1d ago',
    unread: false,
  },
  {
    id: '6',
    type: 'match',
    icon: Briefcase,
    iconBg: 'bg-blue-100 dark:bg-blue-950/60',
    iconColor: 'text-blue-600',
    title: 'New Job Match — 89%',
    body: 'Notion · Product Designer · $145k · Remote',
    time: '1d ago',
    unread: false,
  },
  {
    id: '7',
    type: 'reminder',
    icon: Bell,
    iconBg: 'bg-rose-100 dark:bg-rose-950/60',
    iconColor: 'text-rose-600',
    title: 'Resume Score Dropped',
    body: 'Add more quantified achievements to boost your ATS score',
    time: '2d ago',
    unread: false,
  },
];

export function Notifications({ goBack }: NavProps) {
  const unreadCount = NOTIFICATIONS.filter(n => n.unread).length;

  return (
    <div className="flex flex-col flex-1 bg-background min-h-0">
      {/* Header */}
      <div className="px-4 pt-14 pb-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={goBack} className="text-muted-foreground w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="font-bold text-foreground" style={{ fontSize: '18px' }}>Notifications</h1>
        </div>
        {unreadCount > 0 && (
          <span className="text-xs font-semibold bg-primary text-white rounded-full px-2.5 py-0.5">
            {unreadCount} new
          </span>
        )}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-4 pb-6 flex flex-col gap-1">
        {NOTIFICATIONS.map((n, i) => {
          const Icon = n.icon;
          const showDayLabel = i === 0 || (i === NOTIFICATIONS.findIndex(x => !x.unread) && !NOTIFICATIONS[i - 1]?.unread === false);
          return (
            <div key={n.id}>
              {n.id === '4' && (
                <p className="text-muted-foreground mt-4 mb-2 px-1" style={{ fontSize: '12px', fontWeight: 600 }}>EARLIER</p>
              )}
              {n.id === '1' && (
                <p className="text-muted-foreground mb-2 px-1" style={{ fontSize: '12px', fontWeight: 600 }}>NEW</p>
              )}
              <div className={`flex gap-3 p-3 rounded-2xl transition-colors ${n.unread ? 'bg-accent/60' : 'hover:bg-muted'}`}>
                <div className={`w-11 h-11 rounded-2xl ${n.iconBg} flex items-center justify-center shrink-0`}>
                  <Icon className={`w-5 h-5 ${n.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-foreground" style={{ fontSize: '14px', fontWeight: n.unread ? 600 : 400 }}>{n.title}</p>
                    {n.unread && <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1" />}
                  </div>
                  <p className="text-muted-foreground mt-0.5 truncate" style={{ fontSize: '13px' }}>{n.body}</p>
                  <p className="text-muted-foreground/70 mt-1" style={{ fontSize: '12px' }}>{n.time}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
