import React from 'react';
// import {Container} from 'react-bootstrap'
import styles from './Screen.module.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Screen = ({ children }) => {
    return (
        <div className={styles.container}>
        <header>
            <Header />
        </header>
            <main className={styles.content}>{children}</main>
            <div className={styles.footer}>
                <Footer />
            </div>
        </div>
    );
};

export default Screen;
