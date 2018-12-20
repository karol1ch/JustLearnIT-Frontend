import React from "react"
import {Button} from "reactstrap";
import {NavLink as RRNavLink} from "react-router-dom";
import "../css/mainPage.css";


class VisitPage extends React.Component {
    render() {
        return (
            <header className="mainPage-background">
                <div className="element1">
                    <h1>Just Learn IT</h1>
                    <p className="lead p-3">
                        The best way to learn programming.
                    </p>
                    <Button to="/home" tag={RRNavLink} className="register_button"><span>Visit us</span></Button>
                </div>
            </header>
        )
    }
}

export default VisitPage;