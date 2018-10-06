import React from 'react';
import Head from 'next/head';
import {SubPage} from '../../components/Page';
import './styles.scss';

const TITLE = 'daifee.com';

export default class NotFound extends React.Component {

  render() {
    return (
      <SubPage
        id='notfound'
        navBar={{children: TITLE}}
      >
        <Head><title>{TITLE}</title></Head>
        <h1>404</h1>
        <p>daifee.com</p>
      </SubPage>
    );
  }
}
