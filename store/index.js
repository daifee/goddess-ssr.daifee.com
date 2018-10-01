/**
 * store redux/rematch 多store方案
 * * 以页面为范围（scope），每个页面定义独立的store。
 * * 将所有页面的`scopeModels`合并为一个`models`，创建一个`store`对象。
 * * 因为每个页面都有独立的`dispatch(action)`, `getState()`接口，
 * * 所以结果是用一个store模拟出多store的假象。
 * *
 * * 像多store那样解决了命名冲突，使用却与单store一样简单。
 */

import { init } from '@rematch/core';
import {set as setStore, get as getStore} from './store';
import withRematch from './withRematch';
// 全局models
import {
  scopeModels as globalModels,
  getScopeState,
  scopeDispatch
} from './scope';
import * as selector from './selector';
// import {scopeModels as homeModels} from '../pages/Home/store';
// import {scopeModels as loginModels} from '../pages/Login/store';
// import {scopeModels as registerModels} from '../pages/Register/store';
// import {scopeModels as profileModels} from '../pages/Profile/store';
// import {scopeModels as userBlogListModels} from '../pages/UserBlogList/store';
// import {scopeModels as editBlogModels} from '../pages/EditBlog/store';
// import {scopeModels as userListModels} from '../pages/UserList/store';
// import {scopeModels as blogListModels} from '../pages/BlogList/store';

function initStore(initialState = {}) {
  const store = init({
    name: 'store',
    models: {
      ...globalModels,
      // ...homeModels,
      // ...loginModels,
      // ...registerModels,
      // ...profileModels,
      // ...userBlogListModels,
      // ...editBlogModels,
      // ...userListModels,
      // ...blogListModels
    },
    redux: {
      initialState
    }
  });

  // share
  setStore(store);

  return store;
}


export {
  initStore,
  withRematch,

  getStore,

  selector,
  getScopeState as getState,
  scopeDispatch as dispatch
};

