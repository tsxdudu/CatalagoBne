let cart = [];


const savedProducts = localStorage.getItem('products');
if (savedProducts) {
    products = JSON.parse(savedProducts);
}


function displayProducts(category = 'all') {
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = '';

    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);

    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">R$ ${product.price.toFixed(2)}</p>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    Adicionar ao Carrinho
                </button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}


document.querySelectorAll('.category-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('.category-link.active').classList.remove('active');
        link.classList.add('active');
        displayProducts(link.dataset.category);
    });
});


function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function updateQuantity(productId, delta) {
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity = Math.max(0, cartItem.quantity + delta);
        if (cartItem.quantity === 0) {
            removeFromCart(productId);
        }
        updateCart();
    }
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    
    cartItems.innerHTML = '';
    let total = 0;
    let count = 0;

    cart.forEach(item => {
        count += item.quantity;
        total += item.price * item.quantity;
        
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div>
                <h4>${item.name}</h4>
                <p>R$ ${item.price.toFixed(2)}</p>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
        `;
        cartItems.appendChild(cartItemElement);
    });

    cartCount.textContent = count;
    cartTotal.textContent = total.toFixed(2);
}

function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    cartSidebar.classList.toggle('active');
}


displayProducts();