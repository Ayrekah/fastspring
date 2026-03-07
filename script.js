// Track current quantities for all products
const cart = {
  "the-tavern": 0,
  "the-campfire": 0,
  "the-guild-hall": 0
};

// Helper to push full cart to FastSpring
function updateCart() {
  const items = Object.keys(cart).map(product => ({
    product: product,
    quantity: cart[product]
  })).filter(item => item.quantity > 0); // remove 0-quantity products

  fastspring.builder.push({ items });
}

// Attach event listeners
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
