import { useState, useEffect } from 'react';
import { PostJob } from './components/PostJob';
import type { Screen, Tab, NavProps } from './types';
import { Splash } from './components/Splash';
import { Onboarding } from './components/Onboarding';
import { Auth } from './components/Auth';
import { Dashboard } from './components/Dashboard';
import { JobSearch } from './components/JobSearch';
import { JobDetail } from './components/JobDetail';
import { ApplicationTracker } from './components/ApplicationTracker';
import { InterviewPrep } from './components/InterviewPrep';
import { ResumeAnalyzer } from './components/ResumeAnalyzer';
import { CoverLetter } from './components/CoverLetter';
import { CareerInsights } from './components/CareerInsights';
import { Notifications } from './components/Notifications';
import { Profile } from './components/Profile';
import { Settings } from './components/Settings';
import { BottomNav } from './components/BottomNav';
import { RecruiterDashboard } from './components/RecruiterDashboard';
import { RoleSelect } from './components/RoleSelect';
import { ManageJobs } from './components/ManageJobs';

const MAIN_SCREENS: Screen[] = ['home', 'jobs', 'applications', 'interviews', 'profile'];

export default function App() {
  const [history, setHistory] = useState<Screen[]>(['splash']);
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [darkMode, setDarkMode] = useState(false);
  const [params, setParams] = useState<Record<string, string>>({});

  const screen = history[history.length - 1];

  useEffect(() => {
    if (screen === 'splash') {
      const t = setTimeout(() => navigate('roleSelect'), 2600);
      return () => clearTimeout(t);
    }
  }, [screen]);

  const navigate = (newScreen: Screen, newParams?: Record<string, string>) => {
    if (newParams) setParams(p => ({ ...p, ...newParams }));
    setHistory(h => [...h, newScreen]);
    if (MAIN_SCREENS.includes(newScreen)) {
      setActiveTab(newScreen as Tab);
    }
  };

  const goBack = () => {
    setHistory(h => (h.length > 1 ? h.slice(0, -1) : h));
  };

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    setHistory(h => {
      const lastMainIdx = [...h].reverse().findIndex(s => MAIN_SCREENS.includes(s));
      if (lastMainIdx >= 0) {
        return [...h.slice(0, h.length - lastMainIdx), tab];
      }
      return [...h, tab];
    });
  };

  const showBottomNav = MAIN_SCREENS.includes(screen);

  const navProps: NavProps = {
    navigate,
    goBack,
    darkMode,
    toggleDarkMode: () => setDarkMode(d => !d),
    params,
  };

  const renderScreen = () => {
    switch (screen) {
      case 'splash': return <Splash {...navProps} />;
      case 'onboarding': return <Onboarding {...navProps} />;
      case 'auth': return <Auth {...navProps} />;
      case 'home': return <Dashboard {...navProps} />;
      case 'jobs': return <JobSearch {...navProps} />;
      case 'jobDetail': return <JobDetail {...navProps} />;
      case 'applications':
        return <ApplicationTracker />;
      case 'interviews': return <InterviewPrep {...navProps} />;
      case 'profile': return <Profile {...navProps} />;
      case 'resume': return <ResumeAnalyzer {...navProps} />;
      case 'coverLetter': return <CoverLetter {...navProps} />;
      case 'careerInsights': return <CareerInsights {...navProps} />;
      case 'notifications': return <Notifications {...navProps} />;
      case "postJob":
        return <PostJob {...navProps} />;
      case 'settings': return <Settings {...navProps} />;
      case 'recruiterDashboard':
        return <RecruiterDashboard {...navProps} />;
      case 'roleSelect':
        return <RoleSelect {...navProps} />;
      case 'manageJobs':
        return <ManageJobs {...navProps} />;
      default: return <Dashboard {...navProps} />;
    }
  };

  return (
    /* MARKER-MAKE-KIT-INVOKED */
    <div className={darkMode ? 'dark' : ''} style={{ minHeight: '100vh' }}>
      <div
        className="min-h-screen bg-slate-200 dark:bg-slate-950 flex items-start justify-center md:items-center"
        style={{ padding: '0' }}
      >
        {/* Phone frame on desktop, full-screen on mobile */}
        <div
          className="w-full bg-background text-foreground relative flex flex-col overflow-hidden md:rounded-[44px] md:shadow-[0_32px_80px_rgba(0,0,0,0.25)] md:my-8"
          style={{ maxWidth: '430px', minHeight: '100svh' }}
        >
          {/* Status bar */}
          <div className="shrink-0 flex items-center justify-between px-6 pt-3 pb-1 select-none" style={{ fontSize: '12px', fontWeight: 600 }}>
            <span className="text-foreground">9:41</span>
            <div className="flex items-center gap-1.5">
              <svg width="15" height="11" viewBox="0 0 15 11" fill="currentColor" className="text-foreground">
                <rect x="0" y="3" width="3" height="8" rx="1" opacity="0.4" />
                <rect x="4" y="2" width="3" height="9" rx="1" opacity="0.6" />
                <rect x="8" y="0" width="3" height="11" rx="1" opacity="0.8" />
                <rect x="12" y="0" width="3" height="11" rx="1" />
              </svg>
              <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor" className="text-foreground">
                <path d="M8 2.4C10.8 2.4 13.3 3.6 15 5.5L16 4.5C14 2.2 11.2 0.8 8 0.8C4.8 0.8 2 2.2 0 4.5L1 5.5C2.7 3.6 5.2 2.4 8 2.4Z" />
                <path d="M8 5.2C10 5.2 11.8 6 13 7.4L14 6.4C12.5 4.7 10.4 3.6 8 3.6C5.6 3.6 3.5 4.7 2 6.4L3 7.4C4.2 6 6 5.2 8 5.2Z" />
                <circle cx="8" cy="10" r="2" />
              </svg>
              <div className="flex items-center gap-0.5">
                <div className="w-6 h-3 border border-current rounded-sm relative">
                  <div className="absolute inset-0.5 right-0.5 bg-current rounded-sm" style={{ right: '25%' }} />
                </div>
                <div className="w-0.5 h-1.5 bg-current rounded-sm opacity-40" />
              </div>
            </div>
          </div>

          {/* Screen content */}
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
            {renderScreen()}
          </div>

          {/* Bottom navigation */}
          {showBottomNav && (
            <BottomNav activeTab={activeTab} onTabChange={handleTabChange} darkMode={darkMode} />
          )}
        </div>
      </div>
    </div>
  );
}
