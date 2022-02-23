import React, { Component } from 'react';
import Actions from "../../../utils/API";
import Dashboard from '../../../components/Dashboard';
import { Col, Row } from "../../../components/Grid";
import CreateProject from '../../../components/CreateProject';
import ProjectButton from '../../../components/ProjectButton';
import NewProjectForm from '../../../components/NewProjectForm';
import ProjectAPI from '../../../utils/API-project';
import LogoutButton from '../../../components/LogoutButton';
import MenuLogoutButton from '../../../components/MenuLogoutButton';
import MenuButton from '../../../components/MenuButtons/menuButtons';
import MenuCreateProject from '../../../components/MenuCreateProject';
import Navbar from '../../../components/Navbar';
import "./Profile.css";
import Logo from './whiteLogo.png';

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userAccount: false,
            edit: false,
            selectedProject: -1,
            name: "",
            projects: [],
            loggedIn: true,
            showDash: false,
            projectName: ""
        }
    }

    animation() {
        let left = document.getElementById("menu-left-col")
        left.classList.toggle("animation")
        setTimeout(this.handleRightAnimation(), 200)
    }

    handleRightAnimation() {
        let right = document.getElementById("menu-right-col")
        right.classList.toggle("show")
    }


    componentDidMount() {
        ProjectAPI.findProjects().then((res) => {
            console.log("this is res dot data!!!!!!!!!!!!!!!", res.data)
            this.setState({ projects: res.data })
            console.log(this.state.loggedIn)

            console.log("projects", this.state.projects)
            console.log("length", this.state.projects.length)
        });

        requestAnimationFrame(() => {
            requestAnimationFrame(() => { this.animation() })
        });
    }

    handlelogout() {
        Actions.handlelogout()
            .then(data => { return data.json() })
            .then(response => {
                this.setState({
                    isLoggedIn: response
                })

                if (!response) {
                    window.location.href = "/"
                }
            })
            .catch(err => console.log("err", err))
    }

    loadProject = id => {
        console.log("hello my id is: ", id)

        this.setState({
            selectedProject: id
        });

        ProjectAPI.getProject(id).then((res) => {
            console.log("hello this is the project name", res.data.name)

            this.setState({
                projectName: res.data.name
            });
        });

    }

    handleEdit = () => {

        if (this.state.showDash === false) {
            this.setState({
                showDash: true
            });
        };

        if (this.state.edit === false) {
            this.setState({
                edit: true
            })
        }
        else {
            ProjectAPI.findProjects().then((res) => {
                console.log(res.data)
                this.setState({ projects: res.data, edit: false })
            });
        }
    }

    loadDash = (id) => {

        console.log("hello this is my id too", id)

        this.setState({
            selectedProject: id,
            showDash: true
        });

        let menu = document.getElementById("home-form-grid")
        menu.classList.toggle("hide")

        ProjectAPI.getProject(id).then((res) => {
            console.log("hello this is the project name", res.data.name)

            this.setState({
                projectName: res.data.name
            });
        });
    }

    deleteProject = (id) => {
        console.log("hello??")
        console.log(id)

        ProjectAPI.deleteProject(id).then(res => {
            console.log(res)
        })
            .catch(err => console.log(err.message));
    }

    render() {
        return (
            <div id='profileSection'>
                {!this.state.showDash ?
                    <Row id='home-form-grid'>
                        <Col className='xl6 xl6menu menu-left-col' id='menu-left-col'>

                        </Col>
                        <Col className='xl6 menu-right-col' id='menu-right-col'>
                            <div id='projectMenuContainer'>
                                <p id='menuHeader'>What can we help you manage today?</p>
                                <div id='projectMenuButtons'>
                                    {this.state.projects.map(project => (
                                        <MenuButton click={this.loadDash} id={project.id} name={project.name} key={project.id} />
                                    ))}
                                </div>
                                <MenuCreateProject edit={this.handleEdit} />
                            </div>
                            <MenuLogoutButton logout={this.handlelogout.bind(this)} />
                        </Col>
                    </Row>
                    :
                    <div>
                        <Row>
                            <Navbar projects={this.state.projects} loadProject={this.loadProject} deleteProject={this.deleteProject} />
                        </Row>
                        <Row>
                            <Col className="newProjectCol xl2 l0">
                                <img src={Logo} className="Side-logo" alt="logo" />
                                {this.state.projects.map(project => (
                                    <ProjectButton click={this.loadProject} id={project.id} name={project.name} key={project.id} delete={this.deleteProject} />
                                ))}

                                <CreateProject edit={this.handleEdit} />

                                <LogoutButton logout={this.handlelogout.bind(this)} />
                            </Col>
                            <Col className="xl10 l12">
                                {
                                    !this.state.edit ?
                                        <Dashboard projectName={this.state.projectName} projectID={this.state.selectedProject}>
                                        </Dashboard>
                                        : <NewProjectForm edit={this.handleEdit} projectID={this.state.selectedProject} />
                                }
                            </Col>
                        </Row>
                    </div>
                }
            </div>
        )
    }
}

export default Profile;