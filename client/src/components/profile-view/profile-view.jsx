import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Container, Card, Button, Row, Col, Form } from 'react-bootstrap';
import './profile-view.scss';

import { connect } from 'react-redux';
import { BrowserRouter as Router, Link } from 'react-router-dom';

import { setUserProf } from '../../actions/actions';
import { cancelToken } from '../../actions/actions';

const mapStateToProps = state => {
  return { movies: state.movies, userProfile: state.userProfile, apiData: state.apiData }   // Change 1
}

export class ProfileView extends React.Component {

  constructor() {
    super();
    // No state defined.  props, not state used directly by functions.
  }

  getUser(token) {
    let user = localStorage.getItem('user')
    const source = axios.CancelToken.source();
    axios.get(`https://cors-anywhere.herokuapp.com/bond-movie-api.herokuapp.com/users/${user}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        setUserProf(response.data);                                // Change 2 (not 'setState')
      })
      .catch(e => {
        console.log('User error: ' + e);
      })
    axios.get("https://jsonplaceholder.typicode.com/todos", {
      cancelToken: source.token
    }).then(response => {
      cancelToken(response.data);                             // Change 3 (not 'setState')
    }).catch(e => {
      console.log('Cancel Token error: ' + e)
    });
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    this.getUser(accessToken);
  }

  deleteFavorite(movieId) {
    let user = localStorage.getItem('user');
    axios.delete(`https://cors-anywhere.herokuapp.com/bond-movie-api.herokuapp.com/users/${user}/movieID/${movieId} `, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(response => {
        setUserProf(response.data);
        alert('Movie successfully deleted from favorites');
      })
      .catch(e => {
        alert('Movie could not be deleted from favorites ' + e)
      });
  }

  deleteProfile() {
    let user = localStorage.getItem('user')
    axios.delete(`https://cors-anywhere.herokuapp.com/bond-movie-api.herokuapp.com/users/${user}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      .then(res => {
        alert('Do you really want to delete your account?')
      })
      .then(res => {
        alert('Account was successfully deleted')
        setUserProf({});                                         // Change 5 (not 'setState')
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.open('/', '_self');
      })
      .catch(e => {
        alert('Account could not be deleted ' + e)
      });
  }

  render() {
    const { movies, user, userProfile } = this.props;

    if (!user) return <div className="main-view" />;

    return (
      <Container style={{ width: '90%' }} className='formwrapper' >
        <Form className='p-md-3'>
          <Form.Row className='d-flex flex-md-row justify-content-center'>
            <Form.Label size='lg' className='formTitle'>User Profile</Form.Label>
          </Form.Row>

          <Form.Row className='justify-content-center mt-3'>
            <Form.Group as={Col} controlId='formGridUsername'>
              <Form.Label className='formLabel'>Username</Form.Label>
              <Form.Control
                className='entryField'
                defaultValue={userProfile.Username}
                readOnly
              />
            </Form.Group>

            <Form.Group as={Col} controlId='formGridPassword'>
              <Form.Label className='formLabel'>Password</Form.Label>
              <Form.Control
                className='entryField'
                defaultValue='**************'
                readOnly
              />
            </Form.Group>
          </Form.Row>

          <Form.Row className='d-flex flex-md-row justify-content-center'>
            <Form.Group as={Col} controlId='formGridEmail'>
              <Form.Label className='formLabel'>Email</Form.Label>
              <Form.Control
                className='entryField'
                defaultValue={userProfile.Email}
                readOnly
              />
            </Form.Group>

            <Form.Group as={Col} controlId='formBirthday'>
              <Form.Label className='formLabel'>Birthday</Form.Label>
              <Form.Control
                className='entryField'
                defaultValue={moment(userProfile.Birthday).format('DD/MM/YYYY')}
                readOnly />
            </Form.Group>
          </Form.Row>
        </Form>

        <Container style={{ width: '90%' }} className='flex-shrink-md'>

          <h1 className='titleh1 mt-4'>Your favorite Bond Movies</h1>
          <Row>
            <div className='d-flex row m-2'>

              {userProfile.FavoriteMovies ?

                movies.map(movie => {

                  if (userProfile.FavoriteMovies.indexOf(movie._id) !== -1) {

                    return (

                      <div key={movie._id}>
                        <Card style={{ width: '10em' }} className="pt-3 m-1 p-2 text-center movie-card h-100">
                          <Card.Img variant='top' src={movie.ImagePath} className='thumbNail m-auto' />
                          <Card.Body className='cardBody p-0'>
                            <Link to={`/movies/${movie._id}`}>
                              <Card.Title className='titleh2 p-1'>{movie.Title}</Card.Title>
                            </Link>
                          </Card.Body>
                          <Card.Footer className='cardFoot border-top-0 d-flex justify-content-center'>
                            <Row className='d-flex flex-md-row justify-content-center'>
                              <Link to={`/movies/${movie._id}`}>
                                <Button variant='link' className='m-1 goDetail5'>Details</Button>
                              </Link>
                              <Link to="" onClick={() => this.deleteFavorite(movie._id)}>
                                <Button variant='link' className='m-1 goDetail6'>Delete</Button>
                              </Link>
                            </Row>
                          </Card.Footer>
                        </Card>
                      </div>
                    );
                  }
                })
                :
                <div className='titleh1 mt-4'> You have no favorites</div>
              }
            </div>
          </Row>
        </Container>

        <Row className='mt-3 d-flex flex-md-row justify-content-center formPromise'>We will never share your details
        </Row>
        <Row className='mt-5'></Row>

        <Row className='mt-3 d-flex flex-md-row justify-content-center'>
          <Router>
            <Link to="" onClick={() => history.back()}>
              <Button className='m-2 formButton' variant="link">Back</Button>
            </Link>

            <Link to="/login" onClick={() => this.deleteProfile()}>
              <Button className='m-2 formButton1' variant="link">Delete Profile</Button>
            </Link>
            {/* <Link Link to={`/update/${userProfile.Username}`}>
              <Button className='m-2 formButton' variant="link">Update Details</Button>
            </Link> */}

          </Router>
        </Row>
      </Container >
    )
  }
}

export default connect(mapStateToProps, { setUserProf, cancelToken })(ProfileView);

ProfileView.propTypes = {
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