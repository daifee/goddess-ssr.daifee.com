
import {ASYNC_STATE, PENDING, FAILURE, SUCCESS} from '../../../utils/status';
import * as serviceBlog from '../../../services/microBlog';
import * as servicePicture from '../../../services/picture';
import * as profileStore from '../../profile/store';

const INIT_STATE = {
  ...ASYNC_STATE,
  data: {
    files: [],
    text: ''
  }
};

export const blog = {
  state: INIT_STATE,

  reducers: {
    setPending(state, message = 'loading...') {
      return {...state, message, status: PENDING};
    },

    setFailure(state, message = '失败') {
      return {...state, message, status: FAILURE};
    },

    setSuccess(state, message = '发布成功') {
      return {...INIT_STATE, message, status: SUCCESS};
    },

    setText(state, text = '') {
      text = text.substring(0, 140);
      return {...state, data: {...state.data, text}};
    },

    setFiles(state, files = []) {
      files = files.slice(0, 9);
      return {...state, data: {...state.data, files}};
    }
  },

  effects: {
    async publish({userId, text, files}) {
      files = files.slice(0, 9);

      this.setPending();
      try {
        const pictureUrls = [];
        // 上传图片
        for (let i = 0; i < files.length; i++) {
          const file = files[i].file;
          const data = await servicePicture.upload(userId, file);
          const url = `https://${data.Location}`;
          pictureUrls.push(url);
        }

        const blog = await serviceBlog.post(userId, {text, pictureUrls});
        profileStore.dispatch('blogList/addNewBlog', blog);
        this.setSuccess();
        return blog;
      } catch (error) {
        this.setFailure(error);
        return error;
      }
    }
  }
};
