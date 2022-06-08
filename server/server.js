import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import colors from 'colors';
import knex from 'knex';

// import { balancesChildrenJson } from './data/testdata.js';

// dotenv.config();

console.log('hello');
console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);
console.log('process.env.POSTGRES_URI: ', process.env.POSTGRES_URI);
console.log('process.env.SERVER_PORT: ', process.env.SERVER_PORT);

const db = knex({
    client: 'pg',
    connection: process.env.POSTGRES_URI,
});

const app = express();

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.send('API is running');
});


app.get('/api/finances/balances/children', (req, res) => {
    console.log('treffer');
    // res.json(balancesChildrenJson);
    db.select('*')
        .from('balances_children')
        .then((balances) => {
            console.log(balances);
            res.json(balances);
        });
});

app.get('/api/finances/balances/children/:id', (req, res) => {
    const balance = balances.find((balance) => balance.id == req.params.id);
    res.json(balance);
});
const PORT = process.env.SERVER_PORT || 5900;

app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
            .bold
    )
);
