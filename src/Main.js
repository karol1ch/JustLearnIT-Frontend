import React from 'react';
import Home from './page/Home'
import {
    Route,
    HashRouter
} from "react-router-dom";

import {Container,} from "reactstrap";

import Practice from './page/Practice'
import Math from "./page/Math";
import Learning from "./page/Learning";
import Submits from "./page/Submits";
import SendProblem from "./page/SendProblem";
import ProblemSubmitted from "./page/ProblemSubmitted";
import VisitPage from "./page/VisitPage";
import Contact from "./page/Contact";
import About from "./page/About";
import MainPageSwitch from "./page/MainPageSwitch";

class Main extends React.Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <Route exact path="/" component={VisitPage}/>
                    <Route path="/home" component={MainPageSwitch}/>
                    <Route path="/practice" component={MainPageSwitch}/>
                    <Route path="/math" component={MainPageSwitch}/>
                    <Route path="/learning" component={MainPageSwitch}/>
                    <Route path="/submits" component={MainPageSwitch}/>
                    <Route path="/contact" component={MainPageSwitch}/>
                    <Route path="/about" component={MainPageSwitch}/>
                    <Route path="/sendProblem" component={MainPageSwitch}/>
                    <Container>
                        <br/>
                        <br/>
                        <Route path="/home" component={Home}/>
                        <Route path="/practice" component={Practice}/>
                        <Route path="/math" component={Math}/>
                        <Route path="/learning" component={Learning}/>
                        <Route path="/submits" component={Submits}/>
                        <Route path="/contact" component={Contact}/>
                        <Route path="/about" component={About}/>
                        <Route exact path="/sendProblem" component={SendProblem}/>
                        <Route path="/sendProblem/submitted" component={ProblemSubmitted}/>
                    </Container>
                </div>
            </HashRouter>
        );
    }
}

export default Main;
