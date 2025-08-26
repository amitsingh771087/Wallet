import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import initDB from './model/transaction.js';

import transactionRoutes from './router/transactionRoutes.js';
import rateLimiter from './middleware/rateLimiter.js';


const app = express();
dotenv.config();
const Port  = process.env.PORT || 9001;

app.use(cors());
app.use(express.json());
app.use(rateLimiter);

app.use('/api', transactionRoutes)



app.get('/' ,(req,res)=>{
    res.send("Hello World")
} )


initDB().then(()=>{
    app.listen(Port ,()=>{
    console.log("server is running on port  : ", Port)
})
})

