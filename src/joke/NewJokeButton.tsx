import React, {Component, MouseEventHandler} from 'react';
import './NewJokeButton.css';

interface INewJokeButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>
}

export default class NewJokeButton extends Component<INewJokeButtonProps> {
  constructor (props: INewJokeButtonProps) {
    super(props);
  }

  render () {
    return <button className="new-joke-button border-0" onClick={this.props.onClick}>
      Get A New Random Joke
    </button>;
  }
}
