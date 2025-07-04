
import axios from "axios"
import Cookies from 'js-cookie';

const baseApi = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API_URL,
  validateStatus: () => true,
  withCredentials: true,
})

baseApi.interceptors.request.use((config) => {
  const token = Cookies.get('session');  // Assuming session token is stored in cookies
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default baseApi;