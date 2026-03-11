/*// Wait for FastSpring to be ready
document.addEventListener("DOMContentLoaded", function () {
  const checkoutButton = document.getElementById("checkout-button");

  if (checkoutButton) {
    checkoutButton.addEventListener("click", function () {
      // Show the embedded checkout container
      const checkoutContainer = document.getElementById("fsc-embedded-checkout-container");
      checkoutContainer.style.display = "block";

      // Launch FastSpring embedded checkout overlay
      fastspring.builder.checkout();
    });
  }
});

// Optional: coupon handling
function applycoupon() {
  const code = document.getElementById("couponcode").value;
  fastspring.builder.applyCoupon(code);
} */

function applycoupon() {
  var couponid = document.getElementById('couponcode').value;
  fastspring.builder.promo(couponid);
}

function markupHelpersCallback(){}

function dataCallback(data){

  console.log("FastSpring cart data:", data);

  var template = Handlebars.compile(
    document.getElementById("fsb-cart-template").innerHTML
  );

  document.getElementById("fsb-cart").innerHTML = template(data);

}

function errorCallback(code,message){
  console.log("FastSpring error:",code,message);
}
function showCheckout(){

  document.getElementById("checkout-area").style.display = "block";

  fastspring.builder.checkout();

} 
