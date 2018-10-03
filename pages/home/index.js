import React from 'react';
import {NavBar, Tabs} from 'antd-mobile';
import Router, {withRouter} from 'next/router';
import {getState, dispatch} from './store';
import {
  selector as globalStateSelector,
  connect
} from '../../store';
import Page from '../../components/Page';
import BlogList from '../../components/BlogList';
import {FAILURE, SUCCESS} from '../../utils/status';
import './styles.scss';


const TABS = [
  {title: '美女', type: 'goddess'},
  {title: '风景', type: 'landscape'},
  {title: '萌宠', type: 'animal'}
];

function getType(query = {}) {
  return query.type || 'goddess';
}

class Home extends React.Component {
  static getInitialProps = async ({query}) => {
    const type = getType(query);
    await dispatch(`${type}/get`);
  };

  handleLeftClick = () => {
    const {user} = this.props;
    if (user) {
      Router.push(`/users/${user.id}`);
    } else {
      Router.push('/login');
    }
  };

  handleRightClick = () => {
    Router.push('/blogs/edit');
  };

  handleTabClick = (tabData) => {
    const url = `/home?type=${tabData.type}`;
    Router.replace(url, url, {shallow: true});
  };

  componentDidMount() {
    const type = this.getPropsType();

    dispatch(`${type}/get`);
  }

  getPropsType() {
    const {router} = this.props;
    return getType(router.query);
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
          daifee.com
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

