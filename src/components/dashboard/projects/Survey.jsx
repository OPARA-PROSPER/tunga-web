import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';
import _ from 'lodash';

import Button from "../../core/Button";
import SurveyIcon from "./common/SurveyIcon";
import {
    submitDeveloperRating,
    resetDeveloperRating,
    retrieveProject
} from "../../../actions/ProjectActions";
import {retrieveProgressEvent} from "../../../actions/ProgressEventActions";
import {connect} from "react-redux";
import {getUser, isProjectClient} from "../../utils/auth";


class Survey extends React.Component {
    static propTypes = {
        project: PropTypes.object,
        ProjectActions: PropTypes.object,
        isSaving: PropTypes.object,
        isSaved: PropTypes.object,
    };

    constructor(props) {
        super(props);

        let ratingsMap = {};
        _.filter(this.parseRatings(props), item => item.authorId === getUser().id && item.value).forEach(rating => {
            ratingsMap[rating.userId] = rating;
        });

        this.state = {
            ratings: ratingsMap,
            incompleteRatings: false,
            ratingsNeedUpdate: Object.keys(ratingsMap).length > 0
        };
    }

    componentWillUnmount() {
        this.props.resetDeveloperRating();
    }

    onRatingChange = (value, details) => {
        const ratings = this.state.ratings;
        ratings[details.userId] = {...details, value};
        this.setState({ratings});
    };

    parseRatings = (props) => {
        const {project: {participation}, event: {developer_ratings, progress_reports}} = props;
        if (this.props.project.category === 'dedicated') {
            let existingDevRatingsMap = {};
            (developer_ratings || [])
                .filter(({created_by}) => created_by.id === getUser().id)
                .forEach(({user, rating, created_by, ...otherProps}) => {
                    existingDevRatingsMap[user.id] = {
                        rating,
                        user,
                        created_by, ...otherProps
                    };
                });

            return participation
                .filter(({user, status}) => user.is_developer && status === 'accepted')
                .map(({user}) => {
                    const rating = existingDevRatingsMap[user.id] || {};
                    return {
                        id: rating.id || null,
                        userId: user.id,
                        authorId: rating.created_by && rating.created_by.id || getUser().id,
                        name: user.display_name,
                        value: rating.rating || null,
                    };
                });
        } else {
            let ratings = progress_reports
                .filter(({user}) => user.id === getUser().id)
                .map(({id, user, rate_communication}) => ({
                    id: id,
                    userId: user.id,
                    authorId: user.id,
                    name: 'Tunga',
                    value: rate_communication
                }));

            if (!ratings.length) {
                ratings = [{
                    id: null,
                    userId: getUser().id,
                    authorId: getUser().id,
                    name: 'Tunga',
                    value: null
                }];
            }
            return _.uniqBy(ratings, 'authorId');
        }
    };

    onSave = (e) => {
        e.preventDefault();

        if (Object.keys(this.state.ratings).length !== this.parseRatings(this.props).length) {
            this.setState({incompleteRatings: true});
            return;
        }

        this.setState({incompleteRatings: false});
        Object.keys(this.state.ratings).forEach((userId) => {
            const payload = {
                event: {
                    id: this.props.event.id,
                },
            }, rating = this.state.ratings[userId];

            if (this.props.project.category === 'dedicated') {
                payload.rating = rating.value;
                payload.user = rating.userId;// {id: rating.userId};

            } else {
                payload.rate_communication = rating.value;
                payload.user = {id: rating.userId};
            }

            this.props.submitDeveloperRating({
                ...payload,
                id: rating.id || null
            });
        });
    };


    render() {
        const {project, projectStore} = this.props,
            isSaved = projectStore['isSaved']['developerRating'],
            isSaving = projectStore['isSaving']['developerRating'],
            parsedRatings = this.parseRatings(this.props);

        const canSave = parsedRatings.length && isProjectClient(project);

        return (
            <div className="survey">
                <div className="survey__header">
                    <div>
                        Client survey
                    </div>
                    <div>
                        Due
                        date: {moment.utc(this.props.event.due_at).local().format('lll')}
                    </div>
                </div>

                {
                    isSaving
                    &&
                    <div className="text-warning">
                        <em>
                            Submitting ratings
                        </em>
                    </div>
                }

                {isSaved && (
                    <div className="text-success">
                        Ratings have been saved successfully
                    </div>
                )}

                <div>
                    {parsedRatings.length ? (
                        parsedRatings.map((rating, i) => (
                            <div className="survey__block" key={i}>
                                <div className="survey__cta">
                                    How would you rate the collaboration
                                    with {rating.name} for {project.title}?
                                </div>
                                <SurveyIcon
                                    rating={rating.value}
                                    readOnly={!canSave || rating.authorId !== getUser().id}
                                    onRating={(value) => {
                                        this.onRatingChange(value, rating);
                                    }}/>
                            </div>
                        ))
                    ) : (
                        <div className="survey__block">
                            <div>The project currently has no developers attached to it for you to rate. Please ask a PM to enable this.</div>
                        </div>
                    )
                    }
                    {
                        this.state.incompleteRatings &&
                        <div className="text-danger p-1 pb-3">
                            Please complete all ratings
                        </div>
                    }

                    {
                        canSave
                        &&
                        <div className="survey__btn-wrapper">
                            <Button disabled={isSaving} onClick={this.onSave}>
                                {isSaving ? 'Submitting ratings' : 
                                this.state.ratingsNeedUpdate ? 'Update Ratings' : 'Submit Ratings'}
                            </Button>
                        </div>
                    }
                </div>
            </div>
        );
    }
}


const mapStateToProps = store => ({
    projectStore: store.app.Project,
    auth: store.app.Auth
});

const mapDispatchToProps = dispatch => {
    return {
        submitDeveloperRating: (event) => dispatch(submitDeveloperRating(event)),
        resetDeveloperRating: (event) => dispatch(resetDeveloperRating()),
        retrieveProgressEvent: (id) => dispatch(retrieveProgressEvent(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Survey);
