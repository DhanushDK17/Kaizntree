import axios from 'axios';
import { getCookie } from '.';

const getHeaders = () => {
  return {
    'X-CSRFToken': getCookie('csrftoken'),
    'Authorization': `Bearer ${getCookie('access_token')}`
  };
};

const createAxiosInstance = (service) => {
  const axiosInstance = axios.create({
    headers: {
      'Content-Type': 'application/json',
      ...getHeaders()
    },
  });

  const requestInterceptor = config => {
    return config;
  };

  const responseInterceptor = response => response;
  const errorInterceptor = error => {
    if (error.response && error.response.status === 401) {
      document.cookie = "sessionId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      // window.location.href = '/';
    }
    return Promise.reject(error);
  };

  axiosInstance.interceptors.request.use(requestInterceptor);
  axiosInstance.interceptors.response.use(responseInterceptor, errorInterceptor);

  return axiosInstance;
};

export const webApiService = createAxiosInstance("webService");
export default webApiService;
