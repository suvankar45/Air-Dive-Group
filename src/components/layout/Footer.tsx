import React from 'react';
import { BrandLogo } from '../common/BrandLogo';
import { NavView } from './Navbar';
import { COMPANY_FACTS } from '../../data/mockData';
import { StorageService } from '../../services/storageService';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  ArrowUpRight,
  Linkedin,
  Twitter,
  Facebook,
  Lock,
  PlusCircle,
  HelpCircle,
  KeyRound,
  FileSpreadsheet,
  MessageSquare
} from 'lucide-react';

interface FooterProps {
  onNavigate: (view: NavView) => void;
  onOpenLegal: (tab: 'privacy' | 'terms' | 'eeo' | 'candidate-data' | 'accessibility' | 'cookies') => void;
  onOpenQuickQuestion: () => void;
  onOpenAdminPortal?: (tab?: 'overview' | 'jobs' | 'questions') => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onNavigate, 
  onOpenLegal,
  onOpenQuickQuestion,
  onOpenAdminPortal
}) => {
  const hasSlot = StorageService.hasAdminSlotAvailable();
  const isAdmin = StorageService.isAdminLoggedIn();

  const handleAdminClick = (tab: 'overview' | 'jobs' | 'questions' = 'overview') => {
    if (onOpenAdminPortal) {
      onOpenAdminPortal(tab);
    } else {
      onNavigate('admin');
    }
  };

  return (
    <footer className="bg-[#10243A] text-slate-300 border-t border-slate-800">
      {/* Top Banner / Value Proposition */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-slate-800/80">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D6A84B] mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>US Workforce Excellence & Compliance</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Ready to elevate your talent strategy or accelerate your career?
            </h3>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('employers')}
              className="px-5 py-2.5 text-xs font-bold text-[#10243A] bg-white hover:bg-slate-100 rounded-md transition-colors cursor-pointer shadow-xs"
            >
              Request Staffing Support
            </button>
            <button
              onClick={() => onNavigate('jobs')}
              className="px-5 py-2.5 text-xs font-bold text-white bg-[#1769AA] hover:bg-[#145a92] rounded-md transition-colors cursor-pointer shadow-xs"
            >
              Explore Open Jobs
            </button>
          </div>
        </div>
      </div>

      {/* Main Column Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info & Address */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo variant="light" />
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              Air Dive Group delivers strategic staffing and workforce solutions that empower American organizations to build high-performance teams and guide professionals into rewarding career opportunities nationwide.
            </p>

            <div className="space-y-2.5 text-xs text-slate-300 pt-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D6A84B] shrink-0 mt-0.5" />
                <span>{COMPANY_FACTS.headquarters}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D6A84B] shrink-0" />
                <span>{COMPANY_FACTS.phone} (Corporate Verification Line)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D6A84B] shrink-0" />
                <span>{COMPANY_FACTS.email}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#D6A84B] shrink-0" />
                <span>{COMPANY_FACTS.workingHours}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#1769AA] hover:text-white transition-colors"
                aria-label="Air Dive Group on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#1769AA] hover:text-white transition-colors"
                aria-label="Air Dive Group on X / Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#1769AA] hover:text-white transition-colors"
                aria-label="Air Dive Group on Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Staffing Solutions */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Staffing Services
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Direct Hire Recruitment
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Contract Staffing
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Contract-to-Hire
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Executive Search
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Temporary Staffing
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Recruitment Process Outsourcing (RPO)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Workforce & MSP Solutions
                </button>
              </li>
            </ul>
          </div>

          {/* Industry Practices */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Industries Served
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button onClick={() => onNavigate('industries')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Information Technology
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('industries')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Healthcare & Clinical
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('industries')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Finance & Accounting
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('industries')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Engineering & Aerospace
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('industries')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Manufacturing & Industrial
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('industries')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Supply Chain & Logistics
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('industries')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Life Sciences & Biotech
                </button>
              </li>
            </ul>
          </div>

          {/* Company & Portals */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Portals & Support
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors cursor-pointer">
                  About Air Dive Group
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('employers')} className="hover:text-white transition-colors cursor-pointer">
                  Employer Hiring Portal
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('candidates')} className="hover:text-white transition-colors cursor-pointer">
                  Candidate Career Portal
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('jobs')} className="hover:text-white transition-colors cursor-pointer">
                  National Job Board
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors cursor-pointer">
                  Contact Corporate Office
                </button>
              </li>
              <li className="pt-2 border-t border-slate-800">
                <button 
                  onClick={onOpenQuickQuestion}
                  className="inline-flex items-center gap-1.5 text-sky-400 hover:text-white font-medium transition-colors cursor-pointer"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Quick Question / Concern Desk</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleAdminClick('overview')}
                  className="inline-flex items-center gap-1.5 text-[#D6A84B] hover:text-white font-semibold transition-colors cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Admin Login Portal</span>
                  {hasSlot && (
                    <span className="text-[10px] bg-amber-500/20 text-[#D6A84B] border border-[#D6A84B]/40 px-1.5 py-0.2 rounded font-mono">
                      1 Slot Open
                    </span>
                  )}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleAdminClick('jobs')}
                  className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white font-medium transition-colors cursor-pointer"
                >
                  <PlusCircle className="w-3.5 h-3.5 text-[#1769AA]" />
                  <span>Job Listing Portal (Admin Only)</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Dedicated Executive Portals Strip */}
      <div className="bg-[#0b1726] border-t border-b border-slate-800/90 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-[11px] font-bold text-[#D6A84B] uppercase tracking-wider">
                Internal Management & Inquiries
              </span>
              <h4 className="text-base font-bold text-white mt-0.5">
                Staff Administration & Inquiries Gateway
              </h4>
            </div>
            <span className="text-xs text-slate-400">
              Direct access for authorized recruitment personnel and rapid inquiry submission
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 1. Admin Login Portal */}
            <div 
              onClick={() => handleAdminClick('overview')}
              className="bg-[#10243A] hover:bg-[#142e4a] border border-slate-700/80 hover:border-[#D6A84B]/60 p-4 rounded-lg transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded bg-[#D6A84B]/10 border border-[#D6A84B]/30 flex items-center justify-center text-[#D6A84B]">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  {hasSlot ? (
                    <span className="text-[10px] font-bold bg-amber-500/20 text-[#D6A84B] border border-[#D6A84B]/40 px-2 py-0.5 rounded">
                      1 Setup Slot Available
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700 px-2 py-0.5 rounded">
                      Protected · Admin Only
                    </span>
                  )}
                </div>
                <h5 className="text-sm font-bold text-white group-hover:text-[#D6A84B] transition-colors">
                  Admin Login Portal
                </h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Log in to review who contacted us, candidate enrollments, submitted resumes, and manage questions & concerns.
                </p>
              </div>
              <div className="pt-3 mt-3 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-[#D6A84B]">
                <span>{isAdmin ? 'Open Admin Console' : hasSlot ? 'Create Admin Account (1 Slot)' : 'Authorized Login'}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* 2. Job Listing Portal (Admin Only) */}
            <div 
              onClick={() => handleAdminClick('jobs')}
              className="bg-[#10243A] hover:bg-[#142e4a] border border-slate-700/80 hover:border-[#1769AA]/70 p-4 rounded-lg transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded bg-[#1769AA]/20 border border-[#1769AA]/40 flex items-center justify-center text-[#1769AA]">
                    <FileSpreadsheet className="w-4 h-4 text-sky-400" />
                  </div>
                  <span className="text-[10px] font-semibold bg-sky-950 text-sky-300 border border-sky-800 px-2 py-0.5 rounded">
                    Admin Only
                  </span>
                </div>
                <h5 className="text-sm font-bold text-white group-hover:text-sky-400 transition-colors">
                  Job Listing Portal
                </h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Publish active career listings and toggle which jobs appear in the Featured Career Opportunities homepage section.
                </p>
              </div>
              <div className="pt-3 mt-3 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-sky-400">
                <span>Manage & Post Jobs</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* 3. Quick Question & Concern Portal */}
            <div 
              onClick={onOpenQuickQuestion}
              className="bg-[#10243A] hover:bg-[#142e4a] border border-slate-700/80 hover:border-emerald-500/60 p-4 rounded-lg transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded">
                    Fast Response
                  </span>
                </div>
                <h5 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                  Quick Question & Concern Portal
                </h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Have an urgent question or need to raise an issue? Submissions are immediately logged for recruiter resolution.
                </p>
              </div>
              <div className="pt-3 mt-3 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-emerald-400">
                <span>Submit Quick Inquiry</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Compliance & Legal Notices Bottom Bar */}
      <div className="bg-[#08121d] border-t border-slate-800 text-[11px] text-slate-400 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p>
              © {new Date().getFullYear()} {COMPANY_FACTS.legalName}. All rights reserved. Equal Opportunity Employer.
            </p>
            <p className="text-slate-400 text-[10px] mt-0.5">
              Notice: All company performance figures & open listings contain verified demonstration structures until client-authorized data feeds are connected.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-slate-400">
            <button onClick={() => onOpenLegal('privacy')} className="hover:text-white transition-colors cursor-pointer">
              Privacy Policy
            </button>
            <span>·</span>
            <button onClick={() => onOpenLegal('terms')} className="hover:text-white transition-colors cursor-pointer">
              Terms of Service
            </button>
            <span>·</span>
            <button onClick={() => onOpenLegal('eeo')} className="hover:text-white transition-colors cursor-pointer">
              Equal Employment Opportunity
            </button>
            <span>·</span>
            <button onClick={() => onOpenLegal('candidate-data')} className="hover:text-white transition-colors cursor-pointer">
              Candidate Data Protection
            </button>
            <span>·</span>
            <button onClick={() => onOpenLegal('accessibility')} className="hover:text-white transition-colors cursor-pointer">
              Accessibility
            </button>
            <span>·</span>
            <button onClick={() => onOpenLegal('cookies')} className="hover:text-white transition-colors cursor-pointer">
              Cookie Settings
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
