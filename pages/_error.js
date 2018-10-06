import React from 'react'

export default class Error extends React.Component {
  static getInitialProps(ctx) {
    const { res, err } = ctx;
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;

    if (statusCode === 404) {
      // ignore 404
    } else {
      // TODO log err
      console.error(err);
    }

    return { statusCode, err }
  }

  render() {
    const {statusCode} = this.props;

    if (statusCode === 404) {
      return this.renderNotFound();
    } else {
      return this.renderError();
    }
  }

  renderError() {
    const {statusCode, err} = this.props;

    return (
      <React.Fragment>
        <h1>Error</h1>
        <p>自定义错误页</p>
        <p>
          {statusCode ? '服务端错误' : '客户端错误'}，message:
          <br />
          {err ? err.message : '缺失错误信息'}
        </p>
      </React.Fragment>
    );
  }

  renderNotFound() {
    return (
      <React.Fragment>
        <h1>404</h1>
        <p>自定义404页面</p>
      </React.Fragment>
    );
  }
}
