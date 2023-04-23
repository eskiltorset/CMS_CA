import { apiBase, wooCommerceBase, productBase, pagesBase, getProduct, renderSingleProductHTML, createProductHTML } from "./constant.js";

const fullPageURL = apiBase + pagesBase;

const fullProductURL = apiBase + wooCommerceBase + productBase;

const mainWrapper = document.querySelector("main");
const queryString = location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");


async function renderProduct(){
    const product = await getProduct(id);
    const productHTML = renderSingleProductHTML(product);
    mainWrapper.textContent = "";
    mainWrapper.append(productHTML);
} 

renderProduct();



