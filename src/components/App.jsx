import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {LOCATION_CHANGE} from 'react-router-redux';
import Media from "react-media";
import PropTypes from 'prop-types';

import connect from '../connectors/AuthConnector';
import store from '../store';

import DashboardLayout from './dashboard/DashboardLayout';
import BootLogo from "./core/BootLogo";
import NewShowcaseLayout from "../latest-landing/App";
import Button from "./core/Button";

import {
    getCookieConsent,
    getCookieConsentCloseAt,
    openCookieConsentPopUp,
    setCookieConsentCloseAt
} from "./utils/consent";

class App extends React.Component {

    constructor(props) {
        super(props);

        const {Auth: {user}} = this.props;

        this.state = {
            hasVerified: user && user.id,
            showProgress: !user || !user.id, // Used to prevent flickering
            showConsentAlert: !getCookieConsentCloseAt() && !getCookieConsent(),
            showFriendlyNotice: true
        };
        
    }

    componentDidMount() {
        const {Auth} = this.props;
        if (!this.state.hasVerified && !Auth.isVerifying) {
            this.props.AuthActions.verify();
        }

        if (this.state.showProgress) {
            // Wait one second to prevent flickering
            let self = this;
            setTimeout(() => {
                self.setState({showProgress: false});
            }, 1000);
        }
    }

    componentDidUpdate(prevProps) {
        const {Auth} = this.props;
        // TODO: add condition to check props equality
        if (
            prevProps.Auth.isVerifying && !Auth.isVerifying
        ) {
            this.setState({hasVerified: true});
        }

        if (!Auth.isVerifying && prevProps.Auth.isAuthenticated && !Auth.isAuthenticated && Auth.next) {
            window.location.href = Auth.next;
            return;
        }

        if (this.props.location !== prevProps.location) {
            store.dispatch({type: LOCATION_CHANGE});
        }
    }

    onCloseFriendlyNotice() {
        this.setState({showFriendlyNotice: false});
    }

    onCloseCookieConsent() {
        setCookieConsentCloseAt();
        this.setState({showConsentAlert: !getCookieConsentCloseAt() && !getCookieConsent()});
    }

    onCookieSettings() {
        let self = this;
        openCookieConsentPopUp(() => {
            self.setState({showConsentAlert: !getCookieConsentCloseAt() && !getCookieConsent()});
        });
    }

