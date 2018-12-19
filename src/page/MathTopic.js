import  axios from "axios";
import React from "react";
import {Button, Card, CardBody, CardFooter, CardHeader, UncontrolledCollapse} from "reactstrap";




class MathTopic extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            mathTopic: {
                id: 0,
                name: "",
                theory: "",
                mathCategory: {
                    name: "",
                    description: ""
                },
                homework: "",
                clue: "",
                answer: ""
            }
        }
    }



    componentDidMount() {
        console.log(this.props.match.params.mathCategory);
        axios.get("http://localhost:3001/math/".concat(this.props.match.params.mathCategory, "/", this.props.match.params.mathTopicID))
            .then(response => {
                const mathTopic = response.data;
                this.setState({mathTopic: mathTopic});
            });
    }


    render(){
        return (
            <Card className="border-primary mb-3">
                <CardHeader className="text-center font-weight-bold">
                    {this.state.mathTopic.name}
                </CardHeader>
                <CardBody>
                    {this.state.mathTopic.theory}
                </CardBody>
                <CardFooter className="text-center font-weight-bold">
                    Homework
                </CardFooter>
                <CardBody>
                    {this.state.mathTopic.homework}
                </CardBody>
                <CardBody>
                    <div>
                        <Button color="primary" id="toggler" style={{marginBottom: '3rem'}}>
                            Clue
                        </Button>
                        <UncontrolledCollapse toggler="#toggler" style={{marginBottom: '3rem'}}>
                            <Card>
                                {this.state.mathTopic.clue}
                            </Card>
                        </UncontrolledCollapse>
                    </div>
                </CardBody>
                <CardBody>
                    <div>
                        <Button color="primary" id="toggler1" style={{marginBottom: '1rem'}}>
                            Answer
                        </Button>
                        <UncontrolledCollapse toggler="#toggler1" style={{marginBottom: '3rem'}}>
                            <Card>
                                {this.state.mathTopic.answer}
                            </Card>
                        </UncontrolledCollapse>
                    </div>
                </CardBody>

            </Card>
        )
    }

}

export default MathTopic;