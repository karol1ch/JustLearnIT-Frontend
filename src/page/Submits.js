import React from 'react';
import {HashRouter, Route} from "react-router-dom";
import {Container} from "reactstrap";
import SubmitsPage from "./SubmitsPage";
import SubmitsPageSubmitDetails from "./SubmitsPageSubmitDetails";

class Submits extends React.Component {
    render() {
        return (
                <HashRouter>
                    <div>
                        <Container>
                            <Route exact path="/submits" component={SubmitsPage}/>
                            <Route path="/submits/:submit" component={SubmitsPageSubmitDetails}/>
                        </Container>
                    </div>
                </HashRouter>
        );
    }
}

export default Submits;