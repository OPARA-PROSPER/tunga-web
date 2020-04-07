import React, { Component } from "react";
import "./CodeOfConduct.scss";

import Nav from "../../layout/Nav/Nav";
import Footer from "../../layout/Footer/Footer";
import CodeOfConductContent from "../../../components/showcase/CodeOfConduct";


class CodeOfConduct extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <section className="CodeOfConduct">
                <div id="Content" className="CodeOfConduct__content agreement-page">
                    <div className="DevProfile__nav">
                        <Nav/>
                    </div>
                    <CodeOfConductContent/>
                </div>
                <Footer/>
            </section>
        );
    }
}

CodeOfConduct.propTypes = {};

export default CodeOfConduct;
