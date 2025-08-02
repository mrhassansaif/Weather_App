// script.js

const apiKey   = '95d9d3a5000b4fbba32450cff464b5d7';
const baseUrl  = 'https://api.openweathermap.org/data/2.5/weather';
let   unitType = 'metric';
const bgImgs   = ['Day.png', 'raat.png'];

const body1       = document.querySelector('.body1');
const card        = document.querySelector('.weather-card');
const input       = document.getElementById('myInput');
const btnSearch   = document.getElementById('search-btn');
const chkToggle   = document.getElementById('abc');
const cityNameEl  = document.querySelector('.city-name');
const tempEl      = document.querySelector('.temp > span');
const descEl      = document.querySelector('.description');
const minEl       = document.querySelector('.min');
const maxEl       = document.querySelector('.max');
const iconEl      = document.getElementById('icon');

document.addEventListener('DOMContentLoaded', () => {
  btnSearch.addEventListener('click', getWeather);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') getWeather(); });
  chkToggle.addEventListener('change', toggle);
  themeChanger();
});

function getWeather() {
  const city = input.value.trim();
  if (!city) return;

  card.style.display = 'flex';

  const url = `${baseUrl}?q=${encodeURIComponent(city)}&units=${unitType}&appid=${apiKey}`;
  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    })
    .then(data => {
      cityNameEl.textContent = `${data.name}, ${data.sys.country}`;
      tempEl.textContent     = Math.round(data.main.temp);
      descEl.textContent     = data.weather[0].description;
      minEl.textContent      = Math.round(data.main.temp_min);
      maxEl.textContent      = Math.round(data.main.temp_max);
      iconEl.innerHTML       = `<img class="bg-img" src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].main}">`;

      const now = data.dt;
      if (now >= data.sys.sunrise && now < data.sys.sunset) {
        body1.style.backgroundImage = `url('${bgImgs[0]}')`;
      } else {
        body1.style.backgroundImage = `url('${bgImgs[1]}')`;
      }

      if (chkToggle.checked) chkToggle.checked = false;
    })
    .catch(err => alert(err.message));
}

function toggle() {
  unitType = chkToggle.checked ? 'imperial' : 'metric';
  getWeather();
}

function themeChanger() {
  setInterval(() => {
    const idx = Math.floor(Math.random() * bgImgs.length);
    body1.style.backgroundImage = `url('${bgImgs[idx]}')`;
  }, 5000);
}
