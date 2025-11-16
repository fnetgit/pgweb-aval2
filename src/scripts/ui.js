export function initMobileMenu() {
  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.querySelector("#main-nav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      mainNav.classList.toggle("nav-open");
      const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", !isExpanded);

      navToggle.classList.toggle("active");
    });
  }
}
