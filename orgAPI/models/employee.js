const mongoose = require('mongoose');
var Employee = mongoose.model('Employee',{
    firstName: {type:String,require:true},
    lastName: {type:String,require:true},
    email : {type:String,require:true},
    mobile :String,
    dob:Date,
    address:{type:String},
    state :{type:String},
    city :{type:String},
    zip:String,
    gender:{type:String},  
    techSkill:{type:String} ,
    salary:String,
 hob:{type:[String]},
    image:String,
});
module.exports= {Employee};