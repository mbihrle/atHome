import Screen from '../../components/Screen/Screen';
// import picture from '../../resources/images/PinClipart.com_social-skills-clipart_653084.png';
// import Image from 'react-bootstrap/Image';
import styles from './Home.module.css';
import Video from '../../resources/videos/family_short_movie.mp4';

function Home() {
    return (
        <Screen>
            <h1 className='text-center mb-3'>Willkommen bei @Home!</h1>
            <h2 className='text-center mb-5'>unserer Familienwebseite</h2>
            {/* <video
                style={{
                    width: '192px',
                    padding: '10px',
                    transform: 'rotate(2deg)',
                    margin: '2em auto',
                }}
                controls
                autostart
                autoPlay
                loop
                muted
                src={Video}
                type='video/mp4'
            /> */}
            <div className={`${styles.picture}`}>
                {/* <Image fluid rounded src={picture}></Image> */}
                <video
                    style={{
                        width: '576px',
                        padding: '10px',
                        transform: 'rotate(2deg)',
                        margin: '2em auto',
                    }}
                    controls
                    autostart
                    autoPlay
                    loop
                    muted
                    src={Video}
                    type='video/mp4'
                />
            </div>
        </Screen>
    );
}
export default Home;
