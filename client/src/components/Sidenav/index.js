import React from "react";
import "./style.css";

function Sidenav(props) {
    return (
        <div>
            <nav className="navBar">
                {props.children}
            </nav>
        </div>
    )
}

export default Sidenav;