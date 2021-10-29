import React, { Component } from 'react';
import { axios } from 'axios';

export default class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      votesToSkip: 2,
      guestCanPause: false,
      isHost: false,
    };
    this.roomCode = this.props.match.params.roomCode;
    this.getRoomDetails();
  }

  getRoomDetails() {
    const res = axios.get('/api/get-room' + '?code=' + 'HPQCIP');
    this.setState({
      votesToSkip: res.votes_to_skip,
      guestCanPause: res.guest_can_pause,
      isHost: res.is_host,
    });
  }

  render() {
    return (
      <div>
        <h2>{this.roomCode}</h2>
        <p>Votes: {this.state.votesToSkip.toString()}</p>
        <p>Guest Can Pause: {this.state.guestCanPause.toString()}</p>
        <p>Host: {this.state.isHost.toString()}</p>
      </div>
    );
  }
}
