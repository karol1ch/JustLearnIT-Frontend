import React from "react"
import {Button} from "reactstrap";
import {NavLink as RRNavLink} from "react-router-dom";
import "../css/mainPage.css";
import programmingImg from "../images/programming.jpg"
import compileImg from "../images/compile.jpg";
import mathImg from "../images/math.jpg";
import dudekImg from "../images/dd.JPG"
import holotaImg from "../images/mh.jpg"
import kalorImg from "../images/kc.jpg"


class VisitPage extends React.Component {
    render() {
        return (
            <div>
                <header className="mainPage-background">
                    <div className="element1">
                        <h1>Just Learn IT</h1>
                        <p className="lead p-3">
                            The best way to learn programming.
                        </p>
                        <Button to="/home" tag={RRNavLink} className="register_button"><span>Visit us</span></Button>
                    </div>
                </header>

                <main role="main">
                    <div className="container marketing">

                        <hr className="featurette-divider"/>

                        <div className="row featurette">
                            <div className="col-md-7">
                                <h2 className="featurette-heading">Programming languages.</h2>
                                <p className="lead">You can learn the most popular programming language. With our
                                    courses it's simple and fun.
                                    Don't wait until tomorrow, change your futere today.</p>
                            </div>
                            <div className="col-md-5">
                                <img className="featurette-image img-fluid mx-auto" width="600" height="300"
                                     alt="Generic placeholder"
                                     src={programmingImg} data-holder-rendered="true"/>
                            </div>
                        </div>

                        <hr className="featurette-divider"/>

                        <div className="row featurette">
                            <div className="col-md-7 order-md-2">
                                <h2 className="featurette-heading">Own compiler.</h2>
                                <p className="lead">We now that Internet tutorial are hard because you need to
                                    switch between site and your own IDE. We
                                    don't want to waste your time, so
                                    we give you possibility to write your code directly on a website. Our dedicated
                                    compilatr transform
                                    your code and give answer if your program was good or not.</p>
                            </div>
                            <div className="col-md-5 order-md-1">
                                <img className="featurette-image img-fluid mx-auto" alt="Generic placeholder"
                                     width="600" height="300" src={compileImg}
                                     data-holder-rendered="true"/>
                            </div>
                        </div>

                        <hr className="featurette-divider"/>

                        <div className="row featurette">
                            <div className="col-md-7">
                                <h2 className="featurette-heading">Mathematical courses.</h2>
                                <p className="lead">We know that mathematic is important for programmers, so we
                                    prepared several issues from
                                    the most basic topic like graphs, seth teory or number theory. Mathematics will
                                    have stopped to be your problem.</p>
                            </div>
                            <div className="col-md-5">
                                <img className="featurette-image img-fluid mx-auto" alt="Generic placeholder"
                                     width="600" height="300" src={mathImg}
                                     data-holder-rendered="true"/>
                            </div>
                        </div>

                        <hr className="featurette-divider"/>

                        <h1 className="featurette-heading">Our team</h1>

                        <div className="row">
                            <div className="col-lg-4">
                                <img className="rounded-circle" src={dudekImg} alt="Generic placeholder"
                                     width="140" height="140"/>
                                <h2>Dawid Dudek</h2>
                                <p>Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id
                                    dolor id nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac
                                    consectetur ac, vestibulum at eros. Praesent commodo cursus magna.</p>
                            </div>
                            <div className="col-lg-4">
                                <img className="rounded-circle" src={holotaImg} alt="Generic placeholder"
                                     width="140" height="140"/>
                                <h2>Marcin Holota</h2>
                                <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia
                                    odio sem nec elit. Cras mattis consectetur purus sit amet fermentum. Fusce
                                    dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.</p>
                            </div>
                            <div className="col-lg-4">
                                <img className="rounded-circle" src={kalorImg} alt="Generic placeholder"
                                     width="140" height="140"/>
                                <h2>Kalor Chomoncik</h2>
                                <p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget
                                    quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus
                                    ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo
                                    sit amet risus.</p>
                            </div>
                        </div>

                        <hr className="featurette-divider"/>

                    </div>

                </main>
                <header></header>
            </div>

        )
    }
}

export default VisitPage;