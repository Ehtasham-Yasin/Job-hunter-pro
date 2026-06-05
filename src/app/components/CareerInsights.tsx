import { ChevronLeft, TrendingUp, ArrowUpRight } from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts';
import type { NavProps } from '../types';

const SALARY_DATA = [
  { month: 'Jan', you: 135, market: 142 },
  { month: 'Feb', you: 138, market: 144 },
  { month: 'Mar', you: 142, market: 147 },
  { month: 'Apr', you: 145, market: 149 },
  { month: 'May', you: 150, market: 153 },
  { month: 'Jun', you: 158, market: 157 },
];

const SKILLS_DATA = [
  { skill: 'Figma', demand: 94 },
  { skill: 'Systems', demand: 88 },
  { skill: 'Research', demand: 82 },
  { skill: 'Strategy', demand: 76 },
  { skill: 'AI Tools', demand: 71 },
  { skill: 'Proto', demand: 67 },
];

const JOB_TYPES = [
  { name: 'Remote', value: 58, color: '#2563EB' },
  { name: 'Hybrid', value: 27, color: '#7C3AED' },
  { name: 'On-site', value: 15, color: '#10B981' },
];

const ROADMAP = [
  { step: 1, title: 'Senior Product Designer', current: true, status: 'current', year: '2024–Present', skills: ['Design Systems', 'Leadership'] },
  { step: 2, title: 'Lead Product Designer', status: 'next', year: '2025–2026', skills: ['Team Management', 'Product Strategy'] },
  { step: 3, title: 'Head of Design', status: 'future', year: '2027+', skills: ['Org Design', 'Exec Communication'] },
];

