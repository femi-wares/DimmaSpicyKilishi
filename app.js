/**
 * Dimma Spicy Kilishi — Kilishi-first SPA
 * WhatsApp: 08037577304
 */

const WA = "2348037577304";

/** Kilishi-focused catalog — sizes & fractions */
const PRODUCTS = [
  {
    id: 1,
    name: "Spicy Kilishi — 100g",
    desc: "Snack size. Bold spice, premium katara cut.",
    price: 2000,
    category: "Spicy",
    size: "100g",
    img: "images/kilishi2.jpg"
  },
  {
    id: 2,
    name: "Spicy Kilishi — 250g",
    desc: "Popular pack for sharing or daily snacking.",
    price: 4500,
    category: "Spicy",
    size: "250g",
    img: "images/kilishi1.jpg"
  },
  {
    id: 3,
    name: "Spicy Kilishi — 500g",
    desc: "Signature half-kilo. Rich, consistent heat.",
    price: 8500,
    category: "Spicy",
    size: "500g",
    img: "images/kilishi8.jpg"
  },
  {
    id: 4,
    name: "Spicy Kilishi — 1kg",
    desc: "Full kilo for families, gifts & serious fans.",
    price: 16000,
    category: "Spicy",
    size: "1kg",
    img: "images/kilishi3.jpg"
  },
  {
    id: 5,
    name: "Mild Kilishi — 100g",
    desc: "Gentle spice profile. Great for kids & first-timers.",
    price: 1900,
    category: "Mild",
    size: "100g",
    img: "images/counter1.jpg"
  },
  {
    id: 6,
    name: "Mild Kilishi — 250g",
    desc: "Mild flavour, same premium cut quality.",
    price: 4200,
    category: "Mild",
    size: "250g",
    img: "images/kilishi7.jpg"
  },
  {
    id: 7,
    name: "Mild Kilishi — 500g",
    desc: "Half-kilo mild batch. Soft heat, full taste.",
    price: 8000,
    category: "Mild",
    size: "500g",
    img: "images/kilishi6.jpg"
  },
  {
    id: 8,
    name: "Mild Kilishi — 1kg",
    desc: "Bulk mild pack for offices and events.",
    price: 15000,
    category: "Mild",
    size: "1kg",
    img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&q=70&auto=format"
  },
  {
    id: 9,
    name: "Party Pack — 2kg Spicy",
    desc: "Event-ready spicy kilishi. Fresh batch packaging.",
    price: 30000,
    category: "Bulk",
    size: "2kg",
    img: "images/kilishi9.jpg"
  },
  {
    id: 10,
    name: "Party Pack — 2kg Mild",
    desc: "Large mild pack for parties and resellers.",
    price: 28000,
    category: "Bulk",
    size: "2kg",
    img: "https://images.unsplash.com/photo-1432139555190-58524da6c015?w=500&q=70&auto=format"
  },
  {
    id: 11,
    name: "Reseller Bundle — 5kg",
    desc: "Wholesale-friendly. Mixed or single flavour on request.",
    price: 72000,
    category: "Bulk",
    size: "5kg",
    img: "images/kilishi1.jpg"
  },
  {
    id: 12,
    name: "Oven Grilled Goat — 1kg",
    desc: "Tender oven-grilled goat meat, well seasoned.",
    price: 12000,
    category: "Meats",
    size: "1kg",
    img: "images/meat1.jpg"
  },
  {
    id: 13,
    name: "House Spice Mix",
    desc: "The blend behind our signature kilishi taste.",
    price: 3500,
    category: "Extras",
    size: "Pack",
    img: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&q=70&auto=format"
  },
  {
    id: 14,
    name: "Kuli Kuli Pack",
    desc: "Crunchy traditional groundnut snack.",
    price: 2500,
    category: "Extras",
    size: "Pack",
    img: "https://images.unsplash.com/photo-1599599810769-bec8f32730a7?w=500&q=70&auto=format"
  },
  {
    id: 15,
    name: "Live Livestock (Quote)",
    desc: "Live cows & goats for events. WhatsApp for rates.",
    price: 0,
    category: "Livestock",
    size: "Quote",
    img: "images/livestock1.jpg"
  },
  {
    id: 16,
    name: "Dimma oil - 1 Gallon",
    desc: "Dimma fresh oil.",
    price: 45000,
    category: "oil",
    size: "Gallon",
    img: "images/oil1.jpg"
  },
  {
    id: 17,
    name: "Dimma oil - 5 Litres",
    desc: "Dimma fresh oil.",
    price: 13000,
    category: "oil",
    size: "Gallon",
    img: "images/kilishi4.jpg"
  },

];

