import React from 'react';
import styles from './Screen.module.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Screen = ({ children }) => {
    return (
        <div className={styles.container}>
            <Header />
            <main className={styles.content}>{children}</main>
            <div className={styles.footer}>
                <Footer />
            </div>
        </div>
    );
};

export default Screen;
