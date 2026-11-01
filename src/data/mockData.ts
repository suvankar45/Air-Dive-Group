import { Job, CandidateProfile, EmployerInquiry, Application, Article, IndustryType, QuickQuestion } from '../types';

export interface ServiceDetail {
  id: string;
  number: string;
  title: string;
  shortDescription: string;
  tagline: string;
  overview: string;
  businessBenefits: string[];
  industriesSupported: string[];
  process: { step: string; title: string; description: string }[];
  faqs: { question: string; answer: string }[];
}

export const STAFFING_SERVICES: ServiceDetail[] = [
  {
    id: 'temporary-staffing',
    number: '01',
    title: 'Temporary Staffing',
    shortDescription: 'Agile workforce deployment for seasonal peaks, project deadlines, and unexpected coverage across US operations.',
    tagline: 'Rapid access to pre-screened talent ready to produce from day one.',
    overview: 'Air Dive Group provides agile temporary staffing solutions designed to maintain productivity through workload spikes, medical leaves, and sudden business expansions. We handle payroll, employer taxes, worker compensation, and onboarding administration so you can focus entirely on operational output.',
    businessBenefits: [
      'Eliminate overhead with complete Air Dive Group employer-of-record administration',
      'Average 24 to 48-hour submittal turnaround for critical operational roles',
      'Rigorous skill-testing and behavioral pre-screening before on-site deployment',
      'Flexible contract durations ranging from single-week projects to multi-month surges'
    ],
    industriesSupported: [
      'Administrative & Clerical',
      'Customer Service & Call Centers',
      'Manufacturing',
      'Logistics & Supply Chain',
      'Finance & Accounting'
    ],
    process: [
      { step: '01', title: 'Need Intake', description: 'Immediate alignment on headcount, shift requirements, skill competencies, and start date.' },
      { step: '02', title: 'Talent Dispatch', description: 'Direct deployment from our active, pre-vetted local and regional talent rosters.' },
      { step: '03', title: 'Onboarding & Compliance', description: 'I-9 verification, background screenings, and client-specific safety orientations.' },
      { step: '04', title: 'Ongoing Performance Check', description: 'Weekly recruiter check-ins and automated timecard management.' }
    ],
    faqs: [
      {
        question: 'Who handles worker compensation and taxes for temporary employees?',
        answer: 'Air Dive Group serves as the employer of record, managing all payroll taxes, state unemployment, statutory benefits, and workers’ compensation insurance.'
      },
      {
        question: 'How quickly can temporary personnel begin work?',
        answer: 'For standard commercial and administrative positions, pre-vetted associates can typically start within 24 to 48 hours of intake.'
      }
    ]
  },
  {
    id: 'contract-staffing',
    number: '02',
    title: 'Contract Staffing',
    shortDescription: 'High-caliber technical, financial, and specialized consultants engaged on fixed or milestone-driven statements of work.',
    tagline: 'Subject matter expertise scaled precisely to your project timelines.',
    overview: 'Contract Staffing provides enterprise organizations with specialized subject matter experts in technology, engineering, finance, and regulatory compliance. Whether modernizing legacy cloud infrastructure or preparing for year-end SOX compliance, our specialized contractors bring deep domain acumen without expanding permanent headcount.',
    businessBenefits: [
      'Access scarce technical competencies without long-term balance sheet commitments',
      'Milestone-focused delivery and transparent hourly or project billing structures',
      'Strict non-disclosure, IP assignment, and regulatory adherence protocols',
      'Dedicated recruiter management ensuring consultant retention throughout engagement'
    ],
    industriesSupported: [
      'Information Technology',
      'Engineering',
      'Finance & Accounting',
      'Life Sciences',
      'Healthcare'
    ],
    process: [
      { step: '01', title: 'Technical Scoping', description: 'Reviewing tech stack, architecture requirements, and milestone deliverables.' },
      { step: '02', title: 'Specialist Sourcing', description: 'Engaging passive consultant networks with proven sector experience.' },
      { step: '03', title: 'Technical Vetting', description: 'Rigorous peer code reviews, architectural discussions, and credential checks.' },
      { step: '04', title: 'Project Mobilization', description: 'Rapid provisioning into your secure environment with continuous check-ins.' }
    ],
    faqs: [
      {
        question: 'Can contract periods be extended as project needs evolve?',
        answer: 'Yes. Contract extensions are handled seamlessly with updated statements of work and ongoing recruiter support.'
      },
      {
        question: 'Are Air Dive Group contractors verified for US work authorization?',
        answer: 'Every candidate undergoes strict I-9 and E-Verify processing prior to commencement.'
      }
    ]
  },
  {
    id: 'contract-to-hire',
    number: '03',
    title: 'Contract-to-Hire',
    shortDescription: 'Evaluate technical competence, workplace culture alignment, and team chemistry before finalizing permanent offers.',
    tagline: 'De-risk key hiring decisions with real-world operational evaluation.',
    overview: 'Contract-to-Hire positions give employers the opportunity to evaluate an associate’s actual day-to-day contributions, technical capabilities, and cultural chemistry in your real operating environment before committing to a direct permanent hire. Meanwhile, candidates experience your team culture first-hand.',
    businessBenefits: [
      'Virtually eliminate costly bad hires by observing true workplace performance',
      'Maintain operational continuity while assessing long-term team fit',
      'Transparent conversion fee schedules based on contract hours completed',
      'Seamless transition from contractor to full-time payroll'
    ],
    industriesSupported: [
      'Information Technology',
      'Healthcare',
      'Finance & Accounting',
      'Engineering',
      'Sales & Marketing'
    ],
    process: [
      { step: '01', title: 'Role Benchmark', description: 'Define both immediate project requirements and long-term permanent success criteria.' },
      { step: '02', title: 'Dual-Fit Screening', description: 'Assess technical readiness alongside long-term career motivations and cultural synergy.' },
      { step: '03', title: 'Contract Phase', description: 'Active work period (typically 3 to 6 months) with milestone reviews.' },
      { step: '04', title: 'Permanent Rollover', description: 'Smooth conversion to your direct payroll with no administrative friction.' }
    ],
    faqs: [
      {
        question: 'What is the standard duration before converting to full-time?',
        answer: 'The standard evaluation timeframe is between 3 and 6 months (520 to 1,040 billable hours), though customized schedules can be arranged.'
      }
    ]
  },
  {
    id: 'direct-hire-recruitment',
    number: '04',
    title: 'Direct Hire Recruitment',
    shortDescription: 'Contingent and retained search for full-time core talent, connecting you with top-tier professionals nationwide.',
    tagline: 'Strategic talent acquisition that fuels sustainable organizational growth.',
    overview: 'Direct Hire Recruitment addresses critical permanent positions across all corporate and technical functions. Our recruiters tap into passive candidate networks—professionals not active on job boards—to introduce proven talent that aligns with your leadership values, technical expectations, and company culture.',
    businessBenefits: [
      'Comprehensive candidate sourcing targeting the top 15% passive market performers',
      'In-depth behavioral interviews, technical screening, and verified professional references',
      'Performance replacement guarantee on all direct placements',
      'Compensation benchmarking and offer negotiation facilitation to maximize acceptance rates'
    ],
    industriesSupported: [
      'All 10 Specialized Industries',
      'Enterprise & Mid-Market US Corporations'
    ],
    process: [
      { step: '01', title: 'Discovery & Calibration', description: 'Deep dive into role expectations, team dynamics, compensation, and selling points.' },
      { step: '02', title: 'Targeted Outreach', description: 'Recruiter engagement across specialized industry networks and passive talent pools.' },
      { step: '03', title: 'Shortlist Presentation', description: 'Delivery of vetted candidate dossiers with executive summary notes.' },
      { step: '04', title: 'Offer & Onboarding', description: 'Strategic offer presentation, counter-offer mitigation, and start date confirmation.' }
    ],
    faqs: [
      {
        question: 'What guarantee does Air Dive Group provide on direct hires?',
        answer: 'We provide a comprehensive replacement guarantee period (typically 60 to 90 days) outlined clearly in our service agreement.'
      }
    ]
  },
  {
    id: 'executive-search',
    number: '05',
    title: 'Executive Search',
    shortDescription: 'Discreet, retained search for C-Suite executives, vice presidents, and board directors who transform enterprise performance.',
    tagline: 'Confidential leadership advisory for transformative business visionaries.',
    overview: 'Air Dive Group Executive Search operates with the highest standards of discretion, diligence, and market intelligence. We partner with boards of directors, private equity sponsors, and chief executives to recruit visionary leaders capable of steering complex transformations and delivering shareholder value.',
    businessBenefits: [
      'Complete confidentiality protocols protecting sensitive leadership transitions',
      'Exhaustive 360-degree leadership competency assessments and governance track record verification',
      'Proprietary national mapping of executive talent across competitive markets',
      'Executive compensation structuring including equity, bonus, and incentive package advisory'
    ],
    industriesSupported: [
      'Technology & SaaS',
      'Healthcare Systems & MedTech',
      'Financial Services & Private Equity',
      'Industrial Manufacturing & Supply Chain'
    ],
    process: [
      { step: '01', title: 'Mandate Scoping', description: 'Strategic consultation with Board/CEO on enterprise vision and leadership profile.' },
      { step: '02', title: 'Market Mapping', description: 'Rigorous identification of active and passive market leaders across the US.' },
      { step: '03', title: 'Confidential Vetting', description: 'Structured behavioral and situational leadership evaluation.' },
      { step: '04', title: 'Appointment & Integration', description: 'Closing negotiations, board presentation, and transition advisory.' }
    ],
    faqs: [
      {
        question: 'How is confidentiality maintained during an executive search?',
        answer: 'We utilize strict non-disclosure agreements, anonymized prospect profiles, and off-site interview logistics to ensure complete discretion.'
      }
    ]
  },
  {
    id: 'permanent-placement',
    number: '06',
    title: 'Permanent Placement',
    shortDescription: 'Dedicated recruitment specialists focused on long-term career matches that elevate institutional capability.',
    tagline: 'Building enduring teams that strengthen your competitive advantage.',
    overview: 'Permanent placement is at the heart of building organizational stability. Air Dive Group acts as a true extension of your internal talent acquisition department, delivering consistent pipelines of qualified professionals for recurring hiring needs and specialized departmental expansion.',
    businessBenefits: [
      'Reduces internal recruiting burden, decreasing cost-per-hire and time-to-fill',
      'Access to candidates with long-term retention track records and career stability',
      'Thorough cultural assessment ensuring mutual expectations and high retention',
      'Customized hiring metrics and reporting dashboards for HR leadership'
    ],
    industriesSupported: [
      'Finance & Accounting',
      'Human Resources & Operations',
      'Engineering & Manufacturing',
      'Customer Care & Sales'
    ],
    process: [
      { step: '01', title: 'Pipeline Planning', description: 'Forecast recurring headcount needs and create tailored hiring sprints.' },
      { step: '02', title: 'Active Sourcing Engine', description: 'Continuous talent pipelining through direct outreach and referral networks.' },
      { step: '03', title: 'Pre-Screening & Profiling', description: 'Comprehensive skill validation, compensation alignment, and background pre-checks.' },
      { step: '04', title: 'Hiring & Integration', description: 'Smooth candidate transition and 30-60-90 day retention follow-up.' }
    ],
    faqs: [
      {
        question: 'How do you benchmark candidate compensation?',
        answer: 'We provide real-time US metropolitan compensation data to ensure your offers are competitive and attract top quartile talent.'
      }
    ]
  },
  {
    id: 'recruitment-process-outsourcing',
    number: '07',
    title: 'Recruitment Process Outsourcing (RPO)',
    shortDescription: 'Comprehensive talent acquisition management embedded directly within your enterprise HR and operational teams.',
    tagline: 'End-to-end recruitment infrastructure delivering enterprise scale and speed.',
    overview: 'Air Dive Group RPO solutions transfer all or part of your recruitment operations to our specialized staffing team. We manage the entire talent acquisition lifecycle—from job profiling and employer branding to sourcing, interviewing, compliance, and offer management—integrating directly with your ATS.',
    businessBenefits: [
      'Scale recruiting capacity up or down rapidly according to market demand',
      'Improve key hiring metrics: reduce time-to-hire by up to 35% and lower recruiting costs',
      'Consistent, enterprise-grade candidate experience that enhances your employer brand',
      'Data-driven recruitment insights, SLA compliance, and weekly executive analytics'
    ],
    industriesSupported: [
      'High-growth Technology Firms',
      'Regional Healthcare Networks',
      'Multi-site Manufacturing Operations',
      'Financial Services Institutions'
    ],
    process: [
      { step: '01', title: 'Audit & Integration', description: 'Analyze existing hiring workflows, ATS tools, and brand positioning.' },
      { step: '02', title: 'Team Deployment', description: 'Assign dedicated Air Dive Group talent acquisition partners to your brand.' },
      { step: '03', title: 'Process Optimization', description: 'Standardize intake, interview scorecards, candidate nurturing, and reporting.' },
      { step: '04', title: 'Performance Reporting', description: 'Track time-to-fill, offer acceptance rates, diversity metrics, and cost savings.' }
    ],
    faqs: [
      {
        question: 'Can Air Dive Group work inside our existing ATS?',
        answer: 'Yes. Our recruiters are experienced across major enterprise ATS platforms including Workday, Greenhouse, Lever, and iCIMS.'
      }
    ]
  },
  {
    id: 'workforce-solutions',
    number: '08',
    title: 'Workforce Solutions',
    shortDescription: 'Vendor Management (VMS/MSP) alignment, payroll services, and strategic contingent workforce optimization.',
    tagline: 'Holistic workforce governance that ensures compliance and cost containment.',
    overview: 'Modern workforce management requires strategic coordination across direct employees, 1099 contractors, statement-of-work consultants, and staffing agencies. Air Dive Group provides structured workforce solutions including payroll services, contractor compliance auditing, and tier-1 vendor support.',
    businessBenefits: [
      'Mitigate FLSA, co-employment, and independent contractor misclassification risks',
      'Consolidate billing, invoicing, and reporting across contingent labor programs',
      'Maintain 100% compliance with federal, state, and municipal labor standards',
      'Competitive markups and transparent cost structure for pass-through payroll'
    ],
    industriesSupported: [
      'Enterprise Organizations',
      'National Supply Chains',
      'Defense & Aerospace Contractors',
      'Healthcare & Life Science Systems'
    ],
    process: [
      { step: '01', title: 'Workforce Audit', description: 'Review current contingent labor roster, rate structures, and compliance posture.' },
      { step: '02', title: 'Governance Design', description: 'Establish standardized pay rates, onboarding workflows, and SLA metrics.' },
      { step: '03', title: 'Implementation', description: 'Seamless migration of current contractors with zero operational interruption.' },
      { step: '04', title: 'Continuous Oversight', description: 'Quarterly business reviews, compliance reporting, and spend analysis.' }
    ],
    faqs: [
      {
        question: 'What are the risks of contractor misclassification?',
        answer: 'Misclassifying employees as independent contractors can trigger severe IRS penalties, back taxes, and legal liability. Our payroll service eliminates this risk.'
      }
    ]
  }
];

