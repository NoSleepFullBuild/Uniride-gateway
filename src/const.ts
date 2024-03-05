require('dotenv').config();

export const AUTH_API_URL = 'http://91.68.22.198:' + process.env.AUTH_PORT + '/api/auth';
export const USER_API_URL = 'http://91.68.22.198:' + process.env.USER_PORT + '/api/users';
export const TRIP_API_URL = 'http://91.68.22.198:' + process.env.TRIP_PORT + '/api/trips';
export const FEEDBACK_API_URL = 'http://91.68.22.198:' + process.env.FEEDBACK_PORT + '/api/feedbacks';