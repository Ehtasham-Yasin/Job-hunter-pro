import { useState } from 'react';
import { Plus, MoreHorizontal } from 'lucide-react';
import type { NavProps } from '../types';

interface AppCard {
  id: string;
  title: string;
  company: string;
  initials: string;
  color: string;
  salary: string;
  date: string;
  type: string;
}

const COLUMNS: { id: string; label: string; color: string; textColor: string; bg: string; count: number; cards: AppCard[] }[] = [
  {
    id: 'saved',
    label: 'Saved',
    color: 'border-slate-300 dark:border-slate-600',
    textColor: 'text-slate-600 dark:text-slate-300',
    bg: 'bg-slate-50 dark:bg-slate-800/50',
    count: 5,
    cards: [
      { id: 's1', title: 'Design Lead', company: 'Spotify', initials: 'S', color: '#1DB954', salary: '$155k', date: 'Jun 1', type: 'Remote' },
      { id: 's2', title: 'Sr. UX Designer', company: 'Uber', initials: 'U', color: '#000000', salary: '$145k', date: 'May 30', type: 'Hybrid' },
      { id: 's3', title: 'Product Designer', company: 'Slack', initials: 'S', color: '#4A154B', salary: '$135k', date: 'May 28', type: 'Remote' },
    ],
  },
  {
    id: 'applied',
    label: 'Applied',
    color: 'border-blue-200 dark:border-blue-800',
    textColor: 'text-blue-600',
    bg: 'bg-blue-50 dark:bg-blue-950/40',
    count: 8,
    cards: [
      { id: 'a1', title: 'Sr. Product Designer', company: 'Google', initials: 'G', color: '#4285F4', salary: '$175k', date: 'Jun 2', type: 'Remote' },
      { id: 'a2', title: 'UX Lead', company: 'Stripe', initials: 'S', color: '#635BFF', salary: '$165k', date: 'Jun 1', type: 'Hybrid' },
      { id: 'a3', title: 'Product Designer', company: 'Airbnb', initials: 'A', color: '#FF5A5F', salary: '$150k', date: 'May 31', type: 'Remote' },
    ],
  },
  {
    id: 'interview',
    label: 'Interview',
    color: 'border-violet-200 dark:border-violet-800',
    textColor: 'text-violet-600',
    bg: 'bg-violet-50 dark:bg-violet-950/40',
    count: 4,
    cards: [
      { id: 'i1', title: 'Design Lead', company: 'TechCorp', initials: 'T', color: '#7C3AED', salary: '$170k', date: 'Jun 4', type: 'Hybrid' },
      { id: 'i2', title: 'UX Designer', company: 'Linear', initials: 'L', color: '#5E6AD2', salary: '$160k', date: 'Jun 3', type: 'Remote' },
    ],
  },
  {
    id: 'offer',
    label: 'Offer',
    color: 'border-emerald-200 dark:border-emerald-800',
    textColor: 'text-emerald-600',
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    count: 2,
    cards: [
      { id: 'o1', title: 'Sr. Designer', company: 'Notion', initials: 'N', color: '#000000', salary: '$160k', date: 'May 25', type: 'Remote' },
    ],
  },
  {
    id: 'rejected',
    label: 'Rejected',
    color: 'border-red-200 dark:border-red-900',
    textColor: 'text-red-500',
    bg: 'bg-red-50 dark:bg-red-950/30',
    count: 3,
    cards: [
      { id: 'r1', title: 'Design Systems Lead', company: 'Meta', initials: 'M', color: '#1877F2', salary: '$180k', date: 'May 20', type: 'Hybrid' },
    ],
  },
];

