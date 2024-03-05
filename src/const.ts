require('dotenv').config();

export const AUTH_API_URL = 'http://localhost:' + process.env.AUTH_PORT + '/api/auth';
export const USER_API_URL = 'http://localhost:' + process.env.USER_PORT + '/api/users';
export const TRIP_API_URL = 'http://localhost:' + process.env.TRIP_PORT + '/api/trips';
export const FEEDBACK_API_URL = 'http://localhost:' + process.env.FEEDBACK_PORT + '/api/feedbacks';