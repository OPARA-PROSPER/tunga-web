import PropTypes from 'prop-types';
import React from 'react';
import {Link} from 'react-router-dom';

import Icon from '../../core/Icon';

const Finish = () => {
    return (
        <div className="onboard-intro">
            <span className="onboard-finish-icon">
                <Icon name="check" size="lg" />
            </span>
            <div className="onboard-finish-button">
                <Link to="/dashboard" className="btn btn-primary">Go to Dashboard</Link>
            </div>
        </div>
    );
};

Finish.propTypes = {
    user: PropTypes.object,
    isSaving: PropTypes.object,
    isSaved: PropTypes.object,
    errors: PropTypes.object,
    ProfileActions: PropTypes.object,
};

export default Finish;