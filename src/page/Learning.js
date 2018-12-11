import React from 'react';
import axios from "axios";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle
} from "reactstrap"


const Category = ({category}) => {
    return (
        <a href={"/learning/category/".concat(category.name)}
           className="list-group-item list-group-item-action flex-column align-items-start">
            <h5>{category.name}</h5>
            <p className="mb-1">{category.description}</p>
        </a>
    );
};

const Categories = ({categories}) => {
    return categories.map((category) => {
        return (<Category category={category}/>);
    });
};

class Learning extends React.Component {
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
            <Card className="card border-primary mb-3">
                <CardHeader className="text-center font-weight-bold">
                        Learning Categories
                </CardHeader>
                <CardBody>
                    <Categories categories={this.state.categories}/>
                </CardBody>
                <CardFooter/>
            </Card>
        );
    }
}

export default Learning;