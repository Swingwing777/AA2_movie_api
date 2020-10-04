import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { BondView } from '../bond-view/bond-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { ProfileView } from '../profile-view/profile-view';
import { RegistrationView } from '../registration-view/registration-view';
import { Container, Row } from 'react-bootstrap';
import './main-view.scss';

export class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
      movies: [],
      user: null
    };
  }

  // new method to get movies
  getMovies(token) {
    axios.get('https://cors-anywhere.herokuapp.com/bond-movie-api.herokuapp.com/movies', {   //https://cors-anywhere.herokuapp.com
      headers: { Authorization: `Bearer ${token}` }        //Access-Control-Allows-Origin: *
    })
      .then(response => {
        console.log(response.data);
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

    if (!movies) return <div className="main-view" />;

    return (

      <Container>
        <Router>
          <div className="main-view">
            <Row className='p-2 justify-content-center'>
              <Route exact path="/" render={() => {
                if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
                return movies.map(m => <MovieCard key={m._id} movie={m} />)
              }
              } />
              <Route path="/register" render={() => <RegistrationView />} />
              <Route path="/movies/:movieId" render={({ match }) => <MovieView movie={movies.find(m => m._id === match.params.movieId)} />} />
              {/* <Route exact path="/" render={Welcome} /> */}

              <Route path="/actors/:name" render={({ match }) => {
                if (!movies) return <div className="main-view" />;
                return <BondView bondactor={movies.find(m => m.BondActor.Name === match.params.name).BondActor} />
              }
              } />

              <Route path="/directors/:name" render={({ match }) => {
                if (!movies) return <div className="main-view" />;
                return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} />
              }
              } />

              <Route exact path="/genres/:name" render={({ match }) => {
                if (!movies) return <div className="main-view" />;
                return <GenreView genre={movies.find(m => m.Genres.Name === match.params.name).Genres} />
              }
              } />

              <Route exact path="/users/:Username" render={({ match }) => {
                if (!user) return <div className="main-view" />;
                return <ProfileView user={users.find(u => u.Username === match.params.username)} />
              }
              } />
            </Row>
          </div>
        </Router>
        {/* <Row className='currentUser p-2 justify-content-center'>
          <span className='label'>{user} </span>
          <Link to={`/users/:Username`}>
            <Button className='goUser' variant="link">View User Profile</Button>
          </Link>
        </Row> */}
      </Container>

    );
  }
}

MainView.propTypes = {
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
  })
};

