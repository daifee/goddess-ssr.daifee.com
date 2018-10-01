
import {goddess} from '../utils/http';


export async function listForAdmin(page = 1, perPage = 10) {
  const api = '/admin/users/';
  return await goddess.get(api, {params: {page, perPage}});
}

// 授权
export async function authorize(user) {
  const api = '/v1/authorization';
  return await goddess.post(api, user);
}

// 注册用户
export async function register(user) {
  const api = '/v1/users/';
  return await goddess.post(api, user);
}

// 获取 cos 临时key
export async function getCosKeys() {
  const api = '/v1/cos/sts';
  return await goddess.get(api);
}
