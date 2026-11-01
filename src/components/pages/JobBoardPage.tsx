import React, { useState, useMemo } from 'react';
import { Job, IndustryType, JobType, ExperienceLevel } from '../../types';
import { NavView } from '../layout/Navbar';
import { INDUSTRIES_SERVED } from '../../data/mockData';
import { 
  Search, 
  MapPin, 
  DollarSign, 
  Clock, 
  Briefcase, 
  Building2, 
  Bookmark, 
  CheckCircle2, 
  Filter, 
  RotateCcw, 
  ArrowUpRight,
  ShieldCheck,
  Share2
} from 'lucide-react';

interface JobBoardPageProps {
  jobs: Job[];
  savedJobIds: string[];
  selectedJobId?: string | null;
  onToggleSaveJob: (jobId: string) => void;
  onApplyJob: (job: Job) => void;
  onNavigate: (view: NavView) => void;
  initialKeyword?: string;
  initialLocation?: string;
}

export const JobBoardPage: React.FC<JobBoardPageProps> = ({
  jobs,
  savedJobIds,
  selectedJobId,
  onToggleSaveJob,
  onApplyJob,
  onNavigate,
  initialKeyword = '',
  initialLocation = ''
}) => {
  const [searchKeyword, setSearchKeyword] = useState(initialKeyword);
  const [searchLocation, setSearchLocation] = useState(initialLocation);
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [selectedJobType, setSelectedJobType] = useState<string>('all');
  const [selectedExperience, setSelectedExperience] = useState<string>('all');
  const [selectedWorkplace, setSelectedWorkplace] = useState<string>('all');
  const [onlySaved, setOnlySaved] = useState(false);
  const [sortBy, setSortBy] = useState<'recent' | 'salary-high'>('recent');

  // Active selected job for detail preview pane
  const publishedJobs = useMemo(() => jobs.filter(j => j.status === 'published'), [jobs]);

  const [activeJobId, setActiveJobId] = useState<string>(() => {
    if (selectedJobId && publishedJobs.some(j => j.id === selectedJobId)) {
      return selectedJobId;
    }
    return publishedJobs[0]?.id || '';
  });

  // Filtered jobs
  const filteredJobs = useMemo(() => {
    return publishedJobs.filter((job) => {
      // keyword
      if (searchKeyword.trim()) {
        const q = searchKeyword.toLowerCase();
        const matchesTitle = job.title.toLowerCase().includes(q);
        const matchesDesc = job.description.toLowerCase().includes(q);
        const matchesSkills = job.skills.some(s => s.toLowerCase().includes(q));
        const matchesInd = job.industry.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesSkills && !matchesInd) return false;
      }

      // location
      if (searchLocation.trim()) {
        const loc = searchLocation.toLowerCase();
        const matchesLoc = job.location.toLowerCase().includes(loc) || job.city.toLowerCase().includes(loc) || job.state.toLowerCase().includes(loc);
        if (!matchesLoc) return false;
      }

      // industry
      if (selectedIndustry !== 'all' && job.industry !== selectedIndustry) return false;

      // job type
      if (selectedJobType !== 'all' && job.type !== selectedJobType) return false;

      // experience
      if (selectedExperience !== 'all' && job.experienceLevel !== selectedExperience) return false;

      // workplace
      if (selectedWorkplace !== 'all' && job.workplaceType !== selectedWorkplace) return false;

      // only saved
      if (onlySaved && !savedJobIds.includes(job.id)) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'salary-high') {
        const aVal = a.salaryPeriod === 'hourly' ? a.salaryMax * 2000 : a.salaryMax;
        const bVal = b.salaryPeriod === 'hourly' ? b.salaryMax * 2000 : b.salaryMax;
        return bVal - aVal;
      }
      return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
    });
  }, [publishedJobs, searchKeyword, searchLocation, selectedIndustry, selectedJobType, selectedExperience, selectedWorkplace, onlySaved, savedJobIds, sortBy]);

  // Keep selected job valid
  const currentActiveJob = useMemo(() => {
    const found = filteredJobs.find(j => j.id === activeJobId);
    return found || filteredJobs[0] || null;
  }, [filteredJobs, activeJobId]);

  const clearFilters = () => {
    setSearchKeyword('');
    setSearchLocation('');
    setSelectedIndustry('all');
    setSelectedJobType('all');
    setSelectedExperience('all');
    setSelectedWorkplace('all');
    setOnlySaved(false);
    setSortBy('recent');
  };

  const formatSalary = (min: number, max: number, period: 'hourly' | 'annual') => {
    if (period === 'hourly') {
      return `$${min} - $${max} / hr`;
    }
    return `$${(min / 1000).toFixed(0)}k - $${(max / 1000).toFixed(0)}k / yr`;
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Top Search Hero Banner */}
      <section className="bg-[#10243A] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#D6A84B]">
                Air Dive Group National Job Board
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-1">
                Find Your Next Career Opportunity
              </h1>
              <p className="text-xs sm:text-sm text-slate-300">
                Browse verified direct-hire, contract, and executive search mandates across the United States.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setOnlySaved(!onlySaved)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md text-xs font-bold transition-colors cursor-pointer ${
                  onlySaved
                    ? 'bg-[#D6A84B] text-[#10243A]'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${onlySaved ? 'fill-current' : ''}`} />
                <span>Saved Jobs ({savedJobIds.length})</span>
              </button>

              <button
                onClick={() => onNavigate('candidates')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-xs font-bold bg-[#1769AA] hover:bg-[#145a92] text-white transition-colors cursor-pointer"
              >
                <span>Submit General Resume</span>
              </button>
            </div>
          </div>

          {/* Unified Search Input Bar (Inspired by Screenshot 5) */}
          <div className="bg-white rounded-xl shadow-lg p-2.5 sm:p-3 text-[#10243A] border border-slate-200">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
              <div className="md:col-span-5 relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  placeholder="Job title, skill, or keyword"
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-md border border-slate-200 focus:border-[#1769AA] focus:ring-1 focus:ring-[#1769AA] outline-none"
                />
              </div>

              <div className="md:col-span-4 relative">
                <MapPin className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  placeholder="City, state, or 'Remote'"
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-md border border-slate-200 focus:border-[#1769AA] focus:ring-1 focus:ring-[#1769AA] outline-none"
                />
              </div>

              <div className="md:col-span-3 flex items-center gap-2">
                <button
                  onClick={clearFilters}
                  className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer whitespace-nowrap"
                >
                  Clear
                </button>
                <button
                  type="button"
                  className="w-full py-2 px-4 bg-[#10243A] hover:bg-[#1769AA] text-white font-bold text-xs rounded-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Search className="w-3.5 h-3.5 text-[#D6A84B]" />
                  <span>Search Jobs</span>
                </button>
              </div>
            </div>

            {/* Filter Pills Strip */}
            <div className="flex flex-wrap items-center gap-2 pt-3 mt-2 border-t border-slate-100 text-xs">
              <span className="text-slate-400 font-bold uppercase text-[10px] mr-1 flex items-center gap-1">
                <Filter className="w-3 h-3" /> Filters:
              </span>

              {/* Industry Filter */}
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="px-2.5 py-1.5 rounded border border-slate-200 text-xs bg-slate-50 text-slate-700 outline-none"
              >
                <option value="all">All Industries</option>
                {INDUSTRIES_SERVED.map(i => (
                  <option key={i.id} value={i.name}>{i.name}</option>
                ))}
              </select>

              {/* Job Type Filter */}
              <select
                value={selectedJobType}
                onChange={(e) => setSelectedJobType(e.target.value)}
                className="px-2.5 py-1.5 rounded border border-slate-200 text-xs bg-slate-50 text-slate-700 outline-none"
              >
                <option value="all">All Job Types</option>
                <option value="Direct Hire">Direct Hire</option>
                <option value="Contract">Contract</option>
                <option value="Contract-to-Hire">Contract-to-Hire</option>
                <option value="Executive Search">Executive Search</option>
              </select>

              {/* Workplace Filter */}
              <select
                value={selectedWorkplace}
                onChange={(e) => setSelectedWorkplace(e.target.value)}
                className="px-2.5 py-1.5 rounded border border-slate-200 text-xs bg-slate-50 text-slate-700 outline-none"
              >
                <option value="all">All Workplaces</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Remote">100% Remote</option>
                <option value="On-site">On-site</option>
              </select>

              {/* Experience Level Filter */}
              <select
                value={selectedExperience}
                onChange={(e) => setSelectedExperience(e.target.value)}
                className="px-2.5 py-1.5 rounded border border-slate-200 text-xs bg-slate-50 text-slate-700 outline-none"
              >
                <option value="all">All Experience Levels</option>
                <option value="Entry Level">Entry Level</option>
                <option value="Mid Level">Mid Level</option>
                <option value="Senior Level">Senior Level</option>
                <option value="Lead / Principal">Lead / Principal</option>
                <option value="Director / Executive">Director / Executive</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Main Two-Column Split Layout (Inspired by Screenshot 5) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-4 text-xs text-slate-600">
          <div>
            <span className="font-bold text-[#10243A] text-sm">
              {filteredJobs.length}
            </span>{' '}
            positions available across the United States
          </div>

          <div className="flex items-center gap-2">
            <span>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-2 py-1 bg-white border border-slate-200 rounded text-xs font-semibold text-slate-700 outline-none"
            >
              <option value="recent">Most Recent</option>
              <option value="salary-high">Highest Compensation</option>
            </select>
          </div>
        </div>

        {filteredJobs.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
            <Briefcase className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-[#10243A]">No Job Postings Match Your Search</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Try adjusting your keyword, expanding location boundaries, or resetting your filter criteria.
            </p>
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-xs font-bold text-white bg-[#10243A] hover:bg-[#1769AA] rounded-md transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Job Cards List */}
            <div className="lg:col-span-5 space-y-3.5">
              {filteredJobs.map((job) => {
                const isSelected = currentActiveJob?.id === job.id;
                const isSaved = savedJobIds.includes(job.id);

                return (
                  <div
                    key={job.id}
                    onClick={() => setActiveJobId(job.id)}
                    className={`bg-white rounded-xl border p-4.5 transition-all cursor-pointer shadow-xs ${
                      isSelected
                        ? 'border-[#1769AA] ring-2 ring-[#1769AA]/20 bg-blue-50/20'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-[11px] text-slate-500">
                          <span className="font-semibold text-[#1769AA]">{job.industry}</span>
                          <span>·</span>
                          <span>{job.workplaceType}</span>
                        </div>

                        <h3 className="text-sm font-bold text-[#10243A] leading-snug">
                          {job.title}
                        </h3>

                        <div className="flex items-center gap-1.5 text-xs text-slate-600">
                          <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate max-w-[200px]">
                            {job.clientConfidential ? 'Client Confidential' : job.company}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleSaveJob(job.id);
                        }}
                        className={`p-1.5 rounded-md border transition-colors cursor-pointer ${
                          isSaved
                            ? 'bg-[#1769AA]/10 border-[#1769AA] text-[#1769AA]'
                            : 'border-slate-200 text-slate-400 hover:text-slate-600'
                        }`}
                        title={isSaved ? 'Remove from saved' : 'Save job'}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs font-semibold text-slate-700">
                      <div className="flex items-center gap-1 text-slate-800">
                        <MapPin className="w-3.5 h-3.5 text-[#1769AA]" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[#10243A] font-mono">
                        <DollarSign className="w-3.5 h-3.5 text-[#D6A84B]" />
                        <span>{formatSalary(job.salaryMin, job.salaryMax, job.salaryPeriod)}</span>
                      </div>
                    </div>

                    <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-400">
                      <span>{job.type}</span>
                      <span>Posted {job.postedDate}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Sticky Detailed Preview Pane (Matching Screenshot 5) */}
            {currentActiveJob && (
              <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-xs sticky top-28 overflow-hidden">
                {/* Detail Header */}
                <div className="p-6 sm:p-8 border-b border-slate-100 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-xs font-semibold text-[#1769AA]">
                        <span>{currentActiveJob.industry}</span>
                        <span>·</span>
                        <span>{currentActiveJob.experienceLevel}</span>
                        <span>·</span>
                        <span>{currentActiveJob.workplaceType}</span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-extrabold text-[#10243A]">
                        {currentActiveJob.title}
                      </h2>
                      <div className="flex items-center gap-2 text-xs text-slate-600">
                        <Building2 className="w-4 h-4 text-slate-400" />
                        <span className="font-semibold">
                          {currentActiveJob.clientConfidential ? 'Client Confidential (Air Dive Exclusive Mandate)' : currentActiveJob.company}
                        </span>
                        <span>·</span>
                        <span>{currentActiveJob.location}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => onToggleSaveJob(currentActiveJob.id)}
                      className={`p-2 rounded-lg border transition-colors cursor-pointer shrink-0 ${
                        savedJobIds.includes(currentActiveJob.id)
                          ? 'bg-[#1769AA]/10 border-[#1769AA] text-[#1769AA]'
                          : 'border-slate-200 text-slate-400 hover:text-slate-600'
                      }`}
                      title="Save position"
                    >
                      <Bookmark className={`w-4 h-4 ${savedJobIds.includes(currentActiveJob.id) ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  {/* Highlights Strip */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F8FAFC] p-3.5 rounded-xl border border-slate-200/80 text-xs">
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase font-bold block">Compensation</span>
                      <span className="font-bold text-[#10243A] font-mono">
                        {formatSalary(currentActiveJob.salaryMin, currentActiveJob.salaryMax, currentActiveJob.salaryPeriod)}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase font-bold block">Type</span>
                      <span className="font-bold text-slate-800">{currentActiveJob.type}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase font-bold block">Workplace</span>
                      <span className="font-bold text-slate-800">{currentActiveJob.workplaceType}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase font-bold block">Applicants</span>
                      <span className="font-bold text-[#1769AA]">{currentActiveJob.applicantCount} candidates</span>
                    </div>
                  </div>

                  {/* Primary Apply Action Button */}
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={() => onApplyJob(currentActiveJob)}
                      className="px-6 py-2.5 bg-[#10243A] hover:bg-[#1769AA] text-white font-bold text-xs rounded-md transition-all shadow-xs flex items-center gap-2 cursor-pointer"
                    >
                      <span>Apply Now for this Position</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#D6A84B]" />
                    </button>
                    <button
                      onClick={() => onToggleSaveJob(currentActiveJob.id)}
                      className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-md transition-colors cursor-pointer"
                    >
                      {savedJobIds.includes(currentActiveJob.id) ? 'Saved' : 'Save Position'}
                    </button>
                  </div>
                </div>

                {/* Detail Scrollable Body */}
                <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto space-y-6 text-[#10243A]">
                  {/* About the Job */}
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      About the Position
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {currentActiveJob.description}
                    </p>
                  </div>

                  {/* Skills / Tags */}
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Target Competencies & Skills
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {currentActiveJob.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Responsibilities */}
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Key Responsibilities & Scope
                    </h3>
                    <ul className="space-y-2 text-xs text-slate-700">
                      {currentActiveJob.responsibilities.map((resp, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#1769AA] shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Qualifications */}
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Candidate Qualifications
                    </h3>
                    <ul className="space-y-2 text-xs text-slate-700">
                      {currentActiveJob.qualifications.map((qual, qIdx) => (
                        <li key={qIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#1769AA] shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{qual}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Benefits */}
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Compensation & Benefits Package
                    </h3>
                    <ul className="space-y-2 text-xs text-slate-700">
                      {currentActiveJob.benefits.map((ben, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#D6A84B] shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{ben}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Demonstration Notice */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500">
                    <span className="font-bold text-slate-700 block mb-0.5">Air Dive Group Verification Notice</span>
                    This is a verified demonstration assignment. Real client-authorized vacancies update dynamically upon ATS enterprise sync.
                  </div>
                </div>

                {/* Sticky Detail Footer Apply Bar */}
                <div className="p-4 bg-[#F8FAFC] border-t border-slate-200 flex items-center justify-between">
                  <div className="text-xs text-slate-500 font-mono">
                    Job ID: {currentActiveJob.id}
                  </div>
                  <button
                    onClick={() => onApplyJob(currentActiveJob)}
                    className="px-5 py-2 bg-[#10243A] hover:bg-[#1769AA] text-white font-bold text-xs rounded-md transition-colors cursor-pointer"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
