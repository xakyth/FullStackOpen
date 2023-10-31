import { useEffect, useState } from "react"
import countryService from '../services/countries'
import weatherService from '../services/weather'

const CountryInfo = () => {
    const [countryData, setCountryData] = useState(null)
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        setCountryData(countryService.getByName(countries[0]))
    }, [countries])
    useEffect(() => {
        if (countryData) {
            const lat = countryData.capitalInfo.latlng[0]
            const lon = countryData.capitalInfo.latlng[1]
            setWeather(weatherService.getCurrentWeather(lat, lon))
        }
            
    }, [countryData])
    
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
}

export default CountryInfo