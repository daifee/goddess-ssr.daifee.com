import React from 'react';
import {connect} from 'react-redux';
import {SubPage} from '../../components/Page';
import {dispatch, getState} from './store';
import UserList from '../../components/UserList';
import { WhiteSpace } from 'antd-mobile';
import './styles.css';
import { SUCCESS, shouldBlock } from '../../utils/status';

class UserListPage extends React.Component {
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
