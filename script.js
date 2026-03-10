/* PROMO CODE */

function applycoupon() {
  var couponid = document.getElementById('couponcode').value;
  fastspring.builder.promo(couponid);
}


/* HANDLEBARS HELPERS */

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


/* FASTSPRING CART RENDER */

function afterMarkupCallbackFunction(data) {

  var template = Handlebars.compile(
    document.getElementById("fsb-cart-template").innerHTML
  );

  document.getElementById("fsb-cart").innerHTML = template(data);

}


/* CART DATA UPDATES */

function dataCallback(data) {

  var minicart = document.getElementById("minicart-count");

  if(minicart){

    let inCart = 0;

    if (data && data.groups) {

      data.groups.forEach(group => {

        group.items.forEach(item => {

          if (item.selected) {
            inCart += item.quantity;
          }

        });

      });

    }

    minicart.innerHTML = inCart;

  }

}


/* BASIC ERROR HANDLING */

function errorCallback(code, message) {

  console.error("FastSpring Error:", code, message);

}
