import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Numbers from './Numbers';
import Search from './Search';
import AddForm from './AddForm';
import Notification from './Notification';
import Contact from './Contact';
import { addContact, getAllContacts, deleteContact, editContact } from '../services/contacts';

const App = () => {
  const [ contactList, setContactList ] = useState([])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ address, setAddress ] = useState('')
  const [ notes, setNotes ] = useState('')

  const [ searchTerm, setSearchTerm ] = useState('')
  const [ notification, setNotification ] = useState(null)

  useEffect(() => {
    getAllContacts()
      .then(data => setContactList(data))
  }, [])

  const handleAdd = e => {
    e.preventDefault();
    // check if person has already been added
    if (!contactList.find(p => p.name === newName)) {
      // make new person object 
      const newEntry = {
        name: newName,
        number: newNumber
      }
      // make POST request
      addContact(newEntry)
        .then(data => {
          // update state with newly added person
          setContactList(contactList.concat(data));
          // set success notification
          setNotification(`${newName} added`)
          // remove notification
          setTimeout(() => setNotification(null), 3000)
          // clear input fields
          setNewName('');
          setNewNumber('');
          setAddress('');
          setNotes('');
        });
    } else {
        window.alert(`${newName} is already in phonebook, replace number with new one?`);
        // find person with matching name
        const entry = contactList.find(p => p.name === newName);
        // make updated person object by copying old person object and replacing number with newNumber 
        const updatedEntry = {
          ...entry,
          number: newNumber 
        }
        // make PUT request
        editContact(entry.id, updatedEntry)
          .then(() => {
            // update the application state with edited person object
            setContactList(contactList.map(p => p.id === entry.id ? updatedEntry : p));
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
    const id = contactList.find(p => p.name === name).id;
    // make DELETE request
    deleteContact(id)
      .then(() => {
        // change state to match server
        setContactList(contactList.filter(p => p.id !== id));
        // success notification
        setNotification(`${name} has been deleted`)
        // remove notification
        setTimeout(() => setNotification(null), 3000)
      })
  }

  const displayedContacts = searchTerm === '' ? contactList 
    : contactList.filter(p => p.name.toLowerCase().includes(searchTerm))

  return (
    <Router>
      <div>
        <h2>phonebook contacts</h2>
        <Notification message={notification} />
        <Search setSearch={setSearchTerm}  />
        <h3>Add new number</h3>
        <AddForm handler={handleAdd} setName={setNewName} setNumber={setNewNumber} setAddress={setAddress} setNotes={setNotes} name={newName} number={newNumber} address={address} notes={notes} />
        <h3>Numbers</h3>
        <Switch>
        <Route path='/contacts/:id'>
          <Contact />
        </Route>    
        <Route path='/'>
          <Numbers list={displayedContacts} handler={handleDelete} />
        </Route>
        </Switch>
      </div>
    </Router>
  )
}


export default App;
