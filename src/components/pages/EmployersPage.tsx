import React, { useState } from 'react';
import { NavView } from '../layout/Navbar';
import { IndustryType, EmployerInquiry } from '../../types';
import { StorageService } from '../../services/storageService';
import { STAFFING_SERVICES, INDUSTRIES_SERVED } from '../../data/mockData';
import confetti from 'canvas-confetti';
import { 
  Building2, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Phone, 
  Mail, 
  Users, 
  DollarSign, 
  MapPin, 
  FileText,
  AlertCircle
} from 'lucide-react';

interface EmployersPageProps {
  onNavigate: (view: NavView) => void;
}

export const EmployersPage: React.FC<EmployersPageProps> = ({ onNavigate }) => {
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactTitle, setContactTitle] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [companyWebsite, setCompanyWebsite] = useState('');
  const [industry, setIndustry] = useState<IndustryType>('Information Technology');
  const [staffingService, setStaffingService] = useState('Direct Hire Recruitment');
  const [openPositionsCount, setOpenPositionsCount] = useState<number>(1);
  const [targetStartDate, setTargetStartDate] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  const [workplaceType, setWorkplaceType] = useState<'Remote' | 'Hybrid' | 'On-site'>('Hybrid');
  const [targetRateRange, setTargetRateRange] = useState('');
  const [jobScopeDescription, setJobScopeDescription] = useState('');
  const [ndaRequired, setNdaRequired] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedInquiry, setSubmittedInquiry] = useState<EmployerInquiry | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic Validation
    if (!companyName.trim() || !contactName.trim() || !workEmail.trim() || !phone.trim() || !jobScopeDescription.trim()) {
      setError('Please fill in all required fields (Company, Contact Name, Work Email, Phone, and Job Scope).');
      return;
    }

    if (!workEmail.includes('@') || !workEmail.includes('.')) {
      setError('Please provide a valid corporate email address.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      try {
        const newInquiry = StorageService.submitEmployerInquiry({
          companyName,
          contactName,
          contactTitle: contactTitle || 'Hiring Leader',
          workEmail,
          phone,
          companyWebsite,
          industry,
          staffingService,
          openPositionsCount: Number(openPositionsCount) || 1,
          targetStartDate: targetStartDate || 'Immediate / Within 30 Days',
          jobLocation: jobLocation || 'Nationwide / Remote',
          workplaceType,
          targetRateRange: targetRateRange || 'Competitive Market Rate',
          jobScopeDescription
        });

        setSubmittedInquiry(newInquiry);
        setLoading(false);

        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.6 }
          });
        } catch {}
      } catch (err: any) {
        setError('An unexpected error occurred saving your inquiry. Please try again.');
        setLoading(false);
      }
    }, 600);
  };

  const resetForm = () => {
    setSubmittedInquiry(null);
    setCompanyName('');
    setContactName('');
    setContactTitle('');
    setWorkEmail('');
    setPhone('');
    setCompanyWebsite('');
    setJobLocation('');
    setTargetRateRange('');
    setJobScopeDescription('');
  };

  return (
    <div className="bg-[#F8FAFC]">
      {/* Header */}
      <section className="bg-[#10243A] text-white py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D6A84B]">
            <Building2 className="w-3.5 h-3.5" />
            <span>Employer Solutions & Talent Acquisition</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Build Your Team. Accelerate Your Growth.
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Partner with Air Dive Group to access specialized, pre-screened talent across the United States. Submit your hiring requirements below and connect with a dedicated practice lead within 24 hours.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Value Prop & Guarantees */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1769AA]">
                The Employer Advantage
              </span>
              <h2 className="text-2xl font-bold text-[#10243A]">
                Why US Hiring Managers Trust Air Dive Group
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                We eliminate the friction of recruitment. From high-speed contractor submittals to discreet executive leadership searches, we tailor our delivery to your deadlines and corporate culture.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#1769AA]/10 text-[#1769AA] flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#10243A]">Rapid 24-48 Hour Submittals</h4>
                    <p className="text-xs text-slate-500">Pre-screened dossiers delivered with recruiter calibration notes.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#1769AA]/10 text-[#1769AA] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#10243A]">100% Verified Compliance</h4>
                    <p className="text-xs text-slate-500">I-9, E-Verify, background investigations, drug screens, and credit audits.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#1769AA]/10 text-[#1769AA] flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#10243A]">Guaranteed Placement Security</h4>
                    <p className="text-xs text-slate-500">Direct-hire replacement guarantees protect your capital investment.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Line Card */}
            <div className="bg-[#10243A] text-white rounded-2xl p-6 border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-[#D6A84B] uppercase tracking-wide">
                Direct Practice Lead Line
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Have an urgent opening or confidential C-Suite search requiring immediate consultation?
              </p>
              <div className="space-y-2 text-xs pt-1">
                <div className="flex items-center gap-2 text-slate-200">
                  <Phone className="w-4 h-4 text-[#D6A84B]" />
                  <span>(404) 555-0100 (Ext. 1 for Enterprise Accounts)</span>
                </div>
                <div className="flex items-center gap-2 text-slate-200">
                  <Mail className="w-4 h-4 text-[#D6A84B]" />
                  <span>employers@airdivegroup.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Hiring Request Form */}
          <div className="lg:col-span-7">
            {submittedInquiry ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-md space-y-6 text-center animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                    Hiring Inquiry Received
                  </span>
                  <h3 className="text-2xl font-bold text-[#10243A]">
                    Thank You, {submittedInquiry.contactName}!
                  </h3>
                  <p className="text-sm text-slate-600 max-w-lg mx-auto">
                    Your staffing requirements for <span className="font-semibold text-[#10243A]">{submittedInquiry.companyName}</span> have been registered in our ATS database under tracking ID <span className="font-mono font-bold text-[#1769AA]">{submittedInquiry.id}</span>.
                  </p>
                </div>

                <div className="bg-[#F8FAFC] rounded-xl p-5 border border-slate-200 text-left text-xs space-y-2 max-w-md mx-auto">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Service Model:</span>
                    <span className="font-bold text-slate-800">{submittedInquiry.staffingService}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Industry Practice:</span>
                    <span className="font-bold text-slate-800">{submittedInquiry.industry}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Positions Count:</span>
                    <span className="font-bold text-slate-800">{submittedInquiry.openPositionsCount} opening(s)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Workplace Format:</span>
                    <span className="font-bold text-slate-800">{submittedInquiry.workplaceType}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-500">
                  A specialized Air Dive Group practice director will review your scope and initiate contact within 24 hours.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                  <button
                    onClick={resetForm}
                    className="px-6 py-2.5 text-xs font-bold text-white bg-[#10243A] hover:bg-[#1769AA] rounded-md transition-colors cursor-pointer"
                  >
                    Submit Another Opening
                  </button>
                  <button
                    onClick={() => onNavigate('home')}
                    className="px-6 py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors cursor-pointer"
                  >
                    Return to Homepage
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-xs">
                <div className="border-b border-slate-100 pb-5 mb-6">
                  <h3 className="text-xl font-bold text-[#10243A]">
                    Request Staffing Support & Candidate Calibrations
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Provide the specifications for your hiring requirements. All submissions are treated under strict confidentiality.
                  </p>
                </div>

                {error && (
                  <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                    <span>{error}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Company & Contact Section */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="e.g. Acme Health Technologies"
                        className="w-full px-3.5 py-2.5 text-xs rounded-md border border-slate-300 focus:border-[#1769AA] focus:ring-2 focus:ring-[#1769AA]/20 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Company Website (Optional)
                      </label>
                      <input
                        type="text"
                        value={companyWebsite}
                        onChange={(e) => setCompanyWebsite(e.target.value)}
                        placeholder="https://example.com"
                        className="w-full px-3.5 py-2.5 text-xs rounded-md border border-slate-300 focus:border-[#1769AA] focus:ring-2 focus:ring-[#1769AA]/20 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="e.g. Rachel Adams"
                        className="w-full px-3.5 py-2.5 text-xs rounded-md border border-slate-300 focus:border-[#1769AA] focus:ring-2 focus:ring-[#1769AA]/20 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Your Title / Role
                      </label>
                      <input
                        type="text"
                        value={contactTitle}
                        onChange={(e) => setContactTitle(e.target.value)}
                        placeholder="e.g. VP of Human Capital / Director of IT"
                        className="w-full px-3.5 py-2.5 text-xs rounded-md border border-slate-300 focus:border-[#1769AA] focus:ring-2 focus:ring-[#1769AA]/20 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Corporate Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={workEmail}
                        onChange={(e) => setWorkEmail(e.target.value)}
                        placeholder="radams@acmehealth.com"
                        className="w-full px-3.5 py-2.5 text-xs rounded-md border border-slate-300 focus:border-[#1769AA] focus:ring-2 focus:ring-[#1769AA]/20 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(404) 555-0199"
                        className="w-full px-3.5 py-2.5 text-xs rounded-md border border-slate-300 focus:border-[#1769AA] focus:ring-2 focus:ring-[#1769AA]/20 outline-none"
                      />
                    </div>
                  </div>

                  {/* Service & Industry Selection */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Target Industry Practice *
                      </label>
                      <select
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value as IndustryType)}
                        className="w-full px-3.5 py-2.5 text-xs rounded-md border border-slate-300 focus:border-[#1769AA] focus:ring-2 focus:ring-[#1769AA]/20 outline-none bg-white"
                      >
                        {INDUSTRIES_SERVED.map((ind) => (
                          <option key={ind.id} value={ind.name}>{ind.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Staffing Delivery Model *
                      </label>
                      <select
                        value={staffingService}
                        onChange={(e) => setStaffingService(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs rounded-md border border-slate-300 focus:border-[#1769AA] focus:ring-2 focus:ring-[#1769AA]/20 outline-none bg-white"
                      >
                        {STAFFING_SERVICES.map((serv) => (
                          <option key={serv.id} value={serv.title}>{serv.title}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Position Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Number of Positions
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={100}
                        value={openPositionsCount}
                        onChange={(e) => setOpenPositionsCount(Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 text-xs rounded-md border border-slate-300 focus:border-[#1769AA] focus:ring-2 focus:ring-[#1769AA]/20 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Target Start Date
                      </label>
                      <input
                        type="text"
                        value={targetStartDate}
                        onChange={(e) => setTargetStartDate(e.target.value)}
                        placeholder="e.g. Within 2 weeks / Nov 15"
                        className="w-full px-3.5 py-2.5 text-xs rounded-md border border-slate-300 focus:border-[#1769AA] focus:ring-2 focus:ring-[#1769AA]/20 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Workplace Format
                      </label>
                      <select
                        value={workplaceType}
                        onChange={(e) => setWorkplaceType(e.target.value as any)}
                        className="w-full px-3.5 py-2.5 text-xs rounded-md border border-slate-300 focus:border-[#1769AA] focus:ring-2 focus:ring-[#1769AA]/20 outline-none bg-white"
                      >
                        <option value="Hybrid">Hybrid</option>
                        <option value="Remote">100% Remote</option>
                        <option value="On-site">On-site</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Job Location (City, State)
                      </label>
                      <input
                        type="text"
                        value={jobLocation}
                        onChange={(e) => setJobLocation(e.target.value)}
                        placeholder="e.g. Atlanta, GA or Austin, TX"
                        className="w-full px-3.5 py-2.5 text-xs rounded-md border border-slate-300 focus:border-[#1769AA] focus:ring-2 focus:ring-[#1769AA]/20 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Target Compensation / Bill Rate
                      </label>
                      <input
                        type="text"
                        value={targetRateRange}
                        onChange={(e) => setTargetRateRange(e.target.value)}
                        placeholder="e.g. $130k-$150k or $70-$85/hr"
                        className="w-full px-3.5 py-2.5 text-xs rounded-md border border-slate-300 focus:border-[#1769AA] focus:ring-2 focus:ring-[#1769AA]/20 outline-none"
                      />
                    </div>
                  </div>

                  {/* Scope Description */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Role Scope, Key Requirements & Responsibilities *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={jobScopeDescription}
                      onChange={(e) => setJobScopeDescription(e.target.value)}
                      placeholder="Describe the technical competencies, deliverables, team structure, and any urgent timeline requirements..."
                      className="w-full px-3.5 py-2.5 text-xs rounded-md border border-slate-300 focus:border-[#1769AA] focus:ring-2 focus:ring-[#1769AA]/20 outline-none"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="nda"
                      checked={ndaRequired}
                      onChange={(e) => setNdaRequired(e.target.checked)}
                      className="rounded border-slate-300 text-[#1769AA] focus:ring-[#1769AA]"
                    />
                    <label htmlFor="nda" className="text-xs text-slate-600 select-none">
                      Require mutual non-disclosure agreement (NDA) prior to candidate dossier delivery
                    </label>
                  </div>

                  <div className="pt-3">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 px-6 text-sm font-bold text-white bg-[#10243A] hover:bg-[#1769AA] rounded-md transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {loading ? (
                        <span>Submitting Requirements to ATS...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-[#D6A84B]" />
                          <span>Submit Hiring Requirements</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-[11px] text-slate-500 text-center">
                    Air Dive Group adheres to US Equal Employment Opportunity regulations and strict client privacy protocols.
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
