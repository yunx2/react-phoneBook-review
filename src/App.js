
import React, { useState } from 'react'

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
      search:
      <input onChange={({ target }) => setSearchTerm(target.value.toLowerCase())} />
      <form>
        <div>name: 
          <input value={newName} onChange={({ target }) => setNewName(target.value)} />
        </div>
        <div>number:
         <input value={newNumber} onChange={({ target }) => setNewNumber(target.value)} />
        </div>
        <div>
          <button type="submit" onClick={e => handleAdd(e)}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {personsToShow.map(person => <div>{person.name} {person.number}</div>)}
    </div>
  )
}


export default App;
