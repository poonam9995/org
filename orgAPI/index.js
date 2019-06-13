const express = require('express');
const bodyParser = require('body-parser');
const routes=require('./controller/emoployeeController.js');
const authroutes = require('./controller/authController.js');
const mongoose = require('./db.js'); 


const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use("/uploads",express.static('uploads'));
app.use(cors({origin:'http://localhost:4200'}));
app.use('/employees',routes);
app.use('/auth',authroutes);
app.listen(process.env.port|| 4000 ,function(){
    console.log('now listeing for request');
    });