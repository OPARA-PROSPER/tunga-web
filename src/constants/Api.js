import axios from 'axios'

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        function csrfSafeMethod(method) {
            // these HTTP methods do not require CSRF protection
            return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
        }

        if (!csrfSafeMethod(settings.type)) {
            xhr.setRequestHeader("X-CSRFToken", Cookies.get('csrftoken'));
        }
    },
    xhrFields: {
        withCredentials: true
    }
});

var BACKEND_PATH = '/';
var API_PATH = 'api/';
var SOCIAL_LOGIN_PATH = 'accounts/social/';
if(__DEV__) {
    BACKEND_PATH = 'http://localhost:8000/';
} else if(__PRERELEASE__) {
    BACKEND_PATH = 'http://test.tunga.io/';
}

const API_ROOT = BACKEND_PATH + API_PATH;
export default API_ROOT;

export const SOCIAL_LOGIN_PREFIX = BACKEND_PATH + SOCIAL_LOGIN_PATH;

function createSocialLoginUrl(provider) {
    return SOCIAL_LOGIN_PREFIX + provider + '/';
}

export const SOCIAL_LOGIN_URLS = {
    facebook: createSocialLoginUrl('facebook'),
    google: createSocialLoginUrl('google'),
    linkedin: createSocialLoginUrl('linkedin_oauth2'),
    github: createSocialLoginUrl('github')
};

function getEndpointUrl(path) {
    return API_ROOT + path;
}

export const ENDPOINT_LOGIN = getEndpointUrl('auth/login/');
export const ENDPOINT_LOGOUT = getEndpointUrl('auth/logout/');
export const ENDPOINT_VERIFY = getEndpointUrl('auth/verify/');
export const ENDPOINT_REGISTER = getEndpointUrl('auth/register/');
export const ENDPOINT_APPLY = getEndpointUrl('apply/');
export const ENDPOINT_CHANGE_PASSWORD = getEndpointUrl('auth/password/change/');
export const ENDPOINT_RESET_PASSWORD = getEndpointUrl('auth/password/reset/');
export const ENDPOINT_RESET_PASSWORD_CONFIRM = getEndpointUrl('auth/password/reset/confirm/');
export const ENDPOINT_PROFILE = getEndpointUrl('me/profile/');
export const ENDPOINT_NOTIFICATION = getEndpointUrl('me/notification/');
export const ENDPOINT_ACCOUNT_INFO = getEndpointUrl('me/account/');
export const ENDPOINT_ACCOUNT_SETTINGS = getEndpointUrl('me/settings/');
export const ENDPOINT_USER_INFO = getEndpointUrl('me/user/');
export const ENDPOINT_USER_EDUCATION = getEndpointUrl('me/education/');
export const ENDPOINT_USER_WORK = getEndpointUrl('me/work/');
export const ENDPOINT_MY_CODE = getEndpointUrl('me/code/');
export const ENDPOINT_PROJECT = getEndpointUrl('project/');
export const ENDPOINT_TASK = getEndpointUrl('task/');
export const ENDPOINT_USER = getEndpointUrl('user/');
export const ENDPOINT_COMMENT = getEndpointUrl('comment/');
export const ENDPOINT_CHANNEL = getEndpointUrl('channel/');
export const ENDPOINT_DIRECT_CHANNEL = getEndpointUrl('channel/direct/');
export const ENDPOINT_MESSAGE = getEndpointUrl('message/');
export const ENDPOINT_REPLY = getEndpointUrl('reply/');
export const ENDPOINT_CONNECTION = getEndpointUrl('connection/');
export const ENDPOINT_APPLICATION = getEndpointUrl('application/');
export const ENDPOINT_SAVED_TASK = getEndpointUrl('saved-task/');
export const ENDPOINT_MILESTONE = getEndpointUrl('progress-event/');
export const ENDPOINT_PROGRESS_REPORT = getEndpointUrl('progress-report/');
export const ENDPOINT_SKILL = getEndpointUrl('skill/');
export const ENDPOINT_COUNTRIES = getEndpointUrl('countries/');
export const ENDPOINT_CONTACT_REQUEST = getEndpointUrl('contact-request/');
export const ENDPOINT_SUPPORT_SECTION = getEndpointUrl('support/section/');
export const ENDPOINT_SUPPORT_PAGE = getEndpointUrl('support/page/');

export const USER_TYPE_DEVELOPER = 1;
export const USER_TYPE_PROJECT_OWNER = 2;

export const USER_TYPE_CHOICES = [
    {id: USER_TYPE_DEVELOPER, name: 'Developer'},
    {id: USER_TYPE_PROJECT_OWNER, name: 'Project Owner'}
];

export const VISIBILITY_DEVELOPERS = 1;
export const VISIBILITY_MY_TEAM = 2;
export const VISIBILITY_CUSTOM = 3;
export const VISIBILITY_ONLY_ME = 4;

