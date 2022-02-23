import React, { Component } from 'react';
import { Col, Row } from "../Grid";
import Tasks from "../Tasks";
import Budget from "../Budget";
import Problems from "../Problems";
import "./style.css";



class Dashboard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tasksAdded: 0,
            budgetEdited: 0
        }
    }

    handleUpdateTasks = () => {
        this.setState({
            tasksAdded: this.state.tasksAdded + 1
        });
    }

    handleUpdateBudget = event => {
        event.preventDefault();
        this.setState({
            budgetEdited: this.state.budgetEdited + 1
        })
    }

    render() {
        return (
            <div id="dashboard">
                {
                    this.props.projectID !== -1 ?
                        <div>
                            <Row className='xl12' id="projectName">
                                {this.props.projectName}
                            </Row>
                            <Row>
                                <Col className="xl6 l6 m12">
                                    <Budget projectID={this.props.projectID} status={this.props.status} chartSwitch={this.props.chartSwitch} updateBudget={this.handleUpdateBudget} budgetChange={this.state.budgetEdited}/>
                                </Col>

                                <Col className="xl6 l6 m12">
                                    <Tasks projectID={this.props.projectID} updateTasks={this.handleUpdateTasks} />
                                </Col>
                            </Row>
                            <Row>
                                <Col className="xl12">
                                    <Problems projectID={this.props.projectID} tasksAdded={this.state.tasksAdded} />
                                </Col>
                            </Row>
                        </div>
                        : 
                        <Row>
                            <Col id = 'noCurrentProjects' className='xl12'>
                                You currently have no open projects. Hit + on the side-nav to start!
                            </Col>
                        </Row>
                }
            </div>
        );
    }
}

export default Dashboard;