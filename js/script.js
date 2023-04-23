const apiBase = "http://eskiltorsetcom.local";
const wooCommerceBase = "/wp-json/wc/store";
const productBase = "/products"

const pagesBase = "/wp-json/wp/v2/pages";

const fullPageURL = apiBase + pagesBase;

const fullProductURL = apiBase + wooCommerceBase + productBase;

async function getProducts(){
    const response = await fetch(fullProductURL);
    const products = await response.json();
    console.log(products);
    return products;
}

async function getProduct(id){
    const response = await fetch(fullProductURL + `/${id}`);
    const product = await response.json();
    console.log(product);
    return product;
}

getProduct(13);

function createProductHTML(product){
   const container = document.querySelector(".container");

   const productContainer = document.createElement("div");
   productContainer.classList.add("product");
   productContainer.id = product.id;

   const title = document.createElement("h2");
   title.innerText = product.name;
   productContainer.append(title);

   for (let i = 0; i < product.images.length; i++){
    const imgData = product.images[i];
    const img = document.createElement("img");
    img.src = imgData.src;
    img.alt = imgData.alt;
    productContainer.append(img);
   }

   container.append(productContainer);

}

function createProductsHTML(products){
    for (let i = 0; i < products.length; i++){
        const product = products[i];
        createProductHTML(product);
    }
}

async function main() {
    const products = await getProducts();
    createProductsHTML(products);
}

main();