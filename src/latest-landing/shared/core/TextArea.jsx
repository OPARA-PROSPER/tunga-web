import PropTypes from "prop-types";
import React from "react";

import { addEventListeners, INPUT_EVENTS } from "./utils/events";
import { filterInputProps } from "./utils/forms";
const TextArea = props => {
    return (
        <textarea
            className={`form-control ${props.className || ""}`}
            placeholder={props.placeholder}
            {...filterInputProps(props)}
            {...addEventListeners(INPUT_EVENTS, props)}
        >
            {props.children}
        </textarea>
    );
};

TextArea.defaultProps = {
    type: "text"
};

TextArea.propTypes = {
    type: PropTypes.string,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    children: PropTypes.any
};

export default TextArea;