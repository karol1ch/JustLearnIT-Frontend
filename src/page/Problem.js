import React from "react";
import axios from "axios";
import AceEditor from "react-ace";
import {Button, Card, CardBody, CardFooter, CardHeader, Input, InputGroup, InputGroupAddon} from "reactstrap";
import "brace/theme/github";
import "brace/mode/java";

class Problem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            problem: {
                id: 0,
                name: "",
                content: "",
                category: {
                    name: "",
                    description: ""
                },
                inputDescription: "",
                outputDescription: "",
                numberOfAcceptedSolutions: 0,
                difficulty: ""
            },
            code: "",
            username: ""
        };

        this.onChangeEditor = this.onChangeEditor.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
        this.onClick = this.onClick.bind(this);
    };

    onChangeEditor(newValue) {
        this.state.code = newValue;
    }

    onChangeInput(newValue) {
        this.state.username = newValue.target.value;
    }

    onClick() {
        axios.post(
            "http://localhost:3001/practice/".concat(this.props.match.params.category, "/", this.props.match.params.problemID, "/submit"),
            {
                codeContent: this.state.code.toString(),
                username: this.state.username.toString(),
                programmingLanguage: "".concat(this.state.problem.category.name)
            },
            {
                headers: {'Content-Type': 'application/json'}
            });
    }

    componentDidMount() {
        axios.get("http://localhost:3001/practice/".concat(this.props.match.params.category, "/", this.props.match.params.problemID))
            .then(response => {
                const problem = response.data;
                this.setState({problem: problem});
            });
    }

    render() {
        return (
            <Card className="border-primary mb-3">
                <CardHeader className="text-center font-weight-bold">
                    {this.state.problem.name}
                </CardHeader>
                <CardBody>
                    {this.state.problem.content}
                </CardBody>
                <CardFooter className="text-center font-weight-bold">
                    Example
                </CardFooter>
                <CardBody>
                    <h4>input:</h4>
                    <p>{this.state.problem.inputDescription}</p>
                    <h4>output:</h4>
                    <p>{this.state.problem.outputDescription}</p>
                </CardBody>
                <CardFooter>
                    <AceEditor
                        mode={this.state.problem.category.name.toLowerCase()}
                        theme="github"
                        name="codeViewer"
                        fontSize={14}
                        onChange={this.onChangeEditor}
                        showPrintMargin={false}
                        width={"100%"}
                        value={"// place for your code"}
                        highlightActiveLine={true}
                        editorProps={{$blockScrolling: true}}
                    />
                    <br/>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">username</InputGroupAddon>
                        <Input placeholder="username" onChange={this.onChangeInput}/>
                        <Button color="primary" onClick={this.onClick}>Submit Code</Button>
                    </InputGroup>
                </CardFooter>
            </Card>
        );
    }
}

export default Problem;