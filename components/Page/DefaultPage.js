/**
 * 页面组件
 */

import React from 'react';
import classNames from 'classnames';

export default class SubPage extends React.Component {
  render() {
    const {children, className, ...rest} = this.props;
    const cls = classNames('components-page components-default-page', className)

    return (
      <main className={cls} {...rest}>
        {children}
      </main>
    );
  }
}
