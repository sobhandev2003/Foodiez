const express = require('express');
const cors = require('cors')
const fs = require('fs')
const mongodb = require('mongodb')
const errorHandler = require('./middilware/errorHandaler');
const { connectDb } = require('./config/conectDb');

const d0tenv = require('dotenv').config();
const app = express();

const port = process.env.PORT || 5000;
//NOTE - conect with DB

connectDb()

app.use(cors(
    {
        origin: [
            'http://localhost:3000',
            'https://sobhan-foodiez.netlify.app/',
        ],
       
    }
));

app.use(express.json());

app.use('/food/category', require('./routers/categoryRouters'));

app.use('/food/user/seller', require('./routers/sellerRouters'));

app.use('/food/user/buyer', require('./routers/buyerRouters'))

app.use(errorHandler);

app.listen(port, () => {
    console.log(`app listen on :${port}`);
})