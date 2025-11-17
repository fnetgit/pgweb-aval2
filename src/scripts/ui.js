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

const createArrowSVG = (direction) => {
  const points = direction === "up" ? "18 15 12 9 6 15" : "6 9 12 15 18 9";
  return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="${points}"></polyline></svg>`;
};

export function initScrollButton() {
  const scrollBtn = document.querySelector(".scroll-to-footer");
  const footer = document.querySelector("#footer");

  if (!scrollBtn) return;

  let isShowingUpArrow = false;
  let ticking = false;

  function updateScrollButton() {
    const shouldShowUpArrow = window.scrollY > 150;

    if (shouldShowUpArrow !== isShowingUpArrow) {
      isShowingUpArrow = shouldShowUpArrow;
      scrollBtn.innerHTML = createArrowSVG(isShowingUpArrow ? "up" : "down");
      scrollBtn.setAttribute(
        "aria-label",
        isShowingUpArrow ? "Voltar ao topo" : "Ir para o rodapé"
      );
    }

    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      window.requestAnimationFrame(updateScrollButton);
      ticking = true;
    }
  }

  scrollBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const target = isShowingUpArrow ? 0 : document.documentElement.scrollHeight;
    window.scrollTo({ top: target, behavior: "smooth" });
  });

  window.addEventListener("scroll", requestTick, { passive: true });

  updateScrollButton();
}

export function updateCopyrightYear() {
  const currentYear = new Date().getFullYear();
  const yearElements = document.querySelectorAll(".current-year");

  yearElements.forEach((element) => {
    element.textContent = currentYear;
  });
}
