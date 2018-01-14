import React, { Component } from 'react';
import * as firebase from 'firebase';
import Roomlist from './components/Roomlist';
import MessageList from './components/MessageList'
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
  constructor(props) {
    super(props);
    this.state = {
      activeRoom: null //THIS IS A ROOM OBJECT
    }
  }

  setActiveRoom(room) {
    console.log('Incoming room: ' + room);
    this.setState({ activeRoom: room });
    console.log('Active room is now ' + this.state.activeRoom)
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>Welcome to HelloChat!</h1>
        </header>
        <main>
          <Roomlist firebase={firebase} activeRoom={this.state.activeRoom} setActiveRoom={(room) => this.setActiveRoom(room)} />
          <h3>{this.state.activeRoom ? null : "Click on a room to start chatting!"}</h3>
          <MessageList firebase={firebase} activeRoom={this.state.activeRoom} />
        </main>
      </div>
    );
  }
}

export default App;
