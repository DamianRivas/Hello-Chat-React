import React, { Component } from 'react';
import * as firebase from 'firebase';
import Roomlist from './components/Roomlist';
import MessageList from './components/MessageList';
import User from './components/User';
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
      activeRoom: null,
      user: null
      // Both activeRoom and user are objects
    }
  }

  setActiveRoom(room) {
    this.setState({ activeRoom: room });
  }

  setUser(user) {
    this.setState({ user: user });
  }

  render() {
    return (
      <div className="App">
        <Roomlist firebase={firebase} activeRoom={this.state.activeRoom} setActiveRoom={(room) => this.setActiveRoom(room)} />
        <main>
          <User firebase={firebase} setUser={(user) => this.setUser(user)} user={this.state.user} />
          <section className="messages">
            {
              this.state.activeRoom ?
                <MessageList firebase={firebase} activeRoom={this.state.activeRoom} user={this.state.user} /> :
                <h3>Click on a room to start chatting!</h3>
            }
          </section>
        </main>
      </div>
    );
  }
}

export default App;
