import React, { Component } from 'react';
import JokeLoading from './JokeLoading';
import JokeDisplay, { IJoke } from './JokeDisplay';
import JokeError from './JokeError';
import NewJokeButton from './NewJokeButton';

interface IJokeProps {}
interface IJokeState {
  loading: boolean,
  joke?: IJoke,
  error: boolean
}

export default class JokeContainer extends Component<IJokeProps, IJokeState> {
  constructor(props: IJokeProps) {
    super(props);

    this.state = {
      joke: undefined,
      loading: true,
      error: false
    };
    this.handleGetNewJokeClick = this.handleGetNewJokeClick.bind(this);
  }

  /**
   * Loads joke on component mount
   */
  async componentDidMount() {
    await this.getJoke();
  }

  /**
   * On button click, sets loading state then gets joke.
   */
  async handleGetNewJokeClick() {
    this.setState({ loading: true, error: false });
    await this.getJoke();
  }

  /**
   * Fetches joke, handles errors, loads joke into state.
   */
  async getJoke () {
    try {
      const joke = await this.fetchJoke();
      this.setState({ loading: false, joke: joke, error: false });
    } catch (err) {
      console.error(err);
      this.setState({ loading: false, error: true });
    }
  }

  /**
   * Only fetches joke. throws error based on fetch response
   */
  async fetchJoke () {
    const RANDOM_JOKE_ENDPOINT = 'https://official-joke-api.appspot.com/random_joke';
    const response = await fetch(RANDOM_JOKE_ENDPOINT);
    if (response.status !== 200) {
      throw new Error(`Error status code ${response.status} from Joke API`);
    }
    const joke = await (response).json();
    console.log(joke);
    return joke;
  }

  render () {
    const isLoading: boolean = this.state.loading;
    const joke: IJoke = this.state.joke!;
    const isError: boolean = this.state.error;

    let loading;
    if (isLoading) {
      loading = <JokeLoading></JokeLoading>;
    }

    let error;
    if (isError) {
      error = <JokeError></JokeError>;
    }

    let display;
    if (!isLoading && !isError) {
      display = <JokeDisplay joke={joke}></JokeDisplay>;
    }

    return <div className="container">
      <div className="row">
        <div className="col-9">
          <NewJokeButton onClick={this.handleGetNewJokeClick}></NewJokeButton>
        </div>
        <div className="col-3 doc-link-container">
          <a href="https://github.com/15Dkatz/official_joke_api" target="_blank" rel="noreferrer">View API docs</a>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col">
          {loading}
          {error}
          {display}
        </div>
      </div>
    </div>
  }
}
