function orderUpdateCallback(data) {
    if (data) {
        console.log("FastSpring Session Updated:", data);
        
        if (data.groups && data.groups.length > 0) {
            console.log("Items in cart:", data.groups[0].items.length);
        } else {
            console.log("Cart is currently empty.");
        }
    }
}

console.log("Ready To Roll Store initialized.");
