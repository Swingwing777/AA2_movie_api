import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Form, Container, Button, Col } from 'react-bootstrap';
import './login-view.scss';

import { BrowserRouter as Router, Link, NavLink, Redirect } from 'react-router-dom';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [apiData, setApiData] = useState(null);

  const handleSubmit = (e) => {
    const source = axios.CancelToken.source();

    //console.log(username, password);
    e.preventDefault();
    /* Send a request to the server for authentication */

    axios.post('https://cors-anywhere.herokuapp.com/bond-movie-api.herokuapp.com/login', {
      Username: username,
      Password: password
    })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      }).catch(e => {
        alert('User or Password details do not match')
      })
    axios.get("https://jsonplaceholder.typicode.com/todos", {
      cancelToken: source.token
    }).then(response => {
      setApiData(response.data);
    }).catch(e => {
      console.log('Cancel Token error: ' + e)            // Catch 2: for cancel token error
    });
  }

  if (props.isAuth) {
    return <Redirect to="/" />
  }
  if (username === 'New') return <Redirect to="/register" />

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

          <NavLink to={`/register`} className="btn btn-primary formButton mt-3">
            Register User
          </NavLink>

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