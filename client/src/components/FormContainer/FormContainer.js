import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
// import styles from './FormContainer.module.css'

function FormContainer({ children }) {
    return (
        <Container fluid>
            <Row>
            {/* <Row className='justify-content-md-center'> */}
                <Col>
                {/* <Col xs={12} md={6}> */}
                    {children}
                </Col>
            </Row>
        </Container>
    );
}

export default FormContainer;