export interface IndustryDetail {
  id: string;
  name: IndustryType;
  headline: string;
  description: string;
  keyRoles: string[];
  marketTrends: string;
  complianceNotes: string;
}

export const INDUSTRIES_SERVED: IndustryDetail[] = [
  {
    id: 'it',
    name: 'Information Technology',
    headline: 'Engineering the digital backbone of American enterprise.',
    description: 'We connect tech organizations with high-impact software engineers, cloud architects, cybersecurity specialists, and DevOps leaders capable of executing modern digital transformation.',
    keyRoles: ['Full Stack Engineers (React, Node, Java, .NET)', 'Cloud Architects (AWS, Azure, GCP)', 'Cybersecurity Engineers (SOC, IAM, CISSP)', 'DevOps & Site Reliability Engineers', 'Data Engineers & Business Intelligence Specialists', 'Enterprise Solutions Architects'],
    marketTrends: 'High demand for specialized cloud modernization, AI/ML operationalization, and Zero Trust security protocols.',
    complianceNotes: 'SOC2 Type II, ISO 27001, and secure clearance verification capabilities.'
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    headline: 'Staffing vital clinical and operational care with speed and empathy.',
    description: 'Supporting health systems, clinics, and specialized care facilities with clinical leaders, registered nurses, allied health specialists, and medical administration.',
    keyRoles: ['Registered Nurses (ICU, ER, Med/Surg)', 'Clinical Nurse Specialists & Managers', 'Allied Health Professionals', 'Medical Coders & Revenue Cycle Specialists', 'Healthcare IT (Epic, Cerner Analysts)', 'Healthcare Executive Leadership'],
    marketTrends: 'Persistent nationwide nursing shortages and expanded telemedicine clinical support.',
    complianceNotes: 'Strict credentialing, OIG/SAM background verification, BLS/ACLS checks, and HIPAA compliance.'
  },
  {
    id: 'finance-accounting',
    name: 'Finance & Accounting',
    headline: 'Delivering precision, fiscal integrity, and strategic advisory.',
    description: 'From certified public accountants and financial analysts to corporate controllers and CFOs, we supply quantitative talent that safeguards fiscal health.',
    keyRoles: ['Senior Corporate Accountants & CPAs', 'Financial Planning & Analysis (FP&A) Managers', 'Audit & Tax Specialists', 'Controllers & Directors of Finance', 'Treasury & Risk Management Analysts', 'Chief Financial Officers (CFO)'],
    marketTrends: 'Heightened focus on automation in reconciliation, financial reporting, and complex GAAP/IFRS standards.',
    complianceNotes: 'Rigorous credit checks, FINRA familiarity, and SOX compliance alignment.'
  },
  {
    id: 'engineering',
    name: 'Engineering',
    headline: 'Pioneering infrastructure, hardware, and physical innovation.',
    description: 'Recruiting licensed professional engineers across mechanical, electrical, civil, and industrial disciplines for major aerospace, infrastructure, and commercial initiatives.',
    keyRoles: ['Mechanical Design Engineers (SolidWorks, CATIA)', 'Electrical & Embedded Systems Engineers', 'Civil & Structural Project Engineers', 'Quality Assurance & Reliability Engineers', 'Automation & Robotics Specialists', 'Chief Engineers & Engineering VPs'],
    marketTrends: 'Reshoring of advanced manufacturing and substantial investment in clean energy infrastructure.',
    complianceNotes: 'PE licensure checks, FE certifications, and project-specific safety compliance.'
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    headline: 'Powering American assembly, production, and plant operations.',
    description: 'Supplying plant managers, CNC machinists, maintenance technicians, and production supervisors who drive high-efficiency industrial throughput.',
    keyRoles: ['Plant Managers & Operations Directors', 'Maintenance Mechanics & Millwrights', 'CNC Programmers & Machinists', 'Quality Control & Six Sigma Black Belts', 'Production Shift Supervisors', 'Environmental Health & Safety (EHS) Specialists'],
    marketTrends: 'Adoption of Industry 4.0 IoT sensors, lean manufacturing practices, and continuous shift optimization.',
    complianceNotes: 'OSHA 10/30 certifications, lock-out/tag-out training, and drug & safety screenings.'
  },
  {
    id: 'administrative-clerical',
    name: 'Administrative & Clerical',
    headline: 'The organizational keystones behind smooth corporate operations.',
    description: 'Providing reliable executive assistants, office managers, legal secretaries, and clerical specialists who keep corporate headquarters running flawlessly.',
    keyRoles: ['Executive Assistants to C-Suite', 'Office Managers & Facilities Coordinators', 'Legal Assistants & Paralegals', 'Data Entry Specialists', 'Human Resources Coordinators', 'Front Office Reception Managers'],
    marketTrends: 'Evolution into hybrid office management and mastery of modern enterprise productivity suites.',
    complianceNotes: 'Software proficiency testing, reference audits, and confidential non-disclosure compliance.'
  },
  {
    id: 'customer-service',
    name: 'Customer Service & Call Centers',
    headline: 'Elevating customer loyalty through empathetic, skilled communication.',
    description: 'Deploying high-volume inbound customer service representatives, technical support tiers, and contact center team leads who represent your brand with excellence.',
    keyRoles: ['Customer Support Specialists (Tier 1-3)', 'Technical Support Helpdesk Agents', 'Call Center Team Leads & Supervisors', 'Client Success Managers', 'Bilingual Support Representatives', 'Workforce Management (WFM) Planners'],
    marketTrends: 'Omnichannel communication (voice, chat, email) and CRM integration (Zendesk, Salesforce).',
    complianceNotes: 'PCI-DSS awareness for payment processing and call monitoring metrics.'
  },
  {
    id: 'logistics-supply-chain',
    name: 'Logistics & Supply Chain',
    headline: 'Connecting materials, distribution hubs, and final-mile fulfillment.',
    description: 'Sourcing logistics directors, warehouse managers, inventory analysts, and procurement specialists who optimize end-to-end supply chains across the US.',
    keyRoles: ['Supply Chain Directors & VPs', 'Warehouse Operations Managers', 'Freight Brokers & Dispatchers', 'Inventory Control Specialists', 'Strategic Procurement Managers', 'Global Logistics Coordinators'],
    marketTrends: 'E-commerce fulfillment demands, automated warehouse management (WMS), and route optimization.',
    complianceNotes: 'DOT regulations, CDL verification support, and C-TPAT security standards.'
  },
  {
    id: 'life-sciences',
    name: 'Life Sciences',
    headline: 'Accelerating breakthroughs in pharmaceuticals, biotechnology, and devices.',
    description: 'Partnering with research laboratories, biotech startups, and pharmaceutical leaders to place clinical research associates, biostatisticians, and regulatory managers.',
    keyRoles: ['Clinical Research Associates (CRA)', 'Regulatory Affairs Specialists', 'Biochemists & Formulation Scientists', 'Quality Assurance (GMP/GLP) Auditors', 'Biostatisticians & SAS Programmers', 'Medical Science Liaisons (MSL)'],
    marketTrends: 'Accelerated clinical trial cycles, personalized medicine research, and strict FDA submission scrutiny.',
    complianceNotes: '21 CFR Part 11, FDA cGMP/GLP standards, and certified lab safety records.'
  },
  {
    id: 'sales-marketing',
    name: 'Sales & Marketing',
    headline: 'Driving commercial revenue and brand dominance in competitive markets.',
    description: 'Recruiting top-performing enterprise account executives, business development managers, digital marketing directors, and product marketing strategists.',
    keyRoles: ['Enterprise Account Executives (SaaS/B2B)', 'Business Development Representatives (BDR)', 'Directors of Growth Marketing', 'Product Marketing Managers', 'Content & Brand Strategists', 'Vice Presidents of Global Sales'],
    marketTrends: 'Focus on quota attainment track records, account-based marketing (ABM), and sales pipeline velocity.',
    complianceNotes: 'Verified commission attainment history and confidential candidate non-compete reviews.'
  }
];

