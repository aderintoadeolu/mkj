import React from 'react';
import { 
  Car, 
  ShieldCheck, 
  FileCheck, 
  Wrench, 
  Sparkles, 
  ArrowRight, 
  MessageSquare, 
  CheckCircle2,
  Gauge,
  Award
} from 'lucide-react';
import { STORE_INFO, INVENTORY_ITEMS } from '../data/inventory';
import { formatNaira } from '../utils/formatters';

export default function CarShowcaseSection({ 
  onQuickView, 
  onOpenSwap,
  inventory = INVENTORY_ITEMS,
  storeInfo = STORE_INFO
}) {
  const cars = inventory.filter(it => it.category === 'cars');

  return (
    <section id="cars-spotlight" className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs font-semibold mb-3">
              <Award className="w-3.5 h-3.5 text-orange-600" />
              <span>MKJ Auto Lounge &amp; Tokunbo Fleet</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Direct Foreign-Used <span className="text-[#FF5500]">Tokunbo</span> Vehicles
            </h2>
            
            <p className="mt-2 text-sm text-slate-600 max-w-2xl leading-relaxed">
              Every vehicle arrives with verified Lagos Tin Can customs duty papers, clean accident-free titles, and is open to comprehensive pre-purchase inspections by your technician.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`https://wa.me/${storeInfo.rawPhone}?text=Hello%20MKJ,%20I%20am%20inquiring%20about%20your%20available%20Tokunbo%20cars!`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF5500] hover:bg-[#e04a00] text-white text-xs font-semibold shadow-sm transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Consult MKJ on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* The 3 Assurance Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600">
              <FileCheck className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Genuine Lagos Customs Duty</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              100% genuine release papers and assessment documents. Zero fear of highway seizures or impound issues anywhere in Nigeria.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
              <Wrench className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Mechanic &amp; OBD Scanner Allowed</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We welcome your trusted auto technician to our Under G location for thorough engine diagnostic scanning, suspension testing, and road testing.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Car Upgrade &amp; Swap Facility</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Trade in your current clean Nigerian-used vehicle (Toyota, Lexus, Honda) and top up the balance for a luxury Tokunbo upgrade.
            </p>
          </div>
        </div>

        {/* Featured Tokunbo Vehicles */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {cars.map((car) => (
            <div 
              key={car.id}
              className="rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col sm:flex-row group"
            >
              <div className="sm:w-1/2 relative aspect-[4/3] sm:aspect-auto overflow-hidden bg-slate-100 cursor-pointer"
                   onClick={() => onQuickView(car)}>
                <img 
                  src={car.image} 
                  alt={car.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/95 text-slate-800 shadow-sm border border-slate-200/80">
                  {car.badge}
                </span>
              </div>

              <div className="sm:w-1/2 p-5 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block">
                    {car.specs.Engine ? car.specs.Engine.split('(')[0].trim() : 'V6 Engine'}
                  </span>
                  
                  <h3 
                    onClick={() => onQuickView(car)}
                    className="text-base font-bold text-slate-900 mt-1 cursor-pointer group-hover:text-blue-600 transition-colors"
                  >
                    {car.name}
                  </h3>

                  <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                    {car.shortDesc}
                  </p>

                  <div className="mt-3 space-y-1.5 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <Gauge className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{car.specs.Mileage}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span className="truncate">{car.specs.Features?.split(',')[0]}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3.5 border-t border-slate-100">
                  <div className="text-xl font-bold tracking-tight text-slate-900 mb-3">
                    {formatNaira(car.priceNaira)}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => onQuickView(car)}
                      className="flex-1 py-2 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
                    >
                      Inspect Dossier
                    </button>
                    <a
                      href={`https://wa.me/${STORE_INFO.rawPhone}?text=${encodeURIComponent(`Hello MKJ, I want to book an inspection for the ${car.name} (${formatNaira(car.priceNaira)}) at Under G.`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-colors flex items-center justify-center"
                      title="WhatsApp MKJ"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </a>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}