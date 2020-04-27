import axios from 'axios';
import {
    ENDPOINT_ACCOUNT_INFO,
    ENDPOINT_USER_INFO,
    ENDPOINT_PROFILE,
    ENDPOINT_CHANGE_PASSWORD,
    ENDPOINT_USER_EDUCATION,
    ENDPOINT_USER_WORK,
    ENDPOINT_COUNTRIES,
    ENDPOINT_COMPANY,
    ENDPOINT_NOTIFICATIONS,
    ENDPOINT_NOTIFICATION_LOG,
    ENDPOINT_VISITORS,
    composeFormData
} from './utils/api';

import * as AuthActions from './AuthActions';

export const UPDATE_ACCOUNT_INFO_START = 'UPDATE_ACCOUNT_INFO_START';
export const UPDATE_ACCOUNT_INFO_SUCCESS = 'UPDATE_ACCOUNT_INFO_SUCCESS';
export const UPDATE_ACCOUNT_INFO_FAILED = 'UPDATE_ACCOUNT_INFO_FAILED';
export const DEACTIVATE_ACCOUNT_START = 'DEACTIVATE_ACCOUNT_START';
export const DEACTIVATE_ACCOUNT_SUCCESS = 'DEACTIVATE_ACCOUNT_SUCCESS';
export const DEACTIVATE_ACCOUNT_FAILED = 'DEACTIVATE_ACCOUNT_FAILED';
export const UPDATE_AUTH_USER_START = 'UPDATE_AUTH_USER_START';
export const UPDATE_AUTH_USER_SUCCESS = 'UPDATE_AUTH_USER_SUCCESS';
export const UPDATE_AUTH_USER_FAILED = 'UPDATE_AUTH_USER_FAILED';
export const RETRIEVE_PROFILE_START = 'RETRIEVE_PROFILE_START';
export const RETRIEVE_PROFILE_SUCCESS = 'RETRIEVE_PROFILE_SUCCESS';
export const RETRIEVE_PROFILE_FAILED = 'RETRIEVE_PROFILE_FAILED';
export const UPDATE_PROFILE_START = 'UPDATE_PROFILE_START';
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';
export const UPDATE_PROFILE_FAILED = 'UPDATE_PROFILE_FAILED';
export const UPDATE_PASSWORD_START = 'UPDATE_PASSWORD_START';
export const UPDATE_PASSWORD_SUCCESS = 'UPDATE_PASSWORD_SUCCESS';
export const UPDATE_PASSWORD_FAILED = 'UPDATE_PASSWORD_FAILED';
export const CREATE_WORK_START = 'CREATE_WORK_START';
export const CREATE_WORK_SUCCESS = 'CREATE_WORK_SUCCESS';
export const CREATE_WORK_FAILED = 'CREATE_WORK_FAILED';
export const UPDATE_WORK_START = 'UPDATE_WORK_START';
export const UPDATE_WORK_SUCCESS = 'UPDATE_WORK_SUCCESS';
export const UPDATE_WORK_FAILED = 'UPDATE_WORK_FAILED';
export const CREATE_EDUCATION_START = 'CREATE_EDUCATION_START';
export const CREATE_EDUCATION_SUCCESS = 'CREATE_EDUCATION_SUCCESS';
export const CREATE_EDUCATION_FAILED = 'CREATE_EDUCATION_FAILED';
export const UPDATE_EDUCATION_START = 'UPDATE_EDUCATION_START';
export const UPDATE_EDUCATION_SUCCESS = 'UPDATE_EDUCATION_SUCCESS';
export const UPDATE_EDUCATION_FAILED = 'UPDATE_EDUCATION_FAILED';
export const GET_COUNTRIES_START = 'GET_COUNTRIES_START';
export const GET_COUNTRIES_SUCCESS = 'GET_COUNTRIES_SUCCESS';
export const GET_COUNTRIES_FAILED = 'GET_COUNTRIES_FAILED';
export const UPDATE_COMPANY_START = 'UPDATE_COMPANY_START';
export const UPDATE_COMPANY_SUCCESS = 'UPDATE_COMPANY_SUCCESS';
export const UPDATE_COMPANY_FAILED = 'UPDATE_COMPANY_FAILED';
export const GET_NOTIFICATIONS_START = 'GET_NOTIFICATIONS_START';
export const GET_NOTIFICATIONS_SUCCESS = 'GET_NOTIFICATIONS_SUCCESS';
export const GET_NOTIFICATIONS_FAILED = 'GET_NOTIFICATIONS_FAILED';
export const CREATE_NOTIFICATION_LOG_START = 'CREATE_NOTIFICATION_LOG_START';
export const CREATE_NOTIFICATION_LOG_SUCCESS = 'CREATE_NOTIFICATION_LOG_SUCCESS';
export const CREATE_NOTIFICATION_LOG_FAILED = 'CREATE_NOTIFICATION_LOG_FAILED';
export const CREATE_VISITORS_START = 'CREATE_VISITORS_START';
export const CREATE_VISITORS_SUCCESS = 'CREATE_VISITORS_SUCCESS';
export const CREATE_VISITORS_FAILED = 'CREATE_VISITORS_FAILED';

