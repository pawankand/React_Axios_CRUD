import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import Header from './Header';
import ContactList from './ContactList';
import AddContact from './AddContact';
import { BrowserRouter, Switch, Route, Routes } from 'react-router-dom';
import ContactDetail from './ContactDetail';
import api from "../api/contacts";

function ContactManager() {

    const LOCAL_STORAGE_KEY = "contacts";
    const [contacts, setContacts] = useState(
        JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ?? []
    );

    //---Retrieve contacts
    const retrieveContacts = async () => {
        const response = await api.get("/contacts");
        return response;
    }

    const addContactHandler = (contact) => {
        console.log(contact);
        setContacts([...contacts, { id: uuid(), ...contact }]);
        console.log("test");
    }

    const removeContactHandler = (id) => {
        const updatedContactList = contacts.filter((contact) => {
            return contact.id !== id;
        })
        setContacts(updatedContactList);
    }

    useEffect(() => {
        //localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
    }, [contacts]);

    useEffect(() => {
        // const retrieveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        // if (retrieveContacts) {
        //     setContacts(retrieveContacts);
        // }
        const getAllContacts = async () => {
            const allContacts = await retrieveContacts();
            if (allContacts && allContacts.data) setContacts(allContacts.data);
        };
        getAllContacts();
    }, [])

    return (
        <div className='ui container'>
            <BrowserRouter>
                <Header></Header>
                <Routes>
                    <Route path="/add" element={<AddContact addContactHandler={addContactHandler} />}></Route>
                    <Route path="/" element={<ContactList contacts={contacts} getContactId={removeContactHandler} />}></Route>
                    <Route path="/contact/:id" element={<ContactDetail />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default ContactManager