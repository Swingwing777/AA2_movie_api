import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Container, Button, Row, Col, Form } from 'react-bootstrap';
import './profile-view.scss';
import moment from 'moment';
import { BrowserRouter as Router, Link } from 'react-router-dom';

export class ProfileView extends React.Component {

  constructor() {
    super();
    this.state = {
      user: localStorage.getItem('user'),
      userProfile: null
    }
  }

  getUser(token) {
    let user = localStorage.getItem('user')
    axios.get(`https://cors-anywhere.herokuapp.com/bond-movie-api.herokuapp.com/users/${user}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        const userProfile = response.data;
        console.log(response.data);

        this.setState({
          userProfile: userProfile
        });

        console.log('This is user: ' + userProfile.Username);
      })
      .catch(function (error) {
        console.log('Sorry, there has been an error: ' + error);
      });
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');

    // if (accessToken !== null) {
    //   this.setState({
    //     user: localStorage.getItem('user')
    //   });

    // If user and access token are present, can call getMovies & getUser methods.
    this.getUser(accessToken);

  }


  deleteFavorite(token, movieId) {
    // let accessToken = localStorage.getItem('token');
    let user = localStorage.getItem('user');
    axios.delete(`https://cors-anywhere.herokuapp.com/bond-movie-api.herokuapp.com/users/${user}/movieID/${movieId} `, {
      headers: { Authorization: `Bearer ${token}` }
    })
      // .then(res => {
      //     document.location.reload(true);
      // })
      .then(res => {
        alert('Movie successfully deleted from favorites');
      })

      .catch(e => {
        alert('Movie could not be deleted from favorites ' + e)
      });
  }

  deleteProfile(token) {
    let user = localStorage.getItem('user')
    axios.delete(`https://cors-anywhere.herokuapp.com/bond-movie-api.herokuapp.com/users/${user}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      .then(res => {
        <div>'Do you really want to delete your account?'</div>
      })
      .then(res => {
        alert('Account was successfully deleted')
      })
      .then(res => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        this.setState({
          user: null

        });
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.open('/', '_self');
      })
      .catch(e => {
        alert('Account could not be deleted ' + e)
      });
  }

  render() {
    const { movies, user, userProfile } = this.state;
    console.log(userProfile)
    console.log('profile view');

    if (!userProfile) return <div className="main-view" />;

    console.log("Profile page")
    // const favoritesList = movies.filter(movie => userProfile.Favorites.includes(movie._id));

    // if (!user || !movies || movies.length === 0) return <div>Loading.......</div>;

    return (
      <Container className='formwrapper' >
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
        <Row className='mt-3 d-flex flex-md-row justify-content-center'>
          <span className='titleh1 mt-3 d-flex flex-md-row justify-content-center'>{'Favorite Bond Movies:\u00A0\u00A0'}</span>
        </Row>
        <Row className='valueh1 d-flex flex-md-row justify-content-center'>

          <span className='valueh1'>{
            userProfile.FavoriteMovies[0] ?
              userProfile.FavoriteMovies.join(',\u00A0\u00A0') :
              'You have not chosen any favourite movies'}</span>

        </Row>

        <Row className='mt-3 d-flex flex-md-row justify-content-center formPromise'>We will never share your details
        </Row>

        <Row className='mt-3 d-flex flex-md-row justify-content-center'>
          <Router>
            <Link to="" onClick={() => history.back()}>
              <Button className='m-2 formButton' variant="link">Movie</Button>
            </Link>

            <Link to="" onClick={() => this.deleteProfile()}>
              <Button className='m-2 formButton1' variant="link">Delete Profile</Button>
            </Link>
            <Link to={`/update/:Username`}>
              <Button className='m-2 formButton' variant="link">Update Details</Button>
            </Link>
          </Router>
        </Row>
      </Container>
    )
  }
}

ProfileView.propTypes = {
  Username: PropTypes.string,
  Password: PropTypes.string,
  Email: PropTypes.string,
  Birthday: PropTypes.string,
  onClick: PropTypes.func
};