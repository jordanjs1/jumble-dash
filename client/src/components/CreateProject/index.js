import React from 'react';
import "./style.css"

function CreateProject(props) {

    return (
        <button className="createBtn active" onClick={() => props.edit()} style={{width:100}} >+</button>
    );

}
export default CreateProject