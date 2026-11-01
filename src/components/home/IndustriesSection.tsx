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
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

interface IndustriesSectionProps {
  onNavigate: (view: NavView) => void;
  onSelectIndustry?: (industryId: string) => void;
}

export const IndustriesSection: React.FC<IndustriesSectionProps> = ({ onNavigate, onSelectIndustry }) => {
  const [activeTab, setActiveTab] = useState<string>(INDUSTRIES_SERVED[0].id);

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

  const selectedIndustry = INDUSTRIES_SERVED.find(ind => ind.id === activeTab) || INDUSTRIES_SERVED[0];
  const SelectedIcon = getIndustryIcon(selectedIndustry.id);

  const handleLearnMore = () => {
    if (onSelectIndustry) {
      onSelectIndustry(selectedIndustry.id);
    }
    onNavigate('industries');
  };

  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1769AA]">
            <span>Domain-Specific Talent Practices</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#10243A] tracking-tight">
            Industries We Serve Nationwide
          </h2>
          <p className="text-base text-slate-600">
            Our specialized recruitment teams possess deep market intelligence and proprietary talent rosters across 10 vital American economic sectors.
          </p>
        </div>

        {/* Industry Pill Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {INDUSTRIES_SERVED.map((ind) => {
            const Icon = getIndustryIcon(ind.id);
            const isActive = ind.id === activeTab;
            return (
              <button
                key={ind.id}
                onClick={() => setActiveTab(ind.id)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#10243A] text-white shadow-sm ring-2 ring-[#1769AA]/40'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#D6A84B]' : 'text-slate-500'}`} />
                <span>{ind.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Industry Spotlight Showcase */}
        <div className="bg-[#F8FAFC] border border-slate-200/90 rounded-2xl p-6 sm:p-10 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#1769AA]/10 text-[#1769AA] flex items-center justify-center">
                  <SelectedIcon className="w-6 h-6 text-[#1769AA]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#10243A]">
                    {selectedIndustry.name}
                  </h3>
                  <span className="text-xs text-[#1769AA] font-semibold">
                    Air Dive Group Specialized Practice
                  </span>
                </div>
              </div>

              <p className="text-base font-medium text-slate-800">
                "{selectedIndustry.headline}"
              </p>

              <p className="text-sm text-slate-600 leading-relaxed">
                {selectedIndustry.description}
              </p>

              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Key Roles Placed:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  {selectedIndustry.keyRoles.slice(0, 6).map((role, rIdx) => (
                    <div key={rIdx} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1769AA] shrink-0" />
                      <span className="font-medium">{role}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onNavigate('employers')}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-[#10243A] hover:bg-[#1769AA] rounded-md transition-colors cursor-pointer"
                >
                  Hire {selectedIndustry.name} Talent
                </button>
                <button
                  onClick={handleLearnMore}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-[#1769AA] hover:text-[#10243A] cursor-pointer"
                >
                  <span>View Practice Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right Column: Market Intelligence & Compliance */}
            <div className="lg:col-span-5 bg-white rounded-xl p-6 border border-slate-200/90 shadow-xs space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D6A84B]">
                Market Intelligence & Rigor
              </span>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="font-bold text-slate-900 block mb-1">
                    Sector Dynamics & Hiring Velocity:
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    {selectedIndustry.marketTrends}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <span className="font-bold text-slate-900 block mb-1">
                    Compliance & Regulatory Vetting:
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    {selectedIndustry.complianceNotes}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <button
                  onClick={() => onNavigate('jobs')}
                  className="w-full py-2.5 px-3 bg-[#F4F7FA] hover:bg-slate-200 text-[#10243A] font-bold text-xs rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>View Open {selectedIndustry.name} Positions</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#1769AA]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
