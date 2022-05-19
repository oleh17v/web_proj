import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import Header from "../../Components/Header";
import  '../acc-reg.css'
import AdList from "../../Components/AdList";

const ViewAllAdvertisement = () => {
    const currentUser = JSON.parse(localStorage.getItem('loggedUser'));
    const [adData, setAdData] = useState([])

    useEffect(() => {
        const headers = new Headers();
        headers.set('Authorization', 'Basic ' + btoa(currentUser.username + ":" + currentUser.password));
        headers.set('content-type', 'application/json');

        fetch('http://localhost:8089/api/v1/advertisement/username/' + currentUser.username, {
            method: 'GET',
            headers,
        }).then((response) => {
            if (response.status === 200){
                    return response.json()}
        }).then((data) =>{
            console.log(data.advertisements)
            setAdData(data.advertisements)
        })

    }, [])



    return (<div className="main">
            <Header/>
            <form className="form">
                <div>
                    <div>
                        {adData && adData.length &&
                            <><h3>All ads for you </h3>
                                <AdList ads={adData[1].close} />
                                <AdList ads={adData[0].open} /></>
                        }
                    </div>
                </div>
            </form>
        </div>
    );


};




export default ViewAllAdvertisement;


