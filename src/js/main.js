import { getParkData } from "./parkService.mjs";

const parkData = getParkData();

// 1. Update the disclaimer link
const disclaimer = document.querySelector(".disclaimer > a");
disclaimer.href = parkData.url;
disclaimer.innerHTML = parkData.fullName;

// 2. Update the page title
document.title = parkData.fullName;

// 3. Use the first image in the list for the hero image
const heroImage = document.querySelector(".hero-banner__image");
heroImage.src = parkData.images[0].url;
heroImage.alt = parkData.images[0].altText;

// 4. Update name, designation, and states in the hero
function parkInfoTemplate(info) {
    return `<a href="/" class="hero-banner__title">${info.name}</a>
  <p class="hero-banner__subtitle">
    <span>${info.designation}</span>
    <span>${info.states}</span>
  </p>`;
}

const heroInfo = document.querySelector(".hero-banner__info");
heroInfo.innerHTML = parkInfoTemplate(parkData);