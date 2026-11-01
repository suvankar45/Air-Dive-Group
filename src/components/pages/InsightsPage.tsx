import React, { useState } from 'react';
import { NavView } from '../layout/Navbar';
import { INSIGHTS_ARTICLES } from '../../data/mockData';
import { Article } from '../../types';
import { 
  BookOpen, 
  Clock, 
  User, 
  ArrowRight, 
  CheckCircle2, 
  X, 
  Share2, 
  Bookmark, 
  Filter 
} from 'lucide-react';

interface InsightsPageProps {
  onNavigate: (view: NavView) => void;
  selectedArticle?: Article | null;
}

export const InsightsPage: React.FC<InsightsPageProps> = ({ 
  onNavigate, 
  selectedArticle: initialArticle 
}) => {
  const [activeArticle, setActiveArticle] = useState<Article | null>(initialArticle || null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    'all',
    'Workforce Insights',
    'Career Advice',
    'Hiring Strategies',
    'Recruitment Trends'
  ];

  const filteredArticles = selectedCategory === 'all'
    ? INSIGHTS_ARTICLES
    : INSIGHTS_ARTICLES.filter(a => a.category === selectedCategory);

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Header */}
      <section className="bg-[#10243A] text-white py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D6A84B]">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Research & Strategic Advisory</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Workforce Insights & Career Advice
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Expert perspectives on US talent trends, compensation benchmarking, executive interview prep, and high-performance team architecture.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-slate-200">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-2 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Topic:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer capitalize ${
                selectedCategory === cat
                  ? 'bg-[#10243A] text-white shadow-xs'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              {cat === 'all' ? 'All Articles' : cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => setActiveArticle(article)}
              className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between shadow-xs hover:shadow-md hover:border-[#1769AA]/40 transition-all cursor-pointer group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-bold text-[#1769AA]">{article.category}</span>
                  <div className="flex items-center gap-1 text-[11px]">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                <h2 className="text-lg font-bold text-[#10243A] group-hover:text-[#1769AA] transition-colors leading-snug">
                  {article.title}
                </h2>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Key Takeaways:
                  </span>
                  {article.keyTakeaways.slice(0, 2).map((takeaway, tIdx) => (
                    <div key={tIdx} className="flex items-start gap-1.5 text-[11px] text-slate-700">
                      <CheckCircle2 className="w-3 h-3 text-[#D6A84B] shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{takeaway}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-500 text-[11px]">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>{article.author.name}</span>
                </div>
                <span className="font-bold text-[#1769AA] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Read Article →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div 
            className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-3xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]"
            role="dialog"
            aria-modal="true"
          >
            <div className="bg-[#10243A] text-white p-6 sm:p-8 flex items-start justify-between shrink-0">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-[#D6A84B] font-semibold">
                  <span>{activeArticle.category}</span>
                  <span>·</span>
                  <span>{activeArticle.readTime}</span>
                  <span>·</span>
                  <span>{activeArticle.publishDate}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                  {activeArticle.title}
                </h2>
                <div className="text-xs text-slate-300">
                  By {activeArticle.author.name} · {activeArticle.author.role}
                </div>
              </div>
              <button
                onClick={() => setActiveArticle(null)}
                className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close article"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-[#10243A]">
              {/* Key Takeaways Box */}
              <div className="bg-[#F8FAFC] border-l-4 border-[#1769AA] p-5 rounded-r-xl space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1769AA]">
                  Executive Summary & Core Takeaways
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {activeArticle.keyTakeaways.map((takeaway, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D6A84B] shrink-0 mt-0.5" />
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Full Article Content */}
              <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
                {activeArticle.content.map((paragraph, pIdx) => (
                  <p key={pIdx}>
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Related Action */}
              <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-0.5 text-center sm:text-left">
                  <span className="text-xs font-bold text-[#10243A]">
                    Looking to apply these insights to your organization?
                  </span>
                  <p className="text-[11px] text-slate-500">
                    Connect with our talent acquisition practice directors.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setActiveArticle(null);
                    onNavigate('employers');
                  }}
                  className="px-5 py-2 text-xs font-bold text-white bg-[#10243A] hover:bg-[#1769AA] rounded-md transition-colors cursor-pointer whitespace-nowrap"
                >
                  Request Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
