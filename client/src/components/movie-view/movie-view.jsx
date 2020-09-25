import React from 'react';
import { MainView } from '../main-view/main-view';

export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {
      showMainView: false
    };
  }

  toggleMainView = () => this.setState(prevState => ({
    showMainView:
      !prevState.showMainView
  }))

  render() {
    const { movie } = this.props;
    const { showMainView } = this.state;

    if (!movie) return null;

    if (showMainView) {           // additional conditional step}
      return <MainView />;
    }

    return (
      <div className="movie-view">
        <img className="movie-poster" src={movie.ImagePath} />
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
        <div className="movie-genre">
          <span className="label">Genre: </span>
          <span className="value">{movie.Genres[0].Name}</span>
        </div>
        <div className="movie-bond">
          <span className="label">Agent 007 played by: </span>
          <span className="value">{movie.BondActor.Name}</span>
        </div>
        <div className="movie-director">
          <span className="label">Director: </span>
          <span className="value">{movie.Director.Name}</span>
        </div>
        <div className="back-movies">
          <button onClick={this.toggleMainView}>Back to Menu</button>
        </div>

      </div>)
  }
}

