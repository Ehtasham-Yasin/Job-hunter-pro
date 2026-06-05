import { useState } from 'react';
import { Search, X, ChevronLeft, Users, Eye, Calendar, Plus, MoreVertical, Edit2, Trash2, ExternalLink } from 'lucide-react';
import type { NavProps } from '../types';

type JobStatus = 'active' | 'draft' | 'closed' | 'paused';

interface ManagedJob {
    id: string;
    title: string;
    company: string;
    applicants: number;
    views: number;
    postedDate: string;
    status: JobStatus;
    location: string;
    type: string;
}

const MOCK_JOBS: ManagedJob[] = [
    { id: '1', title: 'Senior Product Designer', company: 'TechCorp', applicants: 48, views: 892, postedDate: '5 days ago', status: 'active', location: 'Remote', type: 'Full-time' },
    { id: '2', title: 'UX Lead', company: 'TechCorp', applicants: 36, views: 654, postedDate: '1 week ago', status: 'active', location: 'San Francisco', type: 'Hybrid' },
    { id: '3', title: 'Design Systems Lead', company: 'TechCorp', applicants: 28, views: 478, postedDate: '2 weeks ago', status: 'active', location: 'Remote', type: 'Full-time' },
    { id: '4', title: 'Product Designer', company: 'TechCorp', applicants: 15, views: 234, postedDate: '3 days ago', status: 'paused', location: 'New York', type: 'Full-time' },
    { id: '5', title: 'UI/UX Designer', company: 'TechCorp', applicants: 0, views: 12, postedDate: 'Draft', status: 'draft', location: 'Remote', type: 'Contract' },
    { id: '6', title: 'Senior UX Researcher', company: 'TechCorp', applicants: 42, views: 567, postedDate: '1 month ago', status: 'closed', location: 'Remote', type: 'Full-time' },
];

const FILTERS: { id: JobStatus | 'all'; label: string }[] = [
    { id: 'all', label: 'All Jobs' },
    { id: 'active', label: 'Active' },
    { id: 'draft', label: 'Draft' },
    { id: 'paused', label: 'Paused' },
    { id: 'closed', label: 'Closed' },
];

const getStatusConfig = (status: JobStatus) => {
    switch (status) {
        case 'active':
            return { bg: 'bg-emerald-100 dark:bg-emerald-950/50', text: 'text-emerald-700 dark:text-emerald-400', label: 'Active' };
        case 'draft':
            return { bg: 'bg-gray-100 dark:bg-gray-950/50', text: 'text-gray-700 dark:text-gray-400', label: 'Draft' };
        case 'closed':
            return { bg: 'bg-red-100 dark:bg-red-950/50', text: 'text-red-700 dark:text-red-400', label: 'Closed' };
        case 'paused':
            return { bg: 'bg-amber-100 dark:bg-amber-950/50', text: 'text-amber-700 dark:text-amber-400', label: 'Paused' };
    }
};

