const year = new Date().getFullYear();
const copyright = document.querySelector("#copyright");
copyright.innerHTML = `&copy;${year}`;

const lastUpdated = document.querySelector("#lastUpdated");
lastUpdated.innerHTML = document.lastModified;

// Fetch data from members.json and populate the table

const path = "data/members.json";

const getData = async (filePath) => {
  try {
    const response = await fetch(filePath);
    const data = await response.json();
    console.table(data.members);
    displayBusinesses(data.members);
  } catch (error) {
    console.log(error);
  }
};

getData(path);

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
