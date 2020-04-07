import React, { Component } from "react";
import "./UserAgreement.scss";

import Nav from "../../layout/Nav/Nav";
import Footer from "../../layout/Footer/Footer";
import UserAgreementContent from "../../../components/showcase/Agreement";


class UserAgreement extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <section className="UserAgreement">
                <div id="Content" className="UserAgreement__content agreement-page">
                    <div className="DevProfile__nav">
                        <Nav/>
                    </div>
                    <UserAgreementContent/>
                </div>
                <Footer/>
            </section>
        );
    }
}

export default UserAgreement;
