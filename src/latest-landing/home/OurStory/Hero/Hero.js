import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Hero.scss";
import Button from "../../../shared/core/Button";
import Icon from "../../../shared/core/Icon";


class Hero extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { onLearnMore } = this.props;

        return (
            <div className="Hero">
                <div className="Hero__title">
                    Our journey to unleash Africa’s tech talent
                </div>
                <div className="Hero__subtitle">
                    Our mission: 21st century jobs for African youths
                </div>
                <a className="Hero__cta-link">
                    <Button onClick={onLearnMore}
                            size="md"
                            className="btn Hero__cta-btn btn-inverted"
                            variant=""
                    >
                        Learn more
                    </Button>
                    <span className="Hero__icon-holder">
                        <Icon className="Hero__cta-icon" name='arrow-down' size='card'/>
                    </span>
                </a>
            </div>
        );
    }
}

Hero.propTypes = {
    onLearnMore: PropTypes.any // TODO give appropriate type
};

export default Hero;
