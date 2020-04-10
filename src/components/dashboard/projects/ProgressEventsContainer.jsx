import PropTypes from 'prop-types';
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ProgressEventDetailContainer from './ProgressEventDetailContainer';
import ProgressEventDetails from './ProgressEventDetails';

import connect from '../../../connectors/ProgressEventConnector';


const ProgressEventsContainer = props => {
    const {project, ProgressEvent, ProgressEventActions, match} = props;

    return (
        <>
            <Switch>
                <Route path={`${match.url}/:eventId`}
                       render={props => <ProgressEventDetailContainer {...props}
                                                                      eventId={props.match.params.eventId}
                                                                      ProgressEvent={ProgressEvent}
                                                                      ProgressEventActions={ProgressEventActions}>
                           <ProgressEventDetails project={project} {...props}/>
                       </ProgressEventDetailContainer>}
                />
            </Switch>
        </>
    );
};

ProgressEventsContainer.propTypes = {
    project: PropTypes.object
};

export default connect(ProgressEventsContainer);
