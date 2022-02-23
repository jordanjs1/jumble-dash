import React from 'react';
import "./style.css"

function ProjectButton(props) {

    return (
        <button className="menuBtn" onClick={() => props.click(props.id)} id={props.id} name={props.name} className="sideBtn active"><button id='delete-project' onClick={() => props.delete(props.id)}>x</button>{props.name}</button>
    );

} 
export default ProjectButton