import React, { useState } from 'react';
import { Job, Application } from '../../types';
import { StorageService } from '../../services/storageService';
import confetti from 'canvas-confetti';
import { 
  X, 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  Building2, 
  MapPin, 
  DollarSign, 
  Send,
  AlertCircle 
} from 'lucide-react';

interface ApplyModalProps {
  job: Job | null;
  onClose: () => void;
  onAppliedSuccess?: (application: Application) => void;
}

export const ApplyModal: React.FC<ApplyModalProps> = ({ job, onClose, onAppliedSuccess }) => {
  if (!job) return null;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [currentTitle, setCurrentTitle] = useState('');
  const [experienceYears, setExperienceYears] = useState<number>(4);
  const [resumeFile, setResumeFile] = useState<{ name: string; size: string; dataUrl?: string } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedApp, setSubmittedApp] = useState<Application | null>(null);

  const processFile = (file: File) => {
    if (!file.name.match(/\.(pdf|doc|docx|txt)$/i)) {
      setError('Please attach a PDF, DOC, DOCX, or TXT document.');
      return;
    }
    setError(null);
    const sizeStr = (file.size / 1024).toFixed(0) + ' KB';

    const reader = new FileReader();
    reader.onload = () => {
      setResumeFile({
        name: file.name,
        size: sizeStr,
        dataUrl: reader.result as string
      });
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError('Please provide your name, email, and phone number.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      try {
        const app = StorageService.submitApplication({
          jobId: job.id,
          jobTitle: job.title,
          candidateName: name,
          email,
          phone,
          location: location || 'Greater US Hub',
          currentTitle: currentTitle || 'Candidate',
          experienceYears: Number(experienceYears) || 3,
          resumeFileName: resumeFile ? resumeFile.name : `${name.replace(/\s+/g, '_')}_Resume.pdf`,
          resumeFileSize: resumeFile ? resumeFile.size : '210 KB',
          resumeDataUrl: resumeFile?.dataUrl
        });

        setSubmittedApp(app);
        setIsSubmitted(true);
        setLoading(false);

        if (onAppliedSuccess) {
          onAppliedSuccess(app);
        }

        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.6 }
          });
        } catch {}
      } catch (err: any) {
        setError('Error submitting application. Please try again.');
        setLoading(false);
      }
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-xl overflow-hidden animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="bg-[#10243A] text-white p-6 flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#D6A84B]">
              Direct Candidate Application
            </span>
            <h3 className="text-lg font-bold text-white">
              {job.title}
            </h3>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <Building2 className="w-3.5 h-3.5 text-slate-400" />
              <span>{job.clientConfidential ? 'Client Confidential (Air Dive Exclusive)' : job.company}</span>
              <span>·</span>
              <span>{job.location}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {isSubmitted && submittedApp ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xl font-bold text-[#10243A]">
                  Application Submitted!
                </h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Your application for <span className="font-semibold text-[#10243A]">{job.title}</span> has been routed to the lead recruiter under Reference <span className="font-mono font-bold text-[#1769AA]">{submittedApp.id}</span>.
                </p>
              </div>

              <div className="bg-[#F8FAFC] rounded-lg p-3 text-xs text-slate-600 max-w-xs mx-auto border border-slate-200">
                <span>Resume: {submittedApp.resumeFileName}</span>
              </div>

              <div className="pt-4">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#10243A] hover:bg-[#1769AA] text-white text-xs font-bold rounded-md transition-colors cursor-pointer"
                >
                  Close & Continue Browsing
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Full Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jordan Mitchell"
                    className="w-full px-3 py-2 text-xs rounded-md border border-slate-300 focus:border-[#1769AA] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jordan@example.com"
                    className="w-full px-3 py-2 text-xs rounded-md border border-slate-300 focus:border-[#1769AA] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(404) 555-0144"
                    className="w-full px-3 py-2 text-xs rounded-md border border-slate-300 focus:border-[#1769AA] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Current Location (City, State)
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Atlanta, GA"
                    className="w-full px-3 py-2 text-xs rounded-md border border-slate-300 focus:border-[#1769AA] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Current Job Title
                  </label>
                  <input
                    type="text"
                    value={currentTitle}
                    onChange={(e) => setCurrentTitle(e.target.value)}
                    placeholder="Senior Architect"
                    className="w-full px-3 py-2 text-xs rounded-md border border-slate-300 focus:border-[#1769AA] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Total Years of Experience
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={40}
                    value={experienceYears}
                    onChange={(e) => setExperienceYears(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-md border border-slate-300 focus:border-[#1769AA] outline-none"
                  />
                </div>
              </div>

              {/* Resume Upload Drop Area */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Upload Resume (.pdf, .doc, .docx)
                </label>

                {resumeFile ? (
                  <div className="bg-[#F8FAFC] border border-[#1769AA]/40 rounded-lg p-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#1769AA]" />
                      <span className="font-semibold text-slate-800 truncate max-w-[240px]">
                        {resumeFile.name}
                      </span>
                      <span className="text-slate-400 text-[10px]">({resumeFile.size})</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setResumeFile(null)}
                      className="text-slate-400 hover:text-red-500 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    className={`border border-dashed rounded-lg p-4 text-center ${
                      isDragging ? 'border-[#1769AA] bg-blue-50/50' : 'border-slate-300 bg-slate-50/50'
                    }`}
                  >
                    <UploadCloud className="w-6 h-6 text-[#1769AA] mx-auto mb-1 opacity-75" />
                    <p className="text-xs text-slate-600">
                      Drag & drop your resume, or{' '}
                      <label className="text-[#1769AA] font-bold hover:underline cursor-pointer">
                        browse file
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx,.txt"
                          onChange={(e) => {
                            if (e.target.files?.[0]) processFile(e.target.files[0]);
                          }}
                          className="hidden"
                        />
                      </label>
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-md cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 text-xs font-bold text-white bg-[#10243A] hover:bg-[#1769AA] rounded-md transition-all shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <span>Submitting Application...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 text-[#D6A84B]" />
                      <span>Submit Application</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
