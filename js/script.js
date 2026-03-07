(function($) {
    "use strict";

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
            "27" === b.which && $(".search-popup").removeClass("is-visible");
        });
    };

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

    $(document).ready(function() {
        searchPopup();
        initProductQty();

        var mainSwiper = new Swiper(".main-swiper", {
            speed: 500,
            navigation: {
                nextEl: ".swiper-arrow-prev",
                prevEl: ".swiper-arrow-next",
            },
        });

        var productSwiper = new Swiper(".product-swiper", {
            slidesPerView: 4,
            spaceBetween: 10,
            pagination: { el: "#mobile-products .swiper-pagination", clickable: true },
            breakpoints: {
                0: { slidesPerView: 2, spaceBetween: 20 },
                980: { slidesPerView: 4, spaceBetween: 20 }
            },
        });

        var watchSwiper = new Swiper(".product-watch-swiper", {
            slidesPerView: 4,
            spaceBetween: 10,
            pagination: { el: "#smart-watches .swiper-pagination", clickable: true },
            breakpoints: {
                0: { slidesPerView: 2, spaceBetween: 20 },
                980: { slidesPerView: 4, spaceBetween: 20 }
            },
        });

        var testimonialSwiper = new Swiper(".testimonial-swiper", {
            loop: true,
            navigation: {
                nextEl: ".swiper-arrow-prev",
                prevEl: ".swiper-arrow-next",
            },
        });
    });

})(jQuery);

/* --- FASTSPRING SBL GLOBAL FUNCTIONS --- */

/**
 * Adds product and then immediately launches the FastSpring Popup Cart 
 */
function addToCartAndShow(path) {
    console.log("Ready to Roll: Adding " + path);
    fastspring.builder.add(path); [cite: 1]
    fastspring.builder.viewCart(); [cite: 1]
}

/**
 * Required callback for SBL data syncing 
 */
function onFscDataCallback(data) {
    console.log("SBL Sync Success:", data); [cite: 1]
}

window.fastspring = {
    builder: { "onOrderItemsChanged": onFscDataCallback } [cite: 1]
};

/**
 * Modal Handler pulls details from the builder item 
 */
function showDetails(path) {
    const item = fastspring.builder.item(path); [cite: 1]
    if (item) {
        document.getElementById('m-title').innerText = item.display; [cite: 1]
        document.getElementById('m-img').src = item.image; [cite: 1]
        document.getElementById('m-desc').innerHTML = item.descriptionFull || "Lore loading..."; [cite: 1]
        var myModal = new bootstrap.Modal(document.getElementById('detailsModal')); [cite: 1]
        myModal.show(); [cite: 1]
    } else {
        console.warn("SBL: Item data for " + path + " not found.");
    }
}
