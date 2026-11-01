import React, { useState } from 'react';
import { BrandLogo } from '../common/BrandLogo';
import { 
  Menu, 
  X, 
  Briefcase, 
  FileUp, 
  Building2, 
  Users, 
  Search, 
  Lock,
  ChevronDown
} from 'lucide-react';

export type NavView = 
  | 'home'
  | 'about'
  | 'services'
  | 'industries'
  | 'employers'
  | 'candidates'
  | 'jobs'
  | 'insights'
  | 'contact'
  | 'admin'
  | 'legal';

interface NavbarProps {
  currentView: NavView;
  onNavigate: (view: NavView) => void;
  selectedJobId?: string | null;
  savedJobsCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  savedJobsCount = 0
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);

  const handleNav = (view: NavView) => {
    onNavigate(view);
    setMobileMenuOpen(false);
    setServicesDropdown(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems: { label: string; view: NavView }[] = [
    { label: 'Home', view: 'home' },
    { label: 'About Us', view: 'about' },
    { label: 'Services', view: 'services' },
    { label: 'Industries', view: 'industries' },
    { label: 'For Employers', view: 'employers' },
    { label: 'For Candidates', view: 'candidates' },
    { label: 'Find Jobs', view: 'jobs' },
    { label: 'Insights', view: 'insights' },
    { label: 'Contact Us', view: 'contact' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-shadow duration-200 shadow-xs">
      {/* Top micro-bar for compliance and recruiter portal access */}
      <div className="bg-[#10243A] text-slate-300 text-xs py-1.5 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[#D6A84B] font-semibold tracking-wider uppercase text-[11px]">Nationwide US Staffing</span>
            <span className="text-slate-500 hidden sm:inline">|</span>
            <span className="hidden sm:inline text-slate-300">Executive Search · Contract · Direct Hire</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleNav('jobs')}
              className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Search className="w-3 h-3 text-[#D6A84B]" />
              <span>Job Search</span>
              {savedJobsCount > 0 && (
                <span className="bg-[#1769AA] text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold ml-0.5">
                  {savedJobsCount}
                </span>
              )}
            </button>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span className="text-[11px] text-slate-400 hidden sm:inline">Atlanta · Dallas · Chicago · Charlotte</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Brand Wordmark & Logo */}
          <button 
            onClick={() => handleNav('home')}
            className="cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1769AA] rounded-md"
            aria-label="Air Dive Group Home"
          >
            <BrandLogo />
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-6 text-sm font-medium text-slate-700">
            {navItems.map((item) => (
              <button
                key={item.view}
                onClick={() => handleNav(item.view)}
                className={`transition-colors whitespace-nowrap cursor-pointer relative py-2 ${
                  currentView === item.view
                    ? 'text-[#1769AA] font-bold'
                    : 'hover:text-[#10243A]'
                }`}
              >
                {item.label}
                {currentView === item.view && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1769AA] rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNav('employers')}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-[#10243A] bg-[#F4F7FA] hover:bg-slate-200 border border-slate-300/80 rounded-md transition-all shadow-xs cursor-pointer whitespace-nowrap"
            >
              <Building2 className="w-3.5 h-3.5 text-[#1769AA]" />
              <span>Hire Talent</span>
            </button>
            <button
              onClick={() => handleNav('candidates')}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-[#10243A] hover:bg-[#1769AA] rounded-md transition-all shadow-sm cursor-pointer whitespace-nowrap"
            >
              <FileUp className="w-3.5 h-3.5 text-[#D6A84B]" />
              <span>Submit Resume</span>
            </button>
          </div>

          {/* Mobile hamburger menu toggle */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={() => handleNav('employers')}
              className="hidden sm:inline-flex md:hidden px-3 py-1.5 text-xs font-semibold text-[#10243A] bg-slate-100 rounded-md"
            >
              Hire Talent
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <button
                key={item.view}
                onClick={() => handleNav(item.view)}
                className={`text-left px-3 py-2.5 rounded-md text-sm font-semibold transition-colors cursor-pointer ${
                  currentView === item.view
                    ? 'bg-[#1769AA]/10 text-[#1769AA]'
                    : 'text-slate-800 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}

            <div className="pt-4 border-t border-slate-200 mt-2 space-y-2">
              <button
                onClick={() => handleNav('employers')}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold text-[#10243A] bg-[#F4F7FA] border border-slate-300 rounded-md hover:bg-slate-200"
              >
                <Building2 className="w-4 h-4 text-[#1769AA]" />
                <span>Hire Talent (Employer Portal)</span>
              </button>
              <button
                onClick={() => handleNav('candidates')}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold text-white bg-[#10243A] hover:bg-[#1769AA] rounded-md"
              >
                <FileUp className="w-4 h-4 text-[#D6A84B]" />
                <span>Submit Candidate Resume</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
