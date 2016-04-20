// Import NPM dependencies like this:
import React from 'react';
import ReactDOM from 'react-dom';

// Import styles like this:
import './styles/main.scss';

// Import dependencies like this:
import Goat from './components/goat-component';
import Player from './components/player-component';

class App extends React.Component {
  render() {
    return (
      <div><Player /></div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('app'));
ReactDOM.render(<App />, document.getElementById('player'));
