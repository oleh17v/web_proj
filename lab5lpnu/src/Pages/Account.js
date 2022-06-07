import React, { useState, useEffect } from 'react';
import  './acc.css';
import { Link } from 'react-router-dom';
import Header from "../Components/Header";

const Account = () => {
    const currentUser = JSON.parse(localStorage.getItem('loggedUser'));
    const [user] = useState(currentUser);





    useEffect(() => {
        const headers = new Headers();
        //headers.set('Authorization', 'Basic ' + btoa(currentUser.username + ":" + currentUser.password));
        headers.set('Authorization', `Basic ${btoa('alex123:12345')}`);
        headers.set('content-type', 'application/json');


        fetch('http://localhost:8089/api/v1/user/alex123', {
            method: 'GET',
            headers,
        }).then((response) => {
            if (response.status === 200) {
                return response.json();
            }
        })


    }, [])

        return(
            <div className="main">
                <Header/>
                <form className="form" data-testid="form">
                    <h1>Your profile</h1>
                    <div>
                        <h2>General Info</h2>
                        <p id="username">username: {user && user.username}</p>
                        <p id="firstname">first name: {user && user.firstname}</p>
                        <p id="lastname">last name: {user && user.lastname}</p>
                    </div>
                    <div>
                        <h2>Contact Info</h2>
                        <p id="email">email: {user && user.email}</p>
                    </div>

                    <Link to={'/edit_account'}><p className="edit_button">Edit account</p></Link>
                </form>
            </div>)
}

export default Account


