import React, { Component } from 'react';

class Roomlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: []
    }

    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      console.log(room);
      this.setState({ rooms: this.state.rooms.concat(room) });
    });
  }

  render() {
    return (
      <ul className="roomlist">
        {
          this.state.rooms.map( (room, index) =>
            <li key={index}>{room.name}</li>
          )
        }
      </ul>
    );
  }

}

export default Roomlist;