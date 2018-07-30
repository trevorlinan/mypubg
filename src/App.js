import React, { Component } from 'react';
import './App.css';

import Player from './components/player/Player';

class App extends Component {
  render() {
    return (
      <div className="mypubg">
          <h1>Welcome to MyPUBG.</h1>
          <Player />
      </div>
    );
  }
}

export default App;
