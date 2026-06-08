import { Briefcase, Zap } from 'lucide-react';
import type { NavProps } from '../types';

export function Splash(_props: NavProps) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 bg-gradient-to-br from-blue-600 via-blue-700 to-violet-700 text-white relative overflow-hidden min-h-0">
      {/* decorative blobs */}
      <div className="absolute top-16 -right-20 w-72 h-72 rounded-full bg-white/10" />
      <div className="absolute -bottom-24 -left-20 w-96 h-96 rounded-full bg-violet-500/20" />
      <div className="absolute top-1/2 -left-10 w-40 h-40 rounded-full bg-blue-400/15" />

      <div className="relative z-10 flex flex-col items-center gap-8 px-8 text-center">
        {/* App icon */}
        <div className="relative">
          <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-2xl">
            <Briefcase className="w-12 h-12 text-blue-600" />
          </div>
          <div className="absolute -top-2 -right-2 w-9 h-9 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
            <Zap className="w-4 h-4 text-yellow-900" fill="currentColor" />
          </div>
        </div>

        <div>
          <h1 className="text-4xl font-bold tracking-tight">JobHunter Pro</h1>
          <p className="text-blue-100 mt-2 text-lg">Land Your Dream Job with AI</p>
        </div>

        {/* animated dots */}
        <div className="flex gap-2.5 mt-2">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="w-2.5 h-2.5 rounded-full bg-white/70 animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>

      <p className="absolute bottom-8 text-white/40" style={{ fontSize: '12px' }}>
        Powered by AI · Built for Professionals
      </p>
    </div>
  );
}
