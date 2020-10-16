import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { LoginView } from '../login-view/login-view';
import moment from 'moment';
import { Form, Container, Col, Button, Row } from 'react-bootstrap';
import './update-view.scss';

import { BrowserRouter as Router, Route, Link, Switch, NavLink } from 'react-router-dom';

export function UpdateView(props) {
  const [username, updateUsername] = useState('');
  const [password, updatePassword] = useState('');
  const [email, updateEmail] = useState('');
  const [birthday, updateBirthday] = useState('');
  const [apiData, setApiData] = useState(null);

  const getUser = (e) => {
    const source = axios.CancelToken.source();
    const user = localStorage.getItem('user')
    e.preventDefault();

    // axios.get(`https://cors-anywhere.herokuapp.com/bond-movie-api.herokuapp.com/users/${user}`, {
    axios.get(`/users/${user}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(response => {
        const data = response.data;
        updateUsername(data.Username);
        updateEmail(data.Email);
        // updateBirthday(data.Birthday);

        console.log('This is user: ' + response.data.Username);
      })
      .catch(e => {
        console.log('Sorry, there has been an error: ' + e);
      })
    axios.get("https://jsonplaceholder.typicode.com/todos", {
      cancelToken: source.token
    }).then(response => {
      setApiData(response.data);
    }).catch(e => {
      console.log('Cancel Token error: ' + e)            // Catch for cancel token error
    });
  }

  const updateUser = (e) => {
    const user = localStorage.getItem('user')
    e.preventDefault();

    // axios.put(`https://cors-anywhere.herokuapp.com/bond-movie-api.herokuapp.com/users/${user}`, {
    axios.put(`/users/${user}`, {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(response => {
        const data = response.data;
        alert('Your profile changes were successful');
        localStorage.setItem('user', data.Username);
        console.log(response.data);
        window.open(`/main`, '_self');
      })
      .catch(e => {
        console.log('Please check and try again')
      });
  };

  return (

    < Container style={{ width: 'fit-content(90%)' }} className='formwrapper' >
      <Form className='p-md-3'>
        <Form.Row className='d-flex flex-md-row justify-content-center'>
          <Form.Label size='lg' className='formTitle'>Update Details</Form.Label>
        </Form.Row>

        <Form.Row className='justify-content-center mt-3'>
          <Form.Group as={Col} controlId='formGridUsername'>
            <Form.Label className='formLabel'>Username:  </Form.Label>
            <Form.Control
              className='entryField'
              type='username'
              value={username}
              onChange={e => updateUsername(e.target.value)}
              placeholder={username} />
            {/* className='userField'
              defaultValue={localStorage.getItem('user') + '\u00A0\u00A0\u00A0\(This cannot be changed)'}
              readOnly /> */}
          </Form.Group>

          <Form.Group as={Col} controlId='formGridPassword'>
            <Form.Label className='formLabel'>Password</Form.Label>
            <Form.Control
              className='entryField'
              type='password'
              value={password}
              onChange={e => updatePassword(e.target.value)}
              placeholder='Old or New Password required' />
          </Form.Group>
        </Form.Row>

        <Form.Row className='d-flex flex-md-row justify-content-center'>
          <Form.Group as={Col} controlId='formGridEmail'>
            <Form.Label className='formLabel'>Email</Form.Label>
            <Form.Control
              className='entryField'
              type='email'
              value={email}
              onChange={e => updateEmail(e.target.value)}
              placeholder={email} />

          </Form.Group>

          <Form.Group as={Col} controlId='formBirthday'>
            <Form.Label className='formLabel'>Birthday</Form.Label>
            <Form.Control
              className='entryField'
              type='date'
              value={birthday}
              onChange={e => updateBirthday(e.target.value)}
              placeholder={birthday} />
          </Form.Group>
        </Form.Row>
        <Row className='mt-3 d-flex flex-md-row justify-content-center formPromise'>We will never share your details
        </Row>
        <Router>
          <Form.Row className='justify-content-center'>

            <Button className='formButton m-3' variant='primary' type='submit' onClick={getUser} >
              Current Details
            </Button>

            <Button className='formButton m-3' variant='primary' type='submit' onClick={updateUser} >
              Submit
            </Button>
          </Form.Row>

          <Form.Row className='justify-content-center'>
            {/* <Router>
            <Link to={`/`}>
              <Button className='formButton mt-3' variant="link">Home</Button>
            </Link>
          </Router> */}

            <Link to="" className='btn formButton m-3' onClick={() => history.back()}>
              Back
            </Link>

          </Form.Row>
        </Router>
      </Form >
    </Container >
  );
}

UpdateView.propTypes = {
  Username: PropTypes.string,
  Password: PropTypes.string,
  Email: PropTypes.string,
  Birthday: PropTypes.string,
  onClick: PropTypes.func
};
