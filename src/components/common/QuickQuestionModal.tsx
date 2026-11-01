import React, { useState } from 'react';
import { StorageService } from '../../services/storageService';
import { QuickQuestion } from '../../types';
import { 
  X, 
  HelpCircle, 
  AlertCircle, 
  CheckCircle2, 
  Send, 
  ShieldCheck, 
  FileQuestion,
  Sparkles,
  Phone,
  Mail
} from 'lucide-react';

interface QuickQuestionModalProps {
  onClose: () => void;
  onSuccess?: (ticketNumber: string) => void;
}

export const QuickQuestionModal: React.FC<QuickQuestionModalProps> = ({ onClose, onSuccess }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [type, setType] = useState<QuickQuestion['type']>('Quick Question');
  const [urgency, setUrgency] = useState<QuickQuestion['urgency']>('Standard');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setError('Please fill in your name, email, subject, and question/concern details.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    setTimeout(() => {
      const created = StorageService.addQuickQuestion({
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        type,
        urgency,
        subject: subject.trim(),
        message: message.trim()
      });

      setIsSubmitting(false);
      setSubmittedTicket(created.ticketNumber);
      if (onSuccess) onSuccess(created.ticketNumber);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative bg-white rounded-xl shadow-2xl max-w-xl w-full border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="bg-[#10243A] text-white px-6 py-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#1769AA]/30 border border-[#1769AA]/60 flex items-center justify-center text-[#D6A84B]">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                Quick Question & Concern Desk
              </h3>
              <p className="text-xs text-slate-300">
                Direct inquiry routed directly to Air Dive Group Recruiter Administration
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submittedTicket ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xl font-bold text-[#10243A]">
                Inquiry Logged Successfully
              </h4>
              <p className="text-sm text-slate-600">
                Your question/concern has been logged with reference ticket:
              </p>
              <div className="inline-block mt-2 px-4 py-1.5 bg-slate-100 border border-slate-300 rounded font-mono font-bold text-sm text-[#10243A]">
                {submittedTicket}
              </div>
            </div>

            <p className="text-xs text-slate-500 max-w-md mx-auto pt-2">
              Our recruitment operations team reviews incoming inquiries throughout standard US business hours (8:00 AM – 6:00 PM EST). An administrator has been notified.
            </p>

            <div className="pt-4 flex justify-center">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#10243A] hover:bg-[#1769AA] text-white text-xs font-bold rounded-md transition-colors cursor-pointer shadow-xs"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-md flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Michael Vance"
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#1769AA]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#1769AA]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Phone (Optional)
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(555) 000-0000"
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#1769AA]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Category
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as QuickQuestion['type'])}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-[#1769AA]"
                >
                  <option value="Quick Question">Quick Question</option>
                  <option value="Concern / Issue">Concern / Issue</option>
                  <option value="Candidate Inquiry">Candidate Inquiry</option>
                  <option value="Employer Inquiry">Employer Inquiry</option>
                  <option value="Feedback">Feedback</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Urgency
                </label>
                <select
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value as QuickQuestion['urgency'])}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-[#1769AA]"
                >
                  <option value="Standard">Standard (Within 24h)</option>
                  <option value="High">High (Within 4-8h)</option>
                  <option value="Urgent">Urgent (Immediate attention)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Brief summary of your question or concern"
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#1769AA]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Details & Message <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Provide details about your question, candidate application, job requisition, or specific concern..."
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#1769AA] leading-relaxed resize-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-slate-100">
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Strictly confidential recruiter routing</span>
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-[#10243A] hover:bg-[#1769AA] rounded-md transition-colors cursor-pointer shadow-xs disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5 text-[#D6A84B]" />
                  <span>{isSubmitting ? 'Routing...' : 'Submit Inquiry'}</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
