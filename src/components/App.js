import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import './App.css';
import Header from './Header';
import AddContacts from './AddContacts';
import ContactList from "./ContactList";
import ContactDetail from './ContactDetail';

function App() {
  const LOCAL_STORAGE_KEY = 'contacts';

  const [contacts, setContacts] = useState(() => {
    const retrievedContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    return retrievedContacts || [];
  });

  const addContactHandler = (contact) => {
    const newContact = { id: uuid(), ...contact };
    setContacts([...contacts, newContact]); // Spread the newContact, not the contacts array
  }

  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList); 
  }

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />

        <div className="max-w-3xl mx-auto p-4">
        <Routes> 
        <Route 
          path="/" 
          element={(
            <ContactList
              contacts={contacts} 
              getContactId={removeContactHandler}
            />
          )}
        />
        <Route
          path="/add"
          element={(<AddContacts addContactHandler={addContactHandler} />)}
        />
        <Route 
        path="/contact/:id" 
        element={<ContactDetail />} 
        />
      </Routes>
          
                
         {/*} <AddContacts addContactHandler={addContactHandler} />
  <ContactList contacts={contacts} getContactId = {removeContactHandler}/>*/}
        </div>

      </div>
    </Router>
  );
}

export default App;
