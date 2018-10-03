
import {ASYNC_STATE, PENDING, FAILURE, SUCCESS, END} from '../../../utils/status';
import * as serviceBlog from '../../../services/microBlog';


export const blogList = {
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

    addData(state, {blogList, page, perPage}) {
      const data = page > 1 ?state.data.concat(blogList) : blogList;
      return {
        ...state,
        data,
        page,
        perPage,
        status: blogList.length < perPage ? END : SUCCESS,
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
    async get({userId, page = 1, perPage = 5}) {
      this.setPending();
      try {
        const blogList = await serviceBlog
          .getListByUserId(userId, {page, perPage, recommended: 'all'});

        this.addData({blogList, page, perPage});

        return blogList;
      } catch (error) {
        this.setFailure(error);
        return error;
      }
    }
  }
};
