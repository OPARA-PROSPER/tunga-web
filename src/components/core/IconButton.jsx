import PropTypes from 'prop-types';
import React from 'react';

import Button from './Button';
import Icon from './Icon';

import {addEventListeners, BUTTON_EVENTS} from './utils/events';
import {filterButtonProps} from "./utils/forms";

const IconButton = props => {
    return (
        <Button type={props.type || 'button'}
                className={props.className || ''}
                variant={props.variant}
                {...filterButtonProps(props)}
                {...addEventListeners(BUTTON_EVENTS, props)}>
            <Icon name={props.name} size={props.size}/>
        </Button>
    );
};

IconButton.defaultProps = {
    variant: 'icon',
    type: 'button',
    size: 'md'
};

IconButton.propTypes = {
    variant: PropTypes.string,
    type: PropTypes.string,
    className: PropTypes.string,
    name: PropTypes.string,
    size: PropTypes.string,
};

export default IconButton;
