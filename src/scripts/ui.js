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

export function initScrollButton() {
  const scrollBtn = document.querySelector(".scroll-to-footer");
  const footer = document.querySelector("#footer");

  if (!scrollBtn) return;

  let isShowingUpArrow = false;
  let ticking = false;

  function updateScrollButton() {
    const scrollPosition = window.scrollY;

    const shouldShowUpArrow = scrollPosition > 150;

    if (shouldShowUpArrow !== isShowingUpArrow) {
      isShowingUpArrow = shouldShowUpArrow;

      if (isShowingUpArrow) {
        scrollBtn.innerHTML = `
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        `;
        scrollBtn.setAttribute("aria-label", "Voltar ao topo");
      } else {
        scrollBtn.innerHTML = `
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        `;
        scrollBtn.setAttribute("aria-label", "Ir para o rodapé");
      }
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

    if (isShowingUpArrow) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      if (footer) {
        footer.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      }
    }
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
