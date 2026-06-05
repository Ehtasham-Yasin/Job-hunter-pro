import {
    Bell,
    Plus,
    BarChart3,
    Users,
    Calendar,
    Mail,
    TrendingUp,
    ChevronRight,
    Sparkles,
    Building2,
    CheckCircle2,
    Clock,
    Eye,
    MapPin,
    Briefcase,
    Home,
    User,
    ArrowLeftRight,
} from 'lucide-react';
import type { NavProps } from '../types';

const STATS = [
    { label: 'Active Jobs', value: '18', change: '+3', color: 'from-blue-500 to-blue-600', icon: Building2 },
    { label: 'Total Applicants', value: '342', change: '+28', color: 'from-violet-500 to-violet-600', icon: Users },
    { label: 'Interviews', value: '24', change: '+6', color: 'from-emerald-500 to-emerald-600', icon: Calendar },
    { label: 'Offers Sent', value: '12', change: '+4', color: 'from-amber-500 to-amber-600', icon: Mail },
];

const QUICK_ACTIONS = [
    { label: 'Post Job', icon: Plus, color: 'bg-blue-50 dark:bg-blue-950/50', iconColor: 'text-blue-600', action: 'postJob' as const },
    { label: 'Manage Jobs', icon: Building2, color: 'bg-violet-50 dark:bg-violet-950/50', iconColor: 'text-violet-600', action: 'manageJobs' as const },
    { label: 'Applicants', icon: Users, color: 'bg-emerald-50 dark:bg-emerald-950/50', iconColor: 'text-emerald-600', action: 'applicantTracking' as const },
    { label: 'Analytics', icon: BarChart3, color: 'bg-amber-50 dark:bg-amber-950/50', iconColor: 'text-amber-600', action: null },
];

const RECENT_APPLICANTS = [
    { name: 'Alex Morgan', role: 'Senior Product Designer', status: 'new', score: 95, time: '5m ago', avatar: 'AM', color: '#3B82F6', location: 'San Francisco, CA' },
    { name: 'Jordan Lee', role: 'UX Lead', status: 'reviewed', score: 92, time: '12m ago', avatar: 'JL', color: '#8B5CF6', location: 'Remote' },
    { name: 'Taylor Swift', role: 'Design Systems Lead', status: 'interview', score: 88, time: '1h ago', avatar: 'TS', color: '#10B981', location: 'New York, NY' },
    { name: 'Casey Rivera', role: 'Product Designer', status: 'new', score: 91, time: '2h ago', avatar: 'CR', color: '#F59E0B', location: 'Austin, TX' },
];

const JOB_PERFORMANCE = [
    { title: 'Senior Product Designer', applicants: 48, views: 892, shortlisted: 12, status: 'hot' },
    { title: 'UX Lead', applicants: 36, views: 654, shortlisted: 8, status: 'active' },
    { title: 'Design Systems Lead', applicants: 28, views: 478, shortlisted: 6, status: 'active' },
];

const getStatusColor = (status: string) => {
    switch (status) {
        case 'new':
            return 'bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400';
        case 'reviewed':
            return 'bg-violet-100 dark:bg-violet-950/50 text-violet-700 dark:text-violet-400';
        case 'interview':
            return 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400';
        default:
            return 'bg-gray-100 dark:bg-gray-950/50 text-gray-700 dark:text-gray-400';
    }
};

