import React, { Component } from "react";

import LoginForm from "./LoginForm/LoginForm";

import AuthPage from "../../shared/AuthPage/AuthForm";
import "../../shared/AuthPage/AuthPage.scss";

import PropTypes from "prop-types";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    isAuthenticated = () => {
        this.props.history.push('/dashboard');
    };

    render() {
        return (
            <AuthPage form={LoginForm} isAuthenticated={this.isAuthenticated}/>
        );
    }
}

Login.propTypes = {
    history: PropTypes.object
};

export default Login;
