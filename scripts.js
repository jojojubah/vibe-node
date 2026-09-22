// Y3JlYXRlZCBieSBKb2pvSnViYWggMjAyNQ==
(() => {
  const url = new URL(window.location.href);
  let shouldRedirect = false;

  if (url.pathname === "/index.html") {
    url.pathname = "/";
    shouldRedirect = true;
  } else if (url.pathname.endsWith("/index.html")) {
    url.pathname = url.pathname.slice(0, -"index.html".length);
    shouldRedirect = true;
  }

  if (/^www\./i.test(url.hostname)) {
    url.hostname = url.hostname.replace(/^www\./i, "");
    shouldRedirect = true;
  }

  if (url.hostname === "vibenode.co.uk" && url.protocol !== "https:") {
    url.protocol = "https:";
    shouldRedirect = true;
  }

  if (shouldRedirect) {
    window.location.replace(url.toString());
  }
})();

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
    document.body.classList.remove("nav-open");
    button.setAttribute("aria-expanded", "false");
    nav.setAttribute("aria-hidden", "true");
  };

  const openMenu = () => {
    header.classList.add("menu-open");
    document.body.classList.add("nav-open");
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

// Replace with your live GA4 measurement ID (format: G-XXXXXXXXXX).
const GA4_MEASUREMENT_ID = "G-WDLSD474GV";
// Production mode: respect consent selection for analytics loading.
const FORCE_GA4_FOR_TESTING = false;
let gaScriptLoaded = false;

const hasConfiguredGa4 = () => /^G-[A-Z0-9]+$/i.test(GA4_MEASUREMENT_ID) && GA4_MEASUREMENT_ID !== "G-XXXXXXXXXX";

const ensureGtagStub = () => {
  if (!window.dataLayer) {
    window.dataLayer = [];
  }
  if (!window.gtag) {
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
  }
};

const loadGa4Script = () => {
  if (gaScriptLoaded || !hasConfiguredGa4()) return;
  gaScriptLoaded = true;
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA4_MEASUREMENT_ID)}`;
  document.head.appendChild(script);
};

const initGoogleAnalytics = () => {
  if (!hasConfiguredGa4()) return;
  ensureGtagStub();
  window.gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  window.gtag("js", new Date());
  if (FORCE_GA4_FOR_TESTING) {
    applyAnalyticsConsent(true);
  }
};

const applyAnalyticsConsent = (enabled) => {
  if (!hasConfiguredGa4()) return;
  ensureGtagStub();

  if (enabled || FORCE_GA4_FOR_TESTING) {
    loadGa4Script();
    window.gtag("consent", "update", {
      analytics_storage: "granted",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
    window.gtag("config", GA4_MEASUREMENT_ID, {
      anonymize_ip: true,
      transport_type: "beacon",
    });
    return;
  }

  window.gtag("consent", "update", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
};

const initClientTypeFields = () => {
  const forms = document.querySelectorAll("form");
  if (!forms.length) return;

  forms.forEach((form) => {
    const clientTypeField = form.querySelector("select[name='client_type']");
    const companyField = form.querySelector("input[name='company']");
    if (!clientTypeField || !companyField) return;

    const companyPlaceholder = companyField.getAttribute("placeholder") || "";

    const updateCompanyFieldState = () => {
      const isIndividual = clientTypeField.value === "individual";
      companyField.disabled = isIndividual;
      companyField.setAttribute("aria-disabled", isIndividual ? "true" : "false");

      if (isIndividual) {
        companyField.value = "";
        companyField.setAttribute("placeholder", "Not required for individual");
      } else {
        companyField.setAttribute("placeholder", companyPlaceholder);
      }
    };

    clientTypeField.addEventListener("change", updateCompanyFieldState);
    updateCompanyFieldState();
  });
};

const initMailtoForms = () => {
  const forms = document.querySelectorAll("form[data-mailto-form]");
  if (!forms.length) return;

  const fieldLabels = {
    name: "Full name",
    email: "Work email",
    client_type: "I am a",
    company: "Company",
    budget: "Budget range",
    message: "Project goals",
  };

  forms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const to = form.dataset.mailtoTo || "contact@vibenode.co.uk";
      const subject = form.dataset.mailtoSubject || "New enquiry";
      const formData = new FormData(form);
      const lines = [];

      formData.forEach((value, key) => {
        const cleaned = String(value).trim();
        if (!cleaned) return;
        const label = fieldLabels[key] || key;
        lines.push(`${label}: ${cleaned}`);
      });

      const body = [
        "New build enquiry submitted via vibenode.co.uk",
        "",
        ...lines,
      ].join("\n");

      const mailtoHref = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoHref;
    });
  });
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

const initScrollGradientRims = () => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reduceMotion.matches) return;

  const root = document.documentElement;
  let rafId = 0;

  const updateAngle = () => {
    rafId = 0;
    const scrollY = window.scrollY || 0;
    const angle = (scrollY * 0.14) % 360;
    root.style.setProperty("--scroll-angle", `${angle.toFixed(2)}deg`);
  };

  const queueUpdate = () => {
    if (rafId) return;
    rafId = window.requestAnimationFrame(updateAngle);
  };

  queueUpdate();
  window.addEventListener("scroll", queueUpdate, { passive: true });
  window.addEventListener("resize", queueUpdate);
};



const initLiquidGlassCardRotators = () => {
  const rotators = document.querySelectorAll("[data-liquid-glass-rotator]");
  if (!rotators.length) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const cycleDelayMs = 3200;

  rotators.forEach((rotator) => {
    const slides = Array.from(rotator.querySelectorAll(".liquid-glass-card-image"));
    if (!slides.length) return;

    let activeIndex = Math.max(
      0,
      slides.findIndex((slide) => slide.classList.contains("is-active")),
    );
    slides.forEach((slide, index) => {
      slide.classList.toggle("is-active", index === activeIndex);
    });

    if (slides.length < 2 || reduceMotion) return;

    window.setInterval(() => {
      slides[activeIndex].classList.remove("is-active");
      activeIndex = (activeIndex + 1) % slides.length;
      slides[activeIndex].classList.add("is-active");
    }, cycleDelayMs);
  });
};


const initViewportAnimations = () => {
  const targets = new Set();
  const rules = [
    {
      selector:
        ".products-intro, .about, .games, .section-header, .capability-strip, .home-hero-copy, .site-footer",
      mode: "once",
      threshold: 0.14,
    },
    {
      selector: ".products-sections > .home-panel, .game-list > .game-item, .stats > .stat",
      mode: "once",
      threshold: 0.12,
      staggerChildren: true,
    },
    {
      selector: "[data-viewport]",
      mode: "once",
      threshold: 0.14,
    },
  ];

  rules.forEach((rule) => {
    document.querySelectorAll(rule.selector).forEach((node) => {
      const element = node;
      if (!element.dataset.viewport) {
        element.dataset.viewport = rule.mode;
      }
      if (!element.dataset.viewportThreshold) {
        element.dataset.viewportThreshold = String(rule.threshold);
      }
      if (rule.staggerChildren && !element.hasAttribute("data-viewport-stagger")) {
        element.setAttribute("data-viewport-stagger", "");
        Array.from(element.children).forEach((child, index) => {
          child.style.setProperty("--vn-stagger-index", String(index));
        });
      }
      targets.add(element);
    });
  });

  if (!targets.size) return;

  document.documentElement.classList.add("vn-scrollfx-ready");

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    targets.forEach((element) => {
      element.classList.add("vn-onscreen");
    });
    return;
  }

  const viewportObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        const element = entry.target;
        const threshold = Number.parseFloat(element.dataset.viewportThreshold || "0.14");
        const mode = element.dataset.viewport || "once";
        const viewportTrigger = window.innerHeight * (1 - Math.min(0.85, threshold));
        const geometricHit =
          entry.boundingClientRect.top <= viewportTrigger && entry.boundingClientRect.bottom >= 0;
        const isOnscreen = entry.isIntersecting && (entry.intersectionRatio >= threshold || geometricHit);

        if (isOnscreen) {
          element.classList.add("vn-onscreen");
          if (mode === "once") {
            observer.unobserve(element);
          }
          return;
        }

        if (mode === "in") {
          element.classList.remove("vn-onscreen");
        }
      });
    },
    {
      threshold: Array.from({ length: 21 }, (_, index) => index * 0.05),
      rootMargin: "0px 0px -8% 0px",
    },
  );

  targets.forEach((element) => viewportObserver.observe(element));
};

const initCapabilityMarquee = () => {
  const marquees = document.querySelectorAll(".capability-marquee");
  if (!marquees.length) return;

  const isTouchPrimary = window.matchMedia("(hover: none), (pointer: coarse)").matches;
  if (!isTouchPrimary) return;

  marquees.forEach((marquee) => {
    marquee.setAttribute("tabindex", "0");
    marquee.setAttribute("aria-label", `${marquee.getAttribute("aria-label") || "Capability banner"}. Tap to pause or resume.`);
    marquee.setAttribute("data-paused", "false");

    const togglePaused = () => {
      const nextPaused = !marquee.classList.contains("is-paused");
      marquee.classList.toggle("is-paused", nextPaused);
      marquee.setAttribute("data-paused", nextPaused ? "true" : "false");
    };

    marquee.addEventListener("click", togglePaused);
    marquee.addEventListener("keydown", (event) => {
      if (event.key !== " " && event.key !== "Enter") return;
      event.preventDefault();
      togglePaused();
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
        <p>
          We use cookies to run this site and improve performance. You can accept optional cookies or customize your settings.
          <button class="cookie-inline-action" data-cookie-action="reject">Reject optional cookies</button>.
        </p>
      </div>
      <div class="cookie-actions">
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
  };

  const hideBanner = () => {
    banner.classList.remove("show");
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
    applyAnalyticsConsent(payload.analytics);
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
    applyAnalyticsConsent(Boolean(stored.analytics));
  } else {
    showBanner();
    setSwitches({ analytics: false, preferences: false, marketing: false });
    applyAnalyticsConsent(false);
  }
};

initGoogleAnalytics();
initCookieConsent();
initClientTypeFields();
initMailtoForms();
initAsyncForms();
initScrollGradientRims();
initLiquidGlassCardRotators();
initViewportAnimations();
initCapabilityMarquee();