const PICKS = [3, 4, 9, 7, 11];

let cart = [];
try { cart = JSON.parse(localStorage.getItem("dimma_cart") || "[]"); } catch (_) { cart = []; }

let page = "home";
let filter = "All";
let searchQ = "";
let carouselTimer = null;
let carouselIndex = 0;

function money(n) {
  if (!n) return "Quote";
  return "₦" + Number(n).toLocaleString();
}

function img(src, alt) {
  return `<img src="${src}" alt="${alt || ""}" loading="lazy" decoding="async"
    onerror="this.onerror=null;this.style.display='none';this.parentNode.insertAdjacentHTML('beforeend','<div class=\\'img-fallback\\'><svg width=\\'40\\' height=\\'40\\' viewBox=\\'0 0 24 24\\' fill=\\'none\\' stroke=\\'currentColor\\' stroke-width=\\'1.5\\'><path d=\\'M12 2c4 3 7 6 7 10a7 7 0 11-14 0c0-4 3-7 7-10z\\'/></svg></div>');">`;
}

function saveCart() {
  try { localStorage.setItem("dimma_cart", JSON.stringify(cart)); } catch (_) { }
  updateCartUI();
}

function updateCartUI() {
  const badge = document.getElementById("cartBadge");
  const body = document.getElementById("cartBody");
  const totalEl = document.getElementById("cartTotal");
  if (!badge || !body || !totalEl) return;
  const count = cart.reduce((s, i) => s + i.qty, 0);
  badge.textContent = count;
  badge.style.display = count ? "flex" : "none";
  if (!cart.length) {
    body.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
    totalEl.textContent = "₦0";
    return;
  }
  body.innerHTML = cart.map((item) => `
    <div class="cart-item">
      <div class="cart-item-img">${img(item.img, item.name)}</div>
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <p>${item.size || ""}</p>
        <div class="qty-row">
          <button type="button" onclick="changeQty(${item.id},-1)">−</button>
          <span>${item.qty}</span>
          <button type="button" onclick="changeQty(${item.id},1)">+</button>
        </div>
      </div>
      <div class="cart-item-price">${item.price ? money(item.price * item.qty) : "Quote"}</div>
    </div>`).join("");
  totalEl.textContent = money(cart.reduce((s, i) => s + (i.price || 0) * i.qty, 0));
}

function addToCart(id) {
  const p = PRODUCTS.find((x) => x.id === id);
  if (!p) return;
  if (!p.price) {
    openWA(`Hello Dimma Spicy Kilishi\n\nI'd like a quote for: *${p.name}*\n\nPlease advise on pricing and availability. Thank you!`);
    return;
  }
  const existing = cart.find((c) => c.id === id);
  if (existing) existing.qty += 1;
  else cart.push({ id: p.id, name: p.name, price: p.price, img: p.img, size: p.size, qty: 1 });
  saveCart();
}

function changeQty(id, d) {
  const item = cart.find((c) => c.id === id);
  if (!item) return;
  item.qty += d;
  if (item.qty <= 0) cart = cart.filter((c) => c.id !== id);
  saveCart();
}

function clearCart() {
  cart = [];
  saveCart();
  closeCart();
}

function openCart() {
  document.getElementById("cartDrawer").classList.add("open");
  document.getElementById("cartOverlay").classList.add("open");
}
function closeCart() {
  document.getElementById("cartDrawer").classList.remove("open");
  document.getElementById("cartOverlay").classList.remove("open");
}

function openWA(text) {
  window.open(`https://wa.me/${WA}?text=${encodeURIComponent(text)}`, "_blank");
}

