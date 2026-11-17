import React from 'react';
import { 
  ShieldCheck, 
  Car, 
  Smartphone, 
  ArrowRight, 
  ArrowRightLeft, 
  Sparkles, 
  MapPin, 
  BadgeCheck,
  CheckCircle2,
  FileCheck2,
  PhoneCall
} from 'lucide-react';
import { STORE_INFO, INVENTORY_ITEMS } from '../data/inventory';
import { formatNaira } from '../utils/formatters';

export default function Hero({ 
  onExploreCategory, 
  onOpenSwap, 
  onQuickView,
  inventory = INVENTORY_ITEMS,
  storeInfo = STORE_INFO
}) {
  const featuredPhone = inventory.find(it => it.id === 'phone-iphone-15-pro-max') || inventory.find(it => it.category === 'phones');
  const featuredCar = inventory.find(it => it.id === 'car-lexus-rx350-2018') || inventory.find(it => it.category === 'cars');

  return (
    <section className="relative overflow-hidden pt-16 pb-20 lg:pt-20 lg:pb-24 border-b border-slate-200/80 bg-white">
      {/* Subtle Ambient Background Light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[360px] bg-gradient-to-b from-blue-50/60 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Subtle Eyebrow */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-slate-100/90 border border-slate-200 text-xs font-semibold text-slate-700">
            <span>Direct Tin Can Cleared Vehicles &amp; Verified Tech Flagships</span>
          </div>
        </div>

        {/* Hero Title & Subtext in Clean Plus Jakarta Sans */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.14]">
            Premium Flagship Tech &amp; <br className="hidden sm:inline" />
            <span className="text-blue-600">Foreign-Used</span> <span className="text-[#FF5500]">Automobiles</span>
          </h1>
          
          <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto">
            Direct Lagos Tin Can customs-cleared vehicles, sealed iPhones, and Apple Silicon MacBooks. Tested, certified, and ready for inspection at Under G, Ogbomoso.
          </p>

          {/* Action Navigation Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onExploreCategory('all')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-all shadow-sm active:scale-[0.99]"
            >
              <span>Explore All Inventory</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenSwap}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm transition-all shadow-sm active:scale-[0.99]"
            >
              <ArrowRightLeft className="w-4 h-4 text-orange-600" />
              <span>Trade-In Estimator</span>
            </button>

            <a
              href={`https://wa.me/${storeInfo.rawPhone}?text=${encodeURIComponent('Hello MKJ! I want to inquire about your available gadgets and cars.')}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-slate-600 hover:text-emerald-700 font-semibold text-sm transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-emerald-600" />
              <span>Talk to MKJ</span>
            </a>
          </div>
        </div>

        {/* Dual Pillar Visual Feature Cards */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          
          {/* Card 1: Flagship Tech */}
          <div 
            onClick={() => featuredPhone && onQuickView(featuredPhone)}
            className="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-100 text-xs font-semibold">
                  <Smartphone className="w-3.5 h-3.5 text-blue-600" />
                  Flagship Mobile &amp; Macs
                </span>
                <span className="text-xs font-bold text-slate-900">
                  {featuredPhone ? formatNaira(featuredPhone.priceNaira) : '₦1,550,000'}
                </span>
              </div>

              <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-50 mb-4 border border-slate-100">
                <img 
                  src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1000&q=80" 
                  alt="iPhone 15 Pro Max" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded bg-white/95 backdrop-blur-md border border-slate-200 text-[11px] font-medium text-slate-700 flex items-center gap-1">
                  <BadgeCheck className="w-3 h-3 text-blue-600" />
                  <span>Factory Unlocked · 100% Battery</span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                iPhone 15 Pro Max 256GB
              </h3>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                Titanium chassis with Apple A17 Pro 3nm silicon. Genuine Apple accessories and verified battery health in stock.
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-blue-600 group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                Inspect Hardware Dossier <ArrowRight className="w-3.5 h-3.5" />
              </span>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onExploreCategory('phones');
                }}
                className="text-xs text-slate-500 hover:text-slate-900 font-medium"
              >
                View all phones
              </button>
            </div>
          </div>

          {/* Card 2: Tokunbo Fleet */}
          <div 
            onClick={() => featuredCar && onQuickView(featuredCar)}
            className="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-orange-50 text-orange-700 border border-orange-100 text-xs font-semibold">
                  <Car className="w-3.5 h-3.5 text-orange-600" />
                  Direct Tokunbo Vehicles
                </span>
                <span className="text-xs font-bold text-slate-900">
                  {featuredCar ? formatNaira(featuredCar.priceNaira) : '₦38,500,000'}
                </span>
              </div>

              <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-50 mb-4 border border-slate-100">
                <img 
                  src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1000&q=80" 
                  alt="2018 Lexus RX 350 AWD" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded bg-white/95 backdrop-blur-md border border-slate-200 text-[11px] font-medium text-slate-700 flex items-center gap-1">
                  <FileCheck2 className="w-3 h-3 text-orange-600" />
                  <span>Tin Can Lagos Cleared · Clean Title</span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                2018 Lexus RX 350 AWD
              </h3>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                Butter cream leather, panoramic glass roof, 3.5L V6 engine, 54k miles with full Lagos port customs documentation.
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-orange-600 group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                Inspect Vehicle Dossier <ArrowRight className="w-3.5 h-3.5" />
              </span>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onExploreCategory('cars');
                }}
                className="text-xs text-slate-500 hover:text-slate-900 font-medium"
              >
                View full fleet
              </button>
            </div>
          </div>

        </div>

        {/* 4 Minimalist Trust Points Strip */}
        <div className="mt-14 pt-8 border-t border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">100% Tested Devices</div>
              <div className="text-[11px] text-slate-500">TrueTone &amp; battery verified</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600 shrink-0">
              <FileCheck2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Tin Can Port Cleared</div>
              <div className="text-[11px] text-slate-500">Genuine customs documents</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
              <ArrowRightLeft className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Trade-In &amp; Swaps</div>
              <div className="text-[11px] text-slate-500">Upgrade with top-up balance</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Under G Showroom</div>
              <div className="text-[11px] text-slate-500">Shop B7, Divine Grace Plaza</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
