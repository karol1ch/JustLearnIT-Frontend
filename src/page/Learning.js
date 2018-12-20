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
            <HashRouter key={'hr1'}>
                <div key={'div2'}>
                    <Container key={'cont1'}>
                        <Route exact path="/learning" component={LearningPage} key={'learning1'}/>
                        <Route path="/learning/:category" component={LearningCategory} key={'learn_cat1'}/>
                    </Container>
                </div>
            </HashRouter>
        );
    }
}

export default Learning;