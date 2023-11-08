import { useState } from "react"
import personService from '../services/persons'

const PersonForm = ({persons, setPersons, setNotificationMessage}) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const handleChangeName = (event) => {
        setNewName(event.target.value)
    }
    const handleChangeNumber = (event) => {
        setNewNumber(event.target.value)
    }
    const addPerson = (event) => {
        event.preventDefault()
        const person = persons.find(p => p.name === newName)
        if (person != undefined) {
            if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
                const newPerson = {
                    ...person,
                    number: newNumber
                }
                personService
                    .update(newPerson)
                    .then(returnedPerson => {
                        setPersons(persons.map(p => p.id !== returnedPerson.id ? p : returnedPerson))
                        setNotificationMessage( { text: `Phone number of ${returnedPerson.name} successfully changed`, isError: false })
                        setTimeout(() => setNotificationMessage(null), 5000)
                    })
                    .catch(error => {
                        setNotificationMessage( { text: `Information of ${newPerson.name} has already been removed from server`, isError: true })
                        setTimeout(() => setNotificationMessage(null), 5000)
                    })
            }
        } else {
            const newPerson = {
                name: newName,
                number: newNumber
            }
            personService
                .create(newPerson)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setNewName('')
                    setNewNumber('')
                    setNotificationMessage({ text: `Added ${returnedPerson.name}`, isError: false })
                    setTimeout(() => setNotificationMessage(null), 5000)
                })
                .catch(error => {
                    setNotificationMessage({ text: error.response.data.error, isError: true })
                    setTimeout(() => setNotificationMessage(null), 5000)
                })
        }
    }

    return (
        <form>
            <div>
                name: <input value={newName} onChange={handleChangeName} />
            </div>
            <div>
                number: <input value={newNumber} onChange={handleChangeNumber} />
            </div>
            <div>
                <button onClick={addPerson} type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm