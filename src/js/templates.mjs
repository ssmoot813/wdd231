export function parkInfoTemplate(info) {
    return `<a href="/" class="hero-banner__title">${info.name}</a>
  <p class="hero-banner__subtitle">
    <span>${info.designation}</span>
    <span>${info.states}</span>
  </p>`;
}

export function mediaCardTemplate(info) {
    return `<div class="media-card">
    <a href="${info.link}">
      <img src="${info.image}" alt="" class="media-card__img">
      <h3 class="media-card__title">${info.name}</h3>
    </a>
    <p>${info.description}</p>
  </div>`;
}

function getMailingAddress(addresses) {
    return addresses.find((address) => address.type === "Mailing");
}

function getVoicePhone(numbers) {
    const voice = numbers.find((number) => number.type === "Voice");
    return voice.phoneNumber;
}

export function footerTemplate(info) {
    const mailing = getMailingAddress(info.addresses);
    const voice = getVoicePhone(info.contacts.phoneNumbers);

    return `<section class="contact">
    <h3>Contact Info</h3>
    <h4>Mailing Address:</h4>
    <div>
      <p>${mailing.line1}</p>
      <p>${mailing.city}, ${mailing.stateCode} ${mailing.postalCode}</p>
    </div>
    <h4>Phone:</h4>
    <p>${voice}</p>
  </section>`;
}

export function alertTemplate(alert) {
  let alertType;
  switch (alert.category) {
    case "Park Closure":
      alertType = "closure";
      break;
    default:
      alertType = alert.category.toLowerCase();
  }

  return `<li class="alert">
    <svg class="icon" focusable="false" aria-hidden="true">
      <use xlink:href="/images/sprite.symbol.svg#alert-${alertType}"></use>
    </svg>
    <div>
      <h3 class="alert-${alertType}">${alert.title}</h3>
      <p>${alert.description}</p>
    </div>
  </li>`;
}

export function visitorCenterTemplate(center) {
  return `<li class="visitor-center">
    <h4><a href="visitor-center.html?id=${center.id}">${center.name}</a></h4>
    <p>${center.description}</p>
    <p>${center.directionsInfo}</p>
  </li>`;
}

export function activityListTemplate(activities) {
  return activities.map((activity) => `<li>${activity.name}</li>`).join("");
}

// ---------- visitor center page ----------

export function iconTemplate(iconId) {
  return `<svg class="icon" role="presentation" focusable="false">
    <use xlink:href="/images/sprite.symbol.svg#${iconId}"></use>
  </svg>`;
}

export function vcTitleTemplate(text) {
  return `${iconTemplate("ranger-station")} ${text}`;
}

export function vcInfoTemplate(data) {
  const image = data.images[0];
  const figure = image
    ? `<figure>
        <img src="${image.url}" alt="${image.altText}" />
        <figcaption>${image.caption} <span>${image.credit}</span></figcaption>
      </figure>`
    : "";
  return `${figure}<p>${cleanText(data.description)}</p>`;
}

export function listTemplate(data, contentTemplate) {
  const html = data.map(contentTemplate);
  return `<ul>${html.join("")}</ul>`;
}

function vcAddressTemplate(data) {
  return `<section class="vc-addresses__${data.type.toLowerCase()}">
    <h3>${data.type} Address</h3>
    <address>
      ${data.line1}<br />
      ${data.city}, ${data.stateCode} ${data.postalCode}
    </address>
  </section>`;
}

export function vcAddressesListTemplate(data) {
  const physical = data.find((address) => address.type === "Physical");
  const mailing = data.find((address) => address.type === "Mailing");
  let html = physical ? vcAddressTemplate(physical) : "";
  if (mailing) {
    html += vcAddressTemplate(mailing);
  }
  return html || "<p>No address listed.</p>";
}

export function vcAmenityTemplate(data) {
  return `<li>${data}</li>`;
}

// ---------- regex helpers for cleaning API data ----------

// turn any phone format into "(307) 344-2550"; returns null if it isn't a 10-digit US number
function parsePhone(phone) {
  const digits = phone.replace(/\D/g, "");
  const match = digits.match(/^1?(\d{3})(\d{3})(\d{4})$/);
  if (!match) return null;
  const [, area, prefix, line] = match;
  return {
    display: `(${area}) ${prefix}-${line}`,
    link: `tel:+1${area}${prefix}${line}`
  };
}

// basic email check: word characters before and after the @, with at least one dot in the domain
function isValidEmail(email) {
  return /^[\w.+-]+@[\w-]+(\.[\w-]+)+$/.test(email);
}

// collapse extra spaces, tabs and line breaks from API text into single spaces
function cleanText(text) {
  return text.replace(/\s+/g, " ").trim();
}

export function vcDirectionsTemplate(data) {
  return `<p>${cleanText(data)}</p>`;
}

export function vcContactsTemplate(data) {
  const email = data.emailAddresses?.[0]?.emailAddress;
  const rawPhone = data.phoneNumbers?.[0]?.phoneNumber;
  const phone = rawPhone ? parsePhone(rawPhone) : null;
  let html = "";
  if (email && isValidEmail(email)) {
    html += `<section class="vc-contact__email">
      <h3>Email Address</h3>
      <a href="mailto:${email}">Send this visitor center an email</a>
    </section>`;
  }
  if (phone) {
    html += `<section class="vc-contact__phone">
      <h3>Phone numbers</h3>
      <a href="${phone.link}">${phone.display}</a>
    </section>`;
  } else if (rawPhone) {
    html += `<section class="vc-contact__phone">
      <h3>Phone numbers</h3>
      <p>${rawPhone}</p>
    </section>`;
  }
  return html || "<p>No contact information listed.</p>";
}

export function vcImageTemplate(data) {
  return `<li><img src="${data.url}" alt="${data.altText}" loading="lazy" /></li>`;
}

// ---------- hours & seasons ----------

const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function hoursTableTemplate(hours) {
  const rows = days
    .map((day) => `<tr><th scope="row">${capitalize(day)}</th><td>${hours[day] || "Closed"}</td></tr>`)
    .join("");
  return `<table class="vc-hours__table"><tbody>${rows}</tbody></table>`;
}

function formatDate(dateString) {
  // add a time so the date isn't shifted a day back by the time zone
  const date = new Date(`${dateString}T00:00:00`);
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function vcExceptionTemplate(exception) {
  const dates =
    exception.startDate === exception.endDate
      ? formatDate(exception.startDate)
      : `${formatDate(exception.startDate)} – ${formatDate(exception.endDate)}`;
  return `<li>
    <h4>${exception.name}</h4>
    <p class="vc-hours__dates">${dates}</p>
    ${hoursTableTemplate(exception.exceptionHours)}
  </li>`;
}

function vcSeasonTemplate(season) {
  const exceptions = season.exceptions?.length
    ? `<h4 class="vc-hours__exceptions-title">Exceptions</h4>
       ${listTemplate(season.exceptions, vcExceptionTemplate)}`
    : "";
  return `<section class="vc-hours__season">
    <h3>${season.name}</h3>
    ${season.description ? `<p>${season.description}</p>` : ""}
    ${hoursTableTemplate(season.standardHours)}
    ${exceptions}
  </section>`;
}

export function vcHoursTemplate(operatingHours) {
  if (!operatingHours?.length) return "<p>No hours listed.</p>";
  return operatingHours.map(vcSeasonTemplate).join("");
}
