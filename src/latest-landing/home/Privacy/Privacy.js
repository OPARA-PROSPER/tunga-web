import React, { Component } from "react";
import "./Privacy.scss";

import Nav from "../../layout/Nav/Nav";
import Footer from "../../layout/Footer/Footer";
import PrivacyContent from "../../../components/showcase/Privacy";

class Privacy extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <section className="Privacy">
                <div id="Content" className="Privacy__content agreement-page">
                    <div className="DevProfile__nav">
                        <Nav/>
                    </div>
                    <PrivacyContent/>
                </div>
                <Footer/>
            </section>
        );
    }
}

Privacy.propTypes = {};

export default Privacy;
