import React from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroller";
import {NavLink as RRNavLink} from "react-router-dom";
import {Card, CardBody, CardFooter, CardHeader, NavLink} from "reactstrap";



const MathTopic = ({mathTopic, mathCategoryName}) => {
    return (
        <NavLink className="list-group-item list-group-item-action flex-column align-items-start"
                 to={"/math/".concat(mathCategoryName, "/", mathTopic.id)} tag={RRNavLink}>
            <li className="list-group-item list-group-item-primary">{mathTopic.name}</li>
        </NavLink>
    )
};

const MathTopics = ({mathTopics, mathCategoryName}) => {
    const mathTopicsNode = mathTopics.map((mathTopic) => {
        return (<MathTopic mathTopic={mathTopic} mathCategoryName={mathCategoryName}/>);
    });

    return (
        <ul className="list-group">
            {mathTopicsNode}
        </ul>
    );
};

class MathPageTopics extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            mathCategory: {
                name: "",
                description: ""
            },
            mathTopics: [],
            hasMoreTopics: true
        }
    }

    componentDidMount(){
        axios.get("http://localhost:3001/math/".concat(this.props.match.params.mathCategory, "/mathCategory"))
            .then(response => {
                const mathCategory = response.data;
                this.setState({
                    mathCategory: mathCategory
                });
            })
    }

    loadFunction(page) {
        axios.get("http://localhost:3001/math/".concat(this.props.match.params.mathCategory, "/mathCategory/page=", page))
            .then(result => {
                const additionalTopics = result.data.list;
                const hasMoreTopics = result.data.hasMore;

                this.setState({
                    mathTopics: this.state.mathTopics.concat(additionalTopics),
                    hasMoreTopics: hasMoreTopics
                });
            });
    }

    render() {
        return (
            <Card className="border-primary mb-3">
                <CardHeader className="text-center font-weight-bold" >
                    {this.state.mathCategory.name}
                </CardHeader>
                <CardBody>
                    {this.state.mathCategory.description}
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
                        <MathTopics mathTopics={this.state.mathTopics} mathCategoryName={this.state.mathCategory.name}/>
                    </InfiniteScroll>
                </CardFooter>
            </Card>
        );
    }
}

export default MathPageTopics;