import React, { Component } from "react";
import "./Default.scss";
import AboutUs from "../../home/AboutUs/AboutUs";
import OurService from "../../home/OurService/OurService";
import ScheduleCall from "../../home/ScheduleCall/ScheduleCall";
import CaseStudies from "../../home/CaseStudies/CaseStudies";
import Header from "../Header/Header";
import SideNav from "../../../components/sidenav";
import Footer from "../Footer/Footer";

const anchors = [
    {
        hash: "Header",
        title: "Tunga",
        isActive: false,
        isActiveBar: false,
    },
    {
        hash: "AboutUs",
        title: "About Us",
        isActive: false,
        isActiveBar: false,
    },
    {
        hash: "OurService",
        title: "Our Service",
        isActive: false,
        isActiveBar: false,
    },
    {
        hash: "ScheduleCall",
        title: "Schedule Call",
        isActive: false,
        isActiveBar: false,
    },
    {
        hash: "CaseStudies",
        title: "Case Studies",
        isActive: false,
        isActiveBar: false,
    },
    {
        hash: "Footer",
        title: "Footer",
        isActive: false,
        isActiveBar: false,
    },
];

class Default extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
      <div className="Default">
        <SideNav anchors={anchors}  bgColor="#062E64" color="#062E64"/>
        <Header/>
        <AboutUs/>
        <OurService/>
        <ScheduleCall showCaseStudies={true}/>
        <CaseStudies/>
        <Footer />
      </div>
        );
    }
}

Default.propTypes = {};

export default Default;