export const INITIAL_JOBS: Job[] = [
  {
    id: 'job-feat-1',
    title: 'Entry level Data analyst',
    company: 'Apex Health Analytics Group',
    clientConfidential: false,
    location: 'Atlanta, GA (Hybrid)',
    city: 'Atlanta',
    state: 'GA',
    workplaceType: 'Hybrid',
    industry: 'Information Technology',
    type: 'Direct Hire',
    experienceLevel: 'Entry Level',
    salaryMin: 68000,
    salaryMax: 82000,
    salaryPeriod: 'annual',
    postedDate: '2026-10-30',
    featured: true,
    status: 'published',
    applicantCount: 24,
    description: 'Air Dive Group has been engaged by an innovative healthcare data intelligence consultancy in Atlanta, GA to recruit an Entry Level Data Analyst. In this role, you will analyze large clinical performance datasets, clean and transform ETL data pipelines using SQL and Python, and build executive business dashboards in Power BI and Tableau for senior healthcare leaders.',
    responsibilities: [
      'Develop, test, and maintain interactive business intelligence dashboards in Power BI and Tableau for clinical stakeholders.',
      'Write optimized SQL queries to extract, clean, and validate data across enterprise relational database systems.',
      'Perform exploratory data analysis using Python (Pandas, NumPy) to identify operational efficiency patterns.',
      'Partner with client data engineering and clinical practice leads to document key performance metrics and definitions.'
    ],
    qualifications: [
      'Bachelor’s degree in Data Analytics, Computer Science, Statistics, Information Systems, or related quantitative field.',
      'Demonstrated proficiency in SQL and Python for data querying, transformation, and cleansing.',
      'Hands-on portfolio demonstrating Power BI, Tableau, or modern data visualization design.',
      'Strong analytical curiosity, attention to detail, and problem-solving velocity.'
    ],
    benefits: [
      'Competitive entry-level base salary plus annual performance bonus',
      'Comprehensive Blue Cross health, dental, and vision insurance with HSA/FSA options',
      '401(k) retirement plan with 5% employer match from day one',
      'Dedicated mentorship program and annual technical certification stipends'
    ],
    skills: ['SQL', 'Python', 'Power BI', 'Tableau', 'Excel (Advanced)', 'ETL Pipelines', 'Data Modeling']
  },
  {
    id: 'job-feat-2',
    title: 'Business Analyst',
    company: 'Capital Horizon Financial Group',
    clientConfidential: true,
    location: 'Charlotte, NC (Hybrid)',
    city: 'Charlotte',
    state: 'NC',
    workplaceType: 'Hybrid',
    industry: 'Finance & Accounting',
    type: 'Direct Hire',
    experienceLevel: 'Mid Level',
    salaryMin: 88000,
    salaryMax: 108000,
    salaryPeriod: 'annual',
    postedDate: '2026-10-29',
    featured: true,
    status: 'published',
    applicantCount: 19,
    description: 'Air Dive Group is conducting a direct-hire recruitment assignment for a Business Analyst with a prominent commercial banking and financial services institution in Charlotte, NC. You will act as the key conduit between executive finance stakeholders and engineering squads, translating complex banking workflows into agile user stories, functional requirement specifications, and process improvement roadmaps.',
    responsibilities: [
      'Facilitate requirements discovery workshops with loan operations, risk officers, and technical development squads.',
      'Author detailed functional design documents, user stories, acceptance criteria, and workflow diagrams in Jira and Confluence.',
      'Conduct gap analyses, user acceptance testing (UAT), and validate end-to-end financial transaction data integrity.',
      'Monitor project milestones and support product managers during sprint planning and retrospective reviews.'
    ],
    qualifications: [
      'Bachelor’s degree in Business Administration, Finance, Management Information Systems, or equivalent experience.',
      '3+ years of professional experience as a Business Analyst, preferably within banking, insurance, or FinTech.',
      'Solid grasp of Agile/Scrum frameworks, user story elaboration, and process diagramming tools (Visio/Lucidchart).',
      'Experience writing basic SQL queries to validate underlying data models.'
    ],
    benefits: [
      'Lucrative base compensation package plus 12% target annual performance bonus',
      'Full corporate health coverage with mental wellness subscriptions',
      'Generous 401(k) retirement plan with immediate 5% employer match',
      'Flexible hybrid working schedule (2 days in modern Uptown Charlotte office, 3 days remote)'
    ],
    skills: ['Requirements Gathering', 'Agile / Scrum', 'User Stories', 'Jira / Confluence', 'Process Mapping', 'UAT Testing', 'FinTech']
  },
  {
    id: 'job-feat-3',
    title: 'EHS Specialist',
    company: 'Vanguard Precision Aerospace',
    clientConfidential: false,
    location: 'Dallas, TX (On-site)',
    city: 'Dallas',
    state: 'TX',
    workplaceType: 'On-site',
    industry: 'Manufacturing',
    type: 'Direct Hire',
    experienceLevel: 'Mid Level',
    salaryMin: 82000,
    salaryMax: 98000,
    salaryPeriod: 'annual',
    postedDate: '2026-10-28',
    featured: true,
    status: 'published',
    applicantCount: 14,
    description: 'Air Dive Group has been retained by an advanced aerospace components manufacturer in Dallas, TX to recruit an Environmental Health & Safety (EHS) Specialist. In this critical facility role, you will oversee plant safety programs, lead OSHA compliance inspections, drive ergonomic improvements across machining cells, and manage hazardous waste minimization initiatives.',
    responsibilities: [
      'Administer comprehensive occupational health, safety, and environmental stewardship programs across a 350,000 sq ft manufacturing plant.',
      'Lead root-cause incident investigations, near-miss analyses, and implement corrective prevention measures.',
      'Conduct OSHA compliance audits, lock-out/tag-out (LOTO) validations, and machine guarding inspections.',
      'Manage hazardous materials, waste manifest reporting, and EPA / TCEQ environmental permitting filings.'
    ],
    qualifications: [
      'Bachelor’s degree in Occupational Safety, Environmental Health, Industrial Engineering, or related discipline.',
      '3-5 years of progressive EHS experience in a discrete manufacturing, machining, or aerospace environment.',
      'Working knowledge of OSHA 1910 regulations, EPA standards, and ISO 14001 / ISO 45001 management systems.',
      'ASP, CSP, or OSHA 30-Hour General Industry certification preferred.'
    ],
    benefits: [
      'Competitive annual salary with annual safety performance incentive',
      'Comprehensive medical, dental, life, and disability benefits',
      '401(k) with 6% company match and immediate vesting',
      'Tuition assistance program for advanced safety credentials (CSP)'
    ],
    skills: ['OSHA 1910', 'Safety Audits', 'Incident Investigation', 'EPA Environmental Permitting', 'LOTO Safety', 'Root Cause Analysis']
  },
  {
    id: 'job-feat-4',
    title: 'IT Help Desk',
    company: 'Apex Corporate Systems',
    clientConfidential: true,
    location: 'Austin, TX (Hybrid)',
    city: 'Austin',
    state: 'TX',
    workplaceType: 'Hybrid',
    industry: 'Information Technology',
    type: 'Contract-to-Hire',
    experienceLevel: 'Mid Level',
    salaryMin: 28,
    salaryMax: 36,
    salaryPeriod: 'hourly',
    postedDate: '2026-10-29',
    featured: true,
    status: 'published',
    applicantCount: 28,
    description: 'Air Dive Group is staffing a dedicated IT Help Desk Specialist on a 6-month contract-to-hire engagement with a high-growth SaaS and enterprise services company in Austin, TX. The role provides Tier II desktop and service desk resolution, administers Microsoft 365, Active Directory, and Intune MDM, and configures laptop deployments for remote and on-site staff.',
    responsibilities: [
      'Provide Tier II technical troubleshooting for hardware, software, VPN, and peripheral issues across 800+ employees.',
      'Administer user identities, security groups, and multi-factor authentication (MFA) within Microsoft 365 and Azure Active Directory.',
      'Provision, deploy, and manage company laptops (Windows 11 and macOS) utilizing Microsoft Intune and Jamf.',
      'Maintain high first-contact resolution rates and update troubleshooting documentation within ServiceNow ticketing queues.'
    ],
    qualifications: [
      '2-4 years of experience in an IT service desk, help desk, or desktop support role.',
      'Solid technical background supporting Windows 10/11, macOS, Microsoft 365, and mobile endpoints.',
      'Familiarity with Active Directory, Azure AD / Entra ID, Intune, and remote desktop troubleshooting tools.',
      'CompTIA A+, Network+, or Microsoft 365 Certified Fundamentals is a strong advantage.'
    ],
    benefits: [
      'Lucrative hourly rate with 1.5x overtime eligibility through Air Dive Group payroll',
      'Full W-2 health, dental, and vision benefits available during contract duration',
      'Clear, contractual conversion pathway to full-time permanent salaried employment with full corporate benefits'
    ],
    skills: ['Desktop Support', 'Active Directory', 'Microsoft 365', 'ServiceNow', 'Intune / MDM', 'Hardware Provisioning', 'VPN']
  },
  {
    id: 'job-feat-5',
    title: 'Clinical Coordinator',
    company: 'Midwest Health Sciences Hospital',
    clientConfidential: false,
    location: 'Chicago, IL (On-site)',
    city: 'Chicago',
    state: 'IL',
    workplaceType: 'On-site',
    industry: 'Healthcare',
    type: 'Direct Hire',
    experienceLevel: 'Mid Level',
    salaryMin: 76000,
    salaryMax: 92000,
    salaryPeriod: 'annual',
    postedDate: '2026-10-27',
    featured: true,
    status: 'published',
    applicantCount: 16,
    description: 'Air Dive Group has partnered with a nationally recognized academic medical center in Chicago, IL to recruit a Clinical Coordinator. Working alongside nursing leadership and attending physicians, you will coordinate multidisciplinary patient care pathways, ensure clinical trial protocol adherence, manage patient intake schedules, and uphold rigorous HIPAA and Joint Commission standards.',
    responsibilities: [
      'Coordinate patient care workflows across clinical outpatient clinics and acute care inpatient departments.',
      'Review patient clinical charts in Epic EMR, track diagnostic lab results, and facilitate timely multidisciplinary consultations.',
      'Ensure patient confidentiality, regulatory compliance, and protocol execution in accordance with Joint Commission and GCP guidelines.',
      'Serve as the key administrative and operational liaison between medical directors, clinical nurse specialists, and patient families.'
    ],
    qualifications: [
      'Bachelor’s degree in Healthcare Administration, Nursing (BSN), Health Sciences, or related field.',
      '3+ years of clinical coordination, patient navigation, or healthcare administration experience.',
      'Hands-on proficiency with Epic EMR or Cerner electronic medical record platforms.',
      'Knowledge of clinical terminology, HIPAA privacy guidelines, and patient communication protocols.'
    ],
    benefits: [
      'Competitive hospital salary scale with comprehensive public service healthcare coverage',
      'Generous paid time off starting at 22 days per year plus 10 recognized holidays',
      'Retirement plan with generous employer matching and healthcare clinic discounts',
      'Tuition reimbursement for advanced nursing or healthcare leadership degrees'
    ],
    skills: ['Clinical Care Coordination', 'Epic EMR', 'HIPAA Compliance', 'Patient Navigation', 'Joint Commission Standards', 'Medical Terminology']
  },
  {
    id: 'job-feat-6',
    title: 'Supply Chain Coordinator',
    company: 'Atlantic Coastal Logistics',
    clientConfidential: true,
    location: 'Savannah, GA (Hybrid)',
    city: 'Savannah',
    state: 'GA',
    workplaceType: 'Hybrid',
    industry: 'Logistics & Supply Chain',
    type: 'Direct Hire',
    experienceLevel: 'Mid Level',
    salaryMin: 64000,
    salaryMax: 78000,
    salaryPeriod: 'annual',
    postedDate: '2026-10-28',
    featured: true,
    status: 'published',
    applicantCount: 21,
    description: 'Air Dive Group is managing an exclusive direct-hire search on behalf of a major port logistics and distribution enterprise headquartered in Savannah, GA. We are seeking an operational Supply Chain Coordinator to manage purchase order workflows, track multimodal ocean and overland freight shipments, coordinate port drayage schedules, and maintain inventory accuracy in SAP.',
    responsibilities: [
      'Track and coordinate intermodal freight movements from port container terminals to regional distribution centers.',
      'Generate and audit purchase orders, bills of lading (BOL), and customs clearance documentation within SAP ERP.',
      'Communicate daily with ocean carriers, freight forwarders, and trucking dispatchers to mitigate transit delays.',
      'Analyze inventory safety stock levels, warehouse transit times, and report supplier on-time delivery (OTIF) metrics.'
    ],
    qualifications: [
      'Bachelor’s degree in Supply Chain Management, Logistics, Business, or equivalent practical experience.',
      '2-4 years of experience in supply chain coordination, freight forwarding, or inventory management.',
      'Proficiency in SAP, Oracle, or comparable enterprise ERP and warehouse management software.',
      'Strong analytical mindset, problem-solving agility, and high-volume organizational capabilities.'
    ],
    benefits: [
      'Competitive base salary with annual performance bonus opportunity',
      'Comprehensive health, dental, and vision insurance package',
      '401(k) plan with 5% dollar-for-dollar employer match',
      'Hybrid flexibility (3 days in office near port facilities, 2 days remote)'
    ],
    skills: ['Supply Chain Operations', 'SAP ERP', 'Freight Forwarding', 'Purchase Order Management', 'Bills of Lading', 'Inventory Control', 'OTIF Metrics']
  },
  {
    id: 'job-101',
    title: 'Senior Cloud Solutions Architect',
    company: 'Enterprise FinTech Client',
    clientConfidential: true,
    location: 'Atlanta, GA (Hybrid)',
    city: 'Atlanta',
    state: 'GA',
    workplaceType: 'Hybrid',
    industry: 'Information Technology',
    type: 'Direct Hire',
    experienceLevel: 'Senior Level',
    salaryMin: 155000,
    salaryMax: 185000,
    salaryPeriod: 'annual',
    postedDate: '2026-10-24',
    featured: false,
    status: 'published',
    applicantCount: 18,
    description: 'Air Dive Group is conducting an exclusive direct-hire search on behalf of a premier financial technology institution headquartered in Atlanta, GA. We are seeking a Senior Cloud Solutions Architect to lead enterprise migration strategies to AWS and Azure, modernizing payment settlement systems.',
    responsibilities: [
      'Architect resilient, multi-region cloud infrastructures on AWS and Azure conforming to FinTech compliance standards.',
      'Partner with VP of Engineering to design microservices architecture and zero-downtime deployment pipelines.',
      'Establish enterprise cloud governance, cost-optimization strategies, and disaster recovery runbooks.',
      'Mentor senior engineering staff and conduct peer design reviews for high-throughput transactional systems.'
    ],
    qualifications: [
      '7+ years in enterprise cloud architecture and distributed systems design.',
      'AWS Certified Solutions Architect Professional or Azure Solutions Architect Expert.',
      'Hands-on expertise with Kubernetes, Terraform, Docker, and Kafka.',
      'Demonstrated experience with PCI-DSS and SOC2 security frameworks.'
    ],
    benefits: [
      'Competitive base compensation plus annual performance incentive',
      'Comprehensive Blue Cross Blue Shield health, dental, and vision insurance',
      '401(k) with 6% company match from day one',
      'Flexible hybrid schedule (2 days in modern Midtown Atlanta office, 3 days remote)'
    ],
    skills: ['AWS', 'Kubernetes', 'Terraform', 'Microservices', 'FinTech Security', 'Cloud Governance']
  },
  {
    id: 'job-102',
    title: 'Clinical Nurse Manager - Intensive Care (ICU)',
    company: 'Regional Healthcare Network',
    clientConfidential: false,
    location: 'Dallas, TX (On-site)',
    city: 'Dallas',
    state: 'TX',
    workplaceType: 'On-site',
    industry: 'Healthcare',
    type: 'Direct Hire',
    experienceLevel: 'Lead / Principal',
    salaryMin: 110000,
    salaryMax: 135000,
    salaryPeriod: 'annual',
    postedDate: '2026-10-28',
    featured: false,
    status: 'published',
    applicantCount: 12,
    description: 'Air Dive Group is partnered with a prestigious acute care hospital system in Dallas, TX to recruit an experienced Clinical Nurse Manager for their 28-bed Intensive Care Unit. The ideal candidate blends clinical excellence with compassionate, data-driven nursing leadership.',
    responsibilities: [
      'Direct operational, clinical, and administrative functions of the adult Intensive Care Unit.',
      'Ensure high standards of patient safety, clinical quality metrics, and regulatory compliance (Joint Commission).',
      'Manage staff scheduling, professional development, unit morale, and recruitment of critical care nurses.',
      'Collaborate with multidisciplinary physician teams to optimize patient outcomes and reduce ICU length of stay.'
    ],
    qualifications: [
      'Current, unencumbered Registered Nurse (RN) license in the State of Texas or Compact State.',
      'Bachelor of Science in Nursing (BSN) required; MSN or MHA preferred.',
      'Minimum 5 years of ICU clinical experience with at least 2 years in clinical charge or management.',
      'Current BLS, ACLS, and CCRN certifications.'
    ],
    benefits: [
      '$15,000 sign-on and relocation assistance package',
      'Comprehensive hospital healthcare benefits with medical clinic discounts',
      'Tuition reimbursement for advanced nursing degrees',
      'Defined benefit pension plan and 403(b) retirement option'
    ],
    skills: ['Critical Care Nursing', 'ICU Management', 'Joint Commission Standards', 'Staff Scheduling', 'Patient Advocacy']
  }
];

