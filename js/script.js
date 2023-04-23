/*const apiBase = "http://eskiltorsetcom.local";
const wooCommerceBase = "/wp-json/wc/store";
const productBase = "/products"
const featuredURL = "/products?&featured=true"

const pagesBase = "/wp-json/wp/v2/pages";*/

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
    console.log(featuredProducts);
    return products;
}

/*async function getProduct(id){
    const response = await fetch(fullProductURL + `/${id}`);
    const product = await response.json();
    console.log(product);
    return product;
}*/

/*function renderSingleProductHTML(product) {
   const { id, name, description} = product;
   const wrapper = document.createElement("a");
   wrapper.classList.add("contentmod");
   
   const heading = document.createElement("h2");
   const body = document.createElement("p");

   wrapper.href = `details.html?id=${id}`;
   heading.innerText = name;
   body.innerText = description;
   wrapper.append(heading, body);
   return wrapper;

}*/

function createProductHTML(product){
   const container = document.querySelector(".container");
   const id = product.id;

   console.log(product);

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
    product = product[4];
 
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
    createProductsHTML(products);
    createFeaturedProductHTML(products);
}

main();