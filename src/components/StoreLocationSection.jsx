import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Copy, 
  Check, 
  Navigation, 
  MessageSquare, 
  Building2, 
  Compass, 
  Sparkles 
} from 'lucide-react';
import { STORE_INFO } from '../data/inventory';
import { InstagramIcon } from './Icons';

export default function StoreLocationSection({ storeInfo = STORE_INFO }) {
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText(storeInfo.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="location-section" className="py-20 bg-slate-50 border-t border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-3 shadow-sm">
            <Building2 className="w-3.5 h-3.5 text-blue-600" />
            Walk-in Flagship Store
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Divine Grace Plaza, <span className="text-blue-600">Under G</span>
          </h2>
          
          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            Experience our devices and test drive our cars in person. Bring your laptop engineer, mechanic, or diagnostic tools to our physical showroom in Ogbomoso.
          </p>
        </div>

        {/* Spatial Architecture Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Interactive Address & Landmark Waypoint Guide (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl bg-white border border-slate-200 shadow-sm p-6 sm:p-8 flex flex-col justify-between">
            
            <div className="space-y-6">
              <div className="flex items-start justify-between border-b border-slate-200 pb-5">
                <div>
                  <span className="text-xs font-semibold text-orange-600 uppercase tracking-wider block">
                    Physical Storefront
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 mt-1">
                    MKJ Enterprises
                  </h3>
                  <p className="text-xs text-slate-500">
                    Proprietor: <strong className="text-slate-800">{storeInfo.owner}</strong>
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600">
                  <MapPin className="w-6 h-6" />
                </div>
              </div>

              {/* Exact Address Box */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <span className="text-[10px] uppercase text-slate-500 tracking-wider block font-semibold">
                  Official Landmark Address
                </span>
                <p className="text-sm font-semibold text-slate-900 leading-relaxed">
                  {storeInfo.address}
                </p>

                <div className="pt-2 flex flex-wrap gap-2.5">
                  <button
                    onClick={copyAddress}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-xs font-semibold text-slate-800 border border-slate-200 transition-colors shadow-sm"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-blue-600" />}
                    {copied ? "Address Copied!" : "Copy Full Address"}
                  </button>

                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Divine Grace Plaza Under G Ogbomoso")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-xs font-semibold text-blue-700 border border-blue-200 transition-colors shadow-sm"
                  >
                    <Navigation className="w-3.5 h-3.5 text-blue-600" />
                    Open in Google Maps
                  </a>
                </div>
              </div>

              {/* Step by Step Waypoint */}
              <div className="p-5 rounded-2xl bg-orange-50/70 border border-orange-200 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-orange-700 font-semibold uppercase tracking-wider">
                  <Compass className="w-4 h-4 text-orange-600" />
                  Landmark Navigation Guide:
                </div>
                <p className="text-slate-700 leading-relaxed">
                  {storeInfo.directionTip}
                </p>
                <div className="pt-1 text-slate-900 font-semibold">
                  🔑 Simple instruction: When inside Divine Grace Plaza, ask for <strong>"MKJ"</strong> at Shop B7 or call <strong>{storeInfo.phone}</strong> for instant welcoming.
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 mt-6 border-t border-slate-200">
              <a
                href={`tel:${storeInfo.phone}`}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-semibold text-xs border border-slate-200 transition-all shadow-sm"
              >
                <Phone className="w-4 h-4 text-blue-600" />
                Call MKJ ({storeInfo.phone})
              </a>

              <a
                href={`https://wa.me/${storeInfo.rawPhone}?text=Hello%20MKJ,%20I%20am%20coming%20over%20to%20Divine%20Grace%20Plaza!`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                Direct WhatsApp Message
              </a>
            </div>

          </div>

          {/* Right: Hours & VIP Channels (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-5">
            
            {/* Hours Card */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-emerald-700 text-xs font-semibold uppercase tracking-wider">
                <Clock className="w-4 h-4 text-emerald-600" />
                Operating Hours
              </div>
              <h4 className="text-2xl font-bold text-slate-900">Open 24/7 Concierge</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our WhatsApp response line operates around the clock. Showroom walk-ins are open daily. After-hours vehicle inspections and gadget handoffs can be arranged directly via WhatsApp.
              </p>
              <div className="flex items-center text-xs text-emerald-700 font-semibold">
                <span>Active &amp; Responding Now</span>
              </div>
            </div>

            {/* Channels Card */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block font-bold">
                Verified Channels
              </span>

              {/* Email */}
              <a 
                href={`mailto:${storeInfo.email}`}
                className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-50 hover:bg-blue-50 border border-slate-200 transition-colors group"
              >
                <div className="p-2.5 rounded-xl bg-blue-100 text-blue-700">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-[10px] font-mono text-slate-500">Direct Email</div>
                  <div className="text-xs font-mono font-bold text-slate-900 truncate">{storeInfo.email}</div>
                </div>
              </a>

              {/* Instagram */}
              <a 
                href={storeInfo.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-50 hover:bg-pink-50 border border-slate-200 transition-colors group"
              >
                <div className="p-2.5 rounded-xl bg-pink-100 text-pink-600">
                  <InstagramIcon className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-[10px] font-mono text-slate-500">Official Instagram</div>
                  <div className="text-xs font-mono font-bold text-slate-900">{storeInfo.instagram} (231+ followers)</div>
                </div>
              </a>

              {/* WhatsApp Business */}
              <a 
                href={`https://wa.me/${storeInfo.rawPhone}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 transition-colors group"
              >
                <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-700">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-[10px] font-mono text-slate-500">Verified WhatsApp Business</div>
                  <div className="text-xs font-mono font-bold text-emerald-700">{storeInfo.phone}</div>
                </div>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}