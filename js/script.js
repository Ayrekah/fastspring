(function($) {
    "use strict";
    // 1. Template Search Popup Logic
    var searchPopup = function() {
        $('#header-nav').on('click', '.search-button', function(e) {
            $('.search-popup').toggleClass('is-visible');
        });
        $('#header-nav').on('click', '.btn-close-search', function(e) {
            $('.search-popup').toggleClass('is-visible');
        });
        $(".search-popup-trigger").on("click", function(b) {
            b.preventDefault();
            $(".search-popup").addClass("is-visible");
            setTimeout(function() { $(".search-popup").find("#search-popup").focus(); }, 350);
        });
        $(".search-popup").on("click", function(b) {
            ( $(b.target).is(".search-popup-close") || $(b.target).is(".search-popup-close svg") || $(b.target).is(".search-popup-close path") || $(b.target).is(".search-popup") ) && (b.preventDefault(), $(this).removeClass("is-visible"));
        });
        $(document).keyup(function(b) { if (b.which === 27) $(".search-popup").removeClass("is-visible"); });
    };

    $(document).ready(function() {
        searchPopup();
    });
})(jQuery);

/* --- FASTSPRING SBL GLOBAL FUNCTIONS --- */

var fscCatalog = [];

/**
 * DATA CALLBACK: Captured Lore from Dashboard
 */
function onFscDataCallback(data) {
    console.log("Ready to Roll: SBL Data Sync Success", data);
    if (data && data.groups) {
        fscCatalog = data.groups.reduce(function(acc, group) {
            return acc.concat(group.items || []);
        }, []);
    }
}

// Link to the Global FastSpring Builder object
window.fastspring = {
    builder: { "onOrderItemsChanged": onFscDataCallback }
};

/**
 * ADD & SHOW: Prevents the 400 'empty-session' error
 */
function addToCartAndShow(path) {
    console.log("SBL: Adding character -> " + path);
    fastspring.builder.add(path); // Method: .add()
    fastspring.builder.viewCart(); // Method: .viewCart()
}

/**
 * SHOW DETAILS: Pulls 'descriptionFull' Lore
 */
function showDetails(path) {
    var product = fscCatalog.find(function(item) {
        return item.path === path;
    });

    if (product) {
        document.getElementById('m-title').innerText = product.display;
        document.getElementById('m-img').src = product.image;
        document.getElementById('m-desc').innerHTML = product.descriptionFull || "Lore loading...";
        
        // Launch Bootstrap Modal
        var myModal = new bootstrap.Modal(document.getElementById('detailsModal'));
        myModal.show();
    } else {
        console.warn("SBL: Character data for " + path + " not found.");
    }
}
