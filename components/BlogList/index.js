import React from 'react';
import PropTypes from 'prop-types';
import {ListView} from 'antd-mobile';
import BlogList from './BlogList';

import './styles.scss';



export default class BlogListContainer extends BlogList {
  static propTypes = {
    blogList: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1.id !== row2.id,
    });
  }

  render() {
    const {blogList} = this.props;

    const dataSource = this.ds.cloneWithRows(blogList);

    return (<BlogList {...this.props} dataSource={dataSource} />)
  }
}
