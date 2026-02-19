const MOBILE_BREAKPOINT = 960;

document.querySelectorAll(".site-header").forEach((header) => {
  const button = header.querySelector(".menu-toggle");
  const nav = header.querySelector(".nav");

  if (!button || !nav) return;

  const closeMenu = () => {
    header.classList.remove("menu-open");
    button.setAttribute("aria-expanded", "false");
  };

  const openMenu = () => {
    header.classList.add("menu-open");
    button.setAttribute("aria-expanded", "true");
  };

  button.addEventListener("click", () => {
    const isOpen = button.getAttribute("aria-expanded") === "true";
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (event) => {
    if (!header.contains(event.target)) {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > MOBILE_BREAKPOINT) {
      closeMenu();
    }
  });
});
