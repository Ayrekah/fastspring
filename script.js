// All logic is currently handled by FastSpring SBL HTML Attributes.
console.log("Store Builder Library is active.");
document.addEventListener("click", function(e){

  if(e.target.classList.contains("add-btn")){
    document.getElementById("fsc-embedded-checkout-container").style.display = "block";
  }

});
