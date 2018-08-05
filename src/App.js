import React, { Component } from 'react';
import './App.css';

import Player from './components/players/Players';

class App extends Component {
  render() {
    return (
      <div className="mypubg">
          <h1>MyPUBG</h1>
          <Player />
      </div>
    );
  }
}

export default App;
