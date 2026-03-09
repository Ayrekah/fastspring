
document.addEventListener("DOMContentLoaded", () => {
  const checkoutContainer = document.getElementById("fsc-embedded-checkout-container");
  const cartSection = document.querySelector(".cart");

  // Hide the cart section initially
  cartSection.style.display = "none";
  checkoutContainer.style.display = "none";

  console.log("Store Builder Library is active.");

  // Listen to FastSpring order updates
  if (window.FSBL) {
    FSBL.on("order.updated", (order) => {
      // Count total items in order
      const itemCount = order.items?.reduce((acc, group) => acc + group.items.length, 0) || 0;

      if (itemCount > 0) {
        cartSection.style.display = "block";
        checkoutContainer.style.display = "block";
      } else {
        cartSection.style.display = "none";
        checkoutContainer.style.display = "none";
      }
    });
  }
});
