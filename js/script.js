console.log("Ready to Roll UI initialized")

let fscCatalog = []

/*
FastSpring Data Callback
Runs when SBL loads catalog
*/
function onFscDataCallback(data){

console.log("FastSpring catalog sync", data)

if(data && data.groups){

fscCatalog = data.groups.reduce(function(acc, group){
return acc.concat(group.items || [])
},[])

}

}


/*
Add product to cart
*/
function addToCart(path){

console.log("Adding to cart:", path)

fastspring.builder.add(path)
fastspring.builder.viewCart()

}


/*
Product Details Modal
*/
function showDetails(path){

let product = fscCatalog.find(function(item){
return item.path === path
})

if(!product){
console.warn("Product not found:", path)
return
}

document.getElementById("m-title").innerText = product.display
document.getElementById("m-img").src = product.image
document.getElementById("m-desc").innerHTML = product.descriptionFull || ""

let modal = new bootstrap.Modal(
document.getElementById("detailsModal")
)

modal.show()

}
