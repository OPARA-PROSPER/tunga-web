import PropTypes from 'prop-types';
import React from 'react';
import {addEventListeners, INPUT_EVENTS} from "./utils/events";
import {filterInputProps} from "./utils/forms";

const Input = props => {
    return (
        <input type={props.type}
               className={`form-control ${props.className || ''} ${props.size?`form-control-${props.size}`:''}`}
               placeholder={props.placeholder}
               {...filterInputProps(props)}
               {...addEventListeners(INPUT_EVENTS, props)}/>
    );
};

Input.defaultProps = {
    type: 'text'
};

Input.propTypes = {
    type: PropTypes.string,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    size: PropTypes.string,
};

export default Input;
