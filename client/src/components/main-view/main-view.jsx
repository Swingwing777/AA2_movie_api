import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { BrowserRouter as Router, Route, Link, Switch, NavLink } from 'react-router-dom';

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
      movies: [],
      selectedMovie: null,
      userProfile: null,
      user: null
    };
  }

  // new method to get movies
  getMovies(token) {

    axios.get('https://cors-anywhere.herokuapp.com/bond-movie-api.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // console.log(response.data);
        this.getUser(token);

        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getUser(token) {
    let user = localStorage.getItem('user')
    axios.get(`https://cors-anywhere.herokuapp.com/bond-movie-api.herokuapp.com/users/${user}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        //const userProfile = response.data;

        this.setState({
          userProfile: response.data
        });

        console.log('This is user: ' + response.data.Username);
      })
      .catch(function (error) {
        console.log('Sorry, there has been an error: ' + error);
      });
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

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);

    this.getMovies(authData.token);
    console.log(`This is user: ${localStorage.getItem('user')}`);     //  This unlocked things, by moving it from above localStorage.setItem
  }

  logoutUser = (e) => {
    e.preventDefault();
    console.log('Logged out');
    this.setState({
      user: null
    });
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  render() {
    const { movies, user, userProfile } = this.state;

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    // console.log(user)

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

                <Route exact path="/" render={() => {
                  if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
                  return movies.map(m => <MovieCard key={m._id} movie={m} />)
                }
                } />
                <Route path="/register" render={() => <RegistrationView />} />

                <Route path="/movies/:movieId" render={({ match }) =>
                  <MovieView movie={movies.find(m => m._id === match.params.movieId)} />} />
                {/* <Route exact path="/" render={Welcome} /> */}

                <Route exact path="/actors/:movie/:name" render={({ match }) => {
                  if (!movies) return <div className="main-view" />;
                  return <BondView bondactor={movies.find(m => m.BondActor.Name === match.params.name).BondActor} movies={movies} />
                }
                } />

                <Route exact path="/directors/:movie/:name" render={({ match }) => {
                  if (!movies) return <div className="main-view" />;
                  return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} movies={movies} />
                }
                } />

                <Route exact path="/genres/:movie/:name" render={({ match }) => {
                  if (!movies) return <div className="main-view" />;
                  return <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} movies={movies} />
                }
                } />

                <Route path="/users/:Username" render={() => {
                  // if (!user) return <div className="main-view" />;
                  //userProfile isnt defined. where does it come from?
                  // I set it as a state at line 62.  In the getUser method.userProfile={userProfile}
                  //i added it to 112
                  return <ProfileView
                    userProfile={userProfile}
                    user={localStorage.getItem('user')}
                    movies={movies} />  //user={users.find(u => u.Username === match.params.Username).User} movies={movies}
                }
                } />
                <Route exact path="/update/:Username" render={() => <UpdateView user={localStorage.getItem('user')} userProfile={userProfile} />} />
              </Switch>

            </Row>
          </div>


        </Container>
      </Router>
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
  }),

  // user: PropTypes.shape({
  //   Username: PropTypes.string.isRequired,
  //   Password: PropTypes.string.isRequired,
  //   Email: PropTypes.string.isRequired,
  //   Birthday: PropTypes.date.isRequired
  // })
};