export function updateAccountInfo(user) {
    // Requires password and limited to a few account fields
    return dispatch => {
        dispatch(updateAccountInfoStart());
        axios
            .patch(ENDPOINT_ACCOUNT_INFO, user)
            .then(function(response) {
                dispatch(updateAccountInfoSuccess(response.data));
            })
            .catch(function(error) {
                dispatch(
                    updateAccountInfoFailed(
                        error.response ? error.response.data : null
                    )
                );
            });
    };
}

export function updateAccountInfoStart() {
    return {
        type: UPDATE_ACCOUNT_INFO_START,
    };
}

export function updateAccountInfoSuccess(user) {
    return {
        type: UPDATE_ACCOUNT_INFO_SUCCESS,
        user,
    };
}

export function updateAccountInfoFailed(error) {
    return {
        type: UPDATE_ACCOUNT_INFO_FAILED,
        error,
    };
}

export function deactivateAccount() {
    return dispatch => {
        dispatch(deactivateAccountStart());
        axios
            .post(`${ENDPOINT_ACCOUNT_INFO}deactivate/`, {})
            .then(function(response) {
                dispatch(deactivateAccountSuccess(response.data));
            })
            .catch(function(error) {
                dispatch(
                    deactivateAccountFailed(
                        error.response ? error.response.data : null
                    )
                );
            });
    };
}

export function deactivateAccountStart() {
    return {
        type: DEACTIVATE_ACCOUNT_START,
    };
}

export function deactivateAccountSuccess(user) {
    return {
        type: DEACTIVATE_ACCOUNT_SUCCESS,
        user,
    };
}

export function deactivateAccountFailed(error) {
    return {
        type: DEACTIVATE_ACCOUNT_FAILED,
        error,
    };
}

export function updateAuthUser(user) {
    // No password required and can update all user fields
    return dispatch => {
        dispatch(updateAuthUserStart());

        var headers = {},
            data = user;
        if (user.image) {
            headers['Content-Type'] = 'multipart/form-data';
            data = composeFormData(user);
        }

        axios
            .patch(ENDPOINT_USER_INFO, data, {headers})
            .then(function(response) {
                dispatch(updateAuthUserSuccess(response.data));
                if(user.disagree_version) {
                    dispatch(AuthActions.logout());
                }
            })
            .catch(function(error) {
                dispatch(
                    updateAuthUserFailed(
                        error.response ? error.response.data : null
                    )
                );
            });
    };
}

export function updateAuthUserStart() {
    return {
        type: UPDATE_AUTH_USER_START,
    };
}

export function updateAuthUserSuccess(user) {
    return {
        type: UPDATE_AUTH_USER_SUCCESS,
        user,
    };
}

export function updateAuthUserFailed(error) {
    return {
        type: UPDATE_AUTH_USER_FAILED,
        error,
    };
}

export function retrieveProfile() {
    return dispatch => {
        dispatch(retrieveProfileStart());
        axios
            .get(ENDPOINT_USER_INFO)
            .then(function(response) {
                dispatch(retrieveProfileSuccess(response.data));
            })
            .catch(function(error) {
                dispatch(
                    retrieveProfileFailed(
                        error.response ? error.response.data : null
                    )
                );
            });
    };
}

export function retrieveProfileStart() {
    return {
        type: RETRIEVE_PROFILE_START,
    };
}

export function retrieveProfileSuccess(user) {
    return {
        type: RETRIEVE_PROFILE_SUCCESS,
        user: user,
        profile: user.profile,
        work: user.work,
        education: user.education,
    };
}

export function retrieveProfileFailed(error) {
    return {
        type: RETRIEVE_PROFILE_FAILED,
        error,
    };
}

