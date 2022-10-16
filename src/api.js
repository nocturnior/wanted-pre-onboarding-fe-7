import axios from 'axios';

// const token = sessionStorage.getItem('access_token');

export const getAPIHost = () => {
  return 'https://pre-onboarding-selection-task.shop/';
};

export const authApi = axios.create({
  baseUrl: getAPIHost(),
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}` },
  withCredentials: true,
});
authApi.interceptors.request.use(
  config => {
    config.headers['Authorization'] = localStorage.getItem('token');
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);
