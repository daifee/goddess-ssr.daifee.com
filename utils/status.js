/**
 * 定义“异步状态”和“异步`state`结构”
 */

export const INIT = 'INIT';
export const PENDING = 'PENDING';
export const SUCCESS = 'SUCCESS';
export const END = 'END';
export const FAILURE = 'FAILURE';
export const CANCEL = 'CANCEL';

export function shouldBlock(status) {
  return isLoading(status) || status === END;
}

export function isLoading(status) {
  return status === INIT || status === PENDING;
}

export const ASYNC_STATE = {
  data: null, // 默认值
  status: INIT, // 统一定义异步初始状态
  message: '', // string | Error
};
