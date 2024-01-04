const apiKey = "fc8e6368162045d298f26841172c88bc"; // Replace this with your Weatherbit API key

const inputField = document.querySelector('.search-box');
inputField.addEventListener('keypress', setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(inputField.value);
  }
}

function getResults(query) {
  fetch(`https://api.weatherbit.io/v2.0/current?city=${query}&key=${apiKey}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(displayResults)
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
      alert('Failed to fetch weather data. Please try again.');
    });
}

function displayResults(weather) {
  const city = document.querySelector('.location .city');
  city.textContent = `${weather.data[0].city_name}, ${weather.data[0].country_code}`;

  const now = new Date();
  const date = document.querySelector('.location .date');
  date.textContent = dateBuilder(now);

  const temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.data[0].temp)}<span>°C</span>`;

  const weatherEl = document.querySelector('.current .weather');
  weatherEl.textContent = weather.data[0].weather.description;

  const hiLow = document.querySelector('.hi-low');
  hiLow.textContent = `${Math.round(weather.data[0].min_temp)}°C / ${Math.round(weather.data[0].max_temp)}°C`;
}

function dateBuilder(d) {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const day = days[d.getDay()];
  const date = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
