const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter')

require('dotenv').config();
require('./Models/db');

const PORT = process.env.PORT || 8000;

app.use(cors({
    origin: 'https://registration-form-frontend-seven.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.get('/ping',(req,res)=>{
    res.send('PONG');
});

app.use(bodyParser.json());

app.use('/auth', AuthRouter);

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
});