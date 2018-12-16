import React from "react";
import {Card, CardBody, CardFooter, CardHeader, NavLink, Table} from "reactstrap";
import axios from "axios";
import {NavLink as RRNavLink} from "react-router-dom";


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
    const problemsNode = problems.map((problem) => {
        return (<Problem problem={problem} categoryName={categoryName}/>);
    });

    return (
        <tbody>
        {problemsNode}
        </tbody>
    );
};

class PracticePageProblems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category: {
                name: "",
                description: ""
            },
            problems: []
        }
    }

    componentDidMount() {
        axios.get("http://localhost:3001/practice/".concat(this.props.match.params.category, "/problems"))
            .then(response => {
                const problems = response.data;
                this.setState({
                    problems: problems
                });
            });

        axios.get("http://localhost:3001/practice/".concat(this.props.match.params.category, "/category"))
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
                    <Table>
                        <thead>
                        <th>#</th>
                        <th>Name</th>
                        <th>Accepted solutions</th>
                        <th>Difficulty</th>
                        </thead>
                        <Problems problems={this.state.problems} categoryName={this.state.category.name}/>
                    </Table>
                </CardFooter>
            </Card>
        );
    }
}

export default PracticePageProblems;