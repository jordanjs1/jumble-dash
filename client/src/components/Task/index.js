import React from "react";
import { Col, Row } from "../Grid";
import "./style.css"

function Task(props) {
    return (
        <div id='newTaskList'>
            <p id='newTask'>{props.task}</p>
            <p> Deadline {props.deadline} </p>
            <p id='assignees'>Assigned to: </p>
            <div className = 'assignees'>{props.assignee1}</div>
            <div className = 'assignees'>{props.assignee2}</div>
            <div className = 'assignees'>{props.assignee3}</div>
            <div className = 'assignees'>{props.assignee4}</div>
        </div>
      
    );
}

export default Task;

