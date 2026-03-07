/**
 * FastSpring Data Callback
 * Required to keep the global window scope clean
 */
function onFscDataCallback(data) {
    console.log("FastSpring SBL Data Sync:", data);
}

/**
 * changeQty
 * Uses the official 'fastspring.builder.update' method.
 *
 */
function changeQty(path, delta) {
    // 1. Pull the current quantity directly from the FastSpring Directive on screen
    const qtyEl = document.querySelector(`[data-fsc-item-path="${path}"][data-fsc-item-quantity]`);
    const currentQty = parseInt(qtyEl.textContent || 0);
    
    // 2. Calculate the new quantity (never below 0)
    const newQty = Math.max(0, currentQty + delta);

    // 3. Update the FastSpring Session programmatically
    fastspring.builder.update(path, newQty);
}

// Attach callback to window so SBL script can find it
window.onFscDataCallback = onFscDataCallback;
