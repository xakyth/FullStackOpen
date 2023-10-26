import { useState } from "react"

const Filter = ({ persons, setFilteredPersons }) => {
    const [filterName, setFilterName] = useState('')
    const handleChangeFilterName = (event) => {
        setFilterName(event.target.value)
        const filter = event.target.value.toLowerCase()
        setFilteredPersons(persons.reduce((acc, cur) => {
            if (cur.name.toLowerCase().indexOf(filter) >= 0)
                return acc.concat(cur)
            return acc
        }, []))
    }
    return (
        <p>
            filter shown with <input value={filterName} onChange={handleChangeFilterName} />
        </p>
    )
}

export default Filter