import React, { Component } from "react";
import ProjectButton from '../ProjectButton';
import CreateProject from '../CreateProject';
import LogoutButton from '../LogoutButton';
import { Col, Row } from "../Grid";
import Menu from "./menu.png";
import Logo from './whiteLogo.png';
import "./topnav.css";

export default class Navbar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            responsiveMenu: false

        }
    }

    toggle = target => {
        this.setState({ [target]: !this.state[target] });
    }

    render() {
        return (
            <Col className="navbar xl0 l12" >
                <Row>
                    <Col className="l3 m4">
                        <img src={Logo} className="Top-logo" alt="logo" />
                    </Col>
                    <Col className="l6 m5"></Col>
                    <Col className="center-y l2 m2">
                        <LogoutButton></LogoutButton>
                    </Col>
                    <Col className="l1 m1">
                        <img src={Menu} className="menu-icon" alt="menu" onClick={() => this.toggle("responsiveMenu")} />
                    </Col>
                </Row>
                <div id="navbar-menu" style={{ display: `${this.state.responsiveMenu ? "block" : "none"}` }}>
                    <Row>
                        {this.props.projects.map(project => (
                            <Col key={project.id * 1000} className="l3">
                                <ProjectButton click={this.props.loadProject} id={project.id} name={project.name} key={project.id} delete={this.props.deleteProject} />
                            </Col>
                        ))}
                        <Col className="l12">
                            <CreateProject></CreateProject>
                        </Col>
                    </Row>
                </div>
            </Col>
        )
    }
}