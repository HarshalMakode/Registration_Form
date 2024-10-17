const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter')

require('dotenv').config();
require('./Models/db');

const PORT = process.env.PORT || 8000;

const allowedOrigins = [
    'https://registration-form-frontend-seven.vercel.app',
    'http://localhost:3000'
  ];
  
  app.use(cors({
      origin: function (origin, callback) {
          if (allowedOrigins.includes(origin) || !origin) {
              callback(null, true);
          } else {
              callback(new Error('Not allowed by CORS'));
          }
      },
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true
  }));

app.get('/ping',(req,res)=>{
    res.send('PONG');
});

app.use(bodyParser.json());

app.use('/auth', AuthRouter);

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
});

module.exports = app;
