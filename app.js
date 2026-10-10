/* ================= Firebase (ES module imports + init) ================= */
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
  import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
  import { getFirestore, collection, onSnapshot, addDoc, doc, updateDoc, deleteDoc, setDoc, serverTimestamp, query, orderBy } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "AIzaSyA7KKq6ZRaOVZHelR2a6u7DA12wXj9Vl9o",
    authDomain: "vibe-pieces-f8045.firebaseapp.com",
    projectId: "vibe-pieces-f8045",
    storageBucket: "vibe-pieces-f8045.firebasestorage.app",
    messagingSenderId: "973516037758",
    appId: "1:973516037758:web:126c4ecc13babd0d28022f",
    measurementId: "G-XKXE4V8HDG"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  /* Bridge the ES-module Firebase SDK to the classic script below (which
     runs as an IIFE and cannot use `import`). The classic script waits
     for the "fb-ready" event before touching any of this.
     Firebase Storage is intentionally not used — product images are plain
     URLs (e.g. hosted on ImgBB) entered directly in the Admin Panel. */
  window.FB = {
    auth, db,
    signInWithEmailAndPassword, signOut, onAuthStateChanged,
    collection, onSnapshot, addDoc, doc, updateDoc, deleteDoc, setDoc, serverTimestamp, query, orderBy
  };
  window.dispatchEvent(new Event("fb-ready"));

/* ================= EmailJS configuration ================= */
  window.EMAILJS_PUBLIC_KEY = "YOUR_EMAILJS_PUBLIC_KEY";
  window.EMAILJS_SERVICE_ID = "YOUR_EMAILJS_SERVICE_ID";
  window.EMAILJS_TEMPLATE_ID = "YOUR_EMAILJS_TEMPLATE_ID";
  window.EMAILJS_TO_EMAIL = "masrawysuez151219@gmail.com";
  /* Loaded on demand: the script is only fetched once real keys are set above,
     so visitors do not download unused JS while the placeholders are in place. */
  try{
    if(window.EMAILJS_PUBLIC_KEY.indexOf("YOUR_") !== 0){
      var ejs = document.createElement("script");
      ejs.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
      ejs.async = true;
      ejs.onload = function(){ try{ emailjs.init({ publicKey: window.EMAILJS_PUBLIC_KEY }); }catch(e){ console.warn("EmailJS init skipped", e); } };
      document.head.appendChild(ejs);
    }
  }catch(e){ console.warn("EmailJS load skipped", e); }

