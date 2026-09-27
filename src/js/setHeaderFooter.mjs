import { parkInfoTemplate, footerTemplate } from "./templates.mjs";

function setHeaderInfo(data) {
    // disclaimer link
    const disclaimer = document.querySelector(".disclaimer > a");
    disclaimer.href = data.url;
    disclaimer.innerHTML = data.fullName;

    // page title
    document.querySelector("head > title").textContent = data.fullName;

    // hero image
    const heroImage = document.querySelector(".hero-banner__image");
    heroImage.src = data.images[0].url;
    heroImage.alt = data.images[0].altText;

    // park name, designation, states
    document.querySelector(".hero-banner__info").innerHTML =
        parkInfoTemplate(data);
}

function setFooter(data) {
    const footerEl = document.querySelector("#park-footer");
    footerEl.innerHTML = footerTemplate(data);
}

export default function setHeaderFooter(data) {
    setHeaderInfo(data);
    setFooter(data);
}