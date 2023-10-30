import axios from "axios"
import { useState } from "react"

const apiKey = import.meta.env.VITE_OPENWEATHER_KEY
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'
const iconUrl = 'https://openweathermap.org/img/wn'

const CountriesForm = ({countries, allData, handleCountryChoose}) => {
    
    if (countries.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    } else if (countries.length == 1) {
        const countryData = allData.find(country => country.name.common === countries[0])
        
        const [weather, setWeather] = useState(undefined)
        if (weather == undefined) {
            axios
                .get(`${baseUrl}?lat=${countryData.capitalInfo.latlng[0]}&lon=${countryData.capitalInfo.latlng[1]}&appid=${apiKey}&units=metric`)
                .then(response => setWeather(response.data))
        }

        console.log('weather', weather)
        console.log('countryData', countryData)

        return (
            <div>
                <h1>{countryData.name.common}</h1>
                capital {countryData.capital[0]}
                <br/>
                area {countryData.area}
                <br/>
                <br/>
                <b>languages:</b>
                <ul>
                    { Object.values(countryData.languages).map(lang => <li key={lang}>{lang}</li>) }
                </ul>
                <img src={countryData.flags.png} alt={countryData.flags.alt} />
                <h2>Weather in {countryData.capital[0]}</h2>
                <div>temperature {weather != undefined ? weather.main.temp : null} Celcius</div>
                <div><img src={`${iconUrl}/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description}/></div>
                <div>wind {weather != undefined ? weather.wind.speed : null} m/s</div>
            </div>
        )
    } else {
        return (
            <div>
                {countries.map(country => <div key={country}>
                        {country}
                        <button onClick={() => handleCountryChoose(country)}>show</button>
                    </div>)}
            </div>
        )
    }
}

export default CountriesForm