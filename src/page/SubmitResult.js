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

class SubmitResult extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            problemName: null,
            submitResults: [],
            isCompleted: false
        }
    }

    componentDidMount() {

        console.log("http://localhost:3001/submit/".concat(this.props.match.params.submitID, "/problem"));

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
                        <Results results={this.state.submitResults}/>
                    </CardBody>
                    <CardFooter/>
                </Card>
            </div>
        );
    }
}

export default SubmitResult;



