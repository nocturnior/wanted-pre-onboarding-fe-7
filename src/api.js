import axios from 'axios';

// const token = sessionStorage.getItem('access_token');

export const getAPIHost = () => {
  return 'https://pre-onboarding-selection-task.shop/';
};

export const authApi = axios.create({
  baseUrl: getAPIHost(),
  headers: { 'Content-Type': 'application/json', withCredentials: true },
});

authApi.interceptors.request.use(req => {
  const token = getToken();
  if (token) {
    req.headers.authorization = token.access_token;
  }
  return req;
});

authApi.interceptors.response.use(
  res => res,
  err => {
    const status = err.response?.status;
    if (status === 403 || status === 401) {
      const refresh_token = getToken();
      if (refresh_token) {
        axios
          .post(getAPIHost() + '/api/auth/reissue', {
            headers: {
              refresh_token: `${refresh_token}`,
              'Content-Type': 'application/json',
            },
          })
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
  const item = localStorage.getItem(process.env.REACT_APP_TOKEN_SAVE_KEY);
  if (item) {
    const token = JSON.parse(item);
    return token;
  }
  return false;
};

export const setToken = token => {
  if (!token?.access_token) {
    localStorage.setItem(process.env.REACT_APP_TOKEN_SAVE_KEY, '');
    return false;
  }
  const { access_token, refresh_token } = token;
  const auth_data = {
    access_token,
    refresh_token,
  };
  localStorage.setItem(process.env.REACT_APP_TOKEN_SAVE_KEY, JSON.stringify(auth_data));
  return auth_data;
};

export const removeToken = () => {
  const keyName = process.env.REACT_APP_TOKEN_SAVE_KEY;
  localStorage.removeItem(keyName);
};

// 기본부분
// let api;

// if (token) {
//   const bearerToken = 'Bearer ' + token;
//   api = axios.create({ baseURL: 'https://pre-onboarding-selection-task.shop/', headers: { authorization: bearerToken } });
// } else {
//   api = axios.create({ baseURL: 'https://pre-onboarding-selection-task.shop/' });
// }

// export default api;
