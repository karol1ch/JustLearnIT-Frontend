import React from 'react';
import axios from "axios";
import {Card, CardBody, CardHeader} from "reactstrap";

class Announcement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            announcement: {
                name: "",
                shortDescription: "",
                description: ""
            }
        }
    }


    componentDidMount() {

        axios.get("http://localhost:3001/home/".concat(this.props.match.params.announcementName))
            .then(response => {
                const announcement = response.data;
                console.log(response.data);
                this.setState({announcement: announcement});
                console.log(announcement);
            });

    }

    render() {
        return (
            <Card className="border-primary mb-3">
              <CardBody>
                <CardHeader className="text-center font-weight-bold">
                    <h1>{this.state.announcement.name}</h1>
                </CardHeader>
                    <p>{this.state.announcement.description}</p>
               </CardBody>
            </Card>
        );
    }
}

export default Announcement;