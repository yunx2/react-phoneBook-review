
import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

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
  return (
    <div>
      <h2>Phonebook</h2>
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
        {persons.map(person => <div>{person.name} {person.number}</div>)}
    </div>
  )
}


export default App;
