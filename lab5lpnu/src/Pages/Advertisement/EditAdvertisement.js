import React, {useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import Header from "../../Components/Header";
import  '../acc-reg.css'



const EditAdvertisement = () => {
    const navigation = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem('loggedUser'));
    const {id} = useParams();

    const headers = new Headers();
    headers.set('Authorization', 'Basic ' + btoa(currentUser.username + ":" + currentUser.password));
    headers.set('content-type', 'application/json');

    const editAd = request_body => {
        return fetch('http://localhost:8089/api/v1/advertisement/' + id, {
            method: "PUT",
            body: JSON.stringify(request_body),
            headers,
        })
    }

    const [error, setError] = useState('');

    const [data, setData] = useState({
        text: '',
        DataOfPublishing: '',
        status: '',
        idLocation: '',
        idCategory: '',
        idUser: ''
    })


    const deleteButtonHandler = async e => {
        e.preventDefault()

        fetch(`http://localhost:8089/api/v1/advertisement/` + id, {
            method: 'DELETE',
            headers,
        }).then((response)=> {
            if (response.status === 200) {
                navigation("/ads")
            }
            else if (response.status === 403){
            setError("You have no access to any actions of this ad")

            }
            else
            {
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


        setError(null);
        const request_body = {
            text: data.text,
            DataOfPublishing: data.DataOfPublishing,
            status: data.status,
            idLocation: data.idLocation,
            idCategory: data.idCategory,
            idUser: data.idUser
        }

        editAd(request_body).then((response) => {
            if (response.status === 200) {
                navigation('/ads/:id')
            } else if (response.status === 403){
                setError("You have no access to any actions of this ad")
            }
            else
            {
                response.text().then((data) => {
                    setError(data)
                });
            }
        }).catch((e) => {
            console.log(e)
        })
    }
    const handleChange = e => {
        setError(null);
        setData({...data, [e.target.name]: e.target.value});
    };



    return(
        <div className="main">
            <Header/>
            <form className="form" data-testid="form">
                <h1>Editing</h1>
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
                    <input className="input" placeholder="Input author's user id" name="idUser" type="number" value={data.idUser}  onChange={handleChange} required/>
                </div>
                <div>
                    <input className="input" placeholder="Input access status" name="status" type="text" value={data.status}  onChange={handleChange} required/>

                </div>

                <div>
                    <button className="createAdButton" data-testid="edit_button" onClick={editButtonHandler}>Edit Ad</button>
                    <button className="delete_button" data-testid="delete_button" onClick={deleteButtonHandler}>Delete Ad</button>
                </div>
                <p className="error">{error}</p>
            </form>

        </div>
    )
}





export default EditAdvertisement;