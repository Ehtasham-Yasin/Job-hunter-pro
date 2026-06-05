import { useState } from 'react';
import { ChevronLeft, Wand2, Copy, Download, RefreshCw, ChevronDown, CheckCircle } from 'lucide-react';
import type { NavProps } from '../types';

const TONES = ['Professional', 'Conversational', 'Enthusiastic', 'Creative'];
const JOBS_OPTS = ['Senior Product Designer — Google', 'UX Lead — Stripe', 'Product Designer — Airbnb', 'UI/UX Designer — Figma'];

const GENERATED_LETTER = `Dear Hiring Team at Google,

I'm excited to apply for the Senior Product Designer role. With 7 years of product design experience shipping features at Notion and Figma that impact millions of users, I'm confident I can bring both strategic vision and meticulous craft to Google's design team.

At Notion, I led a complete design system overhaul covering 40+ components, improving design velocity by 35% and reducing engineering handoff time significantly. Before that at Figma, I helped design the multiplayer cursor system—a deeply complex interaction problem that required tight collaboration across design, engineering, and research.

What draws me to Google is the intersection of scale and craft. I thrive when working on products where a single design decision affects hundreds of millions of people. The opportunity to shape core consumer experiences at Google is deeply motivating.

I'd love to bring my systems thinking, research-driven approach, and collaborative leadership style to your team.

Warm regards,
Sarah Chen`;

export function CoverLetter({ goBack }: NavProps) {
  const [selectedJob, setSelectedJob] = useState(JOBS_OPTS[0]);
  const [selectedTone, setSelectedTone] = useState(TONES[0]);
  const [generated, setGenerated] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showJobPicker, setShowJobPicker] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [letterText, setLetterText] = useState(GENERATED_LETTER);

  const handleGenerate = () => {
    setGenerating(true);
    setGenerated(false);
    setTimeout(() => { setGenerating(false); setGenerated(true); }, 1800);
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col flex-1 bg-background min-h-0">
      {/* Header */}
      <div className="px-4 pt-14 pb-4 flex items-center gap-3 shrink-0">
        <button onClick={goBack} className="text-muted-foreground w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h1 className="font-bold text-foreground" style={{ fontSize: '18px' }}>Cover Letter</h1>
        <span className="ml-auto bg-violet-100 dark:bg-violet-950/50 text-violet-600 rounded-full px-2.5 py-0.5" style={{ fontSize: '11px', fontWeight: 600 }}>AI-Powered</span>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-6 flex flex-col gap-4">
        {/* Job selector */}
        <div>
          <label className="text-foreground mb-1.5 block" style={{ fontSize: '13px', fontWeight: 500 }}>Applying for</label>
          <div className="relative">
            <button
              onClick={() => setShowJobPicker(p => !p)}
              className="w-full bg-card border border-border rounded-xl px-4 py-3.5 text-left flex items-center justify-between"
            >
              <span className="text-foreground" style={{ fontSize: '14px' }}>{selectedJob}</span>
              <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${showJobPicker ? 'rotate-180' : ''}`} />
            </button>
            {showJobPicker && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-10">
                {JOBS_OPTS.map(j => (
                  <button
                    key={j}
                    onClick={() => { setSelectedJob(j); setShowJobPicker(false); }}
                    className={`w-full text-left px-4 py-3 hover:bg-muted transition-colors border-b border-border last:border-0 ${selectedJob === j ? 'text-primary' : 'text-foreground'}`}
                    style={{ fontSize: '14px' }}
                  >
                    {j}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Tone selector */}
        <div>
          <label className="text-foreground mb-1.5 block" style={{ fontSize: '13px', fontWeight: 500 }}>Tone</label>
          <div className="flex gap-2">
            {TONES.map(t => (
              <button
                key={t}
                onClick={() => setSelectedTone(t)}
                className={`flex-1 py-2 rounded-xl border transition-colors ${
                  selectedTone === t
                    ? 'bg-primary text-white border-primary'
                    : 'bg-card border-border text-muted-foreground hover:border-primary hover:text-primary'
                }`}
                style={{ fontSize: '12px', fontWeight: selectedTone === t ? 600 : 400 }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Generate button */}
        <button
          onClick={handleGenerate}
          disabled={generating}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 text-white font-semibold shadow-lg shadow-violet-500/20 flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {generating ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4" />
              {generated ? 'Regenerate' : 'Generate Cover Letter'}
            </>
          )}
        </button>

        {/* Generated letter */}
        {generated && !generating && (
          <>
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              {/* Letter header */}
              <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                <p className="font-semibold text-foreground" style={{ fontSize: '13px' }}>Generated Letter</p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditMode(e => !e)}
                    className={`px-3 py-1 rounded-lg ${editMode ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}
                    style={{ fontSize: '12px' }}
                  >
                    {editMode ? 'Done' : 'Edit'}
                  </button>
                </div>
              </div>

              {/* Letter content */}
              <div className="p-4">
                {editMode ? (
                  <textarea
                    value={letterText}
                    onChange={e => setLetterText(e.target.value)}
                    className="w-full bg-muted rounded-xl p-3 text-foreground outline-none resize-none"
                    style={{ fontSize: '13px', lineHeight: 1.7, minHeight: '320px' }}
                  />
                ) : (
                  <p className="text-foreground whitespace-pre-line" style={{ fontSize: '13px', lineHeight: 1.7 }}>
                    {letterText}
                  </p>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleCopy}
                className="flex-1 py-3.5 rounded-xl border border-border bg-card flex items-center justify-center gap-2 text-foreground hover:bg-muted transition-colors"
              >
                {copied
                  ? <><CheckCircle className="w-4 h-4 text-emerald-500" /><span style={{ fontSize: '14px', fontWeight: 500 }}>Copied!</span></>
                  : <><Copy className="w-4 h-4" /><span style={{ fontSize: '14px', fontWeight: 500 }}>Copy</span></>
                }
              </button>
              <button className="flex-1 py-3.5 rounded-xl bg-primary text-white flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 hover:bg-primary/90 transition-colors">
                <Download className="w-4 h-4" />
                <span style={{ fontSize: '14px', fontWeight: 500 }}>Export PDF</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
