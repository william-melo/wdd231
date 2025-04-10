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

const pathMembers = "data/members.json";

window.addEventListener("pagehide", () => {
    if (socket) {
        socket.close();
    }
});

(function () {
    // Function to safely add event listeners for navigation
    function safeAddEventListener() {
        const hamburger = document.querySelector(".hamburger");
        const navLinks = document.querySelector(".nav-links");

        // Get current page filename
        const currentPage =
            window.location.pathname.split("/").pop() || "discover.html"; // Default to discover.html if path is root

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
            } else {
                item.classList.remove("active"); // Ensure others are not active
            }
        });

        // Hamburger menu toggle
        hamburger.addEventListener("click", function () {
            this.classList.toggle("active");
            navLinks.classList.toggle("active");
            const isExpanded = this.getAttribute("aria-expanded") === "true";
            this.setAttribute("aria-expanded", String(!isExpanded));
        });

        // Close menu when a link is clicked
        navItems.forEach((link) => {
            link.addEventListener("click", function () {
                // Only close if the menu is active (visible)
                if (navLinks.classList.contains("active")) {
                    hamburger.classList.remove("active");
                    navLinks.classList.remove("active");
                    hamburger.setAttribute("aria-expanded", "false");
                }
            });
        });
    }

    // Function to display the visit message
    function displayVisitMessage() {
        const visitMessageElement = document.getElementById("visit-message");
        if (!visitMessageElement) {
            console.error("Visit message element not found.");
            return;
        }

        const lastVisit = localStorage.getItem("lastVisitDiscoverPage");
        const now = Date.now();
        const oneDayInMillis = 24 * 60 * 60 * 1000; // Milliseconds in a day

        if (!lastVisit) {
            visitMessageElement.textContent =
                "Welcome! Let us know if you have any questions.";
        } else {
            const lastVisitTime = parseInt(lastVisit, 10);
            const timeDifference = now - lastVisitTime;
            const daysDifference = Math.floor(timeDifference / oneDayInMillis);

            if (timeDifference < oneDayInMillis) {
                visitMessageElement.textContent = "Back so soon! Awesome!";
            } else {
                const dayText = daysDifference === 1 ? "day" : "days";
                visitMessageElement.textContent = `You last visited ${daysDifference} ${dayText} ago.`;
            }
        }

        // Store the current visit time
        localStorage.setItem("lastVisitDiscoverPage", now.toString());
    }

    // Function to fetch data and build cards
    async function buildDiscoverCards() {
        const gridContainer = document.querySelector(".discover-grid");
        if (!gridContainer) {
            console.error("Discover grid container not found.");
            return;
        }

        try {
            const response = await fetch("data/discover_data.json");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const items = await response.json();

            gridContainer.innerHTML = ""; // Clear loading/error message

            items.forEach((item) => {
                const card = document.createElement("article");
                card.classList.add("discover-card");

                card.innerHTML = `
                    <figure>
                        <img src="${item.image}" alt="${item.name}" loading="lazy" width="300" height="200">
                    </figure>
                    <div class="discover-card-content">
                        <h2>${item.name}</h2>
                        <address>${item.address}</address>
                        <p>${item.description}</p>
                        <button>Learn More</button>
                    </div>
                `;
                gridContainer.appendChild(card);
            });
        } catch (error) {
            console.error("Could not load discover items:", error);
            gridContainer.innerHTML =
                "<p>Sorry, could not load the discovery items at this time.</p>";
        }
    }

    // --- Execution ---

    // Set footer info
    const year = new Date().getFullYear();
    const copyright = document.querySelector("#copyright");
    if (copyright) copyright.innerHTML = `&copy;${year}`;

    const lastUpdated = document.querySelector("#lastUpdated");
    if (lastUpdated) lastUpdated.innerHTML = document.lastModified;

    // Run functions after DOM is loaded
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => {
            safeAddEventListener();
            displayVisitMessage();
            buildDiscoverCards();
        });
    } else {
        // DOM already loaded
        safeAddEventListener();
        displayVisitMessage();
        buildDiscoverCards();
    }
})(); // IIFE ends here

const year = new Date().getFullYear();
const copyright = document.querySelector("#copyright");
copyright.innerHTML = `&copy;${year}`;

const lastUpdated = document.querySelector("#lastUpdated");
lastUpdated.innerHTML = document.lastModified;
