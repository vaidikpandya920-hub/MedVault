// ===================================================
//  MedVault — Full Pharmacy Platform Engine
// ===================================================

const $ = (id) => document.getElementById(id);

// ======================== USER PROFILE ========================

function getUser() {
    try {
        const u = localStorage.getItem('medvault_user');
        return u ? JSON.parse(u) : null;
    } catch { return null; }
}

function loadUserProfile() {
    const user = getUser();
    if (!user) { window.location.replace('login.html'); return; }

    const firstName = user.firstName || user.name.split(' ')[0] || 'there';
    const fullName  = user.name || 'User';
    const email     = user.email || 'Premium Member';
    const picture   = user.picture || null;

    // Sidebar name & email
    const nameEl  = $('sidebar-user-name');
    const emailEl = $('sidebar-user-email');
    const avatarEl = $('sidebar-avatar');

    if (nameEl)  nameEl.textContent  = fullName;
    if (emailEl) emailEl.textContent = email;

    if (avatarEl) {
        if (picture) {
            avatarEl.innerHTML = `<img src="${picture}" alt="${fullName}" referrerpolicy="no-referrer">`;
        } else {
            // Initials fallback
            const initials = fullName.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
            avatarEl.textContent = initials;
        }
    }

    // Home page greeting
    const homeNameEl = $('home-user-name');
    if (homeNameEl) homeNameEl.textContent = firstName;
}

// Logout
document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = $('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('medvault_user');
            window.location.replace('login.html');
        });
    }
});


const DRUG_DB = {
    ibuprofen:     { halfLife: 2,    dose: 400,  toxicLevel: 800,  name: 'Ibuprofen' },
    acetaminophen: { halfLife: 2.5,  dose: 500,  toxicLevel: 1000, name: 'Acetaminophen' },
    amoxicillin:   { halfLife: 1,    dose: 500,  toxicLevel: 1200, name: 'Amoxicillin' },
    aspirin:       { halfLife: 3.5,  dose: 325,  toxicLevel: 900,  name: 'Aspirin' },
    metformin:     { halfLife: 5,    dose: 500,  toxicLevel: 1500, name: 'Metformin' },
    lisinopril:    { halfLife: 12,   dose: 10,   toxicLevel: 80,   name: 'Lisinopril' },
    atorvastatin:  { halfLife: 14,   dose: 20,   toxicLevel: 200,  name: 'Atorvastatin' },
    diazepam:      { halfLife: 43,   dose: 5,    toxicLevel: 20,   name: 'Diazepam' },
    fluoxetine:    { halfLife: 72,   dose: 20,   toxicLevel: 100,  name: 'Fluoxetine' },
};

const PRODUCTS = [
    { id: 1, name: 'Paracetamol 500mg', desc: 'Fever & pain relief tablets (10 strips)', price: 35, originalPrice: 50, category: 'pain', type: 'otc', emoji: '💊' },
    { id: 2, name: 'Ibuprofen 400mg', desc: 'Anti-inflammatory pain relief (10 tabs)', price: 48, originalPrice: 65, category: 'pain', type: 'otc', emoji: '💊' },
    { id: 3, name: 'Cetirizine 10mg', desc: 'Allergy relief antihistamine (10 tabs)', price: 30, originalPrice: 42, category: 'cold', type: 'otc', emoji: '🤧' },
    { id: 4, name: 'Amoxicillin 500mg', desc: 'Broad-spectrum antibiotic (15 caps)', price: 120, originalPrice: 155, category: 'antibiotics', type: 'rx', emoji: '💉' },
    { id: 5, name: 'Metformin 500mg', desc: 'Type 2 diabetes management (30 tabs)', price: 85, originalPrice: 110, category: 'diabetes', type: 'rx', emoji: '🩸' },
    { id: 6, name: 'Atorvastatin 20mg', desc: 'Cholesterol management (30 tabs)', price: 210, originalPrice: 280, category: 'heart', type: 'rx', emoji: '❤️' },
    { id: 7, name: 'Vitamin D3 1000IU', desc: 'Bone health supplement (60 caps)', price: 320, originalPrice: 450, category: 'vitamins', type: 'otc', emoji: '☀️' },
    { id: 8, name: 'Vitamin B12', desc: 'Energy & nerve support (30 tabs)', price: 180, originalPrice: 225, category: 'vitamins', type: 'otc', emoji: '⚡' },
    { id: 9, name: 'Cough Syrup 100ml', desc: 'Dry & wet cough relief', price: 95, originalPrice: 120, category: 'cold', type: 'otc', emoji: '🍯' },
    { id: 10, name: 'Azithromycin 250mg', desc: 'Macrolide antibiotic (6 tabs)', price: 110, originalPrice: 140, category: 'antibiotics', type: 'rx', emoji: '💊' },
    { id: 11, name: 'Aspirin 75mg', desc: 'Blood thinner & heart protection (30 tabs)', price: 25, originalPrice: 35, category: 'heart', type: 'otc', emoji: '❤️‍🩹' },
    { id: 12, name: 'Insulin Glargine', desc: 'Long-acting insulin pen (3ml)', price: 850, originalPrice: 1100, category: 'diabetes', type: 'rx', emoji: '💉' },
    { id: 13, name: 'Sunscreen SPF 50+', desc: 'UV A/B protection lotion (100ml)', price: 450, originalPrice: 599, category: 'skin', type: 'otc', emoji: '🧴' },
    { id: 14, name: 'Moisturizing Cream', desc: 'Deep hydration formula (200g)', price: 280, originalPrice: 350, category: 'skin', type: 'otc', emoji: '🧴' },
    { id: 15, name: 'Omega-3 Fish Oil', desc: 'Heart & brain health (60 softgels)', price: 520, originalPrice: 699, category: 'vitamins', type: 'otc', emoji: '🐟' },
    { id: 16, name: 'Multivitamin Daily', desc: 'Complete nutrition support (60 tabs)', price: 380, originalPrice: 499, category: 'vitamins', type: 'otc', emoji: '💪' },
    { id: 17, name: 'Nasal Spray', desc: 'Congestion relief saline spray', price: 120, originalPrice: 160, category: 'cold', type: 'otc', emoji: '👃' },
    { id: 18, name: 'Lisinopril 10mg', desc: 'Blood pressure management (30 tabs)', price: 95, originalPrice: 130, category: 'heart', type: 'rx', emoji: '🫀' },
];

