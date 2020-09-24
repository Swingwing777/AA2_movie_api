import React from 'react';

export class MovieCard extends React.Component {
  render() {
    // MainView grabs the movie data.  MovieCard uses the movie properties.
    const { movie, onClick } = this.props;

    return (
      // Return a card labelled as the movie title
      <div onClick={() => onClick(movie)} className="movie-card">{movie.Title}</div>
    );
  }
}