    render() {
        const {Auth: {user}, AuthActions} = this.props,
            {logout} = AuthActions,
            isAuthAwarePage = /^\/(login|signin|signup|reset-password|start|start-welcome|start-outsource|quiz|customer|join|dashboard|home|projects|task|estimate|network|people|member|payments|profile|settings|onboard|work|proposal)([/?#].*)*/i.test(window.location.pathname),
            isStillLoading = !this.state.hasVerified || this.state.showProgress;

        return (
            isAuthAwarePage && isStillLoading ? (
                <BootLogo/>
            ) : (
                <Media query="(min-width: 992px)">
                    {isLargeDevice => (
                        <div> 
                            <Switch>
                                {'dashboard|projects|network|payments|settings|onboard|work|proposal'.split('|').map(path => {
                                    return user && user.id ? (
                                        <Route key={`app-path--${path}`}
                                               path={`/${path}`}
                                               render={props =>
                                                   <DashboardLayout {...props}
                                                                    user={user}
                                                                    logout={logout}
                                                                    AuthActions={AuthActions}
                                                                    isLargeDevice={isLargeDevice}/>}/>
                                    ) : (
                                        <Redirect key={`app-path--${path}`}
                                                  from={`/${path}`} to="/"/>
                                    );
                                })}
                                <Redirect from="/home" to="'/dashboard'"/>
                                <Redirect from="/profile" to="/settings"/>
                                <Redirect from="/people*" to="/network*"/>
                                <Redirect from="/member*" to="/network*"/>
                                <Redirect from="/task*" to="/work*"/>
                                <Redirect from="/estimate*" to="/proposal*"/>
                                {'login|signin|signup|reset-password|start|start-welcome|start-outsource|quiz|customer|join'.split('|').map(path => {
                                    return user && user.id ? (
                                        <Redirect key={`app-path--${path}`}
                                                  from={`/${path}`}
                                                  to="/dashboard"/>
                                    ) : (
                                        <Route key={`app-path--${path}`}
                                               path={path} render={props =>
                                            <NewShowcaseLayout {...props}
                                                               user={user}
                                                               logout={logout}
                                                               isLargeDevice={isLargeDevice}/>}/>
                                    );
                                })}
                                {['/tunga', '*'].map(path => {
                                    return (
                                        <Route key={`app-path--${path}`}
                                               path={path} render={props =>
                                            <NewShowcaseLayout {...props}
                                                               user={user}
                                                               logout={logout}
                                                               isLargeDevice={isLargeDevice}/>}/>
                                    );
                                })}
                            </Switch>

                            {isStillLoading ? null : (
                                <>
                                    {/*user && (user.is_admin || user.is_project_manager)?null:(
                                        <Switch>
                                            <Route exact path='/customer/help/:channelId' render={props =>
                                                <ChatWidget channelId={props.match.params.channelId} autoOpen={true}/>}/>
                                            <Route path="/join" render={props => {return null}} />
                                            <Route path="*" component={ChatWidget} />
                                        </Switch>
                                    )*/}

                                    <div id="consent-banner-wrapper">

                                        {this.state.showFriendlyNotice ? (
                                            <div id="friendly-notice">
                                                <p id="friendly-notice-text">
                                                    <span id="friendly-notice-em">Tunga has been a remote-first company since day 1. </span> 
                                                    Have remote work questions? We'd be happy to share our learning.
                                                    <a onClick={this.onCloseFriendlyNotice.bind(this)} href="#hs-chat-open" id="friendly-notice-cta">Schedule a friendly chart
                                                        <svg width="13" height="10" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7.33333 0.286377L6.33333 1.28638L9.38021 4.33325H0V5.66659H9.38021L6.33333 8.71346L7.33333 9.71346L12.0469 4.99992L7.33333 0.286377Z" fill="#DA3451"/>
                                                        </svg>
                                                    </a>
                                                </p>

                                                <svg onClick={this.onCloseFriendlyNotice.bind(this)} id="friendly-notice-close" width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5.93996 5.00004L8.80663 2.14004C8.93216 2.01451 9.00269 1.84424 9.00269 1.66671C9.00269 1.48917 8.93216 1.31891 8.80663 1.19338C8.68109 1.06784 8.51083 0.997314 8.33329 0.997314C8.15576 0.997314 7.9855 1.06784 7.85996 1.19338L4.99996 4.06004L2.13996 1.19338C2.01442 1.06784 1.84416 0.997314 1.66663 0.997314C1.48909 0.997314 1.31883 1.06784 1.19329 1.19338C1.06776 1.31891 0.997231 1.48917 0.997231 1.66671C0.997231 1.84424 1.06776 2.01451 1.19329 2.14004L4.05996 5.00004L1.19329 7.86004C1.13081 7.92202 1.08121 7.99575 1.04737 8.07699C1.01352 8.15823 0.996094 8.24537 0.996094 8.33337C0.996094 8.42138 1.01352 8.50852 1.04737 8.58976C1.08121 8.671 1.13081 8.74473 1.19329 8.80671C1.25527 8.86919 1.329 8.91879 1.41024 8.95264C1.49148 8.98648 1.57862 9.00391 1.66663 9.00391C1.75463 9.00391 1.84177 8.98648 1.92301 8.95264C2.00425 8.91879 2.07798 8.86919 2.13996 8.80671L4.99996 5.94004L7.85996 8.80671C7.92194 8.86919 7.99567 8.91879 8.07691 8.95264C8.15815 8.98648 8.24529 9.00391 8.33329 9.00391C8.4213 9.00391 8.50844 8.98648 8.58968 8.95264C8.67092 8.91879 8.74465 8.86919 8.80663 8.80671C8.86911 8.74473 8.91871 8.671 8.95255 8.58976C8.9864 8.50852 9.00383 8.42138 9.00383 8.33337C9.00383 8.24537 8.9864 8.15823 8.95255 8.07699C8.91871 7.99575 8.86911 7.92202 8.80663 7.86004L5.93996 5.00004Z" fill="#909394"/>
                                                </svg>
                                            </div>  
                                        ) : null}
                                        {this.state.showConsentAlert ? (
                                            <div id="cookie-consent"
                                                className="clearfix">

                                                <div>
                                                    <p id="cookie-consent-text">
                                                        We use cookies to offer you a
                                                        better browsing experience,
                                                        analyze site traffic,
                                                        personalize content, assist with
                                                        our promotional and marketing
                                                        efforts and and provide content
                                                        from third parties.
                                                        Read about how we use cookies
                                                        and how you can control them by
                                                        clicking "Cookie Settings."
                                                        If you continue to use this
                                                        site, you consent to our use of
                                                        cookies.
                                                    </p>

                                                </div>
                                                <div
                                                    className="consent-actions text-center">
                                                    <Button variant="link"
                                                            className="btn"
                                                            onClick={this.onCookieSettings.bind(this)}>Cookie
                                                        Settings</Button>
                                                    <Button className="got-it-btn"
                                                            onClick={this.onCloseCookieConsent.bind(this)}>Got
                                                        it!</Button>
                                                </div>
                                            </div>
                                        ) : null}
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </Media>
            )
        );
    }
}

App.propTypes = {
    Auth: PropTypes.any,
    AuthActions: PropTypes.object,
    location: PropTypes.object
};

export default connect(App);
