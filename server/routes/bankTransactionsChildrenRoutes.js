import express from 'express';
import asyncHandler from 'express-async-handler';
import db from '../config/db.js';
const router = express.Router();

// @desc fetch all transactions for one account
// @route GET /api/bank-transactions/children/all_transactions/:account_id
// @access Public
router.get(
    '/all_transactions/:account_id',
    asyncHandler(async (req, res) => {
        const account_id = req.params.account_id;
        db.select('*')
            .from('bank_transactions_children')
            .where('account_id', account_id)
            .then((lastTransactions) => {
                console.log(lastTransactions);
                res.json(lastTransactions);
            });
    })
);

// @desc fetch all last transactions for all accounts
// @route GET /api/bank-transactions/children/all_last_transactions
// @access Public
router.get(
    '/all_last_transactions',
    asyncHandler(async (req, res) => {
        // console.log('hello from todolist: select all todos');
        db.select('*')
            .from('v_last_bank_transactions_children')
            .then((lastTransactions) => {
                console.log(lastTransactions);
                res.json(lastTransactions);
            });
    })
);

// @desc fetch last transaction for one account
// @route GET /api/bank-transactions/children/last_transactions/:account_id
// @access Public
router.get(
    '/last_transactions/:account_id',
    asyncHandler(async (req, res) => {
        const account_id = req.params.account_id;
        db.select('*')
            .from('v_last_bank_transactions_children')
            .where('account_id', account_id)
            .then((lastTransactions) => {
                console.log(lastTransactions);
                res.json(lastTransactions);
            });
    })
);

// @desc post a new transaction to one acount
// @route POST /api/bank-transactions/children/add-tran
// @access Public
router.post(
    '/add-tran',
    asyncHandler(async (req, res) => {
        console.log('req.body: ', req.body);
        const { account_id, transaction_text, transaction_value, type } =
            req.body;

        const getAccountValue = async () => {
            const lastTransaction = db
                .select('*')
                .from('v_last_bank_transactions_children')
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

export default router;
