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
