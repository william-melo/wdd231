(function () {
  // Function to safely add event listeners
  function safeAddEventListener() {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    const currentPath = window.location.pathname;

    // Check if elements exist before adding listeners
    if (!hamburger || !navLinks) {
      console.error("Navigation elements not found");
      return;
    }

    // Wayfinding - Highlight current page
    const navItems = document.querySelectorAll(".nav-links a");
    navItems.forEach((item) => {
      // Remove leading and trailing slashes for comparison
      const cleanPath = currentPath.replace(/^\/|\/$/g, "");
      const cleanHref = item.getAttribute("href").replace(/^\/|\/$/g, "");

      // Check if current path matches link href
      if (
        cleanPath === cleanHref ||
        (cleanPath === "" && cleanHref === "home")
      ) {
        item.classList.add("active");
      }
    });

    // Hamburger menu toggle
    hamburger.addEventListener("click", function () {
      // Use 'this' to ensure we're using the clicked element
      this.classList.toggle("active");
      navLinks.classList.toggle("active");

      // Toggle aria-expanded attribute
      const isExpanded = this.getAttribute("aria-expanded") === "true";
      this.setAttribute("aria-expanded", String(!isExpanded));
    });

    // Close menu when a link is clicked
    navItems.forEach((link) => {
      link.addEventListener("click", function () {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Different methods to ensure DOM is loaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", safeAddEventListener);
  } else {
    safeAddEventListener();
  }
})();

const year = new Date().getFullYear();
const copyright = document.querySelector("#copyright");
copyright.innerHTML = `&copy;${year}`;

const lastUpdated = document.querySelector("#lastUpdated");
lastUpdated.innerHTML = document.lastModified;

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const currentPath = window.location.pathname;

  // Wayfinding - Highlight current page
  const navItems = document.querySelectorAll(".nav-links a");
  navItems.forEach((item) => {
    // Remove leading and trailing slashes for comparison
    const cleanPath = currentPath.replace(/^\/|\/$/g, "");
    const cleanHref = item.getAttribute("href").replace(/^\/|\/$/g, "");

    // Check if current path matches link href
    if (cleanPath === cleanHref || (cleanPath === "" && cleanHref === "home")) {
      item.classList.add("active");
    }
  });

  // Hamburger menu toggle
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");

    // Toggle aria-expanded attribute
    const isExpanded = hamburger.getAttribute("aria-expanded") === "true";
    hamburger.setAttribute("aria-expanded", !isExpanded);
  });

  // Close menu when a link is clicked
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");

    // Toggle aria-expanded attribute
    const isExpanded = hamburger.getAttribute("aria-expanded") === "true";
    hamburger.setAttribute("aria-expanded", !isExpanded);
  });

  // Close menu when a link is clicked
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
    });
  });
});

window.onload = function () {
  window.addEventListener("scroll", function (e) {
    if (window.pageYOffset > 100) {
      document.querySelector("header").classList.add("is-scrolling");
    } else {
      document.querySelector("header").classList.remove("is-scrolling");
    }
  });

  const menu_btn = document.querySelector(".hamburger");
  const mobile_menu = document.querySelector(".mobile-nav");

  menu_btn.addEventListener("click", function () {
    menu_btn.classList.toggle("is-active");
    mobile_menu.classList.toggle("is-active");
  });
};

document.addEventListener("DOMContentLoaded", () => {
  // Obtener la URL de la página actual
  const currentPage = window.location.pathname.split("/").pop();

  // Seleccionar todos los enlaces del menú
  const navLinks = document.querySelectorAll(".nav-bar a");

  navLinks.forEach((link) => {
    // Obtener el href del enlace
    const linkHref = link.getAttribute("href");

    // Comparar con la página actual
    if (linkHref === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  const membershipLinks = document.querySelectorAll(".membership-card-link");
  const modals = document.querySelectorAll(".modal");
  const closeButtons = document.querySelectorAll(".modal-close");

  membershipLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const modalId = link.getAttribute("data-modal");
      const modal = document.getElementById(modalId);
      modal.style.display = "flex";
    });
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = button.closest(".modal");
      modal.style.display = "none";
    });
  });

  // Close modal when clicking outside
  modals.forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  });

  // Add timestamp to hidden input
  const timestampInput = document.getElementById("timestamp");
  timestampInput.value = new Date().toISOString();
});
