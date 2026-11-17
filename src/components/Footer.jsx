import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  ArrowUp,
  MessageSquare,
  Lock
} from 'lucide-react';
import { STORE_INFO } from '../data/inventory';
import { InstagramIcon } from './Icons';

export default function Footer({ onCategorySelect, onOpenAdmin, storeInfo = STORE_INFO }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-300 text-xs">
      {/* Top Banner CTA with MKJ Brand Gradients */}
      <div className="bg-gradient-to-r from-blue-900/60 via-slate-900 to-orange-950/40 border-b border-slate-800 py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <h3 className="text-xl font-black text-white">
              Ready to Upgrade Your Gadget or Drive Home in a Tokunbo Car?
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Chat directly with MKJ right now on WhatsApp or call for immediate concierge service.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${STORE_INFO.rawPhone}?text=Hello%20MKJ%20Enterprises,%20I%20am%20ready%20to%20buy!`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              Chat MKJ on WhatsApp
            </a>

            <a
              href={`tel:${STORE_INFO.phone}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-semibold text-xs transition-all"
            >
              <Phone className="w-4 h-4 text-orange-400" />
              Call Now
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-blue-500 bg-white shadow-md">
                <img src="/mkj_logo_clean.png" alt="MKJ Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="text-base font-black text-white">MKJ ENTERPRISES</h4>
                <p className="text-[10px] text-[#FF5500] font-bold uppercase tracking-wider">
                  Devices • Laptops • Cars
                </p>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed text-xs">
              Nigeria's trusted tech and automobile showroom located at Under G, Ogbomoso. Direct Tokunbo foreign-used cars cleared at Tin Can, plus authentic iPhones, MacBooks, and premium accessories.
            </p>

            <div className="pt-1 text-slate-300 text-xs">
              <span>Proprietor: <strong className="text-white">{STORE_INFO.owner}</strong></span>
            </div>
          </div>

          {/* Column 2: Inventory Shortcuts */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Inventory Categories
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onCategorySelect('phones')} className="hover:text-blue-400 transition-colors">
                  📱 Flagship iPhones &amp; Samsung
                </button>
              </li>
              <li>
                <button onClick={() => onCategorySelect('laptops')} className="hover:text-blue-400 transition-colors">
                  💻 Apple MacBooks &amp; Dell XPS
                </button>
              </li>
              <li>
                <button onClick={() => onCategorySelect('cars')} className="hover:text-orange-400 transition-colors">
                  🚗 Tokunbo Cars (Lexus, Toyota, Benz)
                </button>
              </li>
              <li>
                <button onClick={() => onCategorySelect('accessories')} className="hover:text-blue-400 transition-colors">
                  🎧 AirPods, Watches &amp; Powerbanks
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Trust & Assurances */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Our Assurances
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Original Battery Health &amp; Screen</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Authentic Lagos Customs Duty Cleared</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>7-Day Testing &amp; Swap Guarantee</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-400 shrink-0" />
                <span>24/7 Rapid WhatsApp Service</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Physical Address & Socials */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Store Headquarters
            </h4>
            <div className="flex items-start gap-2 text-slate-300">
              <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <span>{STORE_INFO.address}</span>
            </div>

            <div className="space-y-1.5 pt-2">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-500" />
                <a href={`tel:${STORE_INFO.phone}`} className="hover:text-white transition-colors">
                  {STORE_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                <a href={`mailto:${STORE_INFO.email}`} className="hover:text-white transition-colors truncate">
                  {STORE_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <InstagramIcon className="w-3.5 h-3.5 text-pink-400" />
                <a href={STORE_INFO.instagramUrl} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  {STORE_INFO.instagram}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <div>
            © {new Date().getFullYear()} MKJ ENTERPRISES (MKJ Ola Enterprises). All Rights Reserved. Under G, Ogbomoso.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
            >
              <Lock className="w-3.5 h-3.5 text-blue-400" />
              <span>Staff &amp; Admin Portal</span>
            </button>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              Back to Top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}