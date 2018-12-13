import React from "react";
import {Card, CardBody, CardFooter, CardHeader, NavLink} from "reactstrap";
import axios from "axios";
import {NavLink as RRNavLink} from "react-router-dom";


const Topic = ({topic, categoryName}) => {
    return (
        <NavLink className="list-group-item list-group-item-action flex-column align-items-start"
                 to={"/learning/".concat(categoryName, "/", topic.id)} tag={RRNavLink}>
            <li className="list-group-item list-group-item-primary">{topic.name}</li>
        </NavLink>
    );
};

const Topics = ({topics, categoryName}) => {
    const topicsNode = topics.map((topic) => {
        return (<Topic topic={topic} categoryName={categoryName}/>);
    });

    return (
        <ul className="list-group">
            {topicsNode}
        </ul>
    );
};

class LearningPageTopics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category: {
                name: "",
                description: ""
            },
            topics: []
        }
    }

    componentDidMount() {
        axios.get("http://localhost:3001/learning/".concat(this.props.match.params.category, "/topics"))
            .then(response => {
                const topics = response.data;
                this.setState({
                    topics: topics
                });
            });

        axios.get("http://localhost:3001/learning/".concat(this.props.match.params.category, "/category"))
            .then(response => {
                const category = response.data;
                this.setState({
                    category: category
                });
            });
    }

    render() {
        return (
            <Card className="border-primary mb-3">
                <CardHeader className="text-center font-weight-bold">
                    {this.state.category.name}
                </CardHeader>
                <CardBody>
                    {this.state.category.description}
                </CardBody>
                <CardFooter>
                    <Topics topics={this.state.topics} categoryName={this.state.category.name}/>
                </CardFooter>
            </Card>
        );
    }
}

export default LearningPageTopics;