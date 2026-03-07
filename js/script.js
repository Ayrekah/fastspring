(function($) {
    "use strict";

    // 1. Template Search Popup
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

    // 2. Template Quantity UI
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
                if (quantity > 0) $el_product.find('#quantity').val(quantity - 1);
            });
        });
    };

    // 3. Initialize Everything
    $(document).ready(function() {
        searchPopup();
        initProductQty();

        new Swiper(".main-swiper", { speed: 500, navigation: { nextEl: ".swiper-arrow-prev", prevEl: ".swiper-arrow-next" } });
        new Swiper(".product-swiper", { slidesPerView: 4, spaceBetween: 10, pagination: { el: "#mobile-products .swiper-pagination", clickable: true }, breakpoints: { 0: { slidesPerView: 2 }, 980: { slidesPerView: 4 } } });
        new Swiper(".testimonial-swiper", { loop: true, navigation: { nextEl: ".swiper-arrow-prev", prevEl: ".swiper-arrow-next" } });
    });

})(jQuery); // <--- THIS CLOSES THE JQUERY BLOCK PROPERLY

/* -------------------------------------------------------------------------
   FASTSPRING SBL GLOBAL FUNCTIONS (Must be outside the block above)
   ------------------------------------------------------------------------- */

var fscCatalog = [];

/**
 * Syncs product data on load (Prices, Lore, etc.)
 */
function onFscDataCallback(data) {
    console.log("Ready to Roll: SBL Data Received", data);
    if (data && data.items) {
        fscCatalog = data.items;
    } else if (data && data.groups) {
        fscCatalog = data.groups.reduce(function(acc, group) {
            return acc.concat(group.items || []);
        }, []);
    }
}

// Link to the global window object
window.fastspring = {
    builder: { "onOrderItemsChanged": onFscDataCallback }
};

/**
 * Add + Popup View
 */
function addToCartAndShow(path) {
    console.log("Adding Character: " + path);
    fastspring.builder.add(path);
    fastspring.builder.viewCart();
}

/**
 * Details Modal Logic
 */
function showDetails(path) {
    var product = fscCatalog.find(function(item) { return item.path === path; });
    
    if (product) {
        document.getElementById('m-title').innerText = product.display;
        document.getElementById('m-img').src = product.image;
        document.getElementById('m-desc').innerHTML = product.descriptionFull || "Lore loading...";
        
        var myModal = new bootstrap.Modal(document.getElementById('detailsModal'));
        myModal.show();
    } else {
        console.warn("Catalog not yet loaded for: " + path);
    }
}