export function CareerInsights({ goBack }: NavProps) {
  return (
    <div className="flex flex-col flex-1 bg-background min-h-0">
      {/* Header */}
      <div className="px-4 pt-14 pb-4 flex items-center gap-3 shrink-0">
        <button onClick={goBack} className="text-muted-foreground w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h1 className="font-bold text-foreground" style={{ fontSize: '18px' }}>Career Insights</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-6 flex flex-col gap-5">
        {/* Market position */}
        <div className="bg-gradient-to-r from-blue-600 to-violet-600 rounded-2xl p-4 text-white">
          <p className="text-blue-100" style={{ fontSize: '12px', fontWeight: 600 }}>YOUR MARKET POSITION</p>
          <div className="flex items-end gap-3 mt-2">
            <span className="font-bold" style={{ fontSize: '32px', lineHeight: 1 }}>Top 12%</span>
            <span className="text-blue-200 mb-1" style={{ fontSize: '14px' }}>of designers in SF Bay Area</span>
          </div>
          <div className="flex gap-3 mt-3">
            <div className="bg-white/10 rounded-xl p-2 flex-1 text-center">
              <p className="font-bold text-white" style={{ fontSize: '16px' }}>$158k</p>
              <p className="text-blue-200" style={{ fontSize: '10px' }}>Your target</p>
            </div>
            <div className="bg-white/10 rounded-xl p-2 flex-1 text-center">
              <p className="font-bold text-white" style={{ fontSize: '16px' }}>$157k</p>
              <p className="text-blue-200" style={{ fontSize: '10px' }}>Market avg</p>
            </div>
            <div className="bg-white/10 rounded-xl p-2 flex-1 text-center">
              <p className="font-bold text-emerald-300" style={{ fontSize: '16px' }}>+0.6%</p>
              <p className="text-blue-200" style={{ fontSize: '10px' }}>Above avg</p>
            </div>
          </div>
        </div>

        {/* Salary trend chart */}
        <div className="bg-card border border-border rounded-2xl p-4">
          <div className="flex items-center justify-between mb-4">
            <p className="font-semibold text-foreground" style={{ fontSize: '14px' }}>Salary Trend (2026)</p>
            <div className="flex items-center gap-1 text-emerald-500" style={{ fontSize: '12px', fontWeight: 600 }}>
              <TrendingUp className="w-3.5 h-3.5" />
              +17% YoY
            </div>
          </div>
          <div className="flex gap-3 mb-3">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-1.5 rounded-full bg-blue-500" />
              <span className="text-muted-foreground" style={{ fontSize: '11px' }}>Your target</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-1.5 rounded-full bg-violet-400" />
              <span className="text-muted-foreground" style={{ fontSize: '11px' }}>Market avg</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={SALARY_DATA} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="youGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="mktGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,116,139,0.15)" />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false} unit="k" />
              <Tooltip
                contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '12px', fontSize: '12px' }}
                formatter={(v: number) => [`$${v}k`, '']}
              />
              <Area type="monotone" dataKey="you" stroke="#2563EB" strokeWidth={2} fill="url(#youGrad)" />
              <Area type="monotone" dataKey="market" stroke="#7C3AED" strokeWidth={2} fill="url(#mktGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Skills demand chart */}
        <div className="bg-card border border-border rounded-2xl p-4">
          <p className="font-semibold text-foreground mb-4" style={{ fontSize: '14px' }}>Top Skills in Demand</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={SKILLS_DATA} layout="vertical" margin={{ top: 0, right: 30, left: 10, bottom: 0 }}>
              <XAxis type="number" tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false} domain={[0, 100]} unit="%" />
              <YAxis type="category" dataKey="skill" tick={{ fontSize: 11, fill: 'var(--foreground)' }} axisLine={false} tickLine={false} width={52} />
              <Tooltip
                contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '12px', fontSize: '12px' }}
                formatter={(v: number) => [`${v}%`, 'Demand']}
              />
              <Bar dataKey="demand" radius={[0, 6, 6, 0]} fill="url(#barGrad)">
                {SKILLS_DATA.map((_, i) => (
                  <Cell key={i} fill={i < 2 ? '#2563EB' : i < 4 ? '#7C3AED' : '#94A3B8'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Job type distribution */}
        <div className="bg-card border border-border rounded-2xl p-4">
          <p className="font-semibold text-foreground mb-4" style={{ fontSize: '14px' }}>Job Type Distribution</p>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width={120} height={120}>
              <PieChart>
                <Pie data={JOB_TYPES} cx="50%" cy="50%" innerRadius={35} outerRadius={55} dataKey="value" paddingAngle={3}>
                  {JOB_TYPES.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col gap-2 flex-1">
              {JOB_TYPES.map(({ name, value, color }) => (
                <div key={name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
                    <span className="text-foreground" style={{ fontSize: '13px' }}>{name}</span>
                  </div>
                  <span className="font-semibold text-foreground" style={{ fontSize: '13px' }}>{value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Career roadmap */}
        <div className="bg-card border border-border rounded-2xl p-4">
          <p className="font-semibold text-foreground mb-4" style={{ fontSize: '14px' }}>AI Career Roadmap</p>
          <div className="flex flex-col gap-0">
            {ROADMAP.map(({ step, title, current, status, year, skills }, i) => (
              <div key={step} className="flex gap-4">
                {/* Timeline */}
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    current
                      ? 'bg-primary text-white shadow-md shadow-blue-500/30'
                      : status === 'next'
                      ? 'bg-violet-100 dark:bg-violet-950/50 text-violet-600 border-2 border-violet-300 dark:border-violet-700'
                      : 'bg-muted text-muted-foreground border-2 border-border'
                  }`} style={{ fontSize: '12px', fontWeight: 700 }}>
                    {step}
                  </div>
                  {i < ROADMAP.length - 1 && (
                    <div className={`w-0.5 h-12 mt-1 ${current ? 'bg-primary/40' : 'bg-border'}`} />
                  )}
                </div>
                {/* Content */}
                <div className={`pb-4 flex-1 ${i === ROADMAP.length - 1 ? 'pb-0' : ''}`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className={`font-semibold ${current ? 'text-primary' : 'text-foreground'}`} style={{ fontSize: '14px' }}>{title}</p>
                      <p className="text-muted-foreground" style={{ fontSize: '12px' }}>{year}</p>
                    </div>
                    {current && (
                      <span className="bg-primary/10 text-primary rounded-full px-2 py-0.5" style={{ fontSize: '10px', fontWeight: 700 }}>YOU ARE HERE</span>
                    )}
                  </div>
                  <div className="flex gap-1.5 mt-2 flex-wrap">
                    {skills.map(s => (
                      <span key={s} className="bg-muted text-muted-foreground rounded-full px-2 py-0.5" style={{ fontSize: '11px' }}>{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Growth tips */}
        <div>
          <p className="font-semibold text-foreground mb-3" style={{ fontSize: '15px' }}>AI Growth Recommendations</p>
          {[
            { icon: '🎯', title: 'Get system design experience', impact: 'High', desc: 'Roles with "Design Systems" earn 18% more on avg.' },
            { icon: '📊', title: 'Add data analytics to your toolkit', impact: 'Medium', desc: 'Designers who use Amplitude/Mixpanel command a premium.' },
            { icon: '🤝', title: 'Lead a cross-functional project', impact: 'High', desc: 'Documented leadership experience accelerates to Lead in 12–18mo.' },
          ].map(({ icon, title, impact, desc }) => (
            <div key={title} className="bg-card border border-border rounded-xl p-4 flex gap-3 mb-2">
              <span style={{ fontSize: '20px' }}>{icon}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-semibold text-foreground" style={{ fontSize: '13px' }}>{title}</p>
                  <span className={`px-2 py-0.5 rounded-full ${impact === 'High' ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600' : 'bg-amber-50 dark:bg-amber-950/50 text-amber-600'}`} style={{ fontSize: '10px', fontWeight: 700 }}>
                    {impact}
                  </span>
                </div>
                <p className="text-muted-foreground" style={{ fontSize: '12px' }}>{desc}</p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
