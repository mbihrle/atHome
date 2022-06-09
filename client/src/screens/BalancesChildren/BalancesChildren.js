import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import axios from 'axios';
import Navigation from '../../components/Navigation';
import styles from './BalancesChildren.module.css';
// import {balances}  from '../data/testdata';

function BankAccountsChildren() {
    console.log('hello balances children');
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        const fetchAccounts = async () => {
            const { data } = await axios.get('/api/finances/balances/children');
            // const { data } = await axios.get(`${SERVER_URL}/api/finances/balances/children`);
            setAccounts(data);
        };
        fetchAccounts();
    }, []);

    return (
        <div>
            <Navigation />
            <h1 className='text-center my-5'>Bankkonto Kinder</h1>
            {accounts.map((account) => (
                <Card key={account.account_id} className={styles.card}>
                    <Card.Body>
                        <Card.Title> {account.account_name}</Card.Title>
                        <h3>{account.account_value} Euro</h3>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
}

export default  BankAccountsChildren;
