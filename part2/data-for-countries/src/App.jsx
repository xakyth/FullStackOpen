import { useEffect, useState } from 'react'
import axios from 'axios'
import CountriesForm from './components/CountriesForm'

function App() {
  const [searchText, setSearchText] = useState('')
  const [allData, setAllData] = useState(null)
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setAllData(response.data)
        setCountries(response.data.map(countryData => countryData.name.common))
      })
  }, [])

  const handleChangeSearchText = (props) => {
    const newValue = props.target.value
    setSearchText(newValue)
  }

  const countriesToShow = countries.filter(country => country.toLowerCase().match(searchText.toLowerCase()))

  return (
    <div>      
        <form>
          find countries
          <input type='text' value={searchText} onChange={handleChangeSearchText}/>
        </form>
        <CountriesForm countries={countriesToShow} allData={allData}/>
    </div>
  )
}

export default App
