import React from "react";
import {HashRouter, Route} from "react-router-dom";
import {Container} from "reactstrap";
import Problem from "./Problem";
import PracticePageProblems from "./PracticePageProblems";

class PracticeCategory extends React.Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <Container>
                        <Route exact path="/practice/:category" component={PracticePageProblems}/>
                        <Route path="/practice/:category/:problemID" component={Problem}/>
                    </Container>
                </div>
            </HashRouter>
        );
    }
}

export default PracticeCategory;