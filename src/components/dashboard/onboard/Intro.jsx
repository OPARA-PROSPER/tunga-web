import PropTypes from 'prop-types';
import React from 'react';
import {Link} from 'react-router-dom';

const Intro = () => {
    return (
        <div className="onboard-intro">
            <Link className="btn btn-primary" to="/onboard/step-one">Go to my profile</Link>
        </div>
    );
};

Intro.propTypes = {
    user: PropTypes.object,
    isSaving: PropTypes.object,
    isSaved: PropTypes.object,
    errors: PropTypes.object,
    ProfileActions: PropTypes.object,
};

export default Intro;
