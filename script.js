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
