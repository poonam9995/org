const mongoose = require('mongoose'); 

mongoose.connect('mongodb://localhost:27017/Employee',{ useNewUrlParser: true },(err)=>{

    if(!err){console.log('MongoDB Connection Succeded.');}
    else{
        console.log('Error in DB Connection:'+JSON.stringify(err ,undefined ,2));
    }
});
module.exports= mongoose;
require('./models/employee');