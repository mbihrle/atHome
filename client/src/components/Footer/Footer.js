import { Container, Row, Col } from 'react-bootstrap';
import styles from './Footer.module.css'

const Footer = () => {
    return (
        <footer className= {styles.footer}>
            <Container>
                <Row>
                    <Col className='text-center py-1'>
                        Copyright &copy; Marco Bihrle
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