function productCard(p) {
  return `
    <div class="product-card">
      <div class="product-img">
        ${img(p.img, p.name)}
        <span class="product-tag">${p.category}</span>
        <span class="product-size">${p.size}</span>
      </div>
      <div class="product-body">
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <div class="product-foot">
          <span class="price">${p.price ? money(p.price) : "Quote"}</span>
          <button class="btn-add" type="button" onclick="addToCart(${p.id})">${p.price ? "Add" : "Enquire"}</button>
        </div>
      </div>
    </div>`;
}

/* Carousel */
function startCarousel() {
  stopCarousel();
  const track = document.getElementById("carouselTrack");
  if (!track || !track.children.length) return;
  const n = track.children.length;
  carouselIndex = 0;
  carouselTimer = setInterval(() => {
    carouselIndex = (carouselIndex + 1) % n;
    goToSlide(carouselIndex);
  }, 4000);
  const wrap = document.querySelector(".carousel-wrap");
  if (wrap) {
    wrap.onmouseenter = stopCarousel;
    wrap.onmouseleave = startCarousel;
  }
}
function stopCarousel() {
  if (carouselTimer) { clearInterval(carouselTimer); carouselTimer = null; }
}
function goToSlide(i) {
  const track = document.getElementById("carouselTrack");
  if (!track) return;
  const n = track.children.length || 1;
  carouselIndex = ((i % n) + n) % n;
  track.style.transform = `translateX(-${carouselIndex * 100}%)`;
  document.querySelectorAll(".carousel-dot").forEach((d, idx) => d.classList.toggle("active", idx === carouselIndex));
}

