import React from 'react'
import user from '../images/user.png';
import { Link, useLocation } from 'react-router-dom';

function ContactDetail(props) {

    const location = useLocation();
    const { name, email } = location.state.contactinfo;
    return (
        <div className='main'>
            <div className='ui card centered'>
                <div className='image'>
                    <img src={user} alt='user'></img>
                </div>
                <div className='content'>
                    <div className='header'>{name}</div>
                    <div className='description'>{email}</div>
                </div>
                <div className='content extra'>
                    <Link to="/"> <button className='ui button blue center'>Back to Contact List</button></Link>
                </div>
            </div>

        </div>
    )
}

export default ContactDetail