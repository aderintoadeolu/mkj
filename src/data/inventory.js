// MKJ Enterprises - Catalog Data
// Store Contact Information
export const STORE_INFO = {
  name: "MKJ Enterprises",
  legalName: "MKJ Ola Enterprises",
  owner: "Luqman Makanjuola (MKJ)",
  tagline: "Phones • Laptops • Cars • Accessories",
  phone: "+234 816 931 5126",
  rawPhone: "2348169315126",
  email: "luqmanmakanjuola@gmail.com",
  instagram: "@mkjenterprises",
  instagramUrl: "https://instagram.com/mkjenterprises",
  hours: "Open 24/7 (Instant WhatsApp & Calls)",
  address: "Shop B7, Divine Grace Plaza, Adjacent Alice Restaurant, From Nurudeen Secondary School Under G, Ogbomoso, Oyo State, Nigeria",
  shortAddress: "Shop B7 Divine Grace Plaza, Under G, Ogbomoso",
  directionTip: "When you reach Under G, walk or drive past Nurudeen Secondary School toward Alice Restaurant. Ask of MKJ at Shop B7 Divine Grace Plaza!",
};

export const CATEGORIES = [
  { id: "all", name: "All Inventory", icon: "LayoutGrid" },
  { id: "phones", name: "Smartphones", icon: "Smartphone" },
  { id: "laptops", name: "Laptops & MacBooks", icon: "Laptop" },
  { id: "cars", name: "Cars & Motors", icon: "Car" },
  { id: "accessories", name: "Audio & Accessories", icon: "Headphones" },
];

