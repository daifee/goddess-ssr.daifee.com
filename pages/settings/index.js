
import React from 'react';
import {withRouter} from 'next/router';
import {SubPage} from '../../components/Page';
import { List, WhiteSpace } from 'antd-mobile';
import {
  dispatch as globalDispatch,
  selector as globalStateSelector,
  connect
} from '../../store';
import pkg from '../../package.json';
import './styles.scss';

class Settings extends React.Component {
  static getInitialProps = async (ctx) => {
    await globalDispatch('me/reauthorize', ctx);
  };

  pushAbout = () => {
    const {router} = this.props;
    router.push('/about');
  };

  pushAllUsers = () => {
    const {router} = this.props;
    router.push('/user-list', '/admin/users');
  };

  pushAllBlogs = () => {
    const {router} = this.props;
    router.push('/blog-list', '/admin/blogs');
  };

  handleLogout = async () => {
    const {router} = this.props;
    await globalDispatch('me/deauthorize');

    router.replace('/home', '/');
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

export default connect((rootState, props) => {
  const user = globalStateSelector.user(rootState);

  return {
    user,
    ...props
  };
})(withRouter(Settings));
