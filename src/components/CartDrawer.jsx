import React from 'react';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  MessageSquare, 
  ArrowRight, 
  Plus, 
  Minus 
} from 'lucide-react';
import { STORE_INFO } from '../data/inventory';
import { formatNaira, formatDollar } from '../utils/formatters';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQty, 
  onRemoveItem, 
  onClearCart,
  currency 
}) {
  if (!isOpen) return null;

  const totalNaira = cartItems.reduce((acc, item) => acc + (item.priceNaira * item.quantity), 0);
  const totalDollar = cartItems.reduce((acc, item) => acc + (item.priceDollar * item.quantity), 0);

  const displayTotal = currency === 'NGN' ? formatNaira(totalNaira) : formatDollar(totalDollar);

  // Generate WhatsApp order message
  const handleWhatsAppCheckout = () => {
    let orderList = cartItems.map((item, idx) => 
      `${idx + 1}. *${item.name}*\n   Condition: ${item.condition}\n   Qty: ${item.quantity} × ${formatNaira(item.priceNaira)} = ${formatNaira(item.priceNaira * item.quantity)}`
    ).join('\n\n');

    const message = encodeURIComponent(
      `Hello MKJ Enterprises! I want to order the following items from your website:\n\n` +
      `${orderList}\n\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `*ORDER TOTAL:* ${formatNaira(totalNaira)}\n` +
      `━━━━━━━━━━━━━━━━━━━━\n\n` +
      `Please confirm stock availability and send payment / delivery instructions.\n` +
      `My Delivery Location: `
    );

    window.open(`https://wa.me/${STORE_INFO.rawPhone}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-slate-200 flex flex-col shadow-2xl">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-blue-600" />
              <h3 className="text-base font-black text-slate-900">Your Selection</h3>
              <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 border border-blue-200 font-bold">
                {cartItems.reduce((a, b) => a + b.quantity, 0)} items
              </span>
            </div>

            <button 
              onClick={onClose}
              className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors shadow-sm border border-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto text-slate-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">Your cart is empty</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Browse our inventory of iPhones, MacBooks, Tokunbo cars, and accessories.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-colors"
                >
                  Explore Inventory
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div 
                  key={item.id}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex gap-3 items-center"
                >
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-16 h-16 rounded-xl object-cover border border-slate-200 bg-white shrink-0" 
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/mkj_logo_clean.png';
                    }}
                  />

                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-bold text-slate-900 truncate">{item.name}</h5>
                    <span className="text-[10px] text-slate-500 font-mono block">{item.condition}</span>
                    <span className="text-xs font-bold text-blue-700 font-mono mt-0.5 block">
                      {formatNaira(item.priceNaira)}
                    </span>
                  </div>

                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-slate-400 hover:text-red-500 transition-colors p-1"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg p-0.5 shadow-sm">
                      <button
                        onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-slate-100 rounded text-slate-600"
                      >
                        <Minus className="w-2.5 h-2.5" />
                      </button>
                      <span className="text-xs font-mono font-bold px-1 text-slate-900">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-slate-100 rounded text-slate-600"
                      >
                        <Plus className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-3">
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-mono text-slate-600 uppercase font-medium">Estimated Subtotal:</span>
                <span className="text-xl font-extrabold text-slate-900 tracking-tight">
                  {displayTotal}
                </span>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Order to MKJ on WhatsApp</span>
                </button>

                <div className="flex justify-between items-center pt-1 text-[11px] text-slate-500 font-mono">
                  <span>Showroom pickup at Under G available</span>
                  <button 
                    onClick={onClearCart}
                    className="text-red-600 hover:underline"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}