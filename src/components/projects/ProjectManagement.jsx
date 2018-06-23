import PropTypes from 'prop-types';
import React from 'react';
import { Switch, Route, Redirect, NavLink } from 'react-router-dom';

import Activity from './Activity';
import Docs from './Docs';
import Team from './Team';
import Plan from './Plan';
import Pay from './Pay';
import Settings from './Settings';

export default class ProjectManagement extends React.Component {
    static propTypes = {
        project: PropTypes.object,
        ProjectActions: PropTypes.object,
        match: PropTypes.object
    };

    render() {
        const {project, ProjectActions, match} = this.props;
        const settingsProps = {project, ProjectActions};

        return (
            project?(
                <div className="project-page">
                    <div className="project-activity float-left">
                        <div className="project-filters">
                            {[
                                ['activity', 'Meeting room'],
                                ['docs', 'Documentation'],
                                ['team', 'Team'],
                                ['plan', 'Planning'],
                                ['pay', 'Payments'],
                                ['settings', 'Settings']
                            ].map(link => {
                                let url = link[0];
                                return (
                                    <NavLink key={`project-filters-link--${link[0]}`} exact to={`${match.url}/${url}`} activeClassName="active">{link[1]}</NavLink>
                                )
                            })}
                        </div>

                        <Switch>
                            <Redirect exact from={`${match.url}`} to={`${match.url}/activity`}/>
                            {[
                                ['activity', <Activity {...settingsProps}/>],
                                ['docs', <Docs {...settingsProps}/>],
                                ['team', <Team {...settingsProps}/>],
                                ['plan', <Plan {...settingsProps}/>],
                                ['pay', <Pay {...settingsProps}/>],
                                ['settings', <Settings {...settingsProps}/>],
                            ].map(path => {
                                return (
                                    <Route key={`project-management-path--${path}`} path={`${match.url}/${path[0]}`} render={props => path[1]}/>
                                );
                            })}
                        </Switch>
                    </div>
                    <div className="project-details float-right">
                        <h6>{project.title}</h6>

                        <h6>Description</h6>
                        <div>{project.description}</div>
                    </div>
                </div>
            ):null
        );
    }
}
