
import React, { useState, useEffect } from 'react';

import Numbers from './Numbers';
import Search from './Search';
import AddForm from './AddForm';
import Notification from './Notification'
import personsService from '../services/persons';

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchTerm, setSearchTerm ] = useState('')
  const [ notification, setNotification ] = useState(null)

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
      const newEntry = {
        name: newName,
        number: newNumber
      }
      // make POST request
      personsService.addPerson(newEntry)
        .then(data => {
          // update state with newly added person
          setPersons(persons.concat(data));
          // set success notification
          setNotification(`${newName} added`)
          // remove notification
          setTimeout(() => setNotification(null), 3000)
          // clear input fields
          setNewName('');
          setNewNumber('');
        });
    } else {
        window.alert(`${newName} is already in phonebook, replace number with new one?`);
        // find person with matching name
        const person = persons.find(p => p.name === newName);
        // make updated person object by copying old person object and replacing number with newNumber 
        const updated = {
          ...person,
          number: newNumber 
        }
        // make PUT request
        personsService.editPerson(person.id, updated)
          .then(() => {
            // update the application state with edited person object
            setPersons(persons.map(p => p.id === person.id ? updated : p));
            // success notification
            setNotification(`${newName}'s number has been changed`)
            // remove notification
            setTimeout(() => setNotification(null), 3000)
            // clear text inputs
            setNewName('');
            setNewNumber('');
          })
          .catch(() => {
            // set error notification
            setNotification(`error: cannot find ${newName}`);
            // remove notification
            setTimeout(() => setNotification(null), 3000)
          });
          // clear text inputs
          setNewName('');
          setNewNumber('');
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
        // success notification
        setNotification(`${name} has been deleted`)
        // remove notification
        setTimeout(() => setNotification(null), 3000)
      })
  }

  const personsToShow = searchTerm === '' ? persons 
    : persons.filter(p => p.name.toLowerCase().includes(searchTerm))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Search setSearch={setSearchTerm}  />
      <h3>Add new number</h3>
      <AddForm handler={handleAdd} setName={setNewName} setNumber={setNewNumber} name={newName} number={newNumber}/>
      <h3>Numbers</h3>
      <Numbers personsList={personsToShow} handler={handleDelete} />
    </div>
  )
}


export default App;
