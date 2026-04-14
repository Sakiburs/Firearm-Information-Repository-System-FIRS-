// ------------------------------------------------------------
// FIRS Common JavaScript
// - Single source of truth for product catalog
// - Cart management (add/remove/update)
// - Login routing with validation and session persistence
// - Dynamic navigation based on login state
// - Scroll reveal animations for fancy UI
// - Blocked user enforcement (admin can block)
// ------------------------------------------------------------

// ---------- SHARED PRODUCT CATALOG (ALL ITEMS) ----------
// This is the master list of products. Dealers and admins can modify it later.
const productCatalog = [
    // Handguns - available to all tiers
    { id: 'g19', name: 'Glock 19 Gen5', brand: 'Glock', category: 'Handgun', caliber: '9mm', price: 649, rating: 4.8, image: './resources/images/glock_19.png', spec: '9mm · 15+1 · 4.02" barrel', restricted: false },
    { id: 'p320', name: 'Sig Sauer P320', brand: 'Sig Sauer', category: 'Handgun', caliber: '9mm', price: 629, rating: 5.0, image: './resources/images/sig_sauer.png', spec: '9mm · 17+1 · 119mm barrel · 710g unloaded', restricted: false },
    { id: 'm1911', name: 'M1911', brand: 'Colt', category: 'Handgun', caliber: '.45 ACP', price: 549, rating: 4.6, image: './resources/images/m1911.png', spec: '.45 ACP · 7+1 · 216mm barrel · 1050g unloaded', restricted: false },
    { id: 'czp10c', name: 'CZ P-10C', brand: 'CZ', category: 'Handgun', caliber: '9mm', price: 499, rating: 4.5, image: './resources/images/czp10c.png', spec: '9mm · 15+1 · 4.02" barrel', restricted: false },
    { id: 'g17', name: 'Glock 17 Gen5', brand: 'Glock', category: 'Handgun', caliber: '9mm', price: 599, rating: 5.0, image: './resources/images/glock17.png', spec: '9mm · 17+1 · 114mm barrel · 705g unloaded', restricted: false },
    { id: 'p365', name: 'Sig Sauer P365', brand: 'Sig Sauer', category: 'Handgun', caliber: '9mm', price: 629, rating: 4.8, image: './resources/images/sigsauer365.png', spec: '9mm · 10+1 · 3.1" barrel', restricted: false },
    { id: 'shield', name: 'S&W M&P Shield', brand: 'Smith & Wesson', category: 'Handgun', caliber: '9mm', price: 479, rating: 4.7, image: './resources/images/swmp.png', spec: '9mm · 8+1 · 3.1" barrel', restricted: false },
    { id: 'p07', name: 'CZ P-07', brand: 'CZ', category: 'Handgun', caliber: '9mm', price: 529, rating: 4.6, image: './resources/images/czp07.png', spec: '9mm · 15+1 · 3.8" barrel', restricted: false },

    // Revolvers - also unrestricted
    { id: 'gp100', name: 'Ruger GP100', brand: 'Ruger', category: 'Revolver', caliber: '.357 Mag', price: 749, rating: 5.0, image: './resources/images/ruzergp100.png', spec: '.357 Mag · 6/7-Round · 4-6" barrel · 1050g unloaded', restricted: false },
    { id: 'python', name: 'Colt Python', brand: 'Colt', category: 'Revolver', caliber: '.357 Mag', price: 1499, rating: 5.0, image: './resources/images/coltpython.png', spec: '.357 Mag · 6-Round · 4-6" barrel · 1200g unloaded', restricted: false },
    { id: 'taurus856', name: 'Taurus 856', brand: 'Taurus', category: 'Revolver', caliber: '.38 Special', price: 349, rating: 4.4, image: './resources/images/tauras856.png', spec: '.38 Special · 6-Round · 2" Barrel', restricted: false },
    { id: 'bulldog', name: 'Charter Arms Bulldog', brand: 'Charter Arms', category: 'Revolver', caliber: '.44 Special', price: 399, rating: 4.3, image: './resources/images/charter.png', spec: '.44 Special · 5-Round · 2.5" Barrel', restricted: false },
    { id: 'sw686', name: 'S&W 686+', brand: 'Smith & Wesson', category: 'Revolver', caliber: '.357 Mag', price: 829, rating: 4.9, image: './resources/images/sw686.png', spec: '.357 Mag · 7-Round · 4" Barrel', restricted: false },
    { id: 'sp101', name: 'Ruger SP101', brand: 'Ruger', category: 'Revolver', caliber: '.357 Mag', price: 679, rating: 4.7, image: './resources/images/ruger.png', spec: '.357 Mag · 5-Round · 2.25" Barrel', restricted: false },

    // Rifles - restricted access
    { id: 'ar15', name: 'AR-15 Platform', brand: 'Colt', category: 'Rifle', caliber: '5.56 NATO', price: 1299, rating: 4.7, image: './resources/images/ar15.png', spec: '5.56 NATO · 16" Barrel · Semi-Auto', restricted: true },
    { id: 'm4', name: 'M4 Carbine', brand: 'Colt', category: 'Rifle', caliber: '5.56 NATO', price: 1499, rating: 5.0, image: './resources/images/m4.png', spec: '5.56 NATO · 30-Round · 370mm barrel · 2.9-3.3kg unloaded', restricted: true },
    { id: 'ak47', name: 'AK-47', brand: 'Kalashnikov', category: 'Rifle', caliber: '7.62×39mm', price: 899, rating: 5.0, image: './resources/images/ak47.png', spec: '7.62×39mm · 30-Round · 415mm barrel · 3.8kg unloaded', restricted: true },
    { id: 'ddm4v7', name: 'Daniel Defense DDM4 V7', brand: 'Daniel Defense', category: 'Rifle', caliber: '5.56 NATO', price: 2099, rating: 4.9, image: './resources/images/ddm4.png', spec: '5.56 NATO · 16" Barrel · M-LOK', restricted: true },
    { id: 'scar17', name: 'FN SCAR 17S', brand: 'FN Herstal', category: 'Rifle', caliber: '.308 Win', price: 3499, rating: 4.9, image: './resources/images/scar.png', spec: '.308 Win · 16.25" Barrel · Semi-Auto', restricted: true },

    // Snipers - restricted
    { id: 'mrad', name: 'Barrett MRAD Mk22', brand: 'Barrett', category: 'Sniper', caliber: '.308 Win', price: 5999, rating: 5.0, image: './resources/images/mk22.png', spec: '.308 Win · Bolt-Action · 24" Barrel', restricted: true },
    { id: 'rem700', name: 'Remington 700', brand: 'Remington', category: 'Sniper', caliber: '.308 Win', price: 899, rating: 5.0, image: './resources/images/remington700.png', spec: '.308 Win · 3-5-Round · 510-660mm barrel · 3.2-3.6kg unloaded', restricted: true },
    { id: 'aiat', name: 'Accuracy International AT', brand: 'Accuracy International', category: 'Sniper', caliber: '.338 Lapua', price: 4799, rating: 4.9, image: './resources/images/at.png', spec: '.338 Lapua · Bolt-Action · 26" Barrel', restricted: true },
    { id: 'savage110', name: 'Savage 110 Elite', brand: 'Savage', category: 'Sniper', caliber: '6.5 Creedmoor', price: 1699, rating: 4.8, image: './resources/images/savage.png', spec: '6.5 Creedmoor · Bolt-Action · 24" Barrel', restricted: true }
];

