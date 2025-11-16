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

export function initScrollToFooter() {
  const scrollToFooterBtn = document.querySelector(".scroll-to-footer");
  const footer = document.querySelector("#footer");
  
  if (!scrollToFooterBtn || !footer) return;

  let isAtFooter = false;

  function checkFooterPosition() {
    const footerRect = footer.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    if (footerRect.top <= windowHeight && footerRect.bottom >= 0) {
      if (!isAtFooter) {
        isAtFooter = true;
        scrollToFooterBtn.classList.add("scroll-up");
        scrollToFooterBtn.setAttribute("aria-label", "Voltar ao topo");
      }
    } else {
      if (isAtFooter) {
        isAtFooter = false;
        scrollToFooterBtn.classList.remove("scroll-up");
        scrollToFooterBtn.setAttribute("aria-label", "Ir para o rodapé");
      }
    }
  }

  scrollToFooterBtn.addEventListener("click", (e) => {
    e.preventDefault();
    
    if (isAtFooter) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      footer.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  window.addEventListener("scroll", checkFooterPosition);

  checkFooterPosition();
}