export function ApplicationTracker() {
  const [activeView, setActiveView] = useState<'kanban' | 'list'>('kanban');

  return (
    <div className="flex flex-col flex-1 bg-background min-h-0">
      {/* Header */}
      <div className="px-5 pt-14 pb-4 shrink-0">
        <div className="flex items-center justify-between mb-1">
          <h1 className="font-bold text-foreground" style={{ fontSize: '22px' }}>Applications</h1>
          <button className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-md shadow-blue-500/25">
            <Plus className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Stats row */}
        <div className="flex gap-3 mt-3">
          {[
            { label: 'Total', value: '22', color: 'text-foreground' },
            { label: 'Active', value: '12', color: 'text-blue-600' },
            { label: 'Interviews', value: '4', color: 'text-violet-600' },
            { label: 'Offers', value: '2', color: 'text-emerald-600' },
          ].map(({ label, value, color }) => (
            <div key={label} className="flex-1 bg-card border border-border rounded-xl p-2 text-center">
              <p className={`font-bold ${color}`} style={{ fontSize: '18px' }}>{value}</p>
              <p className="text-muted-foreground" style={{ fontSize: '10px' }}>{label}</p>
            </div>
          ))}
        </div>

        {/* View toggle */}
        <div className="flex bg-muted rounded-xl p-1 mt-3">
          {(['kanban', 'list'] as const).map(v => (
            <button
              key={v}
              onClick={() => setActiveView(v)}
              className={`flex-1 py-2 rounded-lg capitalize transition-all ${
                activeView === v ? 'bg-card shadow-sm text-foreground font-semibold' : 'text-muted-foreground'
              }`}
              style={{ fontSize: '13px' }}
            >
              {v === 'kanban' ? '⊞ Kanban' : '≡ List'}
            </button>
          ))}
        </div>
      </div>

      {/* Kanban board */}
      {activeView === 'kanban' && (
        <div className="flex-1 overflow-x-auto pb-6 min-h-0">
          <div className="flex gap-3 px-5 h-full" style={{ minWidth: `${COLUMNS.length * 220 + 40}px` }}>
            {COLUMNS.map(col => (
              <div key={col.id} className="w-52 flex flex-col shrink-0">
                {/* Column header */}
                <div className={`flex items-center justify-between px-3 py-2 rounded-xl mb-2 border ${col.color} ${col.bg}`}>
                  <div className="flex items-center gap-2">
                    <span className={`font-semibold ${col.textColor}`} style={{ fontSize: '13px' }}>{col.label}</span>
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center ${col.textColor}`} style={{ fontSize: '11px', fontWeight: 700, background: 'currentColor' }}>
                      <span className="text-white">{col.count}</span>
                    </span>
                  </div>
                  <button className="text-muted-foreground">
                    <MoreHorizontal className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Cards */}
                <div className="flex flex-col gap-2 overflow-y-auto flex-1" style={{ scrollbarWidth: 'none' }}>
                  {col.cards.map(card => (
                    <div key={card.id} className="bg-card border border-border rounded-xl p-3 shadow-sm">
                      <div className="flex items-start gap-2 mb-2">
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-white shrink-0"
                          style={{ background: card.color, fontSize: '10px', fontWeight: 800 }}
                        >
                          {card.initials}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-foreground truncate" style={{ fontSize: '12px' }}>{card.title}</p>
                          <p className="text-muted-foreground truncate" style={{ fontSize: '11px' }}>{card.company}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                          card.type === 'Remote'
                            ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600'
                            : 'bg-amber-50 dark:bg-amber-950/50 text-amber-600'
                        }`} style={{ fontSize: '10px', fontWeight: 600 }}>
                          {card.type}
                        </span>
                        <span className="text-muted-foreground" style={{ fontSize: '10px' }}>{card.date}</span>
                      </div>
                      <div className="mt-2 pt-2 border-t border-border">
                        <p className="text-foreground" style={{ fontSize: '12px', fontWeight: 600 }}>{card.salary}</p>
                      </div>
                    </div>
                  ))}
                  {/* Add card button */}
                  <button className="border border-dashed border-border rounded-xl p-3 flex items-center justify-center gap-2 text-muted-foreground hover:bg-muted transition-colors">
                    <Plus className="w-3.5 h-3.5" />
                    <span style={{ fontSize: '12px' }}>Add</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* List view */}
      {activeView === 'list' && (
        <div className="flex-1 overflow-y-auto px-5 pb-6 flex flex-col gap-3">
          {COLUMNS.flatMap(col => col.cards.map(card => (
            <div key={card.id} className="bg-card border border-border rounded-xl p-4 flex gap-3 items-center">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0"
                style={{ background: card.color, fontSize: '13px', fontWeight: 800 }}
              >
                {card.initials}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground" style={{ fontSize: '14px' }}>{card.title}</p>
                <p className="text-muted-foreground" style={{ fontSize: '12px' }}>{card.company} · {card.salary}</p>
              </div>
              <div>
                <span className={`px-2 py-1 rounded-full ${col.bg} ${col.textColor} border ${col.color}`} style={{ fontSize: '11px', fontWeight: 600 }}>
                  {col.label}
                </span>
              </div>
            </div>
          )))}
        </div>
      )}
    </div>
  );
}
