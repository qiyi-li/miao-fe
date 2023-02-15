import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import { Toast } from 'vant';
import {
  mockItemCreate,
  mockItemIndex,
  mockItemIndexBalance,
  mockItemSummary,
  mockSession,
  mockTagCreate,
  mockTagIndex,
  mockTagShow
} from '../mock/mock';

export class Http {
  instance: AxiosInstance;

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL
    });
  }

  // read
  get<R = unknown>(url: string, query?: Record<string, string|number>, config?: Omit<AxiosRequestConfig, 'params' | 'url' | 'method'>) {
    return this.instance.request<R>({...config, url: url, params: query, method: 'get'});
  }

  // create
  post<R = unknown>(url: string, data?: Record<string, JSONValue>, config?: Omit<AxiosRequestConfig, 'url' | 'data' | 'method'>) {
    return this.instance.request<R>({...config, url, data, method: 'post'});
  }

  // update
  patch<R = unknown>(url: string, data?: Record<string, JSONValue>, config?: Omit<AxiosRequestConfig, 'url' | 'data'>) {
    return this.instance.request<R>({...config, url, data, method: 'patch'});
  }

  // destroy
  delete<R = unknown>(url: string, query?: Record<string, string>, config?: Omit<AxiosRequestConfig, 'params'>) {
    return this.instance.request<R>({...config, url: url, params: query, method: 'delete'});
  }
}


const mock = (response: AxiosResponse) => {
  if (true||location.hostname !== 'localhost'
    && location.hostname !== '127.0.0.1'
    && location.hostname !== '192.168.3.57') { return false; }
  switch (response.config?.params?._mock) {
    case 'tagIndex':
      [response.status, response.data] = mockTagIndex(response.config);
      return true;
    case 'session':
      [response.status, response.data] = mockSession(response.config);
      return true;
    case 'itemCreate':
      [response.status, response.data] = mockItemCreate(response.config);
      return true;
    case 'tagCreate':
      [response.status, response.data] = mockTagCreate(response.config);
      return true;
    case 'tagShow':
      [response.status, response.data] = mockTagShow(response.config);
      return true;
    case 'itemIndex':
      [response.status, response.data] = mockItemIndex(response.config)
      return true
    case 'itemIndexBalance':
      [response.status, response.data] = mockItemIndexBalance(response.config)
      return true
      case 'itemSummary':
      [response.status, response.data] = mockItemSummary(response.config)
      return true
    default:
      return false;
  }
};

export const http = new Http('/api/v1');

// set header
http.instance.interceptors.request.use(config => {
  const jwt = localStorage.getItem('jwt');
  if (jwt) {
    config.headers!.Authorization = `Bearer ${jwt}`;
  }
  if(config._loading===true){
    Toast.loading({
      message:'加载中',
      forbidClick:true,
      className:'toast-wrapper',
      duration:0
    })
  }
  return config;
});
http.instance.interceptors.response.use((res)=>{
  Toast.clear()
  return res
},(err)=>{
  Toast.clear()
  throw err
})
http.instance.interceptors.response.use(response => {
  mock(response);
  if(response.status>=400){
    throw {response};
  }else{
    return response
  }
}, (error) => {
  mock(error.response);
  if(error.response?.status>=400){
    throw error;
  }else{
    return error.response
  }
});
http.instance.interceptors.response.use(
  response => { return response },
  error => {
    if (error.response) {
      const axiosError = error as AxiosError
      if (axiosError.response?.status === 429) {
        alert('你太频繁了')
      }
    }
    throw error
  }
)
