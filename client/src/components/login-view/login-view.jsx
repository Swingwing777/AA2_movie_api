import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Form, Container, Button, Col } from 'react-bootstrap';
import './login-view.scss';
import { RegistrationView } from '../registration-view/registration-view';

import { Link } from "react-router-dom";

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios.post('https://cors-anywhere.herokuapp.com/bond-movie-api.herokuapp.com/login', {
      Username: username,
      Password: password
    })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log('no such user: ' + e)
      });
  };

  if (username === 'New') return <RegistrationView onLoggedIn={user => this.registerUser(user)} />;

  return (
    <Container className='formwrapper'>
      <Form className='p-md-3'>
        <Form.Row className='d-flex flex-md-row justify-content-center'>
          <Form.Label size='lg' className='formTitle'>Please Login</Form.Label>
        </Form.Row>

        <Form.Row className='justify-content-center mt-3'>
          <Form.Group as={Col} controlId='formUsername'>
            <Form.Label className='formLabel'>Username</Form.Label>
            <Form.Control
              className='entryField'
              type='text'
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder='Enter Username'
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId='formPassword'>
            <Form.Label className='formLabel'>Password</Form.Label>
            <Form.Control
              className='entryField'
              type='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder='Enter Password'
              required />
          </Form.Group>
        </Form.Row>

        <Form.Row className='justify-content-center'>
          <Button className='formButton mt-3' variant='primary' type='submit' onClick={handleSubmit} >
            Submit
          </Button>
        </Form.Row>
        <Form.Row className='justify-content-center'>
          <Link to={`/register`}>
            <Button className='formButton mt-3' variant="link">Register User</Button>
          </Link>
        </Form.Row>
      </Form>
    </Container>
  );
}

/* using .required for PropTypes before login is pointless,
as it flags warnings for entries that have not 
yet been made by the user */
LoginView.propTypes = {
  Username: PropTypes.string,
  Password: PropTypes.string
};