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
 * Fires automatically when FastSpring data syncs.
 */
function onFscDataCallback(data) {
    console.log("SBL Data Sync Success:", data);
    
    // Save items to local memory so 'View Details' modal works instantly
    if (data && data.groups) {
        fscCatalog = data.groups.reduce(function(acc, group) {
            return acc.concat(group.items || []);
        }, []);
    }
}

// Link callback to the Global FastSpring object
window.fastspring = {
    builder: { "onOrderItemsChanged": onFscDataCallback }
};

/**
 * 2. ADD & SHOW POPUP
 * Chains .add() and .viewCart() as requested.
 */
function addToCartAndShow(path) {
    console.log("SBL: Adding character -> " + path);
    fastspring.builder.add(path);
    fastspring.builder.viewCart();
}

/**
 * 3. SHOW DETAILS MODAL
 * Populates lore from the saved fscCatalog.
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
        console.warn("SBL: Item data for " + path + " not found.");
    }
}
