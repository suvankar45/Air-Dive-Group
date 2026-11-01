import React, { useState } from 'react';
import { NavView } from '../layout/Navbar';
import { IndustryType, CandidateProfile } from '../../types';
import { StorageService } from '../../services/storageService';
import { INDUSTRIES_SERVED } from '../../data/mockData';
import confetti from 'canvas-confetti';
import { 
  UserCheck, 
  FileUp, 
  CheckCircle2, 
  ShieldCheck, 
  Briefcase, 
  Search, 
  UploadCloud, 
  FileText, 
  X, 
  AlertCircle,
  Lock
} from 'lucide-react';

interface CandidatesPageProps {
  onNavigate: (view: NavView) => void;
}

export const CandidatesPage: React.FC<CandidatesPageProps> = ({ onNavigate }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('GA');
  const [zipCode, setZipCode] = useState('');
  const [preferredJobTitle, setPreferredJobTitle] = useState('');
  const [industry, setIndustry] = useState<IndustryType>('Information Technology');
  const [preferredWorkType, setPreferredWorkType] = useState<'Direct Hire' | 'Contract' | 'Any'>('Direct Hire');
  const [preferredWorkplace, setPreferredWorkplace] = useState<'Remote' | 'Hybrid' | 'On-site' | 'Open to Any'>('Hybrid');
  const [experienceYears, setExperienceYears] = useState<number>(5);
  const [currentCompany, setCurrentCompany] = useState('');
  const [education, setEducation] = useState('Bachelor’s Degree');
  const [skillsInput, setSkillsInput] = useState('');
  const [workAuthorization, setWorkAuthorization] = useState<CandidateProfile['workAuthorization']>('US Citizen');
  const [targetSalary, setTargetSalary] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [consent, setConsent] = useState(false);

  // File upload state
  const [resumeFile, setResumeFile] = useState<{ name: string; size: string; dataUrl?: string } | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedCandidate, setSubmittedCandidate] = useState<CandidateProfile | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    if (!file.name.match(/\.(pdf|doc|docx|txt)$/i)) {
      setError('Please upload a PDF, DOC, DOCX, or TXT resume document.');
      return;
    }
    setError(null);
    const sizeInKb = (file.size / 1024).toFixed(0) + ' KB';

    const reader = new FileReader();
    reader.onload = () => {
      setResumeFile({
        name: file.name,
        size: sizeInKb,
        dataUrl: reader.result as string
      });
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim() || !email.trim() || !phone.trim() || !city.trim() || !preferredJobTitle.trim()) {
      setError('Please fill in all required personal and professional fields.');
      return;
    }

    if (!consent) {
      setError('Please acknowledge the consent and data processing notice.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      try {
        const skillsArray = skillsInput
          ? skillsInput.split(',').map(s => s.trim()).filter(Boolean)
          : ['Professional Experience', preferredJobTitle];

        const saved = StorageService.addCandidate({
          fullName,
          email,
          phone,
          city,
          state,
          zipCode,
          preferredJobTitle,
          industry,
          preferredWorkType,
          preferredWorkplace,
          experienceYears: Number(experienceYears) || 3,
          currentCompany,
          education,
          skills: skillsArray,
          workAuthorization,
          targetSalary: targetSalary || 'Competitive Market Rate',
          linkedinUrl,
          resumeFileName: resumeFile ? resumeFile.name : `${fullName.replace(/\s+/g, '_')}_Resume.pdf`,
          resumeFileSize: resumeFile ? resumeFile.size : '210 KB',
          resumeDataUrl: resumeFile?.dataUrl,
          additionalNotes
        });

        setSubmittedCandidate(saved);
        setLoading(false);

        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.6 }
          });
        } catch {}
      } catch (err: any) {
        setError('Failed to register candidate profile. Please try again.');
        setLoading(false);
      }
    }, 600);
  };

  const resetForm = () => {
    setSubmittedCandidate(null);
    setResumeFile(null);
    setFullName('');
    setEmail('');
    setPhone('');
    setPreferredJobTitle('');
    setSkillsInput('');
    setAdditionalNotes('');
  };

  return (
    <div className="bg-[#F8FAFC]">
      {/* Header */}
      <section className="bg-[#10243A] text-white py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D6A84B]">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Candidate Career Advancement</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Your Next Career Opportunity Starts Here.
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Submit your resume and candidate profile to Air Dive Group. Our dedicated recruiters match qualified professionals with high-impact roles across premier US employers.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Candidate Guarantees & Process */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1769AA]">
                Candidate Representation
              </span>
              <h2 className="text-2xl font-bold text-[#10243A]">
                How We Advocate for Your Career
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                At Air Dive Group, candidate representation is 100% free, fully confidential, and relationship-driven. We never submit your resume to an employer without your explicit prior consent.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#1769AA]/10 text-[#1769AA] flex items-center justify-center shrink-0">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#10243A]">Strict Privacy & Discretion</h4>
                    <p className="text-xs text-slate-500">Your current employer will never know you are exploring new career paths.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#1769AA]/10 text-[#1769AA] flex items-center justify-center shrink-0">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#10243A]">Unadvertised Positions</h4>
                    <p className="text-xs text-slate-500">Gain access to exclusive direct-hire and executive searches not listed on job boards.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#1769AA]/10 text-[#1769AA] flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#10243A]">Salary & Negotiation Advocacy</h4>
                    <p className="text-xs text-slate-500">We benchmark your market value and negotiate equitable compensation packages.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Job Search Link */}
            <div className="bg-[#F4F7FA] border border-slate-200 rounded-2xl p-6 text-center space-y-3">
              <h4 className="text-sm font-bold text-[#10243A]">Prefer to browse active listings first?</h4>
              <p className="text-xs text-slate-600">
                Explore our national job board with transparent compensation and remote/hybrid filters.
              </p>
              <button
                onClick={() => onNavigate('jobs')}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-slate-50 text-[#10243A] font-bold text-xs rounded-md border border-slate-300 shadow-xs cursor-pointer"
              >
                <Search className="w-3.5 h-3.5 text-[#1769AA]" />
                <span>Search Open Positions</span>
              </button>
            </div>
          </div>

          {/* Right Column: Candidate Profile & Resume Submission Form */}
          <div className="lg:col-span-7">
            {submittedCandidate ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-md space-y-6 text-center animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                    Profile Successfully Registered
                  </span>
                  <h3 className="text-2xl font-bold text-[#10243A]">
                    Welcome to Air Dive Group, {submittedCandidate.fullName}!
                  </h3>
                  <p className="text-sm text-slate-600 max-w-lg mx-auto">
                    Your candidate profile has been secured in our recruiter talent database under Candidate ID <span className="font-mono font-bold text-[#1769AA]">{submittedCandidate.id}</span>.
                  </p>
                </div>

                <div className="bg-[#F8FAFC] rounded-xl p-5 border border-slate-200 text-left text-xs space-y-2 max-w-md mx-auto">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Target Role:</span>
                    <span className="font-bold text-slate-800">{submittedCandidate.preferredJobTitle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Industry:</span>
                    <span className="font-bold text-slate-800">{submittedCandidate.industry}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Work Authorization:</span>
                    <span className="font-bold text-slate-800">{submittedCandidate.workAuthorization}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Resume Attached:</span>
                    <span className="font-mono text-slate-700 truncate max-w-[200px]">{submittedCandidate.resumeFileName}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-500">
                  Our recruiting team reviews submissions continuously. When an opportunity matching your skills and salary expectations becomes active, a recruiter will reach out directly.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                  <button
                    onClick={() => onNavigate('jobs')}
                    className="px-6 py-2.5 text-xs font-bold text-white bg-[#10243A] hover:bg-[#1769AA] rounded-md transition-colors cursor-pointer"
                  >
                    Explore Current Jobs
                  </button>
                  <button
                    onClick={resetForm}
                    className="px-6 py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors cursor-pointer"
                  >
                    Submit Another Profile
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-xs">
                <div className="border-b border-slate-100 pb-5 mb-6">
                  <h3 className="text-xl font-bold text-[#10243A]">
                    Submit Candidate Profile & Resume
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Complete your candidate file to be matched with direct-hire, contract, and executive opportunities nationwide.
                  </p>
                </div>

                {error && (
                  <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                    <span>{error}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Contact Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Full Legal Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Jordan Mitchell"
                        className="w-full px-3.5 py-2.5 text-xs rounded-md border border-slate-300 focus:border-[#1769AA] focus:ring-2 focus:ring-[#1769AA]/20 outline-none"
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
                        placeholder="jordan.mitchell@example.com"
                        className="w-full px-3.5 py-2.5 text-xs rounded-md border border-slate-300 focus:border-[#1769AA] focus:ring-2 focus:ring-[#1769AA]/20 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(404) 555-0182"
                        className="w-full px-3.5 py-2.5 text-xs rounded-md border border-slate-300 focus:border-[#1769AA] focus:ring-2 focus:ring-[#1769AA]/20 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Current City *
                      </label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Atlanta"
                        className="w-full px-3.5 py-2.5 text-xs rounded-md border border-slate-300 focus:border-[#1769AA] focus:ring-2 focus:ring-[#1769AA]/20 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        State & ZIP Code
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          maxLength={2}
                          value={state}
                          onChange={(e) => setState(e.target.value.toUpperCase())}
                          placeholder="GA"
                          className="w-full px-2.5 py-2.5 text-xs rounded-md border border-slate-300 focus:border-[#1769AA] outline-none text-center font-bold"
                        />
                        <input
                          type="text"
                          maxLength={5}
                          value={zipCode}
                          onChange={(e) => setZipCode(e.target.value)}
                          placeholder="30309"
                          className="w-full px-2.5 py-2.5 text-xs rounded-md border border-slate-300 focus:border-[#1769AA] outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Career & Role Preferences */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Preferred Job Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={preferredJobTitle}
                        onChange={(e) => setPreferredJobTitle(e.target.value)}
                        placeholder="e.g. Senior Software Engineer / Financial Analyst"
                        className="w-full px-3.5 py-2.5 text-xs rounded-md border border-slate-300 focus:border-[#1769AA] focus:ring-2 focus:ring-[#1769AA]/20 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Primary Industry Specialization *
                      </label>
                      <select
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value as IndustryType)}
                        className="w-full px-3.5 py-2.5 text-xs rounded-md border border-slate-300 focus:border-[#1769AA] outline-none bg-white"
                      >
                        {INDUSTRIES_SERVED.map((ind) => (
                          <option key={ind.id} value={ind.name}>{ind.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Years of Experience
                      </label>
                      <input
                        type="number"
                        min={0}
                        max={40}
                        value={experienceYears}
                        onChange={(e) => setExperienceYears(Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 text-xs rounded-md border border-slate-300 focus:border-[#1769AA] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Workplace Preference
                      </label>
                      <select
                        value={preferredWorkplace}
                        onChange={(e) => setPreferredWorkplace(e.target.value as any)}
                        className="w-full px-3.5 py-2.5 text-xs rounded-md border border-slate-300 focus:border-[#1769AA] outline-none bg-white"
                      >
                        <option value="Hybrid">Hybrid</option>
                        <option value="Remote">100% Remote</option>
                        <option value="On-site">On-site</option>
                        <option value="Open to Any">Open to Any</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Employment Type
                      </label>
                      <select
                        value={preferredWorkType}
                        onChange={(e) => setPreferredWorkType(e.target.value as any)}
                        className="w-full px-3.5 py-2.5 text-xs rounded-md border border-slate-300 focus:border-[#1769AA] outline-none bg-white"
                      >
                        <option value="Direct Hire">Direct Hire (Full-Time)</option>
                        <option value="Contract">Contract / Consulting</option>
                        <option value="Any">Any / Open to Both</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        US Work Authorization *
                      </label>
                      <select
                        value={workAuthorization}
                        onChange={(e) => setWorkAuthorization(e.target.value as any)}
                        className="w-full px-3.5 py-2.5 text-xs rounded-md border border-slate-300 focus:border-[#1769AA] outline-none bg-white"
                      >
                        <option value="US Citizen">US Citizen</option>
                        <option value="Permanent Resident (Green Card)">Permanent Resident (Green Card)</option>
                        <option value="Employment Authorization Document (EAD)">Employment Authorization Document (EAD)</option>
                        <option value="H-1B Visa Holder">H-1B Visa Holder</option>
                        <option value="Other / Require Sponsorship">Other / Require Sponsorship</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Target Compensation / Salary Expectation
                      </label>
                      <input
                        type="text"
                        value={targetSalary}
                        onChange={(e) => setTargetSalary(e.target.value)}
                        placeholder="e.g. $120,000 / year or $65/hr"
                        className="w-full px-3.5 py-2.5 text-xs rounded-md border border-slate-300 focus:border-[#1769AA] outline-none"
                      />
                    </div>
                  </div>

                  {/* Skills and Specializations */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Core Skills & Technologies (Comma-separated)
                    </label>
                    <input
                      type="text"
                      value={skillsInput}
                      onChange={(e) => setSkillsInput(e.target.value)}
                      placeholder="e.g. AWS, Kubernetes, Terraform, Python, Microservices, CI/CD"
                      className="w-full px-3.5 py-2.5 text-xs rounded-md border border-slate-300 focus:border-[#1769AA] outline-none"
                    />
                  </div>

                  {/* Resume Upload Drag & Drop Area */}
                  <div className="pt-2 border-t border-slate-100">
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Resume Upload (.pdf, .doc, .docx, .txt) *
                    </label>

                    {resumeFile ? (
                      <div className="bg-[#F8FAFC] border border-[#1769AA]/40 rounded-xl p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-[#1769AA]/10 text-[#1769AA] flex items-center justify-center">
                            <FileText className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-xs font-bold text-[#10243A] block truncate max-w-xs sm:max-w-md">
                              {resumeFile.name}
                            </span>
                            <span className="text-[11px] text-slate-500 font-mono">
                              {resumeFile.size} · Uploaded & Ready
                            </span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setResumeFile(null)}
                          className="p-1.5 text-slate-400 hover:text-red-500 rounded-md cursor-pointer"
                          title="Remove file"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${
                          isDragging
                            ? 'border-[#1769AA] bg-[#1769AA]/5'
                            : 'border-slate-300 hover:border-slate-400 bg-slate-50/50'
                        }`}
                      >
                        <UploadCloud className="w-8 h-8 text-[#1769AA] mx-auto mb-2 opacity-80" />
                        <p className="text-xs font-bold text-slate-700 mb-1">
                          Drag and drop your resume here, or{' '}
                          <label className="text-[#1769AA] hover:underline cursor-pointer">
                            browse file
                            <input
                              type="file"
                              accept=".pdf,.doc,.docx,.txt"
                              onChange={handleFileChange}
                              className="hidden"
                            />
                          </label>
                        </p>
                        <p className="text-[11px] text-slate-500">
                          Supports PDF, Word (.doc, .docx), and plain text up to 10MB
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Additional Notes */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Additional Career Notes or Notice Period (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={additionalNotes}
                      onChange={(e) => setAdditionalNotes(e.target.value)}
                      placeholder="e.g. 2 weeks notice period; seeking remote roles or hybrid roles in Greater Atlanta; open to relocation..."
                      className="w-full px-3.5 py-2.5 text-xs rounded-md border border-slate-300 focus:border-[#1769AA] outline-none"
                    />
                  </div>

                  {/* Consent Checkbox */}
                  <div className="flex items-start gap-2.5 pt-1">
                    <input
                      type="checkbox"
                      id="candidate-consent"
                      required
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-0.5 rounded border-slate-300 text-[#1769AA] focus:ring-[#1769AA]"
                    />
                    <label htmlFor="candidate-consent" className="text-[11px] text-slate-600 leading-normal select-none">
                      I consent to Air Dive Group processing my resume and professional details for employment opportunities. I understand my information will be handled in accordance with US privacy standards and will never be shared without my prior approval.
                    </label>
                  </div>

                  <div className="pt-3">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 px-6 text-sm font-bold text-white bg-[#10243A] hover:bg-[#1769AA] rounded-md transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {loading ? (
                        <span>Registering Candidate File...</span>
                      ) : (
                        <>
                          <FileUp className="w-4 h-4 text-[#D6A84B]" />
                          <span>Submit Candidate Profile & Resume</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
