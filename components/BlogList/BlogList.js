import React from 'react';
// import PropTypes from 'prop-types';
import {ListView} from 'antd-mobile';
import BlogItem from './BlogItem';
import classNames from 'classnames';
import Status from './Status';

export default class BlogList extends React.Component {

  render() {
    const {className, ...rest} = this.props;
    const cls = classNames('components-blog-list', className);

    return (
      <ListView
        initialListSize={5}
        onEndReachedThreshold={50}
        scrollRenderAheadDistance={500}
        renderFooter={this.renderFooter}
        renderRow={this.renderRow}
        renderSeparator={this.renderSeparator}
        useBodyScroll
        {...rest}
        className={cls}
      />
    );
  }

  renderSeparator(sectionId, rowId) {
    const key = `${sectionId}-${rowId}`;
    return (<div className='blog-list-separator' key={key} />);
  }

  renderRow(row, sectionId, rowId) {
    return (<BlogItem blog={row} />);
  }

  renderFooter = () => {
    const {status} = this.props;

    return (<Status status={status} />);
  }
}
