import React, { useState, Component } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';

function EditContact(props) {

    const location = useLocation();
    const { id, name, email } = location.state.contactinfo;

    const navigate = useNavigate();
    const [contact, setContact] = useState({ id: id, name: name, email: email });
    const updateContact = (e) => {
        e.preventDefault();
        if (contact.name === "" && contact.email === "") {
            alert("Please add name and email");
            return;
        }
        console.log("Contact detail added");
        props.updateContactHandler(contact);
        setContact({ name: "", email: "" });
        navigate('/');
        //console.log(this.props);
        //this.props.history.push("/");
    };
    const inputsHandler = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value })
    }

    return (
        <div className='ui main'>
            <h2>Update Contact</h2>
            <form class='ui form' widths='equal' onSubmit={updateContact}>
                <div className='field'>
                    <label>Name</label>
                    <input type='text' name='name' placeholder='Name' value={contact.name} onChange={inputsHandler}></input>
                </div>
                <div className='field'>
                    <label>Email</label>
                    <input type='text' name='email' placeholder='Email' value={contact.email} onChange={inputsHandler}></input>
                </div>
                <button className='ui button blue'>Update</button>
                <Link to="/"> <button className='ui button blue'>Back to Contact List</button></Link>
            </form>
        </div>
    )

}

export default EditContact