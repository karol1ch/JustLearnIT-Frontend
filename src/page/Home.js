import React from "react";
import {HashRouter, Route} from "react-router-dom";
import {Container} from "reactstrap";
import HomePage from "./HomePage";
import Announcement from "./Announcement";

class Home extends React.Component {

    render() {
        return (
            <HashRouter>
                <div>
                    <Container>
                        <Route exact path="/home" component={HomePage}/>
                        <Route path="/home/:announcementName" component={Announcement}/>
                    </Container>
                </div>
            </HashRouter>
        );
    }
}

export default Home;