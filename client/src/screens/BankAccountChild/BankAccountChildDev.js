import styles from './BankAccountChild.module.css';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import {
    increment,
    decrement,
    // payInByAmount,
    // payOffByAmount,
} from '../../features/bankAccountsChildrenSlice';
import axios from 'axios';
import Screen from '../../components/Screen/Screen';

function BankAccountChildDev() {
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
            <span className='d-flex justify-content-center'>
                Test: {bankAccountChildValue}
            </span>
            <div className='d-flex justify-content-center'>
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
                <Button
                    className='m-1'
                    variant='success'
                    onClick={() => dispatch(increment())}
                >
                    Increment
                </Button>
                <Button
                    className='m-1'
                    variant='danger'
                    onClick={() => dispatch(decrement())}
                >
                    Decrement
                </Button>
            </div>
        </Screen>
    );
}

export default BankAccountChildDev;
