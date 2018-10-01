import React from 'react';
import PropTypes from 'prop-types';
import { INIT, PENDING, SUCCESS, FAILURE, END, CANCEL } from '../../utils/status';

export default class Status extends React.PureComponent {
  static propTypes = {
    status: PropTypes.oneOf([INIT, PENDING, SUCCESS, FAILURE, END, CANCEL])
  };

  render() {
    const {status} = this.props;
    let message;

    switch (status) {
      case SUCCESS:
        message = '成功加载数据！';
        break;
      case FAILURE:
        message = '加载数据失败！';
        break;
      case CANCEL:
        message = '取消加载数据！';
        break;
      case END:
        message = '没有更多数据了...';
        break;
      default:
        message = 'loading...';
    }

    return (
      <div
        className='components-blog-list-status'
      >
        {message}
      </div>
    );
  }
}
