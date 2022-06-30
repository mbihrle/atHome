import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import colors from 'colors';
import knex from 'knex';
import asyncHandler from 'express-async-handler';

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

app.get('/api/bank-transactions/children', (req, res) => {
    // console.log('hello from todolist: select all todos');
    db.select('*')
        .from('v_bank_transactions_children')
        .then((lastTransactions) => {
            console.log(lastTransactions);
            res.json(lastTransactions);
        });
});

app.get('/api/bank-transactions/children/:account_id', (req, res) => {
    const account_id = req.params.account_id;
    db.select('*')
        .from('v_bank_transactions_children')
        .where('account_id', account_id)
        .then((lastTransactions) => {
            console.log(lastTransactions);
            res.json(lastTransactions);
        });
});

app.post(
    '/api/bank-transactions/children/add-tran',
    asyncHandler(async (req, res) => {
        console.log('req.body: ', req.body);
        const { account_id, transaction_text, transaction_value, type } =
            req.body;

        const getAccountValue = async () => {
            const lastTransaction = db
                .select('*')
                .from('v_bank_transactions_children')
                .where('account_id', account_id);
            const tran = await lastTransaction;
            return tran[0].account_value;
        };

        const lastAccountValue = await getAccountValue();
        const account_value =
            Number(lastAccountValue) + Number(transaction_value);

        console.log('aaalastAccountValue: ', lastAccountValue);
        console.log('bbbtransaction_value: ', transaction_value);
        console.log('cccaccount_value: ', account_value);

        // console.log('account_value in testfn: ', account_value);

        db.insert({
            account_id,
            transaction_text,
            transaction_value,
            type,
            account_value,
        })
            .into('bank_transactions_children')
            .returning('*')
            .then(res.send('success'));
    })
);

// app.get('/api/finances/bank-accounts/children', (req, res) => {
//     console.log('tttt');
//     db.select('*')
//         .from('v_bank_transactions_children')
//         .then((accounts) => {
//             // console.log(accounts);
//             res.json(accounts);
//         });
// });

// app.get('/api/finances/bank-accounts/children/:id', (req, res) => {
//     const account_id = req.params.id;
//     console.log('account_id server: ', req.params.id);
//     db('bank_accounts_children');
//     db.select('*')
//         .from('v_bank_transactions_children')
//         .where('account_id', account_id)
//         .then((accounts) => {
//             // console.log(accounts);
//             res.json(accounts);
//         });
// });

app.get('/api/todos', (req, res) => {
    console.log('hello from todolist: select all todos');
    db.select('*')
        .from('todos')
        .then((todos) => {
            // console.log(accounts);
            res.json(todos);
        });
});

app.post('/api/todos', (req, res) => {
    console.log('hello from todolist: put new todo');
    const { title, date_create } = req.body;
    console.log(req.body);
    db.insert(req.body).into('todos').returning('*').then(res.send('success'));
    // .then(function (data) {
    //     res.send(data);
    // });
    // INSERT INTO table_name(column1, column2) VALUES(value_1, value_2)
    // SELECT * FROM table WHERE id = inserted_row
});

app.patch('/api/todos/:id', async (req, res) => {
    console.log('hello from todolist: update todo');
    console.log('params: ', req.params);
    const todo_id = req.params.id;
    const changes = req.body;
    console.log('todoid: ', todo_id);
    try {
        const count = await db('todos').where({ todo_id }).update(changes);
        if (count) {
            res.status(200).json({ updated: count });
        } else {
            res.status(404).json({ message: 'Record not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error updating todo', error: err });
    }
});

app.delete('/api/todos/:id', async (req, res) => {
    console.log('hello from todolist: delete todo');
    const todo_id = req.params.id;
    try {
        const count = await db('todos').where({ todo_id }).delete();
        if (count) {
            res.status(200).json({ deleted: count });
        } else {
            res.status(404).json({ message: 'Record not found' });
        }
    } catch (err) {
        res.status(500).json({
            message: 'Error deleting todo',
            error: err,
        });
    }
});

const PORT = process.env.SERVER_PORT || 5000;

app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
            .bold
    )
);
