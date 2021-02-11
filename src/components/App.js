
import React, { useState, useEffect } from 'react';

import Numbers from './Numbers';
import Search from './Search';
import AddForm from './AddForm';
import personsService from '../services/persons';

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchTerm, setSearchTerm ] = useState('')

  const getAllPersons = () => {
    personsService.getAllPersons()
      .then(data => setPersons(data))
  }

  useEffect(getAllPersons, [])

  const handleAdd = e => {
    e.preventDefault();
    // check if person has already been added
    if (!persons.find(p => p.name === newName)) {
      // make new person object 
      const newPerson = {
        name: newName,
        number: newNumber
      }
      // make POST request
      personsService.addPerson(newPerson)
        .then(data => {
          // update state with newly added person
          setPersons(persons.concat(data));
          // clear input fields
          setNewName('');
          setNewNumber('');
        });
      
    } else {
      window.alert(`${newName} is already in phonebook`);
      setNewName('');
    }
  }

  const handleDelete = name => {
    // show warning
    window.alert(`delete ${name}?`)
    // search persons for id
    const id = persons.find(p => p.name === name).id;
    // make DELETE request
    personsService.deletePerson(id)
      .then(() => {
        // change state to match server
        setPersons(persons.filter(p => p.id !== id));
      })
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
      <Numbers personsList={personsToShow} handler={handleDelete} />
    </div>
  )
}


export default App;
