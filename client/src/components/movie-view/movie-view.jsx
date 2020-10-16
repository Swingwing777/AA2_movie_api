import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Container, Button, Row, Card, Col } from 'react-bootstrap';

import { Link } from "react-router-dom";

import { setMovies } from '../../actions/actions';
import { cancelToken } from '../../actions/actions';
import { setUserProf } from '../../actions/actions';
import './movie-view.scss';

export class MovieView extends React.Component {

  constructor() {
    super();
    this.state = {}
  }

  getUser(token) {
    let user = localStorage.getItem('user')
    const source = axios.CancelToken.source();

    axios.get(`https://cors-anywhere.herokuapp.com/bond-movie-api.herokuapp.com/users/${user}`, {
      // axios.get(`https://bond-movie-api.herokuapp.com/users/${user}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        setUserProf(response.data);                           // Change 2 (not 'setState')
      })
      .catch(e => {
        console.log('User error: ' + e);
      })
    axios.get("https://jsonplaceholder.typicode.com/todos", {
      cancelToken: source.token
    }).then(response => {
      cancelToken(response.data);                             // Change 3 (not 'setState')
    }).catch(e => {
      console.log('Cancel Token error: ' + e)
    });
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    this.getUser(accessToken);
  }

  addFavorite(movieId) {
    const { movie } = this.props;
    let user = localStorage.getItem('user');

    axios.post(`https://cors-anywhere.herokuapp.com/bond-movie-api.herokuapp.com/users/${user}/movieID/${movieId} `, {
      // axios.post(`https://bond-movie-api.herokuapp.com/users/${user}/movieID/${movieId} `, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(response => {
        alert('Movie successfully added to favorites');
      })
      .catch(e => {
        alert(`${movie.Title} could not be added to your favorites ` + e)
      });
  }

  deleteFavorite(movieId) {
    let user = localStorage.getItem('user');

    axios.delete(`https://cors-anywhere.herokuapp.com/bond-movie-api.herokuapp.com/users/${user}/movieID/${movieId} `, {
      // axios.delete(`https://bond-movie-api.herokuapp.com/users/${user}/movieID/${movieId} `, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(response => {
        setUserProf(response.data);
        alert('Movie successfully deleted from favorites');
      })
      .catch(e => {
        alert('Movie could not be deleted from favorites ' + e)
      });
  }

  render() {
    const { movie, userProfile } = this.props;
    // console.log(this.props)
    if (!movie) return null;

    return (

      <Container style={{ width: '100%' }} className='d-flex justify-content-center' >
        <Card style={{ width: '100%' }} className='px-0 m-1 h-160 text-center movie-card'>
          <Card.Body className='cardBody p-1'>
            <Card.Img style={{ width: '30%' }} variant="top" className='movie-poster' src={movie.ImagePath} />
            <Card.Title className='titleh1 mt-3'>{movie.Title}</Card.Title>
            <Card.Text className='text-left mt-3'>
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


          </Card.Body>

          <Card.Footer className="cardFoot border-top-0">
            <Row className='mt-1 d-flex flex-md-row justify-content-center'>
              <Link to={`/`}>
                <Button className='goFacts m-3' variant="link">Main Menu</Button>
              </Link>
              <Link to={`/actors/${movie.Title}/${movie.BondActor.Name}`}>
                <Button className='goFacts m-3' variant="link">James Bond</Button>
              </Link>
            </Row>
            <Row className='mt-1 d-flex flex-md-row justify-content-center'>
              <Link to={`/directors/${movie.Title}/${movie.Director.Name}`}>
                <Button className='goFacts m-3' variant="link">Director</Button>
              </Link>
              <Link to={`/genres/${movie.Title}/${movie.Genre.Name}`}>
                <Button className='goFacts m-3' variant="link">Genre</Button>
              </Link>
              <Button className="goAdd m-3" onClick={() => this.addFavorite(movie._id)}>
                <span className="d-flex align-items-center">
                  <i className="material-icons star mr-3">grade</i>
                  Add favorite
              </span>

              </Button>
              {/* <Link to="" onClick={() => this.addFavorite(movie._id)}>
                <Button variant='link' className='m-3 goAdd'>Add Favorite</Button>
              </Link>
              <Link to="" onClick={() => this.deleteFavorite(movie._id)}>
                <Button variant='link' className='m-3 goDelete'>Remove Favorite</Button>
              </Link> */}
            </Row>
          </Card.Footer>
        </Card>

      </Container>

    )
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Year: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      Name: PropTypes.string.isRequired
    }).isRequired,
    BondActor: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      Name: PropTypes.string.isRequired,
    }).isRequired,
    Director: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      Name: PropTypes.string.isRequired,
    }).isRequired,
    Actors: PropTypes.array.isRequired,
    Heroine: PropTypes.string.isRequired,
    Villain: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    ThumbNail: PropTypes.string.isRequired,
    SongArtist: PropTypes.string.isRequired,
    Featured: PropTypes.boolean,
  }).isRequired
};
