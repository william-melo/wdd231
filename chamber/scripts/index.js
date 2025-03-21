const pathMembers = "data/members.json";

window.addEventListener("pagehide", () => {
  if (socket) {
    socket.close();
  }
});

const getData = async (filePath) => {
  try {
    const response = await fetch(filePath);
    const data = await response.json();

    return data.members;
  } catch (error) {
    console.log(error);
  }
};

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

const year = new Date().getFullYear();
const copyright = document.querySelector("#copyright");
copyright.innerHTML = `&copy;${year}`;

const lastUpdated = document.querySelector("#lastUpdated");
lastUpdated.innerHTML = document.lastModified;

const OPENWEATHER_API_KEY = "4aff6b294e48bf219725ba6a13a11b18";
const WEATHER_CITY = "Bogota,CO";
const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${WEATHER_CITY}&units=metric&lang=es&appid=${OPENWEATHER_API_KEY}`;

const EXCHANGE_API_URL = "https://open.er-api.com/v6/latest/USD";

function capitalizarPrimeraLetra(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
async function loadWeatherData() {
  try {
    const weatherSection = document.querySelector(".weather-info");
    const forecastElement = document.querySelector(".weather-forecast");

    weatherSection.innerHTML = "<p>Cargando datos del clima...</p>";

    const response = await fetch(WEATHER_API_URL);

    if (!response.ok) {
      throw new Error("No se pudo obtener la información del clima");
    }

    const data = await response.json();

    if (data.cod !== 200) {
      throw new Error("No se pudo obtener la información del clima");
    }
    // Mapear los códigos de clima a iconos de Font Awesome
    const weatherIconMap = {
      "01d": "fa-sun", // cielo despejado - día
      "01n": "fa-moon", // cielo despejado - noche
      "02d": "fa-cloud-sun", // algunas nubes - día
      "02n": "fa-cloud-moon", // algunas nubes - noche
      "03d": "fa-cloud", // nubes dispersas
      "03n": "fa-cloud",
      "04d": "fa-cloud", // nubes rotas
      "04n": "fa-cloud",
      "09d": "fa-cloud-showers-heavy", // lluvia intensa
      "09n": "fa-cloud-showers-heavy",
      "10d": "fa-cloud-rain", // lluvia
      "10n": "fa-cloud-rain",
      "11d": "fa-bolt", // tormenta
      "11n": "fa-bolt",
      "13d": "fa-snowflake", // nieve
      "13n": "fa-snowflake",
      "50d": "fa-smog", // niebla
      "50n": "fa-smog",
    };

    const iconCode = data.weather[0].icon;
    const iconClass = weatherIconMap[iconCode] || "fa-cloud";

    weatherSection.innerHTML = `
            <div class="weather-icon">
                <i class="fas ${iconClass}"></i>
            </div>
            <div class="weather-data">
                <div class="temperature">${Math.round(data.main.temp)}°C</div>
                <div class="condition">${capitalizarPrimeraLetra(
                  data.weather[0].description
                )}</div>
                <div class="details">
                    <span><i class="fas fa-tint"></i> ${
                      data.main.humidity
                    }%</span>
                    <span><i class="fas fa-wind"></i> ${Math.round(
                      data.wind.speed * 3.6
                    )} km/h</span>
                </div>
            </div>
        `;

    forecastElement.textContent = `Wind chill: ${Math.round(
      data.main.feels_like
    )}°C · Pressure: ${data.main.pressure} hPa`;
  } catch (error) {
    console.error("Error loading weather data:", error);
    document.querySelector(".weather-info").innerHTML = `
            <div class="weather-error">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Error retrieving weather info.</p>
            </div>
        `;
  }
}

async function loadEconomicData() {
  try {
    const statsListElement = document.querySelector(".stats-list");

    statsListElement.innerHTML = "<li>Cargando datos económicos...</li>";

    const exchangeResponse = await fetch(EXCHANGE_API_URL);

    if (!exchangeResponse.ok) {
      throw new Error("No se pudo obtener la información de tasas de cambio");
    }

    const exchangeData = await exchangeResponse.json();

    // Calcular tasas para COP (Peso Colombiano)
    const usdToCop = 1 / exchangeData.rates.COP;
    const eurToCop = exchangeData.rates.EUR / exchangeData.rates.COP;

    const newRegistrations = Math.floor(Math.random() * 100) + 200; // Dato simulado: entre 200 y 300

    statsListElement.innerHTML = `
            <li><span class="stat-label">USD:</span> $${(
              1 / usdToCop
            ).toLocaleString("es-CO", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })} COP</li>
            <li><span class="stat-label">EUR:</span> $${(
              1 / eurToCop
            ).toLocaleString("es-CO", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })} COP</li>
            <li><span class="stat-label">Nuevos registros:</span> +${newRegistrations} este mes</li>
            <li><span class="stat-label">Actualizado:</span> ${new Date().toLocaleDateString(
              "es-CO"
            )}</li>
        `;
  } catch (error) {
    console.error("Error al cargar datos económicos:", error);
    document.querySelector(".stats-list").innerHTML = `
            <li class="stats-error">
                <i class="fas fa-exclamation-triangle"></i>
                No se pudo cargar la información económica
            </li>
        `;
  }
}

async function loadSpotlightCompanies() {
  const spotlightCompanies = document.querySelector(".spotlight-container");
  const companies = await getData(pathMembers);

  if (companies.length > 0) {
    spotlightCompanies.innerHTML = ""; // Limpia antes de agregar contenido

    companies.slice(0, 3).forEach((company) => {
      spotlightCompanies.innerHTML += `
        <div class="spotlight-card">
          <img
            src="images/${company.image_file_name}"
            alt="${company.name}"
            class="spotlight-logo"
          />
          <h3>${company.name}</h3>
          <p class="spotlight-tag">${company.status}</p>
          <p class="spotlight-description">
            ${company.slogan || "Sin eslogan"}
          </p>
          <div class="spotlight-contact">
            <p><i class="fas fa-phone"></i> ${company.phone_number}</p>
            <p>
              <i class="fas fa-globe"></i> <a href="${
                company.website_url
              }" target="_blank">${company.website_url}</a>
            </p>
          </div>
        </div>
      `;
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadWeatherData();
  loadEconomicData();
  loadSpotlightCompanies();

  setInterval(() => {
    loadWeatherData();
    loadEconomicData();
    loadSpotlightCompanies();
  }, 1800000);
});
