import { useState } from 'react';
import { ChevronRight, Mic, Code, Users, BarChart2, Clock, Star, Play, ChevronLeft } from 'lucide-react';
import type { NavProps } from '../types';

const TYPES = [
  { id: 'behavioral', icon: Users, label: 'Behavioral', sub: 'STAR method & soft skills', color: 'from-blue-500 to-blue-600', bg: 'bg-blue-50 dark:bg-blue-950/40', iconColor: 'text-blue-600', questions: 47 },
  { id: 'technical', icon: Code, label: 'Technical', sub: 'Coding & problem solving', color: 'from-violet-500 to-violet-600', bg: 'bg-violet-50 dark:bg-violet-950/40', iconColor: 'text-violet-600', questions: 83 },
  { id: 'hr', icon: Mic, label: 'HR Round', sub: 'Culture fit & expectations', color: 'from-emerald-500 to-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-950/40', iconColor: 'text-emerald-600', questions: 34 },
  { id: 'system', icon: BarChart2, label: 'System Design', sub: 'Architecture & scalability', color: 'from-amber-500 to-orange-500', bg: 'bg-amber-50 dark:bg-amber-950/40', iconColor: 'text-amber-600', questions: 28 },
];

const SESSIONS = [
  { type: 'Behavioral', question: 'Tell me about a time you led a difficult project', score: 88, date: 'Jun 1', duration: '8m', feedback: 'Great use of STAR method. Strengthen the Result section.' },
  { type: 'Technical', question: 'Design a URL shortener like bit.ly', score: 74, date: 'May 30', duration: '25m', feedback: 'Good system thinking. Consider edge cases and rate limiting.' },
  { type: 'HR Round', question: 'Where do you see yourself in 5 years?', score: 92, date: 'May 28', duration: '5m', feedback: 'Excellent confidence and clarity. Very well aligned with role goals.' },
];

