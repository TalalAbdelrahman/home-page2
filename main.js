const goldBtn = document.getElementById('gold-btn');
const blueBtn = document.getElementById('blue-btn');
const redBtn = document.getElementById('red-btn');
const brownBtn = document.getElementById('brown-btn');
const headphoneImg = document.getElementById('headphone-img');
const container = document.querySelector('.container');
const featuresSection = document.querySelector('.section2');
const cartBtn = document.getElementById('cart-btn');
const cartDiv = document.querySelector('.cart-shopping');
const closeBtn = document.getElementById("close-btn");


goldBtn.addEventListener('click', () => {
    headphoneImg.src = 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQTR3?wid=532&hei=582&fmt=png-alpha&.v=1687660671097';
    container.style.backgroundColor = '#DACFC9';
    featuresSection.style.backgroundColor = '#dacfb0';
});

blueBtn.addEventListener('click', () =>{
    headphoneImg.src = 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQTQ3?wid=532&hei=582&fmt=png-alpha&.v=1687660671363';
    container.style.backgroundColor = '#0D122E';
    featuresSection.style.backgroundColor = '#171c39';
});
redBtn.addEventListener('click', () =>{
    headphoneImg.src = 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQTT3?wid=266&hei=291&fmt=png-alpha&.v=1687660671077';
    container.style.backgroundColor = '#C42A25';
    featuresSection.style.backgroundColor = '#C42a40';
});
brownBtn.addEventListener('click', () =>{
    headphoneImg.src = 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQTT3?wid=266&hei=291&fmt=png-alpha&.v=1687660671077';
    container.style.backgroundColor = '#A59692';
    featuresSection.style.backgroundColor = '#A59685';
});

cartBtn.addEventListener('click', () => {
    cartDiv.style.width = cartDiv.style.width === '0px' ? '25%' : '0';
});
// إضافة حدث لزر الإغلاق
closeBtn.addEventListener('click', () => {
    cartDiv.style.width = '0'; // إغلاق السلة
});

const products = [
    { image: "https://via.placeholder.com/200", name: "wireless headphone", price: 450 },
    { image: "https://via.placeholder.com/200", name: "keyboard wireless", price: 700 },
    { image: "https://via.placeholder.com/200", name: "mouse gaming", price: 300 },
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let totalPrice = 0;

function displayProducts() {
    const productsContainer = document.getElementById('section3');
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product-a1';

        productDiv.innerHTML = `
            <img src="${product.image}">
            <h4 class="product-name">${product.name}</h4>
            <p>$${product.price}</p>
            <button class="add-to-cart" onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
        `;
        productsContainer.appendChild(productDiv);
    });
}

function addToCart(productName, price) {
    cartDiv.style.width = '25%';
    const existingProduct = cart.find(item => item.name === productName);
    if (!existingProduct) {
        cart.push({ name: productName, price: price, quantity: 1 });
    } else {
        existingProduct.quantity++;
    }
    updateCart();
}

function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    updateCart();
}

function increaseQuantity(productName) {
    const existingProduct = cart.find(item => item.name === productName);
    if (existingProduct) {
        existingProduct.quantity++;
        updateCart();
    }
}

function decreaseQuantity(productName) {
    const existingProduct = cart.find(item => item.name === productName);
    if (existingProduct) {
        if (existingProduct.quantity > 1) {
            existingProduct.quantity--;
        } else {
            removeFromCart(productName);
        }
        updateCart(); 
    }
}

function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart)); // حفظ السلة في localStorage
    const cartProductDiv = document.getElementById('cart-product');
    const totalPriceDiv = document.getElementById('totalPrice');

    cartProductDiv.innerHTML = '';
    totalPrice = 0;

    cart.forEach(item => {
        cartProductDiv.innerHTML +=
        `<div>
            ${item.name} - $${item.price.toFixed(2)} 
            <button onclick="decreaseQuantity('${item.name}')">-</button>
            ${item.quantity}
            <button onclick="increaseQuantity('${item.name}')">+</button>
            <button class="remove-from-cart" onclick="removeFromCart('${item.name}')">Remove</button><br>
        </div>`;
        totalPrice += item.price * item.quantity;
    });

    totalPriceDiv.innerHTML = `<p>Total Price : $${totalPrice.toFixed(2)}</p>`
}

displayProducts();
updateCart()