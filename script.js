function applycoupon() {
  var couponid = document.getElementById('couponcode').value;
  fastspring.builder.promo(couponid);
}

/* REGISTER HANDLEBARS HELPERS */
function markupHelpersCallback() {

  Handlebars.registerHelper('iff', function(lvalue, operator, rvalue, options) {

    var functions = {
      '==':  function(l,r) { return l == r; },
      '===': function(l,r) { return l === r; },
      '!=':  function(l,r) { return l != r; },
      '<':   function(l,r) { return l < r; },
      '>':   function(l,r) { return l > r; },
      '<=':  function(l,r) { return l <= r; },
      '>=':  function(l,r) { return l >= r; }
    };

    if (!functions[operator]) {
      return options.inverse(this);
    }

    if (functions[operator](lvalue, rvalue)) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }

  });

}

/* SHOW SPINNER BEFORE API CALL */
function beforeRequestsCallbackFunction() {
  var spinner = document.getElementById("fastspring_spinner");
  if(spinner) spinner.style.display = "block";
}

/* RENDER CART AFTER FASTSPRING BUILDS DATA */
function afterMarkupCallbackFunction(data) {

  var template = Handlebars.compile(
    document.getElementById("fsb-cart-template").innerHTML
  );

  document.getElementById("fsb-cart").innerHTML = template(data);

}

/* ERROR HANDLING */
function errorCallback(code, string) {
  console.error("FastSpring Error:", code, string);
}

/* CART DATA UPDATES */
function dataCallback(data) {

  if(!data) return;

  var template = Handlebars.compile(
    document.getElementById("fsb-cart-template").innerHTML
  );

  document.getElementById("fsb-cart").innerHTML = template(data);

}
