import express from 'express';

import {createTransaction, getTransactions , DeleteTransaction,getSummary} from '../controller/transactionController.js';

const router = express.Router();

router.post('/transactions', createTransaction);
router.get('/transactions/:user_id', getTransactions);
router.delete('/transactions/:id', DeleteTransaction);
router.get('/transactions/summary/:user_id',getSummary );


export default router;