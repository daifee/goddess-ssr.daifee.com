
import {PENDING, SUCCESS, FAILURE, ASYNC_STATE} from '../../utils/status';
import * as serviceUser from '../../services/user';
import {
  client as clientCookie,
  isomorphism as isomorphismCookie
} from '../../utils/cookie';

const PERSISTENCE_KEY = 'persistence_me';

const INIT_STATE = {
  ...ASYNC_STATE
};

export default {
  state: INIT_STATE,

  reducers: {
    setPending(state, message = 'loading...') {
      return {...state, message, status: PENDING};
    },

    setFailure(state, message = '失败') {
      return {...state, message, status: FAILURE};
    },

    setData(state, user) {
      return {
        ...state,
        data: user,
        status: SUCCESS,
        message: '成功登录'
      };
    },

    remoteData(state) {
      return {...state, data: null, message: 'deauthorize'};
    }
  },

  effects: {
    async authorize(user) {
      this.setPending();
      try {
        user = await serviceUser.authorize(user);
        clientCookie.set(PERSISTENCE_KEY, user);

        this.setData(user);

        return user;
      } catch (error) {
        this.setFailure(error);

        return error;
      }
    },

    async reauthorize(ctx) {
      this.setPending('reauthorize');
      const user = isomorphismCookie.get(ctx, PERSISTENCE_KEY);

      if (user) {
        this.setData(user);
      } else {
        this.setFailure(new Error('未登录'));
      }
      return user;
    },

    async deauthorize() {
      clientCookie.remove(PERSISTENCE_KEY);
      this.remoteData();
    },

    async register(user) {
      this.setPending();
      try {
        user = await serviceUser.register(user);
        clientCookie.set(PERSISTENCE_KEY, user);

        this.setData(user);

        return user;
      } catch (error) {
        this.setFailure(error);

        return error;
      }
    }
  }
};
