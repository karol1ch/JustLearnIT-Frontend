import React from "react";
import axios from "axios";
import {Card, CardBody, CardFooter, CardHeader} from "reactstrap";
import AceEditor from "react-ace";

class Topic extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            topic: {
                id: 0,
                name: "",
                theory: "",
                category: {
                    name: "",
                    description: ""
                },
                codeExample: "",
                codeExplanation: ""
            }
        }
    }

    componentDidMount() {
        console.log(this.props.match.params.category);
        axios.get("http://localhost:3001/learning/".concat(this.props.match.params.category, "/", this.props.match.params.topicID))
            .then(response => {
                const topic = response.data;
                this.setState({topic: topic});
            });
    }

    render() {
        return (
            <Card className="border-primary mb-3">
                <CardHeader className="text-center font-weight-bold">
                    {this.state.topic.name}
                </CardHeader>
                <CardBody>
                    {this.state.topic.theory}
                </CardBody>
                <CardFooter className="text-center font-weight-bold">
                    Code Example
                </CardFooter>
                <CardBody>
                    {this.state.topic.codeExplanation}
                </CardBody>
                <CardFooter>
                    <AceEditor
                        mode={this.state.topic.category.name.toLowerCase()}
                        theme="github"
                        name="codeViewer"
                        fontSize={14}
                        showPrintMargin={false}
                        width={"100%"}
                        value={this.state.topic.codeExample}
                        highlightActiveLine={true}
                        readOnly={true}
                        editorProps={{$blockScrolling: true}}
                    />
                </CardFooter>
            </Card>
        );
    }
}


export default Topic;