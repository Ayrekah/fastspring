// Track quantities
const cart = {
  "the-tavern": 0,
  "the-campfire": 0,
  "the-guild-hall": 0
};

const cartItemsDiv = document.getElementById('cart-items');
const checkoutBtn = document.getElementById('checkout-btn');

// Update FastSpring cart and UI
function updateCart() {
  const items = Object.keys(cart)
    .map(product => ({ product, quantity: cart[product] }))
    .filter(item => item.quantity > 0);

  // Update cart summary display
  if (items.length === 0) {
    cartItemsDiv.textContent = "No items in cart.";
  } else {
    cartItemsDiv.innerHTML = items.map(item => 
      `${item.product.replace(/-/g,' ')}: ${item.quantity}`
    ).join('<br>');
  }

  // Push cart to FastSpring
  fastspring.builder.push({ items });
}

// Attach button events
document.querySelectorAll('.product').forEach(productDiv => {
  const productName = productDiv.dataset.product;
  const quantitySpan = productDiv.querySelector('.quantity');

  productDiv.querySelector('.increase').addEventListener('click', () => {
    cart[productName]++;
    quantitySpan.textContent = cart[productName];
    updateCart();
  });

  productDiv.querySelector('.decrease').addEventListener('click', () => {
    if (cart[productName] > 0) {
      cart[productName]--;
      quantitySpan.textContent = cart[productName];
      updateCart();
    }
  });
});

// Checkout button opens embedded checkout
checkoutBtn.addEventListener('click', () => {
  fastspring.builder.checkout();
});
