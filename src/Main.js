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
    Button
} from "reactstrap";

import Practice from './page/Practice'
import Leaderboard from "./page/Leaderboard";
import Learning from "./page/Learning";
import Submits from "./page/Submits";
import Profile from "./page/Profile";

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
                                    <NavLink className="nav-link btn-primary" to="/leaderboard"
                                             tag={RRNavLink}>Leaderboard</NavLink>
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
                        </Navbar>
                    </div>
                    <Container>
                        <br/>
                        <br/>
                        <Route exact path="/home" component={Home}/>
                        <Route path="/practice" component={Practice}/>
                        <Route path="/leaderboard" component={Leaderboard}/>
                        <Route path="/learning" component={Learning}/>
                        <Route path="/submits" component={Submits}/>
                    </Container>
                </div>
            </HashRouter>
        );
    }
}

export default Main;
