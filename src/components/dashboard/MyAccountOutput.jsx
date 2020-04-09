import React from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';

import PropTypes from "prop-types";

const MyAccountOutput = props => {
    const {Auth: {user}, field} = props;

    return (
        <React.Fragment>
            {user[field] || null}
        </React.Fragment>
    )
};

MyAccountOutput.propTypes = {
    field: PropTypes.string,
};

function mapStateToProps(state) {
    return {
        Auth: state.app.Auth
    };
}

export default withRouter(connect(mapStateToProps)(MyAccountOutput));
