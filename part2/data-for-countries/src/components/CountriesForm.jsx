const CountriesForm = ({countries, allData}) => {
    if (countries.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    } else if (countries.length == 1) {
        const countryData = allData.find(country => country.name.common === countries[0])
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
            </div>
        )
    } else {
        return (
            <div>
                {countries.map(country => <div key={country}>{country}</div>)}
            </div>
        )
    }
}

export default CountriesForm