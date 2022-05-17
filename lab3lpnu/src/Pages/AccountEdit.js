import React, {useState } from 'react';
import {useNavigate} from "react-router-dom";
import  './acc-edit.css';
import Header from "../Components/Header";

const AccountEdit = () => {
    const currentUser = JSON.parse(localStorage.getItem('loggedUser'));

    const headers = new Headers();
    headers.set('Authorization', 'Basic ' + btoa(currentUser.username + ":" + currentUser.password));
    headers.set('content-type', 'application/json');

    const editUser = request_body => {
        return fetch('http://localhost:8089/api/v1/user/' + currentUser.username, {
            method: "PUT",
            body: JSON.stringify(request_body),
            headers,
        });
    }


    const navigation = useNavigate();
    const [error, setError] = useState('')

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


    const deleteButtonHandler = async e =>{
        e.preventDefault()

        fetch(`http://localhost:8089/api/v1/user/` + currentUser.username, {
            method: 'DELETE',
            headers,
        }).then((response)=> {
            if (response.status === 200) {
                localStorage.removeItem('loggedUser');
                navigation("/login")
        } else {
                response.text().then((data) => {
                    setError(data)
                })
            }
        }).catch(() => {
            console.log(e)
        })



    }

    const editButtonHandler = async e => {
        e.preventDefault()

        const headers = new Headers();
        headers.set('Authorization', 'Basic ' + btoa(currentUser.username + ":" + currentUser.password));
        headers.set('content-type', 'application/json');


        setError(null);
        const request_body = {
            username: data.username,
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            password: data.password,
            location_idlocation: data.location_idlocation
        }

        editUser(request_body).then((response) =>
        {
            if (response.status === 200) {
                currentUser.username = request_body.username;
                currentUser.password = request_body.password;
                window.localStorage.setItem('loggedUser', JSON.stringify(currentUser))
                navigation('/account')
            }
            else
            {
                response.text().then((data)=> {setError(data)})
            }
        }).catch((e)=> {console.log(e)})



    }
    if (!currentUser){
        navigation('/login')
    } else {
        return (<div className="main">
            <Header/>
            <form className="form">
                <h1>Edit account</h1>
                <div>
                    <label>
                        <input placeholder="Enter username" name="username" type="text" className="field"
                               value={data.username} onChange={handleChange}/>
                    </label>
                </div>
                <div>
                    <label>
                        <input placeholder="Enter first name" name="firstname" type="text" className="field"
                               value={data.firstname} onChange={handleChange} required/>
                    </label>
                </div>
                <div>
                    <label>
                        <input placeholder="Enter last name" name="lastname" type="text" className="field"
                               value={data.lastname} onChange={handleChange} required/>
                    </label>
                </div>
                <div>
                    <label>
                        <input placeholder="Enter email" name="email" type="email" className="field" value={data.email}
                               onChange={handleChange}/>
                    </label>
                </div>
                <div>
                    <label>
                        <input placeholder="Enter password" name="password" value={data.password}
                               onChange={handleChange} type="password" className="field"/>
                    </label>
                </div>
                <div>
                    <label>
                        <input placeholder="Repeat password" name="repeat_password" value={data.repeat_password}
                               onChange={handleChange} type="password" className="field"/>
                    </label>
                </div>
                <label>
                    <input placeholder="Input your location" name="location_idlocation" type="number"
                           value={data.location_idlocation} onChange={handleChange} required/>
                </label>
                <div>
                    <button className="edit_button" onClick={editButtonHandler}>Save</button>
                </div>
                <div>
                    <button className="delete_button" onClick={deleteButtonHandler}>Delete</button>
                </div>
                <p className="error">{error}</p>
            </form>

        </div>)


    }
}



export default AccountEdit;




















