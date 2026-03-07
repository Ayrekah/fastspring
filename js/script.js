(function($) {
    "use strict";

    $(document).ready(function() {
        // Search logic initialization
        if (typeof searchPopup === 'function') searchPopup();

        // 1. SWIPER INITIALIZATION (Fixed ReferenceError)
        if (typeof Swiper !== 'undefined') {
            new Swiper(".main-swiper", { speed: 500, navigation: { nextEl: ".swiper-arrow-prev", prevEl: ".swiper-arrow-next" } });
            new Swiper(".product-swiper", { slidesPerView: 4, spaceBetween: 10, pagination: { el: "#mobile-products .swiper-pagination", clickable: true } });
        }
    });
})(jQuery);

/* --- FASTSPRING GLOBAL FUNCTIONS --- */
var fscCatalog = [];

/**
 * 2. DATA CALLBACK: Syncs Lore from Dashboard
 */
function onFscDataCallback(data) {
    console.log("SBL Sync:", data);
    if (data && data.groups) {
        fscCatalog = data.groups.reduce(function(acc, group) {
            return acc.concat(group.items || []);
        }, []);
    }
}

window.fastspring = {
    builder: { "onOrderItemsChanged": onFscDataCallback }
};

/**
 * 3. ADD TO CART & SHOW POPUP
 */
function addToCartAndShow(path) {
    console.log("Adding Character: " + path);
    fastspring.builder.add(path);   // Method 1: Add to Session
    fastspring.builder.viewCart(); // Method 2: Launch Popup
}

/**
 * 4. SHOW LORE MODAL
 */
function showDetails(path) {
    var item = fscCatalog.find(function(p) { return p.path === path; });
    if (item) {
        document.getElementById('m-title').innerText = item.display;
        document.getElementById('m-img').src = item.image;
        document.getElementById('m-desc').innerHTML = item.descriptionFull || "Loading lore...";
        
        var modalEl = document.getElementById('detailsModal');
        var modal = bootstrap.Modal.getOrCreateInstance(modalEl);
        modal.show();
    }
}
