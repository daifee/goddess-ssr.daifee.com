
import React from 'react';
import {SubPage} from '../../components/Page';
import BlogList from '../../components/BlogList';

import {dispatch, getState} from './store';
import {
  dispatch as globalDispatch,
  connect
} from '../../store';
import { SUCCESS, shouldBlock } from '../../utils/status';
import { WhiteSpace } from 'antd-mobile';
import './styles.scss';



class BlogListPage extends React.Component {
  static getInitialProps = async (ctx) => {
    await globalDispatch('me/reauthorize', ctx);
  };

  handleEndReached = () => {
    const {page, status} = this.props;

    if (shouldBlock(status)) {
      return;
    }

    if (status === SUCCESS) {
      dispatch('blogList/get', {page: (page + 1)});
    } else {
      dispatch('blogList/get', {page: page});
    }
  };

  componentDidMount() {
    this.initData();
  }

  initData() {
    dispatch('blogList/get', {page: 1});
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

  return {
    status: blogList.status,
    blogList: blogList.data,
    page: blogList.page,
    ...props
  };
})(BlogListPage);

