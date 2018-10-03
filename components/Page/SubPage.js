/**
 * 二级页面，有默认`NavBar`:
 * * 左按钮：返回上一页
 * * 右按钮：返回首页
 * * 中间：title
 */

import React from 'react';
import PropTypes from 'prop-types';
import {NavBar} from 'antd-mobile';
import classNames from 'classnames';
import {withRouter} from 'next/router';

class SubPage extends React.Component {
  static propTypes = {
    navBar: PropTypes.shape({
      ...NavBar.propTypes
    })
  };

  static defaultProps = {
    navBar: {
      children: '标题'
    }
  };

  render() {
    const {children, navBar, className, staticContext, ...rest} = this.props;
    const cls = classNames('components-page components-sub-page', className)

    return (
      <main className={cls} {...rest}>
        {this.renderNavBar(navBar)}
        {children}
      </main>
    );
  }

  renderNavBar(props) {
    const {children, ...rest} = props;
    return (
      <NavBar
        mode='light'
        leftContent='返回'
        onLeftClick={this.handleBack}
        rightContent={(
          <div
            className='right-btn'
            onClick={this.handleHome}
          >
            <span>首页</span>
          </div>
        )}
        {...rest}
      >{children}</NavBar>
    );
  }

  handleBack = () => {
    const {router} = this.props;
    const history = window.history;
    if (history.length > 1) {
      history.back();
    } else {
      router.replace('/');
    }
  };

  handleHome = () => {
    const {router} = this.props;
    router.replace('/');
  };
}


export default withRouter(SubPage);
