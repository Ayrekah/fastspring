function orderUpdateCallback(data) {
    if (data) {
        // This log is your best friend right now. 
        // If 'data' is empty, the library isn't connecting to the storefront correctly.
        console.log("FastSpring Session Updated:", data);
    }
}

console.log("Ready To Roll Store initialized.");
