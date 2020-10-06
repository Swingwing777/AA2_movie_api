import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './movie-card.scss';

import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <Card style={{ width: '15em' }} className='m-3 text-center movie-card'>
        <Card.Img variant="top" src={movie.ImagePath} className='thumbNail' />
        <Card.Body>
          <Link to={`/movies/${movie._id}`}>
            <Card.Title>{movie.Title}</Card.Title>
          </Link>
          <Card.Text>{movie.Description.substring(0, 70)}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <Link to={`/movies/${movie._id}`}>
            <Button className='m-auto goDetail' variant="link">More Details</Button>
          </Link>
        </Card.Footer>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired
};