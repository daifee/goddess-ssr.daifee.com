/**
 * 存储store，解决循环依赖问题
 */
let store;

export function get() {
  return store;
}

export function set(value) {
  //
  store = value;
}
