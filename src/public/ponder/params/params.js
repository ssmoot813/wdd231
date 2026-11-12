// params.js
const products = [
    { id: 1, name: "Product 1", price: 3, image: "https://placehold.co/300" },
    { id: 2, name: "Product 2", price: 5, image: "https://placehold.co/300" },
    { id: 3, name: "Product 3", price: 1, image: "https://placehold.co/300" }
];

console.log(window.location);

function getParams(param) {
    const params = new URLSearchParams(window.location.search);
    return params.get(param);
}

function productTemplate(product) {
    return `<section class="product">
    <img src="${product.image}" alt="${product.name}">
    <div class="product__details">
      <h3>${product.name}</h3>
      <p>Price: $${product.price}</p>
    </div>
  </section>`;
}

function output(selector, markup) {
    const element = document.querySelector(selector);
    element.insertAdjacentHTML("beforeend", markup);
}

function getProductDetails() {
    const id = getParams("productId");
    if (!id) {
        output("main", "<p>No product selected.</p>");
        return;
    }

    const product = products.find((p) => p.id === Number(id));
    if (product) {
        output("main", productTemplate(product));
    } else {
        output("main", "<p>Sorry, that product wasn't found.</p>");
    }
}

getProductDetails();