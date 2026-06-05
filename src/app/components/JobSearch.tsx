import { useEffect, useState } from 'react';
import { Search, SlidersHorizontal, Bookmark, BookmarkCheck, MapPin, X } from 'lucide-react';
import type { NavProps } from '../types';

const FILTERS = ['Remote', '$100k+', 'Senior', 'Design', 'Full-time', 'Startup'];

type ApiJob = {
  id: string;
  title: string;
  company: string;
  location?: string;
  salary?: string;
  description?: string;
  url?: string;
  matchScore?: number;
  createdAt?: string;
};

export function JobSearch({ navigate }: NavProps) {
  const [query, setQuery] = useState('');
  const [jobs, setJobs] = useState<ApiJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState<string[]>(['Remote']);
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:4000/api/jobs")
      .then((res) => res.json())
      .then((data) => {
        setJobs(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const toggleFilter = (f: string) =>
    setActiveFilters((fs) => (fs.includes(f) ? fs.filter((x) => x !== f) : [...fs, f]));

  const filtered = jobs.filter(
    (j) =>
      query === '' ||
      j.title?.toLowerCase().includes(query.toLowerCase()) ||
      j.company?.toLowerCase().includes(query.toLowerCase())
  );

  if (loading) {
    return <div className="p-5 text-foreground">Loading jobs...</div>;
  }

  return (
    <div className="flex flex-col flex-1 bg-background min-h-0">
      <div className="px-5 pt-14 pb-3 bg-background shrink-0">
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-bold text-foreground" style={{ fontSize: '22px' }}>Find Jobs</h1>
          <button
            onClick={() => navigate("postJob")}
            className="bg-primary text-white px-3 py-2 rounded-xl"
            style={{ fontSize: "13px", fontWeight: 600 }}
          >
            + Post Job
          </button>
          <span className="text-muted-foreground" style={{ fontSize: '13px' }}>{filtered.length} results</span>
          <button
            onClick={() => navigate("recruiterDashboard")}
            className="bg-card border border-border text-foreground px-3 py-2 rounded-lg"
            style={{ fontSize: "12px", fontWeight: 600 }}
          >
            Recruiter
          </button>
        </div>


        <div className="flex gap-2">
          <div className="flex-1 flex items-center gap-2 bg-card border border-border rounded-xl px-3 py-2.5">
            <Search className="w-4 h-4 text-muted-foreground shrink-0" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Job title, company, skill..."
              className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
              style={{ fontSize: '14px' }}
            />
            {query && (
              <button onClick={() => setQuery('')}>
                <X className="w-3.5 h-3.5 text-muted-foreground" />
              </button>
            )}
          </div>

          <button
            onClick={() => setShowFilters((f) => !f)}
            className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-colors ${showFilters ? 'bg-primary border-primary text-white' : 'bg-card border-border text-foreground'
              }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>

        <div className="flex gap-2 mt-3 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          {FILTERS.map((f) => {
            const active = activeFilters.includes(f);
            return (
              <button
                key={f}
                onClick={() => toggleFilter(f)}
                className={`px-3 py-1.5 rounded-full border whitespace-nowrap transition-colors shrink-0 ${active
                  ? 'bg-primary text-white border-primary'
                  : 'bg-card text-muted-foreground border-border hover:border-primary hover:text-primary'
                  }`}
                style={{ fontSize: '13px', fontWeight: active ? 600 : 400 }}
              >
                {f}
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-5 mb-3 shrink-0">
        <div className="bg-gradient-to-r from-blue-50 to-violet-50 dark:from-blue-950/40 dark:to-violet-950/40 border border-blue-100 dark:border-blue-900/50 rounded-xl p-3 flex items-center gap-2">
          <span style={{ fontSize: '16px' }}>🤖</span>
          <p className="text-foreground" style={{ fontSize: '13px' }}>
            <span className="font-semibold">AI Picks:</span> Jobs loaded from your database
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-6 flex flex-col gap-3">
        {filtered.map((job) => {
          const isSaved = saved[job.id];
          const match = job.matchScore ?? 80;

          return (
            <button
              key={job.id}
              onClick={() => navigate('jobDetail', { jobId: job.id })}
              className="bg-card border border-border rounded-2xl p-4 text-left hover:shadow-md transition-all hover:border-primary/30 active:scale-[0.99]"
            >
              <div className="flex gap-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0"
                  style={{ background: '#4285F4', fontSize: '16px', fontWeight: 800 }}
                >
                  {job.company?.[0] ?? 'J'}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-semibold text-foreground truncate" style={{ fontSize: '14px' }}>{job.title}</p>
                      <p className="text-muted-foreground" style={{ fontSize: '13px' }}>{job.company}</p>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSaved((s) => ({ ...s, [job.id]: !s[job.id] }));
                      }}
                      className="shrink-0 mt-0.5"
                    >
                      {isSaved
                        ? <BookmarkCheck className="w-4 h-4 text-primary" />
                        : <Bookmark className="w-4 h-4 text-muted-foreground" />}
                    </button>
                  </div>

                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      <span style={{ fontSize: '12px' }}>{job.location ?? 'Remote'}</span>
                    </div>

                    <span
                      className="px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600"
                      style={{ fontSize: '11px', fontWeight: 600 }}
                    >
                      Remote
                    </span>

                    <span className="text-muted-foreground" style={{ fontSize: '12px' }}>
                      {job.salary ?? 'Salary not listed'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex gap-1.5">
                      {['React', 'TypeScript'].map((tag) => (
                        <span
                          key={tag}
                          className="bg-accent text-accent-foreground rounded-full px-2 py-0.5"
                          style={{ fontSize: '11px' }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full"
                          style={{ width: `${match}%` }}
                        />
                      </div>
                      <span className="text-emerald-500" style={{ fontSize: '12px', fontWeight: 700 }}>
                        {match}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                <span className="text-muted-foreground" style={{ fontSize: '11px' }}>Posted recently</span>
                <span className="text-primary font-semibold" style={{ fontSize: '12px' }}>View Details →</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}