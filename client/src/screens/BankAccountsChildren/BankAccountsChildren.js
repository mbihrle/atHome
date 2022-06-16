import styles from './BankAccountsChildren.module.css';
import Screen from '../../components/Screen/Screen';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import axios from 'axios';
// import {balances}  from '../data/testdata';

function BankAccountsChildren() {
    const [accounts, setAccounts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAccounts = async () => {
            const { data } = await axios.get(
                '/api/finances/bank-accounts/children'
            );
            // const { data } = await axios.get(`${SERVER_URL}/api/finances/balances/children`);
            setAccounts(data);
        };
        fetchAccounts();
    }, []);

    return (
        <Screen>
            <h1 className='text-center my-5'>Bankkonto Kinder</h1>
            {accounts.map((account) => (
                <Card
                    key={account.account_id}
                    className={styles.card}
                    onClick={() =>
                        navigate(
                            `/finanzen/bankkonto-kinder/${account.account_id}`
                        )
                    }
                >
                    <Card.Body>
                        <Card.Title> {account.account_name}</Card.Title>
                        <h3>{account.account_value} Euro</h3>
                    </Card.Body>
                </Card>
            ))}
        </Screen>
    );
}

export default BankAccountsChildren;
