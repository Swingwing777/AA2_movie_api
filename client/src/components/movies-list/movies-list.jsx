// src/components/movies-list/movies-list.jsx
import React from 'react';
import { connect } from 'react-redux';
import { Container, Row } from 'react-bootstrap';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';

import './movies-list.scss';

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.Title.includes(visibilityFilter));
  }

  if (!movies) return <div className="main-view" />;

  return <div className="movies-list">
    <Container style={{ width: 'fit-content(90%)' }}>
      <Row className='d-flex p-2 justify-content-around'>
        <VisibilityFilterInput visibilityFilter={visibilityFilter} />
      </Row>
      <Row className='d-flex p-2 justify-content-around'>
        {filteredMovies.map(m => <MovieCard key={m._id} movie={m} />)}
      </Row>
    </Container>
  </div>;
}

export default connect(mapStateToProps)(MoviesList);