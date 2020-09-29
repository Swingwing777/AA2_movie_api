import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { LoginView } from '../login-view/login-view';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import './registration-view.scss';



export function RegistrationView(props) {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [Email, setEmail] = useState('');
  const [Birthday, setBirthday] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(Username, Password, Email, Birthday);
    // Send a request to the server for authentication then call props.onLoggedIn(username)
    return <LoginView />
  };

  return (
    <Container className='formwrapper' fluid='md'>
      <Form className='p-md-3'>
        <Form.Row className='d-flex flex-md-row justify-content-center'>
          <Form.Label size='lg' className='formLabel'>Please Register</Form.Label>
        </Form.Row>

        <Form.Row className='d-flex flex-md-row justify-content-center'>
          <Form.Group as={Col} xs={3} controlId='formGridUsername'>
            <Form.Label className='formLabel'>Username</Form.Label>
            <Form.Control
              type='text'
              value={Username}
              onChange={e => setUsername(e.target.value)}
              placeholder='Enter Username'
            />
          </Form.Group>

          <Form.Group as={Col} xs={3} controlId='formGridPassword'>
            <Form.Label className='formLabel'>Password</Form.Label>
            <Form.Control
              type='password'
              value={Password}
              onChange={e => setPassword(e.target.value)}
              placeholder='Enter Password' />
          </Form.Group>
        </Form.Row>

        <Form.Row className='d-flex flex-md-row justify-content-center'>
          <Form.Group as={Col} xs={3} controlId='formGridEmail'>
            <Form.Label className='formLabel'>Email</Form.Label>
            <Form.Control
              type='email'
              value={Email}
              onChange={e => setEmail(e.target.value)}
              placeholder='Enter Email' />
            <Form.Text className='formPromise'>We will never share your details</Form.Text>
          </Form.Group>

          <Form.Group as={Col} xs={3} controlId='formBirthday'>
            <Form.Label className='formLabel'>Birthday</Form.Label>
            <Form.Control
              type='date'
              value={Birthday}
              onChange={e => setBirthday(e.target.value)}
              placeholder='Enter Birthday' />
          </Form.Group>
        </Form.Row>

        <Form.Row className='d-flex flex-md-row justify-content-center'>
          <Button as={Col} xs={1} className='px-2 mr-2 formButton' variant='primary' type='submit' onClick={handleSubmit} >
            Submit
        </Button>

          <Form.Group as={Col} xs='auto' id="formGridCheckbox">
            <Form.Check className='px-4 formLabel' type="checkbox" label="I am not a robot" />
          </Form.Group>
        </Form.Row>
      </Form >
    </Container>
  );
}

RegistrationView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string,
    Password: PropTypes.string,
    Email: PropTypes.string,
    Birthday: PropTypes.date
  })
}