function renderHome() {
  const pickItems = PICKS.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean);
  const slides = pickItems.map((m) => `
    <div class="carousel-slide">
      <div class="slide-img">${img(m.img, m.name)}</div>
      <div class="slide-body">
        <span class="tag">${m.category} · ${m.size}</span>
        <h3>${m.name}</h3>
        <p>${m.desc}</p>
        <div style="display:flex;align-items:center;gap:1rem;flex-wrap:wrap">
          <span class="price" style="font-size:1.2rem">${money(m.price)}</span>
          <button class="btn-add" type="button" onclick="addToCart(${m.id})">Add to Cart</button>
        </div>
      </div>
    </div>`).join("");

  const dots = pickItems.map((_, i) =>
    `<button type="button" class="carousel-dot ${i === 0 ? "active" : ""}" onclick="goToSlide(${i})" aria-label="Slide ${i + 1}"></button>`
  ).join("");

  const featured = PRODUCTS.filter((p) => [2, 3, 4, 6, 9, 12].includes(p.id));

  return `
  <section class="hero">
    <div class="hero-inner">
      <div>
        <div class="hero-badge">Queen of Kilishi · Kubwa Abuja</div>
        <h1>Premium Kilishi<br><span>In Every Size</span></h1>
        <p>From 100g snack packs to 5kg reseller bundles : spicy or mild. Fresh batches, consistent quality, delivered with care.</p>
        <div class="hero-actions">
          <button class="btn-primary" data-page="shop">Shop Kilishi</button>
        </div>
      </div>
      <div class="hero-visual">
        ${img("images/hero1.jpg", "Kilishi shop display")}
        <div class="hero-pill">FO1 Market · Kubwa · Nationwide</div>
      </div>
    </div>
  </section>

  <div class="features">
    <div class="feature-card">
      <div class="fi"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg></div>
      <h3>All Sizes</h3>
      <p>100g to 5kg packs</p>
    </div>
    <div class="feature-card">
      <div class="fi"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
      <h3>Premium Cuts</h3>
      <p>Katara & choice beef</p>
    </div>
    <div class="feature-card">
      <div class="fi"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/><circle cx="12" cy="12" r="3"/></svg></div>
      <h3>Spicy or Mild</h3>
      <p>Your heat, your choice</p>
    </div>
    <div class="feature-card">
      <div class="fi"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg></div>
      <h3>Fast Delivery</h3>
      <p>Abuja & nationwide</p>
    </div>
  </div>

  <section class="section">
    <div class="section-head">
      <h2>Shop by Size</h2>
      <p>Clear packs : pick what fits your table or business</p>
      <div class="underline"></div>
    </div>
    <div class="size-bands">
      <button type="button" class="size-band" data-page="shop" onclick="window._sizeJump='100g'">
        <div class="sz">100g</div>
        <div class="label">Snack</div>
        <div class="from">From ₦1,900</div>
      </button>
      <button type="button" class="size-band" data-page="shop" onclick="window._sizeJump='250g'">
        <div class="sz">250g</div>
        <div class="label">Share</div>
        <div class="from">From ₦4,200</div>
      </button>
      <button type="button" class="size-band" data-page="shop" onclick="window._sizeJump='500g'">
        <div class="sz">500g</div>
        <div class="label">Family</div>
        <div class="from">From ₦8,000</div>
      </button>
      <button type="button" class="size-band" data-page="shop" onclick="window._sizeJump='1kg'">
        <div class="sz">1kg+</div>
        <div class="label">Bulk</div>
        <div class="from">From ₦15,000</div>
      </button>
    </div>
  </section>

  <section class="section specials-bg">
    <div class="section-head">
      <h2>Today's Picks</h2>
      <p>Rotating favourites customers keep reordering</p>
      <div class="underline"></div>
    </div>
    <div class="carousel-wrap">
      <button type="button" class="carousel-nav carousel-prev" onclick="goToSlide(carouselIndex-1)" aria-label="Previous">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      <div class="carousel-track" id="carouselTrack">${slides}</div>
      <button type="button" class="carousel-nav carousel-next" onclick="goToSlide(carouselIndex+1)" aria-label="Next">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg>
      </button>
    </div>
    <div class="carousel-dots">${dots}</div>
  </section>

  <section class="section">
    <div class="section-head">
      <h2>Popular Right Now</h2>
      <p>Bestsellers across sizes and flavours</p>
      <div class="underline"></div>
    </div>
    <div class="grid-3">${featured.map(productCard).join("")}</div>
    <div style="text-align:center;margin-top:1.75rem">
      <button class="btn-primary" data-page="shop" style="background:var(--rose);color:#fff">View Full Shop</button>
    </div>
  </section>

  <section class="section" style="padding-top:0">
    <div class="story-block">
      <div class="story-img">
        ${img("images/inside1.jpg", "Production")}
      </div>
      <div class="story-text">
        <h2>Built on Quality Batches</h2>
        <div class="underline" style="margin-left:0"></div>
        <p>Dimma Spicy Kilishi is produced in Kubwa, Abuja with premium cuts and a process refined over years — from backyard beginnings to a proper production setup.</p>
        <p>Every size is packed for freshness. Whether you need a 100g trial or a 5kg reseller order, the standard stays the same.</p>
        <button class="btn-primary" data-page="about" style="background:var(--rose);color:#fff;margin-top:.4rem">Read Our Story</button>
      </div>
    </div>
  </section>

  <div class="cta">
    <h2>Order on WhatsApp</h2>
    <p>Pick your size, add to cart, or message us directly — we confirm fast.</p>
    <button class="btn-primary" type="button" id="ctaWa">Chat on WhatsApp</button>
  </div>`;
}

function renderShop() {
  const cats = ["All", "Spicy", "Mild", "Bulk", "oil", "Meats", "Extras", "Livestock"];
  let list = PRODUCTS.filter((p) => {
    const okCat = filter === "All" || p.category === filter;
    const q = searchQ.toLowerCase();
    const okQ = !q || p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q) || p.size.toLowerCase().includes(q);
    return okCat && okQ;
  });
  if (window._sizeJump) {
    const sz = window._sizeJump;
    window._sizeJump = null;
    if (sz === "1kg") list = PRODUCTS.filter((p) => p.size === "1kg" || p.size === "2kg" || p.size === "5kg");
    else list = PRODUCTS.filter((p) => p.size === sz);
  }

  return `
  <section class="page-hero">
    <div class="label">Catalogue</div>
    <h1>Shop Kilishi</h1>
    <p>Spicy · Mild · Every size priced clearly</p>
  </section>
  <section class="section">
    <div class="search-wrap">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
      <input type="search" id="shopSearch" placeholder="Search by name or size..." value="${searchQ.replace(/"/g, "&quot;")}" />
    </div>
    <div class="chips">
      ${cats.map((c) => `<button type="button" class="chip ${filter === c ? "active" : ""}" data-filter="${c}">${c}</button>`).join("")}
    </div>
    <div class="grid-3">
      ${list.length ? list.map(productCard).join("") : '<p class="empty-msg">No products match.</p>'}
    </div>
  </section>`;
}

