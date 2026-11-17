import React, { useState } from 'react';
import { 
  X, 
  ArrowRightLeft, 
  Sparkles, 
  MessageSquare, 
  Smartphone, 
  Laptop, 
  Car, 
  CheckCircle2,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { STORE_INFO, INVENTORY_ITEMS } from '../data/inventory';
import { formatNaira } from '../utils/formatters';

export default function SwapCalculatorModal({ isOpen, onClose, targetItem = null }) {
  if (!isOpen) return null;

  const [category, setCategory] = useState(targetItem ? targetItem.category : 'phones');
  const [currentBrand, setCurrentBrand] = useState('');
  const [currentModel, setCurrentModel] = useState('');
  const [currentCondition, setCurrentCondition] = useState('Flawless (Grade A+ / Mint)');
  const [batteryOrMileage, setBatteryOrMileage] = useState('');
  const [selectedTargetId, setSelectedTargetId] = useState(targetItem ? targetItem.id : '');

  const targetOptions = INVENTORY_ITEMS.filter(it => it.category === category);
  const selectedTarget = INVENTORY_ITEMS.find(it => it.id === selectedTargetId) || targetOptions[0] || null;

  // Valuation algorithm
  const getEstimatedTradeValue = () => {
    if (!currentModel) return 0;
    
    let base = 220000;
    if (category === 'cars') base = 6000000;
    else if (category === 'laptops') base = 400000;
    
    let multiplier = 1.0;
    if (currentCondition.includes('Flawless')) multiplier = 1.3;
    else if (currentCondition.includes('Normal')) multiplier = 1.0;
    else if (currentCondition.includes('Noticeable')) multiplier = 0.75;
    else if (currentCondition.includes('Defect')) multiplier = 0.5;

    return Math.round(base * multiplier);
  };

  const estimatedValue = getEstimatedTradeValue();
  const targetPrice = selectedTarget ? selectedTarget.priceNaira : 0;
  const estimatedBalance = Math.max(0, targetPrice - estimatedValue);

  const handleSendSwapDeal = () => {
    const message = encodeURIComponent(
      `Hello MKJ Enterprises!\nI want to do a SWAP / TRADE-IN DEAL.\n\n` +
      `🔄 *WHAT I HAVE TO TRADE:*\n` +
      `- Category: ${category.toUpperCase()}\n` +
      `- Item: ${currentBrand} ${currentModel}\n` +
      `- Condition: ${currentCondition}\n` +
      `- Battery Health / Mileage: ${batteryOrMileage || 'Clean condition'}\n\n` +
      `🎯 *UPGRADE TARGET:*\n` +
      `- Target Item: ${selectedTarget ? selectedTarget.name : 'Not yet selected'}\n` +
      `- Target Price: ${selectedTarget ? formatNaira(selectedTarget.priceNaira) : 'N/A'}\n\n` +
      `Please let me know how much cash top-up balance is required so I can come to Shop B7 Divine Grace Plaza, Under G for testing and exchange!`
    );

    window.open(`https://wa.me/${STORE_INFO.rawPhone}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl rounded-3xl bg-white border border-slate-200 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-blue-50 via-white to-orange-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-orange-100 text-orange-700 border border-orange-200">
              <ArrowRightLeft className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h3 className="text-lg font-display font-black text-slate-900">
                MKJ Swap &amp; Trade-In Estimator
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                Instant valuation for phones, laptops &amp; Tokunbo vehicles
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Step 1: Category Picker */}
          <div>
            <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider mb-2">
              1. What asset are you trading in?
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { id: 'phones', label: 'Smartphone', icon: Smartphone },
                { id: 'laptops', label: 'Laptop / Mac', icon: Laptop },
                { id: 'cars', label: 'Automobile', icon: Car },
              ].map(cat => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setCategory(cat.id);
                      setSelectedTargetId('');
                    }}
                    className={`flex items-center justify-center gap-2 py-3 px-3 rounded-2xl text-xs font-bold transition-all border ${
                      category === cat.id
                        ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20'
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Current Item Details */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-600 block">
              2. Your Device / Vehicle Specs
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-slate-600 font-medium mb-1">Make / Brand</label>
                <input
                  type="text"
                  placeholder={category === 'cars' ? 'e.g. Toyota, Lexus' : 'e.g. Apple, Samsung'}
                  value={currentBrand}
                  onChange={(e) => setCurrentBrand(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-600 font-medium mb-1">Exact Model &amp; Storage / Year</label>
                <input
                  type="text"
                  placeholder={category === 'cars' ? 'e.g. 2012 Camry XLE' : 'e.g. iPhone 12 Pro 128GB'}
                  value={currentModel}
                  onChange={(e) => setCurrentModel(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-[11px] text-slate-600 font-medium mb-1">Physical Condition</label>
                <select
                  value={currentCondition}
                  onChange={(e) => setCurrentCondition(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-blue-500 font-mono"
                >
                  <option value="Flawless (Grade A+ / Mint)">Flawless (Grade A+ / Mint)</option>
                  <option value="Normal Wear (Clean Grade A)">Normal Wear (Clean Grade A)</option>
                  <option value="Noticeable Scratches (Grade B)">Noticeable Scratches (Grade B)</option>
                  <option value="Minor Defect / Low Battery">Minor Defect / Low Battery</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] text-slate-600 font-medium mb-1">
                  {category === 'cars' ? 'Mileage (Miles / Km)' : 'Battery Health % / Cycle Count'}
                </label>
                <input
                  type="text"
                  placeholder={category === 'cars' ? 'e.g. 95,000 miles' : 'e.g. 87% battery health'}
                  value={batteryOrMileage}
                  onChange={(e) => setBatteryOrMileage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Step 3: Target Upgrade */}
          <div>
            <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider mb-2">
              3. Select your upgrade target from MKJ inventory:
            </label>
            <select
              value={selectedTarget ? selectedTarget.id : ''}
              onChange={(e) => setSelectedTargetId(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-white border border-slate-300 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-blue-500"
            >
              {targetOptions.map(t => (
                <option key={t.id} value={t.id}>
                  {t.name} — {formatNaira(t.priceNaira)}
                </option>
              ))}
            </select>
          </div>

          {/* Valuation Differential Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-orange-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-600">Estimated Trade-In Credit:</span>
              <span className="font-bold text-emerald-700">
                {currentModel ? `+ ${formatNaira(estimatedValue)}` : 'Enter model above'}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-600">Target Upgrade Price:</span>
              <span className="font-bold text-slate-900">
                {selectedTarget ? formatNaira(selectedTarget.priceNaira) : '₦0'}
              </span>
            </div>

            <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-slate-500 uppercase block font-medium">Estimated Cash Balance:</span>
                <span className="text-2xl font-display font-black text-orange-600">
                  {currentModel ? formatNaira(estimatedBalance) : formatNaira(targetPrice)}
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-500 text-right max-w-[170px] leading-tight">
                *Subject to physical inspection at Shop B7 Divine Grace Plaza
              </span>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Instant device testing at Under G showroom</span>
          </div>

          <button
            onClick={handleSendSwapDeal}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#FF5500] hover:bg-[#e04a00] text-white text-xs font-semibold transition-colors shadow-sm"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Lock-in Swap on WhatsApp</span>
          </button>
        </div>

      </div>
    </div>
  );
}