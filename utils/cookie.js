/**
 * 只能用此模块操作的接口cookie
 */

function isServer(ctx) {
  return ctx && ctx.req && ctx.res;
}

export const isomorphism = {
  get(ctx, name) {
    if (isServer(ctx)) {
      const cookie = new Server(ctx);
      return cookie.get(name);
    } else {
      return client.get(name);
    }
  },

  remove(name, options) {
    throw new Error('TODO');
  },

  set(name, value, options) {
    throw new Error('TODO');
  }
};

export class Server {
  /**
   * 服务端cookie
   * @param {object} ctx http请求上下文
   */
  constructor(ctx) {
    this.req = ctx.req;
    this.res = ctx.res;
  }

  /**
   * 获取cookie值
   * @see `client.get(name)`
   */
  get(name) {
    const Cookie = require('cookie');
    const sCookies = this.req.headers.cookie || '';

    const cookie = Cookie.parse(sCookies) || {};
    let value = cookie[name] || '';
    try {
      value = JSON.parse(value);
    } catch (error) {
      // do nothing
    }

    return value;
  }

  set(name, value, options) {
    throw new Error('TODO');
  }

  remove(name, optoins) {
    throw new Error('TODO');
  }
}

/**
 * 客户端cookie
 */
export const client = {
  /**
   * 获取cookie值
   * @param {string} name cookie名称
   * @returns {string | object | array} 返回cookie值
   */
  get(name) {
    const Cookie = require('js-cookie');
    let value = Cookie.get(name);
    try {
      value = JSON.parse(value);
    } catch (error) {
      // do nothing
    }
    return value;
  },
  /**
   * 设置cookie
   * @param {string} name cookie名称
   * @param {string | array | object} value cookie值
   * @param {object} [options] cookie参数选项
   */
  set(name, value, options) {
    const Cookie = require('js-cookie');
    return Cookie.set(name, value, options);
  },
  /**
   * 移除cookie
   * @param {string} name cookie名称
   * @param {object} [options] cookie参数选项
   */
  remove(name, options) {
    const Cookie = require('js-cookie');
    return Cookie.remove(name, options);
  }
};

