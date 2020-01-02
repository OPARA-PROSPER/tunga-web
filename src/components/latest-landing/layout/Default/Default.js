import React, { Component } from "react";
import { withRouter } from "react-router";
import { kebabCase } from "lodash";

import AboutUs from "../../home/AboutUs/AboutUs";
import OurService from "../../home/OurService/OurService";
import ScheduleCall from "../../home/ScheduleCall/ScheduleCall";
import CaseStudies from "../../home/CaseStudies/CaseStudies";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import PageScroll from "../../shared/PageScroll/PageScroll";

const pages = [
    {
        hash: "Header",
        title: "Tunga",
        isActive: false,
        isActiveBar: false,
        color: "#fff",
        bgColor: "#fff",
        theme: "dark",
    },
    {
        hash: "AboutUs",
        title: "About Us",
        isActive: false,
        isActiveBar: false,
        color: "#062E64",
        bgColor: "#062E64",
        theme: "light",
    },
    {
        hash: "OurService",
        title: "Our Services",
        isActive: false,
        isActiveBar: false,
        color: "#062E64",
        bgColor: "#062E64",
        theme: "light",
    },
    {
        hash: "ScheduleCall",
        title: "Schedule Call",
        isActive: false,
        isActiveBar: false,
        color: "#fff",
        bgColor: "#fff",
        theme: "dark",
    },
    {
        hash: "CaseStudies",
        title: "Case Studies",
        isActive: false,
        isActiveBar: false,
        color: "#062E64",
        bgColor: "#062E64",
        theme: "light",
    },
    {
        hash: "Contact",
        title: "Contact",
        isActive: false,
        isActiveBar: false,
        color: "#fff",
        bgColor: "#fff",
        theme: "dark",
    },
];

class Default extends Component {
    constructor(props) {
        super(props);
        this.state = { activeUseCase: 1 };
    }

    onUseCaseClick = (activeUseCase) => {
        this.setState({ gotToPage: 4, activeUseCase });
    }

    render() {
        const { isMobile } = this.props;

        return (
            <div className="Default">
                <PageScroll pages={pages}>
                    <Header isMobile={isMobile}/>
                    <AboutUs/>
                    <OurService isMobile={isMobile} onUseCaseClick={this.onUseCaseClick}/>
                    <ScheduleCall isMobile={isMobile} showCaseStudies={true} onUseCaseClick={this.onUseCaseClick}/>
                    <CaseStudies activeUseCase={this.state.activeUseCase}/>
                    <Footer />
                </PageScroll>
            </div>
        );
    }
}

Default.propTypes = {};
const DefaultWithRouter = withRouter(Default);

export default DefaultWithRouter;