export const INITIAL_CANDIDATES: CandidateProfile[] = [
  {
    id: 'cand-001',
    fullName: 'David M. Reynolds',
    email: 'david.reynolds@example.com',
    phone: '(404) 555-0142',
    city: 'Atlanta',
    state: 'GA',
    zipCode: '30309',
    preferredJobTitle: 'Senior Cloud Solutions Architect',
    industry: 'Information Technology',
    preferredWorkType: 'Direct Hire',
    preferredWorkplace: 'Hybrid',
    experienceYears: 9,
    currentCompany: 'FinTech Solutions LLC',
    education: 'B.S. in Computer Science - Georgia Tech',
    skills: ['AWS', 'Kubernetes', 'Terraform', 'Microservices', 'Python', 'Go', 'Docker'],
    workAuthorization: 'US Citizen',
    targetSalary: '$165,000 - $180,000',
    linkedinUrl: 'https://linkedin.com/in/example-reynolds',
    resumeFileName: 'David_Reynolds_Cloud_Architect_Resume.pdf',
    resumeFileSize: '248 KB',
    additionalNotes: 'Seeking enterprise FinTech or healthcare cloud architecture roles in Greater Atlanta or remote.',
    createdAt: '2026-10-25T14:32:00Z',
    status: 'Interviewing',
    internalNotes: [
      {
        id: 'note-1',
        author: 'Sarah Jenkins (Senior Tech Recruiter)',
        text: 'Strong architectural presentation. Excellent culture fit for Job #101. Round 1 client feedback was 5/5 stars.',
        createdAt: '2026-10-27T10:15:00Z'
      }
    ]
  },
  {
    id: 'cand-002',
    fullName: 'Elena Rostova, BSN, RN',
    email: 'elena.rostova.rn@example.com',
    phone: '(214) 555-0198',
    city: 'Dallas',
    state: 'TX',
    zipCode: '75201',
    preferredJobTitle: 'Clinical Nurse Manager - ICU',
    industry: 'Healthcare',
    preferredWorkType: 'Direct Hire',
    preferredWorkplace: 'On-site',
    experienceYears: 7,
    currentCompany: 'Dallas Memorial Medical Center',
    education: 'B.S. in Nursing - UT Arlington',
    skills: ['Critical Care', 'CCRN Certified', 'BLS/ACLS', 'Unit Leadership', 'Joint Commission Standards'],
    workAuthorization: 'US Citizen',
    targetSalary: '$125,000',
    resumeFileName: 'Elena_Rostova_ICU_Nurse_Manager.pdf',
    resumeFileSize: '312 KB',
    additionalNotes: 'Ready for full nurse management role. Active Texas RN license with no restrictions.',
    createdAt: '2026-10-28T09:10:00Z',
    status: 'Interviewing',
    internalNotes: [
      {
        id: 'note-2',
        author: 'Marcus Vance (Healthcare Practice Lead)',
        text: 'Outstanding credentials. Presented to Chief Nursing Officer at Regional Health. Second interview scheduled for Thursday.',
        createdAt: '2026-10-29T11:45:00Z'
      }
    ]
  },
  {
    id: 'cand-003',
    fullName: 'Marcus Sterling, CPA',
    email: 'm.sterling@example.com',
    phone: '(312) 555-0177',
    city: 'Chicago',
    state: 'IL',
    zipCode: '60601',
    preferredJobTitle: 'Senior Financial Analyst / Assistant Controller',
    industry: 'Finance & Accounting',
    preferredWorkType: 'Direct Hire',
    preferredWorkplace: 'Hybrid',
    experienceYears: 6,
    currentCompany: 'Midwest Capital Partners',
    education: 'M.S. in Accounting - University of Illinois',
    skills: ['FP&A', 'Financial Modeling', 'Power BI', 'US GAAP', 'NetSuite', 'Variance Analysis'],
    workAuthorization: 'Permanent Resident (Green Card)',
    targetSalary: '$110,000',
    resumeFileName: 'Marcus_Sterling_CPA_Resume.pdf',
    resumeFileSize: '190 KB',
    additionalNotes: 'Passed CPA exams in first attempt. 3 years in Big Four audit + 3 years corporate FP&A.',
    createdAt: '2026-10-27T16:20:00Z',
    status: 'Available',
    internalNotes: [
      {
        id: 'note-3',
        author: 'Sarah Jenkins',
        text: 'Clean resume, verified CPA in Illinois. High mathematical rigor and polished communication.',
        createdAt: '2026-10-28T14:00:00Z'
      }
    ]
  },
  {
    id: 'cand-004',
    fullName: 'Jasmine Thornton',
    email: 'jasmine.thornton@example.com',
    phone: '(512) 555-0219',
    city: 'Austin',
    state: 'TX',
    zipCode: '78701',
    preferredJobTitle: 'Customer Experience Operations Manager',
    industry: 'Customer Service & Call Centers',
    preferredWorkType: 'Direct Hire',
    preferredWorkplace: 'Remote',
    experienceYears: 5,
    currentCompany: 'Apex Payments',
    education: 'B.A. in Communications - Texas State University',
    skills: ['Zendesk', 'Intercom', 'Team Leadership', 'CSAT Optimization', 'KPI Telemetry', 'Dispute Management'],
    workAuthorization: 'US Citizen',
    targetSalary: '$85,000',
    resumeFileName: 'Jasmine_Thornton_CX_Lead.pdf',
    resumeFileSize: '175 KB',
    additionalNotes: 'Built remote team of 25 from scratch. Looking for high growth fintech/SaaS.',
    createdAt: '2026-10-29T10:05:00Z',
    status: 'Available',
    internalNotes: []
  }
];

