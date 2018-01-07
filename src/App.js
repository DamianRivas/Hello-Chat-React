import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDeQm23_xQWke7xSOkgR0FoTTewqN3yc6o",
  authDomain: "hello-chat-d3208.firebaseapp.com",
  databaseURL: "https://hello-chat-d3208.firebaseio.com",
  projectId: "hello-chat-d3208",
  storageBucket: "hello-chat-d3208.appspot.com",
  messagingSenderId: "745938110606"
};
firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
