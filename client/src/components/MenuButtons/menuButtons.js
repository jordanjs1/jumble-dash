import React from 'react';
import "./style.css";

function MenuButton(props) {

    return (
        <button onClick={() => props.click(props.id)} id={props.id} name={props.name} className="menuBtn">{props.name}</button>
    );

} 
export default MenuButton