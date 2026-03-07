/**
 * FastSpring Data Callback
 */
function onFscDataCallback(data) {
    console.log("FastSpring Syncing Data...", data);
}

/**
 * changeQty
 * Uses the 'fastspring.builder.update' method from your documentation.
 */
function changeQty(path, delta) {
    // Look for the quantity tag on the screen to get the current number
    const qtyEl = document.querySelector(`[data-fsc-item-path="${path}"][data-fsc-item-quantity]`);
    
    if (qtyEl) {
        const currentQty = parseInt(qtyEl.textContent || 0);
        const newQty = Math.max(0, currentQty + delta);

        // Tell FastSpring to update the quantity for this specific path
        fastspring.builder.update(path, newQty);
    }
}

// Make callback globally accessible
window.onFscDataCallback = onFscDataCallback;
