import React from 'react';
import { NavView } from '../layout/Navbar';
import { LEADERSHIP_TEAM, COMPANY_FACTS } from '../../data/mockData';
import { 
  Building2, 
  Target, 
  Compass, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  ArrowRight,
  Users2,
  Scale,
  Sparkles
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (view: NavView) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const values = [
    {
      title: 'Integrity Above All',
      desc: 'We operate with uncompromising ethical standards. We represent candidates accurately and set honest expectations with client partners.'
    },
    {
      title: 'Relationship-First Philosophy',
      desc: 'Staffing is not a commodities business; it is a people business. We invest in long-term relationships that outlast individual transactions.'
    },
    {
      title: 'Calibrated Precision',
      desc: 'We prioritize quality over volume. Rather than flooding inboxes with unqualified resumes, we introduce curated candidates who truly fit.'
    },
    {
      title: 'Operational Velocity',
      desc: 'In competitive labor markets, speed is a strategic advantage. Our agile practice teams provide responsive 24-48 hour talent calibration.'
    }
  ];

  const searchSteps = [
    { step: '01', title: 'Calibration & Culture Audit', desc: 'Detailed intake with hiring leaders analyzing technical competencies, leadership dynamics, compensation benchmarks, and departmental culture.' },
    { step: '02', title: 'Targeted Talent Mapping', desc: 'Proprietary national mapping across active networks and passive talent pools in all 50 US states, ensuring top-decile market reach.' },
    { step: '03', title: 'Multi-Tier Candidate Screening', desc: 'Structured behavioral interviewing, technical verification, and professional reference reviews conducted by practice specialists.' },
    { step: '04', title: 'Curated Dossier Presentation', desc: 'Delivery of 2-3 shortlisted candidate portfolios complete with recruiter executive summaries and compensation expectations.' },
    { step: '05', title: 'Interview & Offer Alignment', desc: 'Facilitating seamless interview logistics, debriefing feedback, and structuring offers that mitigate counter-offers.' },
    { step: '06', title: 'Post-Placement Integration', desc: 'Consistent 30, 60, and 90-day check-ins with both manager and candidate to ensure long-term retention and satisfaction.' }
  ];

  return (
    <div className="bg-[#F8FAFC]">
      {/* Page Header */}
      <section className="bg-[#10243A] text-white py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D6A84B]">
            <span>Corporate Profile & Origins</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            About Air Dive Group
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            A premier American staffing and recruitment organization dedicated to connecting exceptional employers with high-caliber talent through precision search and long-term partnership.
          </p>
        </div>
      </section>

      {/* Company Overview & Origins */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1769AA]">
                Who We Are
              </span>
              <h2 className="text-3xl font-extrabold text-[#10243A] tracking-tight">
                Empowering American Industry Through Workforce Excellence
              </h2>
              <p className="text-base text-slate-700 leading-relaxed">
                Air Dive Group was established with a singular conviction: that organizational greatness begins with the quality, character, and alignment of its people. Headquartered in Atlanta, GA and serving enterprise clients across all 50 states, we provide comprehensive workforce advisory spanning temporary staffing, specialized contract consultants, direct-hire recruitment, and executive search.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Unlike transactional recruiting agencies that rely on keyword scrapers, our recruitment teams are structured into 10 specialized industry practices. Each team is led by veterans who understand the nuances of engineering certifications, healthcare credentialing, and FinTech compliance.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                <div className="space-y-1">
                  <span className="text-2xl font-bold font-mono text-[#10243A]">50 States</span>
                  <p className="text-xs text-slate-500">Nationwide US Placement Capability</p>
                </div>
                <div className="space-y-1">
                  <span className="text-2xl font-bold font-mono text-[#1769AA]">10 Practices</span>
                  <p className="text-xs text-slate-500">Dedicated Vertical Industry Teams</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#F4F7FA] rounded-2xl p-8 border border-slate-200 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase text-[#1769AA]">
                  <Compass className="w-4 h-4 text-[#D6A84B]" />
                  <span>Our Mission</span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed font-medium">
                  To empower American businesses to achieve their operational potential by connecting them with qualified, pre-screened talent, while equipping professionals with career-defining opportunities that elevate their livelihoods.
                </p>
              </div>

              <div className="space-y-2 pt-4 border-t border-slate-200">
                <div className="flex items-center gap-2 text-xs font-bold uppercase text-[#1769AA]">
                  <Target className="w-4 h-4 text-[#D6A84B]" />
                  <span>Our Vision</span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed font-medium">
                  To be the most respected, relationship-driven workforce solutions partner in the United States, recognized for unwavering compliance, recruiter accountability, and transformative placement retention.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1769AA]">
              Guiding Principles
            </span>
            <h2 className="text-3xl font-extrabold text-[#10243A] tracking-tight">
              Our Core Values
            </h2>
            <p className="text-sm text-slate-600">
              The ethical framework that guides every candidate conversation, client negotiation, and placement decision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 border border-slate-200/90 shadow-xs space-y-3"
              >
                <div className="w-10 h-10 rounded-lg bg-[#10243A] text-[#D6A84B] flex items-center justify-center font-bold font-mono text-sm">
                  0{i + 1}
                </div>
                <h3 className="text-base font-bold text-[#10243A] tracking-tight">
                  {v.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our 6-Step Recruitment Philosophy & Search Methodology */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1769AA]">
              Search Methodology
            </span>
            <h2 className="text-3xl font-extrabold text-[#10243A] tracking-tight">
              Our 6-Step Precision Search Approach
            </h2>
            <p className="text-sm text-slate-600">
              A structured, repeatable recruitment lifecycle designed to maximize placement velocity while eliminating the risks of mismatched hires.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {searchSteps.map((step, idx) => (
              <div
                key={idx}
                className="border border-slate-200 rounded-xl p-6 bg-[#F8FAFC] space-y-3 relative overflow-hidden"
              >
                <span className="text-3xl font-extrabold font-mono text-slate-200 absolute top-4 right-4">
                  {step.step}
                </span>
                <span className="text-xs font-bold text-[#1769AA] uppercase tracking-wide">
                  Phase {step.step}
                </span>
                <h3 className="text-base font-bold text-[#10243A]">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team (Editable corporate showcase) */}
      <section className="py-20 bg-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1769AA]">
              Executive Stewardship
            </span>
            <h2 className="text-3xl font-extrabold text-[#10243A] tracking-tight">
              Our Leadership Team
            </h2>
            <p className="text-sm text-slate-600">
              Experienced staffing directors and workforce architects driving the standards of Air Dive Group.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {LEADERSHIP_TEAM.map((member, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between shadow-xs"
              >
                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#10243A] text-white flex items-center justify-center font-bold text-xl font-mono border-2 border-[#D6A84B]">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#10243A]">
                      {member.name}
                    </h3>
                    <div className="text-xs font-semibold text-[#1769AA]">
                      {member.role}
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {member.bio}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
                  Specialty: {member.focus}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#10243A]">
            Discover the Difference a Calibrated Partner Makes
          </h2>
          <p className="text-sm text-slate-600">
            Let our practice leads review your current hiring bottlenecks or career objectives today.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('employers')}
              className="px-6 py-3 text-xs font-bold text-white bg-[#10243A] hover:bg-[#1769AA] rounded-md transition-colors cursor-pointer"
            >
              Consult with Our Team
            </button>
            <button
              onClick={() => onNavigate('services')}
              className="px-6 py-3 text-xs font-bold text-[#10243A] bg-slate-100 hover:bg-slate-200 rounded-md transition-colors cursor-pointer"
            >
              Explore Staffing Models
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
