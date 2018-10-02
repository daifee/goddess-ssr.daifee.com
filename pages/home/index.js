
import {withRematch, initStore} from '../../store';
import {Button} from 'antd-mobile';


import './styles.scss';



class Home extends React.Component {
  render() {

    return (
      <div>
        <h1>Welcome to next.js!</h1>
        <Button type='primary'>按钮</Button>
      </div>
    );
  }
}


export default withRematch(initStore)(Home)