export function InterviewPrep({ navigate }: NavProps) {
  const [activeType, setActiveType] = useState<string | null>(null);
  const [practicing, setPracticing] = useState(false);

  if (practicing) {
    return (
      <div className="flex flex-col flex-1 bg-background min-h-0">
        <div className="px-4 pt-14 pb-4 flex items-center gap-3 shrink-0">
          <button onClick={() => setPracticing(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted text-muted-foreground">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="font-bold text-foreground" style={{ fontSize: '17px' }}>Mock Interview</h1>
          <div className="ml-auto flex items-center gap-1 text-muted-foreground">
            <Clock className="w-3.5 h-3.5" />
            <span style={{ fontSize: '13px' }}>5:23</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 pb-6 flex flex-col gap-4">
          {/* Question card */}
          <div className="bg-gradient-to-br from-blue-600 to-violet-600 rounded-2xl p-5 text-white">
            <p className="text-blue-100 mb-2" style={{ fontSize: '12px', fontWeight: 600 }}>BEHAVIORAL · Q3 of 8</p>
            <p className="font-semibold" style={{ fontSize: '16px' }}>
              "Tell me about a time you had to influence a team without formal authority. What was the outcome?"
            </p>
          </div>

          {/* Tips */}
          <div className="bg-card border border-border rounded-2xl p-4">
            <p className="font-semibold text-foreground mb-3" style={{ fontSize: '14px' }}>💡 AI Tips</p>
            <div className="flex flex-col gap-2">
              {[
                'Use the STAR method: Situation → Task → Action → Result',
                'Quantify your impact ("improved velocity by 30%")',
                'Focus on collaboration, not credit-taking',
              ].map((tip, i) => (
                <div key={i} className="flex gap-2">
                  <div className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-950/50 flex items-center justify-center shrink-0">
                    <span className="text-blue-600" style={{ fontSize: '10px', fontWeight: 700 }}>{i + 1}</span>
                  </div>
                  <p className="text-muted-foreground" style={{ fontSize: '13px' }}>{tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recording UI */}
          <div className="bg-card border border-border rounded-2xl p-4 flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-red-500 flex items-center justify-center shadow-lg shadow-red-500/30 animate-pulse">
              <Mic className="w-8 h-8 text-white" />
            </div>
            <p className="text-foreground font-semibold" style={{ fontSize: '14px' }}>Recording your answer...</p>
            {/* Waveform visualization */}
            <div className="flex items-center gap-1 h-8">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 bg-primary rounded-full animate-pulse"
                  style={{ height: `${Math.random() * 28 + 4}px`, animationDelay: `${i * 0.05}s` }}
                />
              ))}
            </div>
            <button
              onClick={() => setPracticing(false)}
              className="px-8 py-3 rounded-xl border border-destructive text-destructive"
              style={{ fontSize: '14px', fontWeight: 500 }}
            >
              Stop & Get Feedback
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 bg-background min-h-0 overflow-y-auto">
      {/* Header */}
      <div className="px-5 pt-14 pb-4 shrink-0">
        <h1 className="font-bold text-foreground" style={{ fontSize: '22px' }}>Interview Prep</h1>
        <p className="text-muted-foreground mt-1" style={{ fontSize: '14px' }}>Practice with AI. Get real-time feedback.</p>
      </div>

      {/* Score overview */}
      <div className="mx-5 mb-4">
        <div className="bg-card border border-border rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="font-semibold text-foreground" style={{ fontSize: '14px' }}>Interview Readiness</p>
            <span className="text-emerald-500 font-bold" style={{ fontSize: '18px' }}>84%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2.5 mb-2">
            <div className="h-2.5 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500" style={{ width: '84%' }} />
          </div>
          <div className="grid grid-cols-3 gap-2 mt-3">
            {[
              { label: 'Sessions', value: '12', icon: '🎯' },
              { label: 'Avg Score', value: '85%', icon: '⭐' },
              { label: 'Hours', value: '4.2h', icon: '⏱️' },
            ].map(({ label, value, icon }) => (
              <div key={label} className="text-center bg-muted rounded-xl p-2">
                <p style={{ fontSize: '16px' }}>{icon}</p>
                <p className="font-bold text-foreground" style={{ fontSize: '14px' }}>{value}</p>
                <p className="text-muted-foreground" style={{ fontSize: '10px' }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interview types */}
      <div className="px-5 mb-4">
        <p className="font-semibold text-foreground mb-3" style={{ fontSize: '15px' }}>Practice by Type</p>
        <div className="grid grid-cols-2 gap-3">
          {TYPES.map(({ id, icon: Icon, label, sub, color, bg, iconColor, questions }) => (
            <button
              key={id}
              onClick={() => setPracticing(true)}
              className={`${bg} border border-border rounded-2xl p-4 text-left hover:shadow-md transition-all active:scale-[0.98]`}
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-3 shadow-md`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <p className="font-semibold text-foreground" style={{ fontSize: '14px' }}>{label}</p>
              <p className="text-muted-foreground" style={{ fontSize: '11px' }}>{sub}</p>
              <p className={`mt-2 ${iconColor}`} style={{ fontSize: '11px', fontWeight: 600 }}>{questions} questions</p>
            </button>
          ))}
        </div>
      </div>

      {/* Start AI Session */}
      <div className="px-5 mb-4">
        <button
          onClick={() => setPracticing(true)}
          className="w-full bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-2xl py-4 flex items-center justify-center gap-3 shadow-lg shadow-blue-500/25"
        >
          <Play className="w-5 h-5" fill="white" />
          <span style={{ fontSize: '15px', fontWeight: 600 }}>Start AI Mock Interview</span>
        </button>
      </div>

      {/* Recent sessions */}
      <div className="px-5 pb-6">
        <p className="font-semibold text-foreground mb-3" style={{ fontSize: '15px' }}>Recent Sessions</p>
        <div className="flex flex-col gap-3">
          {SESSIONS.map(({ type, question, score, date, duration, feedback }) => (
            <div key={question} className="bg-card border border-border rounded-2xl p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-accent text-accent-foreground rounded-full px-2 py-0.5" style={{ fontSize: '11px', fontWeight: 600 }}>{type}</span>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span style={{ fontSize: '11px' }}>{duration}</span>
                    </div>
                  </div>
                  <p className="text-foreground" style={{ fontSize: '13px', fontWeight: 500 }}>"{question}"</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Star className="w-3.5 h-3.5 text-amber-400" fill="currentColor" />
                  <span className={`font-bold ${score >= 85 ? 'text-emerald-500' : score >= 70 ? 'text-amber-500' : 'text-red-500'}`} style={{ fontSize: '16px' }}>
                    {score}
                  </span>
                </div>
              </div>
              <div className="w-full bg-muted rounded-full h-1.5 mb-2">
                <div
                  className={`h-1.5 rounded-full ${score >= 85 ? 'bg-emerald-500' : score >= 70 ? 'bg-amber-500' : 'bg-red-500'}`}
                  style={{ width: `${score}%` }}
                />
              </div>
              <p className="text-muted-foreground" style={{ fontSize: '12px' }}>{feedback}</p>
              <p className="text-muted-foreground mt-1" style={{ fontSize: '11px' }}>{date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
