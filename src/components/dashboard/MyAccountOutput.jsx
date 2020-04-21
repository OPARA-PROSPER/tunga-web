import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';

import PropTypes from "prop-types";

const MyAccountOutput = props => {
    const {Auth: {user}, field} = props;

    return (
        <>
            {user[field] || null}
        </>
    );
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
