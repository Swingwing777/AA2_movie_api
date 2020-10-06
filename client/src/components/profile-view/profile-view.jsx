import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Container, Button, Row, Card } from 'react-bootstrap';
import './profile-view.scss';

import { Link } from "react-router-dom";

export class ProfileView extends React.Component {

    constructor() {
        super();
        this.state = {}
    }

    deleteFavorite(movieId) {
        axios.delete(`https://cors-anywhere.herokuapp.com/bond-movie-api.herokuapp.com/users/${localStorage.getItem('user')}/movieID/${movieId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
            .then(res => {
                document.location.reload(true);
            })
            .then(res => {
                alert('Movie successfully deleted from favorites');
            })

            .catch(e => {
                alert('Movie could not be deleted from favorites ' + e)
            });
    }

    deleteProfile() {
        axios.delete(`https://cors-anywhere.herokuapp.com/bond-movie-api.herokuapp.com/users/${localStorage.getItem('user')}`,
            {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            .then(res => {
                alert('Do you really want to delete your account?')
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
                window.open('/', '_self');
            })
            .catch(e => {
                alert('Account could not be deleted ' + e)
            });
    }

    render() {
        const { user, userProfile, movies } = this.props;
        // console.log(this.props)

        const favoritesList = movies.filter(movie => userProfile.Favorites.includes(movie._id));

        if (!user || !userProfile || !movies || movies.length === 0) return <div>Loading.......</div>;

        return (
            <Container className='d-flex justify-content-center' >
                <Row className='p-2 justify-content-center'>
                    <Card style={{ width: 'fit-content(70%)' }} className='m-3 h-160 text-center movie-card'>
                        <Card.Body className='cardBody p-1'>
                            <Card.Title className='titleh1 mt-3'>Username: {user.Username}</Card.Title>

                            <Card.Text className='text-left mt-4 m-2'>
                                <span className='label'>{'Email:\u00A0\u00A0'} </span>
                                <span className='value'>{user.Email}</span>
                            </Card.Text>
                            <Card.Text className='text-left mt-4 m-2'>
                                <span className='label'>{'Birthday:\u00A0\u00A0'}</span>
                                <span className='valueh1'>{user.Birthday}</span>
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

                    <Row>
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
                    </Row>
                </Container>
            </Container >
        )
    }
};


// ProfileView.propTypes = {

// };