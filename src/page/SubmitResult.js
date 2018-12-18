import React from "react";
import axios from "axios"
import {Table, Card, CardHeader, CardBody, CardFooter} from "reactstrap";

const Result = ({result}) => {
    return (
        <tr className={result.status === "Passed" ? "table-success" : "table-danger"}>
            <th>{result.test.number}</th>
            <td>{result.executionTimeMs}</td>
            <td>{result.status}</td>
        </tr>
    );
};

const CompilationResult = ({submit}) => {

    if (submit.processed === false) {
        return (<h2>Compiling...</h2>);
    } else {
        return (
            <Table>
                <thead>
                <tr>
                    <th>#</th>
                    <th>username</th>
                    <th>problem name</th>
                    <th>compilation result</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{submit.id}</td>
                    <td>{submit.username}</td>
                    <td>{submit.problem.name}</td>
                    <td>{submit.compilationReturnCode === 0 ? 'OK' : 'ERR'}</td>
                </tr>
                </tbody>
            </Table>
        )
    }
};

const Results = ({results}) => {
    const map = results.map(result => {
        return (<Result result={result}/>)
    });

    return (
        <Table>
            <thead>
            <tr>
                <th>#</th>
                <th>execution time</th>
                <th>status</th>
            </tr>
            </thead>
            <tbody>
            {map}
            </tbody>
        </Table>
    );
};

const Loading = ({isCompleted}) => {
    if (isCompleted === true) {
        return "";
    } else {
        return (
            <h4>Testing...</h4>
        )
    }
};

class SubmitResult extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            problemName: "",
            submit: {
                processed: false
            },
            submitResults: [],
            isCompleted: false
        }
    }

    componentDidMount() {
        axios.get("http://localhost:3001/submit/".concat(this.props.match.params.submitID, "/problem"))
            .then(result => {
                const problemName = result.data.name;
                this.setState({problemName: problemName});
            });

        this.update();
        this.interval = setInterval(() => this.update(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    update() {

        if (this.state.submit.processed === false) {
            axios.get("http://localhost:3001/submit/".concat(this.props.match.params.submitID, "/details"))
                .then(result => {
                    const submit = result.data;

                    console.log(submit);

                    if (submit !== "") {
                        this.setState({submit: submit});
                    }

                });
        }

        axios.get("http://localhost:3001/submit/".concat(this.props.match.params.submitID, "/result"))
            .then(result => {
                const submitsResults = result.data.list;
                const isCompleted = result.data.isCompleted;

                if (isCompleted) {
                    clearInterval(this.interval);
                }

                this.setState({
                    submitResults: submitsResults,
                    isCompleted: isCompleted
                });
            });
    }

    render() {
        return (
            <div>
                <Card className="border-primary mb-3">
                    <CardHeader className="text-center font-weight-bold">
                        {this.state.problemName} | submit: {this.props.match.params.submitID}
                    </CardHeader>
                    <CardBody>
                        <CompilationResult submit={this.state.submit}/>
                    </CardBody>
                    <CardFooter>
                        <Results results={this.state.submitResults}/>
                        <Loading isCompleted={this.state.isCompleted}/>
                    </CardFooter>
                </Card>
            </div>
        );
    }
}

export default SubmitResult;



