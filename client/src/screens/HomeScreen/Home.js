import Screen from '../../components/Screen/Screen';
import picture from '../../resources/images/PinClipart.com_social-skills-clipart_653084.png';
import Image from 'react-bootstrap/Image';
import styles from './Home.module.css';

function Home() {
    return (
        <Screen>
            <h1 className='text-center mb-3'>Hallo zusammen!</h1>
            <h2 className='text-center mb-5'>
                Hier entsteht unsere Familien-Webseite
            </h2>
            <div className={`${styles.picture}`}>
                <Image fluid rounded src={picture}></Image>
            </div>
        </Screen>
    );
}
export default Home;
