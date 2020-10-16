import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link, Switch, NavLink, Redirect } from 'react-router-dom';

import { setMovies } from '../../actions/actions';
import { cancelToken } from '../../actions/actions';
import { setUserProf } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';
import { LoginView } from '../login-view/login-view';
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
      // selectedMovie: null,
      // userProfile: null,
      // apiData: null,
      user: null,
      isAuth: false      // Ties to isLoggedIn and isLoggedOut
    };
  }

  componentDidMount() {

    let accessToken = localStorage.getItem('token');
    // let user = localStorage.getItem('user');
    if (accessToken !== null) {
      //this.props.setUserProf(user)

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
    // axios.get('https://cors-anywhere.herokuapp.com/bond-movie-api.herokuapp.com/movies', {
    axios.get('https://bond-movie-api.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.props.setMovies(response.data);
        this.getUser(token);
      })
      .catch(e => {
        console.log('Movie error: ' + e);
      })
    axios.get("https://jsonplaceholder.typicode.com/todos", {
      cancelToken: source.token
    }).then(response => {
      this.props.cancelToken(response.data);
    }).catch(e => {
      console.log('Cancel Token error: ' + e)            // Catch 2: for cancel token error
    });
  }

  getUser(token) {
    let user = localStorage.getItem('user')
    const source = axios.CancelToken.source();
    // axios.get(`https://cors-anywhere.herokuapp.com/bond-movie-api.herokuapp.com/users/${user}`, {
    axios.get(`https://bond-movie-api.herokuapp.com/users/${user}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.props.setUserProf(response.data);
        console.log('This is user: ' + response.data.Username);
      })
      .catch(e => {
        console.log('User error: ' + e);
      })
    axios.get("https://jsonplaceholder.typicode.com/todos", {
      cancelToken: source.token
    }).then(response => {
      this.props.cancelToken(response.data);
    }).catch(e => {
      console.log('Cancel Token error: ' + e)            // Catch 2: for cancel token error
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
    this.props.setUserProf({});

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.open('/', '_self');
  }

  render() {
    const { isAuth, user } = this.state;
    let { movies, userProfile } = this.props;                              // #2

    // if (!userProfile) return <div className="mySpinner spinner-border text-primary" role="status">
    //   <span className="sr-only">Loading...</span>
    // </div>

    if (!movies && !userProfile) return <div className="main-view" />;


    return (
      // <Router> no baseline property for localhost testing
      <Router basename="/client">
        <Container>
          <Row className='d-flex pt-2 justify-content-around'>
            <Col xs={12} md={3} className='justify-content-center align-items-center'>
              <span className='label'>Welcome to the Bond Movies Database</span>
            </Col>
            <Col xs={12} md={2} className='justify-content-center'>
              <NavLink to={`/users/${user}`}>
                <Button className='goUserProf mx-3 mt-3' variant="link">User: {user}</Button>
              </NavLink>
            </Col>
            <Col xs={12} md={2} className='justify-content-center'>
              <Link to={`/update/${user}`}>
                <Button className='goUserProf mx-3 mt-3' variant="link">Update User</Button>
              </Link>
            </Col>
            <Col xs={12} md={2} className='justify-content-center'>
              <Link to={`/`}>
                <Button className='logOutButton mx-3 mt-3' variant='link' type='submit' onClick={user => this.logoutUser(user)} >
                  Logout</Button>
              </Link>
            </Col>

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
  return { movies: state.movies, userProfile: state.userProfile, apiData: state.apiData }
}

export default connect(mapStateToProps, { setMovies, setUserProf, cancelToken })(MainView);

MainView.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Year: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      Name: PropTypes.string.isRequired
    }).isRequired,
    BondActor: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      Name: PropTypes.string.isRequired,
    }).isRequired,
    Director: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      Name: PropTypes.string.isRequired,
    }).isRequired,
    Actors: PropTypes.array.isRequired,
    Heroine: PropTypes.string.isRequired,
    Villain: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    ThumbNail: PropTypes.string.isRequired,
    SongArtist: PropTypes.string.isRequired,
    Featured: PropTypes.boolean
  }),

  userProfile: PropTypes.shape({
    _id: PropTypes.string,
    Username: PropTypes.string,
    Password: PropTypes.string,
    Email: PropTypes.string,
    Birthday: PropTypes.date
  }).isRequired
};
