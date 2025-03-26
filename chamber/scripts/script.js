const year = new Date().getFullYear();
const copyright = document.querySelector("#copyright");
copyright.innerHTML = `&copy;${year}`;

const lastUpdated = document.querySelector("#lastUpdated");
lastUpdated.innerHTML = document.lastModified;

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

// Fetch data from members.json and populate the table

const pathMembers = "data/members.json";

const getData = async (filePath) => {
  try {
    const response = await fetch(filePath);
    const data = await response.json();

    displayBusinesses(data.members);
  } catch (error) {
    console.log(error);
  }
};

getData(pathMembers);

const cards = document.querySelector("#cards");

const displayBusinesses = (business) => {
  business.forEach((business) => {
    let card = document.createElement("article");
    let name = document.createElement("h3");
    let address = document.createElement("p");
    let content = document.createElement("div");
    let imgContainer = document.createElement("div");
    let logo = document.createElement("img");
    let details = document.createElement("div");

    let website_url = document.createElement("p");
    let link = document.createElement("a");
    let phone_number = document.createElement("p");
    let membership_level = document.createElement("p");
    let status = document.createElement("p");

    const membershipLevels = {
      1: "Member",
      2: "Silver",
      3: "Gold",
    };

    const membership_level_name =
      membershipLevels[business.membership_level] ?? "Unknown";

    link.textContent = `${business.website_url}`;
    link.href = `${business.website_url}`;
    link.target = "_blank";

    website_url.innerHTML = `<strong>WEBSITE:</strong> ${link.outerHTML}`;
    phone_number.innerHTML = `<strong>PHONE:</strong> ${business.phone_number}`;
    membership_level.innerHTML = `<strong>MEMBERSHIP:</strong> ${membership_level_name}`;
    status.innerHTML = `<strong>STATUS:</strong> ${business.status}`;

    name.textContent = `${business.name}`;
    address.textContent = `${business.address}`;

    logo.setAttribute("src", `images/${business.image_file_name}`);
    logo.setAttribute("alt", `Logo of ${business.name}`);
    logo.setAttribute("loading", "lazy");

    details.appendChild(website_url);
    details.appendChild(phone_number);
    details.appendChild(membership_level);
    details.appendChild(status);

    imgContainer.appendChild(logo);

    content.appendChild(imgContainer);
    content.appendChild(details);

    card.appendChild(name);
    card.appendChild(address);
    card.appendChild(content);

    card.classList.add("business-card");
    address.classList.add("tagline");
    content.classList.add("card-content");
    imgContainer.classList.add("business-image");
    details.classList.add("business-details");

    cards.appendChild(card);
  });
};

/*
document.addEventListener("DOMContentLoaded", function () {
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
});

*/
