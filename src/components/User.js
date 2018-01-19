import React, { Component } from 'react';
import '../styles/user.css'

class User extends Component {

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged(user => {
      this.props.setUser(user);
    })
  }

  signIn = () => {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup(provider);
  }

  signOut = () => {
    this.props.firebase.auth().signOut();
  }

  render() {
    return (
      <div className="user-signin">
        <section>
          Signed in as {this.props.user ? this.props.user.displayName : "Guest"}
        </section>
        <section>
          {this.props.user ? <button onClick={this.signOut}>Sign out</button> : <button onClick={this.signIn}>Sign In</button>}
        </section>
      </div>
    );
  }
}

export default User;