const DOCTORS = [
    { id: 1, name: 'Dr. Priya Sharma', specialty: 'Cardiologist', specKey: 'cardio', exp: '15 years exp.', patients: '12,000+', rating: '4.9', fee: 799, gradient: 'linear-gradient(135deg, #6366f1, #06b6d4)', available: true, nextSlot: '5:30 PM Today' },
    { id: 2, name: 'Dr. Rajesh Kumar', specialty: 'General Physician', specKey: 'general', exp: '10 years exp.', patients: '8,500+', rating: '4.8', fee: 399, gradient: 'linear-gradient(135deg, #10b981, #06b6d4)', available: true, nextSlot: '6:00 PM Today' },
    { id: 3, name: 'Dr. Ananya Patel', specialty: 'Dermatologist', specKey: 'derma', exp: '8 years exp.', patients: '6,200+', rating: '4.9', fee: 699, gradient: 'linear-gradient(135deg, #ec4899, #a855f7)', available: true, nextSlot: '7:00 PM Today' },
    { id: 4, name: 'Dr. Vikram Singh', specialty: 'Orthopedic', specKey: 'ortho', exp: '20 years exp.', patients: '15,000+', rating: '4.7', fee: 899, gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)', available: false, nextSlot: '10:00 AM Tomorrow' },
    { id: 5, name: 'Dr. Meera Iyer', specialty: 'Neurologist', specKey: 'neuro', exp: '12 years exp.', patients: '9,800+', rating: '4.8', fee: 999, gradient: 'linear-gradient(135deg, #8b5cf6, #6366f1)', available: true, nextSlot: '4:00 PM Today' },
    { id: 6, name: 'Dr. Arjun Reddy', specialty: 'Pediatrician', specKey: 'pedia', exp: '14 years exp.', patients: '11,000+', rating: '4.9', fee: 499, gradient: 'linear-gradient(135deg, #06b6d4, #10b981)', available: true, nextSlot: '5:00 PM Today' },
    { id: 7, name: 'Dr. Kavita Joshi', specialty: 'Psychiatrist', specKey: 'psycho', exp: '9 years exp.', patients: '4,500+', rating: '4.8', fee: 1299, gradient: 'linear-gradient(135deg, #a855f7, #ec4899)', available: true, nextSlot: '8:00 PM Today' },
    { id: 8, name: 'Dr. Sanjay Mehta', specialty: 'General Physician', specKey: 'general', exp: '18 years exp.', patients: '20,000+', rating: '4.7', fee: 349, gradient: 'linear-gradient(135deg, #10b981, #22d3ee)', available: true, nextSlot: '3:30 PM Today' },
];

const LAB_TESTS = [
    { id: 1, name: 'Complete Blood Count (CBC)', desc: 'Measures red & white blood cells, hemoglobin, platelets', price: 399, time: 'Reports in 6 hours', category: 'blood', emoji: '🩸' },
    { id: 2, name: 'HbA1c Test', desc: 'Average blood sugar over past 3 months', price: 549, time: 'Reports in 12 hours', category: 'diabetes', emoji: '📊' },
    { id: 3, name: 'Thyroid Profile (T3, T4, TSH)', desc: 'Complete thyroid function assessment', price: 699, time: 'Reports in 24 hours', category: 'thyroid', emoji: '🦋' },
    { id: 4, name: 'Lipid Profile', desc: 'Cholesterol, triglycerides, HDL, LDL levels', price: 499, time: 'Reports in 12 hours', category: 'blood', emoji: '❤️' },
    { id: 5, name: 'Liver Function Test (LFT)', desc: 'Bilirubin, ALT, AST, proteins, albumin', price: 649, time: 'Reports in 24 hours', category: 'liver', emoji: '🫁' },
    { id: 6, name: 'Kidney Function Test (KFT)', desc: 'Creatinine, BUN, uric acid, electrolytes', price: 599, time: 'Reports in 24 hours', category: 'kidney', emoji: '🫘' },
    { id: 7, name: 'Fasting Blood Sugar', desc: 'Blood glucose level after 8-hour fast', price: 149, time: 'Reports in 4 hours', category: 'diabetes', emoji: '🍬' },
    { id: 8, name: 'Vitamin D Test', desc: '25-Hydroxy Vitamin D level check', price: 899, time: 'Reports in 24 hours', category: 'blood', emoji: '☀️' },
    { id: 9, name: 'Full Body Checkup', desc: 'Comprehensive 80+ parameter health screening', price: 2499, time: 'Reports in 48 hours', category: 'packages', emoji: '🏥' },
    { id: 10, name: 'Thyroid Antibodies', desc: 'Anti-TPO & Anti-Tg antibody levels', price: 1199, time: 'Reports in 48 hours', category: 'thyroid', emoji: '🔬' },
    { id: 11, name: 'Diabetes Care Package', desc: 'FBS, PP, HbA1c, Lipid, KFT combined panel', price: 1799, time: 'Reports in 24 hours', category: 'packages', emoji: '📋' },
    { id: 12, name: 'Iron Studies', desc: 'Serum iron, ferritin, TIBC levels', price: 799, time: 'Reports in 24 hours', category: 'blood', emoji: '🧲' },
];

