import PropTypes from 'prop-types';
import React from 'react';

import {addEventListeners, BUTTON_EVENTS} from './utils/events';
import {filterButtonProps} from "./utils/forms";

export default class Button extends React.Component {
    static defaultProps = {
        type: 'button',
        variant: 'primary',
        block: false,
    };

    static propTypes = {
        type: PropTypes.string,
        className: PropTypes.string,
        variant: PropTypes.string,
        size: PropTypes.string,
        block: PropTypes.bool,
    };

    render() {
        const {children, type, className, href, variant, block, size, ...otherProps} = this.props, 
            buttonEvents = addEventListeners(BUTTON_EVENTS, this.props), 
            outputClassName = `btn ${variant?`btn-${variant}`:''} ${className || ''} ${block?'btn-block':''} ${size ?`btn-${size}`:''}`;
        
        return href?(
            <a {...otherProps} href={href} className={outputClassName} {...buttonEvents}>
                {children}
            </a>
        ):(
            <button type={type}
                    className={outputClassName}
                    {...filterButtonProps(this.props)}
                    {...buttonEvents}>
                {children}
            </button>
        );
    }
}
