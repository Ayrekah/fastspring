<!DOCTYPE html>
<html lang="en">
<head>
    <title>Ready to Roll | TTRPG Character Creator</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="style.css">

    <script id="fsc-api"
        src="https://sbl.onfastspring.com/sbl/1.0.6/fastspring-builder.min.js"
        type="text/javascript"
        data-storefront="ericateststore.test.onfastspring.com/embedded-readytoroll"
        data-data-callback="onFscDataCallback"
        data-debug="true">
    </script>

    <style>
        .product-card { border: 1px solid #eee; padding: 25px; background: #fff; text-align: center; transition: 0.3s; }
        .product-card:hover { border-color: #000; }
        .product-card img { max-height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 15px; cursor: pointer; }
        
        /*  FIX: Forces FastSpring to show data even if it tries to hide it initially */
        [data-fsc-item-path] { display: block !important; visibility: visible !important; opacity: 1 !important; }
        
        .modal-body img { max-height: 300px; border-radius: 12px; }
    </style>
</head>

<body>
    <header class="p-3 border-bottom sticky-top bg-white">
        <div class="container d-flex justify-content-between align-items-center">
            <strong class="h4 m-0">READY TO ROLL</strong>
            <button class="btn btn-dark" onclick="fastspring.builder.viewCart()">
                VIEW CART (<span data-fsc-order-total>$0.00</span>)
            </button>
        </div>
    </header>

    <section class="container py-5">
        <div class="row g-4">
            
            <div class="col-md-4">
                <div class="product-card">
                    <img data-fsc-item-path="the-tavern" data-fsc-item-image src="" onclick="showDetails('the-tavern')">
                    <h4 data-fsc-item-path="the-tavern" data-fsc-item-display>The Tavern</h4>
                    <div class="h5 text-primary mb-3" data-fsc-item-path="the-tavern" data-fsc-item-price></div>
                    
                    <button class="btn btn-dark w-100" onclick="addToCartAndShow('the-tavern')">Add to Cart</button>
                    <button class="btn btn-link btn-sm text-dark mt-2" onclick="showDetails('the-tavern')">View Full Details</button>
                </div>
            </div>

            <div class="col-md-4">
                <div class="product-card">
                    <img data-fsc-item-path="the-campfire" data-fsc-item-image src="" onclick="showDetails('the-campfire')">
                    <h4 data-fsc-item-path="the-campfire" data-fsc-item-display>The Campfire</h4>
                    <div class="h5 text-primary mb-3" data-fsc-item-path="the-campfire" data-fsc-item-price></div>
                    <button class="btn btn-dark w-100" onclick="addToCartAndShow('the-campfire')">Add to Cart</button>
                    <button class="btn btn-link btn-sm text-dark mt-2" onclick="showDetails('the-campfire')">View Full Details</button>
                </div>
            </div>

            <div class="col-md-4">
                <div class="product-card">
                    <img data-fsc-item-path="the-guild-hall" data-fsc-item-image src="" onclick="showDetails('the-guild-hall')">
                    <h4 data-fsc-item-path="the-guild-hall" data-fsc-item-display>The Guild Hall</h4>
                    <div class="h5 text-primary mb-3" data-fsc-item-path="the-guild-hall" data-fsc-item-price></div>
                    <button class="btn btn-dark w-100" onclick="addToCartAndShow('the-guild-hall')">Add to Cart</button>
                    <button class="btn btn-link btn-sm text-dark mt-2" onclick="showDetails('the-guild-hall')">View Full Details</button>
                </div>
            </div>

        </div>
    </section>

    <div class="modal fade" id="detailsModal" tabindex="-1">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="m-title"></h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-5 text-center"><img id="m-img" src="" class="img-fluid shadow-sm"></div>
                        <div class="col-md-7"><div id="m-desc"></div></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="js/jquery-1.11.0.min.js"></script>
    <script src="js/bootstrap.bundle.min.js"></script>
    <script src="js/script.js"></script>
</body>
</html>
