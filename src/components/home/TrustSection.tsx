import React from 'react';
import { NavView } from '../layout/Navbar';
import { 
  Users2, 
  Target, 
  ShieldCheck, 
  Handshake, 
  ArrowRight,
  Sparkles,
  Award
} from 'lucide-react';

interface TrustSectionProps {
  onNavigate: (view: NavView) => void;
}

export const TrustSection: React.FC<TrustSectionProps> = ({ onNavigate }) => {
  const pillars = [
    {
      icon: Target,
      title: 'Precision Sourcing & Calibration',
      description: 'We don’t rely on cold job-board scraping. Our recruiters calibrate active and passive US talent pools directly against your technical stack and team values.'
    },
    {
      icon: Users2,
      title: 'Responsive & Dedicated Teams',
      description: 'Single-point-of-contact practice leads who understand your industry vertical, ensuring rapid submittal timelines and proactive communication.'
    },
    {
      icon: ShieldCheck,
      title: 'Comprehensive Vetting & Compliance',
      description: 'Multi-layer credential checks, technical assessments, reference audits, and strict US work authorization (E-Verify / I-9) compliance.'
    },
    {
      icon: Handshake,
      title: 'Relationship-Driven Partnerships',
      description: 'We prioritize long-term retention over one-off transactional placements, backed by industry-standard placement replacement guarantees.'
    }
  ];

  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1769AA]">
            <Award className="w-4 h-4 text-[#D6A84B]" />
            <span>The Air Dive Standard</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#10243A] tracking-tight">
            Your Trusted Partner in Workforce Excellence.
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Air Dive Group connects forward-thinking employers with qualified professionals through responsive recruitment, personalized service, and long-term workforce partnerships across 50 US states.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-[#F8FAFC] border border-slate-200/90 rounded-xl p-6 transition-all hover:shadow-md hover:border-[#1769AA]/40 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#1769AA] shadow-xs">
                    <Icon className="w-6 h-6 text-[#1769AA]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#10243A] tracking-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Verification & Transparency Banner */}
        <div className="mt-14 bg-[#F4F7FA] rounded-xl p-6 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#10243A] uppercase tracking-wide">
              Transparency & Verification Notice
            </span>
            <p className="text-xs text-slate-600 max-w-2xl">
              Air Dive Group adheres strictly to the American Staffing Association (ASA) standards of ethical practice. Company figures and candidate counters on this portal reflect verified platform seeds until your customized enterprise reporting is deployed.
            </p>
          </div>
          <button
            onClick={() => onNavigate('about')}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-[#1769AA] hover:text-[#10243A] whitespace-nowrap cursor-pointer"
          >
            <span>Learn About Our Philosophy</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