export const INITIAL_APPLICATIONS: Application[] = [
  {
    id: 'app-501',
    jobId: 'job-feat-1',
    jobTitle: 'Entry level Data analyst',
    candidateName: 'Jordan Taylor',
    email: 'jordan.taylor.data@example.com',
    phone: '(404) 555-0142',
    location: 'Atlanta, GA',
    resumeFileName: 'Jordan_Taylor_Data_Analyst.pdf',
    resumeFileSize: '248 KB',
    appliedDate: '2026-10-30',
    status: 'Interview Scheduled',
    currentTitle: 'Junior Data Analyst',
    experienceYears: 1,
    interviewDate: '2026-11-04T14:00:00',
    interviewLink: 'https://meet.google.com/air-dive-tech',
    notes: [
      {
        id: 'n-501-1',
        author: 'Sarah Jenkins',
        text: 'Strong Power BI portfolio and clean SQL assessment score (96%). Client scheduled 30-min technical meet.',
        createdAt: '2026-10-31T10:00:00Z'
      }
    ]
  },
  {
    id: 'app-502',
    jobId: 'job-feat-5',
    jobTitle: 'Clinical Coordinator',
    candidateName: 'Elena Rostova, BSN, RN',
    email: 'elena.rostova.rn@example.com',
    phone: '(214) 555-0198',
    location: 'Chicago, IL',
    resumeFileName: 'Elena_Rostova_Clinical_Coordinator.pdf',
    resumeFileSize: '312 KB',
    appliedDate: '2026-10-28',
    status: 'Interview Scheduled',
    currentTitle: 'Clinical Care Specialist',
    experienceYears: 6,
    interviewDate: '2026-11-05T10:30:00',
    interviewLink: 'https://meet.google.com/air-dive-med',
    notes: [
      {
        id: 'n-502-1',
        author: 'Marcus Vance',
        text: 'Confirmed clinical panel interview with hospital department director.',
        createdAt: '2026-10-29T16:00:00Z'
      }
    ]
  },
  {
    id: 'app-503',
    jobId: 'job-feat-2',
    jobTitle: 'Business Analyst',
    candidateName: 'Marcus Sterling, CBAP',
    email: 'm.sterling@example.com',
    phone: '(704) 555-0177',
    location: 'Charlotte, NC',
    resumeFileName: 'Marcus_Sterling_BA_Resume.pdf',
    resumeFileSize: '190 KB',
    appliedDate: '2026-10-29',
    status: 'Shortlisted',
    currentTitle: 'Agile Business Analyst',
    experienceYears: 4,
    notes: [
      {
        id: 'n-503-1',
        author: 'Sarah Jenkins',
        text: 'Dossier delivered to commercial banking VP. Excellent user story and Jira workflow samples.',
        createdAt: '2026-10-30T14:30:00Z'
      }
    ]
  },
  {
    id: 'app-504',
    jobId: 'job-feat-3',
    jobTitle: 'EHS Specialist',
    candidateName: 'Christopher Vance, CSP',
    email: 'c.vance@example.com',
    phone: '(214) 555-0811',
    location: 'Dallas, TX',
    resumeFileName: 'Chris_Vance_EHS_Specialist.pdf',
    resumeFileSize: '280 KB',
    appliedDate: '2026-10-28',
    status: 'Selected',
    currentTitle: 'Plant Safety Coordinator',
    experienceYears: 5,
    notes: [
      {
        id: 'n-504-1',
        author: 'Danielle Brooks (Engineering Lead)',
        text: 'Aerospace client extended direct hire offer. Verification of OSHA 30-Hour credentials complete.',
        createdAt: '2026-10-31T09:20:00Z'
      }
    ]
  },
  {
    id: 'app-505',
    jobId: 'job-feat-4',
    jobTitle: 'IT Help Desk',
    candidateName: 'Jasmine Thornton',
    email: 'jasmine.thornton@example.com',
    phone: '(512) 555-0219',
    location: 'Austin, TX',
    resumeFileName: 'Jasmine_Thornton_IT_HelpDesk.pdf',
    resumeFileSize: '175 KB',
    appliedDate: '2026-10-29',
    status: 'Under Review',
    currentTitle: 'Tier II Support Specialist',
    experienceYears: 3,
    notes: []
  },
  {
    id: 'app-506',
    jobId: 'job-feat-6',
    jobTitle: 'Supply Chain Coordinator',
    candidateName: 'Derrick Powell',
    email: 'd.powell.logistics@example.com',
    phone: '(912) 555-0455',
    location: 'Savannah, GA',
    resumeFileName: 'Derrick_Powell_Supply_Chain.pdf',
    resumeFileSize: '215 KB',
    appliedDate: '2026-10-29',
    status: 'New',
    currentTitle: 'Logistics Operations Assistant',
    experienceYears: 3,
    notes: []
  }
];

