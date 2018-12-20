import React from "react";
import {Navbar, NavbarBrand, NavItem, NavLink} from "reactstrap";
import {NavLink as RRNavLink} from "react-router-dom";

class MainPageSwitch extends React.Component {
    render() {
        return (
            <div key="main_div_1">
                <div key="main_div_2">
                    <Navbar className="navbar navbar-expand-sm bg-primary navbar-dark">
                        <NavbarBrand tag={RRNavLink} to="/home">JustLearnIT</NavbarBrand>
                        <Navbar className="nav">
                            <NavItem>
                                <NavLink className="nav-link btn-primary" to="/practice"
                                         tag={RRNavLink}>Practice</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link btn-primary" to="/math"
                                         tag={RRNavLink}>Math</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link btn-primary" to="/learning"
                                         tag={RRNavLink}>Learning</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link btn-primary" to="/submits"
                                         tag={RRNavLink}>Submits</NavLink>
                            </NavItem>
                        </Navbar>
                        <Navbar className="nav navbar-nav ml-auto">
                            <NavItem>
                                <NavLink className="nav-link btn-primary" to="/sendProblem"
                                         tag={RRNavLink}>Send your problem!</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link btn-primary" to="/contact"
                                         tag={RRNavLink}>Contact</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link btn-primary" to="/about"
                                         tag={RRNavLink}>About</NavLink>
                            </NavItem>
                        </Navbar>
                    </Navbar>
                </div>
            </div>
        );
    }
}

export default MainPageSwitch;