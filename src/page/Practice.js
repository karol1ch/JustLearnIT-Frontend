import React from 'react';
import {Container} from "reactstrap";
import {HashRouter, Route} from "react-router-dom";
import PracticePage from "./PracticePage";
import PracticeCategory from "./PracticeCategory";

class Practice extends React.Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <Container>
                        <Route exact path="/practice" component={PracticePage}/>
                        <Route path="/practice/:category" component={PracticeCategory}/>
                    </Container>
                </div>
            </HashRouter>
        );
    }
}

export default Practice;