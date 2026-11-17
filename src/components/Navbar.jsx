import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Menu, 
  X, 
  ArrowRightLeft, 
  MessageSquare,
  Lock
} from 'lucide-react';
import { STORE_INFO } from '../data/inventory';

export default function Navbar({ 
  activeCategory, 
  setActiveCategory, 
  currency, 
  setCurrency, 
  cartCount, 
  setIsCartOpen,
  setIsSwapOpen,
  onOpenAdmin,
  storeInfo = STORE_INFO
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (catId) => {
    setActiveCategory(catId);
    setMobileMenuOpen(false);
    const catalogElem = document.getElementById('inventory-section');
    if (catalogElem) {
      catalogElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-2">
          
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-2 sm:gap-2.5 group shrink-0 min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl overflow-hidden border border-slate-200 bg-white flex items-center justify-center shadow-xs shrink-0">
              <img 
                src="/mkj_logo_clean.png" 
                alt="MKJ Enterprises" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/logo.svg';
                }}
              />
            </div>
            
            <span className="text-sm sm:text-base font-bold tracking-tight text-slate-900 whitespace-nowrap">
              MKJ <span className="text-blue-600">Enterprises</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {[
              { id: 'all', label: 'All Catalog' },
              { id: 'phones', label: 'Smartphones' },
              { id: 'laptops', label: 'Laptops' },
              { id: 'cars', label: 'Tokunbo Cars' },
              { id: 'accessories', label: 'Accessories' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => handleNavClick(tab.id)}
                className={`transition-colors py-1 ${
                  activeCategory === tab.id
                    ? 'text-blue-600 font-semibold border-b-2 border-blue-600'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}

            <button
              onClick={() => setIsSwapOpen(true)}
              className="text-orange-600 hover:text-orange-700 font-semibold transition-colors flex items-center gap-1"
            >
              <ArrowRightLeft className="w-3.5 h-3.5" />
              <span>Trade-In</span>
            </button>
          </nav>

          {/* Utility Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Currency Selector */}
            <button
              onClick={() => setCurrency(currency === 'NGN' ? 'USD' : 'NGN')}
              className="h-8 sm:h-9 px-2 sm:px-2.5 rounded-xl border border-slate-200 text-[11px] sm:text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors whitespace-nowrap flex items-center justify-center shrink-0"
              title="Toggle currency display"
            >
              {currency === 'NGN' ? '₦ NGN' : '$ USD'}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center shrink-0"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Staff & Admin Portal Trigger (Desktop/Tablet: in header; Mobile: in menu dropdown) */}
            <button
              onClick={onOpenAdmin}
              className="hidden sm:flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl border border-slate-200 text-slate-500 hover:text-blue-600 hover:bg-slate-50 transition-colors shrink-0"
              title="Staff & Admin Portal"
              aria-label="Staff & Admin Portal"
            >
              <Lock className="w-4 h-4" />
            </button>

            {/* WhatsApp VIP Button */}
            <a
              href={`https://wa.me/${storeInfo.rawPhone}?text=Hello%20MKJ%20Enterprises!%20I'm%20chatting%20from%20your%20website.`}
              target="_blank"
              rel="noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 h-9 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors shadow-xs"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp MKJ</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-8 h-8 sm:w-9 sm:h-9 md:hidden rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center justify-center shrink-0"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-4 space-y-1.5 shadow-lg">
          {[
            { id: 'all', label: 'All Catalog' },
            { id: 'phones', label: 'Smartphones' },
            { id: 'laptops', label: 'Laptops & MacBooks' },
            { id: 'cars', label: 'Tokunbo Cars' },
            { id: 'accessories', label: 'Audio & Accessories' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => handleNavClick(tab.id)}
              className={`w-full text-left px-3.5 py-2 rounded-xl text-sm font-semibold transition-colors ${
                activeCategory === tab.id ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
          
          <button
            onClick={() => {
              setIsSwapOpen(true);
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3.5 py-2 rounded-xl text-sm font-semibold text-orange-600 hover:bg-orange-50 flex items-center gap-2 transition-colors"
          >
            <ArrowRightLeft className="w-4 h-4" />
            <span>Trade-In Estimator</span>
          </button>

          <button
            onClick={() => {
              onOpenAdmin();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 flex items-center justify-between border-t border-slate-100 pt-3 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-blue-600" />
              <span>Staff &amp; Admin Portal</span>
            </div>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-100">
              Backoffice
            </span>
          </button>
        </div>
      )}
    </header>
  );
}