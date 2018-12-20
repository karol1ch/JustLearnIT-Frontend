import React from "react";
import {
    NavLink as RRNavLink
} from "react-router-dom";
import axios from "axios";
import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    NavLink
} from "reactstrap";

const Category = ({category}) => {
    return (
        <NavLink className="list-group-item list-group-item-action flex-column align-items-start"
                 to={"/learning/".concat(category.name)} tag={RRNavLink}>
            <h5>{category.name}</h5>
            <p className="mb-1">{category.description}</p>
        </NavLink>
    );
};

const Categories = ({categories}) => {
    return categories.map((category) => {
        return (<Category category={category} key={category.name}/>);
    });
};

class LearningPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: []
        }
    }

    componentDidMount() {
        axios.get("http://localhost:3001/learning")
            .then(response => {
                const categories = response.data;
                this.setState({categories: categories});
            });
    }

    render() {
        return (
            <Card className="card border-primary mb-3" key={'card3'}>
                <CardHeader className="text-center font-weight-bold" key={'ch3'}>
                    Learning Categories
                </CardHeader>
                <CardBody key={'card_body1'}>
                    <Categories categories={this.state.categories} key={'cats2'}/>
                </CardBody>
                <CardFooter/>
            </Card>
        );
    }
}

export default LearningPage;