const year = new Date().getFullYear();
const copyright = document.querySelector("#copyright");
copyright.innerHTML = `&copy;${year}`;

const lastUpdated = document.querySelector("#lastUpdated");
lastUpdated.innerHTML = document.lastModified;

document.addEventListener("DOMContentLoaded", () => {
  // Function to get URL parameters
  const getUrlParameter = (name) => {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    const results = regex.exec(location.search);
    return results === null
      ? ""
      : decodeURIComponent(results[1].replace(/\+/g, " "));
  };

  // Retrieve form submission details
  const formDetails = [
    { label: "First Name", value: getUrlParameter("first-name") },
    { label: "Last Name", value: getUrlParameter("last-name") },
    { label: "Email", value: getUrlParameter("email") },
    { label: "Phone", value: getUrlParameter("phone") },
    {
      label: "Business/Organization",
      value: getUrlParameter("organization"),
    },
    {
      label: "Submission Date",
      value: new Date(getUrlParameter("timestamp")).toLocaleString(),
    },
  ];

  // Create details container
  const detailsContainer = document.getElementById("detailsContainer");

  // Populate details
  formDetails.forEach((detail) => {
    if (detail.value) {
      const detailElement = document.createElement("div");
      detailElement.classList.add("detail-item");
      detailElement.innerHTML = `
              <div class="detail-label">${detail.label}:</div>
              <div class="detail-value">${detail.value}</div>
            `;
      detailsContainer.appendChild(detailElement);
    }
  });
});

(function () {
  // Function to safely add event listeners
  function safeAddEventListener() {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    // Get current page filename
    const currentPage = window.location.pathname.split("/").pop();

    // Check if elements exist before adding listeners
    if (!hamburger || !navLinks) {
      console.error("Navigation elements not found");
      return;
    }

    // Wayfinding - Highlight current page
    const navItems = document.querySelectorAll(".nav-links a");
    navItems.forEach((item) => {
      // Get the href attribute
      const href = item.getAttribute("href");

      // Check if href matches current page or is default
      if (
        href === currentPage ||
        (currentPage === "" && href === "index.html")
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
