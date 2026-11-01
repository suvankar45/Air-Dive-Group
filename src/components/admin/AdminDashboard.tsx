import React, { useState } from 'react';
import { Job, CandidateProfile, Application, EmployerInquiry, ApplicationStatus, IndustryType, JobType, ExperienceLevel, QuickQuestion, AdminAccount } from '../../types';
import { StorageService } from '../../services/storageService';
import { ResumeViewerModal } from '../common/ResumeViewerModal';
import { INDUSTRIES_SERVED } from '../../data/mockData';
import confetti from 'canvas-confetti';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  FileText, 
  Building2, 
  Search, 
  Plus, 
  Trash2, 
  Edit, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  ExternalLink, 
  FileUp, 
  Lock, 
  Unlock, 
  LogOut, 
  TrendingUp, 
  MessageSquare, 
  ChevronRight,
  Filter,
  Download,
  RotateCcw,
  Video,
  X,
  HelpCircle,
  Star,
  ShieldCheck,
  Send,
  AlertCircle,
  UserCheck,
  KeyRound,
  FileSpreadsheet
} from 'lucide-react';

interface AdminDashboardProps {
  onBackToSite: () => void;
  onRefreshData?: () => void;
  initialTab?: 'overview' | 'candidates' | 'jobs' | 'applications' | 'employers' | 'questions' | 'content';
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToSite, onRefreshData, initialTab = 'overview' }) => {
  // Auth state & Single-Slot Admin Provisioning
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => StorageService.isAdminLoggedIn());
  const [hasSlot, setHasSlot] = useState<boolean>(() => StorageService.hasAdminSlotAvailable());
  const [adminAccount, setAdminAccount] = useState<AdminAccount | null>(() => StorageService.getAdminAccount());
  const [authMode, setAuthMode] = useState<'login' | 'claim'>(() => StorageService.hasAdminSlotAvailable() ? 'claim' : 'login');

  // Single-slot Registration form state
  const [adminFullName, setAdminFullName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminConfirmPassword, setAdminConfirmPassword] = useState('');

  // Login form state
  const [loginEmail, setLoginEmail] = useState(() => StorageService.getAdminAccount()?.email || 'recruiter@airdivegroup.com');
  const [loginPassword, setLoginPassword] = useState(() => StorageService.getAdminAccount()?.password || 'admin');
  const [loginError, setLoginError] = useState<string | null>(null);

  // Active admin tab
  const [activeTab, setActiveTab] = useState<'overview' | 'candidates' | 'jobs' | 'applications' | 'employers' | 'questions' | 'content'>(initialTab);

  // Live Data State
  const [jobs, setJobs] = useState<Job[]>(() => StorageService.getJobs());
  const [candidates, setCandidates] = useState<CandidateProfile[]>(() => StorageService.getCandidates());
  const [applications, setApplications] = useState<Application[]>(() => StorageService.getApplications());
  const [employerInquiries, setEmployerInquiries] = useState<EmployerInquiry[]>(() => StorageService.getEmployerInquiries());
  const [quickQuestions, setQuickQuestions] = useState<QuickQuestion[]>(() => StorageService.getQuickQuestions());

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [questionStatusFilter, setQuestionStatusFilter] = useState('all');
  const [jobsFilter, setJobsFilter] = useState<'all' | 'featured' | 'published' | 'draft'>('all');

  // Modals
  const [viewingCandidate, setViewingCandidate] = useState<CandidateProfile | null>(null);
  const [viewingApp, setViewingApp] = useState<Application | null>(null);
  const [isCreateJobOpen, setIsCreateJobOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [scheduleInterviewApp, setScheduleInterviewApp] = useState<Application | null>(null);
  const [interviewDate, setInterviewDate] = useState('2026-11-06T14:00');
  const [interviewLink, setInterviewLink] = useState('https://meet.google.com/air-dive-search');

  // Question Reply Modal
  const [replyingQuestion, setReplyingQuestion] = useState<QuickQuestion | null>(null);
  const [replyText, setReplyText] = useState('');

  // Note Modal
  const [activeNoteTarget, setActiveNoteTarget] = useState<{ type: 'cand' | 'app' | 'inq' | 'question'; id: string; name: string } | null>(null);
  const [newNoteText, setNewNoteText] = useState('');

  // Refresh helper
  const reloadData = () => {
    setJobs(StorageService.getJobs());
    setCandidates(StorageService.getCandidates());
    setApplications(StorageService.getApplications());
    setEmployerInquiries(StorageService.getEmployerInquiries());
    setQuickQuestions(StorageService.getQuickQuestions());
    setHasSlot(StorageService.hasAdminSlotAvailable());
    setAdminAccount(StorageService.getAdminAccount());
    if (onRefreshData) onRefreshData();
  };

  // Auth Handlers
  const handleClaimSlot = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    if (adminPassword !== adminConfirmPassword) {
      setLoginError('Passwords do not match. Please verify your password entry.');
      return;
    }

    const res = StorageService.claimAdminSlot(adminEmail, adminFullName, adminPassword);
    if (res.success) {
      setIsLoggedIn(true);
      setHasSlot(false);
      setAdminAccount(res.account || null);
      try { confetti({ particleCount: 75, spread: 80, origin: { y: 0.6 } }); } catch {}
      reloadData();
    } else {
      setLoginError(res.message);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    const existing = StorageService.getAdminAccount();
    if (existing) {
      const res = StorageService.verifyAdminLogin(loginEmail, loginPassword);
      if (res.success) {
        setIsLoggedIn(true);
        reloadData();
      } else {
        setLoginError(res.message);
      }
    } else {
      // Fallback demo authentication if single slot hasn't been claimed yet
      if (loginEmail && loginPassword) {
        StorageService.setAdminLoggedIn(true);
        setIsLoggedIn(true);
        reloadData();
      } else {
        setLoginError('Please enter recruiter email and password.');
      }
    }
  };

  const handleLogout = () => {
    StorageService.setAdminLoggedIn(false);
    setIsLoggedIn(false);
  };

  // Application Pipeline Status Change
  const handleUpdateAppStatus = (appId: string, status: ApplicationStatus) => {
    StorageService.updateApplicationStatus(appId, status);
    if (status === 'Hired') {
      try {
        confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
      } catch {}
    }
    reloadData();
  };

  // Interview Schedule
  const handleConfirmInterview = () => {
    if (scheduleInterviewApp) {
      StorageService.updateApplicationStatus(scheduleInterviewApp.id, 'Interview Scheduled', {
        interviewDate,
        interviewLink
      });
      StorageService.addApplicationNote(scheduleInterviewApp.id, 'Recruiter Admin', `Scheduled client interview for ${interviewDate}. Meeting link: ${interviewLink}`);
      setScheduleInterviewApp(null);
      reloadData();
    }
  };

  // Add internal note
  const handleSaveNote = () => {
    if (!activeNoteTarget || !newNoteText.trim()) return;

    if (activeNoteTarget.type === 'cand') {
      StorageService.addCandidateNote(activeNoteTarget.id, 'Senior Recruiter', newNoteText.trim());
    } else if (activeNoteTarget.type === 'app') {
      StorageService.addApplicationNote(activeNoteTarget.id, 'Senior Recruiter', newNoteText.trim());
    } else if (activeNoteTarget.type === 'inq') {
      StorageService.addEmployerInquiryNote(activeNoteTarget.id, 'Account Executive', newNoteText.trim());
    } else if (activeNoteTarget.type === 'question') {
      StorageService.addQuickQuestionNote(activeNoteTarget.id, 'Recruiter Admin', newNoteText.trim());
    }

    setNewNoteText('');
    setActiveNoteTarget(null);
    reloadData();
  };

  // Job Actions
  const handleToggleJobStatus = (job: Job) => {
    const updatedStatus = job.status === 'published' ? 'draft' : 'published';
    StorageService.saveJob({ ...job, status: updatedStatus });
    reloadData();
  };

  const handleToggleJobFeatured = (job: Job) => {
    StorageService.saveJob({ ...job, featured: !job.featured });
    reloadData();
  };

  const handleDeleteJob = (id: string) => {
    if (window.confirm('Are you sure you want to delete this job listing?')) {
      StorageService.deleteJob(id);
      reloadData();
    }
  };

  // Quick Questions Actions
  const handleUpdateQuestionStatus = (id: string, status: QuickQuestion['status']) => {
    StorageService.updateQuickQuestionStatus(id, status);
    reloadData();
  };

  const handleSendQuestionReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyingQuestion || !replyText.trim()) return;
    StorageService.updateQuickQuestionStatus(replyingQuestion.id, 'Resolved', replyText.trim());
    StorageService.addQuickQuestionNote(replyingQuestion.id, 'Recruiter Admin', `Resolution logged: "${replyText.trim()}"`);
    setReplyingQuestion(null);
    setReplyText('');
    reloadData();
  };

  const handleDeleteQuestion = (id: string) => {
    if (window.confirm('Delete this inquiry record?')) {
      StorageService.deleteQuickQuestion(id);
      reloadData();
    }
  };

  // Funnel calculations
  const totalApps = applications.length;
  const shortlistedCount = applications.filter(a => a.status === 'Shortlisted').length;
  const interviewCount = applications.filter(a => a.status === 'Interview Scheduled').length;
  const hiredCount = applications.filter(a => a.status === 'Hired').length;
  const rejectedCount = applications.filter(a => a.status === 'Rejected').length;
  const openQuestionsCount = quickQuestions.filter(q => q.status === 'Open').length;


  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#10243A] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-lg p-6 sm:p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-[#10243A] text-[#D6A84B] border border-[#D6A84B]/40 flex items-center justify-center mx-auto font-bold text-xl shadow-md">
              <KeyRound className="w-6 h-6" />
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#10243A]">
              Air Dive Group Admin Portal
            </h2>
            <p className="text-xs text-slate-500">
              Executive Governance · Candidate Enrollments · Job Postings · Concerns Desk
            </p>
          </div>

          {/* Mode Switcher if slot is available */}
          {hasSlot ? (
            <div className="flex rounded-lg bg-slate-100 p-1 text-xs font-bold">
              <button
                type="button"
                onClick={() => { setAuthMode('claim'); setLoginError(null); }}
                className={`flex-1 py-2 text-center rounded-md transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  authMode === 'claim'
                    ? 'bg-white text-[#10243A] shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Plus className="w-3.5 h-3.5 text-[#D6A84B]" />
                <span>Create Admin Account (1 Slot Available)</span>
              </button>
              <button
                type="button"
                onClick={() => { setAuthMode('login'); setLoginError(null); }}
                className={`py-2 px-4 text-center rounded-md transition-all cursor-pointer ${
                  authMode === 'login'
                    ? 'bg-white text-[#10243A] shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Sign In
              </button>
            </div>
          ) : (
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-[#10243A]">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Single Master Admin Slot Claimed</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-snug">
                Authorized primary administrator: <span className="font-mono font-semibold text-slate-900">{adminAccount?.email}</span>. System registration is permanently locked to prevent unauthorized accounts.
              </p>
            </div>
          )}

          {loginError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-600 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{loginError}</span>
            </div>
          )}

          {/* FORM A: CLAIM SINGLE ADMIN SLOT */}
          {hasSlot && authMode === 'claim' && (
            <form onSubmit={handleClaimSlot} className="space-y-4">
              <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-lg text-xs text-amber-900 space-y-1">
                <span className="font-bold block flex items-center gap-1 text-[#10243A]">
                  <Star className="w-3.5 h-3.5 text-[#D6A84B] fill-current" />
                  <span>Single-Slot Provisioning Notice:</span>
                </span>
                <p className="text-[11px] text-slate-700 leading-relaxed">
                  You are establishing the single master administrator account for Air Dive Group. Once you submit this form, <strong className="text-[#10243A]">the slot is permanently claimed</strong> and nobody else can create an admin account.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Administrator Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={adminFullName}
                  onChange={(e) => setAdminFullName(e.target.value)}
                  placeholder="e.g. Suvankar"
                  className="w-full px-3.5 py-2 text-xs rounded-md border border-slate-300 focus:border-[#1769AA] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Master Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="suvankar45@gmail.com"
                  className="w-full px-3.5 py-2 text-xs rounded-md border border-slate-300 focus:border-[#1769AA] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Master Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="At least 5 chars"
                    className="w-full px-3.5 py-2 text-xs rounded-md border border-slate-300 focus:border-[#1769AA] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    value={adminConfirmPassword}
                    onChange={(e) => setAdminConfirmPassword(e.target.value)}
                    placeholder="Repeat password"
                    className="w-full px-3.5 py-2 text-xs rounded-md border border-slate-300 focus:border-[#1769AA] outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-[#10243A] hover:bg-[#1769AA] text-white font-bold text-xs rounded-md transition-colors cursor-pointer shadow-xs flex items-center justify-center gap-2"
              >
                <KeyRound className="w-3.5 h-3.5 text-[#D6A84B]" />
                <span>Create Primary Admin Account & Lock Slot</span>
              </button>
            </form>
          )}

          {/* FORM B: SIGN IN TO EXISTING ACCOUNT */}
          {(!hasSlot || authMode === 'login') && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Administrator Email
                </label>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-md border border-slate-300 focus:border-[#1769AA] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-md border border-slate-300 focus:border-[#1769AA] outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-[#10243A] hover:bg-[#1769AA] text-white font-bold text-xs rounded-md transition-colors cursor-pointer shadow-xs"
              >
                Sign In to Admin Portal
              </button>
            </form>
          )}

          <div className="text-center pt-2">
            <button
              onClick={onBackToSite}
              className="text-xs font-semibold text-[#1769AA] hover:underline cursor-pointer"
            >
              ← Return to Public Website
            </button>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-[#F4F7FA] flex flex-col font-sans">
      {/* Top Administration Navigation Bar */}
      <header className="bg-[#10243A] text-white border-b border-slate-800 sticky top-0 z-30 px-4 sm:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#1769AA] flex items-center justify-center font-bold text-xs text-white">
              AD
            </div>
            <div>
              <span className="font-extrabold text-sm tracking-tight text-white block">
                AIR DIVE GROUP
              </span>
              <span className="text-[10px] text-[#D6A84B] font-mono uppercase tracking-wider block">
                Enterprise ATS & Recruiter Console
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="hidden sm:flex items-center gap-2 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="font-semibold text-white">Admin: {adminAccount?.fullName || 'Primary Recruiter'}</span>
            <span className="text-slate-500">|</span>
            <span className="font-mono text-slate-400">{adminAccount?.email || 'Master Account'}</span>
            <span className="text-[10px] bg-[#D6A84B]/20 text-[#D6A84B] px-1.5 py-0.5 rounded font-bold border border-[#D6A84B]/30">
              Primary Slot Active
            </span>
          </div>

          <button
            onClick={onBackToSite}
            className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded text-xs font-semibold text-white transition-colors cursor-pointer"
          >
            Public Site
          </button>

          <button
            onClick={handleLogout}
            className="p-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Workspace: Sidebar + Content */}
      <div className="flex flex-1">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-white border-r border-slate-200 p-4 shrink-0 flex flex-col justify-between hidden md:flex">
          <div className="space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-2">
              Recruitment Workflow
            </div>

            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-[#10243A] text-white shadow-xs'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-[#D6A84B]" />
              <span>ATS Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('jobs')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'jobs'
                  ? 'bg-[#10243A] text-white shadow-xs'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Briefcase className="w-4 h-4 text-sky-500" />
                <span>Job Listing Portal</span>
              </div>
              <span className="font-mono text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">
                {jobs.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('applications')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'applications'
                  ? 'bg-[#10243A] text-white shadow-xs'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-[#1769AA]" />
                <span>Submitted Resumes</span>
              </div>
              <span className="font-mono text-[10px] bg-[#1769AA] text-white px-1.5 py-0.5 rounded font-bold">
                {applications.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('candidates')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'candidates'
                  ? 'bg-[#10243A] text-white shadow-xs'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4 text-indigo-500" />
                <span>Enrolled With Us</span>
              </div>
              <span className="font-mono text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">
                {candidates.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('employers')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'employers'
                  ? 'bg-[#10243A] text-white shadow-xs'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Building2 className="w-4 h-4 text-emerald-600" />
                <span>Who Contacted Us</span>
              </div>
              <span className="font-mono text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">
                {employerInquiries.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('questions')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'questions'
                  ? 'bg-[#10243A] text-white shadow-xs'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <HelpCircle className="w-4 h-4 text-amber-500" />
                <span>Quick Questions / Concerns</span>
              </div>
              {openQuestionsCount > 0 ? (
                <span className="font-mono text-[10px] bg-amber-500 text-white px-1.5 py-0.5 rounded font-bold">
                  {openQuestionsCount}
                </span>
              ) : (
                <span className="font-mono text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">
                  {quickQuestions.length}
                </span>
              )}
            </button>

            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 pt-6 pb-2">
              System & Content
            </div>

            <button
              onClick={() => setActiveTab('content')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'content'
                  ? 'bg-[#10243A] text-white shadow-xs'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <RotateCcw className="w-4 h-4 text-slate-400" />
              <span>Data & Content Control</span>
            </button>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
            <span className="font-bold text-[#10243A] block text-[11px]">Recruitment SLA Status</span>
            <div className="flex justify-between text-slate-500 text-[10px]">
              <span>Submittal Velocity:</span>
              <span className="font-bold text-emerald-600">32h Avg</span>
            </div>
            <div className="flex justify-between text-slate-500 text-[10px]">
              <span>Candidate Acceptance:</span>
              <span className="font-bold text-[#1769AA]">94.2%</span>
            </div>
          </div>
        </aside>

        {/* Content Viewport */}
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto max-w-7xl">
          {/* TAB 1: OVERVIEW (Joblings / KerjaKu / Krow.ai inspired) */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              {/* Header Title */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-extrabold text-[#10243A]">
                    Recruitment Overview & Operations
                  </h1>
                  <p className="text-xs text-slate-500">
                    Real-time candidate pipeline, active mandates, and interview schedules.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setEditingJob(null);
                      setIsCreateJobOpen(true);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#10243A] hover:bg-[#1769AA] text-white text-xs font-bold rounded-md shadow-xs cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#D6A84B]" />
                    <span>Create New Job</span>
                  </button>
                </div>
              </div>

              {/* 4 KPI Cards (Inspired by Screenshot 1 Joblings) */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-1">
                  <span className="text-xs font-semibold text-slate-500 block">Total Candidates</span>
                  <div className="text-3xl font-extrabold text-[#10243A] font-mono tabular-nums">
                    {candidates.length + 125}
                  </div>
                  <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>+14 this week</span>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-1">
                  <span className="text-xs font-semibold text-slate-500 block">Active Applications</span>
                  <div className="text-3xl font-extrabold text-[#1769AA] font-mono tabular-nums">
                    {applications.length}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    <span>{shortlistedCount} Shortlisted candidates</span>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-1">
                  <span className="text-xs font-semibold text-slate-500 block">Interviews Scheduled</span>
                  <div className="text-3xl font-extrabold text-[#D6A84B] font-mono tabular-nums">
                    {interviewCount + 2}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    <span>Active client review rounds</span>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-1">
                  <span className="text-xs font-semibold text-slate-500 block">Employer Leads</span>
                  <div className="text-3xl font-extrabold text-slate-800 font-mono tabular-nums">
                    {employerInquiries.length}
                  </div>
                  <div className="text-[11px] text-emerald-600 font-semibold">
                    <span>{employerInquiries.filter(i => i.status === 'New').length} pending review</span>
                  </div>
                </div>
              </div>

              {/* Pipeline Funnel Matrix (Inspired by Screenshot 3 KerjaKu) */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-[#10243A]">
                      National Candidate Pipeline Funnel
                    </h3>
                    <p className="text-xs text-slate-500">
                      Live status progression of all candidate applications across active searches.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('applications')}
                    className="text-xs font-bold text-[#1769AA] hover:underline"
                  >
                    View All Applications →
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 text-center text-xs">
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">New</span>
                    <span className="text-lg font-bold font-mono text-slate-800">
                      {applications.filter(a => a.status === 'New').length}
                    </span>
                  </div>

                  <div className="bg-blue-50/60 p-3 rounded-lg border border-blue-200/80">
                    <span className="text-[#1769AA] block text-[10px] uppercase font-bold">Under Review</span>
                    <span className="text-lg font-bold font-mono text-[#1769AA]">
                      {applications.filter(a => a.status === 'Under Review').length}
                    </span>
                  </div>

                  <div className="bg-amber-50/60 p-3 rounded-lg border border-amber-200/80">
                    <span className="text-amber-800 block text-[10px] uppercase font-bold">Shortlisted</span>
                    <span className="text-lg font-bold font-mono text-amber-800">
                      {shortlistedCount}
                    </span>
                  </div>

                  <div className="bg-purple-50/60 p-3 rounded-lg border border-purple-200/80">
                    <span className="text-purple-800 block text-[10px] uppercase font-bold">Interview</span>
                    <span className="text-lg font-bold font-mono text-purple-800">
                      {interviewCount}
                    </span>
                  </div>

                  <div className="bg-indigo-50/60 p-3 rounded-lg border border-indigo-200/80">
                    <span className="text-indigo-800 block text-[10px] uppercase font-bold">Selected</span>
                    <span className="text-lg font-bold font-mono text-indigo-800">
                      {applications.filter(a => a.status === 'Selected').length}
                    </span>
                  </div>

                  <div className="bg-emerald-50/60 p-3 rounded-lg border border-emerald-200/80">
                    <span className="text-emerald-800 block text-[10px] uppercase font-bold">Hired</span>
                    <span className="text-lg font-bold font-mono text-emerald-800">
                      {hiredCount + 12}
                    </span>
                  </div>

                  <div className="bg-rose-50/60 p-3 rounded-lg border border-rose-200/80">
                    <span className="text-rose-800 block text-[10px] uppercase font-bold">Rejected</span>
                    <span className="text-lg font-bold font-mono text-rose-800">
                      {rejectedCount}
                    </span>
                  </div>
                </div>
              </div>

              {/* Two Column Grid: Today's Interviews + Recent Candidate Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Today's Interviews (Matching Screenshot 1 Joblings) */}
                <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#1769AA]" />
                      <h3 className="text-sm font-bold text-[#10243A]">
                        Upcoming Client Interviews
                      </h3>
                    </div>
                    <span className="text-[11px] font-semibold text-slate-400">
                      Google Meet Enabled
                    </span>
                  </div>

                  <div className="space-y-3">
                    {applications.filter(a => a.status === 'Interview Scheduled').slice(0, 3).map((app) => (
                      <div key={app.id} className="p-3.5 rounded-lg border border-slate-200 bg-[#F8FAFC] space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="text-xs font-bold text-[#10243A] block">{app.candidateName}</span>
                            <span className="text-[11px] text-slate-500">{app.jobTitle}</span>
                          </div>
                          <span className="text-[10px] font-bold font-mono bg-purple-100 text-purple-800 px-2 py-0.5 rounded">
                            {app.interviewDate ? new Date(app.interviewDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '10:30 AM'}
                          </span>
                        </div>

                        {app.interviewLink && (
                          <div className="flex items-center justify-between pt-1">
                            <span className="text-[11px] text-slate-400 font-mono truncate max-w-[200px]">
                              {app.interviewLink}
                            </span>
                            <a
                              href={app.interviewLink}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-[11px] font-bold text-[#1769AA] hover:underline"
                            >
                              <Video className="w-3 h-3" />
                              <span>Join Meet</span>
                            </a>
                          </div>
                        )}
                      </div>
                    ))}

                    {applications.filter(a => a.status === 'Interview Scheduled').length === 0 && (
                      <p className="text-xs text-slate-400 text-center py-4">No interviews scheduled today.</p>
                    )}
                  </div>
                </div>

                {/* Recent Candidates List */}
                <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#1769AA]" />
                      <h3 className="text-sm font-bold text-[#10243A]">
                        Recent Candidate Registrations
                      </h3>
                    </div>
                    <button
                      onClick={() => setActiveTab('candidates')}
                      className="text-xs font-bold text-[#1769AA] hover:underline"
                    >
                      View All
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {candidates.slice(0, 4).map((cand) => (
                      <div
                        key={cand.id}
                        className="p-3 rounded-lg border border-slate-200/80 hover:bg-slate-50 flex items-center justify-between transition-colors"
                      >
                        <div className="space-y-0.5">
                          <span className="text-xs font-bold text-[#10243A] block">
                            {cand.fullName}
                          </span>
                          <span className="text-[11px] text-slate-500">
                            {cand.preferredJobTitle} · {cand.city}, {cand.state}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setViewingCandidate(cand)}
                            className="px-2.5 py-1 text-[11px] font-bold text-[#1769AA] bg-blue-50 hover:bg-blue-100 rounded cursor-pointer"
                          >
                            Dossier
                          </button>
                          <span className="text-[10px] font-mono px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded font-bold">
                            {cand.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CANDIDATES */}
          {activeTab === 'candidates' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-extrabold text-[#10243A]">
                    Candidate Database & Talent Pool
                  </h1>
                  <p className="text-xs text-slate-500">
                    {candidates.length} pre-screened professionals registered across all 50 US states.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search candidate name, title, skill..."
                    className="px-3 py-1.5 text-xs rounded-md border border-slate-300 bg-white focus:border-[#1769AA] outline-none"
                  />
                </div>
              </div>

              {/* Candidates Table */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#10243A] text-white text-[11px] uppercase tracking-wider">
                      <tr>
                        <th className="py-3 px-4">Candidate Name</th>
                        <th className="py-3 px-4">Preferred Title</th>
                        <th className="py-3 px-4">Industry</th>
                        <th className="py-3 px-4">Location</th>
                        <th className="py-3 px-4">Work Auth</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {candidates
                        .filter(c => {
                          if (!searchQuery.trim()) return true;
                          const q = searchQuery.toLowerCase();
                          return c.fullName.toLowerCase().includes(q) ||
                                 c.preferredJobTitle.toLowerCase().includes(q) ||
                                 c.skills.some(s => s.toLowerCase().includes(q));
                        })
                        .map((cand) => (
                          <tr key={cand.id} className="hover:bg-slate-50 transition-colors">
                            <td className="py-3 px-4 font-bold text-[#10243A]">
                              {cand.fullName}
                            </td>
                            <td className="py-3 px-4 text-slate-700">
                              {cand.preferredJobTitle}
                            </td>
                            <td className="py-3 px-4 text-slate-500">
                              {cand.industry}
                            </td>
                            <td className="py-3 px-4 text-slate-600">
                              {cand.city}, {cand.state}
                            </td>
                            <td className="py-3 px-4 font-mono text-[11px] text-slate-600">
                              {cand.workAuthorization}
                            </td>
                            <td className="py-3 px-4">
                              <select
                                value={cand.status}
                                onChange={(e) => {
                                  StorageService.updateCandidateStatus(cand.id, e.target.value as any);
                                  reloadData();
                                }}
                                className="px-2 py-1 rounded text-[11px] font-bold bg-slate-100 text-slate-800 outline-none cursor-pointer"
                              >
                                <option value="Available">Available</option>
                                <option value="Interviewing">Interviewing</option>
                                <option value="Placed">Placed</option>
                                <option value="Inactive">Inactive</option>
                              </select>
                            </td>
                            <td className="py-3 px-4 text-right space-x-2">
                              <button
                                onClick={() => setViewingCandidate(cand)}
                                className="px-2.5 py-1 bg-[#10243A] hover:bg-[#1769AA] text-white font-bold rounded text-[11px] cursor-pointer"
                              >
                                View Resume
                              </button>
                              <button
                                onClick={() => setActiveNoteTarget({ type: 'cand', id: cand.id, name: cand.fullName })}
                                className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded text-[11px] cursor-pointer"
                                title="Add Recruiter Note"
                              >
                                Note ({cand.internalNotes.length})
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: JOBS - DEDICATED JOB LISTING PORTAL (ADMIN ONLY) */}
          {activeTab === 'jobs' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold bg-[#1769AA]/10 text-[#1769AA] uppercase tracking-wider mb-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Dedicated Job Listing Portal · Admin Access Only</span>
                  </div>
                  <h1 className="text-2xl font-extrabold text-[#10243A]">
                    Job Postings & Featured Listings Controller
                  </h1>
                  <p className="text-xs text-slate-500">
                    Publish new job vacancies and control which opportunities appear in the Featured Career Opportunities section on the homepage.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingJob(null);
                    setIsCreateJobOpen(true);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#10243A] hover:bg-[#1769AA] text-white text-xs font-bold rounded-md shadow-xs cursor-pointer self-start sm:self-auto"
                >
                  <Plus className="w-3.5 h-3.5 text-[#D6A84B]" />
                  <span>Post New Job Opening</span>
                </button>
              </div>

              {/* KPI Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <span className="text-[11px] font-semibold text-slate-500 block">Total Postings</span>
                  <span className="text-2xl font-extrabold text-[#10243A]">{jobs.length}</span>
                </div>
                <div className="bg-white p-4 rounded-xl border border-amber-200 bg-amber-50/20">
                  <span className="text-[11px] font-semibold text-amber-800 flex items-center gap-1">
                    <Star className="w-3 h-3 text-[#D6A84B] fill-current" />
                    <span>Featured on Homepage</span>
                  </span>
                  <span className="text-2xl font-extrabold text-[#10243A]">
                    {jobs.filter(j => j.featured).length}
                  </span>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <span className="text-[11px] font-semibold text-emerald-700 block">Published Active</span>
                  <span className="text-2xl font-extrabold text-[#10243A]">
                    {jobs.filter(j => j.status === 'published').length}
                  </span>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <span className="text-[11px] font-semibold text-slate-500 block">Draft / Unlisted</span>
                  <span className="text-2xl font-extrabold text-slate-700">
                    {jobs.filter(j => j.status === 'draft').length}
                  </span>
                </div>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg text-xs font-bold">
                  <button
                    onClick={() => setJobsFilter('all')}
                    className={`px-3 py-1.5 rounded-md cursor-pointer ${jobsFilter === 'all' ? 'bg-white text-[#10243A] shadow-xs' : 'text-slate-600'}`}
                  >
                    All ({jobs.length})
                  </button>
                  <button
                    onClick={() => setJobsFilter('featured')}
                    className={`px-3 py-1.5 rounded-md cursor-pointer flex items-center gap-1 ${jobsFilter === 'featured' ? 'bg-white text-[#10243A] shadow-xs font-bold' : 'text-slate-600'}`}
                  >
                    <Star className="w-3 h-3 text-[#D6A84B] fill-current" />
                    <span>Featured on Homepage ({jobs.filter(j => j.featured).length})</span>
                  </button>
                  <button
                    onClick={() => setJobsFilter('published')}
                    className={`px-3 py-1.5 rounded-md cursor-pointer ${jobsFilter === 'published' ? 'bg-white text-[#10243A] shadow-xs' : 'text-slate-600'}`}
                  >
                    Published ({jobs.filter(j => j.status === 'published').length})
                  </button>
                  <button
                    onClick={() => setJobsFilter('draft')}
                    className={`px-3 py-1.5 rounded-md cursor-pointer ${jobsFilter === 'draft' ? 'bg-white text-[#10243A] shadow-xs' : 'text-slate-600'}`}
                  >
                    Drafts ({jobs.filter(j => j.status === 'draft').length})
                  </button>
                </div>
              </div>

              {/* Jobs Table */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#10243A] text-white text-[11px] uppercase tracking-wider">
                      <tr>
                        <th className="py-3 px-4">Title & Client</th>
                        <th className="py-3 px-4">Industry</th>
                        <th className="py-3 px-4">Location</th>
                        <th className="py-3 px-4">Compensation</th>
                        <th className="py-3 px-4">Homepage Featured</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {jobs
                        .filter(job => {
                          if (jobsFilter === 'featured') return job.featured;
                          if (jobsFilter === 'published') return job.status === 'published';
                          if (jobsFilter === 'draft') return job.status === 'draft';
                          return true;
                        })
                        .map((job) => (
                        <tr key={job.id} className="hover:bg-slate-50 transition-colors">
                          <td className="py-3 px-4">
                            <span className="font-bold text-[#10243A] block">{job.title}</span>
                            <span className="text-[11px] text-slate-500">
                              {job.clientConfidential ? 'Client Confidential' : job.company}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-slate-600">{job.industry}</td>
                          <td className="py-3 px-4 text-slate-600">{job.location}</td>
                          <td className="py-3 px-4 font-mono font-bold text-slate-700">
                            {job.salaryPeriod === 'hourly'
                              ? `$${job.salaryMin} - $${job.salaryMax}/hr`
                              : `$${(job.salaryMin/1000).toFixed(0)}k - $${(job.salaryMax/1000).toFixed(0)}k/yr`}
                          </td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() => handleToggleJobFeatured(job)}
                              className={`px-2.5 py-1 rounded text-[11px] font-bold cursor-pointer transition-all flex items-center gap-1 ${
                                job.featured
                                  ? 'bg-amber-100 text-amber-900 border border-amber-300 shadow-2xs'
                                  : 'bg-slate-100 text-slate-500 hover:text-slate-800'
                              }`}
                              title="Click to toggle whether this job shows on the homepage featured section"
                            >
                              <Star className={`w-3 h-3 ${job.featured ? 'text-[#D6A84B] fill-current' : ''}`} />
                              <span>{job.featured ? 'Featured on Homepage' : 'Standard'}</span>
                            </button>
                          </td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() => handleToggleJobStatus(job)}
                              className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer ${
                                job.status === 'published'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {job.status === 'published' ? 'Published' : 'Draft / Unlisted'}
                            </button>
                          </td>
                          <td className="py-3 px-4 text-right space-x-2">
                            <button
                              onClick={() => {
                                setEditingJob(job);
                                setIsCreateJobOpen(true);
                              }}
                              className="p-1.5 text-slate-500 hover:text-[#1769AA] cursor-pointer"
                              title="Edit Job"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteJob(job.id)}
                              className="p-1.5 text-slate-400 hover:text-red-600 cursor-pointer"
                              title="Delete Job"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: APPLICATIONS & PIPELINE */}
          {activeTab === 'applications' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-extrabold text-[#10243A]">
                    Candidate Applications & Recruitment Pipeline
                  </h1>
                  <p className="text-xs text-slate-500">
                    Advance candidates through the recruitment lifecycle or schedule client interviews.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-1.5 text-xs rounded-md border border-slate-300 bg-white font-semibold outline-none"
                  >
                    <option value="all">All Statuses ({applications.length})</option>
                    <option value="New">New</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Shortlisted">Shortlisted</option>
                    <option value="Interview Scheduled">Interview Scheduled</option>
                    <option value="Selected">Selected</option>
                    <option value="Hired">Hired</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>

              {/* Applications Table */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#10243A] text-white text-[11px] uppercase tracking-wider">
                      <tr>
                        <th className="py-3 px-4">Applicant</th>
                        <th className="py-3 px-4">Job Title</th>
                        <th className="py-3 px-4">Location</th>
                        <th className="py-3 px-4">Applied Date</th>
                        <th className="py-3 px-4">Status & Stage</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {applications
                        .filter(a => statusFilter === 'all' || a.status === statusFilter)
                        .map((app) => (
                          <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                            <td className="py-3 px-4">
                              <span className="font-bold text-[#10243A] block">{app.candidateName}</span>
                              <span className="text-[11px] text-slate-500">{app.email} · {app.phone}</span>
                            </td>
                            <td className="py-3 px-4 font-medium text-slate-800">
                              {app.jobTitle}
                            </td>
                            <td className="py-3 px-4 text-slate-600">
                              {app.location}
                            </td>
                            <td className="py-3 px-4 font-mono text-[11px] text-slate-500">
                              {app.appliedDate}
                            </td>
                            <td className="py-3 px-4">
                              <select
                                value={app.status}
                                onChange={(e) => handleUpdateAppStatus(app.id, e.target.value as ApplicationStatus)}
                                className={`px-2.5 py-1 rounded text-[11px] font-bold outline-none cursor-pointer ${
                                  app.status === 'Hired' ? 'bg-emerald-100 text-emerald-800' :
                                  app.status === 'Interview Scheduled' ? 'bg-purple-100 text-purple-800' :
                                  app.status === 'Shortlisted' ? 'bg-amber-100 text-amber-800' :
                                  app.status === 'Selected' ? 'bg-indigo-100 text-indigo-800' :
                                  app.status === 'Rejected' ? 'bg-rose-100 text-rose-800' :
                                  'bg-slate-100 text-slate-800'
                                }`}
                              >
                                <option value="New">New</option>
                                <option value="Under Review">Under Review</option>
                                <option value="Shortlisted">Shortlisted</option>
                                <option value="Interview Scheduled">Interview Scheduled</option>
                                <option value="Selected">Selected</option>
                                <option value="Hired">Hired (Celebrate!)</option>
                                <option value="Rejected">Rejected</option>
                              </select>
                            </td>
                            <td className="py-3 px-4 text-right space-x-2">
                              <button
                                onClick={() => setViewingApp(app)}
                                className="px-2.5 py-1 bg-[#10243A] hover:bg-[#1769AA] text-white font-bold rounded text-[11px] cursor-pointer"
                              >
                                Resume
                              </button>
                              <button
                                onClick={() => setScheduleInterviewApp(app)}
                                className="px-2.5 py-1 bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold rounded text-[11px] cursor-pointer"
                                title="Schedule Interview with Meet link"
                              >
                                Schedule Interview
                              </button>
                              <button
                                onClick={() => setActiveNoteTarget({ type: 'app', id: app.id, name: app.candidateName })}
                                className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded text-[11px] cursor-pointer"
                              >
                                Notes ({app.notes.length})
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: EMPLOYER INQUIRIES */}
          {activeTab === 'employers' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-extrabold text-[#10243A]">
                    Employer Staffing Requests & Leads
                  </h1>
                  <p className="text-xs text-slate-500">
                    Incoming hiring requirements from enterprise and mid-market employers.
                  </p>
                </div>
              </div>

              {/* Employer Inquiries Table */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#10243A] text-white text-[11px] uppercase tracking-wider">
                      <tr>
                        <th className="py-3 px-4">Company & Contact</th>
                        <th className="py-3 px-4">Industry & Service</th>
                        <th className="py-3 px-4">Headcount</th>
                        <th className="py-3 px-4">Rate / Salary</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {employerInquiries.map((inq) => (
                        <tr key={inq.id} className="hover:bg-slate-50 transition-colors">
                          <td className="py-3 px-4">
                            <span className="font-bold text-[#10243A] block">{inq.companyName}</span>
                            <span className="text-[11px] text-slate-500">
                              {inq.contactName} ({inq.contactTitle}) · {inq.workEmail}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-semibold text-slate-800 block">{inq.industry}</span>
                            <span className="text-[11px] text-[#1769AA]">{inq.staffingService}</span>
                          </td>
                          <td className="py-3 px-4 font-mono font-bold text-slate-700">
                            {inq.openPositionsCount} opening(s)
                          </td>
                          <td className="py-3 px-4 font-mono text-slate-600">
                            {inq.targetRateRange}
                          </td>
                          <td className="py-3 px-4">
                            <select
                              value={inq.status}
                              onChange={(e) => {
                                StorageService.updateEmployerInquiryStatus(inq.id, e.target.value as any);
                                reloadData();
                              }}
                              className="px-2 py-1 rounded text-[11px] font-bold bg-slate-100 text-slate-800 outline-none cursor-pointer"
                            >
                              <option value="New">New</option>
                              <option value="Discovery Scheduled">Discovery Scheduled</option>
                              <option value="Agreement Signed">Agreement Signed</option>
                              <option value="Active Sourcing">Active Sourcing</option>
                              <option value="Fulfilled">Fulfilled</option>
                              <option value="Archived">Archived</option>
                            </select>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => setActiveNoteTarget({ type: 'inq', id: inq.id, name: inq.companyName })}
                              className="px-2.5 py-1 bg-[#10243A] hover:bg-[#1769AA] text-white font-bold rounded text-[11px] cursor-pointer"
                            >
                              Notes ({inq.internalNotes.length})
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB: QUICK QUESTIONS & CONCERNS */}
          {activeTab === 'questions' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 uppercase tracking-wider mb-1">
                    <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
                    <span>Inquiries & Concerns Desk · Admin Management</span>
                  </div>
                  <h1 className="text-2xl font-extrabold text-[#10243A]">
                    Quick Questions & Concern Raises
                  </h1>
                  <p className="text-xs text-slate-500">
                    Review and resolve visitor questions, candidate issues, and employer questions submitted through footer and contact portals.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={questionStatusFilter}
                    onChange={(e) => setQuestionStatusFilter(e.target.value)}
                    className="px-3 py-1.5 text-xs rounded-md border border-slate-300 bg-white font-semibold outline-none cursor-pointer"
                  >
                    <option value="all">All Inquiries ({quickQuestions.length})</option>
                    <option value="Open">Open ({quickQuestions.filter(q => q.status === 'Open').length})</option>
                    <option value="In Progress">In Progress ({quickQuestions.filter(q => q.status === 'In Progress').length})</option>
                    <option value="Resolved">Resolved ({quickQuestions.filter(q => q.status === 'Resolved').length})</option>
                  </select>
                </div>
              </div>

              {/* KPI Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <span className="text-[11px] font-semibold text-slate-500 block">Total Inquiries</span>
                  <span className="text-2xl font-extrabold text-[#10243A]">{quickQuestions.length}</span>
                </div>
                <div className="bg-white p-4 rounded-xl border border-amber-200 bg-amber-50/20">
                  <span className="text-[11px] font-semibold text-amber-800 block">Open & Pending</span>
                  <span className="text-2xl font-extrabold text-[#10243A]">
                    {quickQuestions.filter(q => q.status === 'Open').length}
                  </span>
                </div>
                <div className="bg-white p-4 rounded-xl border border-blue-200 bg-blue-50/20">
                  <span className="text-[11px] font-semibold text-blue-700 block">In Progress</span>
                  <span className="text-2xl font-extrabold text-[#10243A]">
                    {quickQuestions.filter(q => q.status === 'In Progress').length}
                  </span>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <span className="text-[11px] font-semibold text-emerald-700 block">Resolved</span>
                  <span className="text-2xl font-extrabold text-slate-700">
                    {quickQuestions.filter(q => q.status === 'Resolved').length}
                  </span>
                </div>
              </div>

              {/* Questions Table */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#10243A] text-white text-[11px] uppercase tracking-wider">
                      <tr>
                        <th className="py-3 px-4">Ticket & Submitter</th>
                        <th className="py-3 px-4">Category & Urgency</th>
                        <th className="py-3 px-4">Subject & Message</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {quickQuestions
                        .filter(q => questionStatusFilter === 'all' || q.status === questionStatusFilter)
                        .map((q) => (
                        <tr key={q.id} className="hover:bg-slate-50 transition-colors">
                          <td className="py-3 px-4">
                            <span className="font-mono text-[11px] font-bold text-[#1769AA] block">
                              {q.ticketNumber}
                            </span>
                            <span className="font-bold text-[#10243A] block">{q.fullName}</span>
                            <span className="text-[11px] text-slate-500">{q.email}</span>
                            {q.phone && <span className="text-[10px] text-slate-400 block font-mono">{q.phone}</span>}
                            <span className="text-[10px] text-slate-400 block mt-0.5">
                              {new Date(q.submittedAt).toLocaleDateString()} at {new Date(q.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </td>
                          <td className="py-3 px-4 space-y-1">
                            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-800">
                              {q.type}
                            </span>
                            <div>
                              <span className={`inline-block px-2 py-0.2 rounded text-[10px] font-bold ${
                                q.urgency === 'Urgent' ? 'bg-red-100 text-red-800' :
                                q.urgency === 'High' ? 'bg-amber-100 text-amber-800' :
                                'bg-blue-50 text-blue-700'
                              }`}>
                                {q.urgency}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-4 max-w-sm">
                            <span className="font-bold text-slate-900 block leading-snug">
                              {q.subject}
                            </span>
                            <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                              {q.message}
                            </p>
                            {q.adminResponse && (
                              <div className="mt-2 p-2 rounded bg-emerald-50/80 border border-emerald-200 text-emerald-900 text-[11px]">
                                <span className="font-bold block">Admin Resolution:</span>
                                {q.adminResponse}
                              </div>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            <select
                              value={q.status}
                              onChange={(e) => handleUpdateQuestionStatus(q.id, e.target.value as QuickQuestion['status'])}
                              className={`px-2.5 py-1 rounded text-[11px] font-bold outline-none cursor-pointer ${
                                q.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' :
                                q.status === 'In Progress' ? 'bg-amber-100 text-amber-800' :
                                'bg-blue-100 text-blue-800'
                              }`}
                            >
                              <option value="Open">Open</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Resolved">Resolved</option>
                              <option value="Archived">Archived</option>
                            </select>
                          </td>
                          <td className="py-3 px-4 text-right space-x-1.5 whitespace-nowrap">
                            <button
                              onClick={() => {
                                setReplyingQuestion(q);
                                setReplyText(q.adminResponse || '');
                              }}
                              className="px-2.5 py-1 bg-[#10243A] hover:bg-[#1769AA] text-white font-bold rounded text-[11px] cursor-pointer"
                            >
                              Resolve / Reply
                            </button>
                            <button
                              onClick={() => setActiveNoteTarget({ type: 'question', id: q.id, name: `${q.ticketNumber} (${q.fullName})` })}
                              className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded text-[11px] cursor-pointer"
                            >
                              Notes ({q.internalNotes.length})
                            </button>
                            <button
                              onClick={() => handleDeleteQuestion(q.id)}
                              className="p-1 text-slate-400 hover:text-red-600 cursor-pointer"
                              title="Delete inquiry"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {quickQuestions.length === 0 && (
                        <tr>
                          <td colSpan={5} className="py-8 text-center text-slate-400 text-xs">
                            No quick questions or concerns logged yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB: CONTENT & DATA MANAGEMENT */}
          {activeTab === 'content' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h1 className="text-2xl font-extrabold text-[#10243A]">
                  Platform Content & Database Governance
                </h1>
                <p className="text-xs text-slate-500">
                  Manage website announcements, export data, and reset seed records.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
                  <h3 className="text-sm font-bold text-[#10243A]">Export ATS Database</h3>
                  <p className="text-xs text-slate-600">
                    Export all candidate records, job postings, applications, and employer inquiries in JSON format.
                  </p>
                  <button
                    onClick={() => {
                      const exportData = {
                        jobs,
                        candidates,
                        applications,
                        employerInquiries,
                        exportTimestamp: new Date().toISOString()
                      };
                      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
                      const url = URL.createObjectURL(blob);
                      const link = document.createElement('a');
                      link.href = url;
                      link.download = `AirDiveGroup_ATS_Export_${new Date().toISOString().split('T')[0]}.json`;
                      link.click();
                      URL.revokeObjectURL(url);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#10243A] hover:bg-[#1769AA] text-white text-xs font-bold rounded-md cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-[#D6A84B]" />
                    <span>Download Full Database JSON</span>
                  </button>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
                  <h3 className="text-sm font-bold text-[#10243A]">Reset Demonstration Seeds</h3>
                  <p className="text-xs text-slate-600">
                    Restore all jobs, candidates, and applications back to the clean verified initial demonstration dataset.
                  </p>
                  <button
                    onClick={() => {
                      if (window.confirm('Reset all jobs and candidate records to initial demonstration state?')) {
                        StorageService.resetAllData();
                        reloadData();
                        alert('Data successfully restored to demo baseline.');
                      }
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-md cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Database to Default</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Resume Viewer Modal */}
      {(viewingCandidate || viewingApp) && (
        <ResumeViewerModal
          candidate={viewingCandidate}
          application={viewingApp}
          onClose={() => {
            setViewingCandidate(null);
            setViewingApp(null);
          }}
        />
      )}

      {/* Schedule Interview Modal (Inspired by Screenshot 1 Meet links) */}
      {scheduleInterviewApp && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-bold text-[#1769AA] uppercase tracking-wider">
                  Schedule Client Interview
                </span>
                <h3 className="text-lg font-bold text-[#10243A]">
                  {scheduleInterviewApp.candidateName}
                </h3>
                <p className="text-xs text-slate-500">{scheduleInterviewApp.jobTitle}</p>
              </div>
              <button
                onClick={() => setScheduleInterviewApp(null)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Interview Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={interviewDate}
                  onChange={(e) => setInterviewDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-md border border-slate-300 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Google Meet / Video Conference Link
                </label>
                <input
                  type="url"
                  value={interviewLink}
                  onChange={(e) => setInterviewLink(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-md border border-slate-300 outline-none font-mono"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                onClick={() => setScheduleInterviewApp(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-md cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmInterview}
                className="px-4 py-2 text-xs font-bold text-white bg-[#10243A] hover:bg-[#1769AA] rounded-md transition-colors cursor-pointer"
              >
                Confirm & Notify Candidate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Recruiter Internal Note Modal */}
      {activeNoteTarget && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-bold text-[#D6A84B] uppercase tracking-wider">
                  Internal Recruiter Note
                </span>
                <h3 className="text-lg font-bold text-[#10243A]">
                  {activeNoteTarget.name}
                </h3>
              </div>
              <button
                onClick={() => setActiveNoteTarget(null)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Note Content
              </label>
              <textarea
                rows={4}
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                placeholder="Add confidential feedback, client interview impressions, salary requirements, or timeline notes..."
                className="w-full px-3 py-2 text-xs rounded-md border border-slate-300 outline-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                onClick={() => setActiveNoteTarget(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-md cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNote}
                className="px-4 py-2 text-xs font-bold text-white bg-[#10243A] hover:bg-[#1769AA] rounded-md transition-colors cursor-pointer"
              >
                Save Recruiter Note
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Question Resolution / Reply Modal */}
      {replyingQuestion && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-lg p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider">
                  Resolve & Log Inquiry Reply
                </span>
                <h3 className="text-lg font-bold text-[#10243A]">
                  Ticket: {replyingQuestion.ticketNumber}
                </h3>
                <p className="text-xs text-slate-500">
                  {replyingQuestion.fullName} · {replyingQuestion.email}
                </p>
              </div>
              <button
                onClick={() => setReplyingQuestion(null)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1">
              <span className="font-bold text-[#10243A] block">{replyingQuestion.subject}</span>
              <p className="text-slate-600 leading-relaxed">{replyingQuestion.message}</p>
            </div>

            <form onSubmit={handleSendQuestionReply} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Official Admin Resolution / Response Note <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Record your phone resolution, email answer, or internal decision taken..."
                  className="w-full px-3 py-2 text-xs rounded-md border border-slate-300 outline-none leading-relaxed"
                />
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                <span className="text-[11px] text-slate-500">
                  Status will be marked as <strong className="text-emerald-700">Resolved</strong>
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setReplyingQuestion(null)}
                    className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-md cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#10243A] hover:bg-[#1769AA] rounded-md transition-colors cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Save Resolution</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Job Create/Edit Modal */}
      {isCreateJobOpen && (
        <JobFormModal
          job={editingJob}
          onClose={() => {
            setIsCreateJobOpen(false);
            setEditingJob(null);
          }}
          onSave={(savedJob) => {
            StorageService.saveJob(savedJob);
            setIsCreateJobOpen(false);
            setEditingJob(null);
            reloadData();
          }}
        />
      )}
    </div>
  );
};

// Subcomponent for creating or editing job postings in the ATS
interface JobFormModalProps {
  job: Job | null;
  onClose: () => void;
  onSave: (job: Job) => void;
}

const JobFormModal: React.FC<JobFormModalProps> = ({ job, onClose, onSave }) => {
  const [title, setTitle] = useState(job?.title || '');
  const [company, setCompany] = useState(job?.company || '');
  const [clientConfidential, setClientConfidential] = useState(job?.clientConfidential ?? true);
  const [city, setCity] = useState(job?.city || 'Atlanta');
  const [state, setState] = useState(job?.state || 'GA');
  const [workplaceType, setWorkplaceType] = useState<Job['workplaceType']>(job?.workplaceType || 'Hybrid');
  const [industry, setIndustry] = useState<IndustryType>(job?.industry || 'Information Technology');
  const [type, setType] = useState<JobType>(job?.type || 'Direct Hire');
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>(job?.experienceLevel || 'Senior Level');
  const [salaryMin, setSalaryMin] = useState<number>(job?.salaryMin || 120000);
  const [salaryMax, setSalaryMax] = useState<number>(job?.salaryMax || 150000);
  const [salaryPeriod, setSalaryPeriod] = useState<'hourly' | 'annual'>(job?.salaryPeriod || 'annual');
  const [description, setDescription] = useState(job?.description || '');
  const [skillsStr, setSkillsStr] = useState(job?.skills?.join(', ') || '');
  const [featured, setFeatured] = useState(job?.featured ?? false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const skills = skillsStr.split(',').map(s => s.trim()).filter(Boolean);

    const saved: Job = {
      id: job?.id || `job-${Date.now().toString().slice(-4)}`,
      title,
      company: company || 'Enterprise Client',
      clientConfidential,
      location: `${city}, ${state} (${workplaceType})`,
      city,
      state,
      workplaceType,
      industry,
      type,
      experienceLevel,
      salaryMin: Number(salaryMin),
      salaryMax: Number(salaryMax),
      salaryPeriod,
      postedDate: job?.postedDate || new Date().toISOString().split('T')[0],
      description,
      responsibilities: job?.responsibilities || [
        'Deliver technical solutions conforming to enterprise architecture guidelines.',
        'Collaborate with cross-functional teams to execute roadmap deliverables.'
      ],
      qualifications: job?.qualifications || [
        'Demonstrated expertise in specialized field with proven track record.',
        'Clear communication and problem-solving velocity.'
      ],
      benefits: job?.benefits || [
        'Comprehensive health, dental, and vision insurance',
        '401(k) retirement plan with corporate match',
        'Generous paid time off (PTO)'
      ],
      skills: skills.length ? skills : ['Enterprise Solutions'],
      featured,
      status: job?.status || 'published',
      applicantCount: job?.applicantCount || 0
    };

    onSave(saved);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-2xl p-6 sm:p-8 space-y-4 my-8">
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-xl font-bold text-[#10243A]">
              {job ? 'Edit Job Posting' : 'Create New Job Mandate'}
            </h3>
            <p className="text-xs text-slate-500">
              Publish vacancies directly to the Air Dive Group national job board & homepage featured section.
            </p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Job Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Senior Cloud Solutions Architect"
                className="w-full px-3 py-2 rounded border border-slate-300 outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Client / Company Name</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Client Name or 'FinTech Client'"
                className="w-full px-3 py-2 rounded border border-slate-300 outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="conf"
              checked={clientConfidential}
              onChange={(e) => setClientConfidential(e.target.checked)}
              className="rounded text-[#1769AA]"
            />
            <label htmlFor="conf" className="font-semibold text-slate-600">
              Mark Client as Confidential on Public Job Board
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3 py-2 rounded border border-slate-300 outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">State (2-letter)</label>
              <input
                type="text"
                maxLength={2}
                value={state}
                onChange={(e) => setState(e.target.value.toUpperCase())}
                className="w-full px-3 py-2 rounded border border-slate-300 outline-none uppercase font-bold"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Workplace Type</label>
              <select
                value={workplaceType}
                onChange={(e) => setWorkplaceType(e.target.value as any)}
                className="w-full px-3 py-2 rounded border border-slate-300 outline-none bg-white"
              >
                <option value="Hybrid">Hybrid</option>
                <option value="Remote">Remote</option>
                <option value="On-site">On-site</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Industry</label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value as any)}
                className="w-full px-3 py-2 rounded border border-slate-300 outline-none bg-white"
              >
                {INDUSTRIES_SERVED.map(i => (
                  <option key={i.id} value={i.name}>{i.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Job Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full px-3 py-2 rounded border border-slate-300 outline-none bg-white"
              >
                <option value="Direct Hire">Direct Hire</option>
                <option value="Contract">Contract</option>
                <option value="Contract-to-Hire">Contract-to-Hire</option>
                <option value="Executive Search">Executive Search</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Experience Level</label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value as any)}
                className="w-full px-3 py-2 rounded border border-slate-300 outline-none bg-white"
              >
                <option value="Entry Level">Entry Level</option>
                <option value="Mid Level">Mid Level</option>
                <option value="Senior Level">Senior Level</option>
                <option value="Lead / Principal">Lead / Principal</option>
                <option value="Director / Executive">Director / Executive</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Salary Min</label>
              <input
                type="number"
                value={salaryMin}
                onChange={(e) => setSalaryMin(Number(e.target.value))}
                className="w-full px-3 py-2 rounded border border-slate-300 outline-none font-mono"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Salary Max</label>
              <input
                type="number"
                value={salaryMax}
                onChange={(e) => setSalaryMax(Number(e.target.value))}
                className="w-full px-3 py-2 rounded border border-slate-300 outline-none font-mono"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Rate Cadence</label>
              <select
                value={salaryPeriod}
                onChange={(e) => setSalaryPeriod(e.target.value as any)}
                className="w-full px-3 py-2 rounded border border-slate-300 outline-none bg-white"
              >
                <option value="annual">Annual Salary ($/yr)</option>
                <option value="hourly">Hourly Rate ($/hr)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Key Skills (comma separated)</label>
            <input
              type="text"
              value={skillsStr}
              onChange={(e) => setSkillsStr(e.target.value)}
              placeholder="AWS, Kubernetes, Terraform, Go, CI/CD"
              className="w-full px-3 py-2 rounded border border-slate-300 outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Job Description *</label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 rounded border border-slate-300 outline-none"
            />
          </div>

          {/* Homepage Featured Opportunity Toggle */}
          <div className="p-3 bg-amber-50/70 border border-amber-200/90 rounded-lg flex items-start gap-3">
            <input
              type="checkbox"
              id="feat"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="mt-0.5 rounded text-[#1769AA] w-4 h-4 cursor-pointer"
            />
            <label htmlFor="feat" className="text-xs text-slate-700 cursor-pointer">
              <span className="font-bold text-[#10243A] block flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-[#D6A84B] fill-current" />
                <span>Display in Featured Career Opportunities section on Homepage</span>
              </span>
              <span className="text-[11px] text-slate-500 block mt-0.5">
                When enabled, this opening will be prioritized and displayed prominently in the 6-card Featured Career Opportunities marquee on the public homepage.
              </span>
            </label>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 font-bold text-slate-600 hover:bg-slate-100 rounded cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 font-bold text-white bg-[#10243A] hover:bg-[#1769AA] rounded cursor-pointer shadow-xs"
            >
              {job ? 'Save Changes' : 'Publish Job Listing'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