export const INVENTORY_ITEMS = [
  // --- CARS & MOTORS ---
  {
    id: "car-lexus-rx350-2018",
    name: "2018 Lexus RX 350 AWD (Panoramic Sunroof)",
    category: "cars",
    condition: "Tokunbo / Foreign Used",
    badge: "Direct Tokunbo",
    priceNaira: 38500000,
    priceDollar: 26500,
    rating: 4.9,
    reviewsCount: 14,
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80"
    ],
    shortDesc: "Super clean direct foreign-used luxury SUV. Full option with panoramic glass roof, buttery cream leather, and buttery smooth 3.5L V6.",
    specs: {
      "Engine": "3.5L DOHC 24-Valve V6 (295 hp)",
      "Transmission": "8-Speed Shiftable Automatic",
      "Drivetrain": "All-Wheel Drive (AWD)",
      "Mileage": "54,200 miles",
      "Color": "Eminence Pearl White / Cream Leather Interior",
      "Customs": "Fully Cleared & Documented at Tin Can Lagos",
      "Features": "Panoramic Sunroof, Heads-Up Display, 360 Camera, Mark Levinson Sound, Blind Spot Monitor, Keyless Go",
      "VIN / Verification": "Clean Carfax Available on WhatsApp"
    },
    isFeatured: true,
    inStock: true
  },
  {
    id: "car-mercedes-c300-2016",
    name: "2016 Mercedes-Benz C300 4MATIC (AMG Sport)",
    category: "cars",
    condition: "Tokunbo / Foreign Used",
    badge: "Hot Seller",
    priceNaira: 22000000,
    priceDollar: 15200,
    rating: 4.9,
    reviewsCount: 19,
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1000&q=80"
    ],
    shortDesc: "Obsidian Black Metallic with fiery Cranberry Red leather sports interior. AMG sport wheels, aggressive aero styling, pristine engine and transmission.",
    specs: {
      "Engine": "2.0L Turbocharged Inline-4 (241 hp)",
      "Transmission": "7-Speed Automatic with Paddle Shifters",
      "Drivetrain": "4MATIC Permanent All-Wheel Drive",
      "Mileage": "62,800 miles",
      "Color": "Obsidian Black / Cranberry Red Leather",
      "Customs": "Lagos Port Cleared with full genuine papers",
      "Features": "Burmester Surround Sound, Ambient 64-color lighting, Panoramic Roof, Heated Sports Seats, Navigation",
      "VIN / Verification": "Accident-free title confirmed"
    },
    isFeatured: true,
    inStock: true
  },
  {
    id: "car-toyota-camry-2020",
    name: "2020 Toyota Camry XSE 'Spider' (Full Option)",
    category: "cars",
    condition: "Tokunbo / Foreign Used",
    badge: "Trending",
    priceNaira: 26500000,
    priceDollar: 18300,
    rating: 4.8,
    reviewsCount: 11,
    image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=1000&q=80"
    ],
    shortDesc: "The revered 'Spider' shape. Two-tone Supersonic Red with Midnight Black roof, quad chrome exhaust tips, and cockpit red leather interior.",
    specs: {
      "Engine": "2.5L 4-Cylinder Dynamic Force Engine",
      "Transmission": "Direct-Shift 8-Speed Automatic",
      "Drivetrain": "Front-Wheel Drive",
      "Mileage": "41,000 miles",
      "Color": "Supersonic Red & Black Roof / Cockpit Red Leather",
      "Customs": "Original Lagos Clearing Documents",
      "Features": "Panoramic Sunroof, 19\" Black Alloy Wheels, Qi Wireless Charging, JBL 9-Speaker Audio, Apple CarPlay & Android Auto",
      "VIN / Verification": "Clean Title, Zero flood or mechanical issues"
    },
    isFeatured: false,
    inStock: true
  },
  {
    id: "car-toyota-corolla-2015",
    name: "2015 Toyota Corolla LE (Direct Tokunbo)",
    category: "cars",
    condition: "Tokunbo / Foreign Used",
    badge: "Best Fuel Economy",
    priceNaira: 12500000,
    priceDollar: 8600,
    rating: 4.9,
    reviewsCount: 28,
    image: "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=1000&q=80"
    ],
    shortDesc: "Nigeria's most reliable daily cruiser. Chilling AC, bulletproof 1.8L engine, pristine fabric interior, zero repairs needed, buy and drive immediately.",
    specs: {
      "Engine": "1.8L 4-Cylinder DOHC 16-Valve Dual VVT-i",
      "Transmission": "CVTi-S Automatic",
      "Drivetrain": "Front-Wheel Drive",
      "Mileage": "78,000 miles",
      "Color": "Silver Celestial Metallic / Ash Gray Interior",
      "Customs": "Authentic Customs Duty Cleared",
      "Features": "Chilling Automatic Climate Control, Backup Camera, Bluetooth Handsfree, 6.1\" Touchscreen Display, Cruise Control",
      "VIN / Verification": "Original Tokunbo verified"
    },
    isFeatured: false,
    inStock: true
  },
  {
    id: "car-lexus-es350-2014",
    name: "2014 Lexus ES 350 Luxury Sedan",
    category: "cars",
    condition: "Tokunbo / Foreign Used",
    badge: "Executive Comfort",
    priceNaira: 16000000,
    priceDollar: 11000,
    rating: 4.8,
    reviewsCount: 16,
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1000&q=80"
    ],
    shortDesc: "The ultimate executive luxury cruiser. Silky smooth ride, authentic wooden steering trims, rear sunshade, whisper-quiet cabin.",
    specs: {
      "Engine": "3.5L V6 268 hp",
      "Transmission": "6-Speed Electronically Controlled Automatic",
      "Mileage": "73,000 miles",
      "Color": "Matador Red Mica / Parchment Semi-Aniline Leather",
      "Customs": "Fully Cleared at Lagos Terminal",
      "Features": "Sunroof, Ventilated Cool/Warm Seats, Push Button Start, Mark Levinson Audio, Rear Automatic Sunshade",
      "VIN / Verification": "Clean Title Available"
    },
    isFeatured: false,
    inStock: true
  },

  // --- SMARTPHONES ---
  {
    id: "phone-iphone-15-pro-max",
    name: "Apple iPhone 15 Pro Max 256GB (Factory Unlocked)",
    category: "phones",
    condition: "Brand New / Sealed",
    badge: "Top Flagship",
    priceNaira: 1550000,
    priceDollar: 1070,
    rating: 5.0,
    reviewsCount: 42,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=1000&q=80"
    ],
    shortDesc: "Brand new factory sealed in box. Aerospace-grade titanium chassis, A17 Pro chip with console gaming power, and 5x optical telephoto zoom.",
    specs: {
      "Storage": "256GB NVMe",
      "RAM": "8GB Unified Memory",
      "Display": "6.7\" Super Retina XDR OLED 120Hz ProMotion",
      "Processor": "Apple A17 Pro (3nm)",
      "Camera": "48MP Main + 12MP Ultra-wide + 12MP 5x Periscope Zoom",
      "Battery": "100% Brand New Sealed (Up to 29 hrs video playback)",
      "SIM": "Physical Nano-SIM + eSIM (Global Unlocked)",
      "Warranty": "1-Year Apple International Warranty + MKJ 30-day Store Guarantee"
    },
    isFeatured: true,
    inStock: true
  },
  {
    id: "phone-iphone-14-pro",
    name: "Apple iPhone 14 Pro 128GB (Deep Purple)",
    category: "phones",
    condition: "Clean UK Used (Grade A+)",
    badge: "100% Battery",
    priceNaira: 920000,
    priceDollar: 635,
    rating: 4.9,
    reviewsCount: 38,
    image: "https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?auto=format&fit=crop&w=1000&q=80"
    ],
    shortDesc: "Super clean UK used with Dynamic Island, pristine stainless steel rails, flawless screen, and tested 100% battery health.",
    specs: {
      "Storage": "128GB",
      "RAM": "6GB",
      "Display": "6.1\" Super Retina XDR OLED, Always-On, 120Hz",
      "Battery Health": "100% Guaranteed Original Battery",
      "Condition": "Grade A+ (No scratches, no dents, never repaired)",
      "Features": "Dynamic Island, Action Mode 4K, 48MP ProRAW camera, FaceID 100% responsive",
      "Warranty": "7-Day Instant Test & Swap Warranty"
    },
    isFeatured: true,
    inStock: true
  },
  {
    id: "phone-samsung-s24-ultra",
    name: "Samsung Galaxy S24 Ultra 5G 512GB (Titanium Gray)",
    category: "phones",
    condition: "Brand New Sealed",
    badge: "Galaxy AI",
    priceNaira: 1750000,
    priceDollar: 1210,
    rating: 5.0,
    reviewsCount: 26,
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=1000&q=80"
    ],
    shortDesc: "The pinnacle of Android. Built-in S-Pen, flat anti-reflective Corning Gorilla Armor display, Snapdragon 8 Gen 3, and groundbreaking Galaxy AI.",
    specs: {
      "Storage": "512GB UFS 4.0",
      "RAM": "12GB LPDDR5X",
      "Display": "6.8\" Dynamic AMOLED 2X, 2600 nits, 1-120Hz LTPO",
      "Camera": "200MP Main + 50MP 5x Periscope + 10MP 3x + 12MP Ultra-wide",
      "Battery": "5000 mAh (45W Fast Charging)",
      "Features": "Live Call Translate, Circle to Search, Titanium Frame, Integrated S-Pen",
      "Warranty": "24-Month Samsung Warranty + Free Screen Protector Installation"
    },
    isFeatured: true,
    inStock: true
  },
  {
    id: "phone-iphone-13",
    name: "Apple iPhone 13 128GB (Midnight Black / Blue)",
    category: "phones",
    condition: "Clean UK Used (Grade A)",
    badge: "Student Favorite",
    priceNaira: 580000,
    priceDollar: 400,
    rating: 4.8,
    reviewsCount: 64,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=1000&q=80"
    ],
    shortDesc: "The king of value! Cinematic Mode, long-lasting battery life, lightning-fast A15 Bionic chip, and crystal-clear cameras. Perfectly priced for students and creators.",
    specs: {
      "Storage": "128GB",
      "RAM": "4GB",
      "Display": "6.1\" Super Retina XDR OLED",
      "Battery Health": "89% - 94% Original Battery",
      "Condition": "Grade A (Clean sides and back, True Tone active, Face ID active)",
      "Warranty": "7-Day Store Warranty"
    },
    isFeatured: false,
    inStock: true
  },
  {
    id: "phone-iphone-12-pro",
    name: "Apple iPhone 12 Pro 256GB (Pacific Blue)",
    category: "phones",
    condition: "Clean UK Used (Grade A)",
    badge: "High Storage",
    priceNaira: 490000,
    priceDollar: 340,
    rating: 4.8,
    reviewsCount: 31,
    image: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=1000&q=80"
    ],
    shortDesc: "Signature surgical-grade stainless steel frame in rare Pacific Blue. 256GB storage for all your photos and videos, triple cameras with LiDAR scanner.",
    specs: {
      "Storage": "256GB",
      "RAM": "6GB",
      "Battery Health": "88% - 92% Original Apple Battery",
      "Condition": "Grade A UK Used",
      "Features": "Triple 12MP Camera, Night Mode Portraits, MagSafe, 5G Connectivity"
    },
    isFeatured: false,
    inStock: true
  },
  {
    id: "phone-iphone-11",
    name: "Apple iPhone 11 128GB (Purple / Black / White)",
    category: "phones",
    condition: "Clean UK Used",
    badge: "Budget King",
    priceNaira: 320000,
    priceDollar: 220,
    rating: 4.7,
    reviewsCount: 55,
    image: "https://images.unsplash.com/photo-1574755393849-623942496936?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1574755393849-623942496936?auto=format&fit=crop&w=1000&q=80"
    ],
    shortDesc: "Super reliable, clean, tested, and works with all Nigerian networks. Great battery life and dual 4K cameras for social media content.",
    specs: {
      "Storage": "128GB",
      "Display": "6.1\" Liquid Retina HD",
      "Condition": "Grade A UK Used",
      "Battery Health": "85%+ Original",
      "Warranty": "7-Day Testing Guarantee"
    },
    isFeatured: false,
    inStock: true
  },

  // --- LAPTOPS & MACBOOKS ---
  {
    id: "laptop-macbook-pro-m3-14",
    name: "Apple MacBook Pro 14\" M3 Pro (18GB RAM / 512GB SSD)",
    category: "laptops",
    condition: "Brand New Factory Sealed",
    badge: "Powerhouse",
    priceNaira: 2650000,
    priceDollar: 1830,
    rating: 5.0,
    reviewsCount: 22,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=1000&q=80"
    ],
    shortDesc: "The ultimate laptop for software developers, video editors, and audio engineers. Space Black finish with Liquid Retina XDR 120Hz display.",
    specs: {
      "Processor": "Apple M3 Pro Chip (11-core CPU, 14-core GPU, 16-core Neural Engine)",
      "RAM": "18GB Unified Memory",
      "Storage": "512GB Superfast NVMe SSD",
      "Display": "14.2\" Liquid Retina XDR (3024 x 1964), 1600 nits peak, ProMotion 120Hz",
      "Battery": "Up to 18 Hours (100% Brand New Sealed)",
      "Ports": "HDMI, SDXC card slot, 3x Thunderbolt 4, MagSafe 3, Headphone jack",
      "Color": "Space Black",
      "Warranty": "1-Year Apple Care Official Warranty"
    },
    isFeatured: true,
    inStock: true
  },
  {
    id: "laptop-macbook-pro-m1-13",
    name: "Apple MacBook Pro 13\" M1 (16GB RAM / 512GB SSD)",
    category: "laptops",
    condition: "Clean UK Used (Grade A+)",
    badge: "Dev Special",
    priceNaira: 950000,
    priceDollar: 655,
    rating: 4.9,
    reviewsCount: 47,
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1000&q=80"
    ],
    shortDesc: "Rare 16GB RAM model! Excellent for coding, Docker, UI/UX design, and intensive multi-tasking without any thermal throttling. Clean battery cycle count.",
    specs: {
      "Processor": "Apple M1 Chip (8-core CPU, 8-core GPU)",
      "RAM": "16GB Unified RAM (Rare & Highly Demanded)",
      "Storage": "512GB Apple SSD",
      "Battery": "Cycle Count under 75 (Over 92% Health)",
      "Features": "Touch Bar, Touch ID, Magic Keyboard, P3 Wide Color Retina",
      "Condition": "Grade A+ (Comes with original 61W USB-C fast charger)",
      "Warranty": "30-Day Hardware Warranty"
    },
    isFeatured: true,
    inStock: true
  },
  {
    id: "laptop-macbook-air-m2",
    name: "Apple MacBook Air 13.6\" M2 (8GB RAM / 256GB SSD)",
    category: "laptops",
    condition: "Clean UK Used (Like New)",
    badge: "Ultra Portable",
    priceNaira: 980000,
    priceDollar: 675,
    rating: 4.9,
    reviewsCount: 33,
    image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=1000&q=80"
    ],
    shortDesc: "Sleek all-aluminum redesign in gorgeous Midnight. Featherweight, fanless silent operation, MagSafe 3 charging, and 1080p FaceTime camera.",
    specs: {
      "Processor": "Apple M2 Chip",
      "RAM": "8GB Unified Memory",
      "Storage": "256GB SSD",
      "Display": "13.6\" Liquid Retina Display with True Tone",
      "Battery": "Up to 18 Hours battery life",
      "Weight": "1.24 kg (Ultra-light)",
      "Color": "Midnight / Space Gray"
    },
    isFeatured: false,
    inStock: true
  },
  {
    id: "laptop-dell-xps-15",
    name: "Dell XPS 15 9520 (Core i7 12th Gen / 32GB RAM / 1TB SSD / RTX 3050Ti)",
    category: "laptops",
    condition: "Clean Foreign Used",
    badge: "High Performance",
    priceNaira: 1250000,
    priceDollar: 860,
    rating: 4.8,
    reviewsCount: 18,
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1000&q=80"
    ],
    shortDesc: "CNC machined aluminum with carbon fiber palm rest. Massive 32GB RAM and dedicated NVIDIA RTX 3050Ti graphics for heavy 3D rendering and software compilation.",
    specs: {
      "Processor": "Intel Core i7-12700H (14 Cores, 20 Threads, up to 4.7GHz)",
      "RAM": "32GB DDR5 Dual Channel (Upgradable to 64GB)",
      "Storage": "1TB PCIe Gen4 NVMe M.2 SSD",
      "Graphics": "NVIDIA GeForce RTX 3050Ti 4GB GDDR6",
      "Display": "15.6\" FHD+ (1920x1200) 500-nits InfinityEdge anti-glare",
      "Battery": "86Whr Long Life Battery (6-8 hrs actual work)",
      "Features": "Backlit Keyboard, Windows Hello Fingerprint & Face Recognition",
      "Warranty": "30-Day Hardware Guarantee"
    },
    isFeatured: false,
    inStock: true
  },
  {
    id: "laptop-hp-spectre-x360",
    name: "HP Spectre x360 2-in-1 Convertible (Core i7 13th Gen / 16GB / 1TB SSD)",
    category: "laptops",
    condition: "Clean UK Used",
    badge: "Touchscreen 360°",
    priceNaira: 1150000,
    priceDollar: 795,
    rating: 4.8,
    reviewsCount: 15,
    image: "https://images.unsplash.com/photo-1544731612-de292439cc67?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1544731612-de292439cc67?auto=format&fit=crop&w=1000&q=80"
    ],
    shortDesc: "Gem-cut Nightfall Black luxury convertible. Flips 360 degrees into tablet mode, vibrant OLED touchscreen, Bang & Olufsen quad audio.",
    specs: {
      "Processor": "Intel Core i7-1355U (10 Cores, up to 5.0GHz)",
      "RAM": "16GB LPDDR5",
      "Storage": "1TB NVMe PCIe M.2 SSD",
      "Display": "13.5\" 3K2K OLED Touchscreen with Stylus Pen Support",
      "Audio": "Bang & Olufsen Quad Speakers with HP Audio Boost",
      "Battery": "All-day battery life + HP Fast Charge (50% in 30 mins)"
    },
    isFeatured: false,
    inStock: true
  },

  // --- AUDIO & GADGET ACCESSORIES ---
  {
    id: "acc-airpods-pro-2",
    name: "Apple AirPods Pro 2nd Generation (USB-C MagSafe Case)",
    category: "accessories",
    condition: "Brand New Sealed",
    badge: "Original Sealed",
    priceNaira: 260000,
    priceDollar: 180,
    rating: 5.0,
    reviewsCount: 51,
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=1000&q=80"
    ],
    shortDesc: "100% Original Apple AirPods Pro 2 with H2 chip, 2x better Active Noise Cancellation, Adaptive Audio, and USB-C MagSafe charging case with speaker.",
    specs: {
      "Connectivity": "Bluetooth 5.3 + Apple H2 Headphone Chip",
      "Features": "Active Noise Cancellation, Transparency Mode, Personalized Spatial Audio",
      "Battery Life": "Up to 6 hours listening time (up to 30 hours with case)",
      "Water Resistance": "IP54 dust, sweat, and water resistant",
      "Charging": "USB-C, MagSafe, Apple Watch charger, or Qi-certified chargers"
    },
    isFeatured: true,
    inStock: true
  },
  {
    id: "acc-apple-watch-ultra-2",
    name: "Apple Watch Ultra 2 (49mm Titanium / Ocean Band)",
    category: "accessories",
    condition: "Brand New Sealed",
    badge: "Rugged Luxury",
    priceNaira: 980000,
    priceDollar: 675,
    rating: 5.0,
    reviewsCount: 19,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80"
    ],
    shortDesc: "The most capable and rugged Apple Watch ever. Aerospace titanium case, 3000 nits display, precision dual-frequency GPS, and up to 72 hours in Low Power Mode.",
    specs: {
      "Case": "49mm Natural Aerospace Titanium",
      "Display": "Always-On Retina OLED, 3000 nits peak brightness",
      "Sensors": "Depth gauge, water temperature sensor, ECG, blood oxygen, temperature sensing",
      "Battery": "Up to 36 hours normal use / 72 hours low power mode"
    },
    isFeatured: false,
    inStock: true
  },
  {
    id: "acc-anker-powerbank-737",
    name: "Anker 737 Power Bank (PowerCore 24K, 140W Two-Way Output)",
    category: "accessories",
    condition: "Brand New",
    badge: "Laptop Charger",
    priceNaira: 135000,
    priceDollar: 95,
    rating: 4.9,
    reviewsCount: 39,
    image: "https://images.unsplash.com/photo-1609592424364-d62152a514d3?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1609592424364-d62152a514d3?auto=format&fit=crop&w=1000&q=80"
    ],
    shortDesc: "Charges MacBooks, iPhones, Samsung phones at blazing 140W full speed! Features a smart digital display showing live wattage, battery health, and charge time.",
    specs: {
      "Capacity": "24,000mAh Ultra-High Capacity",
      "Max Output": "140W (Fast charges MacBook Pro 16\" to 50% in 40 mins)",
      "Ports": "2x USB-C (140W max each) + 1x USB-A (18W)",
      "Smart Display": "Real-time input/output power, screen timeout, and battery percentage"
    },
    isFeatured: false,
    inStock: true
  },
  {
    id: "acc-jbl-boombox-3",
    name: "JBL Boombox 3 Portable Heavy-Bass Speaker (Squad Camo)",
    category: "accessories",
    condition: "Brand New",
    badge: "Monstrous Bass",
    priceNaira: 580000,
    priceDollar: 400,
    rating: 4.9,
    reviewsCount: 24,
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1000&q=80"
    ],
    shortDesc: "Massive sound and the deepest bass you can carry anywhere. Built-in powerbank to charge your phone while playing, 24 hours playtime, and waterproof.",
    specs: {
      "Output Power": "1x80W RMS Subwoofer + 2x40W RMS Midrange + 2x10W Tweeter",
      "Battery Playtime": "Up to 24 hours of non-stop playback",
      "Protection": "IP67 Waterproof & Dustproof",
      "Features": "JBL PartyBoost, Bluetooth 5.3, Metal handle with silicone grip"
    },
    isFeatured: false,
    inStock: true
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Tunde Adelakun",
    role: "Software Engineer (LAUTECH Alum)",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    comment: "I swapped my old iPhone 11 and got an iPhone 14 Pro from MKJ. The transaction took less than 20 minutes at Shop B7 Divine Grace Plaza. 100% battery health as promised and zero issues. MKJ is the most honest tech guy in Under G!",
    rating: 5,
    itemPurchased: "iPhone 14 Pro 128GB (Deep Purple)"
  },
  {
    id: 2,
    name: "Dr. Kemi Ogunlana",
    role: "Senior Lecturer",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    comment: "Bought my direct Tokunbo 2018 Lexus RX350 from MKJ Enterprises. He provided the Carfax report upfront, helped with the paperwork, and delivered it in pristine showroom condition. Truly exceptional integrity.",
    rating: 5,
    itemPurchased: "2018 Lexus RX 350 AWD"
  },
  {
    id: 3,
    name: "Emmanuel Bakare",
    role: "Digital Marketer & Content Creator",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    comment: "Got my M1 MacBook Pro 16GB RAM for video editing from him. The machine is a beast and was in mint condition. Fast WhatsApp communication even late in the evening. Highly recommended!",
    rating: 5,
    itemPurchased: "MacBook Pro 13\" M1 16GB RAM"
  }
];

