import axios from 'axios';

const apiUrl = 'http://localhost:3001/persons';

const getAllPersons = () => {
  return axios.get(apiUrl)
    .then(({ data }) => data)
}

const addPerson = newPerson => {
  return axios.post(apiUrl, newPerson)
    .then(({ data }) => data); // returns a promise!
}

export default { addPerson, getAllPersons };