import React from 'react';
import { NavView } from '../layout/Navbar';
import { 
  Users, 
  CheckCircle, 
  MessageSquare, 
  Sliders, 
  Briefcase, 
  Handshake, 
  Map, 
  ArrowRight 
} from 'lucide-react';

interface WhyChooseSectionProps {
  onNavigate: (view: NavView) => void;
}

export const WhyChooseSection: React.FC<WhyChooseSectionProps> = ({ onNavigate }) => {
  const reasons = [
    {
      icon: Users,
      title: 'Dedicated Recruitment Specialists',
      desc: 'You work directly with seasoned recruiters who specialize solely within your functional vertical, not generalists.'
    },
    {
      icon: CheckCircle,
      title: 'Quality Candidate Screening',
      desc: 'Every professional undergoes structured behavioral interviews, skill validation, and verified professional reference checks.'
    },
    {
      icon: MessageSquare,
      title: 'Responsive Communication',
      desc: 'Transparent SLAs, clear submittal schedules, and proactive updates so hiring managers and candidates never wonder where they stand.'
    },
    {
      icon: Sliders,
      title: 'Flexible Staffing Solutions',
      desc: 'Seamless transition between Contract, Contract-to-Hire, Direct Hire, and Executive Search as your headcount demands evolve.'
    },
    {
      icon: Briefcase,
      title: 'Industry-Focused Recruitment',
      desc: 'Our practice leads follow active sector regulatory requirements, salary benchmarks, and technical developments daily.'
    },
    {
      icon: Handshake,
      title: 'Long-Term Business Relationships',
      desc: 'We cultivate enduring talent partnerships focused on post-placement retention rather than fast transactional fees.'
    },
    {
      icon: Map,
      title: 'Nationwide US Recruitment Reach',
      desc: 'Active sourcing footprint covering major metropolitan business hubs across all 50 US states, on-site and remote.'
    }
  ];

  return (
    <section className="py-20 bg-[#10243A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & Value Prop */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D6A84B]">
              <span>Competitive Advantage</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight text-white">
              Why Premier US Organizations Choose Air Dive Group
            </h2>
            <p className="text-base text-slate-300 leading-relaxed">
              We combine the resources and national reach of an enterprise recruitment firm with the agility, transparency, and personal accountability of a specialized boutique partner.
            </p>

            <div className="bg-[#0c1b2c] rounded-xl p-5 border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-[#D6A84B] uppercase tracking-wide">
                Our Relationship Commitment
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                "Our reputation rests on the caliber of talent we represent and the integrity of every hiring process we orchestrate. We deliver on what we promise."
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('employers')}
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold text-[#10243A] bg-white hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
              >
                <span>Partner With Us</span>
                <ArrowRight className="w-4 h-4 text-[#1769AA]" />
              </button>
            </div>
          </div>

          {/* Right Column: 7 Distinct Reasons Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reasons.map((r, i) => {
              const Icon = r.icon;
              return (
                <div
                  key={i}
                  className={`bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-colors ${
                    i === 6 ? 'sm:col-span-2' : ''
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-lg bg-[#1769AA]/30 text-[#D6A84B] flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-white tracking-tight">
                        {r.title}
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {r.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
