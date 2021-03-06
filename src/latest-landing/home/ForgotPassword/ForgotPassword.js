import React, { Component } from "react";

import ForgotPasswordForm from "./ForgotPasswordForm/ForgotPasswordForm";

import AuthPage from "../../shared/AuthPage/AuthForm";
import "../../shared/AuthPage/AuthPage.scss";
import PropTypes from "prop-types";

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    isAuthenticated = () => {
        this.props.history.push('/dashboard');
    };

    render() {
        return (
            <AuthPage form={ForgotPasswordForm} isAuthenticated={this.isAuthenticated}/>
        );
    }
}

ForgotPassword.propTypes = {
    history: PropTypes.object
};

export default ForgotPassword;
