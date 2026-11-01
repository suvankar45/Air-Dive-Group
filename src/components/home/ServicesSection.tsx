import React from 'react';
import { NavView } from '../layout/Navbar';
import { STAFFING_SERVICES, ServiceDetail } from '../../data/mockData';
import { 
  Clock, 
  FileText, 
  Repeat, 
  UserCheck, 
  Crown, 
  Users, 
  Workflow, 
  Layers, 
  ArrowRight 
} from 'lucide-react';

interface ServicesSectionProps {
  onNavigate: (view: NavView) => void;
  onSelectService?: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onNavigate, onSelectService }) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'temporary-staffing': return Clock;
      case 'contract-staffing': return FileText;
      case 'contract-to-hire': return Repeat;
      case 'direct-hire-recruitment': return UserCheck;
      case 'executive-search': return Crown;
      case 'permanent-placement': return Users;
      case 'recruitment-process-outsourcing': return Workflow;
      case 'workforce-solutions': return Layers;
      default: return UserCheck;
    }
  };

  const handleCardClick = (serviceId: string) => {
    if (onSelectService) {
      onSelectService(serviceId);
    }
    onNavigate('services');
  };

  return (
    <section className="py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1769AA]">
              <span>Specialized Workforce Capabilities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#10243A] tracking-tight">
              Comprehensive Staffing & Talent Solutions
            </h2>
            <p className="text-base text-slate-600">
              From agile contingent labor to confidential C-Suite executive search, we deliver tailored recruitment models aligned with your organizational lifecycle.
            </p>
          </div>

          <button
            onClick={() => onNavigate('services')}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-[#10243A] hover:text-[#1769AA] border border-slate-300 rounded-md bg-white hover:bg-slate-50 transition-colors shadow-xs cursor-pointer self-start md:self-auto shrink-0"
          >
            <span>Explore All 8 Service Models</span>
            <ArrowRight className="w-4 h-4 text-[#1769AA]" />
          </button>
        </div>

        {/* 8 Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STAFFING_SERVICES.map((service: ServiceDetail) => {
            const Icon = getIcon(service.id);
            return (
              <div
                key={service.id}
                onClick={() => handleCardClick(service.id)}
                className="group bg-white rounded-xl p-6 border border-slate-200/90 shadow-xs hover:shadow-lg hover:border-[#1769AA]/50 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-lg bg-[#10243A]/5 group-hover:bg-[#1769AA] text-[#1769AA] group-hover:text-white transition-colors flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-[#1769AA] transition-colors">
                      {service.number}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#10243A] group-hover:text-[#1769AA] transition-colors tracking-tight">
                    {service.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {service.shortDescription}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#1769AA]">
                  <span className="group-hover:translate-x-0.5 transition-transform">Learn More</span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#1769AA] group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
