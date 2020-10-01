import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Form, Container, Button, Col } from 'react-bootstrap';
import './login-view.scss';
import { RegistrationView } from '../registration-view/registration-view';

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
        console.log('There is no such user')
      });
  };

  const registerUser = (e) => {
    e.preventDefault();
    console.log('new-user');

    setUsername('New');
    props.onLoggedIn(username);
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
              required
            />
          </Form.Group>

          <Form.Group className='p-md-3' controlId='formPassword'>
            <Form.Label className='p-md-3 formLabel'>Password</Form.Label>
            <Form.Control
              type='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder='Enter Password'
              required />
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

/* using .required for PropTypes before login is pointless,
as it flags warnings for entries that have not 
yet been made by the user */
LoginView.propTypes = {
  Username: PropTypes.string,
  Password: PropTypes.string
};