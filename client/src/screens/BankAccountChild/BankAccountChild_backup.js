import styles from './BankAccountChild.module.css';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useAddTodoMutation } from '../../features/api/atHomeApi';

import axios from 'axios';
import Screen from '../../components/Screen/Screen';

function BankAccountChild() {
    const bankAccountChildValue = useSelector(
        (state) => state.bankAccountsChildren.bankAccountChildValue
    );
    const dispatch = useDispatch();
    const [accounts, setAccounts] = useState([]);
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        const fetchAccounts = async () => {
            const { data } = await axios.get(
                `/api/finances/bank-accounts/children/${params.id}`
            );
            // const { data } = await axios.get(`${SERVER_URL}/api/finances/balances/children`);
            setAccounts(data);
        };
        fetchAccounts();
    }, [params.id]);

    return (
        <Screen>
            <h1 className='text-center my-5'>{`Kontostand`}</h1>
            {/* <h1 className='text-center my-5'>{`Kontostand ${accounts[0].account_name}`}</h1> */}
            {accounts.map((account) => (
                <Card key={account.account_id} className={styles.card}>
                    <Card.Body>
                        <Card.Title> {account.account_name}</Card.Title>
                        <h3>{account.account_value} Euro</h3>
                    </Card.Body>
                </Card>
            ))}

            <Card className={`${styles.newTransaction} text-center`}>
                <Card.Header>Neue Transaktion</Card.Header>
                <Card.Body>
                    <Container>
                        <Row>
                            <Col>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Betrag (Bsp: 10.45)'
                                    aria-label='transaction value'
                                />
                            </Col>
                            <Col md={9}>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Text'
                                    aria-label='transaction value'
                                />
                            </Col>
                        </Row>
                        <div className='mt-4'>
                            <Button
                                className='m-1'
                                variant='success'
                                onClick={console.log('click')}
                            >
                                Einzahlung
                            </Button>
                            <Button
                                className='m-1'
                                variant='danger'
                                onClick={console.log('click')}
                            >
                                Auszahlung
                            </Button>
                        </div>
                    </Container>
                </Card.Body>
            </Card>

            <div className='d-flex justify-content-center mt-5'>
                <Button
                    className='m-1'
                    variant='primary'
                    onClick={() => navigate(-1)}
                >
                    Zurück
                </Button>
                <Button
                    className='m-1'
                    variant='secondary'
                    onClick={() => navigate('/')}
                >
                    Zur Startseite
                </Button>
            </div>
        </Screen>
    );
}

export default BankAccountChild;
