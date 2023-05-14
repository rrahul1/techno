import React from 'react';
import { Link } from 'react-router-dom';
import "./style.css";



function Users({data}) {
  
  return (
    <div className="user-detail">
        <div className="img">
            <img src={data?.avatar} alt="dp" />
        </div>
      <div className="detail">
        <h2>Name: <span> {data.first_name} {data.last_name}</span></h2>
        <h3>Gender: <span>{data.gender}</span></h3>
        <h3>Email: <span>{data.email}</span></h3>
        <h3>Availability: <span>{data.available === true ? "Yes" : "No"}</span></h3>
        <Link to={`user-data/${data.id}`}>View</Link>
      </div>
    </div>
  )
}

export default Users;