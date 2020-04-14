import PropTypes from 'prop-types';
import React from 'react';
import FormStatus from './status/FormStatus';
import FieldError from './status/FieldError';
import UserSelector from '../containers/UserSelector';
import {CHANNEL_TYPES} from '../constants/Api';

import {isAdmin, getUser} from '../utils/auth';

const ChannelForm = () => {
    return <div className="new-channel" />;
};

export default ChannelForm;

ChannelForm.contextTypes = {
    router: PropTypes.object.isRequired,
};
