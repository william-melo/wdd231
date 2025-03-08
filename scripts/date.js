const year = new Date().getFullYear();
const element = document.querySelector("#currentYear");
element.innerHTML = year;

const element2 = document.querySelector("#lastUpdated");
element2.innerHTML = document.lastModified;
