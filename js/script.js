/**
 * FastSpring Data Callback
 * Required for SBL to communicate with your page.
 */
function onFscDataCallback(data) {
    console.log("FastSpring Syncing Data:", data);
}

/**
 * changeQty
 * Uses the official Public Methods from your documentation.
 */
function changeQty(path, delta) {
    // Get the current quantity from the directive on the screen
    const qtyEl = document.querySelector(`[data-fsc-item-path="${path}"][data-fsc-item-quantity]`);
    
    if (qtyEl) {
        const currentQty = parseInt(qtyEl.textContent || 0);
        const newQty = Math.max(0, currentQty + delta);

        // Official FastSpring Method to update the cart session
        fastspring.builder.update(path, newQty);
    }
}

// Make callback globally accessible
window.onFscDataCallback = onFscDataCallback;
