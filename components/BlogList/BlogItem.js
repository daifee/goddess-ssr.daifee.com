import React from 'react';
import {WingBlank} from 'antd-mobile';


export default class BlogItem extends React.Component {

  render() {
    const {blog} = this.props;

    return (
      <WingBlank className='components-blog-list-item'>
        <p className='content'>​​​​{blog.text}</p>
        <div className='picture-wrap'>
          <ul>
            {blog.pictureUrls.map((url) => {
              return (
                <li key={url}>
                  <div className='placeholder' />
                  <div
                    className='img'
                    style={{
                      backgroundImage: `url(${url})`
                    }}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </WingBlank>
    );
  }
}
