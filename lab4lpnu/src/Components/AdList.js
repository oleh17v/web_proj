import React from "react";
import {Link} from "react-router-dom";
import  '../Pages/acc-reg.css'

const AdList = ({ads}) => {
    return (
        <div>
            {ads.map(e => {
                return (
                        <div key={e.id}>
                            <p>{e.text}</p>
                            <p >{e.location_name}</p>
                            <p >{e.user_name}</p>
                            <p >{e.category_name}</p>
                            <p >{e.status}</p>
                            <p >{e.DataOfPublishing}</p>
                            <Link className="signUp_button" key={e.id} to={`/ads/${e.id}`}>View ad</Link>
                        </div>
                );
            })}
        </div>
    );
};


export default AdList;