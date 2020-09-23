import React from 'react';       
import axios from 'axios';

export class MainView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

   componentDidMount() {
    axios.get('bond-movie-api.herokuapp.com/movies>')
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  } 

  render() {
    // State causes Error if state not iniitialised
    // State Option 1 - before the data is loaded
    const { movies } = this.state;

    // State Option 2 - before the movies have loaded
    if (!movies) return <div className = "main-view"/>;

    return (
      <div className="main-view">
        { movies.map(movie => (
          <div className="movie-card" key={movie._id}>{movie.Title}</div>
        ))}
      </div>
    );
  } 
}


