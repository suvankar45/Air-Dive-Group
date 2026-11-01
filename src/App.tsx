/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar, NavView } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Homepage Sections
import { HeroSection } from './components/home/HeroSection';
import { TrustSection } from './components/home/TrustSection';
import { ServicesSection } from './components/home/ServicesSection';
import { IndustriesSection } from './components/home/IndustriesSection';
import { WhyChooseSection } from './components/home/WhyChooseSection';
import { EmployerCandidateSplit } from './components/home/EmployerCandidateSplit';
import { FeaturedJobsSection } from './components/home/FeaturedJobsSection';
import { TestimonialsSection } from './components/home/TestimonialsSection';
import { InsightsSection } from './components/home/InsightsSection';
import { FinalCtaSection } from './components/home/FinalCtaSection';

// Dedicated Sub-Pages
import { AboutPage } from './components/pages/AboutPage';
import { ServicesPage } from './components/pages/ServicesPage';
import { IndustriesPage } from './components/pages/IndustriesPage';
import { EmployersPage } from './components/pages/EmployersPage';
import { CandidatesPage } from './components/pages/CandidatesPage';
import { JobBoardPage } from './components/pages/JobBoardPage';
import { InsightsPage } from './components/pages/InsightsPage';
import { ContactPage } from './components/pages/ContactPage';
import { LegalPage, LegalTab } from './components/pages/LegalPage';

// Admin Dashboard
import { AdminDashboard } from './components/admin/AdminDashboard';

