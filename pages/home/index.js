import React from 'react';
import Head from 'next/head';
import {NavBar, Tabs} from 'antd-mobile';
import {withRouter} from 'next/router';
import {getState, dispatch} from './store';
import {dispatch as globalDispatch} from '../../store';
import {
  selector as globalStateSelector,
  connect
} from '../../store';
import Page from '../../components/Page';
import BlogList from '../../components/BlogList';
import {FAILURE, SUCCESS} from '../../utils/status';
import './styles.scss';
import utilUrl from 'url';

const TITLE = 'daifee.com';

const TABS = [
  {title: '美女', type: 'goddess'},
  {title: '风景', type: 'landscape'},
  {title: '萌宠', type: 'animal'}
];

function getType(query = {}) {
  return query.type || 'goddess';
}

class Home extends React.Component {
  static getInitialProps = async (ctx) => {
    const type = getType(ctx.query);
    await globalDispatch('me/reauthorize', ctx);
    await dispatch(`${type}/get`);
  };

  handleLeftClick = () => {
    const {user, router} = this.props;
    if (user) {
      router.push('/profile', `/users/${user.id}`);
    } else {
      router.push('/login');
    }
  };

  handleRightClick = () => {
    const {router} = this.props;
    router.push('/edit-blog', '/blogs/edit');
  };

  handleTabClick = (tabData) => {
    const {router} = this.props;
    const url = `/?type=${tabData.type}`;
    router.replace('/home', url, {shallow: true});
  };

  handleRouteChange = (url) => {
    url = utilUrl.parse(url, true);
    const type = getType(url.query);
    dispatch(`${type}/get`);
  };

  componentDidMount() {
    const {router} = this.props;
    const type = this.getPropsType();

    // dispatch(`${type}/get`);
    router.events.on('routeChangeComplete', this.handleRouteChange);
  }

  componentWillUnmount() {
    const {router} = this.props;
    router.events.off('routeChangeComplete', this.handleRouteChange);
  }

  getPropsType() {
    const {router} = this.props;
    const url = utilUrl.parse(router.asPath, true);
    return getType(url.query);
  }

  getPropsTabState() {
    const type = this.getPropsType();
    return this.props[type] || {};
  }

  render() {
    const type = this.getPropsType();
    let page;

    TABS.forEach((item, index) => {
      if (item.type === type) page = index;
    });

    return (
      <Page id='home'>
        <Head><title>{TITLE}</title></Head>
        <NavBar
          mode='light'
          leftContent='我'
          onLeftClick={this.handleLeftClick}
          rightContent={(
            <div
              className='right-btn'
              onClick={this.handleRightClick}
            >
              <span>发布</span>
            </div>
          )}
        >
          {TITLE}
        </NavBar>
        <Tabs
          instanceId='home'
          animated={false}
          tabs={TABS}
          page={page}
          onTabClick={this.handleTabClick}
        >
          {this.renderContent()}
        </Tabs>
      </Page>
    );
  }

  renderContent = () => {
    const tabState = this.getPropsTabState();

    return (
      <div className='content'>
        <BlogList
          blogList={tabState.data}
          renderFooter={this.renderFooter}
        />
      </div>
    );
  }

  renderFooter = () => {
    const tabState = this.getPropsTabState(this.props);
    switch (tabState.status) {
      case SUCCESS:
        return (<footer>只显示2条内容...</footer>);
      case FAILURE:
        return (<footer>加载失败！</footer>);
      default:
        return (<footer>loading...</footer>);
    }
  }
}


export default connect((rootState, props) => {
  const state = getState(rootState);
  const user = globalStateSelector.user(rootState);

  return {
    user,
    ...state,
    ...props
  };
})(withRouter(Home));

