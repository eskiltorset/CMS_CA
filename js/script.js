import { apiBase, wooCommerceBase, productBase, featuredURL, pagesBase } from "./constant.js";

const fullPageURL = apiBase + pagesBase;

const fullProductURL = apiBase + wooCommerceBase + productBase;
const featuredProductURL = apiBase + wooCommerceBase + featuredURL;

async function getFeaturedProducts(){
    const response = await fetch(featuredProductURL);
    const products = await response.json();
    return products;
}

async function getProducts(){
    const response = await fetch(fullProductURL);
    const featuredProducts = await getFeaturedProducts();
    const products = await response.json();
    return products;
}

function createProductHTML(product){
   const container = document.querySelector(".container");
   const id = product.id;

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

   const priceBefore = document.createElement("h3");
   priceBefore.classList.add("price-before");
   priceBefore.innerText = product.prices.regular_price + "kr";
   productContainer.append(priceBefore);

   const priceAfter = document.createElement("h3");
   priceAfter.classList.add("price-after");
   priceAfter.innerText = product.prices.price + "kr";
   productContainer.append(priceAfter);

   const wrapper = document.createElement("a");
   wrapper.classList.add("details-btn");
   wrapper.href = `/details.html?id=${id}`;
   wrapper.innerText = "Product Info"; 
   productContainer.append(wrapper);


   container.append(productContainer);

}

function createProductsHTML(products){
    for (let i = 0; i < products.length; i++){
        const product = products[i];
        createProductHTML(product);
    }
}

function createFeaturedProductHTML(product){
    const featuredContainer = document.querySelector(".featured");
    const id = product.id;
 
    const productContainer = document.createElement("div");
    productContainer.classList.add("product");
    productContainer.id = product.id;
    
    for (let i = 0; i < product.length; i++){
        product = product[i];
    }
    
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
 
    const priceBefore = document.createElement("h3");
    priceBefore.classList.add("price-before");
    priceBefore.innerText = product.prices.regular_price + "kr";
    productContainer.append(priceBefore);
 
    const priceAfter = document.createElement("h3");
    priceAfter.classList.add("price-after");
    priceAfter.innerText = product.prices.price + "kr";
    productContainer.append(priceAfter);
 
    const wrapper = document.createElement("a");
    wrapper.classList.add("details-btn");
    wrapper.href = `/details.html?id=${id}`;
    wrapper.innerText = "Product Info"; 
    productContainer.append(wrapper);
 
    featuredContainer.append(productContainer);
}

async function main() {
    const products = await getProducts();
    const featuredProducts = await getFeaturedProducts();
    createProductsHTML(products);
    createFeaturedProductHTML(featuredProducts);
}

main();