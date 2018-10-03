import React from 'react';
import Link from 'next/link';
import {Button, List, InputItem, WingBlank, WhiteSpace, Toast} from 'antd-mobile';
import {SubPage} from '../../components/Page';
import {getState, dispatch} from './store';
import {
  dispatch as globalDispatch,
  getState as getGlobalState,
  connect
} from '../../store';

import './styles.css';
import { PENDING } from '../../utils/status';
import * as utilUser from '../../utils/user';
import {withRouter} from 'next/router';


class Login extends React.Component {

  handleInputPhone = (value) => {
    dispatch('user/setPhone', value);
  };

  handleInputPassword = (value) => {
    dispatch('user/setPassword', value);
  };

  handleSubmit = async () => {
    let {phone, password, router} = this.props;
    phone = phone.replace(/ /g, '');
    if (!utilUser.isPhone(phone)) {
      Toast.fail('手机号码格式错误');
    } else if (!utilUser.isPassword(password)) {
      Toast.fail('密码格式错误');
    } else {
      const user = await globalDispatch('me/authorize', {phone, password});
      if (user instanceof Error) {
        Toast.fail(user.message);
      } else {
        Toast.success(`欢迎，${user.name}`);
        router.replace(`/users/${user.id}`);
      }
    }
  };

  render() {
    const {password, phone, me} = this.props;

    return (
      <SubPage id='login' navBar={{children: '登录'}}>
        <h1 className='title'>daifee.com</h1>
        <List>
          <InputItem
            type='phone'
            labelNumber={3}
            placeholder='11位数字'
            value={phone}
            onChange={this.handleInputPhone}
          >
            帐号
          </InputItem>
          <InputItem
            type='password'
            labelNumber={3}
            placeholder='6~60位字符'
            value={password}
            onChange={this.handleInputPassword}
          >
            密码
          </InputItem>
        </List>
        <WingBlank>
          <WhiteSpace />
          <WhiteSpace />
          <WhiteSpace />
          <Button
            type='primary'
            disabled={!phone || !password}
            loading={me.status === PENDING}
            onClick={this.handleSubmit}
          >
            登录
          </Button>
          <WhiteSpace />
          <p className='register'>
            <Link href='/register'><a>免费注册</a></Link>
          </p>
        </WingBlank>
      </SubPage>
    );
  }
}

export default connect((rootState, props) => {
  const state = getState(rootState);
  const globalState = getGlobalState(rootState);
  const user = state.user;
  return {
    phone: user.phone,
    password: user.password,
    me: globalState.me,
    ...props
  };
})(withRouter(Login));
