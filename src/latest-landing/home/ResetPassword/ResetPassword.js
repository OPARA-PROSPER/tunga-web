import React, { Component } from "react";
import ResetPasswordForm from "./ResetPasswordForm/ResetPasswordForm";
import AuthPage from "../../shared/AuthPage/AuthForm";
import "../../shared/AuthPage/AuthPage.scss";
import PropTypes from "prop-types";

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    isAuthenticated = () => {
        this.props.history.push('/dashboard');
    };

    render() {
        const query = this.props.match.params;
        return (
            <AuthPage query={query} form={ResetPasswordForm} isAuthenticated={this.isAuthenticated}/>
        );
    }
}

ResetPassword.propTypes = {
    history: PropTypes.object,
    match: PropTypes.match
};

export default ResetPassword;
