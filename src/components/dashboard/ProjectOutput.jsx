import React from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';

import PropTypes from "prop-types";

const ProjectOutput = props => {
    const {Project: {projects}, id, field} = props;

    return (
        <React.Fragment>
            {projects[id]?projects[id][field]:null}
        </React.Fragment>
    )
};

ProjectOutput.propTypes = {
    id: PropTypes.string,
    field: PropTypes.string,
};

function mapStateToProps(state) {
    return {
        Project: state.app.Project
    };
}

export default withRouter(connect(mapStateToProps)(ProjectOutput));
