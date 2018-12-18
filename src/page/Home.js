import React from "react";
import {HashRouter, Route} from "react-router-dom";
import {Container} from "reactstrap";
import HomePage from "./HomePage";
import Announcement1 from "./Announcement1";

class Home extends React.Component {

    render() {
        return (
            <HashRouter>
                <div>
                    <Container>
                        <Route exact path="/home" component={HomePage}/>
                        <Route path="/home/:name" component={Announcement1}/>
                    </Container>
                </div>
            </HashRouter>
        );
    }
}

export default Home;