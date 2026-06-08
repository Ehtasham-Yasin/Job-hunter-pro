import { useState } from 'react';
import { Search, FileText, MessageSquare, ChevronRight } from 'lucide-react';
import type { NavProps } from '../types';

const SLIDES = [
  {
    icon: Search,
    color: 'from-blue-500 to-blue-600',
    bg: 'bg-blue-50 dark:bg-blue-950/40',
    iconColor: 'text-blue-600',
    title: 'Discover Perfect Jobs',
    subtitle: 'AI matches you with thousands of jobs based on your skills, goals, and experience level.',
    stat: '50k+ live roles',
  },
  {
    icon: FileText,
    color: 'from-violet-500 to-violet-600',
    bg: 'bg-violet-50 dark:bg-violet-950/40',
    iconColor: 'text-violet-600',
    title: 'Optimize Your Resume',
    subtitle: 'Get ATS-friendly suggestions and boost your resume score to stand out from the crowd instantly.',
    stat: '3× more interviews',
  },
  {
    icon: MessageSquare,
    color: 'from-emerald-500 to-emerald-600',
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    iconColor: 'text-emerald-600',
    title: 'Ace Every Interview',
    subtitle: 'Practice with AI coaches and receive real-time feedback on your answers, tone, and confidence.',
    stat: '92% success rate',
  },
];

export function Onboarding({ navigate }: NavProps) {
  const [slide, setSlide] = useState(0);
  const current = SLIDES[slide];
  const Icon = current.icon;
  const isLast = slide === SLIDES.length - 1;

  return (
    <div className="flex flex-col flex-1 bg-background min-h-0">
      {/* Skip button */}
      <div className="flex justify-end px-6 pt-14">
        <button
          onClick={() => navigate('auth')}
          className="text-muted-foreground"
          style={{ fontSize: '14px' }}
        >
          Skip
        </button>
      </div>

      {/* Illustration area */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 gap-8">
        <div className={`w-44 h-44 rounded-3xl ${current.bg} flex items-center justify-center relative`}>
          <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${current.color} flex items-center justify-center shadow-lg`}>
            <Icon className="w-12 h-12 text-white" />
          </div>
          {/* floating accent */}
          <div className={`absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-br ${current.color} opacity-40`} />
          <div className={`absolute -bottom-2 -left-2 w-5 h-5 rounded-full bg-gradient-to-br ${current.color} opacity-30`} />
          {/* stat pill */}
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-card border border-border rounded-full px-4 py-1.5 shadow-md whitespace-nowrap">
            <span className="text-xs font-semibold text-foreground">{current.stat}</span>
          </div>
        </div>

        <div className="text-center mt-6">
          <h2 className="text-2xl font-bold text-foreground">{current.title}</h2>
          <p className="text-muted-foreground mt-3 leading-relaxed" style={{ fontSize: '15px' }}>
            {current.subtitle}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="px-8 pb-12 flex flex-col gap-6">
        {/* dots */}
        <div className="flex gap-2 justify-center">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              className={`transition-all rounded-full ${
                i === slide
                  ? 'w-6 h-2 bg-primary'
                  : 'w-2 h-2 bg-border'
              }`}
            />
          ))}
        </div>

        {isLast ? (
          <button
            onClick={() => navigate('auth')}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2"
          >
            Get Started
            <ChevronRight className="w-5 h-5" />
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={() => navigate('auth')}
              className="flex-1 py-4 rounded-2xl border border-border text-foreground font-medium"
            >
              Sign In
            </button>
            <button
              onClick={() => setSlide(s => s + 1)}
              className="flex-1 py-4 rounded-2xl bg-primary text-white font-semibold shadow-md shadow-blue-500/25"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
