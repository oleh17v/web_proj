import React, { useState } from 'react';
import  './acc-reg.css'
import { Link, useNavigate } from 'react-router-dom';
import Header from "../Components/Header";


const AccountRegister = () => {


    const createUser = request_body => {
        return fetch('http://localhost:8089/api/v1/authentication/register', {
            method: "POST",
            body: JSON.stringify(request_body),
            headers: {'Content-Type': 'application/json'}
        });
    }

    const navigation = useNavigate();
    const [error, setError] = useState(null)

    const [data, setData] = useState({
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        repeat_password: '',
        location_idlocation: ''
    })

    const handleChange = e => {
        setError(null);
        setData({...data, [e.target.name]: e.target.value});
    };

    const signUpButtonHandler = async e => {
        e.preventDefault();

        if (data.password !== data.repeat_password) {
            setError("Passwords aren't matching. Try again.");
            return
        }

        setError(null)
        const request_body = {
            username: data.username,
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            password: data.password,
            location_idlocation: data.location_idlocation
        }


        createUser(request_body).then((response) =>
        {
            if (response.status === 200){
            window.localStorage.setItem('loggedUser', JSON.stringify(request_body));
            navigation('/account')
        }else {
                response.text().then(data => {setError(data)})
            }
        }).catch(e =>{console.log(e)})
    }

    return(
        <div className="main">
            <Header/>
            <form className="form" onSubmit={signUpButtonHandler}>

                <h1>Registration</h1>
                <div>
                    <label>
                        <input placeholder="Enter username" name="username" type="text" className="field" value={data.username} onChange={handleChange} required/>
                    </label>
                </div>
                <div>
                    <label>
                        <input placeholder="Enter first name" name="firstname" type="text" className="field" value={data.firstname} onChange={handleChange} required/>
                    </label>
                </div>
                <div>
                    <label>
                        <input placeholder="Enter last name" name="lastname" type="text" className="field" value={data.lastname} onChange={handleChange} required/>
                    </label>
                </div>
                <div>
                    <label>
                        <input placeholder="Enter email" name="email" type="email" className="field" value={data.email} onChange={handleChange} required/>
                    </label>
                </div>
                <div>
                    <label>
                        <input placeholder="Enter password" name="password" type="password" className="field" value={data.password} onChange={handleChange} required/>
                    </label>
                </div>
                <div>
                    <label>
                        <input placeholder="Repeat password" name="repeat_password" value={data.repeat_password} onChange={handleChange} type="password" className="field"
                               required/>
                    </label>
                </div>
                <label>
                    <input placeholder="Input your location" name="location_idlocation" type="number" value={data.location_idlocation}  onChange={handleChange} required/>
                </label>

                <div>
                    <button className="signUpButton">Create account</button>
                </div>

                <p className="error">{error}</p>
            </form>
            <p className="text">Already have an account? - <Link to="/login">Sign in!</Link></p>
        </div>
    )



}


export default AccountRegister;