import React, { useState } from 'react';
import { NavView } from '../layout/Navbar';
import { COMPANY_FACTS } from '../../data/mockData';
import { 
  Building2, 
  Search, 
  ArrowRight, 
  ShieldCheck, 
  MapPin, 
  Briefcase, 
  CheckCircle2 
} from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (view: NavView) => void;
  onSearchJobs: (query: string, location: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate, onSearchJobs }) => {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchJobs(keyword, location);
    onNavigate('jobs');
  };

  return (
    <section className="relative bg-[#10243A] text-white overflow-hidden">
      {/* Subtle Corporate Architectural Background with Gradient Scrim */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1440 800" fill="none" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="hero-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1769AA" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#10243A" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#D6A84B" stopOpacity="0.3" />
            </linearGradient>
            <radialGradient id="mesh-glow" cx="60%" cy="40%" r="50%">
              <stop offset="0%" stopColor="#1769AA" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#10243A" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="1440" height="800" fill="url(#hero-grad-1)" />
          <circle cx="950" cy="300" r="450" fill="url(#mesh-glow)" />
          {/* Subtle architectural structural lines */}
          <path d="M0 600L1440 200" stroke="#FFFFFF" strokeWidth="0.75" strokeOpacity="0.15" />
          <path d="M0 720L1440 320" stroke="#FFFFFF" strokeWidth="0.75" strokeOpacity="0.1" />
          <path d="M200 0L800 800" stroke="#FFFFFF" strokeWidth="0.75" strokeOpacity="0.12" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Marquee Headline & Core Actions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-xs font-semibold text-slate-200">
              <span className="w-2 h-2 rounded-full bg-[#D6A84B]" />
              <span className="tracking-wide uppercase text-[11px]">Nationwide US Staffing & Workforce Solutions</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15] text-balance">
              Connecting Exceptional Talent With Exceptional Opportunities.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
              Air Dive Group delivers strategic staffing and workforce solutions that help businesses grow and professionals build meaningful careers across the United States.
            </p>

            {/* Primary Decision Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('employers')}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-[#10243A] bg-white hover:bg-slate-100 rounded-md transition-all shadow-md cursor-pointer whitespace-nowrap"
              >
                <Building2 className="w-4 h-4 text-[#1769AA]" />
                <span>Find Talent</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => onNavigate('jobs')}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-[#1769AA] hover:bg-[#145a92] rounded-md transition-all shadow-sm cursor-pointer whitespace-nowrap"
              >
                <Briefcase className="w-4 h-4 text-[#D6A84B]" />
                <span>Explore Career Opportunities</span>
              </button>
            </div>

            {/* Trust points */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#D6A84B]" />
                <span>Direct Hire & Contract</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#D6A84B]" />
                <span>Full US Work Auth & Compliance</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#D6A84B]" />
                <span>Dedicated Practice Leads</span>
              </div>
            </div>
          </div>

          {/* Right Column: Quick Job & Talent Search Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 text-[#10243A] border border-slate-200">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#1769AA]">
                    Live Career Portal
                  </span>
                  <h3 className="text-lg font-bold text-[#10243A]">
                    Search Vetted Opportunities
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-lg bg-[#F4F7FA] flex items-center justify-center text-[#1769AA]">
                  <Search className="w-5 h-5" />
                </div>
              </div>

              <form onSubmit={handleQuickSearch} className="space-y-4">
                <div>
                  <label htmlFor="quick-keyword" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Job Title, Skill, or Industry
                  </label>
                  <div className="relative">
                    <input
                      id="quick-keyword"
                      type="text"
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      placeholder="e.g. Cloud Architect, Nurse Manager, FP&A"
                      className="w-full pl-3.5 pr-4 py-2.5 text-sm rounded-md border border-slate-300 focus:border-[#1769AA] focus:ring-2 focus:ring-[#1769AA]/20 outline-none transition-all placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="quick-location" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    US City, State, or Remote
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      id="quick-location"
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Atlanta GA, Dallas TX, Remote"
                      className="w-full pl-9 pr-4 py-2.5 text-sm rounded-md border border-slate-300 focus:border-[#1769AA] focus:ring-2 focus:ring-[#1769AA]/20 outline-none transition-all placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-[#10243A] hover:bg-[#1769AA] text-white font-bold text-sm rounded-md transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Search className="w-4 h-4 text-[#D6A84B]" />
                    <span>Search Job Openings</span>
                  </button>
                </div>
              </form>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                <span>Looking for immediate hire?</span>
                <button
                  type="button"
                  onClick={() => onNavigate('candidates')}
                  className="font-bold text-[#1769AA] hover:underline cursor-pointer"
                >
                  Upload Your Resume →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Verified Demonstration Performance Metrics Strip */}
      <div className="bg-[#0c1b2c] border-t border-slate-800 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {COMPANY_FACTS.verifiedStats.map((stat, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono tabular-nums">
                  {stat.value}
                </div>
                <div className="text-xs font-semibold text-[#D6A84B] uppercase tracking-wider">
                  {stat.label}
                </div>
                <div className="text-[11px] text-slate-300">
                  {stat.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
