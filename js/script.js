(function($) {
    "use strict";

    // 1. Search Popup Logic
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
            setTimeout(function() {
                $(".search-popup").find("#search-popup").focus();
            }, 350);
        });

        $(".search-popup").on("click", function(b) {
            ( $(b.target).is(".search-popup-close") || $(b.target).is(".search-popup-close svg") || $(b.target).is(".search-popup-close path") || $(b.target).is(".search-popup") ) && (b.preventDefault(), $(this).removeClass("is-visible"));
        });

        $(document).keyup(function(b) {
            if (b.which === 27) $(".search-popup").removeClass("is-visible");
        });
    };

    // 2. Quantity Input Logic (Local UI only)
    var initProductQty = function() {
        $('.product-qty').each(function() {
            var $el_product = $(this);
            $el_product.find('.quantity-right-plus').click(function(e) {
                e.preventDefault();
                var quantity = parseInt($el_product.find('#quantity').val()) || 0;
                $el_product.find('#quantity').val(quantity + 1);
            });

            $el_product.find('.quantity-left-minus').click(function(e) {
                e.preventDefault();
                var quantity = parseInt($el_product.find('#quantity').val()) || 0;
                if (quantity > 0) {
                    $el_product.find('#quantity').val(quantity - 1);
                }
            });
        });
    };

    // 3. Initialize Template Features
    $(document).ready(function() {
        searchPopup();
        initProductQty();

        // Main Hero Swiper
        new Swiper(".main-swiper", {
            speed: 500,
            navigation: {
                nextEl: ".swiper-arrow-prev",
                prevEl: ".swiper-arrow-next",
            },
        });

        // Product Catalog Swiper
        new Swiper(".product-swiper", {
            slidesPerView: 4,
            spaceBetween: 10,
            pagination: { el: "#mobile-products .swiper-pagination", clickable: true },
            breakpoints: {
                0: { slidesPerView: 2, spaceBetween: 20 },
                980: { slidesPerView: 4, spaceBetween: 20 }
            },
        });

        // Testimonials Swiper
        new Swiper(".testimonial-swiper", {
            loop: true,
            navigation: {
                nextEl: ".swiper-arrow-prev",
                prevEl: ".swiper-arrow-next",
            },
        });
    });

})(jQuery);

/* -------------------------------------------------------------------------
   FASTSPRING SBL GLOBAL FUNCTIONS
   These MUST be outside the (function($){...}) block to be seen by the HTML.
   ------------------------------------------------------------------------- */

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
        fscCatalog = data.groups.flatMap(group => group.items);
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
    fastspring.builder.add(path); [cite: 1]
    fastspring.builder.viewCart(); [cite: 1]
}

/**
 * 3. VIEW FULL DETAILS MODAL
 * This function looks up the product in our stored catalog
 * and fills the modal using the 'descriptionFull' data.
 */
function showDetails(path) {
    // Find the product in the catalog we saved during the callback
    const product = fscCatalog.find(item => item.path === path);
    
    if (product) {
        document.getElementById('m-title').innerText = product.display; [cite: 2]
        document.getElementById('m-img').src = product.image; [cite: 2]
        document.getElementById('m-desc').innerHTML = product.descriptionFull || "Lore loading..."; [cite: 2]
        
        // Launch the Bootstrap Modal
        var myModal = new bootstrap.Modal(document.getElementById('detailsModal'));
        myModal.show();
    } else {
        console.warn("SBL: Could not find detailed data for " + path);
    }
}
