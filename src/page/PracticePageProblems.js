import React from "react";
import {Card, CardBody, CardFooter, CardHeader, NavLink, Table} from "reactstrap";
import axios from "axios";
import {NavLink as RRNavLink} from "react-router-dom";
import InfiniteScroll from "react-infinite-scroller";


const Problem = ({problem, categoryName}) => {
    return (
        <tr>
            <th scope="row">{problem.id}</th>
            <td>
                <NavLink
                    to={"/practice/".concat(categoryName, "/", problem.id)} tag={RRNavLink}>
                    {problem.name}
                </NavLink>
            </td>
            <td>
                {problem.numberOfAcceptedSolutions}
            </td>
            <td>
                {problem.difficulty}
            </td>
        </tr>
    );
};

const Problems = ({problems, categoryName}) => {
    return problems.map((problem) => {
        return (<Problem problem={problem} categoryName={categoryName}/>);
    });
};

class PracticePageProblems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category: {
                name: "",
                description: ""
            },
            problems: [],
            hasMoreProblems: true
        }
    }

    componentDidMount() {
        axios.get("http://localhost:3001/practice/".concat(this.props.match.params.category, "/category"))
            .then(response => {
                const category = response.data;
                this.setState({
                    category: category
                });
            });
    }

    loadFunction(page) {
        axios.get("http://localhost:3001/practice/".concat(this.props.match.params.category, "/problems/page=", page))
            .then(result => {
                const additionalProblems = result.data.list;
                const hasMoreProblems = result.data.hasMore;
                this.setState({
                    problems: this.state.problems.concat(additionalProblems),
                    hasMoreProblems: hasMoreProblems
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
                        hasMore={this.state.hasMoreProblems}
                        loader={
                            <div className="loader">
                                Loading ...
                            </div>
                        }
                    >
                        <Table>
                            <thead>
                                <th>#</th>
                                <th>Name</th>
                                <th>Accepted solutions</th>
                                <th>Difficulty</th>
                            </thead>
                            <tbody>
                                <Problems problems={this.state.problems} categoryName={this.state.category.name}/>
                            </tbody>
                        </Table>
                    </InfiniteScroll>
                </CardFooter>
            </Card>
        );
    }
}

export default PracticePageProblems;