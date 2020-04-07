import React, { Component } from "react";
import "./Default.scss";
import AboutUs from "../../home/AboutUs/AboutUs";
import OurService from "../../home/OurService/OurService";
import ScheduleCall from "../../home/ScheduleCall/ScheduleCall";
import CaseStudies from "../../home/CaseStudies/CaseStudies";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import PageScroll from "../../shared/PageScroll/PageScroll";
import { withRouter } from "react-router";
import PropTypes from 'prop-types';

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

        this.onUseCaseClick = this.onUseCaseClick.bind(this);
        this.onPageScrolled = this.onPageScrolled.bind(this);
        this.onTalentPoolRequest = this.onTalentPoolRequest.bind(this);
        this.goToServices = this.goToServices.bind(this);
    }

    onUseCaseClick(activeUseCase) {
        this.setState({ gotToPage: 4, activeUseCase });
    }

    goToServices() {
        this.setState({ gotToPage: 2 });
    }

    onPageScrolled() {
        this.setState({ gotToPage: false });
    }

    onTalentPoolRequest() {
        this.props.history.push('/our-team#talent-pool');
    }


    render() {
        const { isMobile } = this.props;

        return (
            <div className="Default">
                <PageScroll
                    pages={pages}
                    onPageScrolled={this.onPageScrolled}
                    goToPage={this.state.gotToPage}
                >
                    <div>
                        <Header isMobile={isMobile} onTalentPoolRequest={this.onTalentPoolRequest}/>
                    </div>
                    <div>
                        <AboutUs/>
                    </div>
                    <div>
                        <OurService isMobile={isMobile} onUseCaseClick={this.onUseCaseClick}/>
                    </div>
                    <div>
                        <ScheduleCall isMobile={isMobile} showCaseStudies={true} onUseCaseClick={this.onUseCaseClick}/>
                    </div>
                    <div>
                        <CaseStudies activeUseCase={this.state.activeUseCase}/>
                    </div>
                    <Footer goToServices={this.goToServices}/>
                </PageScroll>
            </div>
        );
    }
}

Default.propTypes = {
    isMobile: PropTypes.bool,
    history: PropTypes.object
};
const DefaultWithRouter = withRouter(Default);

export default DefaultWithRouter;
