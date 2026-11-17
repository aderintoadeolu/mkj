import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import SwapCalculatorModal from './components/SwapCalculatorModal';
import CarShowcaseSection from './components/CarShowcaseSection';
import StoreLocationSection from './components/StoreLocationSection';
import TrustAndFAQ from './components/TrustAndFAQ';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import AdminPortal from './components/AdminPortal';

import { INVENTORY_ITEMS, CATEGORIES, STORE_INFO } from './data/inventory';
import { 
  Search, 
  SlidersHorizontal, 
  MessageSquare, 
  RotateCcw, 
  Smartphone, 
  Laptop, 
  Car, 
  Headphones, 
  LayoutGrid,
  ArrowRightLeft,
  Sparkles
} from 'lucide-react';

export default function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [conditionFilter, setConditionFilter] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  
  // Persistent Inventory State (Admin & Live Site Sync)
  const [inventory, setInventory] = useState(() => {
    try {
      const saved = localStorage.getItem('mkj_admin_inventory');
      return saved ? JSON.parse(saved) : INVENTORY_ITEMS;
    } catch {
      return INVENTORY_ITEMS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('mkj_admin_inventory', JSON.stringify(inventory));
    } catch {
      // ignore
    }
  }, [inventory]);

  // Persistent Store Information (Admin & Live Site Sync)
  const [storeInfo, setStoreInfo] = useState(() => {
    try {
      const saved = localStorage.getItem('mkj_admin_store_info');
      return saved ? JSON.parse(saved) : STORE_INFO;
    } catch {
      return STORE_INFO;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('mkj_admin_store_info', JSON.stringify(storeInfo));
    } catch {
      // ignore
    }
  }, [storeInfo]);

  // Admin View State (supports #admin hash route)
  const [isAdminView, setIsAdminView] = useState(() => {
    return window.location.hash === '#admin';
  });

  useEffect(() => {
    const handleHash = () => {
      setIsAdminView(window.location.hash === '#admin');
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleOpenAdmin = () => {
    window.location.hash = 'admin';
    setIsAdminView(true);
  };

  const handleCloseAdmin = () => {
    if (window.location.hash === '#admin') {
      history.pushState('', document.title, window.location.pathname + window.location.search);
    }
    setIsAdminView(false);
  };

  const handleResetDefaults = () => {
    setInventory(INVENTORY_ITEMS);
    setStoreInfo(STORE_INFO);
    try {
      localStorage.removeItem('mkj_admin_inventory');
      localStorage.removeItem('mkj_admin_store_info');
    } catch {
      // ignore
    }
  };

  // Persistent Currency (NGN / USD)
  const [currency, setCurrency] = useState(() => {
    try {
      return localStorage.getItem('mkj_currency') || 'NGN';
    } catch {
      return 'NGN';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('mkj_currency', currency);
    } catch {
      // ignore in restricted environments
    }
  }, [currency]);
  
  // Persistent Cart state
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('mkj_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('mkj_cart', JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  // Modals state
  const [quickViewItem, setQuickViewItem] = useState(null);
  const [isSwapOpen, setIsSwapOpen] = useState(false);
  const [swapTargetItem, setSwapTargetItem] = useState(null);

  // Add to cart handler
  const handleAddToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  // Update cart item quantity
  const handleUpdateQty = (productId, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems(prev => 
      prev.map(item => item.id === productId ? { ...item, quantity: newQty } : item)
    );
  };

  const handleRemoveItem = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Open Swap Modal for specific item
  const handleOpenSwap = (targetProduct = null) => {
    setSwapTargetItem(targetProduct);
    setIsSwapOpen(true);
  };

  // Scroll to catalog when category clicked
  const handleExploreCategory = (catId) => {
    setActiveCategory(catId);
    const catalogElem = document.getElementById('inventory-section');
    if (catalogElem) {
      catalogElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filtered and sorted inventory items
  const filteredItems = useMemo(() => {
    let result = [...inventory];

    // Filter by Category
    if (activeCategory !== 'all') {
      result = result.filter(it => it.category === activeCategory);
    }

    // Filter by Condition
    if (conditionFilter !== 'all') {
      if (conditionFilter === 'brand-new') {
        result = result.filter(it => it.condition.toLowerCase().includes('brand new'));
      } else if (conditionFilter === 'uk-used') {
        result = result.filter(it => it.condition.toLowerCase().includes('uk used'));
      } else if (conditionFilter === 'tokunbo') {
        result = result.filter(it => it.condition.toLowerCase().includes('tokunbo') || it.category === 'cars');
      }
    }

    // Filter by Search Query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(it => 
        it.name.toLowerCase().includes(q) ||
        it.shortDesc.toLowerCase().includes(q) ||
        it.category.toLowerCase().includes(q) ||
        Object.values(it.specs).some(val => String(val).toLowerCase().includes(q))
      );
    }

    // Sort items
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.priceNaira - b.priceNaira);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.priceNaira - a.priceNaira);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return result;
  }, [inventory, activeCategory, conditionFilter, searchQuery, sortBy]);

  const totalCartCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);

  // Render Admin Portal View if active
  if (isAdminView) {
    return (
      <AdminPortal
        inventory={inventory}
        setInventory={setInventory}
        storeInfo={storeInfo}
        setStoreInfo={setStoreInfo}
        onClose={handleCloseAdmin}
        onResetDefaults={handleResetDefaults}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col selection:bg-orange-500 selection:text-white">
      
      {/* Navigation */}
      <Navbar 
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        currency={currency}
        setCurrency={setCurrency}
        cartCount={totalCartCount}
        setIsCartOpen={setIsCartOpen}
        setIsSwapOpen={() => handleOpenSwap(null)}
        onOpenAdmin={handleOpenAdmin}
        storeInfo={storeInfo}
      />

      {/* Hero Section */}
      <Hero 
        onExploreCategory={handleExploreCategory}
        onOpenSwap={() => handleOpenSwap(null)}
        onQuickView={setQuickViewItem}
        inventory={inventory}
        storeInfo={storeInfo}
      />

      {/* Main Inventory Section */}
      <main id="inventory-section" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold mb-2.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Verified Showroom Stock</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Available Inventory
            </h2>
            
            <p className="mt-1.5 text-sm text-slate-600">
              Explore sealed flagship smartphones, certified Silicon MacBooks, and direct Tokunbo vehicles ready for inspection.
            </p>
          </div>

          <button
            onClick={() => handleOpenSwap(null)}
            className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors shadow-sm"
          >
            <ArrowRightLeft className="w-3.5 h-3.5 text-orange-500" />
            <span>Launch Trade-In Estimator</span>
          </button>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="rounded-2xl bg-white border border-slate-200 p-4 sm:p-5 mb-8 shadow-sm space-y-4">
          
          {/* Top Row: Search and Sort */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            
            {/* Search Input */}
            <div className="sm:col-span-8 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search iPhones, MacBooks, Lexus, Camry, AirPods, specs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sort Selector */}
            <div className="sm:col-span-4 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-slate-400 shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 focus:bg-white focus:outline-none focus:border-blue-500"
              >
                <option value="featured">Sort: Featured Collection</option>
                <option value="price-low">Price: Lowest to Highest</option>
                <option value="price-high">Price: Highest to Lowest</option>
                <option value="rating">Top Rated &amp; Best Reviews</option>
              </select>
            </div>

          </div>

          {/* Bottom Row: Category Tabs & Condition Filter */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-3.5 border-t border-slate-100">
            
            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                    activeCategory === cat.id
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Condition Filters */}
            <div className="flex items-center gap-1.5 text-xs overflow-x-auto pb-1">
              <span className="text-slate-400 text-xs shrink-0 font-medium mr-1">Filter:</span>
              <button
                onClick={() => setConditionFilter('all')}
                className={`px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                  conditionFilter === 'all' ? 'bg-slate-200 text-slate-900 font-semibold' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setConditionFilter('brand-new')}
                className={`px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                  conditionFilter === 'brand-new' ? 'bg-emerald-100 text-emerald-800 font-semibold' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Brand New Sealed
              </button>
              <button
                onClick={() => setConditionFilter('uk-used')}
                className={`px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                  conditionFilter === 'uk-used' ? 'bg-blue-100 text-blue-800 font-semibold' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Clean UK Used
              </button>
              <button
                onClick={() => setConditionFilter('tokunbo')}
                className={`px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                  conditionFilter === 'tokunbo' ? 'bg-orange-100 text-orange-800 font-semibold' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Direct Tokunbo
              </button>
            </div>

          </div>

        </div>

        {/* Counter */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-6 px-1">
          <span>
            Showing <strong className="text-slate-900 font-semibold">{filteredItems.length}</strong> items
            {activeCategory !== 'all' && ` in ${activeCategory}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </span>

          {(activeCategory !== 'all' || searchQuery !== '' || conditionFilter !== 'all') && (
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
                setConditionFilter('all');
              }}
              className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* Product Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 px-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-3">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Item Not Currently in Stock</h3>
            <p className="text-xs text-slate-600 max-w-sm mx-auto mt-1 mb-5">
              Looking for a specific storage size, color, or vehicle model? MKJ handles custom imports and sourcing.
            </p>
            <a
              href={`https://wa.me/${STORE_INFO.rawPhone}?text=Hello%20MKJ,%20I%20am%20looking%20for%20a%20special%20device%20or%20car.`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Request Custom Sourcing on WhatsApp</span>
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredItems.map(item => (
              <ProductCard
                key={item.id}
                item={item}
                currency={currency}
                onQuickView={setQuickViewItem}
                onAddToCart={handleAddToCart}
                onOpenSwap={handleOpenSwap}
              />
            ))}
          </div>
        )}

      </main>

      {/* Auto Lounge Tokunbo Showcase */}
      <CarShowcaseSection 
        onQuickView={setQuickViewItem}
        onOpenSwap={handleOpenSwap}
        inventory={inventory}
        storeInfo={storeInfo}
      />

      {/* Physical Showroom Location */}
      <StoreLocationSection storeInfo={storeInfo} />

      {/* Social Proof & FAQs */}
      <TrustAndFAQ />

      {/* Footer */}
      <Footer 
        onCategorySelect={handleExploreCategory}
        onOpenAdmin={handleOpenAdmin}
        storeInfo={storeInfo}
      />

      {/* Quick View Product Modal */}
      {quickViewItem && (
        <ProductModal
          item={quickViewItem}
          currency={currency}
          onClose={() => setQuickViewItem(null)}
          onAddToCart={handleAddToCart}
          onOpenSwap={handleOpenSwap}
        />
      )}

      {/* Swap / Trade-in Modal */}
      <SwapCalculatorModal
        isOpen={isSwapOpen}
        onClose={() => setIsSwapOpen(false)}
        targetItem={swapTargetItem}
      />

      {/* Cart Flyout Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        currency={currency}
      />

    </div>
  );
}