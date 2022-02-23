import React from "react";
import "./style.css";

const LogoutButton = (props) => (
    <button className='logout' onClick={props.logout}>LOGOUT</button> 
);

export default LogoutButton;