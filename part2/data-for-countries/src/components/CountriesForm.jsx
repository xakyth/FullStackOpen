import { useEffect, useState } from "react"
import CountryInfo from "./CountryInfo"

const CountriesForm = ({countries, handleCountryChoose}) => {
    console.log('countries', countries)
    if (countries.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    } else if (countries.length == 1) {
        <CountryInfo />
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