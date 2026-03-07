(function($) {
    "use strict";
    $(document).ready(function() {
        // Initialize Swiper only if the library is loaded to avoid ReferenceErrors
        if (typeof Swiper !== 'undefined') {
            new Swiper(".main-swiper", { speed: 500, navigation: { nextEl: ".swiper-arrow-prev", prevEl: ".swiper-arrow-next" } });
        }
    });
})(jQuery);

/* --- FASTSPRING GLOBAL FUNCTIONS --- */
var fscCatalog = [];

/**
 * 1. THE DATA CALLBACK
 * Fires automatically when FastSpring data is ready.
 */
function onFscDataCallback(data) {
    console.log("SBL Sync:", data);
    if (data && data.groups) {
        fscCatalog = data.groups.reduce(function(acc, group) {
            return acc.concat(group.items || []);
        }, []);
    }
}

// Link to the global window object
window.fastspring = {
    builder: { "onOrderItemsChanged": onFscDataCallback }
};

/**
 * 2. ADD & SHOW POPUP
 */
function addToCartAndShow(path) {
    console.log("Adding Character: " + path);
    fastspring.builder.add(path); // Method 1: Add to Session
    fastspring.builder.viewCart(); // Method 2: Launch Popup
}

/**
 * 3. SHOW MODAL LORE
 */
function showDetails(path) {
    var item = fscCatalog.find(function(p) { return p.path === path; });
    if (item) {
        document.getElementById('m-title').innerText = item.display;
        document.getElementById('m-img').src = item.image;
        document.getElementById('m-desc').innerHTML = item.descriptionFull || "No lore found.";
        
        // Use Bootstrap's global constructor
        var modalEl = document.getElementById('detailsModal');
        var modal = bootstrap.Modal.getOrCreateInstance(modalEl);
        modal.show();
    }
}
