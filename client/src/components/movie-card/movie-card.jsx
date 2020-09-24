import React from 'react';

export class MovieCard extends React.Component {
  render() {
    // MainView grabs the movie data.  MovieCard uses the movie properties.
    const { movie } = this.props;

    return (
      // Return a card labelled as the movie title
      <div className="movie-card">{movie.Title}</div>
    );
  }
}