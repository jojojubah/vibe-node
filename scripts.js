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
  };

  const openMenu = () => {
    header.classList.add("menu-open");
    button.setAttribute("aria-expanded", "true");
    nav.setAttribute("aria-hidden", "false");
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

const COOKIE_STORAGE_KEY = "vibenode_cookie_consent_v1";

const readCookieConsent = () => {
  try {
    return JSON.parse(localStorage.getItem(COOKIE_STORAGE_KEY) || "null");
  } catch {
    return null;
  }
};

const writeCookieConsent = (value) => {
  localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify(value));
};

const initAsyncForms = () => {
  const forms = document.querySelectorAll("form[data-async-form]");
  if (!forms.length) return;

  forms.forEach((form) => {
    const statusNode = form.querySelector("[data-form-status]");
    const submitButton = form.querySelector("button[type='submit']");

    const setStatus = (message, state) => {
      if (!statusNode) return;
      statusNode.textContent = message;
      statusNode.dataset.state = state;
    };

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const endpoint = form.getAttribute("action") || "";
      if (!endpoint || endpoint.includes("YOUR_FORM_ID")) {
        setStatus("Form endpoint is not configured yet. Add your live form id first.", "error");
        return;
      }

      if (submitButton) submitButton.disabled = true;
      form.setAttribute("aria-busy", "true");
      setStatus("Sending enquiry...", "info");

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: new FormData(form),
        });

        const payload = await response.json().catch(() => ({}));
        if (!response.ok) {
          const firstError = payload?.errors?.[0]?.message;
          const fallbackMessage = payload?.error || "We could not submit your enquiry. Please try again.";
          setStatus(firstError || fallbackMessage, "error");
          return;
        }

        form.reset();
        setStatus("Thanks. Your enquiry has been sent successfully.", "success");
      } catch {
        setStatus("Network error. Please retry in a moment.", "error");
      } finally {
        form.removeAttribute("aria-busy");
        if (submitButton) submitButton.disabled = false;
      }
    });
  });
};

const buildCookieBanner = () => {
  const banner = document.createElement("section");
  banner.className = "cookie-banner";
  banner.setAttribute("aria-live", "polite");
  banner.innerHTML = `
    <div class="cookie-banner-content">
      <div class="cookie-banner-text">
        <strong>Cookie Preferences 2026</strong>
        <p>We use cookies to run this site and improve performance. You can accept, reject optional cookies, or customize your settings.</p>
      </div>
      <div class="cookie-actions">
        <button class="cookie-btn" data-cookie-action="reject">Reject Optional</button>
        <button class="cookie-btn" data-cookie-action="settings">Cookie Settings</button>
        <button class="cookie-btn primary" data-cookie-action="accept">Accept All</button>
      </div>
    </div>
  `;
  return banner;
};

const buildCookiePanel = () => {
  const panel = document.createElement("section");
  panel.className = "cookie-panel";
  panel.setAttribute("aria-label", "Cookie settings");
  panel.innerHTML = `
    <h3>Cookie Settings</h3>
    <p>Choose how optional cookies are used. Essential cookies stay enabled to keep the site working.</p>
    <div class="cookie-row">
      <div>
        <strong>Essential</strong>
        <span>Security, routing, and consent storage.</span>
      </div>
      <input class="cookie-switch" type="checkbox" checked disabled />
    </div>
    <div class="cookie-row">
      <div>
        <strong>Analytics</strong>
        <span>Usage statistics and performance insights.</span>
      </div>
      <input class="cookie-switch" type="checkbox" data-cookie-key="analytics" />
    </div>
    <div class="cookie-row">
      <div>
        <strong>Preferences</strong>
        <span>Remembered settings and display options.</span>
      </div>
      <input class="cookie-switch" type="checkbox" data-cookie-key="preferences" />
    </div>
    <div class="cookie-row">
      <div>
        <strong>Marketing</strong>
        <span>Campaign relevance and conversion measurement.</span>
      </div>
      <input class="cookie-switch" type="checkbox" data-cookie-key="marketing" />
    </div>
    <div class="cookie-panel-actions">
      <button class="cookie-btn" data-cookie-action="panel-reject">Reject Optional</button>
      <button class="cookie-btn" data-cookie-action="panel-save">Save Choices</button>
      <button class="cookie-btn primary" data-cookie-action="panel-accept">Accept All</button>
    </div>
    <button class="cookie-link-btn" data-cookie-action="panel-close">Close</button>
  `;
  return panel;
};

