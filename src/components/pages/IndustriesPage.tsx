import React, { useState } from 'react';
import { NavView } from '../layout/Navbar';
import { INDUSTRIES_SERVED, IndustryDetail } from '../../data/mockData';
import { 
  Laptop, 
  HeartPulse, 
  Landmark, 
  Cog, 
  Factory, 
  FileSpreadsheet, 
  Headset, 
  Truck, 
  Dna, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Building2
} from 'lucide-react';

interface IndustriesPageProps {
  onNavigate: (view: NavView) => void;
  selectedIndustryId?: string;
}

export const IndustriesPage: React.FC<IndustriesPageProps> = ({ 
  onNavigate, 
  selectedIndustryId = 'it' 
}) => {
  const [activeId, setActiveId] = useState<string>(selectedIndustryId || 'it');

  const getIndustryIcon = (id: string) => {
    switch (id) {
      case 'it': return Laptop;
      case 'healthcare': return HeartPulse;
      case 'finance-accounting': return Landmark;
      case 'engineering': return Cog;
      case 'manufacturing': return Factory;
      case 'administrative-clerical': return FileSpreadsheet;
      case 'customer-service': return Headset;
      case 'logistics-supply-chain': return Truck;
      case 'life-sciences': return Dna;
      case 'sales-marketing': return TrendingUp;
      default: return Laptop;
    }
  };

  const current = INDUSTRIES_SERVED.find(i => i.id === activeId) || INDUSTRIES_SERVED[0];
  const CurrentIcon = getIndustryIcon(current.id);

  return (
    <div className="bg-[#F8FAFC]">
      {/* Header */}
      <section className="bg-[#10243A] text-white py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D6A84B]">
            <span>10 Specialized Industry Verticals</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Industry Practices & Expertise
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Our talent acquisition advisors are structured into vertical practices, combining specialized domain intelligence, regulatory fluency, and nationwide candidate mapping.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Practice List Sidebar */}
          <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 p-4 shadow-xs sticky top-28 space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 px-3 py-1 block">
              Vertical Practices
            </span>
            {INDUSTRIES_SERVED.map((ind) => {
              const Icon = getIndustryIcon(ind.id);
              const isActive = ind.id === activeId;
              return (
                <button
                  key={ind.id}
                  onClick={() => setActiveId(ind.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-lg text-left text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#10243A] text-white shadow-xs'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#D6A84B]' : 'text-slate-400'}`} />
                  <span className="truncate">{ind.name}</span>
                </button>
              );
            })}
          </div>

          {/* Deep Practice Dossier */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#1769AA]/10 text-[#1769AA] flex items-center justify-center">
                    <CurrentIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-[#1769AA]">
                      PRACTICE VERTICAL
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#10243A]">
                      {current.name}
                    </h2>
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('employers')}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-[#10243A] hover:bg-[#1769AA] rounded-md transition-colors cursor-pointer"
                >
                  Hire {current.name} Talent
                </button>
              </div>

              <div className="bg-[#F8FAFC] border-l-2 border-[#1769AA] p-4 rounded-r-lg">
                <p className="text-sm font-semibold text-[#10243A] italic">
                  "{current.headline}"
                </p>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Practice Overview
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {current.description}
                </p>
              </div>

              {/* Roles Placed */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Core Specializations & Placed Roles
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {current.keyRoles.map((role, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-[#F8FAFC] p-3 rounded-lg border border-slate-200/80">
                      <CheckCircle2 className="w-4 h-4 text-[#1769AA] shrink-0" />
                      <span className="text-xs font-medium text-slate-800">{role}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Market Dynamics & Compliance Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-slate-100">
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#10243A]">
                    Market Dynamics & Trends
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed bg-[#F8FAFC] p-4 rounded-lg border border-slate-200">
                    {current.marketTrends}
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#10243A]">
                    Compliance, Screening & Licensure
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed bg-[#F8FAFC] p-4 rounded-lg border border-slate-200">
                    {current.complianceNotes}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Actions Card */}
            <div className="bg-[#10243A] rounded-2xl p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="text-lg font-bold">Have an urgent opening in {current.name}?</h4>
                <p className="text-xs text-slate-300">
                  Receive curated, pre-screened candidate profiles within 48 hours.
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => onNavigate('employers')}
                  className="px-5 py-2.5 text-xs font-bold text-[#10243A] bg-white hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
                >
                  Request Talent Now
                </button>
                <button
                  onClick={() => onNavigate('jobs')}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-[#1769AA] hover:bg-[#145a92] rounded-md transition-colors cursor-pointer"
                >
                  View Openings
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