export const TASK_VISIBILITY_CHOICES = [
    {id: VISIBILITY_DEVELOPERS, name: 'All developers'},
    {id: VISIBILITY_MY_TEAM, name: 'Only my team'},
    {id: VISIBILITY_CUSTOM, name: 'Select developer(s)'}
];

export const SETTINGS_VISIBILITY_CHOICES = [
    {id: VISIBILITY_DEVELOPERS, name: 'All developers'},
    {id: VISIBILITY_MY_TEAM, name: 'Only my team'},
    {id: VISIBILITY_ONLY_ME, name: 'Only me'}
];

export const UPDATE_INTERVAL_UNIT_HOURLY = 1
export const UPDATE_INTERVAL_UNIT_DAILY = 2
export const UPDATE_INTERVAL_UNIT_WEEKLY = 3
export const UPDATE_INTERVAL_UNIT_MONTHLY = 4
export const UPDATE_INTERVAL_UNIT_QUATERLY = 5
export const UPDATE_INTERVAL_UNIT_ANNUALLY = 6

export const UPDATE_SCHEDULE_CHOICES = [
    {number: 1, unit: UPDATE_INTERVAL_UNIT_DAILY, name: 'Daily'},
    {number: 2, unit: UPDATE_INTERVAL_UNIT_DAILY, name: 'Every 2 Days'},
    {number: 3, unit: UPDATE_INTERVAL_UNIT_DAILY, name: 'Every 3 Days'},
    {number: 4, unit: UPDATE_INTERVAL_UNIT_DAILY, name: 'Every 4 Days'},
    {number: 1, unit: UPDATE_INTERVAL_UNIT_WEEKLY, name: 'Weekly'},
];

export const RATING_CRITERIA_CODING = 1;
export const RATING_CRITERIA_COMMUNICATION = 2;
export const RATING_CRITERIA_SPEED = 3;

export const RATING_CRITERIA_CHOICES = [
    {id: RATING_CRITERIA_CODING, name: 'Coding skills'},
    {id: RATING_CRITERIA_COMMUNICATION, name: 'Communication skills'},
    {id: RATING_CRITERIA_SPEED, name: 'Speed'}
];

export const PROGRESS_REPORT_STATUS_ON_SCHEDULE = 1;
export const PROGRESS_REPORT_STATUS_BEHIND = 2;
export const PROGRESS_REPORT_STATUS_STUCK = 3;

export const PROGRESS_REPORT_STATUS_CHOICES = [
    {id: PROGRESS_REPORT_STATUS_ON_SCHEDULE, name: 'On schedule'},
    {id: PROGRESS_REPORT_STATUS_BEHIND, name: 'Behind'},
    {id: PROGRESS_REPORT_STATUS_STUCK, name: 'Stuck'}
];

export const INTEGRATION_TYPE_REPO = 1;
export const INTEGRATION_TYPE_ISSUE = 2;

export const INTEGRATION_TYPE_CHOICES = [
    {id: INTEGRATION_TYPE_REPO, name: 'Repository'},
    {id: INTEGRATION_TYPE_ISSUE, name: 'Issue'},
];

export const INTEGRATION_EVENT_PUSH = 'push';
export const INTEGRATION_EVENT_BRANCH = 'branch';
export const INTEGRATION_EVENT_TAG = 'tag';
export const INTEGRATION_EVENT_COMMIT_COMMENT = 'commit_comment';
export const INTEGRATION_EVENT_PULL_REQUEST = 'pull_request';
export const INTEGRATION_EVENT_PULL_REQUEST_COMMENT = 'pull_request_comment';
export const INTEGRATION_EVENT_ISSUE = 'issue';
export const INTEGRATION_EVENT_ISSUE_COMMENT = 'issue_comment';
export const INTEGRATION_EVENT_WIKI = 'wiki';
export const INTEGRATION_EVENT_RELEASE = 'release';

export const INTEGRATION_EVENT_CHOICES = [
    {'id': INTEGRATION_EVENT_PUSH, 'name': 'Push events'},
    {'id': INTEGRATION_EVENT_BRANCH, 'name': 'Branch creation and deletion'},
    {'id': INTEGRATION_EVENT_TAG, 'name': 'Tag creation and deletion'},
    {'id': INTEGRATION_EVENT_COMMIT_COMMENT, 'name': 'Commit comments'},
    {'id': INTEGRATION_EVENT_PULL_REQUEST, 'name': 'Pull requests'},
    {'id': INTEGRATION_EVENT_PULL_REQUEST_COMMENT, 'name': 'Pull request comments'},
    {'id': INTEGRATION_EVENT_ISSUE, 'name': 'Issue creation and modification'},
    {'id': INTEGRATION_EVENT_ISSUE_COMMENT, 'name': 'Issue comments'},
    {'id': INTEGRATION_EVENT_WIKI, 'name': 'Wiki updates'},
]
