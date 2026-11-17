import React from 'react';
import { Sparkles, Flame, CheckCircle, ShieldAlert, PhoneCall } from 'lucide-react';

export default function QuickTicker() {
  const announcements = [
    "🔥 NEW DROP: iPhone 15 Pro Max 256GB Natural Titanium In Stock",
    "🚗 FRESH ARRIVAL: 2018 Lexus RX 350 AWD (Tin Can Cleared, Full Panoramic)",
    "🔄 SWAP DEALS: Upgrade your iPhone 11/12/13 to iPhone 14/15 Pro today with cash balance!",
    "💻 DEV EDITIONS: M1 16GB RAM & M3 Pro MacBooks available at Shop B7 Divine Grace Plaza",
    "📍 PHYSICAL STORE: Divine Grace Plaza, Adjacent Alice Restaurant, Under G, Ogbomoso - Ask of MKJ!",
    "🚚 NATIONWIDE: Secured doorstep delivery to Lagos, Ibadan, Abuja, Ilorin, and nationwide."
  ];

  return (
    <div className="bg-gradient-to-r from-blue-50 via-white to-orange-50 border-y border-slate-200 py-2.5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-3">
        <span className="shrink-0 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase bg-[#FF5500] text-white shadow-sm">
          <Flame className="w-3.5 h-3.5 text-white" />
          Live Stock
        </span>
        
        <div className="flex-1 overflow-x-auto no-scrollbar whitespace-nowrap text-xs text-slate-700 font-medium">
          <div className="inline-flex gap-8 items-center">
            {announcements.map((item, index) => (
              <span key={index} className="inline-flex items-center gap-2">
                <span>{item}</span>
                <span className="text-orange-500 font-black">•</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}