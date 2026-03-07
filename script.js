/**
 * This function is triggered by the 'data-data-callback' attribute 
 * in the SBL script tag whenever the session updates.
 */
function orderUpdateCallback(data) {
    if (data) {
        console.log("FastSpring Session Updated:", data);
        
        // Example: Check if the cart is empty
        if (data.groups && data.groups.length > 0) {
            console.log("Items in cart:", data.groups[0].items.length);
        } else {
            console.log("Cart is currently empty.");
        }
    }
}

console.log("Ready To Roll Store initialized with Callbacks.");
