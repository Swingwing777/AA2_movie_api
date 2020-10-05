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

    render() {
        const { movie, genre } = this.props;
        console.log(this.props)
        if (!genre) return null;

        return (
            <Container className='' >
                <Row className='genre-view'>
                    <Col>
                        <Row >
                            <span className='labelh1'>According to IMDB.com, the following genres apply:</span>
                        </Row>
                        <Row className='mt-3'>
                            <span className='valueh1'>{genre[0].Name}</span>
                            <span className='labelh1'>{':'}</span>
                        </Row>
                        <Row className='mt-2'>
                            <span className='value'>{genre[0].Description}</span>
                        </Row>
                        <Row className='mt-3'>
                            <span className='valueh1'>{genre[1].Name}</span>
                            <span className='labelh1'>{':'}</span>
                        </Row>
                        <Row className='mt-2'>
                            <span className='value'>{genre[1].Description}</span>
                        </Row>
                        <Row className='mt-3'>
                            <span className='valueh1'>{genre[2].Name}</span>
                            <span className='labelh1'>{':'}</span>
                        </Row>
                        <Row className='mt-2'>
                            <span className='value'>{genre[2].Description}</span>
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

GenreView.propTypes = {
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired
};













GenreView.propTypes = {

};