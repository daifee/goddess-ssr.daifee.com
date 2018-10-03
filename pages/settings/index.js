
import React from 'react';
import {SubPage} from '../../components/Page';
import { List, WhiteSpace } from 'antd-mobile';
import {dispatch as globalDispatch} from '../../store';

import pkg from '../../../package.json';

import './styles.css';

class Settings extends React.Component {
  pushAbout = () => {
    const {history} = this.props;
    history.push('/about');
  };

  pushAllUsers = () => {
    const {history} = this.props;
    history.push('/admin/users');
  };

  pushAllBlogs = () => {
    const {history} = this.props;
    history.push('/admin/blogs');
  };

  handleLogout = async () => {
    const {history} = this.props;
    await globalDispatch('me/deauthorize');

    history.replace('/');
  };

  render() {
    const {user} = this.props;

    return (
      <SubPage id='settings' navBar={{children: '设置'}}>

        <WhiteSpace />

        <List className='section-1'>
          <List.Item
            arrow='horizontal'
            onClick={this.pushAbout}
            extra='daifee.com'
          >
            关于
          </List.Item>
        </List>

        {user && user.role === 'admin' ? (
          <React.Fragment>
            <WhiteSpace />
            <List>
              <List.Item arrow='horizontal' onClick={this.pushAllUsers}>
                所有用户
              </List.Item>
              <List.Item arrow='horizontal' onClick={this.pushAllBlogs}>
                所有微博
              </List.Item>
            </List>
          </React.Fragment>
        ) : null}

        <WhiteSpace />

        <List className='logout'>
          <List.Item onClick={this.handleLogout}>
            退出登录
          </List.Item>
        </List>

        <WhiteSpace />
        <WhiteSpace />

        <div className='version'>版本号 {pkg.version}</div>
      </SubPage>
    );
  }
}

export default Settings;