/* ================= Main application ================= */
(function(){
  "use strict";

  /* ================= i18n ================= */
  var I18N = {
    en:{
      navHome:"Home", navCatalog:"Catalog",
      heroEyebrow:"The Vibe Collection", heroTagline:"Diamonds are not only for special occasions.",
      scrollCta:"Scroll to Explore",
      collectionEyebrow:"The Edit", collectionTitle:"The Vibe Collection",
      collectionDesc:"Gold-plated and stainless steel pieces, cast for everyday radiance.",
      showMore:"Show More", addToCart:"Add to Cart", soldOut:"Sold Out",
      shopEyebrow:"Our Shop", shopHeadline:"Championing artisanal precision fused with contemporary vision.", learnMore:"Learn more",
      founderQuote:"\u201CEvery piece is crafted to reflect your unique vibe and celebrate your inner glow.\u201D",
      founderName:"\u2014 Rahma Mohamed, Founder",
      newsletterEyebrow:"Stay Connected", newsletterTitle:"Join our circle",
      newsletterDesc:"Be first to know about new drops, restocks, and exclusive offers.",
      newsletterPlaceholder:"Your email address", newsletterBtn:"Subscribe",
      footerRights:"\u00A9 2026 ViBE Pieces. All rights reserved.",
      cartTitle:"Your Bag", subtotal:"Subtotal", checkout:"Checkout", cartEmpty:"Your bag is empty.",
      deliveryDetails:"Delivery Details", fullName:"Full Name", primaryPhone:"Primary Phone",
      whatsappPhone:"WhatsApp Phone", governorate:"Governorate",
      detailedAddress:"Detailed Address (Street, Building, Apt No.)", orderNotes:"Order Notes (optional)",
      confirmWhatsapp:"Confirm Order via WhatsApp", selectGov:"Select governorate", bagEmptyToast:"Your bag is empty",
      addedToast:"Added to your bag", redirectToast:"Redirecting you to WhatsApp\u2026", subscribedToast:"Thanks for subscribing!",
      careGuideLink:"Jewelry Care Guide", careGuideTitle:"Jewelry Care Guide",
      careGoldTitle:"Gold-Plated Pieces",
      careGoldText:"Keep them dry \u2014 remove before showering, swimming, or exercising. Store separately in a soft pouch to avoid scratches, and wipe gently with a dry microfiber cloth after each wear. Avoid perfume and lotion contact directly on the plating.",
      careSteelTitle:"Stainless Steel Pieces",
      careSteelText:"Highly durable and water-resistant, but a soft cloth after wear keeps the shine. Occasional cleaning with mild soap and warm water restores brilliance \u2014 avoid abrasive cleaners or chlorine exposure.",
      careGeneralTitle:"General Tips",
      careGeneralText:"Store each piece separately, apply cosmetics before jewelry, and give your pieces a rest between wears to extend their lifetime radiance.",
      giftLabel:"Add Luxury Gift Packaging", giftSub:"Elegant box, ribbon, and a handwritten card on request.",
      giftMsgLabel:"Card Message (optional)",
      filterAll:"All", catNecklaces:"Necklaces", catRings:"Rings", catBracelets:"Bracelets", catAnklets:"Anklets",
      notifyMe:"Notify Me on WhatsApp", lowStock:"Low Stock", bestSeller:"Best Seller", newBadge:"New",
      shipUnlocked:"You've unlocked Free Shipping!", shipProgress:"Add {amt} more to unlock Free Shipping!",
      justPurchased:"just purchased the",
      completeLook:"Complete the Look", bundleDealPrefix:"bundle both for", addBundle:"Add Bundle",
      bundleAddedToast:"Bundle added to your bag",
      searchPlaceholder:"Search by name, material, or category…", noResults:"No pieces match your search.",
      skipToContent:"Skip to content", ariaMenu:"Open menu", ariaClose:"Close", ariaCart:"Open shopping bag", ariaPrev:"Previous image", ariaNext:"Next image", ariaDec:"Decrease quantity", ariaInc:"Increase quantity", ariaShare:"Share on WhatsApp", ariaSearch:"Search products", ariaEmail:"Email address"
    },
    ar:{
      navHome:"الرئيسية", navCatalog:"الكتالوج",
      heroEyebrow:"مجموعة الفايب", heroTagline:"الألماظ مش بس للمناسبات الخاصة.",
      scrollCta:"مرري لتكتشفي المزيد",
      collectionEyebrow:"التشكيلة", collectionTitle:"مجموعة الفايب",
      collectionDesc:"قطع مطلية بالذهب وستانلس ستيل، لإطلالة يومية متألقة.",
      showMore:"عرض المزيد", addToCart:"أضيفي للسلة", soldOut:"غير متوفر",
      shopEyebrow:"متجرنا", shopHeadline:"دقة حرفية أصيلة بلمسة عصرية معاصرة.", learnMore:"اعرفي أكتر",
      founderQuote:"\u201Cكل قطعة بنصممها عشان تعكس تفردك وتحتفي بتألقك الداخلي.\u201D",
      founderName:"\u2014 رحمة محمد، المؤسسة",
      newsletterEyebrow:"ابقي على تواصل", newsletterTitle:"انضمي لدائرتنا",
      newsletterDesc:"كوني أول من يعرف عن قطعنا الجديدة، وإعادة التوفر، والعروض الحصرية.",
      newsletterPlaceholder:"بريدك الإلكتروني", newsletterBtn:"اشتراك",
      footerRights:"© 2026 ViBE Pieces. جميع الحقوق محفوظة.",
      cartTitle:"سلتك", subtotal:"الإجمالي", checkout:"إتمام الطلب", cartEmpty:"سلتك فارغة.",
      deliveryDetails:"بيانات التوصيل", fullName:"الاسم بالكامل", primaryPhone:"رقم الهاتف الأساسي",
      whatsappPhone:"رقم الواتساب", governorate:"المحافظة",
      detailedAddress:"العنوان بالتفصيل (الشارع، المبنى، رقم الشقة)", orderNotes:"ملاحظات الطلب (اختياري)",
      confirmWhatsapp:"تأكيد الطلب عبر واتساب", selectGov:"اختاري المحافظة", bagEmptyToast:"سلتك فارغة",
      addedToast:"تمت الإضافة لسلتك", redirectToast:"جاري تحويلك إلى واتساب\u2026", subscribedToast:"شكراً لاشتراكك!",
      careGuideLink:"دليل العناية بالمجوهرات", careGuideTitle:"دليل العناية بالمجوهرات",
      careGoldTitle:"القطع المطلية بالذهب",
      careGoldText:"حافظي عليها جافة — اخلعيها قبل الاستحمام أو السباحة أو الرياضة. خزنيها في كيس قماشي ناعم منفصل لتجنب الخدوش، وامسحيها بقطعة قماش جافة ناعمة بعد كل استخدام. تجنبي ملامسة العطور والكريمات مباشرة للطلاء.",
      careSteelTitle:"قطع الستانلس ستيل",
      careSteelText:"متينة جداً ومقاومة للماء، لكن مسحها بقطعة قماش بعد الاستخدام يحافظ على لمعانها. التنظيف بالصابون الخفيف والماء الدافئ من وقت لآخر يعيد بريقها — تجنبي المنظفات الكاشطة والكلور.",
      careGeneralTitle:"نصائح عامة",
      careGeneralText:"خزني كل قطعة بشكل منفصل، ضعي مستحضرات التجميل قبل ارتداء المجوهرات، وامنحي قطعك فترة راحة بين الاستخدامات لإطالة عمر تألقها.",
      giftLabel:"إضافة تغليف هدايا فاخر", giftSub:"علبة أنيقة، شريط، وبطاقة مكتوبة بخط اليد عند الطلب.",
      giftMsgLabel:"رسالة البطاقة (اختياري)",
      filterAll:"الكل", catNecklaces:"سلاسل", catRings:"خواتم", catBracelets:"اساور", catAnklets:"انسيالات",
      notifyMe:"أعلميني عبر واتساب", lowStock:"كمية محدودة", bestSeller:"الأكثر مبيعاً", newBadge:"جديد",
      shipUnlocked:"لقد حصلتِ على شحن مجاني!", shipProgress:"أضيفي {amt} أكتر عشان تحصلي على شحن مجاني!",
      justPurchased:"اشترت للتو",
      completeLook:"أكملي الإطلالة", bundleDealPrefix:"القطعتين مع بعض بـ", addBundle:"أضيفي العرض",
      bundleAddedToast:"تمت إضافة العرض لسلتك",
      searchPlaceholder:"ابحثي بالاسم أو الخامة أو الفئة…", noResults:"لا توجد قطع مطابقة لبحثك.",
      skipToContent:"تخطي إلى المحتوى", ariaMenu:"فتح القائمة", ariaClose:"إغلاق", ariaCart:"فتح سلة التسوق", ariaPrev:"الصورة السابقة", ariaNext:"الصورة التالية", ariaDec:"تقليل الكمية", ariaInc:"زيادة الكمية", ariaShare:"مشاركة عبر واتساب", ariaSearch:"ابحثي عن المنتجات", ariaEmail:"البريد الإلكتروني"
    }
  };
  var currentLang = "en";

  function applyLanguage(lang){
    currentLang = lang;
    document.documentElement.lang = lang;
    document.documentElement.dir = (lang === "ar") ? "rtl" : "ltr";
    document.querySelectorAll("[data-i18n]").forEach(function(el){
      var key = el.getAttribute("data-i18n");
      if(I18N[lang][key] !== undefined) el.textContent = I18N[lang][key];
    });
    document.querySelectorAll("[data-i18n-ph]").forEach(function(el){
      var key = el.getAttribute("data-i18n-ph");
      if(I18N[lang][key] !== undefined) el.placeholder = I18N[lang][key];
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function(el){
      var key = el.getAttribute("data-i18n-aria");
      if(I18N[lang][key] !== undefined) el.setAttribute("aria-label", I18N[lang][key]);
    });
    var searchInputEl = document.getElementById("productSearch");
    if(searchInputEl && I18N[lang].searchPlaceholder) searchInputEl.placeholder = I18N[lang].searchPlaceholder;
    populateGovernorates();
    renderFilterTabs();
    renderProducts();
    renderCart();
  }

  var GOVERNORATES = ["Cairo","Giza","Alexandria","Qalyubia","Sharqia","Dakahlia","Gharbia","Monufia","Beheira",
    "Kafr El Sheikh","Damietta","Port Said","Ismailia","Suez","Faiyum","Beni Suef","Minya","Assiut","Sohag",
    "Qena","Luxor","Aswan","Red Sea","New Valley","Matrouh","North Sinai","South Sinai"];

  /* ================= Product catalog ================= */
  var PRODUCTS = [
    { id: 'p01', name: 'Gold-Plated Textured Cuff Bracelet with Red Stones', price: 280.00, images: ['https://i.ibb.co/YFfsBBBg/IMG-20260708-WA0030.jpg', 'https://i.ibb.co/xtvZfXWF/IMG-20260708-WA0029.jpg'] },
    { id: 'p02', name: 'Gold-Plated Flower Cuff Bracelet', price: 280.00, images: ['https://i.ibb.co/Q7XjGg0x/IMG-20260708-WA0032.jpg', 'https://i.ibb.co/wZ3MqP9y/IMG-20260708-WA0031.jpg'] },
    { id: 'p03', name: 'سوار تينس رويال الملكي', price: 175.00, images: ['https://i.ibb.co/RpNrBRjz/IMG-20260708-WA0036.jpg', 'https://i.ibb.co/TDB9wJL1/IMG-20260708-WA0035.jpg'] },
    { id: 'p04', name: 'انسال دهر الحيه', price: 55.00, images: ['https://i.ibb.co/qFm8YKyY/16f04d51293e5a1ef320487d41c03a47.jpg', 'https://i.ibb.co/N2jcH5sW/74718642c2caa95601f9141a61b57c80.jpg'] },
    { id: 'p05', name: 'اسوره ايه الكرسي', price: 110.00, images: ['https://i.ibb.co/3yQV93GV/IMG-20260701-WA0075.jpg', 'https://i.ibb.co/BVkYTX1M/2cf7bb62666211266958346987343499.jpg'] },
    { id: 'p06', name: 'سوار تورنيدو الذهبي المصقول', price: 80.00, images: ['https://i.ibb.co/k69ZL5BD/33142cd0d22209d4c3006c409176641f.jpg', 'https://i.ibb.co/35hkFwsF/9845be26d752f4e7ef81cd7c827d69de.jpg'] },
    { id: 'p07', name: 'إسورة زهور الفان كليف الستانلس', price: 110.00, images: ['https://i.ibb.co/k69JQ369/IMG-20260701-WA0080.jpg', 'https://i.ibb.co/JjfrpvYN/IMG-20260701-WA0079.jpg'] },
    { id: 'p08', name: 'انسيال شبكي فخم', price: 140.00, images: ['https://i.ibb.co/Kcmf953j/2a90abf0e86d2d9776ebc0bdffc86cfa.jpg', 'https://i.ibb.co/KxtpqR4J/e1a9d77ee206a9068d7cdcfd8b9c559d.jpg'] },
    { id: 'p09', name: 'انسيال تيفاني هاردوير الستانلس', price: 140.00, images: ['https://i.ibb.co/p6Rprn9X/86d0059161446658e5dfef00073a5194.jpg', 'https://i.ibb.co/TD0zYFM8/eef10ad321642516d4624581ac42f7a9.jpg'] },
    { id: 'p10', name: 'Set of Gold Cuff Bangles', price: 140.00, images: ['https://i.ibb.co/KcYhsNg1/1783964925759.png', 'https://i.ibb.co/0ySfg3qv/IMG.jpg'] },
    { id: 'p11', name: 'إسورة كارتير الحب الستانلس', price: 130.00, images: ['https://i.ibb.co/rfXPvqjf/1783974302485.png', 'https://i.ibb.co/zTKj85nQ/652274726a79f47961cf92f3f3211fec.jpg'] },
    { id: 'p12', name: 'Golden Nail Bangle', price: 150.00, images: ['https://i.ibb.co/DgLmNzTP/1783964542156.png', 'https://i.ibb.co/dJXk5HLZ/IMG-20260701-WA0073.jpg'] },
    { id: 'p13', name: 'Abstract Lava Ring', price: 65.00, images: ['https://i.ibb.co/gMjBsRPy/IMG.jpg', 'https://i.ibb.co/j0LCgZz/IMG.jpg'] },
    { id: 'p14', name: 'Rainbow Gemstone Pinky Ring', price: 165.00, images: ['https://i.ibb.co/93YD2g7G/IMG.jpg', 'https://i.ibb.co/tpG18tkQ/1785554296369.png'] },
    { id: 'p15', name: 'Anta Omri Signet Ring', price: 170.00, images: ['https://i.ibb.co/G4BNQHWg/IMG.jpg', 'https://i.ibb.co/pBXg36h5/IMG.jpg'] },
    { id: 'p16', name: 'Elegant Bar Lariat', price: 250.00, images: ['https://i.ibb.co/dwwqBCJS/IMG.jpg', 'https://i.ibb.co/KpxHtDQg/IMG.jpg'] },
    { id: 'p17', name: 'سلسلة بيبر كليب الكلاسيكية', price: 90.00, images: ['https://i.ibb.co/gLvFkPnj/1783964652403.png', 'https://i.ibb.co/gM0k126H/IMG-20260701-WA0070.jpg'] },
    { id: 'p18', name: 'Ocean Deep Necklace', price: 170.00, images: ['https://i.ibb.co/d4RVX1d1/1783974315618.png', 'https://i.ibb.co/7tfXJH86/IMG-20260701-WA0068.jpg'] },
    { id: 'p19', name: 'نجمه LUXURy', price: 295.00, images: ['https://i.ibb.co/hF6Rx950/IMG-20260702-WA0039.jpg', 'https://i.ibb.co/TxH1g4VF/IMG-20260702-WA0040.jpg'] },
    { id: 'p20', name: 'قلادة رقة الحب', price: 255.00, images: ['https://i.ibb.co/MxXCBQ77/IMG-20260702-WA0043.jpg', 'https://i.ibb.co/1G1ZkGRT/IMG-20260702-WA0042.jpg'] },
    { id: 'p21', name: 'Gold Mesh Hand Chain', price: 175.00, images: ['https://i.ibb.co/C5SHFsmn/IMG.jpg', 'https://i.ibb.co/5XRtDP61/IMG.jpg'] },
    { id: 'p22', name: 'سلسلة الفراشة الرقيقة', price: 170.00, images: ['https://i.ibb.co/SDKHqYBv/1785555152492.png', 'https://i.ibb.co/bM3yvw80/1785555187367.png'] },
    { id: 'p23', name: 'انسيال تنس كلاسيك', price: 120.00, images: ['https://i.ibb.co/nqd5cM8d/d235cfbdd527e0108c2aea6836745bb2.jpg', 'https://i.ibb.co/fzZnfBwk/3923adfd68e798520861a137b73b0a54.jpg'] },
    { id: 'p24', name: 'دروب نكلس', price: 160.00, images: ['https://i.ibb.co/XxzyGqpR/1782963847117.png', 'https://i.ibb.co/Ldw5h5QP/IMG-20260704-075707.jpg'] },
    { id: 'p25', name: 'سلسلة نجمة الشمال التريند', price: 110.00, images: ['https://i.ibb.co/SDXDqZDj/1782963778505.png', 'https://i.ibb.co/mCCj7vz5/IMG.jpg'] },
    { id: 'p26', name: 'إسورة الفصوص اللامعة', price: 175.00, images: ['https://i.ibb.co/yBqg1nMW/c1bbf07844dffdc1b957368bc252328e.jpg', 'https://i.ibb.co/vCBbJ99T/968db1cbeacb6792a0ed5281112485c9.jpg'] },
    { id: 'p27', name: 'أسورة كارتير الشكل الجديد', price: 175.00, images: ['https://i.ibb.co/Z6RhzShS/IMG.jpg', 'https://i.ibb.co/sJ3xtGmS/04100105260e244caa6eac1bc16f7c1e.jpg'] },
    { id: 'p28', name: 'سلسلة 3 أدوار طبق الأصل الذهب', price: 160.00, images: ['https://i.ibb.co/G4t6X6Jc/IMG.jpg', 'https://i.ibb.co/QB77X3H/1785556369414.png'] }
  ];

  /* ================= Firebase-backed data store =================
     Products and orders now live in Firestore (real-time, shared across every
     visitor) instead of localStorage. `db.products` / `db.orders` are kept in
     sync automatically via onSnapshot listeners set up in boot() below.
     If the "products" collection is empty the very first time the site loads
     (brand-new Firebase project), the original catalog in PRODUCTS[] is
     pushed up to Firestore once as a starter seed. */
  var db = { products: [], orders: [] };
  var CART_STORAGE_KEY = "vibePiecesCart";
  function loadCachedCart(){
    try{
      var raw = localStorage.getItem(CART_STORAGE_KEY);
      var parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    }catch(e){ return []; }
  }
  function saveCartCache(){
    try{ localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.cart)); }catch(e){}
  }
  var state = { cart:loadCachedCart(), adminTab:"products", filter:"all", search:"" };
  var auth = { loggedIn:false, user:null };
  var seedAttempted = false;
  var pendingUploadFiles = [];
  var editingProductId = null;
  var imgIndex = {};
  var visibleCount = 4;
  var lightboxState = { pid:null, idx:0 };
  var FREE_SHIPPING_THRESHOLD = 2500;
  var SALES_NAMES = [
    ["Mariam","Cairo"], ["Nour","Alexandria"], ["Salma","Giza"], ["Yasmin","Mansoura"],
    ["Habiba","Tanta"], ["Malak","Aswan"], ["Rana","Ismailia"], ["Farida","Zagazig"]
  ];
  var salesToastTimer = null;

  /* Best-effort category classification for products that don't have an
     explicit `category` field yet (legacy/seed catalog items assigned
     before the category dropdown existed). New products always carry an
     explicit `category` chosen in the Admin Panel. */
  function getCategory(p){
    if(p.category) return p.category;
    var t = (p.title||"");
    if(/ring|خاتم|خواتم/i.test(t)) return "rings";
    if(/anklet|انسيال/i.test(t)) return "anklets";
    if(/bracelet|bangle|cuff|سوار|اسوار|اسورة|إسورة/i.test(t)) return "bracelets";
    return "necklaces";
  }

  /* Live search: matches the query against title, description, category,
     and any listed materials/options — case-insensitive, no reload needed. */
  function productMatchesSearch(p, q){
    if(!q) return true;
    var haystack = [
      p.title || "", p.desc || "", getCategory(p) || "",
      Array.isArray(p.options) ? p.options.join(" ") : ""
    ].join(" ").toLowerCase();
    return haystack.indexOf(q) > -1;
  }
  function getFilteredPool(){
    var q = (state.search || "").trim().toLowerCase();
    return (db.products || []).filter(function(p){
      var matchesFilter = state.filter === "all" || getCategory(p) === state.filter;
      return matchesFilter && productMatchesSearch(p, q);
    });
  }

  /* ================= instant render: localStorage cache + skeleton =================
     Goal: the product grid is never blank while Firestore's onSnapshot is still
     connecting. On load we synchronously paint whatever was cached from the last
     visit; if there's no cache yet (first-ever visit), we paint skeleton cards
     instead. Whenever a fresh onSnapshot fires, the cache is refreshed and the
     grid is smoothly re-rendered (see boot() below). */
  var PRODUCTS_CACHE_KEY = "vibePiecesProductsCache";
  var SKELETON_COUNT = 8;

  function loadCachedProducts(){
    try{
      var raw = localStorage.getItem(PRODUCTS_CACHE_KEY);
      if(!raw) return null;
      var parsed = JSON.parse(raw);
      return (Array.isArray(parsed) && parsed.length) ? parsed : null;
    }catch(e){ return null; }
  }

  function saveProductsCache(products){
    try{ localStorage.setItem(PRODUCTS_CACHE_KEY, JSON.stringify(products)); }
    catch(e){ /* storage unavailable/full — fail silently, cache is a nice-to-have */ }
  }

  /* Converts the hardcoded PRODUCTS[] catalog into the same shape Firestore
     documents have, so it can be used as a last-resort fallback if Firestore
     never responds (offline, blocked network, misconfigured rules, etc). */
  function productsFromSeed(){
    return PRODUCTS.map(function(p){
      return { id:p.id, title:p.name, price:p.price, oldPrice:null, desc:"", options:[],
        stock:true, images:p.images.slice(), image:p.images[0] };
    });
  }

  var firstProductsSnapshotReceived = false;
  var FIRESTORE_TIMEOUT_MS = 6000;

  /* Guarantees the grid never gets stuck on skeletons: if Firestore hasn't
     answered (success OR error) within FIRESTORE_TIMEOUT_MS, or if the
     onSnapshot listener errors out, fall back to the last cached products,
     or — if there's no cache at all (first-ever visit, offline) — to the
     bundled PRODUCTS[] catalog. */
  function fallbackToLocalProducts(reason){
    if(firstProductsSnapshotReceived) return;
    firstProductsSnapshotReceived = true;
    var fallback = loadCachedProducts() || productsFromSeed();
    db.products = fallback;
    saveProductsCache(fallback);
    renderProducts();
    console.warn("Products loaded from local fallback (" + reason + ")");
  }

  function renderSkeletons(count){
    var grid = document.getElementById("productGrid");
    grid.classList.add("is-loading");
    grid.innerHTML = "";
    for(var i=0;i<count;i++){
      var card = document.createElement("div");
      card.className = "card glass skeleton-card";
      card.innerHTML =
        '<div class="card-media skeleton-block"></div>'+
        '<div class="card-body">'+
          '<div class="skeleton-block skeleton-title"></div>'+
          '<div class="skeleton-block skeleton-price"></div>'+
          '<div class="card-footer">'+
            '<div class="skeleton-block skeleton-pill"></div>'+
            '<div class="skeleton-block skeleton-pill skeleton-pill-wide"></div>'+
          '</div>'+
        '</div>';
      grid.appendChild(card);
    }
    var moreWrap = document.getElementById("showMoreWrap");
    if(moreWrap) moreWrap.style.display = "none";
  }

  /* ================= helpers ================= */
  function fmtPrice(n){ return n.toLocaleString("en-US") + " EGP"; }
  function findProduct(id){ return db.products.find(function(p){return p.id===id;}); }
  function t(key){ return I18N[currentLang][key]; }
  function showToast(msg){
    var el = document.getElementById("toast");
    if(!el) return;
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(function(){ el.classList.remove("show"); }, 2600);
  }

  function populateGovernorates(){
    var sel = document.getElementById("custGov");
    if(!sel) return;
    var current = sel.value;
    sel.innerHTML = '<option value="">'+t("selectGov")+'</option>' +
      GOVERNORATES.map(function(g){ return '<option value="'+g+'">'+g+'</option>'; }).join("");
    sel.value = current;
  }

  /* ================= recent sales social proof ================= */
  function showSalesToast(){
    if(!db.products.length) return;
    var toastEl = document.getElementById("salesToast");
    var drawerEl = document.getElementById("cartDrawer");
    if(!toastEl || (anyModalOpen() || (drawerEl && drawerEl.classList.contains("open")))) return;
    var p = db.products[Math.floor(Math.random()*db.products.length)];
    var who = SALES_NAMES[Math.floor(Math.random()*SALES_NAMES.length)];
    var imgEl = document.getElementById("salesToastImg");
    var textEl = document.getElementById("salesToastText");
    if(imgEl) imgEl.src = (p.images && p.images[0]) || p.image || "";
    if(textEl) textEl.innerHTML = "<b>"+who[0]+"</b> "+
      (currentLang==="ar" ? (t("justPurchased")+" "+p.title+" — "+who[1]) : (t("justPurchased")+" "+p.title+" — "+who[1]));
    toastEl.classList.add("show");
    setTimeout(function(){ toastEl.classList.remove("show"); }, 4200);
  }
  function startSalesToastLoop(){
    clearTimeout(salesToastTimer);
    function loop(){
      showSalesToast();
      salesToastTimer = setTimeout(loop, 25000 + Math.random()*20000);
    }
    salesToastTimer = setTimeout(loop, 12000);
  }

  /* ================= header scroll state ================= */
  var headerEl = document.getElementById("siteHeader");
  window.addEventListener("scroll", function(){
    if(window.scrollY > 40) headerEl.classList.add("scrolled");
    else headerEl.classList.remove("scrolled");
  });

  /* ================= filter tabs ================= */
  var FILTER_DEFS = [
    { key:"all", labelKey:"filterAll" },
    { key:"necklaces", labelKey:"catNecklaces" },
    { key:"rings", labelKey:"catRings" },
    { key:"bracelets", labelKey:"catBracelets" },
    { key:"anklets", labelKey:"catAnklets" }
  ];
  function renderFilterTabs(){
    var wrap = document.getElementById("filterTabs");
    if(!wrap) return;
    wrap.innerHTML = FILTER_DEFS.map(function(f){
      return '<button class="filter-tab'+(state.filter===f.key?" active":"")+'" data-filter="'+f.key+'">'+t(f.labelKey)+'</button>';
    }).join("");
  }
  document.getElementById("filterTabs").addEventListener("click", function(e){
    var btn = e.target.closest("[data-filter]");
    if(!btn) return;
    state.filter = btn.getAttribute("data-filter");
    visibleCount = 4;
    renderFilterTabs();
    renderProducts();
  });

  /* Nav/mobile-nav category shortcuts (Necklaces / Rings / Bracelets / Anklets)
     jump straight to the catalog pre-filtered to that category. */
  document.querySelectorAll(".nav-cat-link, .mnav-cat-link").forEach(function(a){
    a.addEventListener("click", function(){
      state.filter = a.getAttribute("data-filter");
      visibleCount = 4;
      renderFilterTabs();
      renderProducts();
    });
  });

  function starsHTML(rating){
    rating = Math.round(rating || 4.5);
    var out = "";
    for(var i=1;i<=5;i++){
      out += '<svg viewBox="0 0 24 24" class="'+(i<=rating?"":"empty")+'"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></svg>';
    }
    return out;
  }
  function badgesHTML(p){
    var badges = p.badges || [];
    var out = "";
    if(badges.indexOf("low-stock")>-1) out += '<span class="urgency-badge low">'+t("lowStock")+'</span>';
    if(badges.indexOf("best-seller")>-1) out += '<span class="urgency-badge best">'+t("bestSeller")+'</span>';
    if(badges.indexOf("new")>-1) out += '<span class="urgency-badge new">'+t("newBadge")+'</span>';
    return out ? '<div class="card-badges">'+out+'</div>' : "";
  }
  function whatsappShareUrl(p){
    var msg = p.title + " — " + fmtPrice(p.price) + " — ViBE Pieces\n" + window.location.href;
    return "https://wa.me/?text=" + encodeURIComponent(msg);
  }

  /* ================= product grid ================= */
  function renderProducts(){
    var grid = document.getElementById("productGrid");
    if(!grid) return;
    grid.classList.remove("is-loading");
    grid.innerHTML = "";
    var pool = getFilteredPool();
    if(!pool.length){
      grid.innerHTML = '<div class="search-no-results">'+t("noResults")+'</div>';
      var moreWrapEmpty = document.getElementById("showMoreWrap");
      if(moreWrapEmpty) moreWrapEmpty.style.display = "none";
      return;
    }
    var shown = pool.slice(0, visibleCount);
    shown.forEach(function(p){
      if(imgIndex[p.id] === undefined) imgIndex[p.id] = 0;
      var idx = imgIndex[p.id];
      var card = document.createElement("div");
      card.className = "card glass";
      card.innerHTML =
        '<div class="card-media zoomable" data-pid="'+p.id+'">'+
          badgesHTML(p) +
          (!p.stock ? '<div class="stock-flag out" data-i18n="soldOut">'+t("soldOut")+'</div>' : '') +
          '<img src="'+p.images[idx]+'" alt="'+p.title+'" data-img="'+p.id+'" loading="lazy" decoding="async">'+
          '<button class="card-share" data-share="'+p.id+'" aria-label="'+t("ariaShare")+'" title="'+t("ariaShare")+'">'+
            '<svg viewBox="0 0 24 24"><path d="M20.5 3.5A11.8 11.8 0 0 0 12.03 0C5.5 0 .2 5.3.2 11.8c0 2.1.55 4.1 1.6 5.9L0 24l6.5-1.7a11.8 11.8 0 0 0 5.5 1.4h.01c6.5 0 11.8-5.3 11.8-11.8 0-3.1-1.2-6.1-3.31-8.4zM12 21.3h-.01a9.7 9.7 0 0 1-4.95-1.36l-.35-.21-3.7.97.99-3.6-.23-.37a9.7 9.7 0 0 1-1.5-5.13C2.25 6.4 6.6 2.05 12 2.05a9.6 9.6 0 0 1 6.8 2.82 9.6 9.6 0 0 1 2.81 6.8c0 5.4-4.4 9.63-9.61 9.63z"/></svg>'+
          '</button>'+
          (p.images.length>1 ? (
            '<button type="button" class="img-nav prev" data-inav="prev" data-pid="'+p.id+'" aria-label="'+t("ariaPrev")+'"><svg viewBox="0 0 24 24"><polyline points="15 6 9 12 15 18"/></svg></button>'+
            '<button type="button" class="img-nav next" data-inav="next" data-pid="'+p.id+'" aria-label="'+t("ariaNext")+'"><svg viewBox="0 0 24 24"><polyline points="9 6 15 12 9 18"/></svg></button>'+
            '<div class="img-dots" data-dots="'+p.id+'">'+
              p.images.map(function(_,i){ return '<i class="'+(i===idx?"active":"")+'"></i>'; }).join("") +
            '</div>'
          ) : '') +
        '</div>'+
        '<div class="card-body">'+
          '<h3>'+p.title+'</h3>'+
          '<div class="card-stars">'+starsHTML(p.rating)+'</div>'+
          '<div class="card-price">'+fmtPrice(p.price)+'</div>'+
          '<div class="card-footer">'+
            (p.stock ? (
              '<div class="qty-select">'+
                '<button type="button" data-act="qminus" data-pid="'+p.id+'" aria-label="'+t("ariaDec")+'">−</button>'+
                '<span class="qv" id="qv-'+p.id+'">1</span>'+
                '<button type="button" data-act="qplus" data-pid="'+p.id+'" aria-label="'+t("ariaInc")+'">+</button>'+
              '</div>'+
              '<button class="add-cart-btn" data-act="addcart" data-pid="'+p.id+'">'+
                '<svg viewBox="0 0 24 24"><path d="M6 8h12l-1.2 11.2a2 2 0 0 1-2 1.8H9.2a2 2 0 0 1-2-1.8L6 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="12" y1="9" x2="12" y2="15"/></svg>'+
                '<span>'+t("addToCart")+'</span>'+
              '</button>'
            ) : (
              '<button class="add-cart-btn notify-btn" data-act="notify" data-pid="'+p.id+'" style="flex:1;">'+
                '<svg viewBox="0 0 24 24"><path d="M20.5 3.5A11.8 11.8 0 0 0 12.03 0C5.5 0 .2 5.3.2 11.8c0 2.1.55 4.1 1.6 5.9L0 24l6.5-1.7a11.8 11.8 0 0 0 5.5 1.4h.01c6.5 0 11.8-5.3 11.8-11.8 0-3.1-1.2-6.1-3.31-8.4z"/></svg>'+
                '<span>'+t("notifyMe")+'</span>'+
              '</button>'
            )) +
          '</div>'+
        '</div>';
      grid.appendChild(card);
    });
    var moreWrap = document.getElementById("showMoreWrap");
    if(moreWrap) moreWrap.style.display = (visibleCount >= pool.length) ? "none" : "block";
  }

  var showMoreBtnEl = document.getElementById("showMoreBtn");
  if(showMoreBtnEl){
    showMoreBtnEl.addEventListener("click", function(){
      var pool = getFilteredPool();
      visibleCount = Math.min(visibleCount + 4, pool.length);
      renderProducts();
    });
  }

  /* ================= instant search wiring ================= */
  var productSearchEl = document.getElementById("productSearch");
  if(productSearchEl){
    productSearchEl.addEventListener("input", function(){
      state.search = productSearchEl.value;
      visibleCount = 4;
      renderProducts();
    });
  }

  /* Paint immediately — before Firebase has even connected — so the grid is
     never blank. Cached products (from the last visit) render right away;
     with no cache yet (first-ever visit), skeleton cards fill the gap. */
  /* Site is English-only now (no language switcher) — apply it immediately,
     before Firebase has even connected, so nothing ever flashes in Arabic. */
  applyLanguage("en");
  var cachedProducts = loadCachedProducts();
  if(cachedProducts){
    db.products = cachedProducts;
    renderProducts();
  } else {
    renderSkeletons(SKELETON_COUNT);
  }

  function switchImage(pid, dir){
    var p = findProduct(pid);
    if(!p || p.images.length < 2) return;
    var n = p.images.length;
    imgIndex[pid] = ((imgIndex[pid] + (dir==="next"?1:-1)) % n + n) % n;
    var img = document.querySelector('img[data-img="'+pid+'"]');
    if(img) img.src = p.images[imgIndex[pid]];
    var dots = document.querySelector('[data-dots="'+pid+'"]');
    if(dots){
      dots.querySelectorAll("i").forEach(function(dot,i){ dot.classList.toggle("active", i===imgIndex[pid]); });
    }
  }

  /* Lens/zoom micro-interaction: as the cursor moves over a product image,
     the zoomed-in view follows it (a lightweight magnifier feel) instead of
     always zooming toward a fixed center point. */
  document.getElementById("productGrid").addEventListener("mousemove", function(e){
    var media = e.target.closest(".card-media");
    if(!media) return;
    var rect = media.getBoundingClientRect();
    var x = ((e.clientX - rect.left) / rect.width) * 100;
    var y = ((e.clientY - rect.top) / rect.height) * 100;
    media.style.setProperty("--zx", x + "%");
    media.style.setProperty("--zy", y + "%");
  });

  document.getElementById("productGrid").addEventListener("click", function(e){
    var shareBtn = e.target.closest("[data-share]");
    if(shareBtn){
      e.stopPropagation();
      var sp = findProduct(shareBtn.getAttribute("data-share"));
      if(sp) window.open(whatsappShareUrl(sp), "_blank");
      return;
    }
    var navBtn = e.target.closest("[data-inav]");
    if(navBtn){
      e.stopPropagation();
      switchImage(navBtn.getAttribute("data-pid"), navBtn.getAttribute("data-inav"));
      return;
    }
    var mediaEl = e.target.closest(".card-media");
    if(mediaEl && e.target.tagName === "IMG"){
      openLightbox(mediaEl.getAttribute("data-pid"));
      return;
    }
    var btn = e.target.closest("[data-act]");
    if(!btn) return;
    var pid = btn.getAttribute("data-pid");
    var act = btn.getAttribute("data-act");
    if(act === "notify"){
      var np = findProduct(pid);
      if(np){
        var msg = "Hi! I'd like to be notified when \"" + np.title + "\" is back in stock, and reserve one for me if possible. (" + fmtPrice(np.price) + ")";
        window.open("https://wa.me/201551447040?text="+encodeURIComponent(msg), "_blank");
      }
      return;
    }
    var qEl = document.getElementById("qv-"+pid);
    if(act === "qplus"){ if(qEl) qEl.textContent = parseInt(qEl.textContent,10)+1; return; }
    if(act === "qminus"){ if(qEl) qEl.textContent = Math.max(1, parseInt(qEl.textContent,10)-1); return; }
    if(act === "addcart"){
      var qty = qEl ? parseInt(qEl.textContent,10) : 1;
      addToCart(pid, qty || 1);
    }
  });

  /* ================= lightbox ================= */
  var lightboxEl = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightboxImg");
  function renderBundleSuggestion(p){
    var bundleEl = document.getElementById("lightboxBundle");
    var pool = db.products.filter(function(o){ return o.id !== p.id && o.stock; });
    if(!pool.length){ bundleEl.style.display = "none"; return; }
    var pick = pool[Math.floor(Math.random()*pool.length)];
    var bundlePrice = Math.round((p.price + pick.price) * 0.9);
    bundleEl.innerHTML =
      '<h4>'+t("completeLook")+'</h4>'+
      '<div class="bundle-row">'+
        '<img src="'+((pick.images&&pick.images[0])||pick.image||"")+'" alt="'+pick.title+'">'+
        '<div class="binfo"><b>'+pick.title+'</b>'+fmtPrice(pick.price)+' — '+t("bundleDealPrefix")+' '+fmtPrice(bundlePrice)+'</div>'+
        '<button class="bundle-add-btn" id="bundleAddBtn">'+t("addBundle")+'</button>'+
      '</div>';
    bundleEl.style.display = "block";
    document.getElementById("bundleAddBtn").onclick = function(){
      addToCart(p.id, 1);
      addToCart(pick.id, 1);
      showToast(t("bundleAddedToast"));
    };
  }
  function openLightbox(pid){
    var p = findProduct(pid);
    if(!p) return;
    lightboxState.pid = pid;
    lightboxState.idx = imgIndex[pid] || 0;
    lightboxImg.src = p.images[lightboxState.idx];
    lightboxImg.alt = p.title;
    lightboxImg.classList.remove("zoomed");
    lightboxEl.classList.add("show");
    renderBundleSuggestion(p);
  }
  function closeLightbox(){ lightboxEl.classList.remove("show"); lightboxImg.classList.remove("zoomed"); }
  function lightboxNav(dir){
    var p = findProduct(lightboxState.pid);
    if(!p) return;
    var n = p.images.length;
    lightboxState.idx = ((lightboxState.idx + (dir==="next"?1:-1)) % n + n) % n;
    lightboxImg.src = p.images[lightboxState.idx];
    lightboxImg.classList.remove("zoomed");
    imgIndex[lightboxState.pid] = lightboxState.idx;
    var mainImg = document.querySelector('img[data-img="'+lightboxState.pid+'"]');
    if(mainImg) mainImg.src = p.images[lightboxState.idx];
    var dots = document.querySelector('[data-dots="'+lightboxState.pid+'"]');
    if(dots){ dots.querySelectorAll("i").forEach(function(dot,i){ dot.classList.toggle("active", i===lightboxState.idx); }); }
  }
  document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
  document.getElementById("lightboxPrev").addEventListener("click", function(){ lightboxNav("prev"); });
  document.getElementById("lightboxNext").addEventListener("click", function(){ lightboxNav("next"); });
  lightboxImg.addEventListener("click", function(){ lightboxImg.classList.toggle("zoomed"); });
  lightboxEl.addEventListener("click", function(e){ if(e.target === lightboxEl) closeLightbox(); });
  document.addEventListener("keydown", function(e){
    if(!lightboxEl.classList.contains("show")) return;
    if(e.key === "Escape") closeLightbox();
    if(e.key === "ArrowLeft") lightboxNav("prev");
    if(e.key === "ArrowRight") lightboxNav("next");
  });

  /* ================= cart ================= */
  function addToCart(pid, qty){
    var line = state.cart.find(function(c){return c.id===pid;});
    if(line){ line.qty += qty; } else { state.cart.push({id:pid, qty:qty}); }
    renderCart();
    showToast(t("addedToast"));
    openCart();
  }
  function removeFromCart(pid){
    state.cart = state.cart.filter(function(c){return c.id!==pid;});
    renderCart();
  }
  function cartTotal(){
    return state.cart.reduce(function(sum,c){
      var p = findProduct(c.id); return sum + (p ? p.price*c.qty : 0);
    },0);
  }
  function renderShipProgress(){
    var textEl = document.getElementById("shipProgressText");
    var fillEl = document.getElementById("shipBarFill");
    if(!textEl || !fillEl) return;
    var total = cartTotal();
    var pct = Math.min(100, (total / FREE_SHIPPING_THRESHOLD) * 100);
    fillEl.style.width = pct + "%";
    if(state.cart.length === 0){
      textEl.textContent = "";
    } else if(total >= FREE_SHIPPING_THRESHOLD){
      textEl.innerHTML = "🎉 " + t("shipUnlocked");
    } else {
      var remaining = fmtPrice(FREE_SHIPPING_THRESHOLD - total);
      textEl.innerHTML = t("shipProgress").replace("{amt}", "<b>"+remaining+"</b>");
    }
  }
  function renderCart(){
    saveCartCache();
    var wrap = document.getElementById("cartItems");
    document.getElementById("cartBadge").textContent = state.cart.reduce(function(s,c){return s+c.qty;},0);
    document.getElementById("cartSubtotal").textContent = fmtPrice(cartTotal());
    renderShipProgress();
    if(state.cart.length === 0){
      wrap.innerHTML = '<div class="cart-empty">'+t("cartEmpty")+'</div>';
      return;
    }
    wrap.innerHTML = state.cart.map(function(c){
      var p = findProduct(c.id);
      if(!p) return "";
      return '<div class="cart-row">'+
        '<img src="'+p.image+'" alt="'+p.title+'">'+
        '<div class="cart-row-info">'+
          '<h4>'+p.title+'</h4>'+
          '<div class="price">'+fmtPrice(p.price)+' × '+c.qty+'</div>'+
          '<div class="cart-row-bottom">'+
            '<div class="qty-select">'+
              '<button type="button" data-cact="minus" data-pid="'+p.id+'" aria-label="'+t("ariaDec")+'">−</button>'+
              '<span class="qv">'+c.qty+'</span>'+
              '<button type="button" data-cact="plus" data-pid="'+p.id+'" aria-label="'+t("ariaInc")+'">+</button>'+
            '</div>'+
            '<button type="button" class="remove-link" data-cact="remove" data-pid="'+p.id+'">Remove</button>'+
          '</div>'+
        '</div>'+
      '</div>';
    }).join("");
  }
  document.getElementById("cartItems").addEventListener("click", function(e){
    var el = e.target.closest("[data-cact]");
    if(!el) return;
    var pid = el.getAttribute("data-pid");
    var act = el.getAttribute("data-cact");
    var line = state.cart.find(function(c){return c.id===pid;});
    if(act==="plus" && line){ line.qty++; }
    if(act==="minus" && line){ line.qty = Math.max(1,line.qty-1); }
    if(act==="remove"){ removeFromCart(pid); return; }
    renderCart();
  });

  /* ================= drawer / overlay ================= */
  var overlay = document.getElementById("overlay");
  var drawer = document.getElementById("cartDrawer");
  function openCart(){ drawer.classList.add("open"); overlay.classList.add("show"); }
  function closeCart(){ drawer.classList.remove("open"); if(!anyModalOpen()) overlay.classList.remove("show"); }
  document.getElementById("cartBtn").addEventListener("click", openCart);
  document.getElementById("cartClose").addEventListener("click", closeCart);
  overlay.addEventListener("click", function(){ closeCart(); closeModal("checkoutModal"); closeModal("adminModal"); closeModal("loginModal"); closeModal("careGuideModal"); });

  /* ================= modal helpers ================= */
  function anyModalOpen(){
    return document.getElementById("checkoutModal").classList.contains("show") ||
           document.getElementById("adminModal").classList.contains("show") ||
           document.getElementById("loginModal").classList.contains("show") ||
           document.getElementById("careGuideModal").classList.contains("show");
  }
  function openModal(id){ document.getElementById(id).classList.add("show"); overlay.classList.add("show"); }
  function closeModal(id){
    document.getElementById(id).classList.remove("show");
    if(!drawer.classList.contains("open") && !anyModalOpen()) overlay.classList.remove("show");
  }
  document.querySelectorAll("[data-close]").forEach(function(btn){
    btn.addEventListener("click", function(){ closeModal(btn.getAttribute("data-close")); });
  });

  /* ================= checkout -> whatsapp ================= */
  document.getElementById("checkoutBtn").addEventListener("click", function(){
    if(state.cart.length === 0){ showToast(t("bagEmptyToast")); return; }
    openModal("checkoutModal");
  });

  var giftCheckbox = document.getElementById("custGift");
  var giftMsgField = document.getElementById("giftMsgField");
  giftCheckbox.addEventListener("change", function(){
    giftMsgField.classList.toggle("show", giftCheckbox.checked);
  });

  /* Sends a copy of the order to the shop's inbox via EmailJS. Silently
     no-ops until the placeholders at the top of <head> are filled in with a
     real EmailJS account — this never blocks or interrupts the WhatsApp flow. */
  function sendOrderEmail(orderData, lines, total, giftText){
    try{
      if(!window.emailjs || !window.EMAILJS_PUBLIC_KEY || window.EMAILJS_PUBLIC_KEY.indexOf("YOUR_") === 0) return;
      emailjs.send(window.EMAILJS_SERVICE_ID, window.EMAILJS_TEMPLATE_ID, {
        to_email: window.EMAILJS_TO_EMAIL,
        customer_name: orderData.name,
        customer_phone: orderData.phone1 + (orderData.phone2 ? " / " + orderData.phone2 : ""),
        customer_address: orderData.gov + " — " + orderData.address,
        order_items: lines.join("\n"),
        order_total: total,
        gift_option: giftText,
        order_notes: orderData.notes || "—",
        order_date: new Date().toLocaleString()
      }).catch(function(err){ console.warn("EmailJS send failed", err); });
    }catch(err){ console.warn("EmailJS send skipped", err); }
  }

  document.getElementById("checkoutForm").addEventListener("submit", function(e){
    e.preventDefault();
    var name = document.getElementById("custName").value.trim();
    var phone1 = document.getElementById("custPhone1").value.trim();
    var phone2 = document.getElementById("custPhone2").value.trim();
    var gov = document.getElementById("custGov").value;
    var address = document.getElementById("custAddress").value.trim();
    var notes = document.getElementById("custNotes").value.trim();
    var giftWanted = document.getElementById("custGift").checked;
    var giftMsg = document.getElementById("custGiftMsg").value.trim();

    var lines = state.cart.map(function(c){
      var p = findProduct(c.id);
      return "- " + p.title + "  x" + c.qty + "  -  " + fmtPrice(p.price*c.qty);
    });
    var total = fmtPrice(cartTotal());
    var giftText = giftWanted ? ("Yes" + (giftMsg ? (" — Card: \"" + giftMsg + "\"") : "")) : "No";

    var msg = "New Order - ViBE Pieces\n\n" +
      "Items:\n" + lines.join("\n") + "\n\n" +
      "Total: " + total + "\n\n" +
      "Customer Details:\n" +
      "Name: " + name + "\n" +
      "Phone: " + phone1 + (phone2 ? "\nWhatsApp Phone: " + phone2 : "") + "\n" +
      "Governorate: " + gov + "\n" +
      "Address: " + address + "\n" +
      (notes ? "Notes: " + notes + "\n" : "") +
      "Gift Packaging: " + giftText + "\n";

    var orderData = {
      date: new Date().toISOString(),
      name:name, phone1:phone1, phone2:phone2, gov:gov, address:address, notes:notes,
      gift: giftWanted, giftMessage: giftMsg,
      items: state.cart.map(function(c){ var p=findProduct(c.id); return {title:p.title, qty:c.qty, price:p.price}; }),
      total: cartTotal(),
      createdAt: FB.serverTimestamp()
    };
    FB.addDoc(FB.collection(FB.db, "orders"), orderData).catch(function(err){
      showToast("Could not save order — please try again");
      console.error(err);
    });
    sendOrderEmail(orderData, lines, total, giftText);

    showToast(t("redirectToast"));
    var url = "https://wa.me/201551447040?text=" + encodeURIComponent(msg);
    setTimeout(function(){
      window.open(url, "_blank");
      closeModal("checkoutModal");
      closeCart();
      state.cart = [];
      renderCart();
      e.target.reset();
      giftMsgField.classList.remove("show");
    }, 700);
  });

  /* ================= jewelry care guide ================= */
  document.getElementById("careGuideLink").addEventListener("click", function(e){
    e.preventDefault();
    openModal("careGuideModal");
  });

  /* ================= newsletter ================= */
  document.getElementById("newsletterForm").addEventListener("submit", function(e){
    e.preventDefault();
    showToast(t("subscribedToast"));
    e.target.reset();
  });

  /* ================= mobile nav ================= */
  var mobileNav = document.getElementById("mobileNav");
  document.getElementById("burgerBtn").addEventListener("click", function(){ mobileNav.classList.add("open"); });
  document.getElementById("mobileClose").addEventListener("click", function(){ mobileNav.classList.remove("open"); });
  document.querySelectorAll(".mnav-link").forEach(function(a){
    a.addEventListener("click", function(){ mobileNav.classList.remove("open"); });
  });

  document.getElementById("mnavAdminBtn").addEventListener("click", function(e){
    e.preventDefault();
    mobileNav.classList.remove("open");
    if(auth.loggedIn){
      renderAdmin();
      openModal("adminModal");
    } else {
      document.getElementById("loginError").textContent = "";
      openModal("loginModal");
    }
  });

  /* ================= gramophone audio player ================= */
  var audio = document.getElementById("ambientAudio");
  var gramoBtn = document.getElementById("gramophoneBtn");
  var audioTooltip = document.getElementById("audioTooltip");
  var isPlaying = false;
  var fadeTimer = null;
  var TARGET_VOLUME = 0.55;

  function fadeIn(){
    clearInterval(fadeTimer);
    audio.volume = 0;
    var step = 0.04;
    fadeTimer = setInterval(function(){
      var v = audio.volume + step;
      if(v >= TARGET_VOLUME){ audio.volume = TARGET_VOLUME; clearInterval(fadeTimer); }
      else { audio.volume = v; }
    }, 60);
  }
  function fadeOutAndPause(){
    clearInterval(fadeTimer);
    var step = 0.06;
    fadeTimer = setInterval(function(){
      var v = audio.volume - step;
      if(v <= 0){ audio.volume = 0; clearInterval(fadeTimer); audio.pause(); }
      else { audio.volume = v; }
    }, 45);
  }

  gramoBtn.addEventListener("click", function(){
    if(!isPlaying){
      audio.play().then(function(){
        fadeIn();
        isPlaying = true;
        gramoBtn.classList.add("playing");
        audioTooltip.textContent = "Playing \"Ahwak\" Ambient Vibe 🎵";
      }).catch(function(){
        showToast("Tap again to enable audio");
      });
    } else {
      fadeOutAndPause();
      isPlaying = false;
      gramoBtn.classList.remove("playing");
      audioTooltip.textContent = "Play \"Ahwak\" Ambient Vibe 🎵";
    }
  });

  /* ================= admin: login gate ================= */
  document.getElementById("adminFab").addEventListener("click", function(){
    if(auth.loggedIn){
      renderAdmin();
      openModal("adminModal");
    } else {
      document.getElementById("loginError").textContent = "";
      openModal("loginModal");
    }
  });

  document.getElementById("loginForm").addEventListener("submit", function(e){
    e.preventDefault();
    var email = document.getElementById("loginEmail").value.trim();
    var pass = document.getElementById("loginPassword").value;
    var errEl = document.getElementById("loginError");
    var btn = document.getElementById("loginSubmitBtn");
    errEl.textContent = "";
    btn.disabled = true; btn.textContent = "Logging in…";
    FB.signInWithEmailAndPassword(FB.auth, email, pass).then(function(){
      btn.disabled = false; btn.textContent = "Login";
      e.target.reset();
      closeModal("loginModal");
      renderAdmin();
      openModal("adminModal");
    }).catch(function(err){
      btn.disabled = false; btn.textContent = "Login";
      errEl.textContent = "Incorrect email or password.";
      console.error(err);
    });
  });

  document.getElementById("adminLogoutBtn").addEventListener("click", function(){
    FB.signOut(FB.auth).then(function(){
      closeModal("adminModal");
      showToast("Logged out");
    });
  });

  document.querySelectorAll(".admin-tab").forEach(function(tab){
    tab.addEventListener("click", function(){
      document.querySelectorAll(".admin-tab").forEach(function(t){t.classList.remove("active");});
      tab.classList.add("active");
      state.adminTab = tab.getAttribute("data-tab");
      editingProductId = null;
      renderAdmin();
    });
  });

  /* ================= admin: render ================= */
  var PRODUCT_CATEGORIES = [
    { value:"necklaces", label:"Necklaces (سلاسل)" },
    { value:"rings", label:"Rings (خواتم)" },
    { value:"bracelets", label:"Bracelets (اساور)" },
    { value:"anklets", label:"Anklets (انسيالات)" }
  ];
  var PRODUCT_BADGES = [
    { key:"low-stock", label:"Low Stock" },
    { key:"best-seller", label:"Best Seller" },
    { key:"new", label:"New" }
  ];
  function productFormHTML(p){
    p = p || {};
    var imgs = p.images || [];
    var badges = p.badges || [];
    var cat = p.category || getCategory(p);
    return '<form id="adminAddForm">'+
        '<div class="admin-add-form">'+
          '<div class="field"><label for="npTitle">Title</label><input type="text" id="npTitle" required value="'+(p.title?p.title.replace(/"/g,"&quot;"):"")+'"></div>'+
          '<div class="field"><label for="npPrice">Price (EGP)</label><input type="number" id="npPrice" required min="0" value="'+(p.price!=null?p.price:"")+'"></div>'+
          '<div class="field"><label for="npOldPrice">Old Price (optional)</label><input type="number" id="npOldPrice" min="0" value="'+(p.oldPrice!=null?p.oldPrice:"")+'"></div>'+
          '<div class="field"><label for="npStock">Stock Status</label>'+
            '<select id="npStock"><option value="1"'+(p.stock!==false?" selected":"")+'>In Stock</option><option value="0"'+(p.stock===false?" selected":"")+'>Out of Stock</option></select></div>'+
          '<div class="field"><label for="npCategory">Category *</label><select id="npCategory" required>'+
            PRODUCT_CATEGORIES.map(function(c){ return '<option value="'+c.value+'"'+(cat===c.value?" selected":"")+'>'+c.label+'</option>'; }).join("") +
          '</select></div>'+
          '<div class="field"><label for="npRating">Star Rating (1–5, optional)</label><input type="number" id="npRating" min="1" max="5" step="0.5" value="'+(p.rating!=null?p.rating:"")+'"></div>'+
          '<div class="field full"><label for="npDesc">Description</label><textarea id="npDesc">'+(p.desc||"")+'</textarea></div>'+
          '<div class="field full"><label for="npOptions">Options / Colors (comma-separated)</label><input type="text" id="npOptions" value="'+(p.options?p.options.join(", "):"")+'"></div>'+
          '<div class="field full"><label id="badgesLbl">Badges</label><div class="badge-check-row" role="group" aria-labelledby="badgesLbl">'+
            PRODUCT_BADGES.map(function(b){
              return '<label><input type="checkbox" class="npBadge" value="'+b.key+'"'+(badges.indexOf(b.key)>-1?" checked":"")+'> '+b.label+'</label>';
            }).join("") +
          '</div></div>'+
          '<div class="field full"><label for="npImg1">Image 1 URL (required)</label>'+
            '<input type="text" id="npImg1" '+(p.id?"":"required")+' placeholder="https://i.ibb.co/abc123/photo1.jpg" value="'+(imgs[0]?imgs[0].replace(/"/g,"&quot;"):"")+'"></div>'+
          '<div class="field full"><label for="npImg2">Image 2 URL (optional)</label>'+
            '<input type="text" id="npImg2" placeholder="https://i.ibb.co/.../photo2.jpg" value="'+(imgs[1]?imgs[1].replace(/"/g,"&quot;"):"")+'"></div>'+
          '<div class="field full"><label for="npImg3">Image 3 URL (optional)</label>'+
            '<input type="text" id="npImg3" placeholder="https://i.ibb.co/.../photo3.jpg" value="'+(imgs[2]?imgs[2].replace(/"/g,"&quot;"):"")+'"></div>'+
          (imgs.length ? '<div class="field full"><div class="img-preview-row">'+imgs.map(function(u){return '<img src="'+u+'" alt="">';}).join("")+'</div></div>' : '') +
        '</div>'+
        '<button type="submit" class="btn-primary" id="productSubmitBtn">'+(p.id?"Save Changes":"Add Product")+'</button>'+
        (p.id ? '<button type="button" class="mini-btn" id="cancelEditBtn" style="margin-top:10px;">Cancel</button>' : '') +
      '</form>';
  }

  function renderAdmin(){
    var panel = document.getElementById("adminPanel");
    if(!auth.loggedIn){
      panel.innerHTML = '<div class="admin-gate">Please log in to manage products and orders.</div>';
      return;
    }
    if(state.adminTab === "products"){
      panel.innerHTML = '<table class="admin-table"><thead><tr>'+
        '<th></th><th>Title</th><th>Price (EGP)</th><th>Stock</th><th></th>'+
        '</tr></thead><tbody>'+
        db.products.map(function(p){
          return '<tr>'+
            '<td><img src="'+(p.image||(p.images&&p.images[0])||"")+'" alt="" loading="lazy"></td>'+
            '<td>'+p.title+'</td>'+
            '<td>'+p.price+'</td>'+
            '<td><span class="badge-stock '+(p.stock?"in":"out")+'">'+(p.stock?"In Stock":"Out of Stock")+'</span></td>'+
            '<td>'+
              '<button class="mini-btn" data-aact="toggle" data-pid="'+p.id+'">Toggle</button>'+
              '<button class="mini-btn" data-aact="edit" data-pid="'+p.id+'">Edit</button>'+
              '<button class="mini-btn danger" data-aact="delete" data-pid="'+p.id+'">Delete</button>'+
            '</td>'+
          '</tr>';
        }).join("") +
        '</tbody></table>' +
        (db.products.length===0 ? '<p class="empty-note">No products yet — add one from the "Add Product" tab.</p>' : '');
    } else if(state.adminTab === "add"){
      var editing = editingProductId ? findProduct(editingProductId) : null;
      panel.innerHTML = productFormHTML(editing);
      wireProductForm(editing);
    } else if(state.adminTab === "orders"){
      if(db.orders.length === 0){
        panel.innerHTML = '<p class="empty-note">No orders logged yet. Orders appear here instantly after a customer completes checkout.</p>';
      } else {
        panel.innerHTML = db.orders.map(function(o){
          return '<div class="order-card">'+
            '<div class="oh"><span>'+o.name+'</span><span>'+o.total.toLocaleString()+' EGP</span></div>'+
            '<div class="ol">'+
              o.phone1 + (o.phone2 ? " / " + o.phone2 : "") + '<br>'+
              o.gov + ' — ' + o.address + '<br>'+
              (o.notes ? 'Notes: ' + o.notes + '<br>' : '') +
              o.items.map(function(it){ return it.title + ' × ' + it.qty; }).join(", ") + '<br>'+
              '<em>' + new Date(o.date).toLocaleString() + '</em>'+
            '</div>'+
          '</div>';
        }).join("");
      }
    }
  }

  function wireProductForm(editing){
    document.getElementById("adminAddForm").addEventListener("submit", function(e){
      e.preventDefault();
      var submitBtn = document.getElementById("productSubmitBtn");
      var title = document.getElementById("npTitle").value.trim();
      var price = parseFloat(document.getElementById("npPrice").value) || 0;
      var oldPriceRaw = document.getElementById("npOldPrice").value;
      var oldPrice = oldPriceRaw ? (parseFloat(oldPriceRaw) || null) : null;
      var stock = document.getElementById("npStock").value === "1";
      var category = document.getElementById("npCategory").value;
      var ratingRaw = document.getElementById("npRating").value;
      var rating = ratingRaw ? (parseFloat(ratingRaw) || null) : null;
      var desc = document.getElementById("npDesc").value.trim();
      var options = document.getElementById("npOptions").value.split(",").map(function(s){return s.trim();}).filter(Boolean);
      var badges = Array.prototype.slice.call(document.querySelectorAll(".npBadge:checked")).map(function(el){return el.value;});
      // Up to 3 individual image URL fields (min 1 required for new products).
      var images = [
        document.getElementById("npImg1").value.trim(),
        document.getElementById("npImg2").value.trim(),
        document.getElementById("npImg3").value.trim()
      ].filter(Boolean);

      submitBtn.disabled = true;

      var payload = { title:title, price:price, oldPrice:oldPrice, stock:stock, desc:desc, options:options, category:category, rating:rating, badges:badges };
      if(images.length){ payload.images = images; payload.image = images[0]; }
      var op;
      if(editing){
        op = FB.updateDoc(FB.doc(FB.db, "products", editing.id), payload);
      } else {
        payload.images = payload.images || [];
        payload.image = payload.image || "";
        op = FB.addDoc(FB.collection(FB.db, "products"), payload);
      }
      op.then(function(){
        showToast(editing ? "Product updated" : "Product added");
        submitBtn.disabled = false;
        editingProductId = null;
        document.querySelector('.admin-tab[data-tab="products"]').click();
      }).catch(function(err){
        submitBtn.disabled = false;
        showToast("Save failed — please try again");
        console.error(err);
      });
    });
    var cancelBtn = document.getElementById("cancelEditBtn");
    if(cancelBtn){
      cancelBtn.addEventListener("click", function(){
        editingProductId = null;
        document.querySelector('.admin-tab[data-tab="products"]').click();
      });
    }
  }

  document.getElementById("adminPanel").addEventListener("click", function(e){
    var btn = e.target.closest("[data-aact]");
    if(!btn) return;
    var pid = btn.getAttribute("data-pid");
    var act = btn.getAttribute("data-aact");
    var p = findProduct(pid);
    if(!p) return;
    if(act === "toggle"){
      FB.updateDoc(FB.doc(FB.db, "products", pid), { stock: !p.stock }).catch(function(err){ console.error(err); });
    }
    if(act === "delete"){
      if(confirm('Delete "' + p.title + '"? This cannot be undone.')){
        FB.deleteDoc(FB.doc(FB.db, "products", pid)).catch(function(err){ console.error(err); });
      }
    }
    if(act === "edit"){
      editingProductId = pid;
      document.querySelector('.admin-tab[data-tab="add"]').click();
    }
  });

  /* ================= Firebase: auth + real-time data ================= */
  function seedProductsIfEmpty(snap){
    if(!snap.empty || seedAttempted) return;
    seedAttempted = true;
    PRODUCTS.forEach(function(p){
      FB.addDoc(FB.collection(FB.db, "products"), {
        title: p.name, price: p.price, oldPrice: null, desc: "", options: [],
        stock: true, images: p.images.slice(), image: p.images[0]
      }).catch(function(err){ console.error("seed failed", err); });
    });
  }

  function boot(){
    FB.onAuthStateChanged(FB.auth, function(user){
      auth.loggedIn = !!user;
      auth.user = user;
      document.getElementById("adminLogoutBtn").style.display = user ? "inline-block" : "none";
      if(!user && document.getElementById("adminModal").classList.contains("show")){
        closeModal("adminModal");
      }
      if(user && document.getElementById("adminModal").classList.contains("show")){
        renderAdmin();
      }
    });

    setTimeout(function(){ fallbackToLocalProducts("timeout"); }, FIRESTORE_TIMEOUT_MS);

    FB.onSnapshot(FB.collection(FB.db, "products"), function(snap){
      firstProductsSnapshotReceived = true;
      seedProductsIfEmpty(snap);
      db.products = snap.docs.map(function(d){ return Object.assign({id:d.id}, d.data()); });
      saveProductsCache(db.products);
      renderProducts();
      if(state.adminTab === "products" && document.getElementById("adminModal").classList.contains("show")){
        renderAdmin();
      }
    }, function(err){
      console.error("products listener error", err);
      fallbackToLocalProducts("listener error");
    });

    var ordersQuery = FB.query(FB.collection(FB.db, "orders"), FB.orderBy("date", "desc"));
    FB.onSnapshot(ordersQuery, function(snap){
      db.orders = snap.docs.map(function(d){ return Object.assign({id:d.id}, d.data()); });
      if(state.adminTab === "orders" && document.getElementById("adminModal").classList.contains("show")){
        renderAdmin();
      }
    }, function(err){ console.error("orders listener error", err); });

    populateGovernorates();
    renderCart();
    startSalesToastLoop();
  }

  if(window.FB){ boot(); } else { window.addEventListener("fb-ready", boot, {once:true}); }
})();

/* ================= Lazy-load the "Our Shop" video =================
   It sits far below the fold, so don't download it until the visitor scrolls near it. */
(function(){
  var v = document.querySelector("video[data-lazy-video]");
  if(!v) return;
  function load(){
    var s = v.querySelector("source[data-src]");
    if(!s) return;
    s.src = s.getAttribute("data-src");
    s.removeAttribute("data-src");
    v.load();
    var pr = v.play();
    if(pr && pr.catch) pr.catch(function(){});
  }
  if("IntersectionObserver" in window){
    var io = new IntersectionObserver(function(entries){
      if(entries[0].isIntersecting){ io.disconnect(); load(); }
    }, { rootMargin: "300px" });
    io.observe(v);
  } else { load(); }
})();
