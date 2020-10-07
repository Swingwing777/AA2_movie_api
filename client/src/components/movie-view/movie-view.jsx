import React from 'react';
import PropTypes from 'prop-types';
import { Container, Button, Row, Card, Col } from 'react-bootstrap';

import { Link } from "react-router-dom";

import './movie-view.scss';

export class MovieView extends React.Component {

  constructor() {
    super();
    this.state = {}
  }

  render() {
    const { movie } = this.props;
    console.log(this.props)
    if (!movie) return null;

    return (
      <Container className='d-flex justify-content-center' >
        <Card style={{ width: 'fit-content(80%)' }} className='m-3 h-160 text-center movie-card'>
          <Card.Body className='cardBody p-1'>
            <Row className='p-2 justify-content-center'>
              <Col>
                <Card.Img variant="left" className='movie-poster' src={movie.ImagePath} />
              </Col>
              <Col>
                <Card.Title className='titleh1 mt-3'>{movie.title}</Card.Title>
                <Card.Text className='m-3'>
                  <span className='label'>{'Director:\u00A0\u00A0'}</span>
                  <span className='value'>{movie.Director.Name}</span>
                </Card.Text>
                <Card.Text className='text-left mt-3'>
                  <span className='label'>{'Release Year:\u00A0\u00A0'} </span>
                  <span className='value'>{movie.Year}</span>
                </Card.Text>
                <Card.Text className='text-left mt-3'>
                  <span className='label'>{'Plot Summary:\u00A0\u00A0'}{movie.Description}</span>
                </Card.Text>
                <Card.Text className='text-left mt-3'>
                  <span className='label'>{'Genre:\u00A0\u00A0'}</span>
                  <span className='value'>{movie.Genre.Name}</span>
                </Card.Text>
                <Card.Text className='text-left mt-3'>
                  <span className='label'>{'Bond:\u00A0\u00A0'}</span>
                  <span className='value'>{movie.BondActor.Name}</span>
                </Card.Text>
                <Card.Text className='text-left mt-3'>
                  <span className='label'>{'Heroine:\u00A0\u00A0'}</span>
                  <span className='value'>{movie.Heroine}</span>
                </Card.Text>
                <Card.Text className='text-left mt-3'>
                  <span className='label'>{'Villain:\u00A0\u00A0'}</span>
                  <span className='value'>{movie.Villain}</span>
                </Card.Text>
                <Card.Text className='text-left mt-3'>
                  <span className='label'>{'Supporting Cast:\u00A0\u00A0'}</span>
                  <span className='value'>{movie.Actors.join(', ')}</span>
                </Card.Text>
                <Card.Text className='text-left mt-3'>
                  <span className='label'>{'Title Song by:\u00A0\u00A0'}</span>
                  <span className='value'>{movie.SongArtist}</span>
                </Card.Text>
              </Col>
            </Row>

          </Card.Body>

          <Card.Footer className="cardFoot border-top-0">
            <Row className='mt-3'>
              <Link to={`/`}>
                <Button className='goFacts m-3' variant="link">Main Menu</Button>
              </Link>
              <Link to={`/actors/${movie.Title}/${movie.BondActor.Name}`}>
                <Button className='goFacts m-3' variant="link">James Bond</Button>
              </Link>
            </Row>
            <Row className='mt-3'>
              <Link to={`/directors/${movie.Title}/${movie.Director.Name}`}>
                <Button className='goFacts m-3' variant="link">Director</Button>
              </Link>
              <Link to={`/genres/${movie.Title}/${movie.Genre.Name}`}>
                <Button className='goFacts m-3' variant="link">Genre</Button>
              </Link>
            </Row>
          </Card.Footer>
        </Card>

      </Container>
    )
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    BondActor: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }).isRequired,
    Heroine: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    ThumbNail: PropTypes.string.isRequired
  }).isRequired
};
