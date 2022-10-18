import { authApi, setToken } from '../api';

export const userApis = {
  signin: async data => {
    const response = await authApi.post('/auth/signin', data);
    if (response.status === 200) {
      const token = { access_token: response.headers.authorization, refresh_token: response.headers['refresh-token'] };
      setToken(token);
    }
    return response;
  },
  signup: async data => {
    const response = await authApi.post('auth/signup', data);
    return response.data;
  },
  // Todos 영역
  getTodo: async data => {
    const response = await authApi.get('/todos', data);
    // console.log('🚀 ⁝ response', response);
    return response;
  },
  createTodo: async data => {
    const response = await authApi.post('/todos', data);
    return response;
  },
  updateTodo: async id => {
    const response = await authApi.put(`todos/` + id,{});
    return response;
  },
  deleteTodo: async id => {
    const response = await authApi.delete(`todos/` + id);
    return response;
  },
};
