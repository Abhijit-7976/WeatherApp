const apiKey = "a14e054e573f9a97ce50622bd1173c61"
const weatherURL =
  "https://api.openweathermap.org/data/2.5/weather?units=metric"
const geocodingURL = "http://api.openweathermap.org/geo/1.0/direct?"

const weatherIcon = document.querySelector(".weather-icon")
const search = document.querySelector(".search")
const searchInput = document.querySelector(".search input")
const temp = document.querySelector(".temp")
const city = document.querySelector(".city")
const humidity = document.querySelector(".humidity")
const wind = document.querySelector(".wind")
const displayWeather = document.querySelector(".weather")
const notFound = document.querySelector(".error")

async function getWeather(cityName) {
  // const geoResponse = await fetch(
  //   geocodingURL + `appid=${apiKey}` + `&q={${cityName}}`
  // )
  // const location = await geoResponse.json()

  // const lat = location[0].lat
  // const lon = location[0].lon

  const weatherResponse = await fetch(
    weatherURL + `&appid=${apiKey}` + `&q=${cityName}`
  )

  notFound.style.display = "none"

  if (weatherResponse.status == 404) {
    notFound.style.display = "block"
    displayWeather.style.display = "none"
  }

  const weather = await weatherResponse.json()

  const weatherType = weather.weather[0].main

  if (weatherType === "Clear") {
    weatherIcon.src = "./images/clear.png"
  } else if (weatherType === "Clouds") {
    weatherIcon.src = "./images/clouds.png"
  } else if (weatherType === "Drizzle") {
    weatherIcon.src = "./images/drizzle.png"
  } else if (weatherType === "Mist") {
    weatherIcon.src = "./images/mist.png"
  } else if (weatherType === "Rain") {
    weatherIcon.src = "./images/rain.png"
  } else if (weatherType === "Snow") {
    weatherIcon.src = "./images/snow.png"
  }

  temp.textContent = Math.round(weather.main.temp) + "°C"
  city.textContent = weather.name
  humidity.textContent = weather.main.humidity + "%"
  wind.textContent = weather.wind.speed + " kmph"

  displayWeather.style.display = "flex"
}

search.addEventListener("submit", e => {
  e.preventDefault()
  getWeather(searchInput.value)
  searchInput.value = ""
})
