
import React from 'react';
import { List } from 'antd-mobile';

export default class UserItem extends React.Component {

  render() {
    const {user} = this.props;

    return (
      <List.Item>
        昵称：{user.name}
        <br />
        角色：{user.role}
        <br />
        电话：{user.phone}
      </List.Item>
    );
  }
}
