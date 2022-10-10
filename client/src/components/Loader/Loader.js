import React from 'react';
import { Spinner } from 'react-bootstrap';
import styles from './Loader.module.css';

const Loader = () => {
    return (
        <Spinner
            animation='border'
            variant='primary'
            id={styles.spinner}
        ></Spinner>
    );
};

export default Loader;
