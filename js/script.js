console.log("Ready to Roll UI initialized");

let fscCatalog = [];

/*
FastSpring Data Callback
Runs when SBL loads catalog
*/
function onFscDataCallback(data) {
    console.log("FastSpring catalog sync", data);

    // Robust check for both items and groups to ensure catalog is saved
    if (data && data.items) {
        fscCatalog = data.items;
    } else if (data && data.groups) {
        fscCatalog = data.groups.reduce(function(acc, group) {
            return acc.concat(group.items || []);
        }, []);
    }
}

// Link the callback to the global window object for SBL to find
window.fastspring = {
    builder: {
        "onOrderItemsChanged": onFscDataCallback
    }
};

/*
Add product to cart
*/
function addToCart(path) {
    console.log("Adding to cart:", path);
    fastspring.builder.add(path);
    fastspring.builder.viewCart();
}

/*
Product Details Modal
*/
function showDetails(path) {
    let product = fscCatalog.find(function(item) {
        return item.path === path;
    });

    if (!product) {
        console.warn("Product not found:", path);
        return;
    }

    document.getElementById("m-title").innerText = product.display;
    document.getElementById("m-img").src = product.image;
    document.getElementById("m-desc").innerHTML = product.descriptionFull || "";

    let modal = new bootstrap.Modal(document.getElementById("detailsModal"));
    modal.show();
}

/**
 * changeQty
 * NEW: Uses the FastSpring Public Methods API to update quantities.
 * This is used by the +/- buttons on your main character cards.
 */
function changeQty(productPath, delta) {
    // Find the directive element for this specific path to get current quantity
    const qtyElement = document.querySelector(`[data-fsc-item-path="${productPath}"][data-fsc-item-quantity]`);
    
    if (qtyElement) {
        const currentQty = parseInt(qtyElement.textContent || 0);
        const newQty = currentQty + delta;

        if (newQty >= 0) {
            console.log(`SBL: Updating quantity for ${productPath} to ${newQty}`);
            // Use the official SBL Method to push the change to the session
            fastspring.builder.update(productPath, newQty);
        }
    }
}
