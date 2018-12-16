import React from "react";
import {Card, CardBody, CardFooter, CardHeader, NavLink} from "reactstrap";
import axios from "axios";
import {NavLink as RRNavLink} from "react-router-dom";
import InfiniteScroll from "react-infinite-scroller";


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
            topics: [],
            hasMoreTopics: true
        }
    }

    componentDidMount() {
        axios.get("http://localhost:3001/learning/".concat(this.props.match.params.category, "/category"))
            .then(response => {
                const category = response.data;
                this.setState({
                    category: category
                });
            });
    }

    loadFunction(page) {
        axios.get("http://localhost:3001/learning/".concat(this.props.match.params.category, "/category/page=", page))
            .then(result => {
                const additionalTopics = result.data.list;
                const hasMoreTopics = result.data.hasMore;

                console.log(result.data);

                this.setState({
                    topics: this.state.topics.concat(additionalTopics),
                    hasMoreTopics: hasMoreTopics
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
                    <InfiniteScroll
                        pageStart={-1}
                        loadMore={this.loadFunction.bind(this)}
                        hasMore={this.state.hasMoreTopics}
                        loader={
                            <div className="loader">
                                Loading ...
                            </div>
                        }
                    >
                        <Topics topics={this.state.topics} categoryName={this.state.category.name}/>
                    </InfiniteScroll>
                </CardFooter>
            </Card>
        );
    }
}

export default LearningPageTopics;