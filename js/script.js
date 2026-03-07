/* script.js */
(function($) {
    "use strict";
    $(document).ready(function() {
        // Initialize template UI
        console.log("Ready to Roll: UI Initialized");
    });
})(jQuery);

/* --- GLOBAL FASTSPRING LOGIC --- */
var fscCatalog = [];

/**
 * 1. THE DATA CALLBACK
 * Saves dashboard lore (descriptionFull) into fscCatalog
 */
function onFscDataCallback(data) {
    console.log("SBL Data Sync:", data);
    if (data && data.groups) {
        fscCatalog = data.groups.reduce(function(acc, group) {
            return acc.concat(group.items || []);
        }, []);
    }
}

// Attach to global FastSpring object
window.fastspring = {
    builder: { "onOrderItemsChanged": onFscDataCallback }
};

/**
 * 2. ADD & SHOW
 * Uses chained methods to prevent empty-session errors
 */
function addToCartAndShow(path) {
    console.log("SBL: Adding character -> " + path);
    fastspring.builder.add(path);
    fastspring.builder.viewCart();
}

/**
 * 3. SHOW MODAL
 * Pulls stored data for the lore popup
 */
function showDetails(path) {
    var product = fscCatalog.find(function(item) {
        return item.path === path;
    });

    if (product) {
        document.getElementById('m-title').innerText = product.display;
        document.getElementById('m-img').src = product.image;
        document.getElementById('m-desc').innerHTML = product.descriptionFull || "Lore loading...";
        
        var modal = new bootstrap.Modal(document.getElementById('detailsModal'));
        modal.show();
    } else {
        console.warn("SBL: Product lore not yet synced for " + path);
    }
}
