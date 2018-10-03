import React from 'react';
import { Toast, List, TextareaItem, WingBlank, WhiteSpace, ImagePicker, NavBar } from 'antd-mobile';
import {connect} from 'react-redux';
import {getState, dispatch} from './store';
import './styles.css';

class EditBlog extends React.Component {
  handleFilesChange = (files, type, index) => {
    dispatch('blog/setFiles', files);
  };

  handleTextChange = (value) => {
    dispatch('blog/setText', value);
  };

  handleCancel = () => {
    const {history} = this.props;
    history.goBack();
  };

  handlePublish = async () => {
    const {blog, user, history} = this.props;

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
      history.push(`/users/${user.id}`);
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
  return {...props, blog: state.blog};
})(EditBlog);
