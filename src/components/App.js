
import React, { useState } from 'react';

import Numbers from './Numbers';
import Search from './Search';
import AddForm from './AddForm';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchTerm, setSearchTerm ] = useState('')

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
