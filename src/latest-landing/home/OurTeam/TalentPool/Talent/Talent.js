import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Talent.scss";
import Icon from "../../../../shared/core/Icon";
import { Link } from "react-router-dom";
import Routing from "../../../../constants/Routing";


class Talent extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        const { talent, query } = this.props;
        const profile = talent.profile || { skills: [] };

        let url = `${Routing.devProfile.basePath}/${talent.id}`;
        if (query) {
            url = `${url}?query=${query}`;
        }

        return (
            <div className="Talent"
                 style={{ backgroundImage: `url(http://tunga.io${talent.avatar_url})` }}>
                <div className="Talent__info">
                    <div className="Talent__name">
                        {talent.display_name}
                    </div>
                    <div className="Talent__location">
                        {profile.location}
                    </div>
                    <div className="Talent__skills">
                        {
                            profile.skills.slice(0, 4).map((skill) => (
                                <div className="Talent__skill" key={skill.id}>
                                    {skill.name}
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="Talent__cta">
                    <Link to={url} className="Talent__cta-link">
                        View full profile <Icon className="text-white" name="arrow-right"/>
                    </Link>
                </div>
            </div>
        );
    }
}

Talent.propTypes = {
    talent: PropTypes.object,
    query: PropTypes.string
};

export default Talent;
