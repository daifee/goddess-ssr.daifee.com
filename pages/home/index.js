
import {withRematch, initStore} from '../../store';
import './styles.scss';



class Home extends React.Component {
  render() {

    return (
      <div>
        <h1>Welcome to next.js!</h1>
      </div>
    );
  }
}


export default withRematch(initStore)(Home)
