import React from "react";
import {
    NavLink as RRNavLink
} from "react-router-dom";
import axios from "axios";
import {
    NavLink, Table
} from "reactstrap";
import {
    Card,
    CardBody,
    CardFooter,
    CardHeader
} from "reactstrap";
import InfiniteScroll from "react-infinite-scroller";

const Submit = ({submit}) => {
    return (

        <tr>
            <td><NavLink className=" list-group-item-action align-items-start"
                         to={"/submits/".concat(submit.id)} tag={RRNavLink}>
                {submit.id}</NavLink></td>
            <td>{submit.username}</td>
            <td>{submit.problem.name}</td>
            <td>{submit.compilationReturnCode === 0 ? 'OK' : 'ERR'}</td>

        </tr>

    );
};

const Submits = ({submits}) => {
    const subs = submits.map((submit) => {
        return (<Submit submit={submit}/>);
    });

    return (<Table>

        <thead>
        <th>ID</th>
        <th>Username</th>
        <th>Problem</th>
        <th>Compilation Status</th>
        </thead>
        <tbody>{subs}</tbody>
    </Table>);
};

class SubmitsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            submits: [],
            hasMoreSubmits: true
        }
    }

    loadFunction(page) {
        axios.get("http://localhost:3001/submits/page=".concat(page))
            .then(response => {
                const additionalSubmits = response.data.list;
                const hasMoreSubmits = response.data.hasMore;
                this.setState({
                    submits: this.state.submits.concat(additionalSubmits),
                    hasMoreSubmits: hasMoreSubmits
                });
            });
    }

    render() {
        return (
            <Card className="card border-primary mb-3">
                <CardHeader className="text-center font-weight-bold">
                    Submits
                </CardHeader>
                <CardBody>
                    <InfiniteScroll
                        pageStart={-1}
                        loadMore={this.loadFunction.bind(this)}
                        hasMore={this.state.hasMoreSubmits}
                        loader={
                            <div className="loader">
                                Loading ...
                            </div>
                        }
                    >
                        <Submits submits={this.state.submits}/>
                    </InfiniteScroll>
                </CardBody>
                <CardFooter/>
            </Card>
        );
    }
}

export default SubmitsPage;