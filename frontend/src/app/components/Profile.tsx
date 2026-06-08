import { ChevronLeft, Edit2, MapPin, Link, Award, Plus, Settings } from 'lucide-react';
import type { NavProps } from '../types';

const EXPERIENCE = [
  {
    title: 'Senior Product Designer',
    company: 'Notion',
    period: '2022 – Present',
    location: 'Remote',
    color: '#000000',
    initials: 'N',
    bullets: ['Led design system overhaul across 40+ components', 'Improved editor NPS by 18 points in 6 months'],
  },
  {
    title: 'Product Designer',
    company: 'Figma',
    period: '2019 – 2022',
    location: 'San Francisco, CA',
    color: '#1ABCFE',
    initials: 'F',
    bullets: ['Designed core editor features used by 8M+ users', 'Shipped multiplayer cursor system in 2021'],
  },
  {
    title: 'UX Designer',
    company: 'InVision',
    period: '2017 – 2019',
    location: 'New York, NY',
    color: '#FF3366',
    initials: 'I',
    bullets: ['Built prototype sharing workflows', 'Reduced onboarding drop-off by 32%'],
  },
];

const EDUCATION = [
  { school: 'Carnegie Mellon University', degree: 'M.S. Human-Computer Interaction', year: '2017', color: '#C41E3A' },
  { school: 'UC Berkeley', degree: 'B.A. Cognitive Science', year: '2015', color: '#003262' },
];

const SKILLS = [
  'Figma', 'User Research', 'Prototyping', 'Design Systems',
  'Interaction Design', 'Information Architecture', 'A/B Testing',
  'Usability Testing', 'Product Strategy', 'Figma Variables',
];

const CERTS = [
  { name: 'Google UX Design Certificate', issuer: 'Google', year: '2023' },
  { name: 'Certified Product Designer', issuer: 'IDEO U', year: '2022' },
];

