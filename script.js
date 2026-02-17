// ==================== DOM ELEMENTS ==================== //
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const navLink = document.querySelectorAll(".nav-link");

// ==================== MOBILE MENU ==================== //
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Close menu when a nav link is clicked
navLink.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

// ==================== SMOOTH SCROLLING ==================== //
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href !== "#") {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  });
});

// ==================== NAVBAR SCROLL EFFECT ==================== //
const navbar = document.querySelector(".navbar");
let lastScrollTop = 0;

window.addEventListener("scroll", () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > 100) {
    navbar.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.15)";
  } else {
    navbar.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.08)";
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ==================== ANIMATION ON SCROLL ==================== //
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe cards and items
document
  .querySelectorAll(
    ".project-card, .experience-card, .skill-category, .achievement-box",
  )
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

// ==================== ACTIVE NAV LINK ON SCROLL ==================== //
window.addEventListener("scroll", () => {
  let current = "";

  const sections = document.querySelectorAll("section");
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLink.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").slice(1) === current) {
      link.style.color = "var(--primary-color)";
    } else {
      link.style.color = "";
    }
  });
});

// ==================== FORM FUNCTIONALITY ==================== //
// Add smooth scroll for buttons
const buttons = document.querySelectorAll(".btn");
buttons.forEach((btn) => {
  btn.addEventListener("mouseover", function () {
    this.style.transform = "translateY(-2px)";
  });

  btn.addEventListener("mouseout", function () {
    this.style.transform = "translateY(0)";
  });
});

// ==================== CONTACT LINK HANDLERS ==================== //
const emailLink = document.querySelector('a[href^="mailto:"]');
const phoneLink = document.querySelector('a[href^="tel:"]');

if (emailLink) {
  emailLink.addEventListener("click", function (e) {
    // Email link will work normally
    console.log("Email link clicked");
  });
}

if (phoneLink) {
  phoneLink.addEventListener("click", function (e) {
    // Phone link will work on mobile
    console.log("Phone link clicked");
  });
}

// ==================== SCROLL TO TOP BUTTON ==================== //
const scrollToTopBtn = document.createElement("button");
scrollToTopBtn.classList.add("scroll-to-top");
scrollToTopBtn.innerHTML = "↑";
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #0066cc, #00a8ff);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.5rem;
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 99;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.style.display = "flex";
  } else {
    scrollToTopBtn.style.display = "none";
  }
});

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

scrollToTopBtn.addEventListener("mouseover", () => {
  scrollToTopBtn.style.transform = "scale(1.1)";
});

scrollToTopBtn.addEventListener("mouseout", () => {
  scrollToTopBtn.style.transform = "scale(1)";
});

// ==================== PAGE LOAD ANIMATION ==================== //
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease";
    document.body.style.opacity = "1";
  }, 100);
});

// ==================== KEYBOARD NAVIGATION ==================== //
document.addEventListener("keydown", (e) => {
  // ESC to close mobile menu
  if (e.key === "Escape") {
    if (navLinks.classList.contains("active")) {
      navLinks.classList.remove("active");
    }
  }
});

// ==================== DARK MODE TOGGLE (Optional Enhancement) ==================== //
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

function enableDarkMode() {
  document.documentElement.style.setProperty("--bg-light", "#1a1a1a");
  document.documentElement.style.setProperty("--bg-white", "#2d2d2d");
  document.documentElement.style.setProperty("--text-dark", "#ffffff");
  document.documentElement.style.setProperty("--text-light", "#cccccc");
  localStorage.setItem("darkMode", "enabled");
}

function disableDarkMode() {
  document.documentElement.style.setProperty("--bg-light", "#f5f7fa");
  document.documentElement.style.setProperty("--bg-white", "#ffffff");
  document.documentElement.style.setProperty("--text-dark", "#1a1a1a");
  document.documentElement.style.setProperty("--text-light", "#666666");
  localStorage.setItem("darkMode", "disabled");
}

// Check localStorage for dark mode preference
if (
  localStorage.getItem("darkMode") === "enabled" ||
  (localStorage.getItem("darkMode") === null && prefersDarkScheme.matches)
) {
  enableDarkMode();
}

// ==================== PERFORMANCE OPTIMIZATION ==================== //
// Lazy loading for images (if added in future)
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  document
    .querySelectorAll("img[data-src]")
    .forEach((img) => imageObserver.observe(img));
}

// ==================== CONSOLE LOG ==================== //
console.log(
  "%c Welcome to Humbal Hammad Portfolio! ",
  "font-size: 14px; font-weight: bold; color: #0066cc; background: #f5f7fa; padding: 10px;",
);
console.log(
  "%c Let's build something amazing together! ",
  "font-size: 12px; color: #666; font-style: italic;",
);
