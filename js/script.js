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

    // 2. Initialize Swipers
    $(document).ready(function() {
        searchPopup();
        new Swiper(".main-swiper", { speed: 500, navigation: { nextEl: ".swiper-arrow-prev", prevEl: ".swiper-arrow-next" } });
        new Swiper(".product-swiper", { slidesPerView: 4, spaceBetween: 10, pagination: { el: "#mobile-products .swiper-pagination", clickable: true } });
        new Swiper(".testimonial-swiper", { loop: true, navigation: { nextEl: ".swiper-arrow-prev", prevEl: ".swiper-arrow-next" } });
    });

})(jQuery);

/* -------------------------------------------------------------------------
   FASTSPRING SBL GLOBAL FUNCTIONS
   ------------------------------------------------------------------------- */

var fscCatalog = [];

/**
 * THE DATA CALLBACK
 * Syncs product prices and lore from your dashboard on load.
 */
function onFscDataCallback(data) {
    console.log("Ready to Roll: SBL Data Sync", data);
    if (data && data.items) {
        fscCatalog = data.items;
    } else if (data && data.groups) {
        fscCatalog = data.groups.reduce(function(acc, group) {
            return acc.concat(group.items || []);
        }, []);
    }
}

// Attach the callback to the FastSpring Builder object
window.fastspring = {
    builder: { "onOrderItemsChanged": onFscDataCallback }
};

/**
 * ADD TO CART & POPUP
 * Uses documented .add() and .viewCart() methods.
 */
function addToCartAndShow(path) {
    console.log("SBL: Adding character -> " + path);
    fastspring.builder.add(path);
    fastspring.builder.viewCart();
}

/**
 * SHOW DETAILS MODAL
 * Looks up the product lore saved in fscCatalog.
 */
function showDetails(path) {
    var product = fscCatalog.find(function(item) {
        return item.path === path;
    });

    if (product) {
        document.getElementById('m-title').innerText = product.display;
        document.getElementById('m-img').src = product.image;
        document.getElementById('m-desc').innerHTML = product.descriptionFull || "Lore loading...";
        
        var myModal = new bootstrap.Modal(document.getElementById('detailsModal'));
        myModal.show();
    } else {
        console.warn("SBL: Product data for " + path + " not found in session.");
    }
}
