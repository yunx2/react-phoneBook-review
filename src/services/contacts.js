import axios from 'axios';

const apiUrl = 'http://localhost:3001/api/contacts';

export const getAllContacts = () => {
  return axios.get(apiUrl)
    .then(({ data }) => data)
}

export const addContact = newPerson => {
  return axios.post(apiUrl, newPerson)
    .then(({ data }) => data); // returns a promise!
}

export const deleteContact = id => {
  return axios.delete(`${apiUrl}/${id}`);
}

export const editContact = (id, update) => {
  return axios.put(`${apiUrl}/${id}`, update)
    .then(({ data }) => data); // this value is undefined; json server is not return the updated record
}

// eslint-disable-next-line import/no-anonymous-default-export
// export default { addContact, getAllContacts, deleteContact, editContact };