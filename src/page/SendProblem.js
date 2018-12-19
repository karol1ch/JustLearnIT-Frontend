import React from "react"
import {
    Button,
    Card,
    CardBody, CardFooter,
    CardHeader,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
} from "reactstrap";
import axios from "axios";

const Language = ({language, onChange}) => {
    return (
        <InputGroupAddon addonType="prepend">
            <InputGroupText>
                <Input addon type="checkbox" id={"checkbox".concat(language.name)} onChange={() => {
                    onChange(language.name)
                }}/>{' '.concat(language.name)}
            </InputGroupText>
        </InputGroupAddon>
    );
};

const Languages = ({languages, onChange}) => {
    const map = languages.map(language => {
        return <Language language={language} onChange={onChange}/>
    });

    return (
        <InputGroup>
            <InputGroupAddon addonType="prepend">Languages</InputGroupAddon>
            {map}
        </InputGroup>

    );
};

const ProblemName = ({onChange}) => {
    return (
        <InputGroup>
            <InputGroupAddon addonType="prepend">Problem Name</InputGroupAddon>
            <Input onChange={(node) => onChange(node.target.value)} placeholder="problem name"/>
        </InputGroup>
    )
};

const Username = ({onChange}) => {
    return (
        <InputGroup>
            <InputGroupAddon addonType="prepend">username</InputGroupAddon>
            <Input onChange={(node) => onChange(node.target.value)} placeholder="username"/>
        </InputGroup>
    )
};

const Content = ({onChange}) => {
    return (
        <InputGroup>
            <InputGroupAddon addonType="prepend">Content</InputGroupAddon>
            <Input type="textarea" onChange={(node) => onChange(node.target.value)} placeholder="content"/>
        </InputGroup>
    )
};

const InputOutputDesc = ({onChangeInput, onChangeOutput}) => {
    return (
        <InputGroup>
            <InputGroupAddon addonType="prepend">Input</InputGroupAddon>
            <Input type="textarea" onChange={(node) => onChangeInput(node.target.value)} placeholder="input"/>
            <InputGroupAddon addonType="prepend">Output</InputGroupAddon>
            <Input type="textarea" onChange={(node) => onChangeOutput(node.target.value)} placeholder="output"/>
        </InputGroup>
    )
};


const Test = ({test, onChangeInput, onChangeOutput, onChangeTime}) => {
    return (
        <InputGroup>
            <InputGroupAddon
                addonType="prepend">Input</InputGroupAddon>
            <Input type="textarea" onChange={(node) => onChangeInput(test.number, node.target.value)}
                   placeholder="input"/>
            <InputGroupAddon
                addonType="prepend">Output</InputGroupAddon>
            <Input type="textarea" onChange={(node) => onChangeOutput(test.number, node.target.value)}
                   placeholder="output"/>
            <InputGroupAddon
                addonType="prepend">Time(ms)</InputGroupAddon>
            <Input type="textarea" onChange={(node) => onChangeTime(test.number, node.target.value)}
                   placeholder="time in millis"/>
        </InputGroup>

    )
};

const Tests = ({tests, onChangeInput, onChangeOutput, onChangeTime, addMethod}) => {

    const map = tests.map(test => {
        return (<Test test={test} onChangeInput={onChangeInput} onChangeOutput={onChangeOutput}
                      onChangeTime={onChangeTime}/>)
    });

    return (
        <div>
            {map}
            <br/>
            <Button color="success" onClick={() => addMethod()}>+</Button>
        </div>
    );
};

const Category = ({category}) => {
    return (
        <option>{category.name}</option>
    )
};

const Categories = ({categories, onChangeMethod}) => {
    const map = categories.map(category => {
        return (<Category category={category}/>)
    });

    return (
        <InputGroup>
            <InputGroupAddon addonType="prepend">Category</InputGroupAddon>
            <Input type="select" name="select" onChange={value => onChangeMethod(value)}>
                <option disabled selected value> -- select category --</option>
                {map}
            </Input>
        </InputGroup>
    )
};

const Difficulty = ({onChange}) => {
    return (
        <InputGroup>
            <InputGroupAddon addonType="prepend">Difficulty</InputGroupAddon>
            <Input type="select" name="select" onChange={value => onChange(value)}>
                <option disabled selected value> -- select difficulty level --</option>
                <option>easy</option>
                <option>medium</option>
                <option>hard</option>
            </Input>
        </InputGroup>
    )
};

