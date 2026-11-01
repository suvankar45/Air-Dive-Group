import React from 'react';
import { NavView } from '../layout/Navbar';
import { 
  Building2, 
  UserCheck, 
  ArrowRight, 
  FileUp, 
  Search, 
  Briefcase, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';

interface EmployerCandidateSplitProps {
  onNavigate: (view: NavView) => void;
}

export const EmployerCandidateSplit: React.FC<EmployerCandidateSplitProps> = ({ onNavigate }) => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Employer Card */}
          <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-8 sm:p-10 flex flex-col justify-between hover:border-[#1769AA]/40 transition-all shadow-xs">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1769AA]/10 text-xs font-bold text-[#1769AA]">
                <Building2 className="w-3.5 h-3.5" />
                <span>For US Employers & Hiring Leaders</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#10243A] tracking-tight">
                Build Your Team. Accelerate Your Growth.
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed">
                Whether you need a specialized contractor for a critical cloud migration or a strategic executive to lead operations, Air Dive Group provides direct access to pre-vetted American talent.
              </p>

              <div className="space-y-2.5 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1769AA] shrink-0" />
                  <span>24-48 hour calibrated candidate submittals</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1769AA] shrink-0" />
                  <span>Comprehensive background, credit, and credential verifications</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1769AA] shrink-0" />
                  <span>Full replacement guarantee on direct placements</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1769AA] shrink-0" />
                  <span>Transparent markups and flexible master service agreements</span>
                </div>
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-slate-200 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate('employers')}
                className="px-6 py-3 text-xs font-bold text-white bg-[#10243A] hover:bg-[#1769AA] rounded-md transition-colors cursor-pointer shadow-xs"
              >
                Request Staffing Support
              </button>
              <button
                onClick={() => onNavigate('services')}
                className="px-4 py-3 text-xs font-bold text-[#10243A] hover:text-[#1769AA] cursor-pointer"
              >
                Review Service Models →
              </button>
            </div>
          </div>

          {/* Candidate Card */}
          <div className="bg-[#10243A] text-white border border-slate-800 rounded-2xl p-8 sm:p-10 flex flex-col justify-between hover:border-[#D6A84B]/40 transition-all shadow-md">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-[#D6A84B]">
                <UserCheck className="w-3.5 h-3.5" />
                <span>For Candidates & Job Seekers</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Your Next Career Opportunity Starts Here.
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed">
                We represent candidates with respect, confidentiality, and transparency. Connect with premier US employers looking for your exact skills and experience.
              </p>

              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D6A84B] shrink-0" />
                  <span>Access unadvertised direct-hire and executive searches</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D6A84B] shrink-0" />
                  <span>Honest salary benchmarking and negotiation guidance</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D6A84B] shrink-0" />
                  <span>Direct feedback throughout the interview process</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D6A84B] shrink-0" />
                  <span>100% free representation for all candidates</span>
                </div>
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-slate-800 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate('candidates')}
                className="px-6 py-3 text-xs font-bold text-[#10243A] bg-white hover:bg-slate-100 rounded-md transition-colors cursor-pointer shadow-xs"
              >
                Upload Resume / Profile
              </button>
              <button
                onClick={() => onNavigate('jobs')}
                className="px-4 py-3 text-xs font-bold text-white hover:text-[#D6A84B] cursor-pointer"
              >
                Browse Current Openings →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
