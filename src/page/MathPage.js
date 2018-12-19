import React from "react";
import axios from "axios";
import {
    NavLink as RRNavLink
} from "react-router-dom";
import {Card, CardBody, CardFooter, CardHeader, NavLink} from "reactstrap";



const Category = ({category}) => {
    return(
        <NavLink className="list-group-item list-group-item-action flex-column align-items-start"
                 to={"/math/".concat(category.name)} tag={RRNavLink}>
            <h5>{category.name}</h5>
            <p className="mb-1">{category.description}</p>
        </NavLink>
    )
};

const Categories = ({categories}) => {
    return categories.map((category) => {
        return (<Category category={category}/>);
    });
};

class MathPage extends React.Component {

    constructor(props){
        super(props);
        this.state ={
            categories: []
        }
    }

    componentDidMount(){
        axios.get("http://localhost:3001/math")
            .then(response => {
                const categories = response.data;
                this.setState({categories: categories});
            });
    }

    render(){
        return (
            <Card className="card border-primary mb-3">
                <CardHeader className="text-center font-weight-bold">
                   Math Categories
                </CardHeader>
                <CardBody>
                    <Categories categories={this.state.categories}/>
                </CardBody>
                <CardFooter/>
            </Card>
        );
    }

}

export default MathPage;