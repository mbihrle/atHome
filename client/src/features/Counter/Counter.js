import React from 'react';
import styles from './Counter.module.css'
import { useSelector, useDispatch } from 'react-redux';
import {
    increment,
    decrement,
    reset,
    incrementByAmount,
} from './counterSlice';

import { useState } from 'react';
import { Container, Card, Button, Row, Col, Table } from 'react-bootstrap';

function Counter() {
    const count = useSelector((state) => state.counter.count);
    const dispatch = useDispatch();

    const [incrementAmount, setIncrementAmout] = useState(0);

    const addValue = Number(incrementAmount) || 0;

    const resetAll = () => {
        setIncrementAmout(0);
        dispatch(reset());
    };

    return (
        <Container>
            <h1 className='text-center'>{`Counter`}</h1>

            <span
                className='d-flex justify-content-center m-5'
                style={{ fontSize: '60px' }}
            >
                {count}
            </span>
            <div>
                <Row>
                    {/* <Col>Test</Col> */}
                    <Col className='d-flex justify-content-center'>
                        <Button
                            className='m-1'
                            variant='success'
                            onClick={() => dispatch(increment())}
                        >
                            +
                        </Button>
                        <Button
                            className='m-1'
                            variant='danger'
                            onClick={() => dispatch(decrement())}
                        >
                            -
                        </Button>
                    </Col>
                    {/* <Col>Test</Col> */}
                </Row>
                <Row className='my-3'>
                    <Col className='d-flex justify-content-center'>
                        <input
                            style={{ fontSize: '40px', textAlign: 'center' }}
                            type='text'
                            value={incrementAmount}
                            onChange={(e) => setIncrementAmout(e.target.value)}
                        ></input>
                    </Col>
                </Row>
                <Row >
                    <Col className='d-flex justify-content-center'>
                        <Button
                            className='m-1'
                            variant='info'
                            onClick={() =>
                                dispatch(incrementByAmount(addValue))
                            }
                        >
                            Add Amount
                        </Button>
                        <Button
                            className='m-1'
                            variant='warning'
                            onClick={resetAll}
                        >
                            Reset
                        </Button>
                    </Col>
     
                </Row>
            </div>
        </Container>
    );
}

export default Counter;
