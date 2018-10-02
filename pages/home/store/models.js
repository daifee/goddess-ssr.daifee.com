
import * as servicesMicroBlog from '../../../services/microBlog';
import {SUCCESS, FAILURE, PENDING, ASYNC_STATE} from '../../../utils/status';




function createModel(type) {
  return {
    state: {
      ...ASYNC_STATE,
      data: []
    },

    reducers: {
      set(state, blogList) {
        return {
          ...state,
          data: blogList,
          status: SUCCESS,
          message: '成功'
        };
      },
      setPending(state, message = 'loading...') {
        return {
          ...state,
          message,
          status: PENDING
        };
      },
      setFailure(state, error) {
        return {
          ...state,
          message: error,
          status: FAILURE
        };
      }
    },
    effects: {
      async get() {
        this.setPending();
        try {
          const blogList = await servicesMicroBlog.getRecommended(type);
          this.set(blogList);

          return blogList;
        } catch (error) {
          this.setFailure(error);

          return error;
        }
      }
    }
  };
}

export const goddess = createModel('goddess');

export const landscape = createModel('landscape');

export const animal = createModel('animal');
