import React from 'react';
import "./style.css";

function MenuCreateProject(props) {

    return (
        <button className="MenuNewProject" onClick={() => props.edit()} style={{width:100}} >+</button>
    );

}
export default MenuCreateProject