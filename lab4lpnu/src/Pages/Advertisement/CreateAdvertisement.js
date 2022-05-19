import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import Header from "../../Components/Header";
import  '../acc-reg.css'


const CreateAdvertisement = () => {
    const navigation = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem('loggedUser'));
    const [error, setError] = useState('');
    const [data, setData] = useState({
        text: '',
        DataOfPublishing: '',
        status: '',
        idLocation: '',
        idCategory: '',
        idUser: '',
    })

    const handleChange = e => {
        setError(null);
        setData({...data, [e.target.name]: e.target.value});
    };

    const createAdButtonHandle = async e => {
        e.preventDefault()

        setError(null)
        const request_body = {
            text: data.text,
            DataOfPublishing: data.DataOfPublishing,
            status: data.status,
            idLocation: data.idLocation,
            idCategory: data.idCategory,
            idUser: data.idUser
        }

        const headers = new Headers();
        headers.set('Authorization', 'Basic ' + btoa(currentUser.username + ":" + currentUser.password));
        headers.set('content-type', 'application/json');

        fetch('http://localhost:8089/api/v1/advertisement', {
            method: "POST",
            body: JSON.stringify(request_body),
            headers,
        }).then((response)=> {
            if (response.status === 200){
                navigation('/ads')
            } else
            {
                response.text().then((data) => {
                    setError(data)
                })
            }
        }).catch((e) => {
            console.log(e)
        })



    }

    if (!currentUser){
        navigation("/login")
    } else {
        return(
            <div className="main">
                <Header/>
                <form className="form" onSubmit={createAdButtonHandle}>
                    <h1>Create your ad</h1>
                    <div>
                        <textarea placeholder="Ad's description" className="input" name="text" value={data.text} onChange={handleChange} required/>
                    </div>
                    <div>
                        <input className="input" placeholder="Input location for this ad" name="idLocation" type="number" value={data.idLocation}  onChange={handleChange} required/>
                    </div>
                    <div>
                        <input className="input" placeholder="Input category for this ad" name="idCategory" type="number" value={data.idCategory}  onChange={handleChange} required/>
                    </div>
                    <div>
                        <input className="input" placeholder="Input publish date" name="DataOfPublishing" type="datetime-local" value={data.DataOfPublishing}  onChange={handleChange} required/>
                    </div>
                    <div>
                        <input className="input" placeholder="Input user's id" name="idUser" type="number" value={data.idUser}  onChange={handleChange} required/>
                    </div>
                    <div>
                        <input className="input" placeholder="Input access status" name="status" type="text" value={data.status}  onChange={handleChange} required/>

                    </div>

                    <div>
                        <button className="createAdButton">Create Ad</button>
                    </div>
                    <p className="error">{error}</p>
                </form>

            </div>
        )
    }


}

export default CreateAdvertisement;
