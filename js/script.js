(function($) {
    "use strict";

    // ... [Keep searchPopup and initProductQty as they are] ...

    $(document).ready(function() {
        searchPopup();
        initProductQty();
        // ... [Keep your Swiper initializations here] ...
    }); 

})(jQuery);

/* --- FASTSPRING FUNCTIONS: MOVE THESE OUTSIDE THE WRAPPER --- */

/**
 * 1. THE POPUP TRIGGER
 * Global scope so index.html can call it
 */
function addToCartAndShow(path) {
    console.log("Adding to cart: " + path); [cite: 1]
    fastspring.builder.add(path); [cite: 1]
    fastspring.builder.viewCart(); [cite: 1]
}

/**
 * 2. DATA HANDLER
 */
function onFscDataCallback(data) {
    console.log("SBL Sync:", data); [cite: 1]
}

// Hooking the callback to the SBL
window.fastspring = {
    builder: { "onOrderItemsChanged": onFscDataCallback } [cite: 1]
};

/**
 * 3. MODAL HANDLER
 */
function showDetails(path) {
    const item = fastspring.builder.item(path); [cite: 1]
    
    if(item) {
        document.getElementById('m-title').innerText = item.display; [cite: 1]
        document.getElementById('m-img').src = item.image; [cite: 1]
        document.getElementById('m-desc').innerHTML = item.descriptionFull || "Loading description..."; [cite: 1]
        
        // Ensure Bootstrap is loaded before calling this
        var detailModal = new bootstrap.Modal(document.getElementById('detailsModal')); [cite: 1]
        detailModal.show(); [cite: 1]
    } else {
        console.error("FastSpring: No data found for path " + path); [cite: 1]
    }
}
