import React from "react";
import {HashRouter, Route} from "react-router-dom";
import MathPageTopics from "./MathPageTopics";
import MathTopic from "./MathTopic";
import {Container} from "reactstrap";


class MathCategory extends React.Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <Container>
                        <Route exact path="/math/:mathCategory" component={MathPageTopics}/>
                        <Route path="/math/:mathCategory/:mathTopicID" component={MathTopic}/>
                    </Container>
                </div>
            </HashRouter>
        );
    }
}

export default MathCategory;