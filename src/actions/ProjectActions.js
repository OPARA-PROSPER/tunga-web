import axios from 'axios';
import { composeFormData, ENDPOINT_PROJECTS, ENDPOINT_DEVELOPER_RATING, ENDPOINT_GENERAL_RATING } from './utils/api';

export const CREATE_PROJECT_START = 'CREATE_PROJECT_START';
export const CREATE_PROJECT_SUCCESS = 'CREATE_PROJECT_SUCCESS';
export const CREATE_PROJECT_FAILED = 'CREATE_PROJECT_FAILED';
export const LIST_PROJECTS_START = 'LIST_PROJECTS_START';
export const LIST_PROJECTS_SUCCESS = 'LIST_PROJECTS_SUCCESS';
export const LIST_PROJECTS_FAILED = 'LIST_PROJECTS_FAILED';
export const RETRIEVE_PROJECT_START = 'RETRIEVE_PROJECT_START';
export const RETRIEVE_PROJECT_SUCCESS = 'RETRIEVE_PROJECT_SUCCESS';
export const RETRIEVE_PROJECT_FAILED = 'RETRIEVE_PROJECT_FAILED';
export const UPDATE_PROJECT_START = 'UPDATE_PROJECT_START';
export const UPDATE_PROJECT_SUCCESS = 'UPDATE_PROJECT_SUCCESS';
export const UPDATE_PROJECT_FAILED = 'UPDATE_PROJECT_FAILED';
export const LIST_MORE_PROJECTS_START = 'LIST_MORE_PROJECTS_START';
export const LIST_MORE_PROJECTS_SUCCESS = 'LIST_MORE_PROJECTS_SUCCESS';
export const LIST_MORE_PROJECTS_FAILED = 'LIST_MORE_PROJECTS_FAILED';
export const DELETE_PROJECT_START = 'DELETE_PROJECT_START';
export const DELETE_PROJECT_SUCCESS = 'DELETE_PROJECT_SUCCESS';
export const DELETE_PROJECT_FAILED = 'DELETE_PROJECT_FAILED';
export const SEND_REMINDER_START = 'SEND_REMINDER_START';
export const SEND_REMINDER_SUCCESS = 'SEND_REMINDER_SUCCESS';
export const SEND_REMINDER_FAILED = 'SEND_REMINDER_FAILED';
export const SUBMIT_DEVELOPER_RATING_START = 'SUBMIT_DEVELOPER_RATING_START';
export const SUBMIT_DEVELOPER_RATING_SUCCESS = 'SUBMIT_DEVELOPER_RATING_SUCCESS';
export const SUBMIT_DEVELOPER_RATING_FAILED = 'SUBMIT_DEVELOPER_RATING_FAILED';
export const RESET_DEVELOPER_RATING = 'RESET_DEVELOPER_RATING';

export function createProject(project, target) {
    return dispatch => {
        dispatch(createProjectStart(project, target));

        let headers = {},
            data = project;

        if (project.documents && project.documents.length) {
            headers['Content-Type'] = 'multipart/form-data';
            data = composeFormData(project);
        }

        axios
            .post(ENDPOINT_PROJECTS, data, { headers })
            .then(function (response) {
                dispatch(createProjectSuccess(response.data, target));
            })
            .catch(function (error) {
                dispatch(
                    createProjectFailed(
                        (error.response ? error.response.data : null), project, target
                    ),
                );
            });
    };
}

export function createProjectStart(project, target) {
    return {
        type: CREATE_PROJECT_START,
        project,
        target
    };
}

export function createProjectSuccess(project, target) {
    return {
        type: CREATE_PROJECT_SUCCESS,
        project,
        target
    };
}

export function createProjectFailed(error, project, target) {
    return {
        type: CREATE_PROJECT_FAILED,
        error,
        project,
        target
    };
}

export function listProjects(filter, selection, prev_selection) {
    return dispatch => {
        dispatch(listProjectsStart(filter, selection, prev_selection));
        axios
            .get(ENDPOINT_PROJECTS, { params: filter })
            .then(function (response) {
                dispatch(listProjectsSuccess(response.data, filter, selection));
            })
            .catch(function (error) {
                dispatch(
                    listProjectsFailed(
                        error.response ? error.response.data : null,
                    ),
                );
            });
    };
}

export function listProjectsStart(filter, selection, prev_selection) {
    return {
        type: LIST_PROJECTS_START,
        filter,
        selection,
        prev_selection,
    };
}

export function listProjectsSuccess(response, filter, selection) {
    return {
        type: LIST_PROJECTS_SUCCESS,
        items: response.results,
        previous: response.previous,
        next: response.next,
        count: response.count,
        filter,
        selection,
    };
}

export function listProjectsFailed(error, selection) {
    return {
        type: LIST_PROJECTS_FAILED,
        error,
        selection,
    };
}

export function retrieveProject(id) {
    return dispatch => {
        dispatch(retrieveProjectStart(id));
        axios
            .get(ENDPOINT_PROJECTS + id + '/')
            .then(function (response) {
                dispatch(retrieveProjectSuccess(response.data, id));
            })
            .catch(function (error) {
                dispatch(
                    retrieveProjectFailed(
                        error.response ? error.response.data : null, id
                    ),
                );
            });
    };
}

