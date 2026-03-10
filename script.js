function applycoupon() {
	var couponid= document.getElementById('couponcode').value;
	fastspring.builder.promo(couponid);
}

function markupHelpersCallback() {
	Handlebars.registerHelper('iff', function(lvalue, operator, rvalue, options) {
		var functions = {
			'==':       function(l,r) { return l == r; },
			'===':      function(l,r) { return l === r; },
			'!=':       function(l,r) { return l != r; },
			'<':        function(l,r) { return l < r; },
			'>':        function(l,r) { return l > r; },
			'<=':       function(l,r) { return l <= r; },
			'>=':       function(l,r) { return l >= r; },
			'typeof':   function(l,r) { return typeof l === r; }
		};
		if (!functions.hasOwnProperty(operator)){
			throw new Error("Handlerbars Helper 'iff' doesn't know the operator " + operator);
		}
		var result = functions[operator](lvalue,rvalue);
		if( result ) {
			return options.fn(this);
		} else {
			return options.inverse(this);
		}
	});
	Handlebars.registerPartial("pricing", document.getElementById('pricing-partial').innerHTML);
	Handlebars.registerPartial("quantity", document.getElementById('quantity-partial').innerHTML);
	Handlebars.registerPartial("pricing2", document.getElementById('pricing-partial2').innerHTML);
	Handlebars.registerPartial("volume-discount", document.getElementById('volume-discount').innerHTML);
	Handlebars.registerPartial("xsell", document.getElementById('xsell').innerHTML);
	Handlebars.registerPartial("upsell", document.getElementById('upsell').innerHTML);
	Handlebars.registerPartial("singlechoice", document.getElementById('singlechoice').innerHTML);
	Handlebars.registerPartial("multichoice", document.getElementById('multichoice').innerHTML);
}

function beforeRequestsCallbackFunction() {
	var fastspring_spinner=document.getElementById("fastspring_spinner");
	fastspring_spinner.style.display = "block";
}

function afterMarkupCallbackFunction() {
	init();
	var fastspring_spinner=document.getElementById("fastspring_spinner");
	fastspring_spinner.style.animationName="fsb-revfadeIn";
	setTimeout(function(){
		fastspring_spinner.style.animationName = "fsb-fadeIn";
		fastspring_spinner.style.display = "none";
	},450);    
}

function popupClosed(data) {
	var fastspring_spinner=document.getElementById("fastspring_spinner");
	fastspring_spinner.style.animationName="fs_revfadeIn";
	setTimeout(function(){
		fastspring_spinner.style.animationName = "fs_fadeIn";
		fastspring_spinner.style.display = "none";
	},450);
	if (data) {
		fastspring.builder.reset();
		/*If you want to redirect you can do the following*/
		/*window.location.replace("https://myDomain.com/?orderId=" + data.reference);*/
	}
}

/*If using Google Analytics, you can use the following function to decorate the links*/
function decorateCallback(url) {
	var linkerParam = null;
	if ( ga && typeof ga === 'function') {
		ga(function() {
			var trackers = ga.getAll();
			linkerParam = trackers[0].get('linkerParam');
		});
	}
	return (linkerParam ? url + '?' + linkerParam : url);
}

function errorCallback(code, string) {
	var fastspring_spinner=document.getElementById("fastspring_spinner");
	fastspring_spinner.style.animationName="fsb-revfadeIn";
	setTimeout(function(){
		fastspring_spinner.style.animationName = "fsb-fadeIn";
		fastspring_spinner.style.display = "none";
	},450);
	var fsb_error=document.getElementById("fsb_error");
	var fsb_error_msg=document.getElementById("fsb_error_msg");
	fsb_error.style.display = "block";
	fsb_error.style.animationName = "fsb-mod_animatetop";
	fsb_error_msg.innerHTML = "Error: " + code + " - " + string;
	setTimeout(function(){
		fsb_error.style.animationName = "fsb-mod_revanimatetop";
		setTimeout(function(){
			fsb_error.style.display = "none";
		}, 400)
	},5000);
}

function dataCallback(data) {
	if(data.messages[0]) {
		var fsb_error=document.getElementById("fsb_error");
		var fsb_error_msg=document.getElementById("fsb_error_msg");
		fsb_error.style.display = "block";
		fsb_error.style.animationName = "fsb-mod_animatetop";
		fsb_error_msg.innerHTML = data.messages[0].phrase;
		setTimeout(function(){
			fsb_error.style.animationName = "fsb-mod_revanimatetop";
			setTimeout(function(){
				fsb_error.style.display = "none";
			}, 400)
		},5000);
	}
	var minicart = document.getElementById("minicart-count");
	if(minicart) {
		let inCart = 0;
		if (data && data.hasOwnProperty('groups')) {
			const { groups } = data;
			groups.forEach(group => {
				if (group.items && Array.isArray(group.items)) {
					group.items.forEach(item => {
						if (item.selected) {
							inCart += item.quantity;
						}
					});
				}
			});
		}
		document.getElementById("minicart-count").innerHTML = inCart;
	}
}

var value,
	quantity = document.getElementsByClassName('fsb-number');
function createBindings(quantityContainer) {
	var quantityAmount = quantityContainer.getElementsByClassName('fsb-qtyinput')[0];
	var increase = quantityContainer.getElementsByClassName('fsb-plus')[0];
	var decrease = quantityContainer.getElementsByClassName('fsb-minus')[0];
	increase.addEventListener('click', function () { increaseValue(this, quantityAmount); });
	decrease.addEventListener('click', function () { decreaseValue(this, quantityAmount); });
}

function init() {
	for (var i = 0; i < quantity.length; i++ ) {
		createBindings(quantity[i]);
	}
};

function increaseValue(clicker, quantityAmount) {
	value = parseInt(quantityAmount.value, 10);
	product = quantityAmount.getAttribute("data-fsc-item-path");
	value = isNaN(value) ? 0 : value;
	value++;
	quantityAmount.value = value;
	fastspring.builder.update(product, value);
}

function decreaseValue(clicker, quantityAmount) {
	value = parseInt(quantityAmount.value, 10);
	product = quantityAmount.getAttribute("data-fsc-item-path");
	value = isNaN(value) ? 0 : value;
	if (value > 0) value--;
	quantityAmount.value = value;
	fastspring.builder.update(product, value);
}
