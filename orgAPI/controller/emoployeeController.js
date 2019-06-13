const express = require('express');
var router = express.Router();
var objectId = require('mongoose').Types.objectId;
var multer  = require('multer');
const checkauth = require('../middleware/check-auth');
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads');
    },
    filename:function(req,file,cb){
        cb(null,"-" + Date.now()+file.originalname)
    }
});

const fileFilter=(req, file , cb)=>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    }else{
        cb(null,false);
    }
};
var upload = multer({storage: storage,limits:{
    fileSize:1024*1024*5
},
fileFilter:fileFilter});

var { Employee } = require('../models/employee.js');




router.get('/', (req, res, next) => {
    Employee.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('error in Retirving Employee : ' + JSON.stringify(err, undefined, 2)); }
    }).catch(next);

});

router.post('/',checkauth,upload.single('image'),(req, res, next) => {
 
    var path=req.file.path;
    console.log(req.body.techSkill);
    console.log(req.body.hob);
    console.log(path);
    if(req.file.path == 'undefined')
    {
        path='uploads/-1560171412582images.jpeg';
    } 
    mobile =req.body.mobile? req.body.mobile:"";
    req.body.address =  req.body.address?  req.body.address : "";
    req.body.state = req.body.state? req.body.state: "";
    req.body.city = req.body.city? req.body.city:"";
    req.body.hob =req.body.hob ?  req.body.hob:"";
    req.body.gender = req.body.gender? req.body.gender:"";
    req.body.techSkill= req.body.techSkill? req.body.techSkill:"";
    req.body.salary = req.body.salary?req.body.salary:"";
    req.body.zip = req.body.zip ? req.body.zip:"";
    var emp = new Employee({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        dob: req.body.dob,
        mobile: mobile,
        address: req.body.address,
        state: req.body.state,
        city: req.body.city,
        image:path,
        hob: req.body.hob,
        gender: req.body.gender,
        techSkill: req.body.techSkill,
        salary: req.body.salary,
        zip: req.body.zip,
      
    })
    emp.save((err, emp) => {
        if (!err) { res.send(emp); }
        else { console.log('error with the Employee Save: ' + JSON.stringify(err, undefined, 2)); }
    });

});


router.get('/:id', (req, res) => {
    console.log(res.file);
   
    let id = req.params.id;
    console.log(id);
    Employee.findById({ _id: id }, (err, docs) => {
        if (!err) { res.send(docs) }
        else { console.log('error in Retirving Employee :' + JSON.stringify(err, undefined, 2)); }
    }
    );
});


router.put('/:id',checkauth, upload.single('image'),(req, res) => {
    console.log(req.file);
 
 var ImagePath= req.file === undefined ? req.body.image:req.file.path;

    console.log(req.body.techSkill);
    var emp = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        dob: req.body.dob,
        mobile: req.body.mobile,
        address: req.body.address,
        state: req.body.state,
        city: req.body.city,
        image:ImagePath,
        hob: req.body.hob,
        gender: req.body.gender,
        techSkill: req.body.techSkill,
        salary: req.body.salary,
        zip: req.body.zip,
    };
    console.log(req.params.id);

    Employee.findByIdAndUpdate({ _id: req.params.id }, emp, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Employee update' + JSON.stringify(err, undefined, 2)); }
    });

});


router.delete('/:id',checkauth,(req, res) => {
    console.log(req.params.id);
    Employee.findByIdAndDelete({ _id: req.params.id }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Employee Deleted' + JSON.stringify(err, undefined, 2)); }
    });
});



module.exports = router;