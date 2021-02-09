
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Numbers from './Numbers';
import Search from './Search';
import AddForm from './AddForm';

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchTerm, setSearchTerm ] = useState('')

  const getAllPersons = () => {
    axios.get("http://localhost:3001/persons")
      .then(({ data }) => setPersons(data))
  }

  useEffect(getAllPersons, [])

  const handleAdd = e => {
    e.preventDefault();
    if (!persons.find(p => p.name === newName)) {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(newPerson));
      setNewName('');
      setNewNumber('');
    } else {
      window.alert(`${newName} is already in phonebook`);
      setNewName('');
    }
  }

  const personsToShow = searchTerm === '' ? persons 
    : persons.filter(p => p.name.toLowerCase().includes(searchTerm))

  return (
    <div>
      <h2>Phonebook</h2>
      <Search setSearch={setSearchTerm}  />
      <h3>Add new number</h3>
      <AddForm handler={handleAdd} setName={setNewName} setNumber={setNewNumber} name={newName} number={newNumber}/>
      <h3>Numbers</h3>
      <Numbers personsList={personsToShow} />
    </div>
  )
}


export default App;