// Modals & Storage
import { ApplyModal } from './components/common/ApplyModal';
import { QuickQuestionModal } from './components/common/QuickQuestionModal';
import { StorageService } from './services/storageService';
import { Job, Article } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<NavView>('home');
  const [jobs, setJobs] = useState<Job[]>(() => StorageService.getJobs());
  const [savedJobIds, setSavedJobIds] = useState<string[]>(() => StorageService.getSavedJobIds());

  // Deep view parameters
  const [selectedServiceId, setSelectedServiceId] = useState<string>('direct-hire-recruitment');
  const [selectedIndustryId, setSelectedIndustryId] = useState<string>('it');
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [legalTab, setLegalTab] = useState<LegalTab>('privacy');

  // Quick search handoff
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchLocation, setSearchLocation] = useState('');

  // Active modals & tab navigation
  const [applyingJob, setApplyingJob] = useState<Job | null>(null);
  const [isQuickQuestionOpen, setIsQuickQuestionOpen] = useState(false);
  const [adminInitialTab, setAdminInitialTab] = useState<'overview' | 'candidates' | 'jobs' | 'applications' | 'employers' | 'questions' | 'content'>('overview');

  // Sync jobs on data updates
  const refreshJobs = () => {
    setJobs(StorageService.getJobs());
    setSavedJobIds(StorageService.getSavedJobIds());
  };

  const handleNavigate = (view: NavView) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickSearch = (keyword: string, location: string) => {
    setSearchKeyword(keyword);
    setSearchLocation(location);
    setSelectedJobId(null);
    setCurrentView('jobs');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleSaveJob = (jobId: string) => {
    StorageService.toggleSaveJob(jobId);
    setSavedJobIds(StorageService.getSavedJobIds());
  };

  const handleOpenLegal = (tab: LegalTab) => {
    setLegalTab(tab);
    setCurrentView('legal');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If viewing the Admin Dashboard, render full screen recruiter ATS workspace
  if (currentView === 'admin') {
    return (
      <AdminDashboard
        onBackToSite={() => handleNavigate('home')}
        onRefreshData={refreshJobs}
        initialTab={adminInitialTab}
      />
    );
  }


  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#10243A]">
      {/* Responsive Navigation Bar */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        savedJobsCount={savedJobIds.length}
      />

      {/* Main Page Routing */}
      <main className="flex-1">
        {/* VIEW 1: HOME */}
        {currentView === 'home' && (
          <>
            <HeroSection
              onNavigate={handleNavigate}
              onSearchJobs={handleQuickSearch}
            />
            <TrustSection onNavigate={handleNavigate} />
            <ServicesSection
              onNavigate={handleNavigate}
              onSelectService={(id) => {
                setSelectedServiceId(id);
                handleNavigate('services');
              }}
            />
            <IndustriesSection
              onNavigate={handleNavigate}
              onSelectIndustry={(id) => {
                setSelectedIndustryId(id);
                handleNavigate('industries');
              }}
            />
            <WhyChooseSection onNavigate={handleNavigate} />
            <EmployerCandidateSplit onNavigate={handleNavigate} />
            <FeaturedJobsSection
              jobs={jobs}
              savedJobIds={savedJobIds}
              onToggleSaveJob={handleToggleSaveJob}
              onSelectJobForDetail={(jobId) => {
                setSelectedJobId(jobId);
                handleNavigate('jobs');
              }}
              onApplyJob={(job) => setApplyingJob(job)}
              onNavigate={handleNavigate}
            />
            <TestimonialsSection />
            <InsightsSection
              onNavigate={handleNavigate}
              onSelectArticle={(article) => {
                setSelectedArticle(article);
                handleNavigate('insights');
              }}
            />
            <FinalCtaSection onNavigate={handleNavigate} />
          </>
        )}

        {/* VIEW 2: ABOUT US */}
        {currentView === 'about' && (
          <AboutPage onNavigate={handleNavigate} />
        )}

        {/* VIEW 3: SERVICES */}
        {currentView === 'services' && (
          <ServicesPage
            onNavigate={handleNavigate}
            selectedServiceId={selectedServiceId}
          />
        )}

        {/* VIEW 4: INDUSTRIES */}
        {currentView === 'industries' && (
          <IndustriesPage
            onNavigate={handleNavigate}
            selectedIndustryId={selectedIndustryId}
          />
        )}

        {/* VIEW 5: FOR EMPLOYERS */}
        {currentView === 'employers' && (
          <EmployersPage onNavigate={handleNavigate} />
        )}

        {/* VIEW 6: FOR CANDIDATES */}
        {currentView === 'candidates' && (
          <CandidatesPage onNavigate={handleNavigate} />
        )}

        {/* VIEW 7: FIND JOBS (JOB BOARD) */}
        {currentView === 'jobs' && (
          <JobBoardPage
            jobs={jobs}
            savedJobIds={savedJobIds}
            selectedJobId={selectedJobId}
            onToggleSaveJob={handleToggleSaveJob}
            onApplyJob={(job) => setApplyingJob(job)}
            onNavigate={handleNavigate}
            initialKeyword={searchKeyword}
            initialLocation={searchLocation}
          />
        )}

        {/* VIEW 8: INSIGHTS & RESOURCES */}
        {currentView === 'insights' && (
          <InsightsPage
            onNavigate={handleNavigate}
            selectedArticle={selectedArticle}
          />
        )}

        {/* VIEW 9: CONTACT US */}
        {currentView === 'contact' && (
          <ContactPage onNavigate={handleNavigate} />
        )}

        {/* VIEW 10: LEGAL & COMPLIANCE */}
        {currentView === 'legal' && (
          <LegalPage
            initialTab={legalTab}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Global Application Submission Modal */}
      {applyingJob && (
        <ApplyModal
          job={applyingJob}
          onClose={() => setApplyingJob(null)}
          onAppliedSuccess={() => {
            refreshJobs();
          }}
        />
      )}

      {/* Quick Question / Concern Modal */}
      {isQuickQuestionOpen && (
        <QuickQuestionModal
          onClose={() => setIsQuickQuestionOpen(false)}
        />
      )}

      {/* Corporate Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenLegal={handleOpenLegal}
        onOpenQuickQuestion={() => setIsQuickQuestionOpen(true)}
        onOpenAdminPortal={(tab = 'overview') => {
          setAdminInitialTab(tab);
          setCurrentView('admin');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
