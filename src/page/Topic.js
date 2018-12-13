import React from "react";
import axios from "axios";

class LearningCategory extends React.Component {

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

        console.log("http://localhost:3001/learning/".concat(this.props.match.params.category, "/", this.props.match.params.topicID));

        axios.get("http://localhost:3001/learning/".concat(this.props.match.params.category, "/", this.props.match.params.topicID))
            .then(response => {
                const topic = response.data;
                this.setState({topic: topic});
            });
    }

    render() {
        return (
            <div>
                <h1>{this.state.topic.name}</h1>
                <br/>
                <p>{this.state.topic.theory}</p>
                <br/>
                <p>{this.state.topic.codeExample}</p>
                <br/>
                <p>{this.state.topic.codeExplanation}</p>
            </div>
        );
    }
}

export default LearningCategory;