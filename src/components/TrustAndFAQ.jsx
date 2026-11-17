import React, { useState } from 'react';
import { 
  Star, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  Truck, 
  MessageCircle, 
  CheckCircle,
  Quote
} from 'lucide-react';
import { TESTIMONIALS, FAQS, STORE_INFO } from '../data/inventory';

export default function TrustAndFAQ() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <section className="py-16 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Testimonials */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider font-mono">
              Customer Experiences
            </span>
            <h2 className="text-3xl font-black text-slate-900 mt-1">
              Trusted by Students, Professionals &amp; Car Owners
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              See what verified customers across Ogbomoso, Lagos, and nationwide say about MKJ Enterprises.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div 
                key={t.id}
                className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/90 flex flex-col justify-between shadow-sm relative hover:bg-white hover:shadow-md transition-all duration-300"
              >
                <div>
                  <div className="flex items-center gap-1 text-orange-500 mb-3">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-orange-500" />
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                    "{t.comment}"
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
                  <img 
                    src={t.avatar} 
                    alt={t.name} 
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/mkj_avatar.jpg';
                    }}
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{t.name}</h4>
                    <p className="text-[11px] text-slate-500">{t.role}</p>
                    <span className="text-[10px] text-blue-700 font-semibold block mt-0.5">
                      Purchased: {t.itemPurchased}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs font-bold text-orange-600 uppercase tracking-wider font-mono">
              Got Questions?
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <div 
                key={idx}
                className="rounded-2xl bg-slate-50 border border-slate-200 overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 hover:bg-slate-100/70 transition-colors"
                >
                  <span className="text-xs sm:text-sm font-bold text-slate-900">
                    {faq.q}
                  </span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-4 h-4 text-blue-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                  )}
                </button>

                {openFaq === idx && (
                  <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-200/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}