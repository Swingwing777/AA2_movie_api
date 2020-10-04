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
        const { movie } = this.props;
        console.log(this.props)
        if (!movie) return null;

        return (
            <Container className='' >
                <Row className='genre-view'>
                    <Col>
                        <Row >
                            <span className='labelh1'>{'Genre:\u00A0\u00A0'}</span>
                            <span className='valueh1'>{movie.Genre[0].Name}</span>
                        </Row>
                        <Row className='mt-2'>
                            <span className='label'>{'Description:\u00A0\u00A0'} </span>
                            <span className='value'>{movie.Genre[0].Description}</span>
                        </Row>
                        <Row className='mt-5'>
                            <Link to={`/movies/:movieId`}>
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