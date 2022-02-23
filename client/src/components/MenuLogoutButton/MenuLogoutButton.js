import React from "react";
import "./style.css";

const MenuLogoutButton = (props) => (
    <button className='menuLogout' onClick={props.logout}>Logout</button> 
);

export default MenuLogoutButton;