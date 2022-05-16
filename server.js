const express=require('express')
const morgan=require('morgan')
const bodyparser=require('body-parser')
const dotenv = require('dotenv');
const path=require('path')

const connectDB = require('./server/database/connection');


const app=express();

dotenv.config( { path : 'config.env'} );

const PORT = process.env.PORT || 3000

// log requests
app.use(morgan('dev'));

const cors = require('cors');
app.use(cors());


// mongodb connection
connectDB();

// parse request to body-parser
app.use(bodyparser.urlencoded({ extended : true}))

// set view engine
app.set("view engine", "ejs")



 // load routers
app.use('/', require('./server/routes/router'))

app.listen(PORT);

// app.listen(PORT, ()=> { console.log(`Server is running on http://localhost:${PORT}`)});

