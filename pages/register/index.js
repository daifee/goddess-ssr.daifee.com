import React from 'react';
import Link from 'next/link';
import {withRouter} from 'next/router';
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


class Register extends React.Component {
  handleInputPhone = (value) => {
    dispatch('user/setPhone', value.trim());
  };

  handleInputName = (value) => {
    dispatch('user/setName', value.trim());
  };

  handleInputPassword = (value) => {
    dispatch('user/setPassword', value.trim());
  };

  handleInputRepeatPassword = (value) => {
    dispatch('user/setRepeatPassword', value.trim());
  };

  handleSubmit = async () => {
    let {phone, name, repeatPassword, password, router} = this.props;
    phone = phone.replace(/ /g, '');

    if (!utilUser.isPhone(phone)) {
      Toast.fail('手机号码格式错误');
    } else if (!utilUser.isName(name)) {
      Toast.fail('昵称格式错误');
    } else if (!utilUser.isPassword(password)) {
      Toast.fail('密码格式错误');
    } else if (password !== repeatPassword) {
      Toast.fail('密码不一致');
    } else {
      const user = await globalDispatch('me/register', {phone, name, password, repeatPassword});
      if (user instanceof Error) {
        Toast.fail(user.message);
      } else {
        Toast.success(`欢迎，${user.name}`);
        router.replace(`/users/${user.id}`);
      }
    }
  };

  render() {
    const {phone, name, password, repeatPassword, me} = this.props;
    const disabled = !(phone && name && password && repeatPassword);

    return (
      <SubPage id='register' navBar={{children: '注册'}}>
        <h1 className='title'>daifee.com</h1>
        <List>
          <InputItem
            type='phone'
            labelNumber={5}
            placeholder='11位数字'
            value={phone}
            onChange={this.handleInputPhone}
          >
            手机号
          </InputItem>
          <InputItem
            type='text'
            labelNumber={5}
            placeholder='不能超过40个字符'
            value={name}
            onChange={this.handleInputName}
          >
            昵称
          </InputItem>
          <InputItem
            type='password'
            labelNumber={5}
            placeholder='6~60位字符'
            value={password}
            onChange={this.handleInputPassword}
          >
            密码
          </InputItem>
          <InputItem
            type='password'
            labelNumber={5}
            placeholder='6~60位字符'
            value={repeatPassword}
            onChange={this.handleInputRepeatPassword}
          >
            确认密码
          </InputItem>
        </List>
        <WingBlank>
          <WhiteSpace />
          <WhiteSpace />
          <WhiteSpace />
          <Button
            type='primary'
            disabled={disabled}
            loading={me.status === PENDING}
            onClick={this.handleSubmit}
          >
            注册
          </Button>
          <WhiteSpace />
          <p className='login'>
            <Link href='/login'><a>登录</a></Link>
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
    me: globalState.me,
    ...user,
    ...props
  };
})(withRouter(Register));
