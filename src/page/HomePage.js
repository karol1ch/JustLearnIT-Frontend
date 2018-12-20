import React from 'react';
import axios from "axios";
import {
    Button,
    Card,
    CardBody,
    CardDeck,
    CardText,
    CardTitle,
    ListGroup, NavLink, UncontrolledCollapse
} from "reactstrap";
import {NavLink as RRNavLink} from "react-router-dom";
import InfiniteScroll from "react-infinite-scroller";


const Announcement = ({announcement}) => {
    return (
        <CardBody>
            <CardTitle>{announcement.name}</CardTitle>
            <CardText>{announcement.shortDescription}</CardText>
            <Button color="primary" to={"/home/".concat(announcement.name)} tag={RRNavLink}>Read more</Button>
        </CardBody>
    );
};

const Announcements = ({announcements}) => {
    return announcements.map((announcement) => {
        return (<Announcement announcement={announcement} key={announcement.name}/>);
    });
};

const Element = ({element}) => {
    return (
        <NavLink className="list-group-item list-group-item-action flex-column align-items-start"
                 to={"/home/".concat(element.name)} tag={RRNavLink}>
            <li className="list-group-item list-group-item-primary">{element.name}</li>
            <li className="list-group-item ">{element.shortDescription}</li>
        </NavLink>
    )
};

const ElementList = ({elementList}) => {
    let i=101;
    return elementList.map((element) => {
        return (<Element element={element} key={i++ +"xd"}/>);
    });
};

const Tip = ({tip}) => {
    return (
        <CardBody>
            {tip.text};
        </CardBody>
    )
};

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tip: "",
            announcements: [],
            time: new Date(),
            hasMoreAnn: true
        }
    }

    componentDidMount() {

        axios.get("http://localhost:3001/home/dzban")
            .then(response => {
                const tip = response.data;
                this.setState({tip: tip});
            });


        this.loadFunction(0);
        this.interval = setInterval(this.update, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    loadFunction(page) {
        axios.get("http://localhost:3001/home/page=".concat(page))
            .then(result => {
                const additionalAnn = result.data.list;
                const hasMoreAnn = result.data.hasMore;
                this.setState({
                    announcements: this.state.announcements.concat(additionalAnn),
                    hasMoreAnn: hasMoreAnn
                });
            });

    }

    update = () => {
        this.setState({
            time: new Date()
        })
    };

    render() {

        const h = this.state.time.getHours();
        const m = this.state.time.getMinutes();
        const s = this.state.time.getSeconds();

        return (
            <div>
                <div className="row">
                    <div className="col-3">
                        <div className="mb-5">
                            <h4>{h % 12}:{(m < 10 ? '0' + m : m)}:{(s < 10 ? '0' + s : s)} {h < 12 ? 'am' : 'pm'}</h4>
                        </div>
                        <div>
                            <Button color="primary" id="toggler" style={{marginBottom: '1rem'}}>
                                Tip of the day
                            </Button>
                            <UncontrolledCollapse toggler="#toggler">
                                <Card>
                                    <Tip tip={this.state.tip}></Tip>
                                </Card>
                            </UncontrolledCollapse>
                        </div>
                    </div>
                    <div className="col-9 ">
                        <div className=" text-center mb-4 mt-4"> <h1>Latest news</h1></div>
                        <div>
                            <CardDeck>
                                <Card>
                                    <CardBody>
                                        <Announcements announcements={this.state.announcements.slice(0, 1)}/>
                                    </CardBody>
                                </Card>
                                <Card>
                                    <CardBody>
                                        <Announcements announcements={this.state.announcements.slice(1, 2)}/>
                                    </CardBody>
                                </Card>
                            </CardDeck>
                        </div>
                        <div>
                            <CardDeck>
                                <Card>
                                    <CardBody>
                                        <Announcements announcements={this.state.announcements.slice(2, 3)}/>
                                    </CardBody>
                                </Card>
                                <Card>
                                    <CardBody>
                                        <Announcements announcements={this.state.announcements.slice(3, 4)}/>
                                    </CardBody>
                                </Card>
                            </CardDeck>
                        </div>
                    </div>
                </div>
                <div className=" text-center mb-5 mt-5"> <h3>All news</h3></div>
                <div>
                    <ListGroup>
                        <InfiniteScroll
                            pageStart={-1}
                            loadMore={this.loadFunction.bind(this)}
                            hasMore={this.state.hasMoreAnn}
                            loader={
                                <div className="loader" key={'redaol12'}>
                                    Loading ...
                                </div>
                            }
                        >
                            <ElementList elementList={this.state.announcements}/>
                        </InfiniteScroll>
                    </ListGroup>
                </div>
            </div>


        );
    }
}

export default HomePage;