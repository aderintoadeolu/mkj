import React from 'react';
import { 
  MessageSquare, 
  Eye, 
  ShoppingBag, 
  Star, 
  ArrowRightLeft,
  Check,
  Fuel,
  Gauge,
  Cpu,
  HardDrive
} from 'lucide-react';
import { STORE_INFO } from '../data/inventory';
import { formatNaira, formatDollar } from '../utils/formatters';

export default function ProductCard({ 
  item, 
  currency, 
  onQuickView, 
  onAddToCart,
  onOpenSwap
}) {
  const displayPrice = currency === 'NGN' ? formatNaira(item.priceNaira) : formatDollar(item.priceDollar);
  
  // Format WhatsApp message
  const waMessage = encodeURIComponent(
    `Hello MKJ Enterprises!\nI am interested in acquiring:\n\n*Product:* ${item.name}\n*Category:* ${item.category.toUpperCase()}\n*Condition:* ${item.condition}\n*Price:* ${formatNaira(item.priceNaira)}\n\nPlease let me know availability and delivery to my location!`
  );
  const waUrl = `https://wa.me/${STORE_INFO.rawPhone}?text=${waMessage}`;

  const isCar = item.category === 'cars';

  // Extract clean, human-readable spec highlights without ugly truncated keys
  const getSpecChips = () => {
    if (isCar) {
      return [
        item.specs.Engine ? item.specs.Engine.split('(')[0].trim() : null,
        item.specs.Drivetrain || null,
        item.specs.Mileage || null,
        'Tin Can Cleared'
      ].filter(Boolean).slice(0, 3);
    }
    
    // Tech items (Phones, Laptops, Accessories)
    const chips = [];
    if (item.specs.Storage) chips.push(item.specs.Storage);
    if (item.specs.Chipset || item.specs.Processor) chips.push(item.specs.Chipset || item.specs.Processor);
    if (item.specs['Battery Health']) chips.push(`Battery ${item.specs['Battery Health']}`);
    if (item.specs.Display) chips.push(item.specs.Display.split('(')[0].trim());
    if (item.specs.Warranty) chips.push(item.specs.Warranty);
    
    // Fallback if specific keys not present
    if (chips.length === 0) {
      return Object.values(item.specs).slice(0, 3).map(v => String(v).split(',')[0]);
    }
    return chips.slice(0, 3);
  };

  const specChips = getSpecChips();

  return (
    <div 
      className="group relative bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden"
    >
      {/* Top Image Showcase */}
      <div>
        <div 
          className="relative aspect-[4/3] bg-slate-50 overflow-hidden cursor-pointer"
          onClick={() => onQuickView(item)}
        >
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = item.category === 'cars'
                ? 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1000&q=80'
                : 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1000&q=80';
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"></div>

          {/* Condition Badge */}
          <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide bg-white/95 backdrop-blur-md text-slate-800 shadow-sm border border-slate-200/80">
              {item.badge || item.condition}
            </span>

            {item.inStock && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/80 backdrop-blur-sm shadow-sm">
                In Stock Under G
              </span>
            )}
          </div>

          {/* Quick Preview Button */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(item);
            }}
            className="absolute top-3 right-3 p-2 rounded-xl bg-white/90 hover:bg-blue-600 text-slate-600 hover:text-white border border-slate-200 shadow-sm transition-colors opacity-0 group-hover:opacity-100"
            title="Inspect Details"
          >
            <Eye className="w-4 h-4" />
          </button>

          {/* Rating Badge */}
          <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/95 border border-slate-200 text-xs text-slate-800 shadow-sm font-medium">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{item.rating}</span>
            <span className="text-slate-400 text-[10px]">({item.reviewsCount})</span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1 font-medium">
            <span className="capitalize text-slate-500">
              {item.category === 'cars' ? 'Foreign Used Auto' : item.category}
            </span>
            <span>{item.condition}</span>
          </div>

          <h3 
            onClick={() => onQuickView(item)}
            className="text-base font-semibold text-slate-900 group-hover:text-blue-600 transition-colors cursor-pointer line-clamp-1"
          >
            {item.name}
          </h3>

          <p className="mt-1 text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {item.shortDesc}
          </p>

          {/* Clean Human-Readable Specs (No awkward chopped monospace) */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {specChips.map((chip, idx) => (
              <span 
                key={idx} 
                className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 text-[11px] font-medium border border-slate-200/70"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing & Actions */}
      <div className="p-4 sm:p-5 pt-0">
        <div className="pt-3.5 border-t border-slate-100">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-[10px] text-slate-400 block font-medium uppercase tracking-wider">Price</span>
              <span className="text-xl font-bold tracking-tight text-slate-900">
                {displayPrice}
              </span>
            </div>
            {currency === 'NGN' && (
              <span className="text-xs text-slate-400 font-medium">
                ≈ {formatDollar(item.priceDollar)}
              </span>
            )}
          </div>

          {/* Action Row */}
          <div className="grid grid-cols-5 gap-2">
            <a
              href={waUrl}
              target="_blank"
              rel="noreferrer"
              className="col-span-4 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Order on WhatsApp</span>
            </a>

            <button
              onClick={() => onAddToCart(item)}
              className="col-span-1 flex items-center justify-center p-2.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors"
              title="Add to order cart"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => onOpenSwap(item)}
            className="w-full mt-2.5 text-center text-xs text-slate-500 hover:text-orange-600 font-medium flex items-center justify-center gap-1 py-1 transition-colors"
          >
            <ArrowRightLeft className="w-3.5 h-3.5 text-orange-500" />
            <span>Trade in your old device or car</span>
          </button>
        </div>
      </div>

    </div>
  );
}