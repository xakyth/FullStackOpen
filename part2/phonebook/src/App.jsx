import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filteredPersons, setFilteredPersons] = useState([])

  useEffect(() => {
    personService
      .getAll().then(returnedPersons => {
        setPersons(returnedPersons)
      })
  }, [])
  useEffect(() => {
    setFilteredPersons(persons)
  }, [persons])

  const deletePerson = id => {
    if (window.confirm(`Delete ${persons.find(p => p.id === id).name} ?`)) {
      personService.deletePerson(id).then(() => {
        setPersons(persons.filter(p => p.id !== id))
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter persons={persons} setFilteredPersons={setFilteredPersons}/>
      <h3>Add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons} />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} deletePerson={deletePerson}/>
    </div>
  )
}

export default App