import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import userDetail from "../userData.json";

function SingleUser() {
    
    const {id} = useParams();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if(id){
            setUserData ( userDetail.filter((item) => {
                return item.id.toString() === id.toString()
           }))
          
        }
    },[id]);



    return (
        <div className="single-user">
           {
            userData && userData.map((user) => (
                <div className="userInfo" key={user.id}>
                    Details of: <h2>{user.first_name} {user.last_name}</h2>
                    <div>
                        <img src={user.avatar} alt="dp" />
                    </div>
                    <div className="info">
                        <h2>Name: <span>{user.first_name} {user.last_name}</span></h2>
                        <h4>Gender: span{user.gender}</h4>
                        <h4>Email: <span>{user.email}</span></h4>
                        <h4>Domain: <span>{user.domain}</span></h4>
                        <h4>Availability: <span>{user.available === true ? "Yes" : "No"}</span></h4>
                    </div>
                </div>
            ))
           }
        </div>
    )
}

export default SingleUser