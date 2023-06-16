import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { Notification } from '@arco-design/web-react';

interface CustomAxios extends AxiosInstance {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (config: AxiosRequestConfig): Promise<any>;
}

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 10000,
});

// Request interceptors
service.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    // const token = '66668888';

    // token
    if (token) {
      config.headers.token = token;
    }

    return config;
  },
  error => Promise.reject(error)
);

// Response interceptors
service.interceptors.response.use(
  response => {
    const res = response.data;
    const { error } = res;

    if (error && error !== 0) {
      return Promise.reject(res);
    }

    return res;
  },
  error => {
    Notification.error({ title: '错误', content: error.message });
    return Promise.reject(error);
  }
);

export default service as CustomAxios;
