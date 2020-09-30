import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Form, Container, Button, Col } from 'react-bootstrap';
import './login-view.scss';
import { RegistrationView } from '../registration-view/registration-view';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username)
  };

  const registerUser = (e) => {
    e.preventDefault();
    console.log('new-user');

    setUsername('New');
    props.onLoggedIn(username);  // this 
    console.log(props);
  };

  if (username === 'New') return <RegistrationView onLoggedIn={user => this.registerUser(user)} />;

  return (
    <Container className='formwrapper' fluid='md'>
      <Form className='p-md-3'>
        <Form.Row className='d-flex flex-md-row justify-content-center'>
          <Form.Group className='p-md-3' controlId='formUsername'>
            <Form.Label className='p-md-3 formLabel'>Username</Form.Label>
            <Form.Control
              type='text'
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder='Enter Username'
            />
          </Form.Group>

          <Form.Group className='p-md-3' controlId='formPassword'>
            <Form.Label className='p-md-3 formLabel'>Password</Form.Label>
            <Form.Control
              type='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder='Enter Password' />
          </Form.Group>
        </Form.Row>

        <Form.Row className='py-3 d-flex justify-content-center'>
          <Button as={Col} xs={1} className='formButton' variant='primary' type='submit' onClick={handleSubmit} >
            Submit
          </Button>
        </Form.Row>
        <Form.Row className='py-3 d-flex justify-content-center'>
          <Button as={Col} xs={1} className='formButton' variant='primary' type='submit' onClick={registerUser} >
            Register New User
          </Button>
        </Form.Row>
      </Form>
    </Container>
  );
}

LoginView.propTypes = {
  Username: PropTypes.string,
  Password: PropTypes.string
};