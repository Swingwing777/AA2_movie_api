import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';                              // #0
import { BrowserRouter as Router, Route, Link, Switch, NavLink, Redirect } from 'react-router-dom';

import { setMovies } from '../../actions/actions';                  // #0
import MoviesList from '../movies-list/movies-list';                // #0

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { BondView } from '../bond-view/bond-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { ProfileView } from '../profile-view/profile-view';
import { UpdateView } from '../update-view/update-view';
import { RegistrationView } from '../registration-view/registration-view';
import { Container, Row, Button, Col } from 'react-bootstrap';
import './main-view.scss';

export class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
      // movies: [],
      selectedMovie: null,
      userProfile: null,
      user: null,
      apiData: null,
      isAuth: false      // Ties to isLoggedIn and isLoggedOut
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');

    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });

      // If user and access token are present, can call getMovies & getUser methods.
      this.getMovies(accessToken);
    }
  }

  // new method to get movies
  getMovies(token) {
    const source = axios.CancelToken.source();
    axios.get('https://cors-anywhere.herokuapp.com/bond-movie-api.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.props.setMovies(response.data);      // #1 - to replace setState of Ex3.5 version
        this.getUser(token);
      })
      .catch(function (error) {
        console.log(error);
      })
    axios.get("https://jsonplaceholder.typicode.com/todos", {
      cancelToken: source.token
    }).then(response => {
      this.setState({
        apiData: response.data
      });
    }).catch(e => {
      console.log('Cancel Token error: ' + e)            // Catch 2: for cancel token error
    });
  }

  getUser(token) {
    let user = localStorage.getItem('user')
    const source = axios.CancelToken.source();
    axios.get(`https://cors-anywhere.herokuapp.com/bond-movie-api.herokuapp.com/users/${user}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {

        this.setState({
          userProfile: response.data
        });

        console.log('This is user: ' + response.data.Username);
      })
      .catch(function (error) {
        console.log('Sorry, there has been an error: ' + error);
      })
    axios.get("https://jsonplaceholder.typicode.com/todos", {
      cancelToken: source.token
    }).then(response => {
      this.setState({
        apiData: response.data
      });
    }).catch(e => {
      console.log('Cancel Token error: ' + e)            // Catch 2: for cancel token error
    });
  }

  onMovieClick(movie) {                                  // purpose????
    this.setState({
      selectedMovie: movie
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
      isAuth: true
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);

    this.getMovies(authData.token);
  }

  logoutUser = (e) => {
    e.preventDefault();
    console.log('Logged out');
    this.setState({
      user: null,
      userProfile: null,
      selectedMovie: null,
      isAuth: false

    });
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  render() {
    const { userProfile, isAuth } = this.state;
    let { movies } = this.props;                              // #2
    let { user } = this.state;

    // if (!userProfile) return <div className="mySpinner spinner-border text-primary" role="status">
    //   <span className="sr-only">Loading...</span>
    // </div>

    if (!movies) return <div className="main-view" />;


    return (
      <Router>
        <Container>
          <Row className='d-flex p-2 justify-content-around'>
            <span className='label'>Welcome to the Bond Movies Database</span>

            <NavLink to={`/users/${user}`}>
              <Button className='goUserProf mx-3 mt-3' variant="link">Logged in as: {user}</Button>
            </NavLink>

            <Link to={`/update/${user}`}>
              <Button className='goUserProf mx-3 mt-3' variant="link">Update User</Button>
            </Link>

            <Link to={`/`}>
              <Button className='logOutButton mx-3 mt-3' variant='link' type='submit' onClick={user => this.logoutUser(user)} >
                Logout</Button>
            </Link>

          </Row>

          <div className="main-view">
            <Row className='p-2 justify-content-center'>
              <Switch>
                {/* This is the MainView default route */}
                <Route
                  exact
                  path="/"
                  render={(props) => {
                    if (!user) {      /* If no user, go to LoginView via <Route path="/login" /> */
                      return (
                        <Redirect to="/login" />
                      );
                    }
                    return <MoviesList movies={movies} />;
                  }}
                />

                <Route
                  exact
                  path="/login"
                  render={(props) => <LoginView {...props}
                    isAuth={isAuth}
                    onLoggedIn={(user) => this.onLoggedIn(user)}
                  />}
                />

                <Route
                  path="/register"
                  render={() => <RegistrationView />}
                />

                <Route
                  exact
                  path="/main"
                  render={(props) => {
                    const user = localStorage.getItem('user')
                    if (!user) {                                          /* If no user, go to LoginView via <Route path="/login" /> */
                      return (
                        <Redirect to="/login" />
                      );
                    }
                    return <MoviesList movies={movies} />;
                  }}
                />

                <Route
                  path="/movies/:movieId"
                  render={({ match }) =>
                    <MovieView
                      movie={movies.find(m => m._id === match.params.movieId)} />}
                />

                <Route
                  exact
                  path="/actors/:movie/:name"
                  render={({ match }) => {
                    if (!movies)
                      return <div className="main-view" />;
                    return <BondView
                      bondactor={movies.find(m => m.BondActor.Name === match.params.name).BondActor}
                      movies={movies} />
                  }}
                />

                <Route
                  exact
                  path="/directors/:movie/:name"
                  render={({ match }) => {
                    if (!movies) return <div className="main-view" />;
                    return <DirectorView
                      director={movies.find(m => m.Director.Name === match.params.name).Director}
                      movies={movies} />
                  }}
                />

                <Route
                  exact
                  path="/genres/:movie/:name"
                  render={({ match }) => {
                    if (!movies) return <div className="main-view" />;
                    return <GenreView
                      genre={movies.find(m => m.Genre.Name === match.params.name).Genre}
                      movies={movies} />
                  }}
                />

                <Route
                  path="/users/:Username"
                  render={() => {
                    return <ProfileView
                      userProfile={userProfile}
                      user={localStorage.getItem('user')}
                      movies={movies} />
                  }}
                />

                <Route
                  exact
                  path="/update/:Username"
                  render={() => <UpdateView
                    user={localStorage.getItem('user')}
                    userProfile={userProfile} />}
                />

              </Switch>

            </Row>
          </div>


        </Container>
      </Router>
    );
  }
}

let mapStateToProps = state => {
  return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies })(MainView);

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
  }),

  user: PropTypes.shape({
    Username: PropTypes.string,
    Password: PropTypes.string,
    Email: PropTypes.string,
    Birthday: PropTypes.date
  })
};



