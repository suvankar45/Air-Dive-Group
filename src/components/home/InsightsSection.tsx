import React from 'react';
import { NavView } from '../layout/Navbar';
import { INSIGHTS_ARTICLES } from '../../data/mockData';
import { Article } from '../../types';
import { ArrowRight, BookOpen, Clock } from 'lucide-react';

interface InsightsSectionProps {
  onNavigate: (view: NavView) => void;
  onSelectArticle: (article: Article) => void;
}

export const InsightsSection: React.FC<InsightsSectionProps> = ({ onNavigate, onSelectArticle }) => {
  return (
    <section className="py-20 bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1769AA]">
              <BookOpen className="w-3.5 h-3.5 text-[#D6A84B]" />
              <span>Thought Leadership & Industry Research</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#10243A] tracking-tight">
              Workforce Intelligence & Career Insights
            </h2>
            <p className="text-sm text-slate-600 max-w-2xl">
              Strategic analysis on the US labor market, hiring velocity, executive interview dynamics, and organizational agility.
            </p>
          </div>

          <button
            onClick={() => onNavigate('insights')}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-[#10243A] hover:text-[#1769AA] border border-slate-300 rounded-md bg-white hover:bg-slate-50 transition-colors shadow-xs cursor-pointer self-start md:self-auto shrink-0"
          >
            <span>View All Insights & Articles</span>
            <ArrowRight className="w-4 h-4 text-[#1769AA]" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {INSIGHTS_ARTICLES.slice(0, 3).map((article) => (
            <div
              key={article.id}
              onClick={() => onSelectArticle(article)}
              className="group bg-white rounded-xl border border-slate-200/90 p-6 shadow-xs hover:shadow-md hover:border-[#1769AA]/40 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-bold text-[#1769AA]">{article.category}</span>
                  <div className="flex items-center gap-1 text-[11px]">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-[#10243A] group-hover:text-[#1769AA] transition-colors leading-snug">
                  {article.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#1769AA]">
                <span>Read Full Article</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
