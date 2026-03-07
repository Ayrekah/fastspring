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
