import React from 'react';
import PropTypes from 'prop-types';
import { Container, Button, Row, Col } from 'react-bootstrap';

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
      <Container className='' >
        <Row className='movie-view'>
          <Row className='d-flex'>
            <Col xs={5}>
              <img className='movie-poster' src={movie.ImagePath} />
            </Col>
            <Col>
              <Row >
                <span className='labelh1'>{'Title:\u00A0\u00A0'}</span>
                <span className='valueh1'>{movie.Title}</span>
              </Row>
              <Row className='mt-2'>
                <span className='label'>{'Release Year:\u00A0\u00A0'} </span>
                <span className='value'>{movie.Year}</span>
              </Row>
              <Row className='mt-2'>
                <span className='label'>{'Plot Summary:\u00A0\u00A0'}</span>
                <span className='value'>{'\u00A0\u00A0'}{movie.Description}</span>
              </Row>
              <Row className='mt-2'>
                <span className='label'>{'Genre:\u00A0\u00A0'}</span>
                <span className='value'>{movie.Genres[0].Name}</span>
              </Row>
              <Row className='mt-2'>
                <span className='label'>{'Agent 007 played by:\u00A0\u00A0'}</span>
                <span className='value'>{movie.BondActor.Name}</span>
              </Row>
              <Row className='mt-2'>
                <span className='label'>{'Heroine:\u00A0\u00A0'}</span>
                <span className='value'>{movie.Heroine}</span>
              </Row>
              <Row className='mt-2'>
                <span className='label'>{'Villain:\u00A0\u00A0'}</span>
                <span className='value'>{movie.Villain}</span>
              </Row>
              <Row className='movie-support'>
                <span className='label'>{'Supporting Actors:\u00A0\u00A0'}</span>
                <span className='value'>{movie.Actors}</span>
              </Row>
              <Row className='mt-2'>
                <span className='label'>{'Director:\u00A0\u00A0'}</span>
                <span className='value'>{movie.Director.Name}</span>
              </Row>
              <Row className='mt-2'>
                <span className='label'>{'Title Song by:\u00A0\u00A0'}</span>
                <span className='value'>{movie.SongArtist}</span>
              </Row>

              <Row className='mt-5'>
                <Link to={`/`}>
                  <Button className='goBackMain' variant="link">Return to Main Menu</Button>
                </Link>
              </Row>
              <Row className='mt-5'>
                <Link to={`/actors/${movie.Title}/${movie.BondActor.Name}`}>
                  <Button className='goBond' variant="link">James Bond details</Button>
                </Link>
              </Row>
              <Row className='mt-5'>
                <Link to={`/directors/${movie.Title}/${movie.Director.Name}`}>
                  <Button className='goDirector' variant="link">Director details</Button>
                </Link>
              </Row>
              <Row className='mt-5'>
                <Link to={`/genres/${movie.Title}/${movie.Genres[0].Name}`}>
                  <Button className='goGenre' variant="link">Genre details</Button>
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