function renderAbout() {
  return `
  <section class="page-hero">
    <div class="label">About</div>
    <h1>Our Story</h1>
    <p>Queen of Kilishi</p>
  </section>
  <section class="section">
    <div class="story-block">
      <div class="story-text">
        <h2>Chidimma Blessing Noblelady</h2>
        <div class="underline" style="margin-left:0"></div>
        <p>Founder & CEO of <strong>Dimma Spicy Kilishi</strong> — an agribusiness and food production brand based in Abuja.</p>
        <p>From early hustles to structured production in <strong>Kubwa</strong> and a presence at <strong>FO1 Market</strong>, the brand is built on premium kilishi, clear sizing, and reliable delivery nationwide.</p>
        <p>We specialise in spicy and mild kilishi across snack, family and bulk sizes — plus selected meats, spices and livestock supply on request.</p>
      </div>
      <div class="story-img">
        ${img("images/ceo1.jpg", "Brand")}
      </div>
    </div>
    <div class="section-head" style="margin-top:2.5rem">
      <h2>What We Stand For</h2>
      <div class="underline"></div>
    </div>
    <div class="values">
      <div class="value-card">
        <div class="vi"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
        <h3>Quality</h3>
        <p>Premium cuts and consistent batches in every size.</p>
      </div>
      <div class="value-card">
        <div class="vi"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/><circle cx="12" cy="12" r="3"/></svg></div>
        <h3>Clarity</h3>
        <p>Honest sizes and prices — no guesswork.</p>
      </div>
      <div class="value-card">
        <div class="vi"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg></div>
        <h3>People</h3>
        <p>Customers, staff and distributors grow with us.</p>
      </div>
      <div class="value-card">
        <div class="vi"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg></div>
        <h3>Consistency</h3>
        <p>Same standard from 100g to bulk orders.</p>
      </div>
    </div>
  </section>
  <div class="cta">
    <h2>Bulk or distribution?</h2>
    <p>Reseller bundles and partnerships — message us on WhatsApp.</p>
    <button class="btn-primary" type="button" data-page="contact">Get in Touch</button>
  </div>`;
}

function renderContact() {
  return `
  <section class="page-hero">
    <div class="label">Contact</div>
    <h1>Get in Touch</h1>
    <p>Orders · Bulk · Enquiries</p>
  </section>
  <section class="section">
    <div class="contact-grid">
      <div class="contact-info">
        <h2>We're here</h2>
        <div class="underline" style="margin-left:0;margin-bottom:1rem"></div>
        <p>WhatsApp is the fastest way for orders and quotes.</p>
        <div class="info-row">
          <div class="ii"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg></div>
          <div><h4>Location</h4><span>FO1 Market, Kubwa, Abuja · Production in Kubwa</span></div>
        </div>
        <div class="info-row">
          <div class="ii"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg></div>
          <div><h4>WhatsApp</h4><span>0803 757 7304</span></div>
        </div>
        <div class="info-row">
          <div class="ii"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></svg></div>
          <div><h4>Email</h4><span>Chidimmanoblelady@gmail.com</span></div>
        </div>
        <div class="info-row">
          <div class="ii"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg></div>
          <div><h4>Hours</h4><span>Mon–Sat 9am–7pm · Sunday by appointment</span></div>
        </div>
      </div>
      <form class="contact-form" id="contactForm">
        <div class="form-group"><label>Full Name</label><input type="text" id="cfName" required placeholder="Your name" /></div>
        <div class="form-group"><label>Phone / WhatsApp</label><input type="tel" id="cfPhone" required placeholder="080..." /></div>
        <div class="form-group"><label>Subject</label><input type="text" id="cfSubject" required placeholder="Order / Bulk / Enquiry" /></div>
        <div class="form-group"><label>Message</label><textarea id="cfMessage" required placeholder="Sizes, quantities, delivery..."></textarea></div>
        <button type="submit" class="btn-send">Send via WhatsApp</button>
      </form>
    </div>
  </section>`;
}

