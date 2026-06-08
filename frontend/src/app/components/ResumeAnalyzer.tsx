import { useState } from 'react';
import { ChevronLeft, Upload, FileText, CheckCircle, AlertCircle, XCircle, TrendingUp, ChevronRight } from 'lucide-react';
import type { NavProps } from '../types';

const IMPROVEMENTS = [
  { type: 'critical', icon: XCircle, color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-950/30', title: 'Add quantified achievements', desc: '73% of shortlisted resumes include numbers. Add metrics like "increased retention by 24%".' },
  { type: 'warning', icon: AlertCircle, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-950/30', title: 'Missing key ATS keywords', desc: 'Add: "Design Systems", "Cross-functional", "Stakeholder Management" — top terms in target roles.' },
  { type: 'warning', icon: AlertCircle, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-950/30', title: 'Summary section too long', desc: 'Trim your summary to 3 sentences. Recruiters spend avg. 7 seconds on initial scan.' },
  { type: 'good', icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-950/30', title: 'Strong action verbs', desc: 'Great use of "Led", "Shipped", "Designed", "Reduced". Keep this up.' },
  { type: 'good', icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-950/30', title: 'Consistent formatting', desc: 'Your formatting is clean and ATS-readable. No parsing issues detected.' },
];

const KEYWORDS = {
  present: ['Figma', 'User Research', 'Prototyping', 'UX', 'Design Systems', 'Mobile'],
  missing: ['Cross-functional', 'Stakeholder Management', 'Product Strategy', 'OKRs', 'A/B Testing'],
};

export function ResumeAnalyzer({ goBack }: NavProps) {
  const [uploaded, setUploaded] = useState(true); // show analyzed state by default

  return (
    <div className="flex flex-col flex-1 bg-background min-h-0">
      {/* Header */}
      <div className="px-4 pt-14 pb-4 flex items-center gap-3 shrink-0">
        <button onClick={goBack} className="text-muted-foreground w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h1 className="font-bold text-foreground" style={{ fontSize: '18px' }}>Resume Analyzer</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-6 flex flex-col gap-4">
        {!uploaded ? (
          /* Upload state */
          <button
            onClick={() => setUploaded(true)}
            className="border-2 border-dashed border-border rounded-2xl p-10 flex flex-col items-center gap-4 hover:bg-muted transition-colors"
          >
            <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center">
              <Upload className="w-8 h-8 text-accent-foreground" />
            </div>
            <div className="text-center">
              <p className="font-semibold text-foreground" style={{ fontSize: '16px' }}>Upload Your Resume</p>
              <p className="text-muted-foreground mt-1" style={{ fontSize: '13px' }}>PDF, DOCX up to 10MB</p>
            </div>
            <div className="px-6 py-3 bg-primary text-white rounded-xl" style={{ fontSize: '14px', fontWeight: 600 }}>
              Choose File
            </div>
          </button>
        ) : (
          <>
            {/* File indicator */}
            <div className="bg-card border border-border rounded-xl p-3 flex items-center gap-3">
              <div className="w-9 h-9 bg-blue-100 dark:bg-blue-950/50 rounded-lg flex items-center justify-center">
                <FileText className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground" style={{ fontSize: '13px' }}>Sarah_Chen_Resume_2026.pdf</p>
                <p className="text-muted-foreground" style={{ fontSize: '11px' }}>Analyzed just now · 2.4 MB</p>
              </div>
              <button onClick={() => setUploaded(false)} className="text-muted-foreground" style={{ fontSize: '12px' }}>Change</button>
            </div>

            {/* Score overview */}
            <div className="bg-gradient-to-br from-blue-600 to-violet-600 rounded-2xl p-5 text-white">
              <p className="text-blue-100 mb-4" style={{ fontSize: '13px' }}>Overall Resume Score</p>
              <div className="flex items-end gap-3 mb-4">
                <span className="font-bold" style={{ fontSize: '56px', lineHeight: 1 }}>87</span>
                <span className="text-blue-200 mb-2" style={{ fontSize: '20px' }}>/100</span>
                <span className="ml-auto mb-2 text-emerald-300 flex items-center gap-1" style={{ fontSize: '14px', fontWeight: 600 }}>
                  <TrendingUp className="w-4 h-4" />
                  Top 15%
                </span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2.5 mb-4">
                <div className="h-2.5 rounded-full bg-white" style={{ width: '87%' }} />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'ATS Score', value: '91%' },
                  { label: 'Keywords', value: '72%' },
                  { label: 'Format', value: '95%' },
                ].map(({ label, value }) => (
                  <div key={label} className="text-center bg-white/10 rounded-xl p-2">
                    <p className="font-bold text-white" style={{ fontSize: '16px' }}>{value}</p>
                    <p className="text-blue-200" style={{ fontSize: '10px' }}>{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Improvements */}
            <div>
              <p className="font-semibold text-foreground mb-3" style={{ fontSize: '15px' }}>Suggestions</p>
              <div className="flex flex-col gap-2">
                {IMPROVEMENTS.map(({ type, icon: Icon, color, bg, title, desc }) => (
                  <div key={title} className={`${bg} rounded-2xl p-4 flex gap-3`}>
                    <Icon className={`w-5 h-5 ${color} shrink-0 mt-0.5`} />
                    <div>
                      <p className="font-semibold text-foreground" style={{ fontSize: '13px' }}>{title}</p>
                      <p className="text-muted-foreground mt-0.5 leading-relaxed" style={{ fontSize: '12px' }}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Keywords */}
            <div>
              <p className="font-semibold text-foreground mb-3" style={{ fontSize: '15px' }}>Keyword Analysis</p>
              <div className="bg-card border border-border rounded-2xl p-4">
                <div className="mb-4">
                  <p className="text-emerald-600 mb-2" style={{ fontSize: '12px', fontWeight: 600 }}>✓ FOUND IN RESUME</p>
                  <div className="flex flex-wrap gap-2">
                    {KEYWORDS.present.map(kw => (
                      <span key={kw} className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 border border-emerald-200 dark:border-emerald-800 rounded-full px-2.5 py-1" style={{ fontSize: '12px' }}>
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="border-t border-border pt-4">
                  <p className="text-amber-600 mb-2" style={{ fontSize: '12px', fontWeight: 600 }}>⚠ MISSING — ADD THESE</p>
                  <div className="flex flex-wrap gap-2">
                    {KEYWORDS.missing.map(kw => (
                      <span key={kw} className="bg-amber-50 dark:bg-amber-950/40 text-amber-600 border border-amber-200 dark:border-amber-800 rounded-full px-2.5 py-1" style={{ fontSize: '12px' }}>
                        + {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2">
              Download Optimized Resume
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