export function ManageJobs({ navigate, goBack }: NavProps) {
    const [query, setQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState<JobStatus | 'all'>('all');
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);

    const filteredJobs = MOCK_JOBS.filter(job => {
        const matchesSearch = query === '' ||
            job.title.toLowerCase().includes(query.toLowerCase()) ||
            job.location.toLowerCase().includes(query.toLowerCase());
        const matchesFilter = activeFilter === 'all' || job.status === activeFilter;
        return matchesSearch && matchesFilter;
    });

    const getStatusCounts = () => {
        return {
            all: MOCK_JOBS.length,
            active: MOCK_JOBS.filter(j => j.status === 'active').length,
            draft: MOCK_JOBS.filter(j => j.status === 'draft').length,
            paused: MOCK_JOBS.filter(j => j.status === 'paused').length,
            closed: MOCK_JOBS.filter(j => j.status === 'closed').length,
        };
    };

    const counts = getStatusCounts();

    return (
        <div className="flex flex-col flex-1 bg-background min-h-0">
            {/* Header */}
            <div className="px-5 pt-14 pb-3 bg-background shrink-0">
                <div className="flex items-center gap-3 mb-4">
                    <button onClick={goBack} className="text-muted-foreground w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted">
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div className="flex-1">
                        <h1 className="font-bold text-foreground" style={{ fontSize: '22px' }}>Manage Jobs</h1>
                        <p className="text-muted-foreground" style={{ fontSize: '13px' }}>{filteredJobs.length} {activeFilter === 'all' ? 'total' : activeFilter} jobs</p>
                    </div>
                </div>

                {/* Search bar */}
                <div className="flex items-center gap-2 bg-card border border-border rounded-xl px-3 py-2.5">
                    <Search className="w-4 h-4 text-muted-foreground shrink-0" />
                    <input
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder="Search jobs..."
                        className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
                        style={{ fontSize: '14px' }}
                    />
                    {query && (
                        <button onClick={() => setQuery('')}>
                            <X className="w-3.5 h-3.5 text-muted-foreground" />
                        </button>
                    )}
                </div>

                {/* Filter tabs */}
                <div className="flex gap-2 mt-3 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
                    {FILTERS.map(({ id, label }) => {
                        const isActive = activeFilter === id;
                        const count = counts[id];
                        return (
                            <button
                                key={id}
                                onClick={() => setActiveFilter(id)}
                                className={`px-3 py-1.5 rounded-full border whitespace-nowrap transition-colors shrink-0 flex items-center gap-1.5 ${isActive
                                    ? 'bg-primary text-white border-primary'
                                    : 'bg-card text-muted-foreground border-border hover:border-primary hover:text-primary'
                                    }`}
                                style={{ fontSize: '13px', fontWeight: isActive ? 600 : 400 }}
                            >
                                {label}
                                <span className={`px-1.5 rounded-full ${isActive ? 'bg-white/20' : 'bg-muted'}`} style={{ fontSize: '11px' }}>
                                    {count}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Job list */}
            <div className="flex-1 overflow-y-auto px-5 pb-24 flex flex-col gap-3">
                {filteredJobs.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mb-4">
                            <Search className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <p className="font-semibold text-foreground mb-1" style={{ fontSize: '15px' }}>No jobs found</p>
                        <p className="text-muted-foreground" style={{ fontSize: '13px' }}>
                            {query ? 'Try adjusting your search' : 'Get started by posting your first job'}
                        </p>
                    </div>
                ) : (
                    filteredJobs.map(job => {
                        const statusConfig = getStatusConfig(job.status);
                        const isMenuOpen = openMenuId === job.id;

                        return (
                            <div
                                key={job.id}
                                className="bg-card border border-border rounded-2xl p-4 hover:shadow-md transition-all"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-semibold text-foreground" style={{ fontSize: '15px' }}>{job.title}</h3>
                                            <span className={`px-2 py-0.5 rounded-full ${statusConfig.bg} ${statusConfig.text}`} style={{ fontSize: '10px', fontWeight: 600 }}>
                                                {statusConfig.label}
                                            </span>
                                        </div>
                                        <p className="text-muted-foreground" style={{ fontSize: '13px' }}>{job.company} · {job.location}</p>
                                    </div>
                                    <div className="relative">
                                        <button
                                            onClick={() => setOpenMenuId(isMenuOpen ? null : job.id)}
                                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors"
                                        >
                                            <MoreVertical className="w-4 h-4 text-muted-foreground" />
                                        </button>

                                        {/* Dropdown menu */}
                                        {isMenuOpen && (
                                            <>
                                                <div
                                                    className="fixed inset-0 z-10"
                                                    onClick={() => setOpenMenuId(null)}
                                                />
                                                <div className="absolute right-0 top-9 z-20 bg-card border border-border rounded-xl shadow-lg overflow-hidden w-48">
                                                    <button
                                                        onClick={() => {
                                                            setOpenMenuId(null);
                                                            // Handle edit
                                                        }}
                                                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors text-left"
                                                    >
                                                        <Edit2 className="w-4 h-4 text-muted-foreground" />
                                                        <span className="text-foreground" style={{ fontSize: '14px' }}>Edit Job</span>
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setOpenMenuId(null);
                                                            // Handle view applicants
                                                        }}
                                                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors text-left border-t border-border"
                                                    >
                                                        <ExternalLink className="w-4 h-4 text-muted-foreground" />
                                                        <span className="text-foreground" style={{ fontSize: '14px' }}>View Applicants</span>
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setOpenMenuId(null);
                                                            // Handle delete
                                                        }}
                                                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors text-left border-t border-border"
                                                    >
                                                        <Trash2 className="w-4 h-4 text-red-500" />
                                                        <span className="text-red-500" style={{ fontSize: '14px' }}>Delete Job</span>
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Metrics */}
                                <div className="grid grid-cols-3 gap-3 pt-3 border-t border-border">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-blue-50 dark:bg-blue-950/50 rounded-lg flex items-center justify-center">
                                            <Users className="w-4 h-4 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-foreground" style={{ fontSize: '15px' }}>{job.applicants}</p>
                                            <p className="text-muted-foreground" style={{ fontSize: '10px' }}>Applicants</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-violet-50 dark:bg-violet-950/50 rounded-lg flex items-center justify-center">
                                            <Eye className="w-4 h-4 text-violet-600" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-foreground" style={{ fontSize: '15px' }}>{job.views}</p>
                                            <p className="text-muted-foreground" style={{ fontSize: '10px' }}>Views</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-emerald-50 dark:bg-emerald-950/50 rounded-lg flex items-center justify-center">
                                            <Calendar className="w-4 h-4 text-emerald-600" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-foreground truncate" style={{ fontSize: '11px' }}>{job.postedDate}</p>
                                            <p className="text-muted-foreground" style={{ fontSize: '10px' }}>Posted</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Quick actions */}
                                <div className="flex gap-2 mt-3">
                                    <button className="flex-1 py-2 rounded-lg border border-border bg-card hover:bg-muted transition-colors flex items-center justify-center gap-2">
                                        <Edit2 className="w-3.5 h-3.5 text-muted-foreground" />
                                        <span className="text-foreground" style={{ fontSize: '13px', fontWeight: 500 }}>Edit</span>
                                    </button>
                                    <button className="flex-1 py-2 rounded-lg bg-primary hover:bg-primary/90 transition-colors text-white flex items-center justify-center gap-2">
                                        <Users className="w-3.5 h-3.5" />
                                        <span style={{ fontSize: '13px', fontWeight: 600 }}>View Applicants</span>
                                    </button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Floating Action Button */}
            <button
                className="fixed bottom-24 right-5 w-14 h-14 bg-gradient-to-br from-blue-600 to-violet-600 rounded-full shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
                style={{ zIndex: 50 }}
            >
                <Plus className="w-6 h-6 text-white" />
            </button>
        </div>
    );
}
