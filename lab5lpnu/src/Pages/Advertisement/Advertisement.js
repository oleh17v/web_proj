import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import Header from "../../Components/Header";
import  '../acc-reg.css'



const Advertisement = () => {

    const [adData] = useState('')

    useEffect(() => {
        const headers = new Headers();
        //headers.set('Authorization', 'Basic ' + btoa(currentUser.username + ":" + currentUser.password));
        headers.set('Authorization', `Basic ${btoa('alex123:12345')}`);
        headers.set('content-type', 'application/json');

        fetch('http://localhost:8089/api/v1/advertisement/1', {
            method: 'GET',
            headers
        })
            .then((response) => {
                if (response.status === 200){
                    return response.json()
                }
            })

    }, [])



    return(
        <div className="maim">
            <Header/>
                <form className="form">
                <h2>Ad data</h2>
                <p >Description: {adData.text}</p>
                <p >location: {adData.location_name}</p>
                <p >author name: {adData.idUser}</p>
                <p >Category: {adData.cat_name}</p>
                <p >Region status: {adData.status}</p>
                <p >Publishing date: {adData.DataOfPublishing}</p>
                <Link className="signUp_button" key={adData.id} to={`/edit_ad/${adData.id}`}>Edit ad</Link>
                </form>
        </div>
    )
}

export default Advertisement;