const LAB_REPORTS = [
    { id: 1, name: 'Complete Blood Count', date: 'Apr 10, 2026', lab: 'MedVault Labs, Hyderabad', status: 'normal', icon: '🩸' },
    { id: 2, name: 'HbA1c Test', date: 'Apr 5, 2026', lab: 'MedVault Labs, Hyderabad', status: 'attention', icon: '📊' },
    { id: 3, name: 'Lipid Profile', date: 'Mar 28, 2026', lab: 'MedVault Labs, Hyderabad', status: 'normal', icon: '❤️' },
    { id: 4, name: 'Thyroid Profile', date: 'Mar 15, 2026', lab: 'MedVault Labs, Hyderabad', status: 'normal', icon: '🦋' },
    { id: 5, name: 'Liver Function Test', date: 'Feb 20, 2026', lab: 'MedVault Labs, Hyderabad', status: 'critical', icon: '🫁' },
];

const PRESCRIPTIONS = [
    { id: 1, label: 'Dr. Priya Sharma – Cardiology', date: 'Apr 8, 2026', icon: '📋' },
    { id: 2, label: 'Dr. Rajesh Kumar – General', date: 'Mar 22, 2026', icon: '📄' },
    { id: 3, label: 'Dr. Ananya Patel – Dermatology', date: 'Feb 14, 2026', icon: '📝' },
];

// ======================== STATE ========================

let cart = [];
let currentPage = 'home';

// ======================== NAVIGATION ========================

const navItems = document.querySelectorAll('.nav-item');
const pages = document.querySelectorAll('.page');

function navigateTo(pageName) {
    currentPage = pageName;
    navItems.forEach(n => n.classList.remove('active'));
    pages.forEach(p => p.classList.remove('active'));
    const activeNav = document.querySelector(`.nav-item[data-page="${pageName}"]`);
    const activePage = $(`page-${pageName}`);
    if (activeNav) activeNav.classList.add('active');
    if (activePage) activePage.classList.add('active');
    // Close mobile sidebar
    $('sidebar').classList.remove('open');
    window.scrollTo(0, 0);
}

navItems.forEach(item => {
    item.addEventListener('click', () => navigateTo(item.dataset.page));
});

// Quick actions
document.querySelectorAll('.quick-action-card').forEach(card => {
    card.addEventListener('click', () => navigateTo(card.dataset.goto));
});

// Mobile hamburger
$('hamburger-btn').addEventListener('click', () => {
    $('sidebar').classList.toggle('open');
});

// Mobile cart
$('mobile-cart-btn').addEventListener('click', () => {
    navigateTo('shop');
    openCart();
});

// ======================== TOAST ========================

function showToast(message, type = 'info') {
    const container = $('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icons = { success: '✅', info: 'ℹ️', warning: '⚠️' };
    toast.innerHTML = `<span>${icons[type] || 'ℹ️'}</span> ${message}`;
    container.appendChild(toast);
    setTimeout(() => {
        toast.classList.add('removing');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ======================== SHOP ========================

function renderProducts(filter = 'all', searchQuery = '') {
    const grid = $('products-grid');
    let filtered = PRODUCTS;
    if (filter !== 'all') filtered = filtered.filter(p => p.category === filter);
    if (searchQuery) {
        const q = searchQuery.toLowerCase();
        filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q));
    }

    grid.innerHTML = filtered.map(p => {
        const inCart = cart.find(c => c.id === p.id);
        return `
        <div class="product-card" data-id="${p.id}">
            <div class="product-image">
                ${p.emoji}
                <span class="product-tag ${p.type}">${p.type === 'rx' ? 'Rx' : 'OTC'}</span>
            </div>
            <div class="product-body">
                <div class="product-name">${p.name}</div>
                <div class="product-desc">${p.desc}</div>
                <div class="product-footer">
                    <div>
                        <span class="product-price">₹${p.price}</span>
                        <span class="product-original-price">₹${p.originalPrice}</span>
                    </div>
                    <button class="btn-add-cart ${inCart ? 'added' : ''}" data-id="${p.id}">
                        ${inCart ? '✓ Added' : '+ Add'}
                    </button>
                </div>
            </div>
        </div>`;
    }).join('');

    // Attach add-to-cart handlers
    grid.querySelectorAll('.btn-add-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            addToCart(parseInt(btn.dataset.id));
        });
    });
}

function addToCart(productId) {
    const existing = cart.find(c => c.id === productId);
    if (existing) {
        existing.qty++;
    } else {
        const product = PRODUCTS.find(p => p.id === productId);
        cart.push({ ...product, qty: 1 });
    }
    updateCartBadge();
    renderProducts(getCurrentShopFilter(), $('shop-search-input').value);
    showToast('Added to cart!', 'success');
}

function updateCartBadge() {
    const total = cart.reduce((sum, c) => sum + c.qty, 0);
    $('cart-badge').textContent = total;
    $('cart-badge').classList.toggle('hidden', total === 0);
    $('mobile-cart-badge').textContent = total;
    $('mobile-cart-badge').classList.toggle('hidden', total === 0);
    $('cart-count-inline').textContent = total;
}

function getCurrentShopFilter() {
    const active = document.querySelector('#category-chips .chip.active');
    return active ? active.dataset.cat : 'all';
}

// Category chips
$('category-chips').addEventListener('click', (e) => {
    if (e.target.classList.contains('chip')) {
        document.querySelectorAll('#category-chips .chip').forEach(c => c.classList.remove('active'));
        e.target.classList.add('active');
        renderProducts(e.target.dataset.cat, $('shop-search-input').value);
    }
});

// Search
$('shop-search-input').addEventListener('input', (e) => {
    renderProducts(getCurrentShopFilter(), e.target.value);
});

// Cart sidebar
function openCart() {
    $('cart-overlay').classList.remove('hidden');
    $('cart-sidebar').classList.remove('hidden');
    renderCartItems();
}

function closeCart() {
    $('cart-overlay').classList.add('hidden');
    $('cart-sidebar').classList.add('hidden');
}

$('view-cart-btn').addEventListener('click', openCart);
$('close-cart-btn').addEventListener('click', closeCart);
$('cart-overlay').addEventListener('click', closeCart);