export function updateProfile(id, profile) {
    return dispatch => {
        dispatch(updateProfileStart(id, profile));
        let request_method = id ? 'patch' : 'post';

        var headers = {},
            data = profile;
        if (profile && (profile.id_document || (profile.user && profile.user.image))) {
            headers['Content-Type'] = 'multipart/form-data';
            data = composeFormData(profile);
        }

        var errors = Object.keys(profile.user).map(function(key) {
            return [key, profile.user[key]];
        });

        let requiredFields = errors.reduce(function(accumulator, currentValue) {         
            if(currentValue[1] == ""){
                accumulator[currentValue[0]] = currentValue[0].replace("_", " ") + " is required";
            }
            return accumulator;
        }, {});

        if(requiredFields.length == 0){
            axios
            .request({
                url: ENDPOINT_PROFILE,
                method: request_method,
                data,
                headers,
            })
            .then(function(response) {
                dispatch(updateProfileSuccess(response.data, id));
            })
            .catch(function(error) {
                dispatch(
                    updateProfileFailed(
                        error.response ? error.response.data : null, profile, id
                    )
                );
            });
        }else{
            dispatch(
                updateProfileFailed(
                    requiredFields, profile, id
                )
            );
        }
    };
}

export function updateProfileStart(id, profile) {
    return {
        type: UPDATE_PROFILE_START,
        id,
        profile
    };
}

export function updateProfileSuccess(profile, id) {
    return {
        type: UPDATE_PROFILE_SUCCESS,
        id,
        profile,
    };
}

export function updateProfileFailed(error, profile, id) {
    return {
        type: UPDATE_PROFILE_FAILED,
        error,
        profile,
        id,
    };
}

export function updatePassword(credentials) {
    return dispatch => {
        dispatch(updatePasswordStart());
        axios
            .post(ENDPOINT_CHANGE_PASSWORD, credentials)
            .then(function() {
                dispatch(updatePasswordSuccess());
            })
            .catch(function(error) {
                dispatch(
                    updatePasswordFailed(
                        error.response ? error.response.data : null
                    )
                );
            });
    };
}

export function updatePasswordStart() {
    return {
        type: UPDATE_PASSWORD_START,
    };
}

export function updatePasswordSuccess() {
    return {
        type: UPDATE_PASSWORD_SUCCESS,
    };
}

export function updatePasswordFailed(error) {
    return {
        type: UPDATE_PASSWORD_FAILED,
        error,
    };
}

export function createWork(work) {
    return dispatch => {
        dispatch(createWorkStart(work));
        axios
            .post(ENDPOINT_USER_WORK, work)
            .then(function(response) {
                dispatch(createWorkSuccess(response.data));
            })
            .catch(function(error) {
                dispatch(
                    createWorkFailed(
                        error.response ? error.response.data : null
                    )
                );
            });
    };
}

export function createWorkStart(work) {
    return {
        type: CREATE_WORK_START,
        work,
    };
}

export function createWorkSuccess(work) {
    return {
        type: CREATE_WORK_SUCCESS,
        work,
    };
}

export function createWorkFailed(error) {
    return {
        type: CREATE_WORK_FAILED,
        error,
    };
}

export function updateWork(id, data) {
    return dispatch => {
        dispatch(updateWorkStart(id));
        axios
            .patch(ENDPOINT_USER_WORK + id + '/', data)
            .then(function(response) {
                dispatch(updateWorkSuccess(response.data));
            })
            .catch(function(error) {
                dispatch(
                    updateWorkFailed(
                        error.response ? error.response.data : null
                    )
                );
            });
    };
}

export function updateWorkStart(id) {
    return {
        type: UPDATE_WORK_START,
        id,
    };
}

export function updateWorkSuccess(work) {
    return {
        type: UPDATE_WORK_SUCCESS,
        work,
    };
}

export function updateWorkFailed(error) {
    return {
        type: UPDATE_WORK_FAILED,
        error,
    };
}

export function createEducation(education) {
    return dispatch => {
        dispatch(createEducationStart(education));
        axios
            .post(ENDPOINT_USER_EDUCATION, education)
            .then(function(response) {
                dispatch(createEducationSuccess(response.data));
            })
            .catch(function(error) {
                dispatch(
                    createEducationFailed(
                        error.response ? error.response.data : null
                    )
                );
            });
    };
}

export function createEducationStart(education) {
    return {
        type: CREATE_EDUCATION_START,
        education,
    };
}

export function createEducationSuccess(education) {
    return {
        type: CREATE_EDUCATION_SUCCESS,
        education,
    };
}

export function createEducationFailed(error) {
    return {
        type: CREATE_EDUCATION_FAILED,
        error,
    };
}

export function updateEducation(id, data) {
    return dispatch => {
        dispatch(updateEducationStart(id));
        axios
            .patch(ENDPOINT_USER_EDUCATION + id + '/', data)
            .then(function(response) {
                dispatch(updateEducationSuccess(response.data));
            })
            .catch(function(error) {
                dispatch(
                    updateEducationFailed(
                        error.response ? error.response.data : null
                    )
                );
            });
    };
}

