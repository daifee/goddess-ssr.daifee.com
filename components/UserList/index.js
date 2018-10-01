import React from 'react';
import PropTypes from 'prop-types';
import {ListView} from 'antd-mobile';
import UserItem from './UserItem';
import classNames from 'classnames';
import Status from './Status';

export default class UserList extends React.Component {
  static propTypes = {
    userList: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1.id !== row2.id,
    });
  }

  render() {
    const {className, userList, ...rest} = this.props;
    const cls = classNames('components-user-list', className);

    const dataSource = this.ds.cloneWithRows(userList);

    return (
      <ListView
        initialListSize={20}
        onEndReachedThreshold={50}
        scrollRenderAheadDistance={500}
        renderFooter={this.renderFooter}
        renderRow={this.renderRow}
        useBodyScroll
        {...rest}
        className={cls}
        dataSource={dataSource}
      />
    );
  }

  renderRow(row, sectionId, rowId) {
    return (<UserItem user={row} />);
  }

  renderFooter = () => {
    const {status} = this.props;

    return (<Status status={status} />);
  }
}
