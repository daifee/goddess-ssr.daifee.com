
import React from 'react';
import Head from 'next/head';
import {SubPage} from '../../components/Page';

import {
  connect
} from '../../store';

const TITLE = '关于';

class About extends React.Component {

  render() {
    return (
      <SubPage id='settings' navBar={{children: TITLE}}>
        <Head>
          <title>{TITLE}</title>
        </Head>
        <h1>goddess-ssr.daifee.com</h1>
        <p>React同构应用</p>
      </SubPage>
    );
  }
}

export default connect()(About);
