import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Button, Col, Row } from 'react-bootstrap';
import './genre-view.scss';

import { Link } from "react-router-dom";

import './genre-view.scss';

export class GenreView extends React.Component {

    constructor() {
        super();
        this.state = {}
    }

    // // new method to get movies
    // getMovies(token) {
    //     axios.get('https://cors-anywhere.herokuapp.com/bond-movie-api.herokuapp.com/movies', {   //https://cors-anywhere.herokuapp.com
    //         headers: { Authorization: `Bearer ${token}` }        //Access-Control-Allows-Origin: *
    //     })
    //         .then(response => {
    //             console.log(response.data);
    //             // Assign the result to the state
    //             this.setState({
    //                 movies: response.data
    //             });
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // }


    render() {
        const { genre } = this.props;
        console.log(this.props)
        if (!genre) return null;

        return (
            <Container className='' >
                <Row className='genre-view'>
                    <Col>
                        <Row >
                            <span className='titleh1 mt-3'>According to IMDB.com, the following genres apply:</span>
                        </Row>
                        <Row className='mt-3'>
                            <span className='titleh1 genreName'>{genre.Name}{':'}</span>
                        </Row>
                        <Row className='mt-2'>
                            <span className='value genreDescribe'>{genre.Description}</span>
                        </Row>

                        <Row className='mt-5'>
                            <Link to={`/`}>
                                <Button className='goBackMovie' variant="link">Return to Movie View</Button>
                            </Link>
                        </Row>
<<<<<<< HEAD
                        {/*New Back Button */}
                        <Row className='mt-5'>                                        
                            <Link to='' onClick={() => history.back()}>
                            </Link>
                        </Row>
                        {/*New*/}
                        <Row className='mt-5'>
                            <Link to={`/movies/genre/${genre.Name}`}>
                                <Button className='goSameGenre' variant="link">Movies with same genre</Button>
                            </Link>
                        </Row>
=======
>>>>>>> parent of 305f59d... Cease work backup
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

GenreView.propTypes = {
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired
};