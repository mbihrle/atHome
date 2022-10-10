import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import colors from 'colors';
import asyncHandler from 'express-async-handler';
import db from './config/db.js';
import {notFound, errorHandler} from './middleware/errorMiddleware.js'

import bankTransactionsChildrenRoutes from './routes/bankTransactionsChildrenRoutes.js';
import todoListRoutes from './routes/todoListRoutes.js';

colors.enable();

console.log('hello');
console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);
console.log('process.env.POSTGRES_URI: ', process.env.POSTGRES_URI);
console.log('process.env.SERVER_PORT: ', process.env.SERVER_PORT);

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API is running');
});

app.use('/api/bank-transactions/children', bankTransactionsChildrenRoutes);
app.use('/api/todos/', todoListRoutes);

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.SERVER_PORT || 5000;

app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
            .bold
    )
);
