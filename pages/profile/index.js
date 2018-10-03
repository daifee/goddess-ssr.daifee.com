

import React from 'react';
import dayjs from 'dayjs';
import {withRouter} from 'next/router';
import {SubPage} from '../../components/Page';
import {
  getState as getGlobalState,
  dispatch as globalDispatch,
  connect
} from '../../store';
import BlogList from '../../components/BlogList';

import {dispatch, getState} from './store';

import './styles.css';
import { SUCCESS, shouldBlock } from '../../utils/status';


class Profile extends React.Component {
  static getInitialProps = async (ctx) => {
    await globalDispatch('me/reauthorize', ctx);
  };

  pushRecommended = () => {
    const {user, router} = this.props;
    const url = `/users/${user.id}/blogs/?recommended=all`;
    router.push(url);
  };

  pushLikes = () => {
    const {user, router} = this.props;
    router.push(`/users/${user.id}/likes/`);
  };

  pushSettings = () => {
    const {router} = this.props;
    router.push(`/settings`);
  };

  handleEndReached = () => {
    const {page, status, user} = this.props;

    if (shouldBlock(status)) {
      return;
    }

    if (status === SUCCESS) {
      dispatch('blogList/get', {userId: user.id, page: (page + 1)});
    } else {
      dispatch('blogList/get', {userId: user.id, page: page});
    }
  };

  componentDidMount() {
    this.initData();
  }

  initData() {
    const {user, page} = this.props;
    // 不是第一页，肯定是“返回”
    if (page !== 1) return;

    dispatch('blogList/get', {userId: user.id});
  }

  render() {
    const {user, status, blogList} = this.props;

    return (
      <SubPage id='profile' navBar={{children: user.name}}>
        <header>
          <div className='user'>
            <div className='avatar'>
              <img
                alt='头像'
                src='https://tva2.sinaimg.cn/crop.0.0.180.180.180/852a97e7jw1e8qgp5bmzyj2050050aa8.jpg'
              />
            </div>
            <div className='info'>
              <h2>{user.name}</h2>
              <p>{dayjs(user.createdAt).format('YYYY-MM-DD')}</p>
            </div>
          </div>
          <div className='gird-box'>
            <div onClick={this.pushRecommended}>
              <span>被推荐</span>
            </div>
            <div onClick={this.pushLikes}>
              <span>收藏</span>
            </div>
            <div onClick={this.pushSettings}>
              <span>设置</span>
            </div>
          </div>
        </header>

        <main>
          <BlogList
            blogList={blogList}
            status={status}
            onEndReached={this.handleEndReached}
          />
        </main>
      </SubPage>
    );
  }
}

export default connect((rootState, props) => {
  const globalState = getGlobalState(rootState);
  const {blogList} = getState(rootState);

  return {
    user: globalState.me.data,
    status: blogList.status,
    blogList: blogList.data,
    page: blogList.page,
    ...props
  };
})(withRouter(Profile));

