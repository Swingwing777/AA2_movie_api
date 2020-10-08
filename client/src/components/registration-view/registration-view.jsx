import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { LoginView } from '../login-view/login-view';
import { Form, Container, Col, Button, Row } from 'react-bootstrap';
import './registration-view.scss';

import { BrowserRouter as Router, Route, Link, Switch, NavLink } from 'react-router-dom';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const registerUser = (e) => {
    e.preventDefault();
    axios.post('https://cors-anywhere.herokuapp.com/bond-movie-api.herokuapp.com/users', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
      .then(response => {
        const data = response.data;
        console.log(data);
        window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
      })
      .catch(e => {
        console.log('Please check and try again')
      });
  };

  const loginUser = (e) => {
    e.preventDefault();
    setUsername('Registered');
    props.onLoggedIn(username);
  };

  if (username === 'Registered') return <LoginView onLoggedIn={user => this.handleSubmit(user)} />;

  return (
    <Container className='formwrapper' >
      <Form className='p-md-3'>
        <Form.Row className='d-flex flex-md-row justify-content-center'>
          <Form.Label size='lg' className='formTitle'>Please Register</Form.Label>
        </Form.Row>

        <Form.Row className='justify-content-center mt-3'>
          <Form.Group as={Col} controlId='formGridUsername'>
            <Form.Label className='formLabel'>Username</Form.Label>
            <Form.Control
              className='entryField'
              type='text'
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder='Enter Username'
            />
          </Form.Group>

          <Form.Group as={Col} controlId='formGridPassword'>
            <Form.Label className='formLabel'>Password</Form.Label>
            <Form.Control
              className='entryField'
              type='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder='Enter Password' />
          </Form.Group>
        </Form.Row>

        <Form.Row className='d-flex flex-md-row justify-content-center'>
          <Form.Group as={Col} controlId='formGridEmail'>
            <Form.Label className='formLabel'>Email</Form.Label>
            <Form.Control
              className='entryField'
              type='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder='Enter Email' />

          </Form.Group>

          <Form.Group as={Col} controlId='formBirthday'>
            <Form.Label className='formLabel'>Birthday</Form.Label>
            <Form.Control
              className='entryField'
              type='date'
              value={birthday}
              onChange={e => setBirthday(e.target.value)}
              placeholder='Enter Birthday' />
          </Form.Group>
        </Form.Row>
        <Row className='formPromise'>We will never share your details</Row>

        <Form.Row className='justify-content-center'>
          <Button className='formButton mt-3' variant='primary' type='submit' onClick={registerUser} >
            Submit
        </Button>
        </Form.Row>

        <Form.Row className='justify-content-center'>
          <Router>
            <Link to={`/`}>
              <Button className='formButton mt-3' variant="link">Home</Button>
            </Link>
          </Router>
        </Form.Row>
      </Form >
    </Container>
  );
}

RegistrationView.propTypes = {
  Username: PropTypes.string,
  Password: PropTypes.string,
  Email: PropTypes.string,
  Birthday: PropTypes.string,
  onClick: PropTypes.func
};
