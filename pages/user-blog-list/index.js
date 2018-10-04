
import React from 'react';
import {SubPage} from '../../components/Page';
import BlogList from '../../components/BlogList';
import {
  dispatch as globalDispatch,
  selector as globalSelector,
  connect
} from '../../store';
import {dispatch, getState} from './store';
import { SUCCESS, shouldBlock } from '../../utils/status';

import './styles.scss';
import { WhiteSpace } from 'antd-mobile';


class UserBlogList extends React.Component {
  static getInitialProps = async (ctx) => {
    await globalDispatch('me/reauthorize', ctx);
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
    const {status, blogList} = this.props;

    return (
      <SubPage id='user-blog-list' navBar={{children: '被推荐的微博'}}>
        <WhiteSpace />
        <BlogList
          blogList={blogList}
          status={status}
          onEndReached={this.handleEndReached}
        />
      </SubPage>
    );
  }
}


export default connect((rootState, props) => {
  const {blogList} = getState(rootState);
  const user = globalSelector.user(rootState);

  return {
    user,
    status: blogList.status,
    blogList: blogList.data,
    page: blogList.page,
    ...props
  };
})(UserBlogList);

