/* --- FASTSPRING SBL GLOBAL FUNCTIONS --- */

// Global variable to store product data from the callback
var fscCatalog = [];

/**
 * 1. THE DATA CALLBACK
 * This is the 'data-data-callback' from your documentation. 
 * It fires whenever FastSpring updates or provides session data. 
 */
function onFscDataCallback(data) {
    console.log("Ready to Roll: SBL Data Received", data);
    
    // We store the items so the 'View Details' modal can use them later
    if (data && data.groups) {
        fscCatalog = data.groups.reduce(function(acc, group) {
            return acc.concat(group.items);
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
 * Uses documented .add() and .viewCart() methods. 
 */
function addToCartAndShow(path) {
    console.log("SBL: Adding product to cart -> " + path);
    fastspring.builder.add(path);
    fastspring.builder.viewCart();
}

/**
 * 3. VIEW FULL DETAILS MODAL
 * This function looks up the product in our stored catalog
 * and fills the modal using the 'descriptionFull' data. 
 */
function showDetails(path) {
    // Find the product in the catalog we saved during the callback
    var product = fscCatalog.find(function(item) {
        return item.path === path;
    });
    
    if (product) {
        document.getElementById('m-title').innerText = product.display;
        document.getElementById('m-img').src = product.image;
        document.getElementById('m-desc').innerHTML = product.descriptionFull || "Lore loading...";
        
        // Launch the Bootstrap Modal
        var myModal = new bootstrap.Modal(document.getElementById('detailsModal'));
        myModal.show();
    } else {
        console.warn("SBL: Could not find detailed data for " + path);
    }
}