export function retrieveProjectStart(id) {
    return {
        type: RETRIEVE_PROJECT_START,
        id,
    };
}

export function retrieveProjectSuccess(project, id) {
    return {
        type: RETRIEVE_PROJECT_SUCCESS,
        project,
        id
    };
}

export function retrieveProjectFailed(error, id) {
    return {
        type: RETRIEVE_PROJECT_FAILED,
        error,
        id
    };
}

export function updateProject(id, project) {
    return dispatch => {
        dispatch(updateProjectStart(id, project, id));

        let headers = {},
            data = project;
        if (project.documents && project.documents.length) {
            headers['Content-Type'] = 'multipart/form-data';
            data = composeFormData(project);
        }

        axios
            .patch(`${ENDPOINT_PROJECTS}${id}/`, data, {
                headers: { ...headers },
            })
            .then(function (response) {
                dispatch(updateProjectSuccess(response.data, id));
            })
            .catch(function (error) {
                dispatch(
                    updateProjectFailed(
                        (error.response ? error.response.data : null), project, id
                    ),
                );
            });
    };
}

export function updateProjectStart(id, project, target) {
    return {
        type: UPDATE_PROJECT_START,
        id,
        project,
        target
    };
}

export function updateProjectSuccess(project, target) {
    return {
        type: UPDATE_PROJECT_SUCCESS,
        project,
        target
    };
}

export function updateProjectFailed(error, project, target) {
    return {
        type: UPDATE_PROJECT_FAILED,
        error,
        project,
        target
    };
}

export function listMoreProjects(url, selection) {
    return dispatch => {
        dispatch(listMoreProjectsStart(url, selection));
        axios
            .get(url)
            .then(function (response) {
                dispatch(listMoreProjectsSuccess(response.data, selection));
            })
            .catch(function (error) {
                dispatch(
                    listMoreProjectsFailed(
                        error.response ? error.response.data : null,
                        selection,
                    ),
                );
            });
    };
}

export function listMoreProjectsStart(url, selection) {
    return {
        type: LIST_MORE_PROJECTS_START,
        url,
        selection,
    };
}

export function listMoreProjectsSuccess(response, selection) {
    return {
        type: LIST_MORE_PROJECTS_SUCCESS,
        items: response.results,
        previous: response.previous,
        next: response.next,
        count: response.count,
        selection,
    };
}

export function listMoreProjectsFailed(error) {
    return {
        type: LIST_MORE_PROJECTS_FAILED,
        error,
    };
}

export function deleteProject(id) {
    return dispatch => {
        dispatch(deleteProjectStart(id));
        axios.delete(ENDPOINT_PROJECTS + id + '/')
            .then(function () {
                dispatch(deleteProjectSuccess(id));
            }).catch(function (response) {
            dispatch(deleteProjectFailed(response.data, id));
        });
    }
}

export function deleteProjectStart(id) {
    return {
        type: DELETE_PROJECT_START,
        id
    }
}

export function deleteProjectSuccess(id) {
    return {
        type: DELETE_PROJECT_SUCCESS,
        id
    }
}

export function deleteProjectFailed(error, id) {
    return {
        type: DELETE_PROJECT_FAILED,
        error,
        id
    }
}

export function sendReminder(id, target) {
    return dispatch => {
        dispatch(sendReminderStart(id, target));

        axios
            .post(`${ENDPOINT_PROJECTS}${id}/remind/`, {})
            .then(function (response) {
                dispatch(sendReminderSuccess(response.data, id, target));
            })
            .catch(function (error) {
                dispatch(
                    sendReminderFailed(
                        (error.response ? error.response.data : null), id, target
                    ),
                );
            });
    };
}

export function sendReminderStart(id, target) {
    return {
        type: SEND_REMINDER_START,
        id,
        target
    };
}

export function sendReminderSuccess(data, id, target) {
    return {
        type: SEND_REMINDER_SUCCESS,
        data,
        id,
        target
    };
}

export function sendReminderFailed(error, id, target) {
    return {
        type: SEND_REMINDER_FAILED,
        error,
        id,
        target
    };
}

export function submitDeveloperRating(event, target) {
    return dispatch => {
        const url = event.rate_communication ? ENDPOINT_GENERAL_RATING : ENDPOINT_DEVELOPER_RATING;
        console.log(url);
        dispatch(submitDeveloperRatingStart(event));

        axios
            .post(url, event)
            .then(function (response) {
                dispatch(submitDeveloperRatingSuccess(response.data, event));
            })
            .catch(function (error) {
                dispatch(
                    submitDeveloperRatingFailed(
                        (error.response ? error.response.data : null), event, target
                    ),
                );
            });
    };
}

export function resetDeveloperRating() {
    return dispatch => {
        dispatch({
            type: RESET_DEVELOPER_RATING,
        });
    };
}


export function submitDeveloperRatingStart(event) {
    return {
        type: SUBMIT_DEVELOPER_RATING_START,
        event,
    };
}

export function submitDeveloperRatingSuccess(event) {
    return {
        type: SUBMIT_DEVELOPER_RATING_SUCCESS,
        event,
    };
}

export function submitDeveloperRatingFailed(error, event) {
    return {
        type: SUBMIT_DEVELOPER_RATING_FAILED,
        error,
        event,
    };
}
