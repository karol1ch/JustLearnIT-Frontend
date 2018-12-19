import React from 'react';
import Home from './page/Home'
import {
    Route,
    HashRouter,
    NavLink as RRNavLink
} from "react-router-dom";

import {
    Navbar,
    NavLink,
    NavbarBrand,
    NavItem,
    Container,
} from "reactstrap";

import Practice from './page/Practice'
import Math from "./page/Math";
import Learning from "./page/Learning";
import Submits from "./page/Submits";
import VisitPage from "./page/VisitPage";
import Contact from "./page/Contact";
import About from "./page/About";

class Main extends React.Component {
    render() {
        // console.log = console.info = console.error = function noop(){};
        return (
            <HashRouter>
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
                    <Container>
                        <br/>
                        <br/>
                        <Route exact path="/" component={VisitPage}/>
                        <Route path="/home" component={Home}/>
                        <Route path="/practice" component={Practice}/>
                        <Route path="/math" component={Math}/>
                        <Route path="/learning" component={Learning}/>
                        <Route path="/submits" component={Submits}/>
                        <Route path="/contact" component={Contact}/>
                        <Route path="/about" component={About}/>
                    </Container>
                </div>
            </HashRouter>
        );
    }
}

export default Main;
