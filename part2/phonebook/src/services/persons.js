import axios from "axios";

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl).then(response => response.data)
}
const create = (person) => {
    return axios.post(baseUrl, person).then(response => response.data)
}
const deletePerson = id => {
    return axios.delete(`${baseUrl}/${id}`)
}
const update = person => {
    return axios.put(`${baseUrl}/${person.id}`, person).then(response => response.data)
}


export default { getAll, create, deletePerson, update }