// ===== CONFIGURACIÓN =====
// ⚠️ CAMBIA ESTE NÚMERO POR TU WHATSAPP REAL (código país + número)
const WHATSAPP_NUMBER = "58412XXXXXXX";

// ===== PRODUCTOS =====
const products = [
    // HAMBURGUESAS
    {
        id: 1,
        name: "Burger Clásica",
        price: "$$$",
        category: "hamburguesas",
        image: "https://thumbs.dreamstime.com/b/classic-cheeseburger-fresh-ingredients-sesame-seed-bun-close-up-view-delicious-featuring-juicy-beef-patty-lettuce-382873606.jpg",
        desc: "Carne 150g, queso cheddar, lechuga, tomate, cebolla y salsa especial de la casa."
    },
    {
        id: 2,
        name: "Burger Doble",
        price: "$$$",
        category: "hamburguesas",
        image: "https://www.shutterstock.com/image-photo/this-closeup-shot-highlights-delicious-600nw-2706015821.jpg",
        desc: "Doble carne smash, doble queso americano, tocineta crispy y cebolla caramelizada."
    },
    {
        id: 3,
        name: "Burger BBQ Bacon",
        price: "$$$",
        category: "hamburguesas",
        image: "https://amandascookin.com/wp-content/uploads/2023/08/BBQ-Bacon-Burgers-RCSQ.jpg",
        desc: "Carne 200g, salsa BBQ ahumada, tocineta, aros de cebolla y queso fundido."
    },
    // PERROS
    {
        id: 4,
        name: "Perro Sencillo",
        price: "$$$",
        category: "perros",
        image: "https://braziliankitchenabroad.com/wp-content/uploads/2020/06/loaded-hot-dogs-1.jpg",
        desc: "Salchicha americana, papitas trituradas, cebolla, ketchup y mostaza."
    },
    {
        id: 5,
        name: "Perro Especial",
        price: "$$$",
        category: "perros",
        image: "https://i0.wp.com/wayfindersgalley.com/wp-content/uploads/2019/08/Hot-Dog-4.jpg?fit=1920%2C1280&ssl=1",
        desc: "Salchicha grande, tocineta, queso rallado, maíz dulce y salsas."
    },
    {
        id: 6,
        name: "Perro Picante",
        price: "$$$",
        category: "perros",
        image: "https://hips.hearstapps.com/hmg-prod/images/hot-dog-toppings-646bb52b40feb.jpg?crop=0.7587301587301587xw:1xh;center,top&resize=1200:*",
        desc: "Salchicha premium, jalapeños, salsa picante house, cebolla morada y nachos."
    },
    // ACOMPAÑAMIENTOS
    {
        id: 7,
        name: "Papas Locas",
        price: "$$$",
        category: "acompanamientos",
        image: "https://www.aviko.co.uk/_next/image?url=https%3A%2F%2Faviko-eu.s3.eu-west-2.amazonaws.com%2Funited_kingdom%2F2024-04%2Floaded_fries_street_food_image_1.jpg&w=1920&q=100",
        desc: "Papas fritas cubiertas de queso, tocineta, salsa ranch y cebollín."
    },
    {
        id: 8,
        name: "Nuggets x10",
        price: "$$$",
        category: "acompanamientos",
        image: "https://www.dontgobaconmyheart.co.uk/wp-content/uploads/2020/10/crispy-baked-chicken-nuggets-500x375.jpg",
        desc: "Nuggets de pollo 100% pechuga, empanizados y dorados. Con salsa BBQ."
    },
    {
        id: 9,
        name: "Aros de Cebolla",
        price: "$$$",
        category: "acompanamientos",
        image: "https://cookingfromheart.com/wp-content/uploads/2017/07/Golden-Onion-Rings-6.jpg",
        desc: "Aros empanizados, crujientes y dorados. Acompañados de salsa ranch."
    },
    // BEBIDAS
    {
        id: 10,
        name: "Gaseosa 500ml",
        price: "$$$",
        category: "bebidas",
        image: "https://img.freepik.com/premium-photo/coca-cola-glass-with-ice-dark-background-close-up_996173-3816.jpg",
        desc: "Coca-Cola, Pepsi, Sprite, Fanta Naranja o Uva. Bien fría."
    },
    {
        id: 11,
        name: "Jugo Natural",
        price: "$$$",
        category: "bebidas",
        image: "https://thumbs.dreamstime.com/b/cola-glass-ice-splash-dark-background-perfect-addition-to-celebration-party-soft-drink-hand-360202605.jpg",
        desc: "Jugo fresco de naranja, mango, mora o maracuyá. 100% natural."
    },
    {
        id: 12,
        name: "Malteada Premium",
        price: "$$$",
        category: "bebidas",
        image: "https://www.queensleeappetit.com/wp-content/uploads/2020/01/chocolate-covered-strawberry-milkshake-recipe-queensleeappetit.com-1.jpg",
        desc: "Vainilla, chocolate, fresa o oreo. Con crema batida y topping."
    }
];

// ===== CARRITO =====
let cart = JSON.parse(localStorage.getItem('streetBurgerCart')) || [];

function saveCart() {
    localStorage.setItem('streetBurgerCart', JSON.stringify(cart));
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existing = cart.find(item => item.id === productId);
    
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    
    saveCart();
    updateCartUI();
    
    // Animación del botón del carrito
    const cartBtn = document.querySelector('.cart-btn');
    cartBtn.style.transform = 'scale(1.3)';
    setTimeout(() => cartBtn.style.transform = 'scale(1)', 200);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
}

