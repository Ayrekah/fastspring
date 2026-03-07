// Wait for FastSpring to load
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".buy-button");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const product = button.getAttribute("data-product");

      // Open the embedded checkout with the selected product
      fastspring.builder.push({
        products: [
          { path: product, quantity: 1 }
        ]
      });

      // Show the checkout popup
      fastspring.builder.showPopup();
    });
  });
});
