// Global navigation: main menu toggle + submenu accordions

function mainMenuHandler(ev) {
  // currentTarget is always the button, even if the svg/span inside was clicked
  const button = ev.currentTarget;
  const globalNav = document.querySelector(".global-nav");
  const isOpen = globalNav.classList.toggle("show");

  button.setAttribute("aria-expanded", isOpen);
  button.setAttribute("aria-label", isOpen ? "Close Menu" : "Open Menu");
}

function subMenuHandler(ev) {
  const toggle = ev.currentTarget;
  // button -> its li -> the submenu inside that li
  const submenu = toggle.closest("li").querySelector(".global-nav__submenu");
  if (!submenu) return; // "Explore this Park" items don't have submenus yet

  const isOpen = submenu.classList.toggle("show");
  toggle.setAttribute("aria-expanded", isOpen);
  toggle.querySelector(".icon").classList.toggle("rotate", isOpen);
}

export default function enableNavigation() {
  const menuButton = document.querySelector("#global-nav-toggle");
  const subMenuToggles = document.querySelectorAll(
    ".global-nav__split-button__toggle"
  );

  menuButton.addEventListener("click", mainMenuHandler);
  subMenuToggles.forEach((toggle) =>
    toggle.addEventListener("click", subMenuHandler)
  );
}
