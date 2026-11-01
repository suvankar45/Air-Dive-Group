import React, { useMemo } from 'react';
import { Job } from '../../types';
import { NavView } from '../layout/Navbar';
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Clock, 
  ArrowRight, 
  Building2, 
  ShieldCheck,
  Bookmark,
  Sparkles
} from 'lucide-react';

interface FeaturedJobsSectionProps {
  jobs: Job[];
  savedJobIds: string[];
  onToggleSaveJob: (jobId: string) => void;
  onSelectJobForDetail: (jobId: string) => void;
  onApplyJob: (job: Job) => void;
  onNavigate: (view: NavView) => void;
}

const TARGET_FEATURED_TITLES = [
  'Entry level Data analyst',
  'Business Analyst',
  'EHS Specialist',
  'IT Help Desk',
  'Clinical Coordinator',
  'Supply Chain Coordinator'
];

export const FeaturedJobsSection: React.FC<FeaturedJobsSectionProps> = ({
  jobs,
  savedJobIds,
  onToggleSaveJob,
  onSelectJobForDetail,
  onApplyJob,
  onNavigate
}) => {
  // Pin the six requested job opportunities and prioritize any admin-featured listings
  const featuredList = useMemo(() => {
    const published = jobs.filter(j => j.status === 'published');
    
    // Explicitly featured jobs from the admin portal
    const adminFeatured = published.filter(j => j.featured);
    
    // Match against target titles if slots remain
    const targetMatches: Job[] = [];
    for (const title of TARGET_FEATURED_TITLES) {
      const match = published.find(j => 
        j.title.toLowerCase().trim() === title.toLowerCase().trim() ||
        j.title.toLowerCase().includes(title.toLowerCase())
      );
      if (match && !adminFeatured.some(m => m.id === match.id) && !targetMatches.some(m => m.id === match.id)) {
        targetMatches.push(match);
      }
    }

    // Combine admin-featured first, then target matches
    const combined: Job[] = [...adminFeatured, ...targetMatches];
    if (combined.length < 6) {
      const remaining = published.filter(j => !combined.some(m => m.id === j.id));
      combined.push(...remaining);
    }

    return combined.slice(0, 6);
  }, [jobs]);

  const formatSalary = (min: number, max: number, period: 'hourly' | 'annual') => {
    if (period === 'hourly') {
      return `$${min} - $${max} / hr`;
    }
    return `$${(min / 1000).toFixed(0)}k - $${(max / 1000).toFixed(0)}k / yr`;
  };

  return (
    <section className="py-20 bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1769AA]">
              <Sparkles className="w-3.5 h-3.5 text-[#D6A84B]" />
              <span>Priority Placement Mandates</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#10243A] tracking-tight">
              Featured Career Opportunities
            </h2>
            <p className="text-sm text-slate-600 max-w-2xl">
              Explore key active search assignments representing top US employers across analytics, operations, healthcare, technology, and engineering.
            </p>
          </div>

          <button
            onClick={() => onNavigate('jobs')}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-[#10243A] bg-white hover:bg-slate-100 border border-slate-300 rounded-md transition-colors shadow-xs cursor-pointer self-start md:self-auto shrink-0"
          >
            <span>View All US Openings</span>
            <ArrowRight className="w-4 h-4 text-[#1769AA]" />
          </button>
        </div>

        {/* 6 Featured Job Cards in 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredList.map((job) => {
            const isSaved = savedJobIds.includes(job.id);
            return (
              <div
                key={job.id}
                className="bg-white rounded-xl border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md hover:border-[#1769AA]/40 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3.5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                        <span className="font-semibold text-[#1769AA]">{job.industry}</span>
                        <span>·</span>
                        <span>{job.workplaceType}</span>
                      </div>
                      <h3 
                        onClick={() => {
                          onSelectJobForDetail(job.id);
                          onNavigate('jobs');
                        }}
                        className="text-base sm:text-lg font-bold text-[#10243A] hover:text-[#1769AA] transition-colors cursor-pointer leading-snug"
                      >
                        {job.title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-slate-600">
                        <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate max-w-[200px]">
                          {job.clientConfidential ? 'Client Confidential (Air Dive Exclusive)' : job.company}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => onToggleSaveJob(job.id)}
                      className={`p-1.5 rounded-lg border transition-colors cursor-pointer shrink-0 ${
                        isSaved 
                          ? 'bg-[#1769AA]/10 border-[#1769AA] text-[#1769AA]' 
                          : 'border-slate-200 text-slate-400 hover:text-slate-600'
                      }`}
                      title={isSaved ? 'Remove from saved' : 'Save job'}
                      aria-label="Save job"
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {job.description}
                  </p>

                  {/* Skills tags preview */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {job.skills.slice(0, 3).map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200/80"
                      >
                        {skill}
                      </span>
                    ))}
                    {job.skills.length > 3 && (
                      <span className="text-[10px] text-slate-400 px-1 py-0.5">
                        +{job.skills.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs font-semibold text-slate-700 gap-2">
                    <div className="flex items-center gap-1 text-slate-800">
                      <MapPin className="w-3.5 h-3.5 text-[#1769AA]" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[#10243A] font-mono font-bold">
                      <DollarSign className="w-3.5 h-3.5 text-[#D6A84B]" />
                      <span>{formatSalary(job.salaryMin, job.salaryMax, job.salaryPeriod)}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5">
                    <span>{job.type}</span>
                    <span>{job.experienceLevel}</span>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => {
                      onSelectJobForDetail(job.id);
                      onNavigate('jobs');
                    }}
                    className="text-xs font-bold text-slate-600 hover:text-[#10243A] cursor-pointer"
                  >
                    View Details
                  </button>

                  <button
                    onClick={() => onApplyJob(job)}
                    className="px-4 py-2 text-xs font-bold text-white bg-[#10243A] hover:bg-[#1769AA] rounded-md transition-colors cursor-pointer shadow-xs"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
