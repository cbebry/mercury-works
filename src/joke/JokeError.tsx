import React, { Component } from 'react';
import './JokeError.css';

export default class JokeError extends Component {
  render () {
    return <div className="joke-error">
      THERE WAS AN ERROR LOADING YOUR JOKE.
    </div>;
  }
}
