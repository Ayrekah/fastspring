(function($) {
    "use strict";
    $(document).ready(function() {
        console.log("Ready to Roll UI: Ready");
    });
})(jQuery);

/* --- FASTSPRING GLOBAL SCOPE FUNCTIONS --- */
var fscCatalog = [];

/**
 * 1. THE DATA CALLBACK
 * Syncs Prices and Lore on load.
 */
function onFscDataCallback(data) {
    console.log("Ready to Roll: SBL Sync Successful", data);
    
    // Flatten items so the Modal can find descriptions instantly
    if (data && data.groups) {
        fscCatalog = data.groups.reduce(function(acc, group) {
            return acc.concat(group.items || []);
        }, []);
    }
}

// Attach callback to Global window
window.fastspring = {
    builder: { "onOrderItemsChanged": onFscDataCallback }
};

/**
 * 2. ADD & SHOW POPUP
 */
function addToCartAndShow(path) {
    console.log("SBL: Adding character -> " + path);
    fastspring.builder.add(path);
    fastspring.builder.viewCart();
}

/**
 * 3. SHOW DETAILS MODAL
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
    }
}
