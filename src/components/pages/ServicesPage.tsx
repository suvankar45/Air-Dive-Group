import React, { useState } from 'react';
import { NavView } from '../layout/Navbar';
import { STAFFING_SERVICES, ServiceDetail } from '../../data/mockData';
import { 
  CheckCircle2, 
  ArrowRight, 
  HelpCircle, 
  Building2, 
  ChevronDown, 
  ChevronUp,
  Layers,
  Clock,
  FileText,
  Repeat,
  UserCheck,
  Crown,
  Users,
  Workflow
} from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (view: NavView) => void;
  selectedServiceId?: string;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ 
  onNavigate, 
  selectedServiceId = 'direct-hire-recruitment' 
}) => {
  const [activeServiceId, setActiveServiceId] = useState<string>(selectedServiceId || STAFFING_SERVICES[3].id);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const activeService = STAFFING_SERVICES.find(s => s.id === activeServiceId) || STAFFING_SERVICES[0];

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

  const ActiveIcon = getIcon(activeService.id);

  return (
    <div className="bg-[#F8FAFC]">
      {/* Header */}
      <section className="bg-[#10243A] text-white py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D6A84B]">
            <span>Workforce Architecture & Delivery</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Staffing & Recruitment Solutions
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Eight specialized delivery models built to provide flexible talent capacity, de-risk key leadership appointments, and manage end-to-end recruitment operations nationwide.
          </p>
        </div>
      </section>

      {/* Main Split Layout: Sidebar Selector + Deep Service Presentation */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Sidebar Navigation */}
          <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 p-4 shadow-xs sticky top-28 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 px-3 py-1 block">
              All 8 Staffing Models
            </span>
            <div className="space-y-1">
              {STAFFING_SERVICES.map((service) => {
                const Icon = getIcon(service.id);
                const isActive = service.id === activeServiceId;
                return (
                  <button
                    key={service.id}
                    onClick={() => {
                      setActiveServiceId(service.id);
                      setOpenFaqIndex(0);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-3 rounded-lg text-left text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#10243A] text-white shadow-xs'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-[#D6A84B]' : 'text-slate-400'}`} />
                      <span>{service.title}</span>
                    </div>
                    <span className={`text-[10px] font-mono ${isActive ? 'text-[#D6A84B]' : 'text-slate-400'}`}>
                      {service.number}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-slate-100 p-2">
              <div className="bg-[#F4F7FA] rounded-lg p-3 text-xs space-y-2">
                <span className="font-bold text-[#10243A] block">Need Custom Scoping?</span>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Our practice directors can configure a blended statement of work combining contract and direct hire.
                </p>
                <button
                  onClick={() => onNavigate('employers')}
                  className="w-full py-2 px-3 text-xs font-bold text-white bg-[#1769AA] hover:bg-[#145a92] rounded-md transition-colors cursor-pointer text-center"
                >
                  Request Consultation
                </button>
              </div>
            </div>
          </div>

          {/* Right Main Content: Active Service Deep Dive */}
          <div className="lg:col-span-8 space-y-8">
            {/* Service Hero Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#10243A] text-[#D6A84B] flex items-center justify-center">
                    <ActiveIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-[#1769AA]">
                      SERVICE MODEL {activeService.number}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#10243A]">
                      {activeService.title}
                    </h2>
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('employers')}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-[#10243A] hover:bg-[#1769AA] rounded-md transition-colors cursor-pointer"
                >
                  Request Staffing for this Model
                </button>
              </div>

              <div className="bg-[#F8FAFC] border-l-2 border-[#1769AA] p-4 rounded-r-lg">
                <p className="text-sm font-semibold text-[#10243A] italic">
                  "{activeService.tagline}"
                </p>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Service Overview
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {activeService.overview}
                </p>
              </div>

              {/* Business Benefits */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Key Business Benefits
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeService.businessBenefits.map((benefit, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-2 bg-[#F8FAFC] p-3 rounded-lg border border-slate-200/80">
                      <CheckCircle2 className="w-4 h-4 text-[#1769AA] shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-800 font-medium leading-relaxed">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Supported Industries */}
              <div className="space-y-2 pt-4 border-t border-slate-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Primary Industries Supported
                </h3>
                <div className="flex flex-wrap gap-2">
                  {activeService.industriesSupported.map((ind, iIdx) => (
                    <span
                      key={iIdx}
                      className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-md"
                    >
                      {ind}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Our Recruitment Process for this Service */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#1769AA]">
                  Structured Execution
                </span>
                <h3 className="text-xl font-bold text-[#10243A] tracking-tight">
                  How We Deliver {activeService.title}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeService.process.map((p, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-slate-200/90 bg-[#F8FAFC] space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[#D6A84B] bg-[#10243A] px-2 py-0.5 rounded">
                        {p.step}
                      </span>
                      <h4 className="text-sm font-bold text-[#10243A]">
                        {p.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Frequently Asked Questions */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs space-y-6">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#1769AA]" />
                <h3 className="text-xl font-bold text-[#10243A] tracking-tight">
                  Frequently Asked Questions
                </h3>
              </div>

              <div className="space-y-3">
                {activeService.faqs.map((faq, fIdx) => {
                  const isOpen = openFaqIndex === fIdx;
                  return (
                    <div
                      key={fIdx}
                      className="border border-slate-200 rounded-lg overflow-hidden"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : fIdx)}
                        className="w-full flex items-center justify-between p-4 text-left font-bold text-xs text-[#10243A] hover:bg-slate-50 transition-colors cursor-pointer"
                      >
                        <span>{faq.question}</span>
                        {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                      </button>

                      {isOpen && (
                        <div className="px-4 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-[#F8FAFC]">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Service Action Banner */}
            <div className="bg-[#10243A] rounded-2xl p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="text-lg font-bold">Ready to deploy {activeService.title}?</h4>
                <p className="text-xs text-slate-300">
                  Speak with our dedicated practice lead within 2 hours.
                </p>
              </div>
              <button
                onClick={() => onNavigate('employers')}
                className="px-6 py-3 text-xs font-bold text-[#10243A] bg-white hover:bg-slate-100 rounded-md transition-colors cursor-pointer whitespace-nowrap"
              >
                Submit Hiring Requirements
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
