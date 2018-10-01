/**
 * http请求实例
 */
import axios from 'axios';
import {getState as getGlobalState, getStore} from '../store';

function createHttpError(code, message, stackId) {
  const error = new Error(message);
  error.name = 'HttpError';
  error.code = code;
  error.stackId = stackId;

  return error;
}

export const goddess = axios.create({
  baseURL: 'https://goddess.daifee.com/api/',
  timeout: 3000,
  headers: {
    'content-type': 'application/json',
    'accept': 'application'
  }
});

goddess.interceptors.request.use((config) => {
  const store = getStore();
  const rootState = store.getState();
  const state = getGlobalState(rootState);
  const user = state.me.data;

  if (user) {
    config = {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${user.token}`
      }
    };
  }

  // authorization
  return config;
});

goddess.interceptors.response.use((response) => {
  const body = response.data;
  // 响应100~200，但code!=0 不会出现这种情况
  if (body.code) {
    const error = createHttpError(body.code, body.message, body.strackId);
    throw error;
  } else {
    return body.data;
  }
}, (error) => {
  if (error.name === 'HttpError') {
    throw error;
  }
  // 服务端响应错误
  if (error.response) {
    const body = error.response.data;
    error = createHttpError(body.code, body.message, body.strackId);
    throw error;
  } else {
    // 客户端发起请求就出错率
    throw error;
  }
});
