import axios from "axios"

const apiKey = import.meta.env.VITE_OPENWEATHER_KEY
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'
const iconUrl = 'https://openweathermap.org/img/wn'

const getCurrentWeather = (lat, lon) => {
    axios
        .get(`${baseUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        .then(response => response.data)
}

export default { getCurrentWeather }