// Helper: get a product by its id
function getProductById(id) {
    return productCatalog.find(p => p.id === id);
}

// Helper: filter catalog based on user role (customers see less)
function getAccessibleProducts(userRole) {
    if (userRole === 'customer') {
        return productCatalog.filter(p => !p.restricted && (p.category === 'Handgun' || p.category === 'Revolver'));
    }
    return productCatalog; // govt, dealer, admin see everything
}

// ---------- DEMO USER DATABASE ----------
// These are the demo accounts. Real auth would check a backend.
const demoUsers = [
    { email: 'customer@firs.com', password: 'customer123', name: 'Jason M.', role: 'customer', redirect: 'customer_view.html' },
    { email: 'gov@firs.com', password: 'gov123', name: 'Lt. James Holloway', role: 'govt', redirect: 'govt_view.html' },
    { email: 'dealer@firs.com', password: 'dealer123', name: 'Ridge Arms LLC', role: 'dealer', redirect: 'dealer_view.html' },
    { email: 'admin@firs.com', password: 'admin123', name: 'SuperAdmin', role: 'admin', redirect: 'admin_dashboard.html' }
];

// ---------- SESSION MANAGEMENT ----------
function setCurrentUser(user) {
    localStorage.setItem('firs_user', JSON.stringify(user));
}

