import React from "react";
import axios from "axios";
import AceEditor from "react-ace";
import {Button, Card, CardBody, CardFooter, CardHeader, Input, InputGroup, InputGroupAddon} from "reactstrap";
import "brace/theme/github";
import "brace/mode/java";
import {withRouter} from "react-router";

const Language = ({language}) => {
    return (<option>{language.name}</option>);
};

const Languages = ({languages}) => {
    return (languages.map(language => {
        return (<Language language={language} key={language.name}/>)
    }));
};

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
            availableLanguages: [],
            code: "// place for your code",
            username: "",
            programmingLanguage: "",
        };

        this.onChangeSelect = this.onChangeSelect.bind(this);
        this.onChangeEditor = this.onChangeEditor.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
        this.onClick = this.onClick.bind(this);
    };

    onChangeEditor(newValue) {
        this.setState({code: newValue})
    }

    onChangeInput(newValue) {
        this.setState({username: newValue.target.value});
    }

    onChangeSelect(newValue) {
        this.setState({programmingLanguage: newValue.target.value});
    }

    onClick() {
        if (this.state.code !== "" && this.state.username !== "" && this.state.programmingLanguage !== "") {
            axios.post(
                "http://localhost:3001/practice/".concat(this.props.match.params.category, "/", this.props.match.params.problemID, "/submit"), {
                    codeContent: this.state.code.toString(),
                    username: this.state.username.toString(),
                    programmingLanguageName: this.state.programmingLanguage

                }, {
                    headers: {'Content-Type': 'application/json'}
                }).then(response => {

                const submitId = response.data;
                this.props.history.push("/practice/".concat(this.props.match.params.category, "/", this.props.match.params.problemID, "/", submitId, "/result"));
            });
        }
    }

    componentDidMount() {
        axios.get("http://localhost:3001/practice/".concat(this.props.match.params.category, "/", this.props.match.params.problemID))
            .then(response => {
                const problem = response.data;
                this.setState({problem: problem});
            });

        axios.get("http://localhost:3001/practice/".concat(this.props.match.params.category, "/", this.props.match.params.problemID, "/availableLanguages"))
            .then(response => {
                const availableLanguages = response.data;
                this.setState({availableLanguages: availableLanguages});
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
                        mode="java"
                        theme="github"
                        name="codeViewer"
                        fontSize={14}
                        onChange={this.onChangeEditor}
                        showPrintMargin={false}
                        width={"100%"}
                        value={this.state.code}
                        highlightActiveLine={true}
                        editorProps={{$blockScrolling: true}}
                    />
                    <br/>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">username</InputGroupAddon>
                        <Input placeholder="username" onChange={this.onChangeInput}/>
                        <Input type="select" name="select" defaultValue="-- select language --"
                               onChange={this.onChangeSelect}>
                            <option disabled={true}>-- select language --</option>
                            <Languages languages={this.state.availableLanguages}/>
                        </Input>
                        <Button color="primary" onClick={this.onClick}>Submit Code</Button>
                    </InputGroup>
                </CardFooter>
            </Card>
        );
    }
}

export default withRouter(Problem);