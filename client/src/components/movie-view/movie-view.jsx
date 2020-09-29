import React from 'react';
// import { MainView } from '../main-view/main-view';
import PropTypes from 'prop-types';
import './movie-view.scss';

export class MovieView extends React.Component {

  constructor() {
    super();
    this.state = {}
    this.toggleMainView = this.toggleMainView.bind(this)  // to bind '.this' to constructor()
  }

  toggleMainView() {
    this.props.backToMain()       // backToMain() refers to MainView method to change state of MainView
  }

  render() {
    const { movie } = this.props;
    //console.log(this.props)
    if (!movie) return null;

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
          <button onClick={this.toggleMainView}>Main Menu</button>
        </div>

      </div>)
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    BondActor: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }).isRequired,
    Heroine: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    ThumbNail: PropTypes.string.isRequired
  }).isRequired
};
