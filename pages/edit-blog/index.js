import React from 'react';
import { Toast, List, TextareaItem, WingBlank, WhiteSpace, ImagePicker, NavBar } from 'antd-mobile';
import {withRouter} from 'next/router';
import {
  dispatch as globalDispatch,
  selector as globalSelector,
  connect
} from '../../store';
import {getState, dispatch} from './store';
import './styles.scss';

class EditBlog extends React.Component {
  static getInitialProps = async (ctx) => {
    await globalDispatch('me/reauthorize', ctx);
  };

  handleFilesChange = (files, type, index) => {
    dispatch('blog/setFiles', files);
  };

  handleTextChange = (value) => {
    dispatch('blog/setText', value);
  };

  handleCancel = () => {
    const history = window.history;
    history.back();
  };

  handlePublish = async () => {
    const {blog, user, router} = this.props;

    Toast.loading('发布中...');
    const result = await dispatch('blog/publish', {
      userId: user.id,
      text: blog.data.text,
      files: blog.data.files
    });
    Toast.hide();

    if (result instanceof Error) {
      Toast.fail(result.message);
    } else {
      Toast.success('发布成功!');
      router.push('/profile', `/users/${user.id}`);
    }
  };

  render() {
    const {blog} = this.props;

    return (
      <main id='edit-blog'>
        <NavBar
          mode='light'
          leftContent='取消'
          onLeftClick={this.handleCancel}
          rightContent={(
            <div
              className='right-btn'
              onClick={this.handlePublish}
            >
              <span>发布</span>
            </div>
          )}
        >
          发布微博
        </NavBar>

        <List>
          <TextareaItem
            onChange={this.handleTextChange}
            placeholder='请输入...'
            value={blog.data.text}
            autoHeight
            rows={2}
            count={140}
          />
        </List>

        <WhiteSpace />

        <WingBlank>
          <ImagePicker
            files={blog.data.files}
            onChange={this.handleFilesChange}
            selectable={blog.data.files.length < 9}
            multiple
            length={3}
          />
        </WingBlank>
      </main>
    );
  }
}

export default connect((rootState, props) => {
  const state = getState(rootState);
  const user = globalSelector.user(rootState);
  return {...props, blog: state.blog, user};
})(withRouter(EditBlog));
