import React from 'react';
import {SubPage} from '../../components/Page';
import './styles.scss';

export default class NotFound extends React.Component {

  render() {
    return (
      <SubPage
        id='notfound'
        navBar={{children: 'daifee.com'}}
      >
        <h1>404</h1>
        <p>daifee.com</p>
      </SubPage>
    );
  }
}