export const INITIAL_EMPLOYER_INQUIRIES: EmployerInquiry[] = [
  {
    id: 'inq-801',
    companyName: 'Nextera Health Solutions',
    contactName: 'Brian Gallagher',
    contactTitle: 'Senior Director of Human Capital',
    workEmail: 'b.gallagher@nexterahealth.example.com',
    phone: '(404) 555-8912',
    companyWebsite: 'https://nexterahealth.example.com',
    industry: 'Healthcare',
    staffingService: 'Contract-to-Hire',
    openPositionsCount: 6,
    targetStartDate: '2026-11-15',
    jobLocation: 'Atlanta, GA (Hybrid)',
    workplaceType: 'Hybrid',
    targetRateRange: '$75 - $95 / hour',
    jobScopeDescription: 'Need 6 experienced Epic revenue cycle analysts and clinical data specialists for our ambulatory health center rollout.',
    submittedAt: '2026-10-28T13:40:00Z',
    status: 'Discovery Scheduled',
    internalNotes: [
      {
        id: 'inq-n1',
        author: 'Marcus Vance',
        text: 'Discovery call booked with Brian for Monday morning. Sent our healthcare standard master services agreement.',
        createdAt: '2026-10-29T09:00:00Z'
      }
    ]
  },
  {
    id: 'inq-802',
    companyName: 'Vanguard Aerospace Technologies',
    contactName: 'Amanda Cole',
    contactTitle: 'VP of Manufacturing & Plant Operations',
    workEmail: 'amanda.cole@vanguardaero.example.com',
    phone: '(256) 555-4301',
    companyWebsite: 'https://vanguardaero.example.com',
    industry: 'Engineering',
    staffingService: 'Direct Hire Recruitment',
    openPositionsCount: 3,
    targetStartDate: '2026-12-01',
    jobLocation: 'Huntsville, AL',
    workplaceType: 'On-site',
    targetRateRange: '$120,000 - $150,000 annual',
    jobScopeDescription: 'Seeking 3 precision mechanical engineers with clearance eligibility and CAD/FEA structural modeling expertise for defense subsystem contract.',
    submittedAt: '2026-10-29T17:15:00Z',
    status: 'Agreement Signed',
    internalNotes: [
      {
        id: 'inq-n2',
        author: 'Danielle Brooks',
        text: 'Retainer agreement executed. Actively sourcing candidates with active secret clearance.',
        createdAt: '2026-10-30T14:10:00Z'
      }
    ]
  },
  {
    id: 'inq-803',
    companyName: 'Meridian Supply Chain Logistics',
    contactName: 'Kenneth Hayes',
    contactTitle: 'Chief Operating Officer',
    workEmail: 'khayes@meridiansupply.example.com',
    phone: '(312) 555-6622',
    companyWebsite: 'https://meridiansupply.example.com',
    industry: 'Logistics & Supply Chain',
    staffingService: 'Temporary Staffing',
    openPositionsCount: 25,
    targetStartDate: '2026-11-10',
    jobLocation: 'Joliet, IL',
    workplaceType: 'On-site',
    targetRateRange: '$22 - $26 / hour',
    jobScopeDescription: 'Seasonal fulfillment ramp for Q4 retail surge. Requiring 25 certified forklift operators and shipping clerks across day and night shifts.',
    submittedAt: '2026-10-30T08:22:00Z',
    status: 'New',
    internalNotes: []
  }
];

