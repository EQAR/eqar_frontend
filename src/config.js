import { BACKEND_DOMAIN } from './domainConfig';


export const ADMINAPI_URL = BACKEND_DOMAIN + '/adminapi/v1';
export const SUBMISSIONAPI_URL = BACKEND_DOMAIN + '/submissionapi/v1';
export const WEBAPI_URL = BACKEND_DOMAIN + '/webapi/v1';

export const GET_BADGES = ADMINAPI_URL + '/dashboard/badges/';
export const GET_REPORTS = ADMINAPI_URL + '/reports_by_agency/';
export const GET_COUNTRIES = ADMINAPI_URL + '/select/institutions/country/';
export const GET_INSTITUTIONS = ADMINAPI_URL + '/select/institutions/';
export const GET_AGENCIES = ADMINAPI_URL + '/select/agency/';
export const GET_STATUSES = ADMINAPI_URL + '/select/report_status/';
export const GET_DECISIONS = ADMINAPI_URL + '/select/report_decision/';
export const GET_ACTIVITIES = ADMINAPI_URL + '/select/agency_esg_activity/';
export const GET_QFEHEA_LEVELS = ADMINAPI_URL + '/select/qf_ehea_level/';
export const GET_LANGUAGES = ADMINAPI_URL + '/select/language';

export const GET_AGENCY = WEBAPI_URL + '/browse/agencies/';

export const GET_TOKEN = BACKEND_DOMAIN + '/accounts/get_token/';
export const POST_PASSWORD = BACKEND_DOMAIN + '/auth/password/';
export const POST_EMAIL = BACKEND_DOMAIN + '/accounts/change_email/';

export const POST_REPORT = SUBMISSIONAPI_URL + '/submit/report';
export const POST_FILE = SUBMISSIONAPI_URL + '/submit/reportfile';
