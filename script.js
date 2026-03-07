document.querySelectorAll('.product').forEach(productDiv => {
  const name = productDiv.dataset.product;
  const quantitySpan = productDiv.querySelector('.quantity');

  productDiv.querySelector('.increase').addEventListener('click', () => {
    let qty = parseInt(quantitySpan.textContent) || 0;
    qty++;
    quantitySpan.textContent = qty;

    // Update FastSpring cart
    fastspring.builder.push({
      items: [
        { product: name, quantity: qty }
      ]
    });
  });

  productDiv.querySelector('.decrease').addEventListener('click', () => {
    let qty = parseInt(quantitySpan.textContent) || 0;
    if (qty > 0) qty--;
    quantitySpan.textContent = qty;

    // Update FastSpring cart
    fastspring.builder.push({
      items: [
        { product: name, quantity: qty }
      ]
    });
  });
});