export const INSIGHTS_ARTICLES: Article[] = [
  {
    id: 'art-01',
    slug: '2027-us-workforce-trends-talent-scarcity',
    title: 'Navigating Specialized Talent Scarcity: Strategic Hiring Insights for US Employers',
    excerpt: 'How leading American corporations are adjusting compensation frameworks, shortening interview cycles, and utilizing contract-to-hire arrangements to secure critical skills in a tight labor market.',
    category: 'Workforce Insights',
    readTime: '6 min read',
    publishDate: 'October 24, 2026',
    author: {
      name: 'Robert Sterling',
      role: 'Managing Director, Air Dive Group Workforce Strategy'
    },
    keyTakeaways: [
      'Interview cycles exceeding 14 business days lose over 60% of top quartile candidates to competing offers.',
      'Contract-to-hire pipelines reduce first-year permanent turnover by up to 42%.',
      'Transparent salary benchmarking at intake increases high-caliber candidate response rates by 2.8x.'
    ],
    content: [
      'In today’s competitive US recruitment landscape, securing high-performing professionals requires more than transactional job postings. Employers across Information Technology, Healthcare, and Engineering are confronting specialized talent deficits that directly threaten project delivery schedules and revenue goals.',
      'To counter these challenges, forward-thinking hiring executives are abandoning prolonged 5-stage interview marathons in favor of calibrated, 2-stage assessments focused squarely on real-world situational output. Speed to decision has emerged as the definitive competitive differentiator in US staffing.',
      'Furthermore, the strategic adoption of contract-to-hire models allows businesses to evaluate cultural chemistry and technical velocity under actual operational conditions, minimizing risk while maintaining enterprise momentum.'
    ]
  },
  {
    id: 'art-02',
    slug: 'mastering-the-executive-interview',
    title: 'Executive Interview Excellence: How Leaders Communicate Value and Vision',
    excerpt: 'Actionable strategies for senior directors and vice presidents preparing for high-stakes leadership panel discussions and board-level search consultations.',
    category: 'Career Advice',
    readTime: '5 min read',
    publishDate: 'October 19, 2026',
    author: {
      name: 'Danielle Brooks',
      role: 'Senior Vice President, Executive Search Practice'
    },
    keyTakeaways: [
      'Frame historical achievements through the lens of enterprise EBITDA and quantifiable margin expansion.',
      'Articulate clear 30-60-90 day cultural diagnostic plans rather than prescribing hasty reorganizations.',
      'Demonstrate high emotional intelligence alongside rigorous operational governance.'
    ],
    content: [
      'When interviewing for executive appointments, the conversation pivots from tactical competence to institutional stewardship. Boards and CEOs assess whether you possess the composure, vision, and resilience to navigate macroeconomic volatility.',
      'Senior candidates who stand out consistently communicate using business metric vocabulary—connecting technical innovations directly to bottom-line shareholder value, team retention ratios, and market share capture.',
      'At Air Dive Group, our executive search advisors prepare leaders to command these discussions with authentic authority and strategic clarity.'
    ]
  },
  {
    id: 'art-03',
    slug: 'contract-vs-direct-hire-workforce-agility',
    title: 'Contract Staffing vs. Direct Hire: Building an Optimal Hybrid Workforce Strategy',
    excerpt: 'A comprehensive guide for Chief Human Resources Officers balancing permanent balance sheet commitments with agile contingent contractor capacity.',
    category: 'Hiring Strategies',
    readTime: '7 min read',
    publishDate: 'October 14, 2026',
    author: {
      name: 'Marcus Vance',
      role: 'Director of Enterprise Workforce Solutions'
    },
    keyTakeaways: [
      'A core 70/30 permanent-to-contingent ratio provides optimal budget resilience against economic fluctuations.',
      'Partnering with compliant Employer of Record (EOR) providers insulates firms from multi-state worker misclassification penalties.',
      'Contingent staffing facilitates immediate knowledge transfer without recurring overhead liabilities.'
    ],
    content: [
      'As business cycles fluctuate with increasing velocity, rigid workforce structures place severe pressure on enterprise operating margins. The modern organization requires strategic agility—a calibrated blend of institutional permanent leaders and on-demand specialized contractors.',
      'By engaging specialized contractors for tech migrations, regulatory audits, and seasonal surges, organizations maintain peak output without taking on recurring long-term payroll liabilities.',
      'Air Dive Group acts as the unified workforce partner, ensuring seamless compliance, rapid deployment, and unified administrative governance across all hiring categories.'
    ]
  }
];

