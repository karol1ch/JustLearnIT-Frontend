import React from "react";
import {HashRouter, Route} from "react-router-dom";
import {Container} from "reactstrap";
import Problem from "./Problem";
import PracticePageProblems from "./PracticePageProblems";
import SubmitResult from "./SubmitResult";

class PracticeCategory extends React.Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <Container>
                        <Route exact path="/practice/:category" component={PracticePageProblems}/>
                        <Route exact path="/practice/:category/:problemID" component={Problem}/>
                        <Route exact path="/practice/:category/:problemID/:submitID/result"
                               component={SubmitResult}/>
                    </Container>
                </div>
            </HashRouter>
        );
    }
}

export default PracticeCategory;