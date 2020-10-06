import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Container, Button, Col } from 'react-bootstrap';
import './profile-view.scss';

import { Link } from "react-router-dom";

export class ProfileView extends React.Component {

    constructor() {
        super();
        this.state = {}
    }

    render() {
        const { user } = this.props;
        console.log(this.props)
        if (!user) return null;

        return (
            <Container className='' >
                <Row className='profile-view'>
                    <Col>
                        <Row >
                            <span className='labelh1'>{'Username:\u00A0\u00A0'}</span>
                            <span className='valueh1'>{movie.User.Name}</span>
                        </Row>
                        <Row className='mt-2'>
                            <span className='label'>{'Email:\u00A0\u00A0'} </span>
                            <span className='value'>{movie.User.Email}</span>
                        </Row>
                        <Row >
                            <span className='labelh1'>{'Birthday:\u00A0\u00A0'}</span>
                            <span className='valueh1'>{movie.User.Birthday}</span>
                        </Row>
                        <Row className='mt-5'>
                            <Link to={`/`}>
                                <Button className='goBackMain' variant="link">Return to Main View</Button>
                            </Link>
                        </Row>
                    </Col>
                </Row>

            </Container >
        )
    }
};


// ProfileView.propTypes = {

// };