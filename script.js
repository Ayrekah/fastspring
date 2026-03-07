// Store current cart items
let cartItems = [];

// Map button IDs to FastSpring product paths
const products = {
    'add-tavern': 'the-tavern',
    'add-campfire': 'the-campfire',
    'add-guild-hall': 'the-guild-hall'
};

// Add click listeners for product buttons
Object.keys(products).forEach(buttonId => {
    document.getElementById(buttonId).addEventListener('click', () => {
        const product = products[buttonId];
        
        // Check if product is already in cart
        const existing = cartItems.find(item => item.product === product);
        if (existing) {
            existing.quantity += 1;
        } else {
            cartItems.push({ product, quantity: 1 });
        }
        alert(`${product} added to cart!`);
    });
});

// Checkout button
document.getElementById('checkout').addEventListener('click', () => {
    if (cartItems.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    // Push session to FastSpring
    fastspring.builder.push({
        products: cartItems
    });

    // Embed checkout in container
    fastspring.builder.checkout({
        container: "#fsc-embedded-checkout-container"
    });
});
