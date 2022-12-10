import express from 'express';
import asyncHandler from 'express-async-handler';
import db from '../config/db.js';
const router = express.Router();
import {
    getAllTransactionsByAccountId,
    getLastTransactions,
    getLastTransactionByAccountId,
    postTransaction,
} from '../controllers/bankTransactionsChildrenController.js';

router
    .route('/all_transactions/:account_id')
    .get(getAllTransactionsByAccountId);
router.route('/all_last_transactions').get(getLastTransactions);
router
    .route('/last_transactions/:account_id')
    .get(getLastTransactionByAccountId);
router.route('/add-tran').post(postTransaction);

export default router;
