import { useEffect, useState } from 'react'
import CountriesForm from './components/CountriesForm'
import Filter from './components/Filter'
import countryService from './services/countries'

function App() {
  const [searchText, setSearchText] = useState('')
  const [countries, setCountries] = useState([])
  const [countriesToShow, setCountriesToShow] = useState([])

  useEffect(() => { 
    countryService.getAll().then(response => { 
      setCountries(response.map(countryData => countryData.name.common))
    })
  }, [])
  
  const handleChangeSearchText = (props) => {
    setSearchText(props.target.value)
    setCountriesToShow(countries.filter(country => country.toLowerCase().match(searchText.toLowerCase())))
  }

  const handleCountryChoose = (country) => {
    setCountriesToShow([country])
  }

  return (
    <div>      
      <Filter searchText={searchText} handleChangeSearchText={handleChangeSearchText} />
      
      <CountriesForm countries={countriesToShow} handleCountryChoose={handleCountryChoose}/>
    </div>
  )
}

export default App
