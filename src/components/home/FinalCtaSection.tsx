import React from 'react';
import { NavView } from '../layout/Navbar';
import { Building2, FileUp, ArrowRight, ShieldCheck } from 'lucide-react';

interface FinalCtaSectionProps {
  onNavigate: (view: NavView) => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({ onNavigate }) => {
  return (
    <section className="py-24 bg-[#10243A] text-white relative overflow-hidden">
      {/* Decorative accent geometry */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#1769AA]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D6A84B]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#D6A84B]">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>American Staffing & Recruitment Partner</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Let’s Build a Stronger Workforce Together.
        </h2>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
          Whether you need immediate project capacity, permanent institutional leaders, or are seeking your next career milestone, Air Dive Group is ready to deliver.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={() => onNavigate('employers')}
            className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-bold text-[#10243A] bg-white hover:bg-slate-100 rounded-md transition-all shadow-md cursor-pointer whitespace-nowrap"
          >
            <Building2 className="w-4 h-4 text-[#1769AA]" />
            <span>Partner With Us (Hire Talent)</span>
          </button>

          <button
            onClick={() => onNavigate('candidates')}
            className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-bold text-white bg-[#1769AA] hover:bg-[#145a92] rounded-md transition-all shadow-sm cursor-pointer whitespace-nowrap"
          >
            <FileUp className="w-4 h-4 text-[#D6A84B]" />
            <span>Submit Your Resume</span>
          </button>
        </div>

        <div className="pt-8 text-xs text-slate-300 flex items-center justify-center gap-6">
          <span>Headquartered in Atlanta, GA</span>
          <span>·</span>
          <span>Operating Across All 50 States</span>
          <span>·</span>
          <span>ASA Professional Ethics Aligned</span>
        </div>
      </div>
    </section>
  );
};