export const COMPANY_FACTS = {
  name: 'AIR DIVE GROUP',
  tagline: 'Strategic Staffing & Workforce Solutions',
  legalName: 'Air Dive Group LLC',
  businessType: 'US Staffing, Recruitment, Talent Acquisition and Workforce Solutions',
  headquarters: 'Atlanta, GA (Corporate Office: Suite 1800, Peachtree St NW)',
  phone: '(404) 555-0100', // Demonstration contact as requested by prompt
  email: 'inquiries@airdivegroup.com',
  careersEmail: 'careers@airdivegroup.com',
  workingHours: 'Monday – Friday: 8:00 AM – 6:00 PM EST',
  yearEstablishedPlaceholder: 'Established 2018 (Verified Operational Entity)',
  // Verified demonstration placeholders clearly marked
  verifiedStats: [
    { label: 'States Served Nationwide', value: '50 States', note: 'Nationwide US Coverage' },
    { label: 'Specialized Industries', value: '10 Verticals', note: 'Dedicated Practice Leads' },
    { label: 'Talent Network Reach', value: '45,000+', note: 'Active US Professional Roster' },
    { label: 'Average Fill Turnaround', value: '48 Hours', note: 'For Vetted Commercial & Tech' }
  ]
};

export const LEADERSHIP_TEAM = [
  {
    name: 'Harrison Reed',
    role: 'Founder & Chief Executive Officer',
    bio: '20+ years steering national staffing operations, executive search mandates, and workforce solutions across major American metropolitan markets.',
    focus: 'Enterprise Partnerships & Strategic Growth'
  },
  {
    name: 'Danielle Brooks',
    role: 'Senior Vice President, Executive Search & Engineering',
    bio: 'Former Fortune 100 corporate talent acquisition leader specializing in leadership advisory and technical workforce scaling.',
    focus: 'Executive Search & Engineering Practice'
  },
  {
    name: 'Marcus Vance',
    role: 'Managing Director, Healthcare & Commercial Staffing',
    bio: 'Dedicated clinical and workforce management specialist overseeing acute care staffing and contingent labor compliance.',
    focus: 'Healthcare Systems & Enterprise RPO'
  },
  {
    name: 'Sarah Jenkins',
    role: 'Head of Technical Recruiting & Candidate Experience',
    bio: 'Pioneering candidate-centric talent pipelines and modern skill evaluation systems for cloud, cybersecurity, and software engineering.',
    focus: 'Tech Talent Networks & Candidate Advocacy'
  }
];

export const TESTIMONIALS = [
  {
    quote: 'Air Dive Group delivered where other national staffing firms fell short. Within 72 hours of receiving our intake brief, they introduced two exceptional Cloud Architects who integrated seamlessly into our payment infrastructure overhaul.',
    author: 'David Chen',
    title: 'VP of Software Engineering',
    company: 'FinTech Growth Partners (Atlanta, GA)',
    type: 'Employer Partner'
  },
  {
    quote: 'The recruitment team at Air Dive Group was remarkably communicative, respectful of my schedule, and transparent about compensation from our very first call. They placed me in an executive clinical leadership role that perfectly matched my career goals.',
    author: 'Elena Rostova, BSN, RN',
    title: 'Clinical Nurse Manager',
    company: 'Regional Healthcare Network (Dallas, TX)',
    type: 'Candidate Placement'
  },
  {
    quote: 'Working with Air Dive Group under our Master Services Agreement transformed our contingent labor spend. Their contractor vetting is airtight, and their administrative team handles all onboarding compliance with zero friction.',
    author: 'Sarah Montgomery',
    title: 'Director of Human Resources',
    company: 'Precision Industrial Systems (Detroit, MI)',
    type: 'Enterprise Client'
  }
];

export const INITIAL_QUICK_QUESTIONS: QuickQuestion[] = [
  {
    id: 'qq-101',
    ticketNumber: 'ADG-TKT-1042',
    fullName: 'Robert Harrison',
    email: 'r.harrison@horizonlogistics.com',
    phone: '(404) 555-0192',
    type: 'Employer Inquiry',
    subject: 'Urgent staffing inquiry for 4 warehouse shift supervisors in Savannah',
    message: 'Hello, our distribution hub at the port of Savannah is expanding night shift operations next month. We need 4 experienced warehouse supervisors with WMS experience. What is your turnaround time for contract-to-hire staffing?',
    urgency: 'High',
    submittedAt: '2026-10-31T14:15:00.000Z',
    status: 'In Progress',
    adminResponse: 'Account Executive contacted Robert via phone to schedule initial discovery scoping call on Monday.',
    internalNotes: [
      {
        id: 'qn-1',
        author: 'Recruiter Admin',
        text: 'Spoke with client operations lead; sending Master Services Agreement (MSA) and rate card.',
        createdAt: '2026-10-31T15:00:00.000Z'
      }
    ]
  },
  {
    id: 'qq-102',
    ticketNumber: 'ADG-TKT-1043',
    fullName: 'Samantha Miller',
    email: 'samantha.miller@gmail.com',
    phone: '(312) 555-7821',
    type: 'Quick Question',
    subject: 'Question regarding Clinical Coordinator on-site schedule and EMR certification',
    message: 'I submitted my resume for the Clinical Coordinator role in Chicago. Does the hospital require prior Epic certification, or is clinical workflow experience in Cerner acceptable for consideration?',
    urgency: 'Standard',
    submittedAt: '2026-10-31T15:40:00.000Z',
    status: 'Open',
    internalNotes: []
  },
  {
    id: 'qq-103',
    ticketNumber: 'ADG-TKT-1044',
    fullName: 'David K. Lawson',
    email: 'd.lawson@precisionaerotech.com',
    phone: '(214) 555-6610',
    type: 'Concern / Issue',
    subject: 'Concern regarding interview scheduling conflict for EHS Specialist candidate',
    message: 'We had an interview scheduled for the EHS Specialist candidate for Thursday 2 PM, but our VP of Manufacturing was called to an emergency plant audit. Could the Air Dive recruiter please help us reschedule to Friday morning?',
    urgency: 'Urgent',
    submittedAt: '2026-10-31T16:20:00.000Z',
    status: 'In Progress',
    adminResponse: 'Candidate notified; waiting for candidate confirmation for Friday 10:30 AM CT.',
    internalNotes: [
      {
        id: 'qn-2',
        author: 'Recruiter Admin',
        text: 'Contacted candidate Elena; she confirmed availability for Friday 10:30 AM.',
        createdAt: '2026-10-31T16:35:00.000Z'
      }
    ]
  }
];

