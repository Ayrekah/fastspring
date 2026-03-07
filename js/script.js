(function($) {

    "use strict";

    var searchPopup = function() {
      // open search box
      $('#header-nav').on('click', '.search-button', function(e) {
        $('.search-popup').toggleClass('is-visible');
      });

      $('#header-nav').on('click', '.btn-close-search', function(e) {
        $('.search-popup').toggleClass('is-visible');
      });
      
      $(".search-popup-trigger").on("click", function(b) {
          b.preventDefault();
          $(".search-popup").addClass("is-visible"),
          setTimeout(function() {
              $(".search-popup").find("#search-popup").focus()
          }, 350)
      }),
      $(".search-popup").on("click", function(b) {
          ($(b.target).is(".search-popup-close") || $(b.target).is(".search-popup-close svg") || $(b.target).is(".search-popup-close path") || $(b.target).is(".search-popup")) && (b.preventDefault(),
          $(this).removeClass("is-visible"))
      }),
      $(document).keyup(function(b) {
          "27" === b.which && $(".search-popup").removeClass("is-visible")
      })
    }

    var initProductQty = function(){

      $('.product-qty').each(function(){

        var $el_product = $(this);
        var quantity = 0;

        $el_product.find('.quantity-right-plus').click(function(e){
            e.preventDefault();
            var quantity = parseInt($el_product.find('#quantity').val());
            $el_product.find('#quantity').val(quantity + 1);
        });

        $el_product.find('.quantity-left-minus').click(function(e){
            e.preventDefault();
            var quantity = parseInt($el_product.find('#quantity').val());
            if(quantity>0){
              $el_product.find('#quantity').val(quantity - 1);
            }
        });

      });

    }

    $(document).ready(function() {

      searchPopup();
      initProductQty();

      var swiper = new Swiper(".main-swiper", {
        speed: 500,
        navigation: {
          nextEl: ".swiper-arrow-prev",
          prevEl: ".swiper-arrow-next",
        },
      });         

      var swiper = new Swiper(".product-swiper", {
        slidesPerView: 4,
        spaceBetween: 10,
        pagination: {
          el: "#mobile-products .swiper-pagination",
          clickable: true,
        },
        breakpoints: {
          0: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          980: {
            slidesPerView: 4,
            spaceBetween: 20,
          }
        },
      });      

      var swiper = new Swiper(".product-watch-swiper", {
        slidesPerView: 4,
        spaceBetween: 10,
        pagination: {
          el: "#smart-watches .swiper-pagination",
          clickable: true,
        },
        breakpoints: {
          0: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          980: {
            slidesPerView: 4,
            spaceBetween: 20,
          }
        },
      }); 

      var swiper = new Swiper(".testimonial-swiper", {
        loop: true,
        navigation: {
          nextEl: ".swiper-arrow-prev",
          prevEl: ".swiper-arrow-next",
        },
      }); 

    }); // End of a document ready

})(jQuery);

/* --- FASTSPRING SBL GLOBAL FUNCTIONS --- */

// 1. Global variable to store product details for the modal
var fscCatalog = [];

/**
 * 2. THE DATA CALLBACK
 * Captures product data (Full Description, Images, etc.) on page load.
 */
function onFscDataCallback(data) {
    if (data && data.groups) {
        // Flattens the groups into a single list of items
        fscCatalog = data.groups.reduce(function(acc, group) {
            return acc.concat(group.items || []);
        }, []);
    }
}

// Attach the callback to the FastSpring Builder
window.fastspring = {
    builder: {
        "onOrderItemsChanged": onFscDataCallback
    }
};

/**
 * 3. ADD TO CART & SHOW POPUP
 * Used by the "Add to Cart" buttons.
 */
function addToCartAndShow(path) {
    // Methods from your documentation: .add() and .viewCart()
    fastspring.builder.add(path);
    fastspring.builder.viewCart();
}

/**
 * 4. SHOW DETAILS MODAL
 * Used by the "View Full Details" buttons.
 */
function showDetails(path) {
    // Find the product in our saved catalog
    var product = fscCatalog.find(function(item) {
        return item.path === path;
    });

    if (product) {
        // Fill the modal elements (ensure these IDs exist in your index.html)
        document.getElementById('m-title').innerText = product.display;
        document.getElementById('m-img').src = product.image;
        document.getElementById('m-desc').innerHTML = product.descriptionFull || "Lore loading...";
        
        // Show the Bootstrap Modal
        var myModal = new bootstrap.Modal(document.getElementById('detailsModal'));
        myModal.show();
    }
}
