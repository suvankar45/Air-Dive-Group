import { Job, CandidateProfile, Application, EmployerInquiry, ApplicationStatus, QuickQuestion, AdminAccount } from '../types';
import { INITIAL_JOBS, INITIAL_CANDIDATES, INITIAL_APPLICATIONS, INITIAL_EMPLOYER_INQUIRIES, INITIAL_QUICK_QUESTIONS } from '../data/mockData';

const STORAGE_KEYS = {
  JOBS: 'airdive_jobs_v2',
  CANDIDATES: 'airdive_candidates_v1',
  APPLICATIONS: 'airdive_applications_v1',
  EMPLOYER_INQUIRIES: 'airdive_employer_inquiries_v1',
  QUICK_QUESTIONS: 'airdive_quick_questions_v1',
  SAVED_JOBS: 'airdive_saved_jobs_v1',
  ADMIN_AUTH: 'airdive_admin_session_v1',
  ADMIN_ACCOUNT: 'airdive_admin_account_v1'
};


export const StorageService = {
  // Jobs
  getJobs(): Job[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.JOBS);
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(INITIAL_JOBS));
    return INITIAL_JOBS;
  },

  getJobById(id: string): Job | undefined {
    const jobs = this.getJobs();
    return jobs.find(j => j.id === id);
  },

  saveJob(job: Job): void {
    const jobs = this.getJobs();
    const existingIndex = jobs.findIndex(j => j.id === job.id);
    if (existingIndex >= 0) {
      jobs[existingIndex] = job;
    } else {
      jobs.unshift(job);
    }
    localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(jobs));
  },

  deleteJob(id: string): void {
    const jobs = this.getJobs().filter(j => j.id !== id);
    localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(jobs));
  },

  // Candidates
  getCandidates(): CandidateProfile[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CANDIDATES);
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    localStorage.setItem(STORAGE_KEYS.CANDIDATES, JSON.stringify(INITIAL_CANDIDATES));
    return INITIAL_CANDIDATES;
  },

  addCandidate(candidateData: Omit<CandidateProfile, 'id' | 'createdAt' | 'status' | 'internalNotes'>): CandidateProfile {
    const candidates = this.getCandidates();
    const newCandidate: CandidateProfile = {
      ...candidateData,
      id: `cand-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString(),
      status: 'Available',
      internalNotes: []
    };
    candidates.unshift(newCandidate);
    localStorage.setItem(STORAGE_KEYS.CANDIDATES, JSON.stringify(candidates));
    return newCandidate;
  },

  updateCandidateStatus(id: string, status: CandidateProfile['status']): void {
    const candidates = this.getCandidates();
    const target = candidates.find(c => c.id === id);
    if (target) {
      target.status = status;
      localStorage.setItem(STORAGE_KEYS.CANDIDATES, JSON.stringify(candidates));
    }
  },

  addCandidateNote(candidateId: string, author: string, text: string): void {
    const candidates = this.getCandidates();
    const target = candidates.find(c => c.id === candidateId);
    if (target) {
      target.internalNotes.unshift({
        id: `note-${Date.now()}`,
        author,
        text,
        createdAt: new Date().toISOString()
      });
      localStorage.setItem(STORAGE_KEYS.CANDIDATES, JSON.stringify(candidates));
    }
  },

  // Applications
  getApplications(): Application[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(INITIAL_APPLICATIONS));
    return INITIAL_APPLICATIONS;
  },

  submitApplication(appData: {
    jobId: string;
    jobTitle: string;
    candidateName: string;
    email: string;
    phone: string;
    location: string;
    resumeFileName: string;
    resumeFileSize?: string;
    resumeDataUrl?: string;
    currentTitle?: string;
    experienceYears?: number;
  }): Application {
    const apps = this.getApplications();
    const newApp: Application = {
      id: `app-${Date.now().toString().slice(-4)}`,
      jobId: appData.jobId,
      jobTitle: appData.jobTitle,
      candidateName: appData.candidateName,
      email: appData.email,
      phone: appData.phone,
      location: appData.location,
      resumeFileName: appData.resumeFileName,
      resumeFileSize: appData.resumeFileSize || '180 KB',
      resumeDataUrl: appData.resumeDataUrl,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'New',
      currentTitle: appData.currentTitle || 'Professional Candidate',
      experienceYears: appData.experienceYears || 3,
      notes: []
    };
    apps.unshift(newApp);
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(apps));

    // Also update applicant count on job
    const jobs = this.getJobs();
    const targetJob = jobs.find(j => j.id === appData.jobId);
    if (targetJob) {
      targetJob.applicantCount = (targetJob.applicantCount || 0) + 1;
      this.saveJob(targetJob);
    }

    return newApp;
  },

  updateApplicationStatus(id: string, status: ApplicationStatus, extra?: { interviewDate?: string; interviewLink?: string }): void {
    const apps = this.getApplications();
    const target = apps.find(a => a.id === id);
    if (target) {
      target.status = status;
      if (extra?.interviewDate) target.interviewDate = extra.interviewDate;
      if (extra?.interviewLink) target.interviewLink = extra.interviewLink;
      localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(apps));
    }
  },

  addApplicationNote(applicationId: string, author: string, text: string): void {
    const apps = this.getApplications();
    const target = apps.find(a => a.id === applicationId);
    if (target) {
      target.notes.unshift({
        id: `anote-${Date.now()}`,
        author,
        text,
        createdAt: new Date().toISOString()
      });
      localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(apps));
    }
  },

  // Employer Inquiries
  getEmployerInquiries(): EmployerInquiry[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.EMPLOYER_INQUIRIES);
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    localStorage.setItem(STORAGE_KEYS.EMPLOYER_INQUIRIES, JSON.stringify(INITIAL_EMPLOYER_INQUIRIES));
    return INITIAL_EMPLOYER_INQUIRIES;
  },

  submitEmployerInquiry(inquiryData: Omit<EmployerInquiry, 'id' | 'submittedAt' | 'status' | 'internalNotes'>): EmployerInquiry {
    const inquiries = this.getEmployerInquiries();
    const newInquiry: EmployerInquiry = {
      ...inquiryData,
      id: `inq-${Date.now().toString().slice(-4)}`,
      submittedAt: new Date().toISOString(),
      status: 'New',
      internalNotes: []
    };
    inquiries.unshift(newInquiry);
    localStorage.setItem(STORAGE_KEYS.EMPLOYER_INQUIRIES, JSON.stringify(inquiries));
    return newInquiry;
  },

  updateEmployerInquiryStatus(id: string, status: EmployerInquiry['status']): void {
    const inquiries = this.getEmployerInquiries();
    const target = inquiries.find(i => i.id === id);
    if (target) {
      target.status = status;
      localStorage.setItem(STORAGE_KEYS.EMPLOYER_INQUIRIES, JSON.stringify(inquiries));
    }
  },

  addEmployerInquiryNote(inquiryId: string, author: string, text: string): void {
    const inquiries = this.getEmployerInquiries();
    const target = inquiries.find(i => i.id === inquiryId);
    if (target) {
      target.internalNotes.unshift({
        id: `inote-${Date.now()}`,
        author,
        text,
        createdAt: new Date().toISOString()
      });
      localStorage.setItem(STORAGE_KEYS.EMPLOYER_INQUIRIES, JSON.stringify(inquiries));
    }
  },

  // Saved / Bookmarked jobs
  getSavedJobIds(): string[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SAVED_JOBS);
      if (stored) return JSON.parse(stored);
    } catch {}
    return [];
  },

  toggleSaveJob(jobId: string): boolean {
    const saved = this.getSavedJobIds();
    const exists = saved.includes(jobId);
    let updated: string[];
    if (exists) {
      updated = saved.filter(id => id !== jobId);
    } else {
      updated = [...saved, jobId];
    }
    localStorage.setItem(STORAGE_KEYS.SAVED_JOBS, JSON.stringify(updated));
    return !exists;
  },

  // Quick Questions & Concerns
  getQuickQuestions(): QuickQuestion[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.QUICK_QUESTIONS);
      if (stored) return JSON.parse(stored);
    } catch {}
    localStorage.setItem(STORAGE_KEYS.QUICK_QUESTIONS, JSON.stringify(INITIAL_QUICK_QUESTIONS));
    return INITIAL_QUICK_QUESTIONS;
  },

  addQuickQuestion(data: Omit<QuickQuestion, 'id' | 'ticketNumber' | 'submittedAt' | 'status' | 'internalNotes'>): QuickQuestion {
    const questions = this.getQuickQuestions();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newQuestion: QuickQuestion = {
      ...data,
      id: `qq-${Date.now()}`,
      ticketNumber: `ADG-TKT-${randomSuffix}`,
      submittedAt: new Date().toISOString(),
      status: 'Open',
      internalNotes: []
    };
    questions.unshift(newQuestion);
    localStorage.setItem(STORAGE_KEYS.QUICK_QUESTIONS, JSON.stringify(questions));
    return newQuestion;
  },

  updateQuickQuestionStatus(id: string, status: QuickQuestion['status'], adminResponse?: string): void {
    const questions = this.getQuickQuestions();
    const target = questions.find(q => q.id === id);
    if (target) {
      target.status = status;
      if (adminResponse !== undefined) {
        target.adminResponse = adminResponse;
      }
      localStorage.setItem(STORAGE_KEYS.QUICK_QUESTIONS, JSON.stringify(questions));
    }
  },

  addQuickQuestionNote(id: string, author: string, text: string): void {
    const questions = this.getQuickQuestions();
    const target = questions.find(q => q.id === id);
    if (target) {
      target.internalNotes.unshift({
        id: `qn-${Date.now()}`,
        author,
        text,
        createdAt: new Date().toISOString()
      });
      localStorage.setItem(STORAGE_KEYS.QUICK_QUESTIONS, JSON.stringify(questions));
    }
  },

  deleteQuickQuestion(id: string): void {
    const questions = this.getQuickQuestions().filter(q => q.id !== id);
    localStorage.setItem(STORAGE_KEYS.QUICK_QUESTIONS, JSON.stringify(questions));
  },

  // Admin Account (Single Slot Provisioning)
  getAdminAccount(): AdminAccount | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ADMIN_ACCOUNT);
      if (stored) return JSON.parse(stored);
    } catch {}
    return null;
  },

  hasAdminSlotAvailable(): boolean {
    return this.getAdminAccount() === null;
  },

  claimAdminSlot(email: string, fullName: string, password: string): { success: boolean; message: string; account?: AdminAccount } {
    if (this.getAdminAccount() !== null) {
      return {
        success: false,
        message: 'The single administrator account slot has already been claimed. System registration is permanently locked.'
      };
    }

    if (!email || !email.includes('@')) {
      return { success: false, message: 'Please provide a valid corporate email address.' };
    }

    if (!fullName || fullName.trim().length < 2) {
      return { success: false, message: 'Please provide the administrator full name.' };
    }

    if (!password || password.length < 5) {
      return { success: false, message: 'Password must be at least 5 characters.' };
    }

    const newAccount: AdminAccount = {
      email: email.trim().toLowerCase(),
      fullName: fullName.trim(),
      password: password,
      createdAt: new Date().toISOString(),
      role: 'Super Administrator',
      slotClaimed: true
    };

    localStorage.setItem(STORAGE_KEYS.ADMIN_ACCOUNT, JSON.stringify(newAccount));
    this.setAdminLoggedIn(true);
    return {
      success: true,
      message: 'Administrator account successfully provisioned! 1 of 1 slot claimed. Registration is now permanently locked.',
      account: newAccount
    };
  },

  verifyAdminLogin(email: string, password: string): { success: boolean; message: string; account?: AdminAccount } {
    const account = this.getAdminAccount();
    if (!account) {
      return {
        success: false,
        message: 'No administrator account has been provisioned yet. Please claim the single available admin slot.'
      };
    }

    if (account.email.toLowerCase() === email.trim().toLowerCase() && account.password === password) {
      this.setAdminLoggedIn(true);
      return { success: true, message: 'Login successful.', account };
    }

    return {
      success: false,
      message: 'Invalid credentials. Only the registered primary administrator can access this portal.'
    };
  },

  // Admin Auth session state
  isAdminLoggedIn(): boolean {
    return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
  },

  setAdminLoggedIn(val: boolean): void {
    localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, val ? 'true' : 'false');
  },

  // Reset to sample initial data
  resetAllData(): void {
    localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(INITIAL_JOBS));
    localStorage.setItem(STORAGE_KEYS.CANDIDATES, JSON.stringify(INITIAL_CANDIDATES));
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(INITIAL_APPLICATIONS));
    localStorage.setItem(STORAGE_KEYS.EMPLOYER_INQUIRIES, JSON.stringify(INITIAL_EMPLOYER_INQUIRIES));
    localStorage.setItem(STORAGE_KEYS.QUICK_QUESTIONS, JSON.stringify(INITIAL_QUICK_QUESTIONS));
  }
};

