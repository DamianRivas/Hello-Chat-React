import React, { Component } from 'react';

class Roomlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newRoomName: '',
      rooms: []
    }

    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat(room) });
    });
  }

  handleChange(e) {
    this.setState({ newRoomName: e.target.value });
  }

  createRoom(e) {
    e.preventDefault();
    if(!this.state.newRoomName) { return }
    this.roomsRef.push({
      name: this.state.newRoomName
    });
    this.setState({ newRoomName: '' });
  }

  render() {
    return (
      <section className="sidebar">
        <ul className="roomlist">
          {
            this.state.rooms.map((room, index) =>
              <li key={index} onClick={() => this.props.setActiveRoom(room)}>{room.name}</li>
            )
          }
        </ul>
        <form onSubmit={(e) => this.createRoom(e)}>
          <input type="text" value={this.state.newRoomName} onChange={(e) => this.handleChange(e)}/>
          <input type="submit" />
        </form>
      </section>
    );
  }

}

export default Roomlist;