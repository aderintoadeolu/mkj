import React, { useState } from 'react';
import { 
  X, 
  MessageSquare, 
  Phone, 
  ShieldCheck, 
  CheckCircle2, 
  Truck, 
  ArrowRightLeft, 
  MapPin, 
  Share2, 
  Star,
  Sparkles
} from 'lucide-react';
import { STORE_INFO } from '../data/inventory';
import { formatNaira, formatDollar } from '../utils/formatters';

export default function ProductModal({ 
  item, 
  currency, 
  onClose, 
  onAddToCart,
  onOpenSwap 
}) {
  if (!item) return null;

  const [activeImage, setActiveImage] = useState(item.image);
  const [copied, setCopied] = useState(false);

  const displayPrice = currency === 'NGN' ? formatNaira(item.priceNaira) : formatDollar(item.priceDollar);
  
  const waMessage = encodeURIComponent(
    `Hello MKJ Enterprises!\nI want to acquire the *${item.name}*.\nPrice: ${formatNaira(item.priceNaira)}\nCondition: ${item.condition}\n\nPlease let me know how I can pick it up at Under G or arrange delivery!`
  );
  const waUrl = `https://wa.me/${STORE_INFO.rawPhone}?text=${waMessage}`;

  const isCar = item.category === 'cars';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2 font-mono">
            <span className={`px-2.5 py-0.5 rounded-lg text-xs font-bold uppercase ${
              isCar ? 'bg-orange-100 text-orange-700 border border-orange-200' : 'bg-blue-100 text-blue-700 border border-blue-200'
            }`}>
              {item.category}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              {item.condition}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 transition-colors text-xs flex items-center gap-1 shadow-sm"
              title="Share Link"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? 'Copied!' : 'Share'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 transition-colors shadow-sm"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Left: Gallery & Visuals (6 cols) */}
          <div className="md:col-span-6 space-y-4">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-md">
              <img 
                src={activeImage} 
                alt={item.name} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = isCar 
                    ? 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1000&q=80'
                    : 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1000&q=80';
                }}
              />
              <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10.5px] font-mono font-black uppercase text-white shadow-md ${
                isCar ? 'bg-[#FF5500]' : 'bg-blue-600'
              }`}>
                {item.badge}
              </span>
            </div>

            {/* Thumbnail Row */}
            {item.gallery && item.gallery.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {item.gallery.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(imgUrl)}
                    className={`relative w-20 aspect-video rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      activeImage === imgUrl ? 'border-blue-600 scale-105' : 'border-slate-200 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Assurances List */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2 text-slate-900 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>MKJ Authenticity Guarantee</span>
              </div>
              <p className="leading-relaxed">
                Physical inspection available at Shop B7 Divine Grace Plaza, Under G, Ogbomoso. Diagnostic scans, mechanic checks, and battery tests welcomed before payment.
              </p>
            </div>
          </div>

          {/* Right: Technical Specs & Acquisition (6 cols) */}
          <div className="md:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center text-orange-500">
                  <Star className="w-4 h-4 fill-orange-500" />
                </div>
                <span className="text-xs font-bold text-slate-900 font-mono">{item.rating}</span>
                <span className="text-xs text-slate-500">({item.reviewsCount} customer reviews)</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {item.name}
              </h2>

              <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                {item.shortDesc}
              </p>

              {/* Specs Table */}
              <div className="mt-5 space-y-2">
                <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block font-bold">
                  Technical Specifications
                </span>
                <div className="rounded-2xl border border-slate-200 overflow-hidden divide-y divide-slate-100 text-xs">
                  {Object.entries(item.specs).map(([key, value]) => (
                    <div key={key} className="flex p-2.5 bg-slate-50/50">
                      <span className="w-1/3 text-slate-500 font-mono font-medium">{key}</span>
                      <span className="w-2/3 text-slate-900 font-bold">{String(value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Price & CTA Action Group */}
            <div className="pt-4 border-t border-slate-200 space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block font-medium">Price</span>
                  <span className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
                    isCar ? 'text-orange-600' : 'text-blue-600'
                  }`}>
                    {displayPrice}
                  </span>
                </div>
                {currency === 'NGN' && (
                  <span className="text-xs font-mono text-slate-500">
                    ≈ {formatDollar(item.priceDollar)}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Order on WhatsApp</span>
                </a>

                <button
                  onClick={() => {
                    onAddToCart(item);
                    onClose();
                  }}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-colors"
                >
                  <span>Add to Selection</span>
                </button>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onOpenSwap(item);
                }}
                className="w-full py-2.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <ArrowRightLeft className="w-4 h-4 text-orange-600" />
                <span>Trade in your old phone or car toward this item</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}