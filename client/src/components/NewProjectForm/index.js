import React, { Component } from 'react';
import "./style.css";
import { Col, Row } from "../Grid";
import API from "../../utils/API-project";
import APIBudget from "../../utils/API-budget"
import APITask from "../../utils/API-task";
import Arrow from './arrow.png';
import Calendar from 'react-calendar';

class NewProjectForm extends Component {

    state = {
        title: "",
        savedTitle: false,
        budget: "",
        budgetMarketing: "",
        budgetHR: "",
        budgetSecurity: "",
        budgetDesign: "",
        budgetFinance: "",
        budgetEngineering: "",
        budgetSales: "",
        projectID: 0,
        task: "",
        date: new Date(),
        assignee1: "",
        assignee2: "",
        assignee3: "",
        assignee4: "",
        deadline: "",
    }

    onChange = date =>
    {
     this.setState({ date })
    }

    handleInputChange = event => {

        const { name, value } = event.target
        this.setState({
            [name]: value
        });
    }

    saveProject = event => {
        event.preventDefault();
        const body = {
            name: this.state.title
        }
        this.setState({
            savedTitle: true
        });

        let budgetForm = document.getElementById("newBudgetFormDiv")
        budgetForm.classList.toggle("hide")

        let projectTitle = document.getElementById("body")
        projectTitle.classList.toggle("animate")


        API.createProject(body)
            .then(res => {
                console.log(res.data.id)
                this.setState({
                    projectID: res.data.id
                });
                console.log("--------------" + this.state.projectID)
            })
            .catch(err => console.log(err.message));


    }

    addTask = event => {
        event.preventDefault();
        const newTask = this.state.tasks;
        newTask.push({ name: "", assignees: [""] });
        this.setState({
            tasks: newTask
        });
    }

    saveBudgetTask = event => {
        event.preventDefault();
        const body = {
            total: this.state.budget,
            Marketing: this.state.budgetMarketing,
            HR: this.state.budgetHR,
            Design: this.state.budgetDesign,
            Engineering: this.state.budgetEngineering,
            Sales: this.state.budgetSales,
            Finance: this.state.budgetFinance,
            Security: this.state.budgetSecurity,
            ProjectId: this.state.projectID
        }
        APIBudget.createBudget(body)
            .then(res => {
                console.log("lets hope this works!!!!!!!!", res);
            })
            .catch(err => console.log(err.message));

        let info = {
            task: this.state.task,
            deadline: this.state.date,
            assignee1: this.state.assignee1,
            assignee2: this.state.assignee2,
            assignee3: this.state.assignee3,
            assignee4: this.state.assignee4,
            ProjectId: this.state.projectID
        }

        APITask.createTask(info)
            .then(res => {
                console.log("this is the result of task created",res)
            })
            .catch(err => console.log(err.message));

        this.dashboard(this.props)

    }

    dashboard = (props) => {
        (props.edit())
    }

    formRender() {
        if (!this.state.showBudget) {
            return (
                <div id="body">
                    <form id="styling">
                        <input required
                            id="inputName"
                            type="text"
                            value={this.state.title}
                            placeholder="Project Name"
                            onChange={this.handleInputChange}
                            name="title"
                        />
                    </form>
                    <img src={Arrow} id="submitNewProject" onClick={this.saveProject} className="Next-logo" alt="logo" />


                    <div className='newBudgetFormDiv' id="newBudgetFormDiv">

                        <Row>
                            <Col className='xl6 newProjectHalfCol'>
                                <p><b>Department Budgets</b></p>
                                <Row>
                                    <Col className='xl12'>
                                        <input
                                            type="text"
                                            value={this.state.budgetDesign}
                                            placeholder="Design"
                                            onChange={this.handleInputChange}
                                            className='budget'
                                            name="budgetDesign"
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className='xl12'>
                                        <input
                                            type="text"
                                            value={this.state.budgetEngineering}
                                            placeholder="Engineering"
                                            onChange={this.handleInputChange}
                                            className='budget'
                                            name="budgetEngineering"
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className='xl12'>
                                        <input
                                            type="text"
                                            value={this.state.budgetFinance}
                                            placeholder="Finance"
                                            onChange={this.handleInputChange}
                                            className='budget'
                                            name="budgetFinance"
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className='xl12'>
                                        <input
                                            type="text"
                                            value={this.state.budgetHR}
                                            placeholder="HR"
                                            onChange={this.handleInputChange}
                                            className='budget'
                                            name="budgetHR"
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className='xl12'>
                                        <input
                                            type="text"
                                            value={this.state.budgetMarketing}
                                            placeholder="Marketing"
                                            onChange={this.handleInputChange}
                                            className='budget'
                                            name="budgetMarketing"
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className='xl12'>
                                        <input
                                            type="text"
                                            value={this.state.budgetSales}
                                            placeholder="Sales"
                                            onChange={this.handleInputChange}
                                            className='budget'
                                            name="budgetSales"
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className='xl12'>
                                        <input
                                            type="text"
                                            value={this.state.budgetSecurity}
                                            placeholder="Security"
                                            onChange={this.handleInputChange}
                                            className='budget'
                                            name="budgetSecurity"
                                        />
                                    </Col>
                                </Row>
                            </Col>

                            <Col className='newProjectHalfCol xl6'>
                                <p><b>Add an Initial Task</b></p>
                                <Row>
                                    <Col className='xl12'>
                                        <input required
                                            type="text"
                                            value={this.state.task}
                                            placeholder="Task"
                                            onChange={this.handleInputChange}
                                            name="task"
                                            className='task'
                                        />
                                        <h3> Deadline </h3>
                                        <Calendar
                                        className="calendar"
                                        onChange={this.onChange}
                                        date={this.state.date}
                                    />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className='xl12'>
                                        <input required
                                            type="text"
                                            value={this.state.assignee1}
                                            placeholder="Assignee #1 (Required)"
                                            onChange={this.handleInputChange}
                                            name="assignee1"
                                            className='task'
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className='xl12'>
                                        <input
                                            type="text"
                                            value={this.state.assignee2}
                                            placeholder="Assignee #2 (Optional)"
                                            onChange={this.handleInputChange}
                                            name="assignee2"
                                            className='task'
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className='xl12'>
                                        <input
                                            type="text"
                                            value={this.state.assignee3}
                                            placeholder="Assignee #3 (Optional)"
                                            onChange={this.handleInputChange}
                                            name="assignee3"
                                            className='task'
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className='xl12'>
                                        <input
                                            type="text"
                                            value={this.state.assignee4}
                                            placeholder="Assignee #4 (Optional)"
                                            onChange={this.handleInputChange}
                                            name="assignee4"
                                            className='task'
                                        />
                                    </Col>
                                </Row>
                                <button id="submit" onClick={this.saveBudgetTask} >Submit Project</button>
                            </Col>
                        </Row>

                    </div>
                </div>
            );
        };
    };

    render() {
        return (
            <div>
                {this.formRender()}
            </div>
        )
    }
}

export default NewProjectForm