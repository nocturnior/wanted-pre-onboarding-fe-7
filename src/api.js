import axios from 'axios';

// WHAT Axios Instance Config
export const getAPIHost = () => {
  return 'https://pre-onboarding-selection-task.shop/';
};

export const authApi = axios.create({
  baseUrl: getAPIHost(),
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    // Authorization: localStorage.getItem('access_token'),
  },
  withCredentials: true,
});

// WHAT 비동기 실행
authApi.interceptors.request.use(
  config => {
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
    // config.headers['Authorization'] = localStorage.getItem('access_token');
    return config;
  },
  err => {
    const status = err.response?.status;
    if (status === 403 || status === 401) {
      const refresh_token = getToken();
      if (refresh_token) {
        axios
          .post(
            getAPIHost() + '/todos',
            {
              headers: {
                refresh_token: `${refresh_token}`,
              },
            },
            { withCredentials: true }
          )
          .then(req => {
            setToken(req.data);
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
    return Promise.reject(err);
  }
);

export const getToken = () => {
  const item = localStorage.getItem('access_token');
  if (item) {
    const token = JSON.parse(item);
    return token;
  }
  return false;
};

export const setToken = token => {
  if (!token?.access_token) {
    localStorage.setItem('access_token', '');
    return false;
  }
  const { access_token, refresh_token } = token;
  const auth_data = {
    access_token,
    refresh_token,
  };
  localStorage.setItem(localStorage, JSON.stringify(auth_data));
  return auth_data;
};
