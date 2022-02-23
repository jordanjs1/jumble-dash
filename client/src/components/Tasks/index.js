import React, { Component } from 'react';
import TaskAPI from '../../utils/API-task';
import { Col, Row } from "../Grid";
import Task from '../Task';
import Chart3 from "../chart3";
import Complete from "./complete.png"
import "./style.css"

class Tasks extends Component {
    constructor(props) {
        super(props)
        this.chart3Ref = React.createRef();
        this.state = {
            newTask: "",
            deadline: "",
            newAssignee1: "",
            newAssignee2: "",
            newAssignee3: "",
            newAssignee4: "",
            tasks: [],
            total: 0,
            tasksIncomplete: 0,
            tasksComplete: 0,
            counter: 0
        }
    }

    componentDidMount() {
        TaskAPI.getIncompleteTasks(this.props.projectID).then(res => {

            this.setState({
                tasks: res.data,
                tasksIncomplete: res.data.length
            });
        })
            .catch(err => console.log(err.message));

        TaskAPI.getTasks(this.props.projectID).then(res => {

            this.setState({
                tasksTotal: res.data.length,
                tasksComplete: res.data.length - this.state.tasksIncomplete,
                counter: this.state.counter + 1
            })
        })
            .catch(err => console.log(err.message));
    }

    componentDidUpdate(prevProps) {
        if (this.props.projectID !== prevProps.projectID) {
            TaskAPI.getIncompleteTasks(this.props.projectID).then(res => {
                this.setState({
                    tasks: res.data
                })

                TaskAPI.getTasks(this.props.projectID).then(res => {
                    let complete = res.data.length - this.state.tasks.length
                    let incomplete = this.state.tasks.length

                    this.setState({
                        total: res.data.length,
                        tasksIncomplete: incomplete,
                        tasksComplete: complete,
                        counter: this.state.counter + 1
                    })
                })
                    .catch(err => console.log(err.message));
            })
                .catch(err => console.log(err.message));
        }
    }

    handleInputChange = event => {

        const { name, value } = event.target;

        this.setState({
            [name]: value
        })
    }

    addTask = event => {
        event.preventDefault();

        const task = {
            task: this.state.newTask,
            deadline: this.state.deadline,
            assignee1: this.state.newAssignee1,
            assignee2: this.state.newAssignee2,
            assignee3: this.state.newAssignee3,
            assignee4: this.state.newAssignee4,
            ProjectId: this.props.projectID
        };

        TaskAPI.createTask(task).then(res => {
            let tasksList = this.state.tasks;
            console.log("", res)
            tasksList.push(res.data);
            this.setState({
                tasks: tasksList,
                newTask: "",
                deadline: "",
                newAssignee1: "",
                newAssignee2: "",
                newAssignee3: "",
                newAssignee4: "",
                tasksIncomplete: this.state.tasksIncomplete + 1,
                counter: this.state.counter + 1
            });
            this.props.updateTasks();
        })
            .catch(err => console.log(err.message));

    }

    completeTask = id => {

        const com = {
            complete: true
        }

        TaskAPI.updateTask(id, com).then(res => {
            let tasksList = this.state.tasks;

            for (let i = 0; i < tasksList.length; i++) {
                if (tasksList[i].id === id) {
                    tasksList.splice(i, 1);
                }
            }
            let complete = this.state.tasksComplete;
            this.setState({
                tasks: tasksList,
                tasksIncomplete: this.state.tasks.length,
                tasksComplete: complete + 1,
                counter: this.state.counter + 1

            });
            this.props.updateTasks();
        })
    }

    render() {
        return (
            <div>
                <Chart3 counter={this.state.counter} incomplete={this.state.tasksIncomplete}
                    complete={this.state.tasksComplete} />
                <Row id='makeNewTasks'>
                    <Col className="xl12">
                        <h1 id="nameStyling">Tasks</h1>
                        <hr width="80%" />
                    </Col>
                </Row>
                <Row id='taskList'>
                    {this.state.tasks.map((task, i) => (
                        <Col key={i} className='xl3'>
                            <div key={task.id}>
                                <Task task={task.task} deadline={task.deadline.slice(5, 10)} assignee1={task.assignee1}
                                    assignee2={task.assignee2} assignee3={task.assignee3} assignee4={task.assignee4}></Task>
                                <button id='taskComplete' key={i} onClick={(event) => { this.completeTask(task.id); this.props.updateTasks(event) }}><img id='completeImg' src={Complete} /></button>
                            </div>
                        </Col>
                    ))}
                </Row>
                <hr width="80%" />
                <Row>
                    <Col className="xl12">
                        <div>
                            <form id="moveRight" >
                                <p><b>Make a New Task</b></p>
                                <input required
                                    className="formFix"
                                    id="addTask"
                                    type="text"
                                    value={this.state.newTask}
                                    placeholder="Task Name"
                                    onChange={this.handleInputChange}
                                    name="newTask"
                                />
                                <input required
                                    className="formFix"
                                    type="text"
                                    value={this.state.deadline}
                                    placeholder="Deadline: MM-DD"
                                    onChange={this.handleInputChange}
                                    name="deadline"
                                />
                                <input className="formFix"
                                    type="text"
                                    value={this.state.newAssignee1}
                                    placeholder="Assignee #1"
                                    onChange={this.handleInputChange}
                                    name="newAssignee1"
                                />
                                <input className="formFix"
                                    type="text"
                                    value={this.state.newAssignee2}
                                    placeholder="Assignee #2"
                                    onChange={this.handleInputChange}
                                    name="newAssignee2"
                                />
                                <input className="formFix"
                                    type="text"
                                    value={this.state.newAssignee3}
                                    placeholder="Assignee #3"
                                    onChange={this.handleInputChange}
                                    name="newAssignee3"
                                />
                                <input className="formFix"
                                    type="text"
                                    value={this.state.newAssignee4}
                                    placeholder="Assignee #4"
                                    onChange={this.handleInputChange}
                                    name="newAssignee4"
                                />
                                <br></br>
                                <button id="buttnStyling" onClick={this.addTask}> Submit </button>
                            </form>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Tasks;