import React, { useState } from 'react';
import { NavView } from '../layout/Navbar';
import { COMPANY_FACTS } from '../../data/mockData';
import { StorageService } from '../../services/storageService';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  MessageSquare,
  Globe2,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

interface ContactPageProps {
  onNavigate: (view: NavView) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [inquiryType, setInquiryType] = useState<'employer' | 'candidate' | 'general'>('employer');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      // If employer, also register as inquiry in storage
      if (inquiryType === 'employer') {
        StorageService.submitEmployerInquiry({
          companyName: company || 'Prospective Enterprise Client',
          contactName: name,
          contactTitle: 'Direct Inquirer',
          workEmail: email,
          phone: phone || '(N/A)',
          industry: 'Information Technology',
          staffingService: 'Direct Hire / SOW Inbound',
          openPositionsCount: 1,
          targetStartDate: 'Immediate',
          jobLocation: 'US Office / Remote',
          workplaceType: 'Hybrid',
          targetRateRange: 'Market Rate',
          jobScopeDescription: message
        });
      }

      setLoading(false);
      setSubmitted(true);
    }, 500);
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Header */}
      <section className="bg-[#10243A] text-white py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D6A84B]">
            <Building2 className="w-3.5 h-3.5" />
            <span>Corporate Communications</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Contact Air Dive Group
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Reach our national practice leaders in Atlanta, GA or connect with our regional talent acquisition teams across the United States.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Office info & Interactive Map Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1769AA]">
                National Headquarters
              </span>
              <h2 className="text-xl font-bold text-[#10243A]">
                Corporate Office Details
              </h2>

              <div className="space-y-4 text-xs text-slate-700">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#1769AA]/10 text-[#1769AA] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-[#10243A] block">Headquarters:</span>
                    <p className="text-slate-600 leading-relaxed">{COMPANY_FACTS.headquarters}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#1769AA]/10 text-[#1769AA] flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-[#10243A] block">Main Switchboard:</span>
                    <p className="text-slate-600 font-mono">{COMPANY_FACTS.phone}</p>
                    <span className="text-[10px] text-slate-400">Toll-free corporate verification line</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#1769AA]/10 text-[#1769AA] flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-[#10243A] block">Inquiries & Proposals:</span>
                    <p className="text-[#1769AA] font-semibold">{COMPANY_FACTS.email}</p>
                    <p className="text-slate-500 text-[11px]">Candidates: {COMPANY_FACTS.careersEmail}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#1769AA]/10 text-[#1769AA] flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-[#10243A] block">Business Hours:</span>
                    <p className="text-slate-600">{COMPANY_FACTS.workingHours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Location / Map Card */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="h-48 bg-slate-100 relative flex items-center justify-center">
                {/* SVG City Map Styling */}
                <svg className="w-full h-full opacity-60" viewBox="0 0 400 200" fill="none">
                  <rect width="400" height="200" fill="#E2E8F0" />
                  <path d="M0 60H400M0 120H400M0 180H400" stroke="#CBD5E1" strokeWidth="4" />
                  <path d="M80 0V200M180 0V200M280 0V200M360 0V200" stroke="#CBD5E1" strokeWidth="4" />
                  <path d="M50 0L350 200" stroke="#94A3B8" strokeWidth="6" strokeOpacity="0.4" />
                  <path d="M350 0L50 200" stroke="#94A3B8" strokeWidth="6" strokeOpacity="0.4" />
                  <circle cx="200" cy="100" r="12" fill="#1769AA" />
                  <circle cx="200" cy="100" r="24" stroke="#1769AA" strokeWidth="2" strokeDasharray="4 4" />
                  <circle cx="200" cy="100" r="5" fill="#D6A84B" />
                </svg>

                <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 to-transparent flex items-end p-4">
                  <div className="text-white text-xs space-y-0.5">
                    <span className="font-bold block">Peachtree St NW · Midtown Atlanta, GA</span>
                    <span className="text-[11px] text-slate-300">Corporate Executive Suite & Meeting Center</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 flex items-center justify-between text-xs">
                <span className="text-slate-500">Need driving directions or security clearance?</span>
                <span className="font-bold text-[#1769AA]">Contact Reception</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact & Inquiry Router Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-xs">
              {submitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-[#10243A]">
                    Message Transmitted
                  </h3>
                  <p className="text-xs text-slate-600 max-w-md mx-auto">
                    Thank you, {name}. Your inquiry has been routed to our practice operations team. We will respond promptly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setMessage('');
                    }}
                    className="px-5 py-2 text-xs font-bold text-white bg-[#10243A] hover:bg-[#1769AA] rounded-md transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <h3 className="text-xl font-bold text-[#10243A]">
                      Send an Inquiry to Air Dive Group
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Select your inquiry category for prioritized routing.
                    </p>
                  </div>

                  {/* Inquiry Type Radio / Pill Selector */}
                  <div className="grid grid-cols-3 gap-2 p-1 bg-slate-100 rounded-lg text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => setInquiryType('employer')}
                      className={`py-2 px-3 rounded-md transition-all cursor-pointer ${
                        inquiryType === 'employer'
                          ? 'bg-white text-[#10243A] shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Hire Talent
                    </button>
                    <button
                      type="button"
                      onClick={() => setInquiryType('candidate')}
                      className={`py-2 px-3 rounded-md transition-all cursor-pointer ${
                        inquiryType === 'candidate'
                          ? 'bg-white text-[#10243A] shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Career / Jobs
                    </button>
                    <button
                      type="button"
                      onClick={() => setInquiryType('general')}
                      className={`py-2 px-3 rounded-md transition-all cursor-pointer ${
                        inquiryType === 'general'
                          ? 'bg-white text-[#10243A] shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      General Contact
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Jordan Mitchell"
                        className="w-full px-3.5 py-2.5 text-xs rounded-md border border-slate-300 focus:border-[#1769AA] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="jordan@example.com"
                        className="w-full px-3.5 py-2.5 text-xs rounded-md border border-slate-300 focus:border-[#1769AA] outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(404) 555-0144"
                        className="w-full px-3.5 py-2.5 text-xs rounded-md border border-slate-300 focus:border-[#1769AA] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        {inquiryType === 'employer' ? 'Company Name *' : 'Organization (Optional)'}
                      </label>
                      <input
                        type="text"
                        required={inquiryType === 'employer'}
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="e.g. Acme Corporation"
                        className="w-full px-3.5 py-2.5 text-xs rounded-md border border-slate-300 focus:border-[#1769AA] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Your Message or Staffing Requirements *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please describe how we can assist your organization or career..."
                      className="w-full px-3.5 py-2.5 text-xs rounded-md border border-slate-300 focus:border-[#1769AA] outline-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 px-6 text-sm font-bold text-white bg-[#10243A] hover:bg-[#1769AA] rounded-md transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {loading ? (
                        <span>Transmitting Message...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-[#D6A84B]" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
