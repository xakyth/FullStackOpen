import { useEffect, useState } from 'react'
import axios from 'axios'
import CountriesForm from './components/CountriesForm'

function App() {
  const [searchText, setSearchText] = useState('')
  const [allData, setAllData] = useState(null)
  const [countries, setCountries] = useState([])
  const [countriesToShow, setCountriesToShow] = useState([])

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setAllData(response.data)
        setCountries(response.data.map(countryData => countryData.name.common))
      })
  }, [])
  useEffect(() => {
    setCountriesToShow(countries.filter(country => country.toLowerCase().match(searchText.toLowerCase())))
  }, [countries, searchText])

  const handleChangeSearchText = (props) => {
    const newValue = props.target.value
    setSearchText(newValue)
  }
  
  const handleCountryChoose = (country) => {
    setCountriesToShow([].concat(country))
  }

  console.log('import.meta.env.VITE_OPENWEATHER_KEY', import.meta.env.VITE_OPENWEATHER_KEY)

  return (
    <div>      
      <form>
        find countries
        <input type='text' value={searchText} onChange={handleChangeSearchText}/>
      </form>
      <CountriesForm countries={countriesToShow} allData={allData} handleCountryChoose={handleCountryChoose}/>
    </div>
  )
}

export default App