export function updateEducationStart(id) {
    return {
        type: UPDATE_EDUCATION_START,
        id,
    };
}

export function updateEducationSuccess(education) {
    return {
        type: UPDATE_EDUCATION_SUCCESS,
        education,
    };
}

export function updateEducationFailed(error) {
    return {
        type: UPDATE_EDUCATION_FAILED,
        error,
    };
}

export function getCountries() {
    return dispatch => {
        dispatch(getCountriesStart());
        axios
            .get(ENDPOINT_COUNTRIES)
            .then(function(response) {
                dispatch(getCountriesSuccess(response.data));
            })
            .catch(function(error) {
                dispatch(
                    getCountriesFailed(
                        error.response ? error.response.data : null
                    )
                );
            });
    };
}

export function getCountriesStart() {
    return {
        type: GET_COUNTRIES_START,
    };
}

export function getCountriesSuccess(countries) {
    return {
        type: GET_COUNTRIES_SUCCESS,
        countries,
    };
}

export function getCountriesFailed(error) {
    return {
        type: GET_COUNTRIES_FAILED,
        error,
    };
}

export function updateCompany(id, company) {
    return dispatch => {
        dispatch(updateCompanyStart(id, company));
        let request_method = id ? 'patch' : 'post';

        let headers = {},
            data = company;
        if (company && company.user && company.user.image) {
            headers['Content-Type'] = 'multipart/form-data';
            data = composeFormData(company);
        }

        axios
            .request({
                url: ENDPOINT_COMPANY,
                method: request_method,
                data,
                headers,
            })
            .then(function(response) {
                dispatch(updateCompanySuccess(response.data, id));
            })
            .catch(function(error) {
                dispatch(
                    updateCompanyFailed(
                        error.response ? error.response.data : null,
                        id
                    )
                );
            });
    };
}

export function updateCompanyStart(id, company) {
    return {
        type: UPDATE_COMPANY_START,
        id,
        company
    };
}

export function updateCompanySuccess(company, id) {
    return {
        type: UPDATE_COMPANY_SUCCESS,
        company,
        id
    };
}

export function updateCompanyFailed(error, id) {
    return {
        type: UPDATE_COMPANY_FAILED,
        error,
        id
    };
}

export function getNotifications() {
    return dispatch => {
        dispatch(getNotificationsStart());
        axios
            .get(ENDPOINT_NOTIFICATIONS)
            .then(function(response) {
                dispatch(getNotificationsSuccess(response.data));
            })
            .catch(function(error) {
                dispatch(getNotificationsFailed(error.response?error.response.data:null));
            });
    };
}

export function getNotificationsStart() {
    return {
        type: GET_NOTIFICATIONS_START,
    };
}

export function getNotificationsSuccess(notifications) {
    return {
        type: GET_NOTIFICATIONS_SUCCESS,
        notifications,
    };
}

export function getNotificationsFailed(error) {
    return {
        type: GET_NOTIFICATIONS_FAILED,
        error,
    };
}

export function createNotificationLog(notification_log) {
    return dispatch => {
        dispatch(createNotificationLogStart(notification_log));
        axios
            .post(ENDPOINT_NOTIFICATION_LOG, notification_log)
            .then(function(response) {
                dispatch(createNotificationLogSuccess(response.data));
            })
            .catch(function(error) {
                dispatch(
                    createNotificationLogFailed(
                        error.response ? error.response.data : null
                    )
                );
            });
    };
}

export function createNotificationLogStart(notification_log) {
    return {
        type: CREATE_NOTIFICATION_LOG_START,
        notification_log,
    };
}

export function createNotificationLogSuccess(notification_log) {
    return {
        type: CREATE_NOTIFICATION_LOG_SUCCESS,
        notification_log,
    };
}

export function createNotificationLogFailed(error) {
    return {
        type: CREATE_NOTIFICATION_LOG_FAILED,
        error,
    };
}

export function createVisitor(data) {
    return dispatch => {
        dispatch(createVisitorStart(data));
        axios
            .post(ENDPOINT_VISITORS, data)
            .then(function(response) {
                dispatch(createVisitorSuccess(response.data));
            })
            .catch(function(error) {
                dispatch(
                    createVisitorFailure(
                        error.response ? error.response.data : null
                    )
                );
            });
    };
}

export function createVisitorStart(data) {
    return {
        type: CREATE_VISITORS_START,
        data,
    };
}

export function createVisitorSuccess(data) {
    return {
        type: CREATE_VISITORS_SUCCESS,
        data,
    };
}

export function createVisitorFailure(error) {
    return {
        type: CREATE_VISITORS_FAILED,
        error,
    };
}
