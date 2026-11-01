export type JobType = 'Direct Hire' | 'Contract' | 'Contract-to-Hire' | 'Executive Search';

export type ExperienceLevel = 'Entry Level' | 'Mid Level' | 'Senior Level' | 'Lead / Principal' | 'Director / Executive';

export type IndustryType = 
  | 'Information Technology'
  | 'Healthcare'
  | 'Finance & Accounting'
  | 'Engineering'
  | 'Manufacturing'
  | 'Administrative & Clerical'
  | 'Customer Service & Call Centers'
  | 'Logistics & Supply Chain'
  | 'Life Sciences'
  | 'Sales & Marketing';

export interface Job {
  id: string;
  title: string;
  company: string; // Authorized client or confidential notation
  clientConfidential: boolean;
  location: string;
  city: string;
  state: string;
  workplaceType: 'Remote' | 'Hybrid' | 'On-site';
  industry: IndustryType;
  type: JobType;
  experienceLevel: ExperienceLevel;
  salaryMin: number;
  salaryMax: number;
  salaryPeriod: 'hourly' | 'annual';
  postedDate: string;
  description: string;
  responsibilities: string[];
  qualifications: string[];
  benefits: string[];
  skills: string[];
  featured?: boolean;
  status: 'published' | 'draft' | 'closed';
  applicantCount: number;
}

export type ApplicationStatus = 
  | 'New'
  | 'Under Review'
  | 'Shortlisted'
  | 'Interview Scheduled'
  | 'Selected'
  | 'Rejected'
  | 'Hired';

export interface InternalNote {
  id: string;
  author: string;
  text: string;
  createdAt: string;
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  candidateName: string;
  email: string;
  phone: string;
  location: string;
  resumeFileName: string;
  resumeFileSize?: string;
  resumeDataUrl?: string; // Stored base64 or generated text data
  appliedDate: string;
  status: ApplicationStatus;
  currentTitle: string;
  experienceYears: number;
  notes: InternalNote[];
  interviewDate?: string;
  interviewLink?: string;
}

export interface CandidateProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  zipCode: string;
  preferredJobTitle: string;
  industry: IndustryType;
  preferredWorkType: 'Direct Hire' | 'Contract' | 'Any';
  preferredWorkplace: 'Remote' | 'Hybrid' | 'On-site' | 'Open to Any';
  experienceYears: number;
  currentCompany?: string;
  education: string;
  skills: string[];
  workAuthorization: 'US Citizen' | 'Permanent Resident (Green Card)' | 'Employment Authorization Document (EAD)' | 'H-1B Visa Holder' | 'Other / Require Sponsorship';
  targetSalary: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  resumeFileName: string;
  resumeFileSize?: string;
  resumeDataUrl?: string;
  additionalNotes?: string;
  createdAt: string;
  status: 'Available' | 'Interviewing' | 'Placed' | 'Inactive';
  internalNotes: InternalNote[];
}

export interface EmployerInquiry {
  id: string;
  companyName: string;
  contactName: string;
  contactTitle: string;
  workEmail: string;
  phone: string;
  companyWebsite?: string;
  industry: IndustryType;
  staffingService: string;
  openPositionsCount: number;
  targetStartDate: string;
  jobLocation: string;
  workplaceType: 'Remote' | 'Hybrid' | 'On-site';
  targetRateRange: string;
  jobScopeDescription: string;
  submittedAt: string;
  status: 'New' | 'Discovery Scheduled' | 'Agreement Signed' | 'Active Sourcing' | 'Fulfilled' | 'Archived';
  internalNotes: InternalNote[];
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: 'Recruitment Trends' | 'Career Advice' | 'Hiring Strategies' | 'Workforce Insights';
  readTime: string;
  publishDate: string;
  author: {
    name: string;
    role: string;
  };
  keyTakeaways: string[];
  content: string[];
}

export interface AdminAccount {
  email: string;
  fullName: string;
  password: string;
  createdAt: string;
  role: 'Super Administrator';
  slotClaimed: boolean;
}

export interface QuickQuestion {
  id: string;
  ticketNumber: string;
  fullName: string;
  email: string;
  phone?: string;
  type: 'Quick Question' | 'Concern / Issue' | 'Candidate Inquiry' | 'Employer Inquiry' | 'Feedback';
  subject: string;
  message: string;
  urgency: 'Standard' | 'High' | 'Urgent';
  submittedAt: string;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Archived';
  adminResponse?: string;
  internalNotes: InternalNote[];
}

