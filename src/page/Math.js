import React from 'react';
import {HashRouter, Route} from "react-router-dom";

import MathPage from "./MathPage";
import MathCategory from "./MathCategory";
import {Container} from "reactstrap";


class Math extends React.Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <Container>
                        <Route exact path="/math" component={MathPage}/>
                        <Route path="/math/:mathCategory" component={MathCategory}/>
                    </Container>
                </div>
            </HashRouter>
        );
    }
}

export default Math;