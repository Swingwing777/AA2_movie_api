import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import './login-view.scss';
import { RegistrationView } from '../registration-view/registration-view';

export function LoginView(props) {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(Username, Password);
    // Send a request to the server for authentication then call props.onLoggedIn(username)
    props.onLoggedIn(Username);
  };

  const registerUser = (e) => {
    e.preventDefault();
    console.log('new-user');

    setUsername('New');
    props.onLoggedIn(Username);
    console.log(props);
  };

  if (Username === 'New') return <RegistrationView onLoggedIn={user => this.registerUser(user)} />;

  return (
    <Container className='formwrapper' fluid='md'>
      <Form className='p-md-3'>
        <Form.Row className='d-flex flex-md-row justify-content-center'>
          <Form.Group className='p-md-3' controlId='formUsername'>
            <Form.Label className='p-md-3 formLabel'>Username</Form.Label>
            <Form.Control
              type='text'
              value={Username}
              onChange={e => setUsername(e.target.value)}
              placeholder='Enter Username'
            />
          </Form.Group>

          <Form.Group className='p-md-3' controlId='formPassword'>
            <Form.Label className='p-md-3 formLabel'>Password</Form.Label>
            <Form.Control
              type='password'
              value={Password}
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