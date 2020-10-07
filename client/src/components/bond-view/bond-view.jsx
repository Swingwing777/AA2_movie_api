import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Button, Card, Row } from 'react-bootstrap';
import moment from 'moment';
import { Link } from "react-router-dom";

import './bond-view.scss';

export class BondView extends React.Component {

    constructor() {
        super();
        this.state = {}
    }

    render() {
        const { bondactor, movies } = this.props;
        // console.log(this.props)
        if (!bondactor) return null;

        return (

            <Container className='d-flex justify-content-center' >
                <Row className='p-2 justify-content-center'>
                    <Card style={{ width: 'fit-content(80%)' }} className='m-3 h-160 text-center movie-card'>
                        <Card.Body className='cardBody p-1'>
                            <Card.Img variant="top" className='bondImage pt-1' src={bondactor.Image} />
                            <Card.Title className='titleh1 mt-3'>{bondactor.Name}</Card.Title>
                            <Card.Text className='m-3'>

                                <span className='textMain'>{bondactor.Bio}</span>
                            </Card.Text>
                            <Card.Text className='text-left mt-4 m-2'>
                                <span className='label'>{
                                    'Born:\u00A0\u00A0' +
                                    moment(bondactor.Birth.Date).format('D MMM YYYY') +
                                    ',\u00A0\u00A0' + bondactor.Birth.Place}
                                </span>
                            </Card.Text>
                            <Card.Text className='text-left m-2'>
                                {/* <span className='label'>{'Place:\u00A0\u00A0'}</span> */}
                                <span className='value'>{
                                    bondactor.Death.Date ?
                                        'Died:\u00A0\u00A0' +
                                        moment(bondactor.Death.Date).format('D MMM YYYY') +
                                        ',\u00A0\u00A0' + bondactor.Death.Place :
                                        ''}
                                </span>
                            </Card.Text>
                            <Card.Text className='text-left mt-4 m-2'>
                                <span className='textMain'>{'Also known for:\u00A0\u00A0'}</span>
                                <span className='textMain'>{bondactor.KnownFor.join(',\u00A0\u00A0')}</span>
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="cardFoot border-top-0">
                            <Row className='d-flex flex-md-row justify-content-center'>
                                <Link to="" onClick={() => history.back()}>
                                    <Button className='m-2 goMovie2' variant="link">Movie</Button>
                                </Link>

                                <Link to={`/`}>
                                    <Button className='m-2 goMain2' variant="link">Main</Button>
                                </Link>
                            </Row>
                        </Card.Footer>
                    </Card>

                    <Container className='flex-shrink-md'>

                        <h1 className='titleh1 mt-4'>Bond movies starring {bondactor.Name}</h1>
                        <Row>
                            <div className='d-flex row m-2'>
                                {movies.map(movie => {
                                    if (movie.BondActor.Name === bondactor.Name) {
                                        return (
                                            <div key={movie._id}>
                                                <Card style={{ width: '9em' }} className="pt-3 m-1 p-2 text-center movie-card h-100">
                                                    <Card.Img variant='top' src={movie.ImagePath} className='thumbNail m-auto' />
                                                    <Card.Body className='cardBody p-0'>
                                                        <Link to={`/movies/${movie._id}`}>
                                                            <Card.Title className='titleh2 p-1'>{movie.Title}</Card.Title>
                                                        </Link>
                                                    </Card.Body>
                                                    <Card.Footer className='cardFoot border-top-0 d-flex justify-content-center'>
                                                        <Link to={`/movies/${movie._id}`}>
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
                </Row>
            </Container>

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