import { useState } from 'react';
import { ChevronLeft, Bookmark, BookmarkCheck, MapPin, DollarSign, Clock, Zap, CheckCircle, Share2 } from 'lucide-react';
import { JOBS } from '../types';
import type { NavProps } from '../types';

type DetailTab = 'overview' | 'requirements' | 'benefits';

export function JobDetail({ navigate, goBack, params }: NavProps) {
  const jobId = params?.jobId ?? '1';
  const job = JOBS.find(j => j.id === jobId) ?? JOBS[0];
  const [saved, setSaved] = useState(job.saved);
  const [tab, setTab] = useState<DetailTab>('overview');
  const [applied, setApplied] = useState(false);

  const matchColor = job.match >= 90 ? 'text-emerald-500' : job.match >= 80 ? 'text-blue-500' : 'text-amber-500';

  return (
    <div className="flex flex-col flex-1 bg-background min-h-0">
      {/* Top nav */}
      <div className="px-4 pt-14 pb-3 flex items-center justify-between shrink-0">
        <button onClick={goBack} className="w-9 h-9 bg-card border border-border rounded-full flex items-center justify-center">
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>
        <p className="font-semibold text-foreground" style={{ fontSize: '15px' }}>Job Details</p>
        <div className="flex gap-2">
          <button className="w-9 h-9 bg-card border border-border rounded-full flex items-center justify-center">
            <Share2 className="w-4 h-4 text-muted-foreground" />
          </button>
          <button
            onClick={() => setSaved(s => !s)}
            className="w-9 h-9 bg-card border border-border rounded-full flex items-center justify-center"
          >
            {saved
              ? <BookmarkCheck className="w-4 h-4 text-primary" />
              : <Bookmark className="w-4 h-4 text-muted-foreground" />
            }
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Company header */}
        <div className="px-5 pb-4">
          <div className="flex gap-4 items-center">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-md"
              style={{ background: job.color, fontSize: '22px', fontWeight: 800 }}
            >
              {job.initials}
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-foreground" style={{ fontSize: '18px' }}>{job.title}</h2>
              <p className="text-muted-foreground" style={{ fontSize: '14px' }}>{job.company}</p>
              <div className="flex items-center gap-1 text-muted-foreground mt-1" style={{ fontSize: '12px' }}>
                <MapPin className="w-3 h-3" />
                {job.location}
                <span className="mx-1">·</span>
                <span
                  className={`${
                    job.type === 'Remote' ? 'text-emerald-500' : 'text-amber-500'
                  } font-medium`}
                >
                  {job.type}
                </span>
              </div>
            </div>
          </div>

          {/* Info pills */}
          <div className="flex gap-2 flex-wrap mt-4">
            <div className="flex items-center gap-1.5 bg-muted rounded-xl px-3 py-2">
              <DollarSign className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-foreground" style={{ fontSize: '13px', fontWeight: 500 }}>{job.salary}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-muted rounded-xl px-3 py-2">
              <Clock className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-foreground" style={{ fontSize: '13px', fontWeight: 500 }}>Full-time</span>
            </div>
            <div className="flex items-center gap-1.5 bg-muted rounded-xl px-3 py-2">
              <span className="text-muted-foreground" style={{ fontSize: '13px' }}>Posted {job.posted}</span>
            </div>
          </div>

          {/* AI Match score */}
          <div className="mt-4 bg-gradient-to-r from-blue-50 to-violet-50 dark:from-blue-950/40 dark:to-violet-950/40 border border-blue-100 dark:border-blue-900/50 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-600" fill="currentColor" />
                <span className="font-semibold text-foreground" style={{ fontSize: '14px' }}>AI Suitability Analysis</span>
              </div>
              <span className={`font-bold ${matchColor}`} style={{ fontSize: '20px' }}>{job.match}%</span>
            </div>
            <div className="w-full bg-white/60 dark:bg-slate-700/40 rounded-full h-2.5 mb-3">
              <div
                className="h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-violet-500"
                style={{ width: `${job.match}%` }}
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Skills', value: '94%' },
                { label: 'Experience', value: '88%' },
                { label: 'Culture', value: '91%' },
              ].map(({ label, value }) => (
                <div key={label} className="text-center bg-white/50 dark:bg-slate-700/30 rounded-xl p-2">
                  <p className="font-bold text-foreground" style={{ fontSize: '15px' }}>{value}</p>
                  <p className="text-muted-foreground" style={{ fontSize: '11px' }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-5">
          <div className="flex bg-muted rounded-xl p-1 mb-4">
            {(['overview', 'requirements', 'benefits'] as DetailTab[]).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-2 rounded-lg transition-all capitalize ${
                  tab === t ? 'bg-card shadow-sm text-foreground font-semibold' : 'text-muted-foreground'
                }`}
                style={{ fontSize: '13px' }}
              >
                {t}
              </button>
            ))}
          </div>

          {tab === 'overview' && (
            <div className="flex flex-col gap-5 pb-8">
              <div>
                <h4 className="font-semibold text-foreground mb-2" style={{ fontSize: '14px' }}>About This Role</h4>
                <p className="text-muted-foreground leading-relaxed" style={{ fontSize: '14px' }}>{job.description}</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-3" style={{ fontSize: '14px' }}>Responsibilities</h4>
                <div className="flex flex-col gap-2.5">
                  {job.responsibilities.map((r, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-950/50 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-blue-600" style={{ fontSize: '10px', fontWeight: 700 }}>{i + 1}</span>
                      </div>
                      <p className="text-muted-foreground" style={{ fontSize: '14px' }}>{r}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2" style={{ fontSize: '14px' }}>Required Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map(skill => (
                    <span key={skill} className="bg-accent text-accent-foreground border border-border rounded-full px-3 py-1" style={{ fontSize: '12px' }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === 'requirements' && (
            <div className="flex flex-col gap-3 pb-8">
              {job.requirements.map((r, i) => (
                <div key={i} className="flex gap-3 bg-card border border-border rounded-xl p-3">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <p className="text-foreground" style={{ fontSize: '14px' }}>{r}</p>
                </div>
              ))}
            </div>
          )}

          {tab === 'benefits' && (
            <div className="flex flex-col gap-3 pb-8">
              {job.benefits.map((b, i) => (
                <div key={i} className="flex gap-3 bg-card border border-border rounded-xl p-3 items-center">
                  <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-950/50 rounded-lg flex items-center justify-center text-base shrink-0">
                    {['💰', '🏥', '🌴', '📚', '🏠'][i] ?? '✨'}
                  </div>
                  <p className="text-foreground" style={{ fontSize: '14px' }}>{b}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Apply button */}
      <div className="px-5 pb-6 pt-3 bg-background border-t border-border shrink-0">
        <button
          onClick={() => setApplied(a => !a)}
          className={`w-full py-4 rounded-2xl font-semibold transition-all ${
            applied
              ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
              : 'bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg shadow-blue-500/25'
          }`}
        >
          {applied ? '✓ Application Submitted' : 'Apply Now'}
        </button>
        {!applied && (
          <p className="text-center text-muted-foreground mt-2" style={{ fontSize: '12px' }}>
            ~2 min to apply with your saved profile
          </p>
        )}
      </div>
    </div>
  );
}
