// Load products from localStorage
let products = JSON.parse(localStorage.getItem('products')) || [];

// Display products in admin panel
function displayAdminProducts() {
    const adminProducts = document.getElementById('admin-products');
    adminProducts.innerHTML = '';

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'admin-product';
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div>
                <h3>${product.name}</h3>
                <p>R$ ${product.price.toFixed(2)}</p>
                <p>Categoria: ${product.category}</p>
            </div>
            <button class="delete-btn" onclick="deleteProduct(${product.id})">
                Excluir
            </button>
        `;
        adminProducts.appendChild(productElement);
    });
}

// Add new product
document.getElementById('product-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const newProduct = {
        id: Date.now(),
        name: document.getElementById('name').value,
        price: parseFloat(document.getElementById('price').value),
        category: document.getElementById('category').value,
        image: document.getElementById('image').value
    };

    products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));
    displayAdminProducts();
    e.target.reset();
});

// Delete product
function deleteProduct(productId) {
    products = products.filter(product => product.id !== productId);
    localStorage.setItem('products', JSON.stringify(products));
    displayAdminProducts();
}

// Initial load
displayAdminProducts();