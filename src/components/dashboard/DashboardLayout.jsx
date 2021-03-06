import React from 'react';
import PropTypes from "prop-types";
import { Redirect } from 'react-router-dom';
import moment from "moment";

import NavBar from '../NavBar';
import SideBar from './SideBar';
import TitleBar from './TitleBar';
import MainContent from './MainContent';
import {openConfirm} from "../core/utils/modals";

const AGREEMENT_VERSION = 1.2;
window.isAgreementOpen = false;

export default class DashboardLayout extends React.Component {

    static defaultProps = {
        isLargeDevice: true
    };

    static propTypes = {
        user: PropTypes.object, // there must be a new way of representing required props
        logout: PropTypes.func,
        match: PropTypes.object,
        isLargeDevice: PropTypes.bool,
    };

    componentDidMount() {
        $('body').addClass('is-dashboard');

        const script = document.createElement("script");

        script.src = "https://js.stripe.com/v3/";
        script.id = "stripeRef";
        script.async = true;

        document.body.appendChild(script);

        const {user, AuthActions} = this.props;

        if (user && user.id && parseFloat(user.agree_version || 0) < AGREEMENT_VERSION && !window.isAgreementOpen) {
            window.isAgreementOpen = true;
            openConfirm(
                <div>
                    <p>Hi {user.first_name},</p>
                    <p>
                        A change in our User Agreement has taken place as of
                        Monday, 22nd January, 2018. Please read it carefully{' '}
                        <a href="https://tunga.io/agreement" target="_blank">here</a>.
                    </p>
                </div>, '', false,
                {ok: 'I agree', cancel: "I don't agree", mustRespond: true},
            ).then(
                () => {
                    AuthActions.updateAuthUser({
                        agree_version: AGREEMENT_VERSION,
                        agreed_at: moment.utc().format(),
                    });
                },
                () => {
                    AuthActions.updateAuthUser({
                        disagree_version: AGREEMENT_VERSION,
                        disagreed_at: moment.utc().format(),
                    });
                },
            );
        }
    }

    componentWillUnmount () {
        $('body').removeClass('is-dashboard');

        const script = document.getElementById("stripeRef");
        document.body.removeChild(script);
    }

    render() {
        const {user, logout, match, isLargeDevice} = this.props,
            isProjectsRoute = match.url === '/projects';

        return (
            user && user.id && !__MAINTENANCE__?(
                <>
                    <NavBar variant="dashboard" user={user} onSignOut={logout} isLargeDevice={isLargeDevice}/>
                    {isLargeDevice?(
                        <SideBar/>
                    ):null}
                    <TitleBar user={user} isLargeDevice={isLargeDevice} showBreadCrumbs={isProjectsRoute && !isLargeDevice}/>
                    <MainContent isLargeDevice={isLargeDevice} className={isProjectsRoute && !isLargeDevice?'has-breadcrumbs':''}/>
                </>
            ):(
                <Redirect from="*" to={`/${__MAINTENANCE__?'maintenance':''}`}/>
            )
        );
    }
}

