import React from 'react';
import styles from './LoginScreen.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router';
import Screen from '../../components/Screen/Screen';
import { useState, useEffect } from 'react';

import { Form, Button, Row, Col, Card, InputGroup } from 'react-bootstrap';
import Message from '../../components/Message/Message';
import Loader from '../../components/Loader/Loader';
import FormContainer from '../../components/FormContainer/FormContainer';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    solid,
    // regular,
    // brands,
} from '@fortawesome/fontawesome-svg-core/import.macro';

import { useLoginQuery } from '../../features/api/atHomeApi/slices/usersSlice';

function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [skipDataFetching, setSkipDataFetching] = useState(true);
    let [loginErrorMessage, setLoginErrorMessage] = useState(null);

    const userInfoFromStorage = localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null;
    console.log('userInfoFromStorage: ', userInfoFromStorage);

    const location = useLocation();
    const navigate = useNavigate();
    const redirect = location.search ? location.search.split('=')[1] : '/';
    // console.log('location: ', location);
    // console.log('location.search : ', location.search);
    // console.log('redirect: ', redirect);

    const { data, isLoading, isSuccess, isError, error } = useLoginQuery(
        {
            email,
            password,
        },
        { skip: skipDataFetching }
    );

    useEffect(() => {
        if (!skipDataFetching && (isSuccess || isError)) {
            if (isError) {
                setLoginErrorMessage(error.data.message);
            } else {
                setLoginErrorMessage(null);
            }
            setSkipDataFetching(true);
            // saving userInfo in local storage
            if (isSuccess && data) {
                localStorage.setItem('userInfo', JSON.stringify(data));
                navigate(redirect);
            }
        }
    }, [data, navigate, redirect, skipDataFetching, error, isError, isSuccess]);

    const submitHandler = async (e) => {
        e.preventDefault();
        setSkipDataFetching(false);
    };

    return (
        <Screen>
            <Card className={styles.loginCard}>
                <FormContainer>
                    <h1 className='mb-3 p-0'>Login</h1>
                    {loginErrorMessage && (
                        <Message variant='danger'>{loginErrorMessage}</Message>
                    )}
                    {isLoading && <Loader />}
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='email' className='mb-3'>
                            {/* <Form.Label>E-Mail Addresse</Form.Label> */}
                            <InputGroup>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={solid('user')} />
                                </InputGroup.Text>
                                <Form.Control
                                    type='email'
                                    autoComplete='email'
                                    placeholder='E-Mail'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group controlId='password' className='mb-3'>
                            {/* <Form.Label>Passwort</Form.Label> */}
                            <InputGroup>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={solid('key')} />
                                </InputGroup.Text>
                                <Form.Control
                                    type='password'
                                    autoComplete='password'
                                    placeholder='Passwort'
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </InputGroup>
                        </Form.Group>
                        <Button type='submit' variant='primary'>
                            Einloggen
                        </Button>
                    </Form>
                    <Row className='py-3'>
                        <Col>
                            {'Neu hier? '}
                            <Link
                                to={
                                    redirect
                                        ? `/register?redirect=${redirect}`
                                        : '/register'
                                }
                            >
                                {'Zur Anmeldung'}
                            </Link>
                        </Col>
                    </Row>
                </FormContainer>
            </Card>
            {/* <div>{content}</div> */}
        </Screen>
    );
}

export default LoginScreen;
