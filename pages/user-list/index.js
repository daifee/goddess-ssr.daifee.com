import React from 'react';
import {SubPage} from '../../components/Page';
import {
  dispatch as globalDispatch,
  connect
} from '../../store';
import {dispatch, getState} from './store';
import UserList from '../../components/UserList';
import { WhiteSpace } from 'antd-mobile';
import './styles.scss';
import { SUCCESS, shouldBlock } from '../../utils/status';

class UserListPage extends React.Component {
  static getInitialProps = async (ctx) => {
    await globalDispatch('me/reauthorize', ctx);
  };

  handleEndReached = () => {
    const {page, status} = this.props;

    if (shouldBlock(status)) {
      return;
    }

    if (status === SUCCESS) {
      dispatch('userList/get', {page: (page + 1)});
    } else {
      dispatch('userList/get', {page: page});
    }
  };

  componentDidMount() {
    this.initData();
  }

  initData() {
    dispatch('userList/get', {page: 1});
  }

  render() {
    const {status, userList} = this.props;

    return (
      <SubPage id='user-list' navBar={{children: '所有用户'}}>
        <WhiteSpace />
        <UserList
          userList={userList}
          status={status}
          onEndReached={this.handleEndReached}
        />
      </SubPage>
    );
  }
}


export default connect((rootState, props) => {
  const {userList} = getState(rootState);

  return {
    status: userList.status,
    userList: userList.data,
    page: userList.page,
    ...props
  };
})(UserListPage);
