import React, { Component } from 'react';
import * as firebase from 'firebase';
import Roomlist from './components/Roomlist';
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
        <header>
          <h1>Welcome to Hello Chat!</h1>
        </header>
        <main>
          <Roomlist firebase={firebase}/>
        </main>
      </div>
    );
  }
}

export default App;
