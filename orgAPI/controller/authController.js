const express = require('express');
var router = express.Router();
var objectId = require('mongoose').Types.objectId;
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

var { Auth } = require('../models/auth');

router.get('/', (req, res, next) => {
    Auth.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('error in Retirving Employee : ' + JSON.stringify(err, undefined, 2)); }
    }).catch(next);

});

router.post('/login', (req, res, next) => {

   console.log(req.body);
    Auth.find({ email: req.body.email }).
        exec().
        then(auth=>{
            if(auth.length < 1){
                return res.status(401).json({
                    message : 'Auth failed'
                        });        
                    }
                    bcrypt.compare(req.body.password,auth[0].password,(err , result)=>{
                        if(err){

                return res.status(401).json({
                    message : 'Auth failed'
                        });
                    }
                    if(result){

                     const token = jwt.sign({
                            email:auth[0].email,
                            authId:auth[0]._id
                        },
                        process.env.JWT_KEY,
                       {
                         expiresIn:"1h"  
                       }
                       );

                       console.log(token);
                        return res.status(200).json({
                            message: 'Auth Successful',
                            token:token
                        });
                    } 
                    res.status(401).json({
                        message: 'Auth failed',
                        
                    });
                    });
        })
        .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
    // Auth.find((err, docs) => {
    //     if (!err) { res.send(docs); }
    //     else { console.log('error in Retirving Employee : ' + JSON.stringify(err, undefined, 2)); }
    // }).catch(next);

});


router.post('/',(req, res, next) => {
     
    Auth.findOne({ email: req.body.email }, function(err, auth) {
        if(err) {
          console.log(err);
        }
        //if a user was found, that means the user's email matches the entered email
        if (auth) {
              var err = new Error('A user with that email has already registered. Please use a different email..')
             err.status = 400;
             return next(err);
        } else {
            let hash= bcrypt.hashSync(req.body.password,10);
            console.log(hash);

            var auth=new Auth({
                Name:req.body.Name,
                password:hash,
                email:req.body.email,
                mobile: req.body.mobile
            });

            auth.save((err, auth) => {
                if (!err) { res.send(auth); }
                else { console.log('error with the Auth Save: ' + JSON.stringify(err, undefined, 2)); }
            });
        }
     }); 
   
});



module.exports = router;