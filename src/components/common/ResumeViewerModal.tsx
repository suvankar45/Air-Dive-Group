import React from 'react';
import { Application, CandidateProfile } from '../../types';
import { 
  X, 
  FileText, 
  Download, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  ShieldCheck, 
  Calendar 
} from 'lucide-react';

interface ResumeViewerModalProps {
  candidate?: CandidateProfile | null;
  application?: Application | null;
  onClose: () => void;
}

export const ResumeViewerModal: React.FC<ResumeViewerModalProps> = ({
  candidate,
  application,
  onClose
}) => {
  if (!candidate && !application) return null;

  const name = candidate?.fullName || application?.candidateName || 'Candidate';
  const email = candidate?.email || application?.email || '';
  const phone = candidate?.phone || application?.phone || '';
  const location = candidate ? `${candidate.city}, ${candidate.state}` : application?.location || '';
  const title = candidate?.preferredJobTitle || application?.currentTitle || 'Professional';
  const experienceYears = candidate?.experienceYears || application?.experienceYears || 5;
  const fileName = candidate?.resumeFileName || application?.resumeFileName || 'Resume.pdf';
  const fileSize = candidate?.resumeFileSize || application?.resumeFileSize || '220 KB';

  const handleDownload = () => {
    // Generate synthetic downloadable resume text file for candidate
    const resumeText = `
============================================================
AIR DIVE GROUP - VERIFIED CANDIDATE PROFILE DOSSIER
============================================================
Candidate Name: ${name}
Title: ${title}
Contact Email: ${email}
Phone: ${phone}
Location: ${location}
Total Experience: ${experienceYears} Years
${candidate ? `US Work Authorization: ${candidate.workAuthorization}` : ''}
${candidate ? `Highest Education: ${candidate.education}` : ''}
${candidate ? `Target Compensation: ${candidate.targetSalary}` : ''}

KEY COMPETENCIES & TECHNICAL PROFICIENCIES:
${candidate?.skills ? candidate.skills.map(s => `- ${s}`).join('\n') : '- Cloud & Technical Architecture\n- Enterprise Delivery'}

PROFESSIONAL SUMMARY:
Accomplished professional with ${experienceYears}+ years of progressive experience delivering high-impact solutions, collaborating across cross-functional US teams, and driving organizational success.

============================================================
Verified through Air Dive Group ATS Platform
Atlanta, GA · Nationwide US Staffing Solutions
============================================================
    `.trim();

    const blob = new Blob([resumeText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName.replace(/\.[^/.]+$/, "") + ".txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="bg-[#10243A] text-white p-6 flex items-start justify-between shrink-0">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#D6A84B]">
              Candidate Resume & Dossier Review
            </span>
            <h3 className="text-xl font-bold text-white">
              {name}
            </h3>
            <p className="text-xs text-slate-300">
              {title} · {location}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#10243A] bg-white hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
              title="Download dossier"
            >
              <Download className="w-3.5 h-3.5 text-[#1769AA]" />
              <span>Download</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content - Printable Clean Resume Sheet */}
        <div className="p-8 overflow-y-auto space-y-6 text-[#10243A]">
          {/* File Meta bar */}
          <div className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#1769AA]/10 text-[#1769AA] flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#10243A] block">
                  {fileName}
                </span>
                <span className="text-[11px] text-slate-500 font-mono">
                  {fileSize} · Verified ATS Upload
                </span>
              </div>
            </div>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              Active Candidate File
            </span>
          </div>

          {/* Quick Contact Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-slate-50 p-3.5 rounded-lg border border-slate-200/80">
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#1769AA]" />
              <span className="truncate">{email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#1769AA]" />
              <span>{phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#1769AA]" />
              <span>{location}</span>
            </div>
          </div>

          {/* Professional Overview */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Executive Summary
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed bg-[#F8FAFC] p-4 rounded-lg border border-slate-200">
              Versatile and results-oriented professional offering {experienceYears}+ years of demonstrated accomplishment. Proven track record of cross-functional collaboration, technical execution, and alignment with organizational goals. Known for exceptional communication, accountability, and problem-solving velocity.
            </p>
          </div>

          {/* Skills Breakdown */}
          {candidate?.skills && candidate.skills.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Core Competencies & Technologies
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {candidate.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Verification & Compliance */}
          {candidate && (
            <div className="grid grid-cols-2 gap-4 text-xs pt-2 border-t border-slate-100">
              <div className="space-y-1">
                <span className="text-slate-400 font-semibold block text-[11px]">US Work Authorization:</span>
                <span className="font-bold text-slate-800">{candidate.workAuthorization}</span>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 font-semibold block text-[11px]">Target Compensation:</span>
                <span className="font-bold text-slate-800">{candidate.targetSalary}</span>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 font-semibold block text-[11px]">Workplace Preference:</span>
                <span className="font-bold text-slate-800">{candidate.preferredWorkplace} ({candidate.preferredWorkType})</span>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 font-semibold block text-[11px]">Education:</span>
                <span className="font-bold text-slate-800">{candidate.education}</span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-[#F8FAFC] p-4 border-t border-slate-200 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-slate-500">
            Air Dive Group Proprietary Candidate File · Formatted for Recruiter Review
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#10243A] hover:bg-[#1769AA] text-white text-xs font-bold rounded-md transition-colors cursor-pointer"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};
