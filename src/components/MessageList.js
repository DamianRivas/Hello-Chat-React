import React, { Component } from 'react'

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      displayedMessages: [],
      newMessage: ''
    }

    this.messagesRef = this.props.firebase.database().ref('messages/');
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat(message) });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.activeRoom !== prevProps.activeRoom || prevState.messages !== this.state.messages) {
      if (!this.props.activeRoom) { return }
      this.filterMessages();
    }
  }

  filterMessages() {
    const filteredMessages = this.state.messages.filter(message => message.roomId === this.props.activeRoom.key);
    this.setState({ displayedMessages: filteredMessages });
  }

  handleChange(e) {
    this.setState({ newMessage: e.target.value });
  }

  sendMessage(e) {
    e.preventDefault();

    if ( !this.state.newMessage || !this.props.activeRoom ) {
      console.log('Message not sent');
      return
    }

    const user = this.props.user ? this.props.user.displayName : "Guest";

    this.messagesRef.push({
      content: this.state.newMessage,
      roomId: this.props.activeRoom.key,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      username: user
    });

    this.setState({ newMessage: '' });
  }

  render() {
    return (
      <section className="activeMessages">
        <h2>{this.props.activeRoom ? this.props.activeRoom.name : null}</h2>
        <ul>
          {
            this.state.displayedMessages.map((message, index) => <li key={index}>{message.username + ": " + message.content}</li>)
          }
        </ul>
        <form onSubmit={(e) => this.sendMessage(e)}>
          <span>Send a message: </span>
          <input type="text" value={this.state.newMessage} onChange={(e) => this.handleChange(e)} />
          <input type="submit" />
        </form>
      </section>
    )
  }
}

export default MessageList