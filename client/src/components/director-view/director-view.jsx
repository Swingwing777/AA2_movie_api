import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Button, Col, Row } from 'react-bootstrap';

import { Link } from "react-router-dom";

import './director-view.scss';

export class DirectorView extends React.Component {

    constructor() {
        super();
        this.state = {}
    }

    getMovies(token) {
        axios.get('https://cors-anywhere.herokuapp.com/bond-movie-api.herokuapp.com/movies/', {   //https://cors-anywhere.herokuapp.com
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

    render() {
        const { director } = this.props;
        console.log(this.props)
        console.log(director.Name)
        if (!director) return null;

        return (
            <Container className='container' >
                <Row className='director-view d-flex'>
                    <Col xs={5}>
                        <img className='dirImage' src={director.Image} />

                        <Row >
                            <span className='titleh1 mt-3'>{director.Name}</span>
                        </Row>
                        <Row className='mt-3'>
                            <span className='value'>{director.Bio}</span>
                        </Row>
                        <Row className='mt-3'>
                            <span className='label'>{'Date of Birth:\u00A0\u00A0'} </span>
                            <span className='value'>{director.Birth.Date}</span>
                        </Row>
                        <Row className='mt-3'>
                            <span className='label'>{'Place of Birth:\u00A0\u00A0'}</span>
                            <span className='value'>{director.Birth.Place}</span>
                        </Row>
                        <Row className='mt-3'>
                            <span className='label'>{'Date of Death:\u00A0\u00A0'}</span>
                            <span className='value'>{director.Death.Date}</span>
                        </Row>
                        <Row className='mt-3'>
                            <span className='label'>{'Place of Death:\u00A0\u00A0'}</span>
                            <span className='value'>{director.Death.Place}</span>
                        </Row>
                        <Row className='mt-3'>
                            <span className='label'>{'Known for:\u00A0\u00A0'}</span>
                            <span className='value'>{director.KnownFor}</span>
                        </Row>

                        <Row className='mt-5'>
                            <Link to={`/`}>
                                <Button className='goBackMovie' variant="link">Return to Movie View</Button>
                            </Link>
                        </Row>
                    </Col>
                </Row>


                {/* <Link to={`/directors/${movie.Director.Name}`}>
          <Button variant="link">Director</Button>
        </Link>

        <Link to={`/genres/${movie.Genre.Name}`}>
          <Button variant="link">Genre</Button>
        </Link> */}

                {/* <Link to={`/movies/${movie.BondActor.Name}`}>
          <Button variant="link">Bond</Button>
        </Link> */}

            </Container >
        )
    }
};

DirectorView.propTypes = {
    director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string.isRequired,
        Birth: PropTypes.shape({
            Date: PropTypes.string.isRequired,
            Place: PropTypes.string.isRequired
        }).isRequired,
        Death: PropTypes.shape({
            Date: PropTypes.string,
            Place: PropTypes.string
        }).isRequired,
        KnownFor: PropTypes.array.isRequired
    }).isRequired
};