class SendProblem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            category: "",
            languages: [],
            language: "",
            username: "",
            problemName: "",
            content: "",
            input: "",
            output: "",
            difficulty: "",
            tests: [{
                number: 0,
                input: "",
                output: "",
                maxExecutionTimeMs: 0
            }]
        }
    };

    componentDidMount() {
        axios.get("http://localhost:3001/sendProblem/categories")
            .then(result => {
                const categories = result.data;
                this.setState({categories: categories});
            });
    }

    onClickSubmit() {
        let languages = [];
        this.state.languages.forEach(language => {
            if (language.chosen === true) {
                languages = languages.concat([language.name]);
            }
        });

        axios.post("http://localhost:3001/sendProblem/submit", {
            category: this.state.category,
            languages: languages,
            username: this.state.username,
            problemName: this.state.problemName,
            content: this.state.content,
            inputDesc: this.state.input,
            outputDesc: this.state.output,
            difficulty: this.state.difficulty,
            tests: this.state.tests
        }).then(() => {
            this.props.history.push("/sendProblem/submitted");
        });
    }

    checkboxOnChange(languageName) {
        this.state.languages.forEach(language => {
            if (language.name === languageName) {
                language.chosen = !language.chosen;
            }
        });
    }

    usernameOnChange(username) {
        this.setState({username: username});
    }

    problemNameOnChange(problemName) {
        this.setState({problemName: problemName});
    }

    contentOnChange(content) {
        this.setState({content: content});
    }

    inputOnChange(input) {
        this.setState({input: input});
    }

    outputOnChange(output) {
        this.setState({output: output});
    }

    addMethod() {
        const newTest = {
            number: this.state.tests.length,
            input: "",
            output: "",
        };

        this.setState({tests: this.state.tests.concat([newTest])})
    }

    testInputOnChange(testNumber, input) {
        this.state.tests.forEach(test => {
            if (test.number === testNumber) {
                test.input = input;
            }
        });
    }

    testOutputOnChange(testNumber, output) {
        this.state.tests.forEach(test => {
            if (test.number === testNumber) {
                test.output = output;
            }
        });
    }

    testTimeMsOnChange(testNumber, timeMs) {
        this.state.tests.forEach(test => {
            if (test.number === testNumber) {
                test.maxExecutionTimeMs = timeMs;
            }
        });
    }

    onChangeCategory(newValue) {
        this.state.category = newValue.target.value;

        axios.get("http://localhost:3001/sendProblem/category=".concat(this.state.category, "/languages"))
            .then(result => {
                const languages = result.data;
                this.setState({languages: languages});
            });
    }

    onChangeDifficulty(newValue) {
        this.setState({difficulty: newValue.target.value});
    }

    render() {
        return (
            <div>
                <Card>
                    <CardHeader className="text-center font-weight-bold">
                        Send your problem!
                    </CardHeader>
                    <CardBody>
                        <Username onChange={this.usernameOnChange.bind(this)}/>
                    </CardBody>
                    <CardBody>
                        <ProblemName onChange={this.problemNameOnChange.bind(this)}/>
                    </CardBody>
                    <CardBody>
                        <Categories categories={this.state.categories}
                                    onChangeMethod={this.onChangeCategory.bind(this)}/>
                    </CardBody>
                    <CardBody>
                        <Languages languages={this.state.languages} onChange={this.checkboxOnChange.bind(this)}/>
                    </CardBody>
                    <CardBody>
                        <Difficulty onChange={this.onChangeDifficulty.bind(this)}/>
                    </CardBody>
                    <CardBody>
                        <Content onChange={this.contentOnChange.bind(this)}/>
                    </CardBody>
                    <CardBody>
                        <InputOutputDesc onChangeInput={this.inputOnChange.bind(this)}
                                         onChangeOutput={this.outputOnChange.bind(this)}/>
                    </CardBody>
                    <CardHeader className="text-center font-weight-bold">Tests</CardHeader>
                    <CardBody>
                        <Tests tests={this.state.tests}
                               onChangeInput={this.testInputOnChange.bind(this)}
                               onChangeOutput={this.testOutputOnChange.bind(this)}
                               onChangeTime={this.testTimeMsOnChange.bind(this)}
                               addMethod={this.addMethod.bind(this)}/>
                    </CardBody>
                    <CardFooter>
                        <Button color="primary" onClick={this.onClickSubmit.bind(this)}>Send</Button>
                    </CardFooter>
                </Card>
            </div>
        );
    }
}


export default SendProblem;


