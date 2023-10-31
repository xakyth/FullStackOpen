import CountryInfo from "./CountryInfo"

const CountriesForm = ({countries, handleCountryChoose}) => {
    if (countries.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    } else if (countries.length == 1) {
        return (
            <CountryInfo country={countries[0]} />
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