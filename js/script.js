/* --- FASTSPRING SBL GLOBAL FUNCTIONS --- */

// Global variable to store product data from the callback
var fscCatalog = [];

/**
 * 1. THE DATA CALLBACK
 * This is the 'data-data-callback' from your index.html.
 */
function onFscDataCallback(data) {
    console.log("Ready to Roll: SBL Data Received", data);
    
    // We store the items so the 'View Details' modal can use them later
    // SBL sometimes nests items in groups or bundles; this scans everything.
    if (data && data.items) {
        fscCatalog = data.items;
    } else if (data && data.groups) {
        fscCatalog = data.groups.reduce(function(acc, group) {
            return acc.concat(group.items || []);
        }, []);
    }
}

// Link the callback to the global FastSpring object
window.fastspring = {
    builder: { 
        "onOrderItemsChanged": onFscDataCallback 
    }
};

/**
 * 2. ADD TO CART & POPUP
 */
function addToCartAndShow(path) {
    console.log("SBL: Adding product to cart -> " + path);
    fastspring.builder.add(path); [cite: 1]
    fastspring.builder.viewCart(); [cite: 1]
}

/**
 * 3. VIEW FULL DETAILS MODAL
 * This function looks up the product in our stored catalog.
 */
function showDetails(path) {
    console.log("Searching catalog for: " + path);
    
    // We check our fscCatalog first, then try the direct SBL cache
    var product = fscCatalog.find(function(item) {
        return item.path === path;
    }) || (typeof fastspring.builder.item === 'function' ? fastspring.builder.item(path) : null);
    
    if (product) {
        document.getElementById('m-title').innerText = product.display; [cite: 2]
        document.getElementById('m-img').src = product.image; [cite: 2]
        document.getElementById('m-desc').innerHTML = product.descriptionFull || "Lore loading..."; [cite: 2]
        
        var myModal = new bootstrap.Modal(document.getElementById('detailsModal'));
        myModal.show();
    } else {
        console.warn("SBL: Could not find detailed data for " + path + ". Ensure the product is live in your dashboard.");
    }
}
