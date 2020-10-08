import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Container, Button, Row, Card } from 'react-bootstrap';
import './profile-view.scss';

import { Router, Link } from "react-router-dom";

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
      <Container className='d-flex justify-content-center' >
        <Row className='p-2 justify-content-center'>
          <Card style={{ width: '80%' }} className='m-3 h-160 text-center movie-card'>
            <Card.Body className='cardBody p-1'>
              <Card.Title className='titleh1 mt-3'>Username: {userProfile.Username}</Card.Title>

              <Card.Text className='text-left mt-4 m-2'>
                <span className='label'>{'Email:\u00A0\u00A0'} </span>
                <span className='value'>{userProfile.Email}</span>
              </Card.Text>
              <Card.Text className='text-left mt-4 m-2'>
                <span className='label'>{'Birthday:\u00A0\u00A0'}</span>
                <span className='valueh1'>{moment(userProfile.Birthday).format('D MMM YYYY')}</span>
              </Card.Text>
              <Card.Text className='text-left mt-4 m-2'>
                <span className='label'>{'Favorite Bond Movies:\u00A0\u00A0'}</span>
                <span className='valueh1'>{
                  userProfile.FavoriteMovies[0] ?
                    userProfile.FavoriteMovies.join(',\u00A0\u00A0') :
                    'You have not chosen any favourite movies'}</span>
              </Card.Text>

            </Card.Body>
            <Card.Footer className="cardFoot border-top-0">
              <Row className='d-flex flex-md-row justify-content-center'>
                <Link to="" onClick={() => history.back()}>
                  <Button className='m-2 goMovie4' variant="link">Movie</Button>
                </Link>

                <Link to="" onClick={() => this.deleteProfile()}>
                  <Button className='m-2 deleteMe' variant="link">Delete Profile</Button>
                </Link>
                <Link to={`/update/:Username`}>"
                                    <Button className='m-2 userUpdate1' variant="link">Update Details</Button>
                </Link>
              </Row>
            </Card.Footer>
          </Card>
        </Row>
        <Container>
          <Row className='text-center mt-4 m-2'>{'My Favourite Movies:\u00A0\u00A0'}</Row>
          {/* {userProfile.Favorites.length === 0 &&
                        <span> You have no favorite movies</span>}
                    {userProfile.Favorites.length > 0 && */}

          {/* <Row>
                    <div className='d-flex row m-2'>
                        {favoritesList.map(movie => {
                            if (movie.BondActor.Name === bondactor.Name) {
                                return (
                                    <div key={movie._id}>
                                        <Card style={{ width: '10em' }} className="mt-3 m-2 p-2 text-center movie-card h-100">
                                            <Card.Img variant='top' src={movie.ImagePath} className='thumbNail m-auto' />
                                            <Card.Body className='cardBody p-0'>
                                                <Link to={`/movies/${movie._id}`}>
                                                    <Card.Title className='titleh2 p-1'>{movie.Title}</Card.Title>
                                                </Link>
                                            </Card.Body>
                                            <Card.Footer className='cardFoot border-top-0 d-flex justify-content-center'>
                                                <Link to="" onClick={() => this.deleteFavorite(movie._id)}>
                                                    <Button variant='link' className='goDetail2'>Read more</Button>
                                                </Link>
                                            </Card.Footer>
                                        </Card>
                                    </div>
                                );
                            }
                        })}
                    </div>
                </Row> */}
        </Container>
      </Container >
    )
  }
};


// ProfileView.propTypes = {

// };