function updateQty(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.qty += change;
        if (item.qty <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            updateCartUI();
        }
    }
}

function addCombo() {
    // Combo familiar predefinido
    const comboItems = [1, 4, 7, 10]; // IDs de productos del combo
    comboItems.forEach(id => addToCart(id));
    toggleCart();
}

// ===== RENDER =====
function renderProducts() {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = products.map(product => `
        <div class="item-card" data-category="${product.category}">
            <div class="item-img">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <span class="item-badge">${product.category}</span>
            </div>
            <div class="item-info">
                <h4>${product.name}</h4>
                <p>${product.desc}</p>
                <div class="item-footer">
                    <span class="price">${product.price}</span>
                    <button class="btn-add" onclick="addToCart(${product.id})" title="Agregar al carrito">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function updateCartUI() {
    const cartItems = document.getElementById('cartItems');
    const cartEmpty = document.getElementById('cartEmpty');
    const cartFooter = document.getElementById('cartFooter');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');
    
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    cartCount.textContent = totalItems;
    
    if (cart.length === 0) {
        cartItems.style.display = 'none';
        cartFooter.style.display = 'none';
        cartEmpty.style.display = 'flex';
    } else {
        cartEmpty.style.display = 'none';
        cartItems.style.display = 'block';
        cartFooter.style.display = 'block';
        
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <span class="price">${item.price}</span>
                    <div class="cart-item-actions">
                        <button onclick="updateQty(${item.id}, -1)"><i class="fas fa-minus"></i></button>
                        <span>${item.qty}</span>
                        <button onclick="updateQty(${item.id}, 1)"><i class="fas fa-plus"></i></button>
                    </div>
                </div>
                <button class="btn-remove" onclick="removeFromCart(${item.id})"><i class="fas fa-trash"></i></button>
            </div>
        `).join('');
        
        // Total (placeholder)
        cartTotal.textContent = "$$$";
    }
}

function filterCategory(category) {
    const cards = document.querySelectorAll('.item-card');
    const tabs = document.querySelectorAll('.tab-btn');
    
    tabs.forEach(tab => tab.classList.remove('active'));
    event.target.closest('.tab-btn').classList.add('active');
    
    cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.classList.remove('hidden');
            card.style.animation = 'fadeIn 0.5s ease';
        } else {
            card.classList.add('hidden');
        }
    });
}

// ===== UI TOGGLES =====
function toggleCart() {
    document.getElementById('cartSidebar').classList.toggle('active');
    document.getElementById('cartOverlay').classList.toggle('active');
    document.body.style.overflow = document.getElementById('cartSidebar').classList.contains('active') ? 'hidden' : '';
}

function toggleMenu() {
    document.querySelector('.nav-links').classList.toggle('active');
}

function openCheckout() {
    if (cart.length === 0) return;
    
    const modal = document.getElementById('modalOverlay');
    const summary = document.getElementById('orderSummary');
    
    summary.innerHTML = `
        <h4><i class="fas fa-receipt"></i> Resumen del Pedido</h4>
        ${cart.map(item => `
            <div class="order-item">
                <span>${item.qty}x ${item.name}</span>
                <span>${item.price}</span>
            </div>
        `).join('')}
        <div class="order-item total">
            <span>TOTAL</span>
            <span>$$$</span>
        </div>
    `;
    
    modal.classList.add('active');
    toggleCart();
}

function closeCheckout() {
    document.getElementById('modalOverlay').classList.remove('active');
}

function sendWhatsAppOrder() {
    const name = document.getElementById('clientName').value.trim();
    const address = document.getElementById('clientAddress').value.trim();
    const payment = document.getElementById('paymentMethod').value;
    
    if (!name || !address) {
        alert('Por favor completa tu nombre y dirección de entrega.');
        return;
    }
    
    let message = `🔥 *PEDIDO STREET BURGER* 🔥\n\n`;
    message += `👤 *Cliente:* ${name}\n`;
    message += `📍 *Dirección:* ${address}\n`;
    message += `💳 *Pago:* ${payment}\n\n`;
    message += `🛒 *PRODUCTOS:*\n`;
    
    cart.forEach(item => {
        message += `• ${item.qty}x ${item.name} - ${item.price}\n`;
    });
    
    message += `\n💰 *Total:* $$$\n`;
    message += `\n⏰ Enviado el: ${new Date().toLocaleString()}`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    window.open(whatsappURL, '_blank');
    
    // Limpiar carrito después de enviar
    cart = [];
    saveCart();
    updateCartUI();
    closeCheckout();
}

// ===== EVENTOS =====
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartUI();
});

// Cerrar menú al hacer click en link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 30px rgba(255,60,0,0.2)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// Cerrar modal al hacer click fuera
document.getElementById('modalOverlay').addEventListener('click', (e) => {
    if (e.target === document.getElementById('modalOverlay')) {
        closeCheckout();
    }
});

// Animación de entrada
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// CSS para animaciones dinámicas
const style = document.createElement('style');
style.textContent = `
    .item-card {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);

// Observar tarjetas después de renderizar
setTimeout(() => {
    document.querySelectorAll('.item-card').forEach((card, i) => {
        card.style.transitionDelay = `${i * 0.05}s`;
        observer.observe(card);
    });
}, 100);