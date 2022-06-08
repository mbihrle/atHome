import { useNavigate } from 'react-router-dom';

import { Image, Button } from 'react-bootstrap';

import Navigation from '../../components/Navigation';
import picture from '../../resources/images/PinClipart.com_sad-face-clipart-black_5561367.png';
import styles from './DummyPage.module.css';
// import Image from 'react-bootstrap/Image';

const DummyPage = () => {
    const navigate = useNavigate();
    return (
        <div>
            <Navigation />
            <h1 className={styles.title}>Ups ...</h1>
            <div className={`${styles.picture}`}>
                <Image fluid rounded src={picture}></Image>
            </div>
            <h2 className={styles.text}>
                Diese Seite befindet sich noch im Aufbau
            </h2>
            {/* <div className={styles.text}> */}
            <div className='d-flex justify-content-center'>
                <Button
                    className='m-1'
                    variant='danger'
                    onClick={() => navigate(-1)}
                >
                    Zurück
                </Button>
                <Button
                    className='m-1'
                    variant='primary'
                    onClick={() => navigate('/')}
                >
                    Zur Startseite
                </Button>
            </div>
        </div>
    );
};

export default DummyPage;
