
import {ASYNC_STATE, PENDING, FAILURE, SUCCESS, END} from '../../../utils/status';
import * as serviceUser from '../../../services/user';


export const userList = {
  state: {
    ...ASYNC_STATE,
    data: [],
    page: 1, // 当前页码
    perPage: 10
  },

  reducers: {
    setPending(state, message = 'loading...') {
      return {...state, message, status: PENDING};
    },

    setFailure(state, message = '失败') {
      return {...state, message, status: FAILURE};
    },

    addData(state, {userList, page, perPage}) {
      const data = page > 1 ?state.data.concat(userList) : userList;
      return {
        ...state,
        data,
        page,
        perPage,
        status: userList.length < perPage ? END : SUCCESS,
        message: '加载成功'
      };
    },
  },

  effects: {
    /**
     * 获取用户微博列表
     * @param {object} params 参数项
     * @property {string} params.userId 用户ID
     * @property {number} [params.page] 页码
     * @property {number} [params.perPage] 每页数量
     */
    async get({userId, page = 1, perPage = 10}) {
      this.setPending();
      try {
        const userList = await serviceUser
          .listForAdmin(page, perPage);

        this.addData({userList, page, perPage});

        return userList;
      } catch (error) {
        this.setFailure(error);
        return error;
      }
    }
  }
};
