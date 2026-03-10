/* PROMO CODE */

function applycoupon() {
  var couponid = document.getElementById('couponcode').value;
  fastspring.builder.promo(couponid);
}


/* HANDLEBARS HELPER */

function markupHelpersCallback() {

  Handlebars.registerHelper('iff', function (lvalue, operator, rvalue, options) {

    var operators = {
      '==': function(l,r){ return l == r; },
      '===': function(l,r){ return l === r; },
      '!=': function(l,r){ return l != r; },
      '<': function(l,r){ return l < r; },
      '>': function(l,r){ return l > r; },
      '<=': function(l,r){ return l <= r; },
      '>=': function(l,r){ return l >= r; }
    };

    if (!operators[operator]) {
      return options.inverse(this);
    }

    var result = operators[operator](lvalue,rvalue);

    if(result){
      return options.fn(this);
    } else {
      return options.inverse(this);
    }

  });

}


/* CART RENDERING */

function dataCallback(data) {

  var template = Handlebars.compile(
    document.getElementById("fsb-cart-template").innerHTML
  );

  document.getElementById("fsb-cart").innerHTML = template(data);

}


/* BASIC ERROR HANDLING */

function errorCallback(code, message) {

  console.error("FastSpring Error:", code, message);

}
