import React, { Component } from 'react';
import './JokeDisplay.css';

export interface IJoke {
  setup: string,
  punchline: string
}
interface IJokeDisplayProps {
  joke: IJoke
}
interface IJokeDisplayState {
  setup: string,
  punchline: string,
  showPunchline: boolean
}

export default class JokeDisplay extends Component<IJokeDisplayProps, IJokeDisplayState> {

  constructor(props: IJokeDisplayProps) {
    super(props);

    this.state = {
      setup: props.joke.setup,
      punchline: props.joke.punchline,
      showPunchline: false
    }
    this.handleShowPunchlineClick = this.handleShowPunchlineClick.bind(this);
  }

  /**
   * Toggles state.showPunchline
   */
  handleShowPunchlineClick () {
    this.setState(({ setup, punchline, showPunchline }) => ({
      setup,
      punchline,
      showPunchline: !showPunchline
    }));
  }

  render () {
    return <div>
      <div className="joke-text joke-setup">
        <span>{this.state.setup}</span>
      </div>
      <div className="show-punchline">
        <button className="show-punchline-button border-0" onClick={this.handleShowPunchlineClick} >
          {this.state.showPunchline ? 'Hide' : 'Show'} Punchline
        </button>
      </div>
      {this.state.showPunchline &&
          <div className="joke-text joke-punchline">
              <span>{this.state.punchline}</span>
          </div>
      }
    </div>
  }
}
