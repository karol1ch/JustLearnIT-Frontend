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
import Maths from "./page/Maths";
import Learning from "./page/Learning";
import Submits from "./page/Submits";
import SendProblem from "./page/SendProblem";
import ProblemSubmitted from "./page/ProblemSubmitted";

class Main extends React.Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <div>
                        <Navbar className="navbar navbar-expand-sm bg-primary navbar-dark">
                            <NavbarBrand tag={RRNavLink} exact to="/home">JustLearnIT</NavbarBrand>
                            <Navbar className="nav">
                                <NavItem>
                                    <NavLink className="nav-link btn-primary" to="/practice"
                                             tag={RRNavLink}>Practice</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link btn-primary" to="/maths"
                                             tag={RRNavLink}>Maths</NavLink>
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
                            </Navbar>
                        </Navbar>
                    </div>
                    <Container>
                        <br/>
                        <br/>
                        <Route exact path="/home" component={Home}/>
                        <Route path="/practice" component={Practice}/>
                        <Route path="/maths" component={Maths}/>
                        <Route path="/learning" component={Learning}/>
                        <Route path="/submits" component={Submits}/>
                        <Route exact path="/sendProblem" component={SendProblem}/>
                        <Route path="/sendProblem/submitted" component={ProblemSubmitted}/>
                    </Container>
                </div>
            </HashRouter>
        );
    }
}

export default Main;