export function Profile({ navigate }: NavProps) {
  const stored = localStorage.getItem("user");
  const user: { name: string; email: string; role: string } = stored ? JSON.parse(stored) : { name: "User", email: "", role: "seeker" };
  const initials = user.name ? user.name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2) : "U";
  return (
    <div className="flex flex-col flex-1 bg-background min-h-0 overflow-y-auto">
      {/* Header */}
      <div className="px-4 pt-14 pb-2 flex items-center justify-between shrink-0">
        <h1 className="font-bold text-foreground" style={{ fontSize: '18px' }}>Profile</h1>
        <div className="flex gap-2">
          <button
            onClick={() => navigate('settings')}
            className="w-9 h-9 bg-muted rounded-full flex items-center justify-center"
          >
            <Settings className="w-4 h-4 text-muted-foreground" />
          </button>
          <button className="w-9 h-9 bg-muted rounded-full flex items-center justify-center">
            <Edit2 className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Profile hero */}
      <div className="px-5 mt-2">
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white shrink-0" style={{ fontSize: '26px', fontWeight: 700 }}>
              SC
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-foreground" style={{ fontSize: '18px' }}>{user.name}</h2>
              <p className="text-muted-foreground" style={{ fontSize: '14px' }}>Senior Product Designer</p>
              <div className="flex items-center gap-1 mt-1 text-muted-foreground" style={{ fontSize: '12px' }}>
                <MapPin className="w-3 h-3" />
                San Francisco, CA · Open to Remote
              </div>
              <div className="flex items-center gap-1 mt-1 text-primary" style={{ fontSize: '12px' }}>
                <Link className="w-3 h-3" />
                sarahchen.design
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-border">
            {[
              { label: 'Profile Views', value: '1.2k' },
              { label: 'Connections', value: '847' },
              { label: 'Job Score', value: '87%' },
            ].map(({ label, value }) => (
              <div key={label} className="text-center">
                <p className="font-bold text-foreground" style={{ fontSize: '18px' }}>{value}</p>
                <p className="text-muted-foreground" style={{ fontSize: '11px' }}>{label}</p>
              </div>
            ))}
          </div>

          {/* Career goal */}
          <div className="mt-4 bg-accent rounded-xl p-3">
            <p className="text-accent-foreground" style={{ fontSize: '12px', fontWeight: 500 }}>🎯 Career Goal</p>
            <p className="text-foreground mt-1" style={{ fontSize: '13px' }}>
              Seeking a Senior / Lead Product Designer role at a product-led company focused on consumer or developer tools.
            </p>
          </div>
        </div>
      </div>

      {/* Experience */}
      <div className="px-5 mt-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-foreground" style={{ fontSize: '15px' }}>Experience</h3>
          <button className="w-7 h-7 bg-muted rounded-full flex items-center justify-center">
            <Plus className="w-3.5 h-3.5 text-muted-foreground" />
          </button>
        </div>
        <div className="bg-card border border-border rounded-2xl overflow-hidden divide-y divide-border">
          {EXPERIENCE.map(({ title, company, period, location, color, initials, bullets }) => (
            <div key={company} className="p-4">
              <div className="flex gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0"
                  style={{ background: color, fontSize: '13px', fontWeight: 700 }}
                >
                  {initials}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground" style={{ fontSize: '14px' }}>{title}</p>
                  <p className="text-muted-foreground" style={{ fontSize: '13px' }}>{company}</p>
                  <div className="flex gap-2 mt-0.5" style={{ fontSize: '11px' }}>
                    <span className="text-muted-foreground">{period}</span>
                    <span className="text-muted-foreground">·</span>
                    <span className="text-muted-foreground">{location}</span>
                  </div>
                  <ul className="mt-2 flex flex-col gap-1">
                    {bullets.map(b => (
                      <li key={b} className="text-muted-foreground flex gap-1.5" style={{ fontSize: '12px' }}>
                        <span className="mt-1.5 w-1 h-1 bg-muted-foreground rounded-full shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="px-5 mt-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-foreground" style={{ fontSize: '15px' }}>Skills</h3>
          <span className="text-muted-foreground" style={{ fontSize: '13px' }}>{SKILLS.length} skills</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {SKILLS.map(skill => (
            <span
              key={skill}
              className="bg-accent text-accent-foreground border border-border rounded-full px-3 py-1"
              style={{ fontSize: '13px' }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="px-5 mt-4">
        <h3 className="font-semibold text-foreground mb-3" style={{ fontSize: '15px' }}>Education</h3>
        <div className="bg-card border border-border rounded-2xl overflow-hidden divide-y divide-border">
          {EDUCATION.map(({ school, degree, year, color }) => (
            <div key={school} className="p-4 flex gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0" style={{ background: color, fontSize: '12px', fontWeight: 700 }}>
                🎓
              </div>
              <div>
                <p className="font-semibold text-foreground" style={{ fontSize: '14px' }}>{school}</p>
                <p className="text-muted-foreground" style={{ fontSize: '13px' }}>{degree}</p>
                <p className="text-muted-foreground" style={{ fontSize: '12px' }}>Class of {year}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div className="px-5 mt-4 mb-6">
        <h3 className="font-semibold text-foreground mb-3" style={{ fontSize: '15px' }}>Certifications</h3>
        <div className="flex flex-col gap-2">
          {CERTS.map(({ name, issuer, year }) => (
            <div key={name} className="bg-card border border-border rounded-xl p-3 flex items-center gap-3">
              <div className="w-9 h-9 bg-amber-100 dark:bg-amber-950/50 rounded-xl flex items-center justify-center">
                <Award className="w-4 h-4 text-amber-600" />
              </div>
              <div>
                <p className="font-medium text-foreground" style={{ fontSize: '13px' }}>{name}</p>
                <p className="text-muted-foreground" style={{ fontSize: '12px' }}>{issuer} · {year}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