export function RecruiterDashboard({ navigate }: NavProps) {
    return (
        <div className="flex flex-col flex-1 bg-background min-h-0">
            <div className="flex-1 overflow-y-auto">
                <div className="px-5 pt-14 pb-2 shrink-0">
                    <div className="flex items-center justify-between mb-3">
                        <div>
                            <p className="text-muted-foreground" style={{ fontSize: '13px' }}>
                                Welcome back 👋
                            </p>
                            <h1 className="font-bold text-foreground" style={{ fontSize: '22px' }}>
                                TechCorp Recruiting
                            </h1>
                        </div>

                        <div className="flex items-center gap-2">
                            <button className="relative w-10 h-10 bg-card border border-border rounded-full flex items-center justify-center">
                                <Bell className="w-4 h-4 text-foreground" />
                                <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                            </button>

                            <div
                                className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white font-semibold"
                                style={{ fontSize: '14px' }}
                            >
                                TC
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => navigate('home')}
                        className="flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-xl hover:bg-muted transition-colors"
                    >
                        <ArrowLeftRight className="w-3.5 h-3.5 text-muted-foreground" />
                        <span className="text-muted-foreground" style={{ fontSize: '12px', fontWeight: 600 }}>
                            Switch to Job Seeker
                        </span>
                    </button>
                </div>

                <div className="mx-5 mt-4">
                    <div className="bg-gradient-to-r from-violet-600 to-blue-600 rounded-2xl p-4 flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                            <Sparkles className="w-6 h-6 text-white" fill="rgba(255,255,255,0.5)" />
                        </div>

                        <div className="flex-1">
                            <p className="text-white font-semibold" style={{ fontSize: '14px' }}>
                                28 New Top Candidates
                            </p>
                            <p className="text-violet-100" style={{ fontSize: '12px' }}>
                                AI matched for your open roles
                            </p>
                        </div>

                        <button className="bg-white/20 hover:bg-white/30 transition rounded-xl p-2">
                            <ChevronRight className="w-4 h-4 text-white" />
                        </button>
                    </div>
                </div>

                <div className="px-5 mt-5 grid grid-cols-2 gap-3">
                    {STATS.map(({ label, value, change, color, icon: Icon }) => (
                        <div key={label} className="bg-card border border-border rounded-2xl p-4">
                            <div className="flex items-start justify-between mb-3">
                                <div className={`w-10 h-10 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center`}>
                                    <Icon className="w-5 h-5 text-white" />
                                </div>

                                <span className="text-emerald-500 flex items-center gap-0.5" style={{ fontSize: '12px', fontWeight: 600 }}>
                                    <TrendingUp className="w-3 h-3" />
                                    {change}
                                </span>
                            </div>

                            <p className="font-bold text-foreground" style={{ fontSize: '26px' }}>
                                {value}
                            </p>
                            <p className="text-muted-foreground" style={{ fontSize: '12px' }}>
                                {label}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="px-5 mt-5">
                    <h2 className="font-semibold text-foreground mb-3" style={{ fontSize: '15px' }}>
                        Quick Actions
                    </h2>

                    <div className="grid grid-cols-4 gap-3">
                        {QUICK_ACTIONS.map(({ label, icon: Icon, color, iconColor, action }) => (
                            <button
                                key={label}
                                onClick={() => action && navigate(action)}
                                className={`${color} rounded-2xl p-3 flex flex-col items-center gap-2 hover:opacity-90 transition-opacity`}
                            >
                                <Icon className={`w-5 h-5 ${iconColor}`} />
                                <span className="text-foreground text-center leading-tight" style={{ fontSize: '11px', fontWeight: 500 }}>
                                    {label}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="px-5 mt-5">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="font-semibold text-foreground" style={{ fontSize: '15px' }}>
                            Recent Applicants
                        </h2>
                        <button className="text-primary" style={{ fontSize: '13px' }}>
                            View all
                        </button>
                    </div>

                    <div className="bg-card border border-border rounded-2xl overflow-hidden divide-y divide-border">
                        {RECENT_APPLICANTS.map(({ name, role, status, score, time, avatar, color, location }) => (
                            <div key={name} className="p-4">
                                <div className="flex items-start gap-3">
                                    <div
                                        className="w-11 h-11 rounded-xl flex items-center justify-center text-white shrink-0"
                                        style={{ background: color, fontSize: '13px', fontWeight: 700 }}
                                    >
                                        {avatar}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <p className="font-semibold text-foreground" style={{ fontSize: '14px' }}>
                                                {name}
                                            </p>
                                            <span
                                                className={`px-2 py-0.5 rounded-full capitalize ${getStatusColor(status)}`}
                                                style={{ fontSize: '10px', fontWeight: 600 }}
                                            >
                                                {status}
                                            </span>
                                        </div>

                                        <p className="text-muted-foreground" style={{ fontSize: '12px' }}>
                                            {role}
                                        </p>

                                        <p className="text-muted-foreground mt-1 flex items-center gap-1" style={{ fontSize: '11px' }}>
                                            <MapPin className="w-3 h-3" />
                                            <span>{location}</span>
                                            <span>•</span>
                                            <span>{time}</span>
                                        </p>
                                    </div>

                                    <div className="flex flex-col items-end gap-1">
                                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center">
                                            <span className="text-white font-bold" style={{ fontSize: '11px' }}>
                                                {score}
                                            </span>
                                        </div>
                                        <span className="text-muted-foreground" style={{ fontSize: '10px' }}>
                                            AI Score
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="px-5 mt-5">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="font-semibold text-foreground" style={{ fontSize: '15px' }}>
                            Job Performance
                        </h2>
                        <button onClick={() => navigate('manageJobs')} className="text-primary" style={{ fontSize: '13px' }}>
                            See all
                        </button>
                    </div>

                    <div className="space-y-3">
                        {JOB_PERFORMANCE.map(({ title, applicants, views, shortlisted, status }) => (
                            <div key={title} className="bg-card border border-border rounded-2xl p-4">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-semibold text-foreground" style={{ fontSize: '14px' }}>
                                                {title}
                                            </h3>

                                            {status === 'hot' && (
                                                <span
                                                    className="px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-400"
                                                    style={{ fontSize: '10px', fontWeight: 600 }}
                                                >
                                                    🔥 HOT
                                                </span>
                                            )}
                                        </div>

                                        <p className="text-muted-foreground" style={{ fontSize: '12px' }}>
                                            Posted 5 days ago
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-3">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-blue-50 dark:bg-blue-950/50 rounded-lg flex items-center justify-center">
                                            <Users className="w-4 h-4 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-foreground" style={{ fontSize: '15px' }}>
                                                {applicants}
                                            </p>
                                            <p className="text-muted-foreground" style={{ fontSize: '10px' }}>
                                                Applied
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-violet-50 dark:bg-violet-950/50 rounded-lg flex items-center justify-center">
                                            <Eye className="w-4 h-4 text-violet-600" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-foreground" style={{ fontSize: '15px' }}>
                                                {views}
                                            </p>
                                            <p className="text-muted-foreground" style={{ fontSize: '10px' }}>
                                                Views
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-emerald-50 dark:bg-emerald-950/50 rounded-lg flex items-center justify-center">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-foreground" style={{ fontSize: '15px' }}>
                                                {shortlisted}
                                            </p>
                                            <p className="text-muted-foreground" style={{ fontSize: '10px' }}>
                                                Shortlist
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="px-5 mt-5 mb-6">
                    <h2 className="font-semibold text-foreground mb-3" style={{ fontSize: '15px' }}>
                        AI Hiring Insights
                    </h2>

                    <div className="bg-gradient-to-br from-blue-50 to-violet-50 dark:from-blue-950/30 dark:to-violet-950/30 border border-blue-200/50 dark:border-blue-800/50 rounded-2xl p-4">
                        <div className="flex items-start gap-3 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-violet-500 rounded-xl flex items-center justify-center shrink-0">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>

                            <div className="flex-1">
                                <h3 className="font-semibold text-foreground mb-1" style={{ fontSize: '14px' }}>
                                    Weekly Hiring Report
                                </h3>
                                <p className="text-muted-foreground" style={{ fontSize: '12px' }}>
                                    AI-powered insights from your recruiting activity
                                </p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                <p className="text-foreground" style={{ fontSize: '13px' }}>
                                    <span className="font-semibold">Response rate up 32%</span> — Your job descriptions are performing well
                                </p>
                            </div>

                            <div className="flex items-start gap-2">
                                <TrendingUp className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                                <p className="text-foreground" style={{ fontSize: '13px' }}>
                                    <span className="font-semibold">Peak application time:</span> Tuesdays 10-11 AM PST
                                </p>
                            </div>

                            <div className="flex items-start gap-2">
                                <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                                <p className="text-foreground" style={{ fontSize: '13px' }}>
                                    <span className="font-semibold">Avg. response time:</span> 18 hours — 40% faster than industry avg.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}