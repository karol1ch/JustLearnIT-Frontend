import React from 'react';
import LearningCategory from "./LearningCategory";
import LearningPage from "./LearningPage";

import {
    Container,
} from "reactstrap"

import {
    Route,
    HashRouter
} from "react-router-dom";


class Learning extends React.Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <Container>
                        <Route exact path="/learning" component={LearningPage}/>
                        <Route path="/learning/:category" component={LearningCategory}/>
                    </Container>
                </div>
            </HashRouter>
        );
    }
}

export default Learning;