import React from 'react';
import PropTypes from 'prop-types';

export class MovieCard extends React.Component {
  render() {
    const { movie, onClick } = this.props;

    return (
      <div onClick={() => onClick(movie)} className="movie-card">
        <img className="movie-thumb" src={movie.ThumbNail} />
        <div>{movie.Title}</div>
      </div>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ThumbNail: PropTypes.string.isRequired
  }).isRequired,
  onClick: PropTypes.func.isRequired
};