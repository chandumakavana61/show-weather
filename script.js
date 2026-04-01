const API_KEY = "cfe72aaf8e8c2558d774e9b7991f89de";

const day = document.querySelector("#day");
const date = document.querySelector("#date");
const city = document.querySelector("#cityName");
const realFeel = document.querySelector("#realFeel");
const humidity = document.querySelector("#humidity");
const currentDegree = document.querySelector("#currentDegree");
const wind = document.querySelector("#wind");
const form = document.querySelector("form");
const loader = document.querySelector("#loader");

const showLoader = () => {
  loader.classList.remove("hidden");
  loader.classList.add("flex");
};

const hideLoader = () => {
  loader.classList.add("hidden");
  loader.classList.remove("flex");
};

const fetchData = async (cityName) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${API_KEY}`
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to fetch weather data");
  }

  return data;
};

const updateDate = () => {
  const today = new Date();
  day.textContent = today.toLocaleDateString("en-US", { weekday: "long" });
  date.textContent = today.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });
};

const renderWeather = (data) => {
  city.style.color = "white";
  city.textContent = data.name;
  currentDegree.textContent = Math.round(data.main.temp - 273.15);
  realFeel.textContent = Math.round(data.main.feels_like - 273.15);
  humidity.textContent = data.main.humidity;
  wind.textContent = Math.round(data.wind.speed * 3.6);
};

const renderError = () => {
  city.style.color = "#fecaca";
  city.textContent = "Please enter correct city name";
  currentDegree.textContent = "--";
  realFeel.textContent = "--";
  humidity.textContent = "--";
  wind.textContent = "--";
};

const loadWeather = async (cityName) => {
  showLoader();

  try {
    const data = await fetchData(cityName);
    localStorage.setItem("savedCity", cityName);
    renderWeather(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    renderError();
  } finally {
    hideLoader();
  }
};

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const searchCity = form.searchCity.value.trim() || "Surat";
  await loadWeather(searchCity);
  form.searchCity.value = searchCity;
});

updateDate();
loadWeather(localStorage.getItem("savedCity") || "Surat");
