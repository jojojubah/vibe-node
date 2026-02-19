const MOBILE_BREAKPOINT = 960;

document.querySelectorAll(".site-header").forEach((header) => {
  const button = header.querySelector(".menu-toggle");
  const nav = header.querySelector(".nav");
  const links = nav ? nav.querySelectorAll("a") : [];
  let lastScrollY = window.scrollY;

  if (!button || !nav) return;

  const isMobile = () => window.innerWidth <= MOBILE_BREAKPOINT;

  const closeMenu = () => {
    header.classList.remove("menu-open");
    button.setAttribute("aria-expanded", "false");
    nav.setAttribute("aria-hidden", isMobile() ? "true" : "false");
    document.body.classList.remove("nav-open");
  };

  const openMenu = () => {
    header.classList.add("menu-open");
    button.setAttribute("aria-expanded", "true");
    nav.setAttribute("aria-hidden", "false");
    if (isMobile()) {
      document.body.classList.add("nav-open");
    }
  };

  button.addEventListener("click", () => {
    const isOpen = button.getAttribute("aria-expanded") === "true";
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  links.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  document.addEventListener("click", (event) => {
    if (!header.contains(event.target)) {
      closeMenu();
    }
  });

  const updateOnScroll = () => {
    const currentY = window.scrollY;
    const isMenuOpen = button.getAttribute("aria-expanded") === "true";

    header.classList.toggle("is-scrolled", currentY > 8);

    if (isMobile()) {
      const scrollingDown = currentY > lastScrollY + 4;
      const shouldHide = currentY > 90 && scrollingDown && !isMenuOpen;
      header.classList.toggle("is-hidden", shouldHide);
    } else {
      header.classList.remove("is-hidden");
    }

    lastScrollY = currentY;
  };

  window.addEventListener("scroll", updateOnScroll, { passive: true });

  window.addEventListener("resize", () => {
    if (!isMobile()) {
      closeMenu();
    }
    updateOnScroll();
  });

  closeMenu();
  updateOnScroll();
});
