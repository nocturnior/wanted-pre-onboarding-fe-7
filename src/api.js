import axios from 'axios';

// WHAT Axios config
export const getAPIHost = () => {
  return 'https://pre-onboarding-selection-task.shop/';
};

export const authApi = axios.create({
  baseUrl: getAPIHost(),
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.setItem('access_token')}`,
  },
  withCredentials: true,
});

// WHAT 비동기 실행
authApi.interceptors.request.use(
  config => {
    config.headers['Authorization'] = localStorage.getItem('access_token');
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);
