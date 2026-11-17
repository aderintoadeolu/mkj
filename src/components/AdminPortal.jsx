import React, { useState, useMemo, useRef } from 'react';
import { 
  Boxes, 
  Store, 
  Plus, 
  Pencil, 
  Trash2, 
  ArrowLeft, 
  Search, 
  Check, 
  Copy, 
  ExternalLink, 
  ShieldCheck, 
  Car, 
  Smartphone, 
  Laptop, 
  Headphones, 
  MessageSquare, 
  Phone, 
  MapPin, 
  DollarSign, 
  Layers, 
  RotateCcw, 
  Save, 
  X, 
  Eye, 
  AlertTriangle,
  Lock,
  Unlock,
  CheckCircle2,
  TrendingUp,
  Tag,
  UploadCloud,
  Image as ImageIcon
} from 'lucide-react';
import { formatNaira, formatDollar } from '../utils/formatters';

// Subcomponent: Multi-Image Uploader & Drag-and-Drop Gallery Manager (Up to 10 Pictures)
function ProductImageUploader({ gallery = [], onChange }) {
  const [urlInput, setUrlInput] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const images = Array.isArray(gallery) ? gallery : [];

  const handleFiles = (fileList) => {
    const validFiles = Array.from(fileList).filter(f => f.type.startsWith('image/'));
    if (!validFiles.length) return;

    const availableSlots = 10 - images.length;
    if (availableSlots <= 0) {
      alert('You have reached the maximum limit of 10 pictures.');
      return;
    }

    const filesToRead = validFiles.slice(0, availableSlots);
    const readTasks = filesToRead.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readTasks).then(newImages => {
      onChange([...images, ...newImages]);
    });
  };

  const handleAddUrl = (e) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    if (images.length >= 10) {
      alert('You have reached the maximum limit of 10 pictures.');
      return;
    }
    onChange([...images, urlInput.trim()]);
    setUrlInput('');
  };

  const handleSetCover = (index) => {
    if (index === 0) return;
    const next = [...images];
    const [selected] = next.splice(index, 1);
    next.unshift(selected);
    onChange(next);
  };

  const handleRemove = (index) => {
    const next = images.filter((_, i) => i !== index);
    onChange(next);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer && e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  return (
    <div className="space-y-3 pt-1">
      <div className="flex items-center justify-between">
        <label className="font-semibold text-slate-700 block text-xs">
          Product Pictures ({images.length}/10)
        </label>
        <span className="text-[11px] text-blue-600 font-medium">
          First picture is automatically used as the Cover Photo
        </span>
      </div>

      {/* Drag & Drop Upload Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all ${
          isDragging
            ? 'border-blue-500 bg-blue-50/70'
            : 'border-slate-300 bg-slate-50/60 hover:bg-slate-50 hover:border-slate-400'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            if (e.target.files) {
              handleFiles(e.target.files);
              e.target.value = '';
            }
          }}
        />

        <div className="flex flex-col items-center justify-center gap-1.5 pointer-events-none">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-1">
            <UploadCloud className="w-5 h-5" />
          </div>
          <div className="text-xs font-bold text-slate-800">
            Click to upload or drag &amp; drop photos
          </div>
          <p className="text-[11px] text-slate-500">
            Add up to 10 pictures (PNG, JPG, WEBP). First picture is the cover.
          </p>
        </div>
      </div>

      {/* Or Paste Image URL Input */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <input
            type="url"
            placeholder="Or paste an image web link (https://...)"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddUrl(e);
              }
            }}
            className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:bg-white focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="button"
          onClick={handleAddUrl}
          className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold shrink-0 transition-colors"
        >
          + Add URL
        </button>
      </div>

      {/* Picture Thumbnails Grid */}
      {images.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3 pt-1">
          {images.map((imgUrl, idx) => (
            <div
              key={idx}
              className={`relative aspect-[4/3] rounded-xl overflow-hidden border bg-slate-100 group transition-all ${
                idx === 0 
                  ? 'border-blue-600 ring-2 ring-blue-500/30 shadow-sm' 
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <img
                src={imgUrl}
                alt={`Photo ${idx + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/mkj_logo_clean.png';
                }}
              />

              {/* Cover Badge or Index */}
              <div className="absolute top-1.5 left-1.5">
                {idx === 0 ? (
                  <span className="px-1.5 py-0.5 rounded bg-blue-600 text-white font-bold text-[9px] shadow-sm tracking-wide">
                    ★ COVER
                  </span>
                ) : (
                  <span className="px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-sm text-white font-semibold text-[9px]">
                    #{idx + 1}
                  </span>
                )}
              </div>

              {/* Action Buttons Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-1.5">
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(idx);
                    }}
                    className="p-1 rounded bg-rose-600 text-white hover:bg-rose-700 transition-colors shadow-sm"
                    title="Remove photo"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>

                {idx !== 0 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSetCover(idx);
                    }}
                    className="w-full py-1 rounded bg-white text-slate-900 font-bold text-[9px] hover:bg-blue-50 hover:text-blue-600 transition-colors shadow-sm"
                  >
                    Make Cover
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-medium flex items-center gap-2">
          <span>⚠️ No photos added yet. Upload or paste a picture above.</span>
        </div>
      )}
    </div>
  );
}

export default function AdminPortal({ 
  inventory, 
  setInventory, 
  storeInfo, 
  setStoreInfo, 
  onClose,
  onResetDefaults 
}) {
  const [activeTab, setActiveTab] = useState('inventory'); // 'inventory' | 'store' | 'broadcast'
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [saveSuccessNotice, setSaveSuccessNotice] = useState('');

  // Store settings form state
  const [storeForm, setStoreForm] = useState({ ...storeInfo });
  const [isEditingStore, setIsEditingStore] = useState(false);

  // Broadcast copy state
  const [broadcastCopied, setBroadcastCopied] = useState(false);

  // New product initial state
  const initialNewItem = {
    name: '',
    category: 'phones',
    condition: 'Brand New Sealed',
    badge: 'Flagship Drop',
    priceNaira: 1200000,
    priceDollar: 820,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1000&q=80'
    ],
    shortDesc: '',
    specs: {
      "Storage": "256GB NVMe",
      "Color": "Natural Titanium",
      "Battery": "100% Health",
      "Warranty": "MKJ 6-Month Coverage"
    },
    isFeatured: false,
    inStock: true,
    rating: 5.0,
    reviewsCount: 1
  };
  const [newItem, setNewItem] = useState(initialNewItem);
  const [newSpecKey, setNewSpecKey] = useState('');
  const [newSpecValue, setNewSpecValue] = useState('');

  // Show success toast helper
  const triggerNotice = (msg) => {
    setSaveSuccessNotice(msg);
    setTimeout(() => setSaveSuccessNotice(''), 3000);
  };

  // KPI Calculations
  const stats = useMemo(() => {
    const totalCount = inventory.length;
    const carsCount = inventory.filter(i => i.category === 'cars').length;
    const techCount = inventory.filter(i => i.category !== 'cars').length;
    const totalNairaValue = inventory.reduce((acc, it) => acc + (it.priceNaira || 0), 0);
    const inStockCount = inventory.filter(i => i.inStock).length;
    return { totalCount, carsCount, techCount, totalNairaValue, inStockCount };
  }, [inventory]);

  // Filtered inventory list
  const filteredList = useMemo(() => {
    return inventory.filter(item => {
      const matchCat = categoryFilter === 'all' || item.category === categoryFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = !q || (
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.condition.toLowerCase().includes(q)
      );
      return matchCat && matchSearch;
    });
  }, [inventory, categoryFilter, searchQuery]);

  // Toggle inStock status
  const handleToggleStock = (id) => {
    setInventory(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, inStock: !item.inStock };
      }
      return item;
    }));
    triggerNotice('Stock status updated.');
  };

  // Toggle featured status
  const handleToggleFeatured = (id) => {
    setInventory(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, isFeatured: !item.isFeatured };
      }
      return item;
    }));
    triggerNotice('Featured status updated.');
  };

  // Delete product
  const handleDeleteItem = (id) => {
    setInventory(prev => prev.filter(i => i.id !== id));
    setDeleteConfirmId(null);
    triggerNotice('Item removed from inventory.');
  };

  // Add Product Handler
  const handleCreateProduct = (e) => {
    e.preventDefault();
    if (!newItem.name.trim()) return;

    const gallery = Array.isArray(newItem.gallery) && newItem.gallery.length > 0
      ? newItem.gallery
      : (newItem.image ? [newItem.image] : []);

    const id = `${newItem.category}-${Date.now()}`;
    const productToAdd = {
      ...newItem,
      id,
      gallery,
      image: gallery[0] || newItem.image || '',
      priceNaira: Number(newItem.priceNaira) || 0,
      priceDollar: Number(newItem.priceDollar) || 0,
    };

    setInventory(prev => [productToAdd, ...prev]);
    setIsAddModalOpen(false);
    setNewItem(initialNewItem);
    triggerNotice(`"${productToAdd.name}" added to inventory.`);
  };

  // Edit Product Handler
  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingItem) return;

    const gallery = Array.isArray(editingItem.gallery) && editingItem.gallery.length > 0
      ? editingItem.gallery
      : (editingItem.image ? [editingItem.image] : []);

    setInventory(prev => prev.map(item => {
      if (item.id === editingItem.id) {
        return {
          ...editingItem,
          gallery,
          image: gallery[0] || editingItem.image || '',
          priceNaira: Number(editingItem.priceNaira) || 0,
          priceDollar: Number(editingItem.priceDollar) || 0,
        };
      }
      return item;
    }));

    setEditingItem(null);
    triggerNotice(`Changes saved to "${editingItem.name}".`);
  };

  // Save Store Settings Handler
  const handleSaveStoreSettings = (e) => {
    e.preventDefault();
    const updated = {
      ...storeForm,
      rawPhone: storeForm.phone.replace(/[^0-9]/g, '')
    };
    setStoreInfo(updated);
    setIsEditingStore(false);
    triggerNotice('Store details and showroom address updated.');
  };

  // WhatsApp Broadcast generator text
  const broadcastText = useMemo(() => {
    const cars = inventory.filter(i => i.category === 'cars' && i.inStock);
    const phones = inventory.filter(i => i.category === 'phones' && i.inStock);
    const laptops = inventory.filter(i => i.category === 'laptops' && i.inStock);

    let text = `🔥 *MKJ ENTERPRISES — FRESH INVENTORY DROP* 🔥\n`;
    text += `📍 *Showroom:* ${storeInfo.shortAddress}\n`;
    text += `📞 *Direct WhatsApp:* ${storeInfo.phone}\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━\n\n`;

    if (cars.length > 0) {
      text += `🚗 *DIRECT TOKUNBO VEHICLES:*\n`;
      cars.forEach((c, idx) => {
        text += `${idx + 1}. *${c.name}*\n   Price: ${formatNaira(c.priceNaira)} (${c.badge})\n`;
      });
      text += `\n`;
    }

    if (phones.length > 0) {
      text += `📱 *SMARTPHONES & APPLE HARDWARE:*\n`;
      phones.forEach((p, idx) => {
        text += `• *${p.name}* — ${formatNaira(p.priceNaira)} (${p.condition})\n`;
      });
      text += `\n`;
    }

    if (laptops.length > 0) {
      text += `💻 *LAPTOPS & MACBOOKS:*\n`;
      laptops.forEach((l, idx) => {
        text += `• *${l.name}* — ${formatNaira(l.priceNaira)}\n`;
      });
      text += `\n`;
    }

    text += `━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `✅ Walk in for inspection or order for secured doorstep delivery!\n`;
    text += `Ask of *MKJ* at Divine Grace Plaza, Under G!`;

    return text;
  }, [inventory, storeInfo]);

  const copyBroadcast = () => {
    navigator.clipboard.writeText(broadcastText);
    setBroadcastCopied(true);
    setTimeout(() => setBroadcastCopied(false), 2500);
  };

  const openWhatsAppBroadcast = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(broadcastText)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      
      {/* Admin Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          
          {/* Main Top Row: h-14 on mobile, h-16 on md+ */}
          <div className="flex items-center justify-between h-14 md:h-16 gap-2">
            
            {/* Left: Brand & Admin Badge */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <button 
                onClick={onClose}
                className="flex items-center gap-1.5 p-2 sm:px-3 sm:py-1.5 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 text-xs font-semibold transition-colors shrink-0"
                title="Return to customer-facing storefront"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Storefront</span>
              </button>

              <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>

              <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
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
                
                {/* Desktop Brand Title (hidden on small mobile to prevent squishing) */}
                <div className="hidden sm:flex flex-col min-w-0">
                  <h1 className="text-sm font-bold text-slate-900 leading-tight truncate">
                    MKJ Enterprises <span className="text-blue-600 font-semibold">Backoffice</span>
                  </h1>
                  <span className="text-[10px] text-slate-500 font-medium truncate">
                    Catalog &amp; Operations Management
                  </span>
                </div>

                {/* Mobile Brand Pill (Single clean non-wrapping line) */}
                <div className="flex sm:hidden items-center gap-1.5 min-w-0">
                  <span className="text-sm font-bold text-slate-900 truncate">
                    MKJ
                  </span>
                  <span className="px-1.5 py-0.5 rounded-md bg-blue-50 text-blue-700 font-bold text-[9px] tracking-wide border border-blue-200/60 shrink-0">
                    BACKOFFICE
                  </span>
                </div>
              </div>
            </div>

            {/* Center: Navigation Tabs (Desktop only: md+) */}
            <nav className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
              <button
                onClick={() => setActiveTab('inventory')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all ${
                  activeTab === 'inventory' 
                    ? 'bg-white text-slate-900 shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Boxes className="w-3.5 h-3.5 text-blue-600" />
                <span>Inventory ({inventory.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('store')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all ${
                  activeTab === 'store' 
                    ? 'bg-white text-slate-900 shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Store className="w-3.5 h-3.5 text-orange-600" />
                <span>Store Profile</span>
              </button>

              <button
                onClick={() => setActiveTab('broadcast')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all ${
                  activeTab === 'broadcast' 
                    ? 'bg-white text-slate-900 shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp Broadcast</span>
              </button>
            </nav>

            {/* Right: Quick Action & Live Store Link */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add Product</span>
                <span className="sm:hidden">Add</span>
              </button>

              <button
                onClick={onClose}
                className="inline-flex items-center gap-1.5 p-1.5 sm:px-3 sm:py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold shadow-sm transition-colors"
                title="View customer storefront"
              >
                <Eye className="w-3.5 h-3.5 text-slate-500" />
                <span className="hidden md:inline">View Site</span>
                <ExternalLink className="w-3 h-3 text-slate-400 hidden md:inline" />
              </button>
            </div>

          </div>

          {/* Mobile Secondary Row: Dedicated Navigation Segmented Bar (md:hidden) */}
          <div className="md:hidden pb-2.5 pt-1">
            <nav className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
              <button
                onClick={() => setActiveTab('inventory')}
                className={`flex items-center justify-center gap-1 py-1.5 px-1.5 rounded-lg transition-all text-[11px] ${
                  activeTab === 'inventory' 
                    ? 'bg-white text-slate-900 shadow-sm font-bold' 
                    : 'text-slate-600 hover:text-slate-900 font-medium'
                }`}
              >
                <Boxes className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span className="truncate">Inventory ({inventory.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('store')}
                className={`flex items-center justify-center gap-1 py-1.5 px-1.5 rounded-lg transition-all text-[11px] ${
                  activeTab === 'store' 
                    ? 'bg-white text-slate-900 shadow-sm font-bold' 
                    : 'text-slate-600 hover:text-slate-900 font-medium'
                }`}
              >
                <Store className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                <span className="truncate">Store Profile</span>
              </button>

              <button
                onClick={() => setActiveTab('broadcast')}
                className={`flex items-center justify-center gap-1 py-1.5 px-1.5 rounded-lg transition-all text-[11px] ${
                  activeTab === 'broadcast' 
                    ? 'bg-white text-slate-900 shadow-sm font-bold' 
                    : 'text-slate-600 hover:text-slate-900 font-medium'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="truncate">Broadcast</span>
              </button>
            </nav>
          </div>

        </div>
      </header>

      {/* Global Success Notification Toast */}
      {saveSuccessNotice && (
        <div className="bg-emerald-600 text-white text-xs font-semibold py-2 px-4 text-center shadow-md animate-fadeIn flex items-center justify-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{saveSuccessNotice}</span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        
        {/* TAB 1: INVENTORY MANAGEMENT */}
        {activeTab === 'inventory' && (
          <div className="space-y-6">
            
            {/* KPI Summary Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                  Total Active Stock
                </span>
                <div className="text-2xl font-bold text-slate-900 mt-1">
                  {stats.totalCount} <span className="text-xs font-normal text-slate-500">units</span>
                </div>
                <div className="mt-2 text-xs text-emerald-600 font-medium">
                  {stats.inStockCount} ready in showroom
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                  Total Fleet Valuation
                </span>
                <div className="text-2xl font-bold text-slate-900 mt-1 truncate">
                  {formatNaira(stats.totalNairaValue)}
                </div>
                <div className="mt-2 text-xs text-slate-500 font-medium">
                  Across tech &amp; vehicle inventory
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                  Foreign-Used Fleet
                </span>
                <div className="text-2xl font-bold text-orange-600 mt-1">
                  {stats.carsCount} <span className="text-xs font-normal text-slate-500">vehicles</span>
                </div>
                <div className="mt-2 text-xs text-slate-500 font-medium">
                  Tin Can Lagos Cleared
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                  Tech Hardware Vault
                </span>
                <div className="text-2xl font-bold text-blue-600 mt-1">
                  {stats.techCount} <span className="text-xs font-normal text-slate-500">gadgets</span>
                </div>
                <div className="mt-2 text-xs text-slate-500 font-medium">
                  Phones, MacBooks, Audio
                </div>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
              
              {/* Search */}
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by title, category, spec..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:bg-white focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 no-scrollbar">
                {[
                  { id: 'all', label: 'All Catalog' },
                  { id: 'phones', label: 'Smartphones' },
                  { id: 'laptops', label: 'Laptops' },
                  { id: 'cars', label: 'Tokunbo Cars' },
                  { id: 'accessories', label: 'Accessories' }
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setCategoryFilter(cat.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                      categoryFilter === cat.id
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Reset to Factory Defaults button */}
              <button
                onClick={() => {
                  if (window.confirm('Reset catalog back to the official default MKJ catalog items?')) {
                    onResetDefaults();
                    triggerNotice('Catalog reset to official defaults.');
                  }
                }}
                className="text-xs text-slate-500 hover:text-blue-600 flex items-center gap-1 shrink-0 font-medium"
                title="Restore original 20 catalog products"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Defaults</span>
              </button>

            </div>

            {/* Product Table List */}
            <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="py-3.5 px-4">Item &amp; Visual</th>
                      <th className="py-3.5 px-4">Category</th>
                      <th className="py-3.5 px-4">Condition</th>
                      <th className="py-3.5 px-4">Store Price</th>
                      <th className="py-3.5 px-4">Availability</th>
                      <th className="py-3.5 px-4">Featured</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {filteredList.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="py-12 text-center text-slate-400">
                          No matching items found in inventory.
                        </td>
                      </tr>
                    ) : (
                      filteredList.map(item => (
                        <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                          
                          {/* Item & Image */}
                          <td className="py-3 px-4 flex items-center gap-3">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-12 h-12 rounded-xl object-cover border border-slate-200 bg-slate-100 shrink-0" 
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/mkj_logo_clean.png';
                              }}
                            />
                            <div className="min-w-0 max-w-xs">
                              <span className="font-bold text-slate-900 block truncate">
                                {item.name}
                              </span>
                              <span className="text-[10px] text-slate-400 block truncate">
                                ID: {item.id}
                              </span>
                            </div>
                          </td>

                          {/* Category */}
                          <td className="py-3 px-4">
                            <span className="capitalize px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-700">
                              {item.category}
                            </span>
                          </td>

                          {/* Condition */}
                          <td className="py-3 px-4 text-slate-600">
                            {item.condition}
                          </td>

                          {/* Price */}
                          <td className="py-3 px-4">
                            <div className="font-bold text-slate-900">
                              {formatNaira(item.priceNaira)}
                            </div>
                            <div className="text-[10px] text-slate-400">
                              ≈ {formatDollar(item.priceDollar)}
                            </div>
                          </td>

                          {/* Availability Toggle */}
                          <td className="py-3 px-4">
                            <button
                              onClick={() => handleToggleStock(item.id)}
                              className={`px-2.5 py-1 rounded-full text-[10px] font-semibold transition-colors ${
                                item.inStock 
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100' 
                                  : 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
                              }`}
                            >
                              {item.inStock ? 'In Stock' : 'Sold Out'}
                            </button>
                          </td>

                          {/* Featured Star Toggle */}
                          <td className="py-3 px-4">
                            <button
                              onClick={() => handleToggleFeatured(item.id)}
                              className={`px-2 py-1 rounded-md text-[10px] font-semibold transition-colors ${
                                item.isFeatured
                                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                  : 'text-slate-400 hover:text-slate-700'
                              }`}
                            >
                              {item.isFeatured ? '★ Featured' : 'Normal'}
                            </button>
                          </td>

                          {/* Actions */}
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => {
                                  const itemGallery = Array.isArray(item.gallery) && item.gallery.length > 0
                                    ? item.gallery
                                    : (item.image ? [item.image] : []);
                                  setEditingItem({
                                    ...item,
                                    gallery: itemGallery,
                                    image: itemGallery[0] || item.image || ''
                                  });
                                }}
                                className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                title="Edit Item Details"
                              >
                                <Pencil className="w-3.5 h-3.5" />
                              </button>

                              {deleteConfirmId === item.id ? (
                                <div className="flex items-center gap-1">
                                  <button
                                    onClick={() => handleDeleteItem(item.id)}
                                    className="px-2 py-1 rounded-lg bg-rose-600 text-white text-[10px] font-bold"
                                  >
                                    Confirm
                                  </button>
                                  <button
                                    onClick={() => setDeleteConfirmId(null)}
                                    className="p-1 rounded-lg text-slate-400 hover:text-slate-700 text-xs"
                                  >
                                    ✕
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => setDeleteConfirmId(item.id)}
                                  className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                                  title="Delete Item"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </td>

                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: STORE PROFILE & SHOWROOM DETAILS */}
        {activeTab === 'store' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
              
              {/* Header with Lock / Status Badge */}
              <div className="pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h2 className="text-xl font-bold text-slate-900">
                    Store Profile &amp; Showroom Settings
                  </h2>
                  {!isEditingStore ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-600 text-[11px] font-semibold">
                      <Lock className="w-3 h-3 text-slate-500" />
                      Locked (Read-Only)
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 text-[11px] font-semibold">
                      <Unlock className="w-3 h-3 text-blue-600" />
                      Editing Active
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  These details populate the hero, store locator, showroom banner, and WhatsApp buttons on the live site.
                </p>
              </div>

              <form onSubmit={handleSaveStoreSettings} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Business Display Name
                    </label>
                    <input 
                      type="text"
                      disabled={!isEditingStore}
                      value={storeForm.name}
                      onChange={(e) => setStoreForm({ ...storeForm, name: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                        !isEditingStore
                          ? 'bg-slate-100 text-slate-500 border border-slate-200 cursor-not-allowed select-none'
                          : 'bg-white text-slate-900 border border-slate-300 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-sm'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Proprietor / Owner Name
                    </label>
                    <input 
                      type="text"
                      disabled={!isEditingStore}
                      value={storeForm.owner}
                      onChange={(e) => setStoreForm({ ...storeForm, owner: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                        !isEditingStore
                          ? 'bg-slate-100 text-slate-500 border border-slate-200 cursor-not-allowed select-none'
                          : 'bg-white text-slate-900 border border-slate-300 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-sm'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Official Phone / WhatsApp Hotline
                    </label>
                    <input 
                      type="text"
                      disabled={!isEditingStore}
                      value={storeForm.phone}
                      onChange={(e) => setStoreForm({ ...storeForm, phone: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                        !isEditingStore
                          ? 'bg-slate-100 text-slate-500 border border-slate-200 cursor-not-allowed select-none'
                          : 'bg-white text-slate-900 border border-slate-300 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-sm'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Official Email Address
                    </label>
                    <input 
                      type="email"
                      disabled={!isEditingStore}
                      value={storeForm.email}
                      onChange={(e) => setStoreForm({ ...storeForm, email: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                        !isEditingStore
                          ? 'bg-slate-100 text-slate-500 border border-slate-200 cursor-not-allowed select-none'
                          : 'bg-white text-slate-900 border border-slate-300 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-sm'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Full Physical Showroom Address
                  </label>
                  <textarea 
                    rows="2"
                    disabled={!isEditingStore}
                    value={storeForm.address}
                    onChange={(e) => setStoreForm({ ...storeForm, address: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                      !isEditingStore
                        ? 'bg-slate-100 text-slate-500 border border-slate-200 cursor-not-allowed select-none'
                        : 'bg-white text-slate-900 border border-slate-300 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-sm'
                    }`}
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Landmark Navigation Directions (Under G Tip)
                  </label>
                  <textarea 
                    rows="2"
                    disabled={!isEditingStore}
                    value={storeForm.directionTip}
                    onChange={(e) => setStoreForm({ ...storeForm, directionTip: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                      !isEditingStore
                        ? 'bg-slate-100 text-slate-500 border border-slate-200 cursor-not-allowed select-none'
                        : 'bg-white text-slate-900 border border-slate-300 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-sm'
                    }`}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Instagram Handle
                    </label>
                    <input 
                      type="text"
                      disabled={!isEditingStore}
                      value={storeForm.instagram}
                      onChange={(e) => setStoreForm({ ...storeForm, instagram: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                        !isEditingStore
                          ? 'bg-slate-100 text-slate-500 border border-slate-200 cursor-not-allowed select-none'
                          : 'bg-white text-slate-900 border border-slate-300 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-sm'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Operating Hours Label
                    </label>
                    <input 
                      type="text"
                      disabled={!isEditingStore}
                      value={storeForm.hours}
                      onChange={(e) => setStoreForm({ ...storeForm, hours: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                        !isEditingStore
                          ? 'bg-slate-100 text-slate-500 border border-slate-200 cursor-not-allowed select-none'
                          : 'bg-white text-slate-900 border border-slate-300 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-sm'
                      }`}
                    />
                  </div>
                </div>

                {/* Bottom Action Bar */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    {!isEditingStore ? (
                      <p className="text-xs text-slate-400">
                        Boxes are locked in read-only mode to prevent accidental edits. Click <strong className="text-slate-600 font-semibold">Edit Settings</strong> to make updates.
                      </p>
                    ) : (
                      <p className="text-xs text-blue-600 font-medium flex items-center gap-1.5">
                        <Unlock className="w-3.5 h-3.5 text-blue-600" />
                        <span>Editing enabled. Click <strong>Save Store Settings</strong> when finished.</span>
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
                    {!isEditingStore ? (
                      <button
                        type="button"
                        onClick={() => setIsEditingStore(true)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                        <span>Edit Settings</span>
                      </button>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            setStoreForm({ ...storeInfo });
                            setIsEditingStore(false);
                          }}
                          className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-colors"
                        >
                          <Save className="w-4 h-4" />
                          <span>Save Store Settings</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* TAB 3: WHATSAPP STOCK BROADCAST GENERATOR */}
        {activeTab === 'broadcast' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  WhatsApp Status &amp; Broadcast Generator
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Instantly format all available in-stock devices and Tokunbo vehicles into a ready-to-share message for your WhatsApp status or broadcast list.
                </p>
              </div>

              <div className="relative">
                <textarea 
                  rows="14"
                  readOnly
                  value={broadcastText}
                  className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono leading-relaxed text-slate-800 focus:outline-none select-all"
                />
              </div>

              <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
                <button
                  onClick={copyBroadcast}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold shadow-sm transition-colors"
                >
                  {broadcastCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-blue-600" />}
                  <span>{broadcastCopied ? 'Copied to Clipboard!' : 'Copy Broadcast Text'}</span>
                </button>

                <button
                  onClick={openWhatsAppBroadcast}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Open &amp; Send in WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* MODAL: ADD PRODUCT */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <h3 className="text-base font-bold text-slate-900">
                Add New Inventory Item
              </h3>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="p-6 overflow-y-auto space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Product Title</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. 2019 Toyota Camry XSE or iPhone 16 Pro Max 256GB"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Category</label>
                  <select
                    value={newItem.category}
                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="phones">Smartphones</option>
                    <option value="laptops">Laptops &amp; MacBooks</option>
                    <option value="cars">Cars &amp; Motors</option>
                    <option value="accessories">Audio &amp; Accessories</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Condition Label</label>
                  <input 
                    type="text"
                    value={newItem.condition}
                    onChange={(e) => setNewItem({ ...newItem, condition: e.target.value })}
                    placeholder="e.g. Tokunbo / Foreign Used, Brand New Sealed"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Price in Naira (₦)</label>
                  <input 
                    type="number"
                    required
                    value={newItem.priceNaira}
                    onChange={(e) => setNewItem({ ...newItem, priceNaira: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Price in USD ($)</label>
                  <input 
                    type="number"
                    value={newItem.priceDollar}
                    onChange={(e) => setNewItem({ ...newItem, priceDollar: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Multi-Image Uploader (Up to 10 pictures, drag & drop, first picture as cover) */}
              <ProductImageUploader
                gallery={newItem.gallery || (newItem.image ? [newItem.image] : [])}
                onChange={(newGallery) => {
                  setNewItem({
                    ...newItem,
                    gallery: newGallery,
                    image: newGallery[0] || ''
                  });
                }}
              />

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Short Description</label>
                <textarea 
                  rows="2"
                  value={newItem.shortDesc}
                  onChange={(e) => setNewItem({ ...newItem, shortDesc: e.target.value })}
                  placeholder="Key selling points, customs clearance status, or included warranty..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={newItem.inStock}
                    onChange={(e) => setNewItem({ ...newItem, inStock: e.target.checked })}
                    className="rounded text-blue-600 focus:ring-0"
                  />
                  <span className="font-semibold text-slate-700">Available In Stock</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={newItem.isFeatured}
                    onChange={(e) => setNewItem({ ...newItem, isFeatured: e.target.checked })}
                    className="rounded text-blue-600 focus:ring-0"
                  />
                  <span className="font-semibold text-slate-700">Spotlight / Featured</span>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-sm"
                >
                  Create Product
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* MODAL: EDIT PRODUCT */}
      {editingItem && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <h3 className="text-base font-bold text-slate-900">
                Edit Item: {editingItem.name}
              </h3>
              <button 
                onClick={() => setEditingItem(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="p-6 overflow-y-auto space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Product Title</label>
                <input 
                  type="text"
                  required
                  value={editingItem.name}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Category</label>
                  <select
                    value={editingItem.category}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="phones">Smartphones</option>
                    <option value="laptops">Laptops &amp; MacBooks</option>
                    <option value="cars">Cars &amp; Motors</option>
                    <option value="accessories">Audio &amp; Accessories</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Condition Label</label>
                  <input 
                    type="text"
                    value={editingItem.condition}
                    onChange={(e) => setEditingItem({ ...editingItem, condition: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Price in Naira (₦)</label>
                  <input 
                    type="number"
                    required
                    value={editingItem.priceNaira}
                    onChange={(e) => setEditingItem({ ...editingItem, priceNaira: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Price in USD ($)</label>
                  <input 
                    type="number"
                    value={editingItem.priceDollar}
                    onChange={(e) => setEditingItem({ ...editingItem, priceDollar: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Multi-Image Uploader (Up to 10 pictures, drag & drop, first picture as cover) */}
              <ProductImageUploader
                gallery={editingItem.gallery || (editingItem.image ? [editingItem.image] : [])}
                onChange={(newGallery) => {
                  setEditingItem({
                    ...editingItem,
                    gallery: newGallery,
                    image: newGallery[0] || ''
                  });
                }}
              />

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Short Description</label>
                <textarea 
                  rows="2"
                  value={editingItem.shortDesc}
                  onChange={(e) => setEditingItem({ ...editingItem, shortDesc: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={editingItem.inStock}
                    onChange={(e) => setEditingItem({ ...editingItem, inStock: e.target.checked })}
                    className="rounded text-blue-600 focus:ring-0"
                  />
                  <span className="font-semibold text-slate-700">Available In Stock</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={editingItem.isFeatured}
                    onChange={(e) => setEditingItem({ ...editingItem, isFeatured: e.target.checked })}
                    className="rounded text-blue-600 focus:ring-0"
                  />
                  <span className="font-semibold text-slate-700">Spotlight / Featured</span>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
