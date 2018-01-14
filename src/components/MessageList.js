import React, { Component } from 'react'

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      displayedMessages: []
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

  componentDidUpdate(prevProps) {
    if (this.props.activeRoom !== prevProps.activeRoom) {
      this.filterMessages();
    }
  }

  filterMessages() {
    const filteredMessages = this.state.messages.filter( message => message.roomId === this.props.activeRoom.key);
    this.setState({ displayedMessages: filteredMessages });
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
      </section>
    )
  }
}

export default MessageList