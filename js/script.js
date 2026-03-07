/* --- GLOBAL CATALOG SYNC --- */
let fscCatalog = [];

function onFscDataCallback(data) {
    console.log("SBL Sync:", data);
    if (data && data.items) {
        fscCatalog = data.items;
    }
}

/**
 * changeQty
 * Uses 'fastspring.builder.update' as defined in Doc Section: Methods.
 * This ensures the cart updates correctly every time.
 */
function changeQty(path, delta) {
    // 1. Get the current quantity from the FastSpring Directive on the page
    const qtyEl = document.querySelector(`[data-fsc-item-path="${path}"][data-fsc-item-quantity]`);
    const currentQty = parseInt(qtyEl.textContent || 0);
    
    // 2. Calculate new quantity
    const newQty = Math.max(0, currentQty + delta);

    // 3. Call the official FastSpring method to update the session
    fastspring.builder.update(path, newQty);
}

// Make sure FastSpring can see the callback
window.onFscDataCallback = onFscDataCallback;
