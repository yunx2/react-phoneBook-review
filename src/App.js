
import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const handleAdd = e => {
    e.preventDefault();
    if (!persons.find(p => p.name === newName)) {
      const newPerson = {
        name: newName
      }
      setPersons(persons.concat(newPerson));
      setNewName('');
    } else {
      window.alert(`${newName} is already in phonebook`);
      setNewName('');
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={({ target }) => setNewName(target.value)} />
        </div>
        <div>
          <button type="submit" onClick={e => handleAdd(e)}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.map(person => <div>{person.name}</div>)}
    </div>
  )
}


export default App;
