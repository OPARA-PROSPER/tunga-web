import React from "react";
import Routing from "../constants/Routing";

import DevProfile from "../home/DevProfile/DevProfile"; // FIXME change to lazyload

const DefaultBody = React.lazy(() => import("../layout/Default/Default"));
const OurTeam = React.lazy(() => import("../home/OurTeam/OurTeam"));
const OurStory = React.lazy(() => import("../home/OurStory/OurStory"));
const Login = React.lazy(() => import("../home/Login/Login"));
const News = React.lazy(() => import("../home/News/News"));
const UserAgreement = React.lazy(() => import("../home/UserAgreement/UserAgreement"));
const CodeOfConduct = React.lazy(() => import("../home/CodeOfConduct/CodeOfConduct"));
const Privacy = React.lazy(() => import("../home/Privacy/Privacy"));
const BlogPage = React.lazy(() => import("../home/BlogPage/BlogPage"));
const ResetPassword = React.lazy(() => import("../home/ResetPassword/ResetPassword"));
const ForgotPassword = React.lazy(() => import("../home/ForgotPassword/ForgotPassword"));
const Dashboard = React.lazy(() => import("../../components/App"));
const Home = React.lazy(() => import("../home/Home"));
const Join = React.lazy(() => import("../home/Join/Join"));

export const childRoutes = [
    {
        path: Routing.home.path,
        name: Routing.home.name,
        exact: true,
        component: DefaultBody,
    },
    {
        path: Routing.ourStory.path,
        name: Routing.ourStory.name,
        exact: false,
        component: OurStory
    },
    {
        path: Routing.ourTeam.path,
        name: Routing.ourTeam.name,
        exact: false,
        component: OurTeam
    },
    {
        path: Routing.news.path,
        name: Routing.news.name,
        exact: false,
        component: News
    },
    {
        path: Routing.login.path,
        name: Routing.login.name,
        exact: false,
        component: Login
    },
    {
        path: Routing.forgotPassword.path,
        name: Routing.forgotPassword.name,
        exact: false,
        component: ForgotPassword
    },
    {
        path: Routing.resetPassword.path,
        name: Routing.resetPassword.name,
        exact: false,
        component: ResetPassword
    },
    {
        path: Routing.blog.path,
        name: Routing.blog.name,
        exact: false,
        component: BlogPage
    },
    {
        path: Routing.privacy.path,
        name: Routing.privacy.name,
        exact: false,
        component: Privacy
    },
    {
        path: Routing.userAgreement.path,
        name: Routing.userAgreement.name,
        exact: false,
        component: UserAgreement
    },
    {
        path: Routing.codeOfConduct.path,
        name: Routing.codeOfConduct.name,
        exact: false,
        component: CodeOfConduct
    },
    {
        path: Routing.join.path,
        name: Routing.join.name,
        exact: false,
        component: Join
    },
    {
        path: Routing.devProfile.path,
        name: Routing.devProfile.name,
        exact: false,
        component: DevProfile
    },
    {
        path: "/dashboard",
        component: Dashboard,
        exact: false,
        name: "dashboard"
    },
    {
        path: "/projects",
        component: Dashboard,
        exact: false,
        name: "projects"
    },
    {
        path: "/network",
        component: Dashboard,
        exact: false,
        name: "network"
    },
    {
        path: "/payments",
        component: Dashboard,
        exact: false,
        name: "payments"
    },
    {
        path: "/settings",
        component: Dashboard,
        exact: false,
        name: "settings"
    },
    {
        path: "/onboard",
        component: Dashboard,
        exact: false,
        name: "onboard"
    },
    {
        path: "/work",
        component: Dashboard,
        exact: false,
        name: "work"
    },
    {
        path: "/proposal",
        component: Dashboard,
        exact: false,
        name: "proposal"
    },
];

const Routes = [
    {
        path: "",
        component: Home,
        exact: true,
        name: Routing.home.name,
        childRoutes
    }
];

export default Routes;
