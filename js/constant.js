const apiBase = "http://eskiltorsetcom.local";
const wooCommerceBase = "/wp-json/wc/store";
const productBase = "/products"
const featuredURL = "/products?&featured=true"

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

function renderSingleProductHTML(product) {
    const { id, name, description } = product;
    const wrapper = document.createElement("div");
    wrapper.classList.add("contentmod");
    
    const heading = document.createElement("h2");
    const body = document.createElement("p");
    const image = document.createElement("img");
 
    wrapper.href = `details.html?id=${id}`;
    heading.innerText = name;
    body.innerText = description;

    const imgData = product.images[0];
    image.src = imgData.src;
    image.alt = imgData.alt;

    wrapper.append(heading, image, body );
    return wrapper;
 
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

export {
    apiBase,
    wooCommerceBase,
    productBase,
    featuredURL,
    pagesBase,
    fullPageURL,
    fullProductURL,
    getProduct,
    getProducts,
    renderSingleProductHTML,
    createProductHTML
}