const pages = { home: renderHome, shop: renderShop, about: renderAbout, contact: renderContact };

function navigate(name) {
  if (!pages[name]) name = "home";
  page = name;
  stopCarousel();
  document.querySelectorAll(".nav-link, .bn-item").forEach((el) => {
    el.classList.toggle("active", el.dataset.page === name);
  });
  document.title = "Dimma Spicy Kilishi | " + ({ home: "Home", shop: "Shop", about: "Our Story", contact: "Contact" }[name] || "Home");
  const app = document.getElementById("app");
  app.style.opacity = "0";
  setTimeout(() => {
    app.innerHTML = pages[name]();
    app.style.opacity = "1";
    bindPageEvents(name);
    if (name === "home") startCarousel();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, 120);
}

function bindPageEvents(name) {
  if (name === "shop") {
    document.querySelectorAll(".chip").forEach((btn) => {
      btn.addEventListener("click", () => { filter = btn.dataset.filter; navigate("shop"); });
    });
    const search = document.getElementById("shopSearch");
    if (search) {
      search.addEventListener("input", (e) => {
        searchQ = e.target.value;
        clearTimeout(window._st);
        window._st = setTimeout(() => navigate("shop"), 220);
      });
    }
  }
  if (name === "contact") {
    const form = document.getElementById("contactForm");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const n = document.getElementById("cfName").value.trim();
        const phone = document.getElementById("cfPhone").value.trim();
        const subject = document.getElementById("cfSubject").value.trim();
        const message = document.getElementById("cfMessage").value.trim();
        openWA(`Hello Dimma Spicy Kilishi\n\n*Website message*\n\nName: ${n}\nPhone: ${phone}\nSubject: ${subject}\n\n${message}`);
        form.reset();
      });
    }
  }
  if (name === "home") {
    const cta = document.getElementById("ctaWa");
    if (cta) cta.addEventListener("click", () => openWA("Hello Dimma Spicy Kilishi\n\nI'd like to place an order."));
  }
}

let lastY = 0;
function onScroll() {
  const nav = document.getElementById("bottomNav");
  if (!nav || window.innerWidth >= 768) return;
  const y = window.scrollY;
  if (y > lastY && y > 80) nav.classList.add("hide");
  else nav.classList.remove("hide");
  lastY = y;
}

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    const t = e.target.closest("[data-page]");
    if (t) { e.preventDefault(); navigate(t.dataset.page); }
  });
  document.getElementById("floatCart").addEventListener("click", openCart);
  document.getElementById("cartClose").addEventListener("click", closeCart);
  document.getElementById("cartOverlay").addEventListener("click", closeCart);
  document.getElementById("clearCart").addEventListener("click", () => {
    if (cart.length && confirm("Clear cart?")) clearCart();
  });
  document.getElementById("checkoutWa").addEventListener("click", () => {
    if (!cart.length) { alert("Your cart is empty."); return; }
    const lines = cart.map((i) => `• ${i.qty}x ${i.name} – ${i.price ? money(i.price * i.qty) : "Quote"}`);
    const total = cart.reduce((s, i) => s + (i.price || 0) * i.qty, 0);
    openWA(`Hello Dimma Spicy Kilishi\n\nI would like to order:\n\n${lines.join("\n")}\n\n*Total: ${money(total)}*\n\nPlease confirm. Thank you!`);
  });
  window.addEventListener("scroll", onScroll, { passive: true });
  updateCartUI();
  navigate("home");
});

window.addToCart = addToCart;
window.changeQty = changeQty;
window.goToSlide = goToSlide;
window.carouselIndex = 0;
