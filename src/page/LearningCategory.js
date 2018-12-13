import React from "react";
import {HashRouter, Route} from "react-router-dom";
import {Container} from "reactstrap";
import Topic from "./Topic"
import LearningPageTopics from "./LearningPageTopics";

class LearningCategory extends React.Component {

    render() {
        return (
            <HashRouter>
                <div>
                    <Container>
                        <Route exact path="/learning/:category" component={LearningPageTopics}/>
                        <Route path="/learning/:category/:topicID" component={Topic}/>
                    </Container>
                </div>
            </HashRouter>
        );
    }
}

export default LearningCategory;