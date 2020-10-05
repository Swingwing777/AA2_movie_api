import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Button, Col, Row } from 'react-bootstrap';

import { Link } from "react-router-dom";

import './bond-view.scss';

export class BondView extends React.Component {

    constructor() {
        super();
        this.state = {}
    }

    render() {
        const { bondactor } = this.props;
        console.log(this.props)
        console.log(bondactor)
        if (!bondactor) return null;

        return (
            <Container className='' >
                <Row className='bond-view'>
                    <Row className='d-flex'>
                        <Col xs={5}>
                            <img className='bondImage' src={bondactor.Image} />
                        </Col>
                        <Col>
                            <Row >
                                <span className='labelh1'>{'Bond played by:\u00A0\u00A0'}</span>
                                <span className='valueh1'>{bondactor.Name}</span>
                            </Row>
                            <Row className='mt-2'>
                                <span className='label'>{'Biography:\u00A0\u00A0'} </span>
                                <span className='value'>{bondactor.Bio}</span>
                            </Row>
                            <Row className='mt-2'>
                                <span className='label'>{'Date of Birth:\u00A0\u00A0'} </span>
                                <span className='value'>{bondactor.Birth.Date}</span>
                            </Row>
                            <Row className='mt-2'>
                                <span className='label'>{'Place of Birth:\u00A0\u00A0'}</span>
                                <span className='value'>{bondactor.Birth.Place}</span>
                            </Row>
                            <Row className='mt-2'>
                                <span className='label'>{'Date of Death:\u00A0\u00A0'}</span>
                                <span className='value'>{bondactor.Death.Date}</span>
                            </Row>
                            <Row className='mt-2'>
                                <span className='label'>{'Place of Death:\u00A0\u00A0'}</span>
                                <span className='value'>{bondactor.Death.Place}</span>
                            </Row>
                            <Row className='mt-2'>
                                <span className='label'>{'Known for:\u00A0\u00A0'}</span>
                                <span className='value'>{bondactor.KnownFor}</span>
                            </Row>

                            <Row className='mt-5'>
                                <Link to={`/`}>
                                    <Button className='goBackMovie' variant="link">Return to Movie View</Button>
                                </Link>
                            </Row>
                        </Col>
                    </Row>
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

BondView.propTypes = {
    bondactor: PropTypes.shape({
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
        KnownFor: PropTypes.array.required
    }).isRequired
};