import Navigation from './components/Navigation';
import picture from './resources/images/PinClipart.com_social-skills-clipart_653084.png';
import styles from './App.module.css';
import Image from 'react-bootstrap/Image';

function App() {
    return (
        <div className='App'>
            <Navigation />
            <h1 className='text-center mb-3'>Hallo zusammen!</h1>
            <h2 className='text-center mb-5'>
                Hier entsteht unsere Familien-Webseite
            </h2>
            <div className={`${styles.picture}`}>
                <Image fluid rounded src={picture}></Image>
            </div>
        </div>
    );
}

export default App;