function renderCartItems() {
    const itemsEl = $('cart-items');
    const footerEl = $('cart-footer');
    const emptyEl = $('cart-empty');

    if (cart.length === 0) {
        emptyEl.classList.remove('hidden');
        footerEl.classList.add('hidden');
        return;
    }

    emptyEl.classList.add('hidden');
    footerEl.classList.remove('hidden');

    const cartHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-icon">${item.emoji}</div>
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">₹${item.price} each</div>
            </div>
            <div class="cart-item-qty">
                <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
                <span class="qty-count">${item.qty}</span>
                <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
            </div>
        </div>
    `).join('');

    // Inject before the empty div
    const existingItems = itemsEl.querySelectorAll('.cart-item');
    existingItems.forEach(el => el.remove());
    emptyEl.insertAdjacentHTML('beforebegin', cartHTML);

    const total = cart.reduce((sum, c) => sum + c.price * c.qty, 0);
    $('cart-total-amount').textContent = `₹${total}`;
}

window.changeQty = function(id, delta) {
    const item = cart.find(c => c.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) cart = cart.filter(c => c.id !== id);
    updateCartBadge();
    renderCartItems();
    renderProducts(getCurrentShopFilter(), $('shop-search-input').value);
};

$('checkout-btn').addEventListener('click', () => {
    const total = cart.reduce((sum, c) => sum + c.price * c.qty, 0);
    showToast(`Order placed! Total: ₹${total}. Delivery in 30 min.`, 'success');
    cart = [];
    updateCartBadge();
    closeCart();
    renderProducts(getCurrentShopFilter());
});

// ======================== DOCTORS ========================

function renderDoctors(filter = 'all', searchQuery = '') {
    const grid = $('doctors-grid');
    let filtered = DOCTORS;
    if (filter !== 'all') filtered = filtered.filter(d => d.specKey === filter);
    if (searchQuery) {
        const q = searchQuery.toLowerCase();
        filtered = filtered.filter(d => d.name.toLowerCase().includes(q) || d.specialty.toLowerCase().includes(q));
    }

    grid.innerHTML = filtered.map(d => `
        <div class="doctor-card">
            <div class="doctor-top">
                <div class="doc-avatar" style="background: ${d.gradient}">${d.name.split(' ').map(n => n[0]).slice(0, 2).join('')}</div>
                <div class="doc-info">
                    <div class="doc-name">${d.name}</div>
                    <div class="doc-specialty">${d.specialty}</div>
                    <div class="doc-exp">${d.exp}</div>
                </div>
                <div class="doc-fee">₹${d.fee}</div>
            </div>
            <div class="doc-stats">
                <div class="doc-stat"><div class="doc-stat-val">${d.patients}</div><div class="doc-stat-label">Patients</div></div>
                <div class="doc-stat"><div class="doc-stat-val">⭐ ${d.rating}</div><div class="doc-stat-label">Rating</div></div>
                <div class="doc-stat"><div class="doc-stat-val">${d.available ? '🟢' : '🔴'}</div><div class="doc-stat-label">${d.available ? 'Available' : 'Busy'}</div></div>
            </div>
            <div class="doc-actions">
                <button class="btn-consult video" onclick="bookAppointment(${d.id}, 'video')">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="23,7 16,12 23,17"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>
                    Video Call
                </button>
                <button class="btn-consult chat" onclick="bookAppointment(${d.id}, 'chat')">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    Chat
                </button>
            </div>
        </div>
    `).join('');
}

window.bookAppointment = function(docId, type) {
    const doc = DOCTORS.find(d => d.id === docId);
    if (!doc) return;

    const modal = $('appointment-modal');
    const body = $('appointment-modal-body');

    body.innerHTML = `
        <div style="text-align:center; margin-bottom: 20px;">
            <div class="doc-avatar" style="background: ${doc.gradient}; width: 64px; height: 64px; font-size: 22px; margin: 0 auto 12px; border-radius: 50%;">${doc.name.split(' ').map(n => n[0]).slice(0, 2).join('')}</div>
            <h3 style="font-size: 16px; font-weight: 700;">${doc.name}</h3>
            <p style="font-size: 12px; color: var(--text-secondary);">${doc.specialty} • ${type === 'video' ? '📹 Video Call' : '💬 Chat'}</p>
        </div>
        <div class="form-group">
            <label>Select Date</label>
            <input type="date" class="input-field" id="appt-date" value="${new Date().toISOString().split('T')[0]}">
        </div>
        <div class="form-group">
            <label>Select Time Slot</label>
            <select class="input-field" id="appt-time">
                <option>3:00 PM</option><option>3:30 PM</option><option>4:00 PM</option>
                <option>4:30 PM</option><option selected>5:00 PM</option><option>5:30 PM</option>
                <option>6:00 PM</option><option>7:00 PM</option><option>8:00 PM</option>
            </select>
        </div>
        <div class="form-group">
            <label>Describe your symptoms (optional)</label>
            <textarea class="input-field" rows="3" placeholder="Brief description of your concern..." style="font-family: var(--font-sans); resize: vertical;"></textarea>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; padding: 12px; background: rgba(16,185,129,0.06); border-radius: var(--radius-md); border: 1px solid rgba(16,185,129,0.15);">
            <span style="font-size: 13px; color: var(--text-secondary);">Consultation Fee</span>
            <span style="font-size: 20px; font-weight: 800; color: var(--accent-green); font-family: var(--font-mono);">₹${doc.fee}</span>
        </div>
        <button class="btn-primary" onclick="confirmAppointment('${doc.name}')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22,4 12,14.01 9,11.01"/></svg>
            Confirm Booking — ₹${doc.fee}
        </button>
    `;

    modal.classList.remove('hidden');
};

window.confirmAppointment = function(docName) {
    $('appointment-modal').classList.add('hidden');
    showToast(`Appointment booked with ${docName}!`, 'success');
};

$('close-appointment-modal').addEventListener('click', () => {
    $('appointment-modal').classList.add('hidden');
});

$('appointment-modal').addEventListener('click', (e) => {
    if (e.target === $('appointment-modal')) $('appointment-modal').classList.add('hidden');
});

// Doctor filter chips
$('speciality-chips').addEventListener('click', (e) => {
    if (e.target.classList.contains('chip')) {
        document.querySelectorAll('#speciality-chips .chip').forEach(c => c.classList.remove('active'));
        e.target.classList.add('active');
        renderDoctors(e.target.dataset.spec, $('doctor-search-input').value);
    }
});

$('doctor-search-input').addEventListener('input', (e) => {
    const activeSpec = document.querySelector('#speciality-chips .chip.active');
    renderDoctors(activeSpec ? activeSpec.dataset.spec : 'all', e.target.value);
});

// ======================== LAB TESTS ========================

function renderLabTests(filter = 'all') {
    const grid = $('tests-grid');
    let filtered = LAB_TESTS;
    if (filter !== 'all') filtered = filtered.filter(t => t.category === filter);

    grid.innerHTML = filtered.map(t => `
        <div class="test-card">
            <div class="test-icon">${t.emoji}</div>
            <div class="test-name">${t.name}</div>
            <div class="test-desc">${t.desc}</div>
            <div class="test-meta">
                <span class="test-price">₹${t.price}</span>
                <span class="test-time">🕐 ${t.time}</span>
            </div>
            <button class="btn-book-test" onclick="bookLabTest(${t.id})">🧪 Book Now — Home Collection</button>
        </div>
    `).join('');
}

window.bookLabTest = function(testId) {
    const test = LAB_TESTS.find(t => t.id === testId);
    if (!test) return;

    const modal = $('test-booking-modal');
    const body = $('test-modal-body');

    body.innerHTML = `
        <div style="text-align: center; padding: 16px 0; margin-bottom: 16px; border-bottom: 1px solid var(--border-subtle);">
            <div style="font-size: 36px; margin-bottom: 8px;">${test.emoji}</div>
            <h3 style="font-size: 16px; font-weight: 700;">${test.name}</h3>
            <p style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">${test.desc}</p>
        </div>
        <div class="form-group">
            <label>Collection Date</label>
            <input type="date" class="input-field" value="${new Date().toISOString().split('T')[0]}">
        </div>
        <div class="form-group">
            <label>Preferred Time Slot</label>
            <select class="input-field">
                <option>6:00 AM - 8:00 AM (Fasting)</option>
                <option selected>8:00 AM - 10:00 AM</option>
                <option>10:00 AM - 12:00 PM</option>
                <option>2:00 PM - 4:00 PM</option>
            </select>
        </div>
        <div class="form-group">
            <label>Collection Address</label>
            <input type="text" class="input-field" placeholder="Your home address" value="123 Main Street, Hyderabad">
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; padding: 12px; background: rgba(168,85,247,0.06); border-radius: var(--radius-md); border: 1px solid rgba(168,85,247,0.15);">
            <span style="font-size: 13px; color: var(--text-secondary);">Test Fee</span>
            <span style="font-size: 20px; font-weight: 800; color: var(--accent-purple); font-family: var(--font-mono);">₹${test.price}</span>
        </div>
        <button class="btn-primary" style="background: var(--gradient-purple);" onclick="confirmTestBooking('${test.name}')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22,4 12,14.01 9,11.01"/></svg>
            Confirm Booking
        </button>
        <p style="font-size: 11px; color: var(--text-muted); text-align: center; margin-top: 10px;">🏠 Free home sample collection • ${test.time}</p>
    `;

    modal.classList.remove('hidden');
};

window.confirmTestBooking = function(testName) {
    $('test-booking-modal').classList.add('hidden');
    showToast(`${testName} booked! Phlebotomist will arrive as scheduled.`, 'success');
};

$('close-test-modal').addEventListener('click', () => $('test-booking-modal').classList.add('hidden'));
$('test-booking-modal').addEventListener('click', (e) => {
    if (e.target === $('test-booking-modal')) $('test-booking-modal').classList.add('hidden');
});

// Test category chips
$('test-category-chips').addEventListener('click', (e) => {
    if (e.target.classList.contains('chip')) {
        document.querySelectorAll('#test-category-chips .chip').forEach(c => c.classList.remove('active'));
        e.target.classList.add('active');
        renderLabTests(e.target.dataset.tcat);
    }
});

// Lab tabs
document.querySelectorAll('.lab-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.lab-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.lab-panel').forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        $(`lab-panel-${tab.dataset.labtab}`).classList.add('active');
    });
});

function renderLabReports() {
    const list = $('reports-list');
    list.innerHTML = LAB_REPORTS.map(r => `
        <div class="report-card">
            <div class="report-icon ${r.status}">${r.icon}</div>
            <div class="report-info">
                <div class="report-name">${r.name}</div>
                <div class="report-date">${r.date}</div>
                <div class="report-lab">${r.lab}</div>
            </div>
            <span class="report-status ${r.status}">${r.status === 'normal' ? '✓ Normal' : r.status === 'attention' ? '⚠ Attention' : '⚠ Critical'}</span>
            <button class="btn-download" onclick="showToast('Report downloaded!', 'success')">📥 Download</button>
        </div>
    `).join('');
}

// ======================== PRESCRIPTIONS ========================

function renderPrescriptions() {
    const list = $('prescriptions-list');
    list.innerHTML = PRESCRIPTIONS.map(p => `
        <div class="prescription-item">
            <div class="rx-icon">${p.icon}</div>
            <div class="rx-info">
                <div class="rx-label">${p.label}</div>
                <div class="rx-date">${p.date}</div>
            </div>
            <button class="btn-reorder" onclick="showToast('Reorder placed for prescription #${p.id}!', 'success')">🔄 Reorder</button>
        </div>
    `).join('');
}

// Upload zone
const uploadZone = $('upload-zone');
const fileInput = $('prescription-file-input');

$('browse-files-btn').addEventListener('click', () => fileInput.click());
uploadZone.addEventListener('click', () => fileInput.click());

uploadZone.addEventListener('dragover', (e) => { e.preventDefault(); uploadZone.classList.add('dragover'); });
uploadZone.addEventListener('dragleave', () => uploadZone.classList.remove('dragover'));
uploadZone.addEventListener('drop', (e) => {
    e.preventDefault(); uploadZone.classList.remove('dragover');
    if (e.dataTransfer.files.length) handleFileUpload(e.dataTransfer.files[0]);
});

fileInput.addEventListener('change', () => {
    if (fileInput.files.length) handleFileUpload(fileInput.files[0]);
});

function handleFileUpload(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        $('preview-image').src = e.target.result;
        uploadZone.classList.add('hidden');
        $('upload-preview').classList.remove('hidden');
    };
    reader.readAsDataURL(file);
}

$('cancel-upload-btn').addEventListener('click', () => {
    uploadZone.classList.remove('hidden');
    $('upload-preview').classList.add('hidden');
    fileInput.value = '';
});

$('save-prescription-btn').addEventListener('click', () => {
    const label = $('prescription-label').value || `Prescription – ${new Date().toLocaleDateString()}`;
    PRESCRIPTIONS.unshift({ id: Date.now(), label, date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), icon: '📋' });
    renderPrescriptions();
    uploadZone.classList.remove('hidden');
    $('upload-preview').classList.add('hidden');
    $('prescription-label').value = '';
    fileInput.value = '';
    showToast('Prescription saved successfully!', 'success');
});

// ======================== GLOBAL SEARCH ========================

$('global-search-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const q = e.target.value.toLowerCase().trim();
        if (!q) return;
        // Try to route to the most relevant page
        if (['medicine', 'drug', 'tablet', 'capsule', 'order', 'buy', 'shop'].some(k => q.includes(k))) {
            navigateTo('shop');
            $('shop-search-input').value = q;
            renderProducts('all', q);
        } else if (['doctor', 'consult', 'appointment', 'specialist'].some(k => q.includes(k))) {
            navigateTo('doctors');
        } else if (['test', 'lab', 'blood', 'report', 'checkup'].some(k => q.includes(k))) {
            navigateTo('lab');
        } else if (['dose', 'timer', 'half-life', 'schedule'].some(k => q.includes(k))) {
            navigateTo('dose-timer');
        } else if (['toxic', 'accumulation', 'safety'].some(k => q.includes(k))) {
            navigateTo('toxicity');
        } else {
            navigateTo('shop');
            $('shop-search-input').value = q;
            renderProducts('all', q);
        }
    }
});

// ======================== DOSE TIMER ========================

$('drug-select').addEventListener('change', () => {
    const key = $('drug-select').value;
    if (key !== 'custom' && DRUG_DB[key]) {
        $('half-life').value = DRUG_DB[key].halfLife;
        $('dose-amount').value = DRUG_DB[key].dose;
    }
});

$('metabolism-rate').addEventListener('input', () => {
    $('metabolism-value').textContent = `${parseFloat($('metabolism-rate').value).toFixed(2)}×`;
});

function calculateDoseTiming() {
    const halfLife = parseFloat($('half-life').value);
    const dose = parseFloat($('dose-amount').value);
    const timeSince = parseFloat($('time-since-dose').value);
    const targetPercent = parseFloat($('target-level').value) / 100;
    const metabolism = parseFloat($('metabolism-rate').value);
    if (!halfLife || !dose || isNaN(timeSince) || !targetPercent) return;

    const effectiveHL = halfLife / metabolism;
    const k = Math.LN2 / effectiveHL;
    const currentFraction = Math.exp(-k * timeSince);
    const currentLevel = dose * currentFraction;

    let timeToNextDose = 0;
    if (currentFraction > targetPercent) {
        timeToNextDose = (-Math.log(targetPercent) / k) - timeSince;
        if (timeToNextDose < 0) timeToNextDose = 0;
    }

    $('dose-result-placeholder').classList.add('hidden');
    $('dose-result-content').classList.remove('hidden');

    const display = $('next-dose-display');
    if (timeToNextDose <= 0) {
        $('next-dose-time').textContent = 'Take Now';
        $('next-dose-sublabel').textContent = 'Drug level is below effective threshold';
        display.classList.add('immediate');
    } else {
        const h = Math.floor(timeToNextDose), m = Math.round((timeToNextDose - h) * 60);
        $('next-dose-time').textContent = h > 0 && m > 0 ? `${h}h ${m}m` : h > 0 ? `${h} hours` : `${m} minutes`;
        $('next-dose-sublabel').textContent = 'for optimal effect';
        display.classList.remove('immediate');
    }

    $('stat-current-level').textContent = `${(currentFraction * 100).toFixed(1)}%`;
    $('stat-effective-hl').textContent = `${effectiveHL.toFixed(1)} hrs`;
    $('stat-elim-rate').textContent = `${(k * 100).toFixed(2)}% / hr`;
    $('stat-drug-remaining').textContent = `${currentLevel.toFixed(1)} mg`;

    drawDecayChart(dose, effectiveHL, timeSince, targetPercent);
}

function drawDecayChart(dose, effectiveHL, timeSince, targetPercent) {
    const canvas = $('decay-chart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = 220 * dpr;
    ctx.scale(dpr, dpr);

    const W = canvas.offsetWidth, H = 220;
    const pad = { top: 20, right: 20, bottom: 40, left: 50 };
    const plotW = W - pad.left - pad.right, plotH = H - pad.top - pad.bottom;
    ctx.clearRect(0, 0, W, H);

    const k = Math.LN2 / effectiveHL;
    const totalTime = effectiveHL * 5;
    const targetLevel = targetPercent * 100;

    // Grid
    ctx.strokeStyle = 'rgba(99,102,241,0.06)'; ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) { const y = pad.top + (plotH/4)*i; ctx.beginPath(); ctx.moveTo(pad.left,y); ctx.lineTo(pad.left+plotW,y); ctx.stroke(); }

    ctx.fillStyle = '#555876'; ctx.font = '11px Inter,sans-serif';
    ctx.textAlign = 'right';
    for (let i = 0; i <= 4; i++) { ctx.fillText(`${(100-(100/4)*i).toFixed(0)}%`, pad.left-8, pad.top+(plotH/4)*i+4); }
    ctx.textAlign = 'center';
    for (let i = 0; i <= 5; i++) { ctx.fillText(`${((totalTime/5)*i).toFixed(1)}h`, pad.left+(plotW/5)*i, H-pad.bottom+20); }

    // Target line
    const targetY = pad.top + plotH * (1 - targetLevel/100);
    ctx.setLineDash([6,4]); ctx.strokeStyle = 'rgba(245,158,11,0.5)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(pad.left,targetY); ctx.lineTo(pad.left+plotW,targetY); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle='#f59e0b'; ctx.font='10px Inter,sans-serif'; ctx.textAlign='left';
    ctx.fillText(`Min (${(targetPercent*100).toFixed(0)}%)`, pad.left+4, targetY-6);

    // "Now" marker
    if (timeSince > 0 && timeSince < totalTime) {
        const nx = pad.left + (timeSince/totalTime)*plotW;
        ctx.setLineDash([4,3]); ctx.strokeStyle='rgba(168,85,247,0.5)'; ctx.lineWidth=1.5;
        ctx.beginPath(); ctx.moveTo(nx,pad.top); ctx.lineTo(nx,pad.top+plotH); ctx.stroke();
        ctx.setLineDash([]); ctx.fillStyle='#a855f7'; ctx.font='10px Inter,sans-serif'; ctx.textAlign='center';
        ctx.fillText('Now',nx,pad.top-6);
    }

    // Curve
    const grad = ctx.createLinearGradient(pad.left,0,pad.left+plotW,0);
    grad.addColorStop(0,'#6366f1'); grad.addColorStop(0.5,'#06b6d4'); grad.addColorStop(1,'#10b981');
    ctx.strokeStyle = grad; ctx.lineWidth = 2.5; ctx.lineJoin = 'round'; ctx.beginPath();
    for (let i = 0; i <= 200; i++) {
        const t=(totalTime/200)*i, lev=100*Math.exp(-k*t);
        const x=pad.left+(t/totalTime)*plotW, y=pad.top+plotH*(1-lev/100);
        i===0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
    }
    ctx.stroke();
    ctx.lineTo(pad.left+plotW, pad.top+plotH); ctx.lineTo(pad.left, pad.top+plotH); ctx.closePath();
    const fg = ctx.createLinearGradient(0,pad.top,0,pad.top+plotH);
    fg.addColorStop(0,'rgba(99,102,241,0.1)'); fg.addColorStop(1,'rgba(99,102,241,0)');
    ctx.fillStyle=fg; ctx.fill();
}

$('calculate-dose-btn').addEventListener('click', calculateDoseTiming);

// ======================== TOXICITY ========================

$('tox-drug-select').addEventListener('change', () => {
    const key = $('tox-drug-select').value;
    if (key !== 'custom' && DRUG_DB[key]) {
        $('tox-half-life').value = DRUG_DB[key].halfLife;
        $('tox-dose').value = DRUG_DB[key].dose;
        $('tox-toxic-level').value = DRUG_DB[key].toxicLevel;
    }
});

function calculateToxicity() {
    const halfLife = parseFloat($('tox-half-life').value);
    const doseMg = parseFloat($('tox-dose').value);
    const interval = parseFloat($('tox-interval').value);
    const numDoses = parseInt($('tox-doses').value);
    const toxicLevel = parseFloat($('tox-toxic-level').value);
    const metabolism = parseFloat($('tox-metabolism').value);
    if (!halfLife || !doseMg || !interval || !numDoses || !toxicLevel) return;

    const effectiveHL = halfLife / metabolism;
    const k = Math.LN2 / effectiveHL;
    const fractionRemaining = Math.exp(-k * interval);
    const accumFactor = 1 / (1 - fractionRemaining);
    const steadyStatePeak = doseMg * accumFactor;
    const timeToSteady = effectiveHL * 4.5;

    const totalTime = interval * numDoses + effectiveHL * 2;
    const resolution = 300;
    const dt = totalTime / resolution;
    const timePoints = [], levels = [];
    let peak = 0;

    for (let i = 0; i <= resolution; i++) {
        const t = dt * i;
        timePoints.push(t);
        let level = 0;
        for (let d = 0; d < numDoses; d++) {
            const doseTime = d * interval;
            if (t >= doseTime) level += doseMg * Math.exp(-k * (t - doseTime));
        }
        levels.push(level);
        if (level > peak) peak = level;
    }

    const peakRatio = peak / toxicLevel;
    let status, sTitle, sDesc;
    if (peakRatio < 0.6) {
        status='safe'; sTitle='✅ Safe to Take Next Dose';
        sDesc=`Peak stays at ${(peakRatio*100).toFixed(0)}% of toxic threshold.`;
    } else if (peakRatio < 0.85) {
        status='warning'; sTitle='⚠️ Caution — Approaching Limits';
        sDesc=`Accumulation reaches ${(peakRatio*100).toFixed(0)}% of toxic threshold. Consider adjusting schedule.`;
    } else {
        status='danger'; sTitle='🚨 Toxic Levels Approaching';
        sDesc=`Peak reaches ${(peakRatio*100).toFixed(0)}% of toxic threshold! ${peak > toxicLevel ? 'EXCEEDS safe levels.' : 'Very close to exceeding.'} Consult your healthcare provider.`;
    }

    $('tox-result-placeholder').classList.add('hidden');
    $('tox-result-content').classList.remove('hidden');
    $('safety-banner').className = `safety-banner ${status}`;
    $('safety-title').textContent = sTitle;
    $('safety-desc').textContent = sDesc;
    $('stat-peak-accum').textContent = `${peak.toFixed(1)} mg`;
    $('stat-steady-state').textContent = `${steadyStatePeak.toFixed(1)} mg`;
    $('stat-accum-factor').textContent = `${accumFactor.toFixed(2)}×`;
    $('stat-time-steady').textContent = `${timeToSteady.toFixed(1)} hrs`;

    drawAccumulationChart(timePoints, levels, toxicLevel, numDoses, interval, doseMg, k);
}

function drawAccumulationChart(timePoints, levels, toxicLevel, numDoses, interval, doseMg, k) {
    const canvas = $('accumulation-chart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = 250 * dpr;
    ctx.scale(dpr, dpr);

    const W = canvas.offsetWidth, H = 250;
    const pad = { top: 20, right: 20, bottom: 40, left: 55 };
    const plotW = W - pad.left - pad.right, plotH = H - pad.top - pad.bottom;
    ctx.clearRect(0, 0, W, H);

    const maxTime = timePoints[timePoints.length - 1];
    const maxLevel = Math.max(...levels, toxicLevel) * 1.15;

    ctx.strokeStyle = 'rgba(99,102,241,0.05)'; ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) { const y=pad.top+(plotH/5)*i; ctx.beginPath(); ctx.moveTo(pad.left,y); ctx.lineTo(pad.left+plotW,y); ctx.stroke(); }

    ctx.fillStyle='#555876'; ctx.font='11px Inter,sans-serif';
    ctx.textAlign='right';
    for (let i=0;i<=5;i++) { ctx.fillText(`${(maxLevel-(maxLevel/5)*i).toFixed(0)}`,pad.left-8,pad.top+(plotH/5)*i+4); }
    ctx.textAlign='center';
    for (let i=0;i<=6;i++) { ctx.fillText(`${((maxTime/6)*i).toFixed(0)}h`,pad.left+(plotW/6)*i,H-pad.bottom+20); }

    // Toxic line
    const ty = pad.top + plotH * (1 - toxicLevel/maxLevel);
    ctx.setLineDash([8,4]); ctx.strokeStyle='rgba(239,68,68,0.5)'; ctx.lineWidth=2;
    ctx.beginPath(); ctx.moveTo(pad.left,ty); ctx.lineTo(pad.left+plotW,ty); ctx.stroke();
    ctx.setLineDash([]); ctx.fillStyle='#ef4444'; ctx.font='bold 10px Inter,sans-serif'; ctx.textAlign='right';
    ctx.fillText(`Toxic (${toxicLevel} mg)`,pad.left+plotW-4,ty-6);

    // Fill
    ctx.beginPath();
    for (let i=0;i<timePoints.length;i++) {
        const x=pad.left+(timePoints[i]/maxTime)*plotW, y=pad.top+plotH*(1-levels[i]/maxLevel);
        i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
    }
    ctx.lineTo(pad.left+plotW,pad.top+plotH); ctx.lineTo(pad.left,pad.top+plotH); ctx.closePath();
    const fg=ctx.createLinearGradient(0,pad.top,0,pad.top+plotH);
    fg.addColorStop(0,'rgba(6,182,212,0.12)'); fg.addColorStop(1,'rgba(6,182,212,0)');
    ctx.fillStyle=fg; ctx.fill();

    // Curve
    const lg=ctx.createLinearGradient(pad.left,0,pad.left+plotW,0);
    lg.addColorStop(0,'#06b6d4'); lg.addColorStop(0.5,'#6366f1'); lg.addColorStop(1,'#06b6d4');
    ctx.strokeStyle=lg; ctx.lineWidth=2.5; ctx.lineJoin='round'; ctx.beginPath();
    for (let i=0;i<timePoints.length;i++) {
        const x=pad.left+(timePoints[i]/maxTime)*plotW, y=pad.top+plotH*(1-levels[i]/maxLevel);
        i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
    }
    ctx.stroke();

    // Dose markers
    for (let d=0;d<numDoses;d++) {
        const dt=d*interval, x=pad.left+(dt/maxTime)*plotW;
        let lev=0;
        for (let dd=0;dd<=d;dd++) lev+=doseMg*Math.exp(-k*(dt-dd*interval));
        const y=pad.top+plotH*(1-lev/maxLevel);
        ctx.setLineDash([3,3]); ctx.strokeStyle='rgba(245,158,11,0.2)'; ctx.lineWidth=1;
        ctx.beginPath(); ctx.moveTo(x,pad.top+plotH); ctx.lineTo(x,y); ctx.stroke();
        ctx.setLineDash([]);
        ctx.beginPath(); ctx.arc(x,y,3.5,0,Math.PI*2);
        ctx.fillStyle='#f59e0b'; ctx.fill();
        ctx.strokeStyle='rgba(245,158,11,0.25)'; ctx.lineWidth=5; ctx.stroke();
    }
}

$('calculate-toxicity-btn').addEventListener('click', calculateToxicity);

// ======================== RESIZE ========================

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (!$('dose-result-content').classList.contains('hidden')) calculateDoseTiming();
        if (!$('tox-result-content').classList.contains('hidden')) calculateToxicity();
    }, 200);
});

// ======================== INIT ========================

loadUserProfile();
renderProducts();
renderDoctors();
renderLabTests();
renderLabReports();
renderPrescriptions();
updateCartBadge();

// ======================== PWA SERVICE WORKER ========================
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
        .then(() => console.log('📱 Service Worker registered — app is installable!'))
        .catch(() => {});
}

console.log('💊 MedVault loaded — Smart Pharmacy & Healthcare Platform');
