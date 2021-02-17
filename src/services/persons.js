import axios from 'axios';

const apiUrl = 'http://localhost:3001/api/persons';

const getAllPersons = () => {
  return axios.get(apiUrl)
    .then(({ data }) => data)
}

const addPerson = newPerson => {
  return axios.post(apiUrl, newPerson)
    .then(({ data }) => data); // returns a promise!
}

const deletePerson = id => {
  return axios.delete(`${apiUrl}/${id}`);
}

const editPerson = (id, update) => {
  return axios.put(`${apiUrl}/${id}`, update)
    .then(({ data }) => data); // this value is undefined; json server is not return the updated record
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { addPerson, getAllPersons, deletePerson, editPerson };