import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';

import Button from "../../core/Button";
import SurveyIcon from "./common/SurveyIcon";
import { submitDeveloperRating, resetDeveloperRating, retrieveProject } from "../../../actions/ProjectActions";
import { retrieveProgressEvent } from "../../../actions/ProgressEventActions";
import { connect } from "react-redux";


class Survey extends React.Component {
    static propTypes = {
        project: PropTypes.object,
        ProjectActions: PropTypes.object,
        isSaving: PropTypes.object,
        isSaved: PropTypes.object,
    };


    constructor(props) {
        super();
        this.state = {
            icons: [
                {
                    rating: 1,
                },
                {
                    rating: 2,
                },
                {
                    rating: 3,
                },
                {
                    rating: 4,
                },
                {
                    rating: 5,
                },
            ],
            ratings: {},
            incompleteRatings: false
        };

        this.onDeveloperRating = this.onDeveloperRating.bind(this);
        this.submitDeveloperRating = this.submitDeveloperRating.bind(this);
    }


    componentWillUnmount() {
        this.props.resetDeveloperRating();
        // this.props.retrieveProgressEvent(this.props.event.id);
    }


    submitDeveloperRating(e) {
        e.preventDefault();

        if (
            (this.props.project.category !== 'dedicated' && this.state.ratings.length === 1)
            && Object.keys(this.state.ratings).length !== this.getDevelopers().length
        ) {
            this.setState({ incompleteRatings: true });
            return;
        }

        this.setState({ incompleteRatings: false });
        Object.keys(this.state.ratings).forEach((memberId) => {
            const payload = {
                event: {
                    id: this.props.event.id,
                },
            };

            if (this.props.project.category === 'dedicated') {
                payload.rating = this.state.ratings[memberId];
                payload.user = memberId;
                payload.created_by = this.props.auth.user.id;
            } else {
                payload.rate_communication = this.state.ratings[memberId];
                payload.user = {
                    id: this.props.auth.user.id
                };
            }

            this.props.submitDeveloperRating(payload);
        });
    }


    onDeveloperRating({ rating, member }) {
        const ratings = this.state.ratings;
        ratings[member.id] = rating.rating;
        this.setState({ rating });
    }


    getDevelopers() {
        return this.props.project.participation
            .filter(({ user }) => user.is_developer)
            .map(({ user }) => ({ name: user.display_name, id: user.id }))
    }


    getExistingRating(event) {
        const ratings = event.developer_ratings.length ? event.developer_ratings : event.progress_reports;
        return ratings
            .map(({ user, rate_communication, rating }) => ({
                name: user.display_name,
                id: user.id,
                rating: rating || rate_communication
            }))
    }


    render() {
        const { project, projectStore, event } = this.props;
        const isSaved = projectStore['isSaved']['developerRating'];
        const isSaving = projectStore['isSaving']['developerRating'];
        const hasRating = event.developer_ratings.length || event.progress_reports.length;
        const developers = hasRating ? this.getExistingRating(event) : this.getDevelopers();

        const types = {
            developer_rating: developers,
            team: hasRating ? developers : [
                {
                    name: 'Tunga'
                }
            ]
        };

        const showSubmission = !hasRating;
        event.type = project.category === 'dedicated' ? event.type : 'team';
        const members = types[event.type] || [];

        return (
            <div className="survey">
                <div className="survey__header">
                    <div>
                        Client survey
                    </div>
                    <div>
                        Due date: {moment.utc(this.props.event.due_at).local().format('lll')}
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

                {
                    !isSaved
                        ?
                        <div>
                            {
                                members.map((member, i) => (
                                    <div className="survey__block" key={i}>
                                        <div className="survey__cta">
                                            How would you rate the collaboration with {member.name} for {project.title}?
                                        </div>
                                        <SurveyIcon
                                            rating={member.rating}
                                            onRating={(rating) => {
                                                this.onDeveloperRating({ rating, member })
                                            }}/>
                                    </div>
                                ))
                            }
                            {
                                this.state.incompleteRatings &&
                                <div className="text-danger p-1 pb-3">
                                    Please complete all ratings
                                </div>
                            }

                            {
                                showSubmission
                                &&
                                <div className="survey__btn-wrapper">
                                    <Button disabled={isSaving} onClick={this.submitDeveloperRating}>
                                        {isSaving ? 'Submitting ratings' : 'Submit Ratings'}
                                    </Button>
                                </div>
                            }
                        </div>
                        :
                        <div className="text-success">
                            Ratings have been submitted successful
                        </div>
                }
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
