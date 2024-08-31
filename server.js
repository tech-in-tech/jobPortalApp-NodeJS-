// * Import Packages
const express = require('express');
const expressError = require("express-async-errors")
const cors = require("cors");
const colors = require('colors');
const morgan = require('morgan');
const app = express();
const dotenv = require('dotenv');
require('dotenv').config();
const db = require('./config/db');
const { errorMiddleware } = require('./middlewares/errorMiddleware');

// * Middlewares
// Middleware for cross origin error
app.use(cors());

// Middleware to access data from clint in JSON formate
app.use(express.json())

// Middleware which tells us API method , status code and time taken by API
app.use(morgan('dev'));

// * route
// URL => http://localhost:8080
app.use('/api/v1/test',require('./routes/testRoutes'))
app.use('/api/v1/auth',require('./routes/authRoutes'))

//*Validation Middleware
app.use(errorMiddleware)


// * PORT 
const PORT  = process.env.PORT || 8080;

// Start the server and listen for connections on port 3000
app.listen(PORT,()=>{
  console.log(`Server running on PORT : ${PORT}`.bgCyan);
})