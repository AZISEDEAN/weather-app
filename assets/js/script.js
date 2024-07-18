/**
 * Credential
 */
// const API_KEY = "YOUR-API-KEY";
const API_KEY = "c0c23bd9f515b18c42131d604a8330bf";

const API_URL = "https://api.openweathermap.org";
const cityInput = document.getElementById("city");
const searchBtn = document.getElementById("search-btn");

function getWeather() {
  searchBtn.textContent = "loading..";
  const city = cityInput.value;

  const weatherUrl = `${API_URL}/data/2.5/weather?q=${city}&appid=${API_KEY}`;
  const forecastUrl = `${API_URL}/data/2.5/forecast?q=${city}&appid=${API_KEY}`;

  if (!city) {
    return alert("Please enter a city");
  }

  // Getting Weather Data
  fetch(weatherUrl)
    .then((response) => response.json())
    .then((data) => {
      displayWeather(data);
      searchBtn.textContent = "Search Again";
    })
    .catch((error) => {
      searchBtn.textContent = "Try Again";
      console.error(error);
      console.error("Error fetching current weather data:");
      alert("Error fetching current weather data. Please try again.");
    });

  // Getting Forecast Data
  fetch(forecastUrl)
    .then((response) => response.json())
    .then((data) => {
      displayHourlyForecast(data);
      searchBtn.textContent = "Search Again";
    })
    .catch((error) => {
      searchBtn.textContent = "Try Again";
      console.error(error);
      console.error("Error fetching hourly forecast data:");
      alert("Error fetching hourly forecast data. Please try again.");
    });
}
function displayWeather(data) {
  const tempDivInfo = document.getElementById("temp-div");
  const weatherInfoDiv = document.getElementById("weather-info");
  const weatherIcon = document.getElementById("weather-icon");
  const hourlyForecastDiv = document.getElementById("hourly-forecast");

  //clear previous content
  tempDivInfo.innerHTML = "";
  weatherInfoDiv.innerHTML = "";
  hourlyForecastDiv.innerHTML = "";

  if (data.cod === "401") {
    return alert("Error getting weather information");
  }
  if (data.cod === "404") {
    return alert("Error getting weather information");
  }
  //   console(data)
  weatherInfoDiv.innerHTML = `<p>${data?.massage}</p>`;
  const cityName = data.name;
  const description = data.weather[0].description;
  const temperature = Math.round(data.main.temp - 273.15);
  const iconCode = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
  // }
  // const temperatureHTML = '
  //      <p>${temperature}oC </p>
  // ';

  const temperatureHTML = `<p>${temperature} &deg;C</p>`;
  // const temperatureHTML = '<p>'+temperature+'</p>';

  const weatherHTML = `
    <p>${cityName}</p> 
    <p>${description}</p>`;

  tempDivInfo.innerHTML = temperatureHTML;
  weatherInfoDiv.innerHTML = weatherHTML;
  weatherIcon.src = iconUrl;
  weatherIcon.alt = description;
}

function displayHourlyForecast(hourlyData) {
  const hourlyForecastDiv = document.getElementById("hourly-forecast");
  const next24Hours = hourlyData.list.slice(0, 8);
  //   next24Hours.forEach((item) => {});

  next24Hours.forEach((item) => {
    const dateTime = new Date(item.dt * 1000);
    const hour = dateTime.getHours();
    const temperature = Math.round(item.main.temp - 273.15);
    const iconCode = item.weather[0].icon;
    // const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
    //   const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;
    // const iconUrl=`assets/images/sunset-icon.png`;

    const hourlyItemHTML = `
        <div class='hourly-item'>
        <span>${hour}:00 </span>
        <img src="${iconUrl}" alt="Hourly Weather Icon" width="40">
        <span>${temperature} &deg;C</span>
        </div>
    `;

    hourlyForecastDiv.innerHTML += hourlyItemHTML;
  });
  showImage();
}

function showImage() {
  const weatherIcon = document.getElementById("weather-icon");
  weatherIcon.style.display = "block";
}
