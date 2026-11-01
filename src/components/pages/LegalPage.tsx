import React, { useState } from 'react';
import { NavView } from '../layout/Navbar';
import { COMPANY_FACTS } from '../../data/mockData';
import { ShieldCheck, Scale, FileText, CheckCircle2 } from 'lucide-react';

export type LegalTab = 'privacy' | 'terms' | 'eeo' | 'candidate-data' | 'accessibility' | 'cookies';

interface LegalPageProps {
  initialTab?: LegalTab;
  onNavigate: (view: NavView) => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ initialTab = 'privacy', onNavigate }) => {
  const [activeTab, setActiveTab] = useState<LegalTab>(initialTab);

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Header */}
      <section className="bg-[#10243A] text-white py-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D6A84B]">
            <Scale className="w-3.5 h-3.5" />
            <span>Compliance & Legal Standards</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Policies, Ethics & Compliance
          </h1>
          <p className="text-sm text-slate-300 max-w-2xl">
            Air Dive Group adheres strictly to United States federal, state, and local employment laws and industry ethics standards.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Tabs Sidebar */}
          <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 p-3 shadow-xs space-y-1 sticky top-28">
            <button
              onClick={() => setActiveTab('privacy')}
              className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'privacy' ? 'bg-[#10243A] text-white shadow-xs' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setActiveTab('terms')}
              className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'terms' ? 'bg-[#10243A] text-white shadow-xs' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              Terms of Service
            </button>
            <button
              onClick={() => setActiveTab('eeo')}
              className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'eeo' ? 'bg-[#10243A] text-white shadow-xs' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              Equal Employment Opportunity (EEO)
            </button>
            <button
              onClick={() => setActiveTab('candidate-data')}
              className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'candidate-data' ? 'bg-[#10243A] text-white shadow-xs' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              Candidate Data Protection
            </button>
            <button
              onClick={() => setActiveTab('accessibility')}
              className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'accessibility' ? 'bg-[#10243A] text-white shadow-xs' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              Accessibility Statement
            </button>
            <button
              onClick={() => setActiveTab('cookies')}
              className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'cookies' ? 'bg-[#10243A] text-white shadow-xs' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              Cookie Policy
            </button>
          </div>

          {/* Policy Text Pane */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-8 shadow-xs space-y-6 text-sm text-slate-700 leading-relaxed">
            {activeTab === 'privacy' && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-[#10243A]">Air Dive Group Privacy Policy</h2>
                <span className="text-xs text-slate-400 block font-mono">Effective Date: October 2026 · Version 1.4</span>
                <p>
                  Air Dive Group LLC ("Air Dive Group", "we", "our", or "us") is dedicated to safeguarding the privacy and confidentiality of our client partners, candidates, and website visitors. This policy outlines our collection, utilization, and disclosure protocols for personal information obtained through our staffing operations and digital portals.
                </p>
                <h3 className="text-base font-bold text-[#10243A]">1. Information We Collect</h3>
                <p>
                  We gather professional information including resume files, contact records, work authorization credentials, employment history, and hiring requirements submitted voluntarily through our portals.
                </p>
                <h3 className="text-base font-bold text-[#10243A]">2. Utilization of Data</h3>
                <p>
                  Candidate information is processed exclusively for the purpose of matching individuals with prospective career opportunities. We never sell, lease, or monetize candidate contact details to third-party marketing vendors.
                </p>
                <h3 className="text-base font-bold text-[#10243A]">3. US State Privacy Rights</h3>
                <p>
                  Residents of California (CCPA/CPRA), Virginia (VCDPA), Colorado (CPA), and other US jurisdictions maintain specific rights regarding the access, correction, and deletion of their personal information upon verified request.
                </p>
              </div>
            )}

            {activeTab === 'terms' && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-[#10243A]">Terms of Service</h2>
                <span className="text-xs text-slate-400 block font-mono">Effective Date: October 2026</span>
                <p>
                  By accessing or utilizing the Air Dive Group website, candidate portals, or recruitment services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please refrain from using the platform.
                </p>
                <h3 className="text-base font-bold text-[#10243A]">1. Candidate Representation</h3>
                <p>
                  Submission of a resume or profile does not guarantee employment or placement. Air Dive Group represents candidates on a strictly non-exclusive, complimentary basis. Candidates incur zero fees for recruitment services.
                </p>
                <h3 className="text-base font-bold text-[#10243A]">2. Employer Engagements</h3>
                <p>
                  All commercial staffing, direct-hire placements, and contingent labor engagements are governed by formal Master Services Agreements (MSAs) executed between Air Dive Group and the authorized client enterprise.
                </p>
              </div>
            )}

            {activeTab === 'eeo' && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-[#10243A]">Equal Employment Opportunity (EEO) Statement</h2>
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs font-medium">
                  Air Dive Group is an Affirmative Action and Equal Opportunity Employer committed to fostering an inclusive and diverse American workforce.
                </div>
                <p>
                  All qualified applicants and candidates receive fair consideration for employment without regard to race, color, religion, sex, sexual orientation, gender identity, national origin, protected veteran status, disability, age, genetic information, or any other characteristic protected under applicable US federal, state, or municipal law.
                </p>
                <h3 className="text-base font-bold text-[#10243A]">Reasonable Accommodation</h3>
                <p>
                  Air Dive Group provides reasonable accommodations to applicants with disabilities in accordance with the Americans with Disabilities Act (ADA). If you require an accommodation to navigate our job board or complete candidate registration, please contact our human capital department.
                </p>
              </div>
            )}

            {activeTab === 'candidate-data' && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-[#10243A]">Candidate Data Protection & Consent</h2>
                <p>
                  We treat candidate resumes and personal credentials with the highest level of administrative and technical security.
                </p>
                <ul className="space-y-2 text-xs">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#1769AA] shrink-0 mt-0.5" />
                    <span><strong>Explicit Authorization:</strong> Resumes are never released to prospective employers without explicit candidate agreement.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#1769AA] shrink-0 mt-0.5" />
                    <span><strong>Encryption at Rest:</strong> Stored documents utilize AES-256 standard encryption within our secure cloud data repositories.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#1769AA] shrink-0 mt-0.5" />
                    <span><strong>Right to Erasure:</strong> Candidates may request the permanent purge of their file by emailing compliance@airdivegroup.com.</span>
                  </li>
                </ul>
              </div>
            )}

            {activeTab === 'accessibility' && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-[#10243A]">Accessibility Statement</h2>
                <p>
                  Air Dive Group is committed to ensuring digital accessibility for people with disabilities. We continually improve the user experience for everyone, applying relevant Web Content Accessibility Guidelines (WCAG 2.1 Level AA) standards.
                </p>
                <p>
                  Our portals feature visible focus rings, sufficient color contrast ratios, screen-reader semantic elements, and keyboard navigability across all job application workflows.
                </p>
              </div>
            )}

            {activeTab === 'cookies' && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-[#10243A]">Cookie & Storage Policy</h2>
                <p>
                  Our website uses functional local storage and essential cookies to remember your job search filters, bookmarked positions, and candidate profile session state. We do not employ intrusive tracking cookies across external websites.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