function getCurrentUser() {
    const userJson = localStorage.getItem('firs_user');
    return userJson ? JSON.parse(userJson) : null;
}

function logout() {
    localStorage.removeItem('firs_user');
    window.location.href = 'index.html';
}

// ---------- DYNAMIC NAVIGATION UPDATE ----------
// Updates the nav bar based on who's logged in.
function updateNavigation() {
    const user = getCurrentUser();
    const navCta = document.querySelector('.nav-cta');
    if (!navCta) return;

    if (user) {
        // Build user initials for the avatar
        const initials = user.name.split(' ').map(n => n.charAt(0)).join('');
        // Choose the badge style based on role
        let tierClass = '';
        if (user.role === 'customer') tierClass = 'customer';
        else if (user.role === 'govt') tierClass = 'govt';
        else if (user.role === 'dealer') tierClass = 'dealer';
        else tierClass = 'admin';

        // Dropdown items: Dashboard, Profile, maybe Order History (not for dealers), Sign Out
        let dropdownItems = `
            <a href="${user.role === 'admin' ? 'admin_dashboard.html' : user.role + '_view.html'}">Dashboard</a>
            <a href="user_profile.html">My Profile</a>
        `;
        // Dealers don't need to see customer order history
        if (user.role !== 'dealer') {
            dropdownItems += `<a href="order_history.html">Order History</a>`;
        }
        dropdownItems += `<a href="#" onclick="logout(); return false;">Sign Out</a>`;

        navCta.innerHTML = `
            <div class="nav-tier ${tierClass}">${user.role.charAt(0).toUpperCase() + user.role.slice(1)}</div>
            <div class="nav-cart" id="cartIcon" style="position:relative; width:40px; height:40px; display:flex; align-items:center; justify-content:center; background:var(--bg2); border:1px solid var(--border); cursor:pointer;">
                <img src="./resources/icons/icons_cart.png" alt="cart" width="20">
                <span id="cartCount" style="position:absolute; top:-6px; right:-6px; width:20px; height:20px; background:var(--red); border-radius:50%; font-size:11px; display:flex; align-items:center; justify-content:center; font-family:'Rajdhani';">0</span>
            </div>
            <div class="nav-user" style="display:flex; align-items:center; gap:10px; padding:6px 14px; background:var(--bg2); border:1px solid var(--border); cursor:pointer; position:relative;">
                <div style="width:28px; height:28px; background:var(--red); border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:13px;">${initials}</div>
                <span style="font-family:'Rajdhani'; font-size:13px;">${user.name.split(' ')[0]}</span>
                <div class="dropdown-menu">
                    ${dropdownItems}
                </div>
            </div>
        `;
    } else {
        // Not logged in: show Sign In and Register
        navCta.innerHTML = `
            <div class="nav-cart" id="cartIcon" style="display:flex; align-items:center; justify-content:center; width:40px; height:40px; background:var(--bg2); border:1px solid var(--border); cursor:pointer; margin-right:8px;">
                <img src="./resources/icons/icons_cart.png" alt="cart" width="20">
                <span id="cartCount" style="margin-left:4px; font-family:'Rajdhani';">0</span>
            </div>
            <a href="auth_page.html" class="btn-ghost">Sign In</a>
            <a href="auth_page.html" class="btn-red">Register</a>
        `;
    }

    // Attach cart toggle event to the cart icon
    const cartIcon = document.getElementById('cartIcon');
    if (cartIcon) {
        cartIcon.addEventListener('click', toggleCart);
    }
    // Update cart UI with current items
    updateCartUI();
}

// ---------- CART SYSTEM ----------
// The cart is stored in localStorage.
let cart = JSON.parse(localStorage.getItem('firs_cart')) || [];

function saveCart() {
    localStorage.setItem('firs_cart', JSON.stringify(cart));
    updateCartUI();
}

function addToCart(productOrId) {
    let product;
    if (typeof productOrId === 'string') {
        product = getProductById(productOrId);
    } else {
        product = productOrId;
    }
    if (!product) return;

    const existing = cart.find(item => item.id === product.id);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            spec: product.spec || product.caliber,
            qty: 1
        });
    }
    saveCart();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
}

function clearCart() {
    cart = [];
    saveCart();
}

