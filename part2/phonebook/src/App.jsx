import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filteredPersons, setFilteredPersons] = useState([])
  const [notificationMessage, setNotificationMessage] = useState(null)

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
      <Notification text={notificationMessage !== null ? notificationMessage.text : null} isError={notificationMessage !== null ? notificationMessage.isError : null} />
      <Filter persons={persons} setFilteredPersons={setFilteredPersons}/>
      <h3>Add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons} setNotificationMessage={setNotificationMessage}/>
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} deletePerson={deletePerson}/>
    </div>
  )
}

export default App