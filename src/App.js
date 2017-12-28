import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Grid from './grid.js';

class App extends Component {
  render() {
    return ([
      <div className="App">
      <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Welcome to Turtles All the Way Down</h1>
      </header>
      <p className="App-intro">
      To get started, edit <code>src/App.js</code> and save to reload.
      </p>
      <Grid />
      </div>
      ]);
    }
  }

  export default App;