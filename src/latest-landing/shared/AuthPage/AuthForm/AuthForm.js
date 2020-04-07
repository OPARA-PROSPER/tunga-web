import React, { Component } from "react";
import "./AuthForm.scss";
import PropTypes from "prop-types";

class AuthForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const Form = this.props.form;
        return (
            <div className="AuthForm">
                <div className="AuthForm__card">
                    <Form {...this.props}/>
                </div>
            </div>
        );
    }
}

AuthForm.propTypes = {
    form: PropTypes.any // FIXME put right type
};
export default AuthForm;

