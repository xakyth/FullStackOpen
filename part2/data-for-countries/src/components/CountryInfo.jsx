import { useEffect, useState } from "react"
import countryService from '../services/countries'
import weatherService from '../services/weather'

const iconUrl = 'https://openweathermap.org/img/wn'

const CountryInfo = ({country}) => {
    const [countryData, setCountryData] = useState(null)
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        console.log('country', country)
        countryService.getByName(country)
            .then(response => {
                setCountryData(response)
            })
    }, [country])

    useEffect(() => {
        if (countryData) {
            const lat = countryData.capitalInfo.latlng[0]
            const lon = countryData.capitalInfo.latlng[1]
            weatherService.getCurrentWeather(lat, lon).then(response => {
                setWeather(response)
            })
        }
    }, [countryData])

    if (weather) {
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
                <div>temperature {weather.main.temp} Celcius</div>
                <div><img src={`${iconUrl}/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description}/></div>
                <div>wind {weather.wind.speed} m/s</div>
            </div>
        )
    } else {
        return (
            <div>

            </div>
        )
    }
}

export default CountryInfo