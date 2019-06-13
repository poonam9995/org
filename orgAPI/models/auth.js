const mongoose = require('mongoose');
var Auth = mongoose.model('auth',{
    Name: {type:String,require:true},
    password: {type:String,require:true},
    email : {type:String,require:true},
    mobile :Number,
});
module.exports= {Auth};