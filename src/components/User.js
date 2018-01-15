import React, { Component } from 'react';

class User extends Component {
  constructor(props) {
    super(props);
  }

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
      <div>
        <section>
          Signed in as {this.props.user ? this.props.user.displayName : "Guest"}
        </section>
        <section>
          <button onClick={this.signIn}>Sign In</button>
          <button onClick={this.signOut}>Sign out</button>
        </section>
      </div>
    );
  }
}

export default User;