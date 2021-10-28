import React, { Component } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {
  Typography,
  FormHelperText,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

export default class CreateRoomPage extends Component {
  defaultVotes = 2;
  constructor(props) {
    super(props);
    this.state = {
      guestCanPause: true,
      votesToSkip: this.defaultVotes,
    };
  }

  handleVotesChange = (e) => {
    this.setState({ votesToSkip: e.target.value });
  };

  handleGuestCanPauseChange = (e) => {
    this.setState({ guestCanPause: e.target.value === 'true' ? true : false });
  };

  handleRoomButtonClicked = () => {
    console.log('test');
    let data = {
      votes_to_skip: this.state.votesToSkip,
      guest_can_pause: this.state.guestCanPause,
    };
    axios.post('http://127.0.0.1:8000/api/create-room', data).then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  render() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography component="h4" variant="h4">
            Create a Room
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl component="fieldset">
            <FormHelperText>
              <div align="center">Guests Control of Playback State</div>
            </FormHelperText>
            <RadioGroup
              row
              defaultValue="true"
              onChange={this.handleGuestCanPauseChange}
            >
              <FormControlLabel
                value="true"
                control={<Radio color="primary" />}
                label="Play/Pause"
                labelPlacement="bottom"
              />
              <FormControlLabel
                value="false"
                control={<Radio color="secondary" />}
                label="No Control"
                labelPlacement="bottom"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl>
            <TextField
              required={true}
              type="number"
              defaultValue={this.defaultVotes}
              inputProps={{ min: 1, style: { textAlign: 'center' } }}
              onChange={this.handleVotesChange}
            />
            <FormHelperText>
              <div align="center">Votes Required To Skip Song</div>
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            color="primary"
            variant="contained"
            onClick={this.handleRoomButtonClicked}
          >
            Create a Room
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button color="secondary" variant="contained" to="/" component={Link}>
            Back
          </Button>
        </Grid>
      </Grid>
    );
  }
}