function updateCartUI() {
    const container = document.getElementById('cart-items-container');
    const countSpan = document.getElementById('cartCount');
    const subtotalSpan = document.getElementById('cartSubtotal');
    const fflSpan = document.getElementById('cartFFL');
    const totalSpan = document.getElementById('cartTotal');
    const checkoutLink = document.getElementById('checkoutLink');

    if (!container && !countSpan) return; // Not on a page with cart elements

    const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);
    if (countSpan) countSpan.innerText = totalItems;

    // Update checkout link based on login state
    if (checkoutLink) {
        const user = getCurrentUser();
        if (user) {
            checkoutLink.href = 'payment_page.html';
        } else {
            checkoutLink.href = 'auth_page.html';
        }
    }

    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = '<div style="padding:20px; text-align:center; color:var(--ash2);">Your cart is empty</div>';
        if (subtotalSpan) subtotalSpan.innerText = '$0';
        if (fflSpan) fflSpan.innerText = '$0';
        if (totalSpan) totalSpan.innerText = '$0';
        return;
    }

    let subtotal = 0;
    const fflFee = cart.length * 25;
    let html = '';

    cart.forEach(item => {
        subtotal += item.price * item.qty;
        // Use the actual product image if available, else fallback to icon
        const product = getProductById(item.id);
        const iconSrc = product && product.image ? product.image : './resources/icons/icons_handgun.png';
        html += `<div class="cart-item">
            <div class="cart-item-img"><img src="${iconSrc}" alt="item" width="30"></div>
            <div style="flex:1;">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-spec">${item.spec || ''} · Qty: ${item.qty}</div>
                <div class="cart-item-price">$${item.price}</div>
            </div>
            <div class="cart-item-remove" onclick="removeFromCart('${item.id}')"><img src="./resources/icons/icons_cross.png" alt="remove" width="16"></div>
        </div>`;
    });

    container.innerHTML = html;
    if (subtotalSpan) subtotalSpan.innerText = '$' + subtotal.toFixed(0);
    if (fflSpan) fflSpan.innerText = '$' + fflFee;
    if (totalSpan) totalSpan.innerText = '$' + (subtotal + fflFee).toFixed(0);
}

function toggleCart() {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-overlay');
    if (drawer) drawer.classList.toggle('open');
    if (overlay) overlay.classList.toggle('open');
}

// Attach to window so inline onclick works
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.clearCart = clearCart;
window.toggleCart = toggleCart;
window.productCatalog = productCatalog;
window.getAccessibleProducts = getAccessibleProducts;
window.getCurrentUser = getCurrentUser;
window.logout = logout;
window.updateNavigation = updateNavigation;
window.setCurrentUser = setCurrentUser;

// ---------- LOGIN ROUTING WITH BLOCKED USER CHECK ----------
function authenticateAndRedirect(email, password) {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (!cleanEmail || !cleanPassword) {
        alert('Please enter both email and password.');
        return false;
    }

    const user = demoUsers.find(u => u.email.toLowerCase() === cleanEmail && u.password === cleanPassword);
    if (!user) {
        alert('Invalid email or password. Please try again.');
        return false;
    }

    // Check if admin has blocked this user
    const allUsers = JSON.parse(localStorage.getItem('firs_all_users')) || [];
    const userRecord = allUsers.find(u => u.email === user.email);
    if (userRecord && userRecord.blocked) {
        alert('Your account has been blocked. Please contact support.');
        return false;
    }

    setCurrentUser({ name: user.name, role: user.role, email: user.email });
    alert(`Login successful! Welcome, ${user.name}.`);
    window.location.href = user.redirect;
    return true;
}

window.authenticateAndRedirect = authenticateAndRedirect;

// ---------- SCROLL REVEAL ----------
// Adds a nice fade-in effect when elements come into view
function initRevealAnimations() {
    const reveals = document.querySelectorAll('.reveal');
    if (reveals.length === 0) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, idx) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('visible'), idx * 80);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    reveals.forEach(el => observer.observe(el));
}

// ---------- NAVBAR SCROLL EFFECT ----------
// Makes the navbar background more solid when scrolling down
function initNavbarScroll() {
    const nav = document.querySelector('nav');
    if (!nav) return;
    window.addEventListener('scroll', () => {
        nav.style.background = window.scrollY > 60 ? 'rgba(7,7,10,0.97)' : 'rgba(7,7,10,0.85)';
    });
}

// ---------- INITIALIZATION ----------
document.addEventListener('DOMContentLoaded', () => {
    updateNavigation();
    initRevealAnimations();
    initNavbarScroll();
});