export const FAQS = [
  {
    q: "How do I place an order or inspect an item?",
    a: "You can click any 'Order on WhatsApp' or 'Buy via WhatsApp' button on our website! It will immediately open a direct chat with MKJ (+234 816 931 5126) with the exact product details pre-filled. You can also walk into our physical store at Shop B7, Divine Grace Plaza, Under G, Ogbomoso."
  },
  {
    q: "Can I swap or trade-in my current phone, laptop, or car?",
    a: "Yes! MKJ Enterprises offers instant trade-in and swap deals. Use our built-in 'Swap Calculator' on this site to estimate your device/car value and send your swap request directly to MKJ on WhatsApp for immediate evaluation."
  },
  {
    q: "Do you deliver outside Ogbomoso?",
    a: "Absolutely! We do nationwide secured doorstep and interstate park delivery across Nigeria (Lagos, Ibadan, Abuja, Ilorin, Osogbo, Port Harcourt, Kano, etc.) with tracking and pay-on-arrival or escrow options available for verified clients."
  },
  {
    q: "Are the foreign used (Tokunbo) cars customs cleared?",
    a: "Yes, 100%. All vehicles listed by MKJ Enterprises come with authentic, verifiable Lagos port customs clearing documentation and clean titles. You are welcome to inspect with your trusted mechanic."
  },
  {
    q: "What warranty do you provide on phones and laptops?",
    a: "Brand new devices come with 1-2 years manufacturer warranty. Clean UK used devices come with a 7-day instant testing & replacement warranty, plus 30-day MKJ technical support."
  }
];
