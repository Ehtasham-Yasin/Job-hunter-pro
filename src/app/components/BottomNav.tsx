import type React from 'react';
import { Home, Briefcase, LayoutGrid, MessageSquare, User } from 'lucide-react';
import type { Tab } from '../types';

interface BottomNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  darkMode: boolean;
}

const TABS: { id: Tab; Icon: React.ComponentType<{ className?: string }>; label: string }[] = [
  { id: 'home', Icon: Home, label: 'Home' },
  { id: 'jobs', Icon: Briefcase, label: 'Jobs' },
  { id: 'applications', Icon: LayoutGrid, label: 'Track' },
  { id: 'interviews', Icon: MessageSquare, label: 'Prep' },
  { id: 'profile', Icon: User, label: 'Profile' },
];

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="bg-card border-t border-border flex items-stretch shrink-0" style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
      {TABS.map(({ id, Icon, label }) => {
        const active = activeTab === id;
        return (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={`flex-1 flex flex-col items-center justify-center py-2.5 gap-0.5 relative transition-colors ${
              active ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {active && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full bg-primary" />
            )}
            <Icon className="w-5 h-5" />
            <span style={{ fontSize: '11px', fontWeight: active ? 600 : 400 }}>{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
