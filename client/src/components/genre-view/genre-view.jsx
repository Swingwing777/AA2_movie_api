import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Button, Card, Row } from 'react-bootstrap';
import './genre-view.scss';

// import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Link } from "react-router-dom";

import './genre-view.scss';

export class GenreView extends React.Component {

    constructor() {
        super();
        this.state = {}
    }

    render() {
        const { genre, movies } = this.props;
        console.log(this.props)
        if (!genre) return null;

        return (

            <Container className='d-flex justify-content-center' >
                <Row className='p-2 justify-content-center'>
                    <Card style={{ width: 'fit-content(80%)' }} className='m-3 h-160 text-center movie-card'>
                        <Card.Body className='cardBody p-1'>
                            <Card.Title className='titleh1 mt-3'>{genre.Name}</Card.Title>
                            <Card.Text className='value m-3'>
                                <span className='textMain'>{genre.Description}</span>
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="cardFoot border-top-0">
                            <Row className='d-flex flex-md-row justify-content-center'>
                                <Link to="" onClick={() => history.back()}>
                                    <Button className='goMovie1 m-2' variant="link">Movie</Button>
                                </Link>

                                <Link to={`/`}>
                                    <Button className='goMain1 m-2' variant="link">Main</Button>
                                </Link>
                            </Row>
                        </Card.Footer>
                    </Card>

                    <Container className='flex-shrink-md'>

                        <h1 className='titleh1 mt-4'>{genre.Name} movies</h1>
                        <Row className='p-2'>
                            <div className='d-flex row m-2'>
                                {movies.map(movie => {
                                    if (movie.Genre.Name === genre.Name) {
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
                                                        <Link to={`/movies/${movie._id}`}>
                                                            <Button variant='link' className='goDetail1'>Read more</Button>
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
                </Row>
            </Container>
        )
    }
};

GenreView.propTypes = {
    genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired
    }).isRequired
};