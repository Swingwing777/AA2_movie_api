import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <Card style={{ width: '15em' }} className='m-3 text-center movie-card'>
        <Card.Img variant="top" src={movie.ImagePath} className='thumbNail' />
        <Card.Body className='cardBody p-1'>
          <Link to={`/movies/${movie._id}`}>
            <Card.Title className='cardTitle p-1'>{movie.Title}</Card.Title>
          </Link>
          <Card.Text className='cardText'>{movie.Description.substring(0, 70) + ' ...'}</Card.Text>
        </Card.Body>
        <Card.Footer className='cardFoot border-top-0'>
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