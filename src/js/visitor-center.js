import "../css/style.css";
import "../css/visitor-center.css";
import setHeaderFooter from "./setHeaderFooter.mjs";
import { getParkData, getParkVisitorCenterDetails } from "./parkService.mjs";
import {
  vcTitleTemplate,
  vcInfoTemplate,
  listTemplate,
  vcAddressesListTemplate,
  vcAmenityTemplate,
  vcDirectionsTemplate,
  vcContactsTemplate,
  vcImageTemplate,
  vcHoursTemplate
} from "./templates.mjs";

function getParam(param) {
  const search = location.search;
  const params = new URLSearchParams(search);
  return params.get(param);
}

// add content to the end of one of the details boxes
function fillDetails(selector, html) {
  document.querySelector(selector).insertAdjacentHTML("beforeend", html);
}

function buildPage(center) {
  document.querySelector(".vc-name").innerHTML = vcTitleTemplate(center.name);
  document.querySelector(".vc-info").innerHTML = vcInfoTemplate(center);

  fillDetails("#vc-hours", vcHoursTemplate(center.operatingHours));
  fillDetails("#vc-addresses", vcAddressesListTemplate(center.addresses));
  fillDetails("#vc-directions", vcDirectionsTemplate(center.directionsInfo));
  fillDetails("#vc-amenities", listTemplate(center.amenities, vcAmenityTemplate));
  fillDetails("#vc-contact", vcContactsTemplate(center.contacts));

  const galleryHTML = listTemplate(center.images, vcImageTemplate);
  document.querySelector(".vc-gallery").insertAdjacentHTML("beforeend", galleryHTML);
}

async function init() {
  const parkData = await getParkData();
  setHeaderFooter(parkData);

  const id = getParam("id");
  const centerDetails = await getParkVisitorCenterDetails(id);
  if (!centerDetails) {
    document.querySelector(".vc-name").textContent = "Visitor center not found";
    return;
  }
  document.querySelector("head > title").textContent =
    `${centerDetails.name} | ${parkData.fullName}`;
  buildPage(centerDetails);
}

init();
