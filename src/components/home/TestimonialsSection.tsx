import React from 'react';
import { TESTIMONIALS } from '../../data/mockData';
import { Quote, Building2, UserCheck, CheckCircle } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1769AA]">
            <span>Partnership Endorsements</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#10243A] tracking-tight">
            Trusted by Employers and Candidates Alike
          </h2>
          <p className="text-sm text-slate-600">
            Real outcomes from executive hiring partners and placed candidates across the United States.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:border-[#1769AA]/40 transition-all"
            >
              <div className="space-y-4">
                <Quote className="w-8 h-8 text-[#D6A84B] opacity-75" />
                <p className="text-sm text-slate-700 leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-200/80 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-[#10243A]">{t.author}</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                    {t.type}
                  </span>
                </div>
                <div className="text-xs text-[#1769AA] font-medium">{t.title}</div>
                <div className="text-xs text-slate-500">{t.company}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <span className="text-[11px] text-slate-600 italic">
            Note: All testimonials represent demonstration client & candidate profiles until verified institutional approvals are executed.
          </span>
        </div>
      </div>
    </section>
  );
};
