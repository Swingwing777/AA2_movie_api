import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
// import { RegistrationView } from '../registration-view/registration-view';   // ?
import { Row } from 'react-bootstrap';
import './main-view.scss';

export class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
      movies: null,
      // genres: null,
      // bonds: null,
      // directors: null,
      user: null
    };
  }

  // new method to get movies
  getMovies(token) {
    axios.get('https://cors-anywhere.herokuapp.com/bond-movie-api.herokuapp.com/movies', {   //https://cors-anywhere.herokuapp.com
      headers: { Authorization: `Bearer ${token}` }        //Access-Control-Allows-Origin: *
    })
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

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  render() {
    const { movies, user } = this.state;

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    if (!movies) return <div className="main-view" />;

    return (

      <Router>
        <div className="main-view">
          <Row className='p-2 justify-content-center'>
            <Route exact path="/" render={() => movies.map(m => <MovieCard key={m._id} movie={m} />)} />
            <Route path="/movies/:movieId" render={({ match }) => <MovieView movie={movies.find(m => m._id === match.params.movieId)} />} />
          </Row>
        </div>
      </Router>

    );
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

