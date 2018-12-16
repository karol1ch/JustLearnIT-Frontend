import React from 'react';
import axios from "axios";

class Announcement1 extends React.Component {
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

        axios.get("http://localhost:3001/home/".concat(this.props.match.params.name))
            .then(response => {
                const announcement = response.data;
                this.setState({announcement: announcement});
            });
    }


    render() {
        return (
            <div>
                <h5>{this.state.announcement.name}</h5>
            </div>
        );
    }
}

export default Announcement1;