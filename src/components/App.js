import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import api from "./api/contacts";
import './App.css';
import Header from './Header';
import AddContacts from './AddContacts';
import EditContact from './EditContact';
import ContactList from "./ContactList";
import ContactDetail from './ContactDetail';

function App() {
  const LOCAL_STORAGE_KEY = 'contacts';
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  //RetrieveContacts
  const retrieveContacts = async () => {
    try {
        const response = await api.get("/contacts");
        console.log("API Response:", response);
        return response.data;
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
}


  // const [contacts, setContacts] = useState(() => {
  //   const retrievedContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  //   return retrievedContacts || [];
  // });

  const addContactHandler = async (contact) => {
    const request = { id: uuid(), ...contact };
    const response = await api.post("/contacts", request);
    setContacts([...contacts, response.data]); 
  }

  const updateContactHandler = async (contact) => {
    console.log("Contact object:", contact);
    try {
      const response = await api.put(`/contacts/${contact.id}`, contact);
      console.log(response.data);
      const { id, name, email } = response.data;
      setContacts((contacts) =>
        contacts.map((c) => (c.id === id ? { ...response.data } : c))
      );
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error("Contact not found. It may have been deleted.");
      } else {
        console.error("An error occurred:", error.message);
      }
    }
  };
  

  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList); 
  }

const searchHandler = (searchTerm) => {
  setSearchTerm(searchTerm); 
  if(searchTerm !== "") {
    const newContactList = contacts.filter((contact) =>{
      return Object.values(contact)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    });
    setSearchResult(newContactList);
  }else{
    setSearchResult(contacts);
  }
}

  useEffect(() => {
    const getAllContacts = async () =>{
      const allContacts = await retrieveContacts();
      if(allContacts) setContacts(allContacts);
    }
    getAllContacts();
  },[])

  useEffect(() => {
    // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
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
              contacts={searchTerm.length < 1 ? contacts : searchResult} 
              getContactId={removeContactHandler}
              term = { searchTerm }
              searchKeyword = { searchHandler }
            />
          )}
        />
        <Route
          path="/add"
          element={(<AddContacts addContactHandler={addContactHandler} />)}
        />
        <Route
          path="/edit/:id"
          element={(<EditContact updateContactHandler={updateContactHandler} />)}
        />
        <Route 
        path="/contact/:id" 
        element={<ContactDetail />} 
        />
        </Routes>
          
        </div>

      </div>
    </Router>
  );
}

export default App;
