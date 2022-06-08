import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import axios from 'axios';
import Navigation from '../../components/Navigation';
import styles from './BalancesChildren.module.css';
// import {balances}  from '../data/testdata';

function BalancesChildren() {
    console.log('hello balances children');
    const [balances, setBalances] = useState([]);

    useEffect(() => {
        const fetchBalances = async () => {
            const { data } = await axios.get('/api/finances/balances/children');
            // const { data } = await axios.get(`${SERVER_URL}/api/finances/balances/children`);
            setBalances(data);
        };
        fetchBalances();
    }, []);

    return (
        <div>
            <Navigation />
            <h1 className='text-center my-5'>Bankkonto Kinder</h1>
            {balances.map((balance) => (
                <Card key={balance.balance_id} className={styles.card}>
                    <Card.Body>
                        <Card.Title> {balance.name}</Card.Title>
                        <h3>{balance.value} Euro</h3>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
}

export default BalancesChildren;
