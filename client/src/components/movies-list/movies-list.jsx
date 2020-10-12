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
    <Container>
      <Row>
        <VisibilityFilterInput visibilityFilter={visibilityFilter} />
        {filteredMovies.map(m => <MovieCard key={m._id} movie={m} />)}
      </Row>
    </Container>
  </div>;
}

export default connect(mapStateToProps)(MoviesList);


                    // return movies.map((m) => (                         /* Or else go to MovieCards */
                    //   <MovieCard key={m._id} movie={m} {...props} />   /* {...props} = bring all the props passed by render from MainView to MovieCard */                                                 
                    // ));