const initCookieConsent = () => {
  const banner = buildCookieBanner();
  const panel = buildCookiePanel();
  const stored = readCookieConsent();

  document.body.appendChild(banner);
  document.body.appendChild(panel);

  const bannerButtons = banner.querySelectorAll("[data-cookie-action]");
  const panelButtons = panel.querySelectorAll("[data-cookie-action]");
  const switches = panel.querySelectorAll("[data-cookie-key]");
  const settingsLinks = document.querySelectorAll(".cookie-settings-link");

  const setSwitches = (prefs) => {
    switches.forEach((input) => {
      input.checked = Boolean(prefs?.[input.dataset.cookieKey]);
    });
  };

  const closePanel = () => {
    panel.classList.remove("show");
  };

  const openPanel = () => {
    panel.classList.add("show");
  };

  const showBanner = () => {
    banner.classList.add("show");
    document.body.classList.add("cookie-consent-required");
  };

  const hideBanner = () => {
    banner.classList.remove("show");
    document.body.classList.remove("cookie-consent-required");
  };

  const saveConsent = (prefs, status) => {
    const payload = {
      essential: true,
      analytics: Boolean(prefs.analytics),
      preferences: Boolean(prefs.preferences),
      marketing: Boolean(prefs.marketing),
      status,
      updatedAt: new Date().toISOString(),
    };
    writeCookieConsent(payload);
    hideBanner();
    closePanel();
  };

  const acceptAll = () => {
    saveConsent({ analytics: true, preferences: true, marketing: true }, "accepted_all");
  };

  const rejectOptional = () => {
    saveConsent({ analytics: false, preferences: false, marketing: false }, "rejected_optional");
  };

  const saveFromPanel = () => {
    const preferences = {};
    switches.forEach((input) => {
      preferences[input.dataset.cookieKey] = input.checked;
    });
    saveConsent(preferences, "custom");
  };

  const blockInteractionsUntilChoice = (event) => {
    if (!document.body.classList.contains("cookie-consent-required")) return;
    if (event.target.closest(".cookie-banner") || event.target.closest(".cookie-panel")) return;
    event.preventDefault();
    event.stopPropagation();
  };

  document.addEventListener("click", blockInteractionsUntilChoice, true);
  document.addEventListener("submit", blockInteractionsUntilChoice, true);

  bannerButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.cookieAction;
      if (action === "accept") acceptAll();
      if (action === "reject") rejectOptional();
      if (action === "settings") openPanel();
    });
  });

  panelButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.cookieAction;
      if (action === "panel-accept") acceptAll();
      if (action === "panel-reject") rejectOptional();
      if (action === "panel-save") saveFromPanel();
      if (action === "panel-close") closePanel();
    });
  });

  settingsLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      openPanel();
      if (!readCookieConsent()) {
        showBanner();
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closePanel();
    }
  });

  document.addEventListener("click", (event) => {
    if (!panel.classList.contains("show")) return;
    if (event.target.closest(".cookie-panel")) return;
    if (event.target.closest(".cookie-settings-link")) return;
    if (event.target.closest(".cookie-banner")) return;
    closePanel();
  });

  if (stored) {
    setSwitches(stored);
  } else {
    showBanner();
    setSwitches({ analytics: false, preferences: false, marketing: false });
  }
};

initCookieConsent();
initAsyncForms();
