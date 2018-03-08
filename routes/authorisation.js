const express = require('express');
const router = express.Router();
const Query = require('../models/query.js');
const Password = require('../models/password.js');

router.post('/register', (req, res)=>{
    let {supername, email, password} = req.body;
    Query.dbGetUserByEmail(email).then(results =>{
        if(results.length==0){
            Password.hashPassword(password).then(hashedPassword => {
                Query.dbRegisterUser(supername, email, hashedPassword).then(result =>{
                    req.session.user = {
                        supername : supername,
                        email : email,
                        id : result[0].id
                    };
                    res.redirect('/');
                }).catch(err=>{
                    res.json({message: 'could not add the user'});
                    console.log('could not register the user, database error',err);
                });
            }).catch(err=>console.log('could not hash the password', err));
        }else{
            res.json({error:'E-mail address has already been taken.'});
        }
    });
});
router.post('/login', (req,res)=>{
    let {email, password} = req.body;
    Query.dbGetUserByEmail(email).then(results=>{
        if(results.length != 0){
            let databasePassword = results[0].password;
            Password.checkPassword(password, databasePassword).then(matches=>{
                if(matches){
                    req.session.user={
                        supername: results[0].supername,
                        email: results[0].email,
                        id: results[0].id
                    };
                    res.redirect('/');
                }else{
                    res.json({error: 'Incorrect password'});
                }
            });
        }else{
            res.json({error: 'Email does not exist in the database.'});
        }
    });
});
router.get('/logout', (req,res)=>{
    req.session = null;
    res.redirect('/welcome');
});

router.get('/currentuser', (req,res)=>{
    Query.dbGetProfilePic(req.session.user.id).then(result=>{
        res.json({
            supername : req.session.user.supername,
            email : req.session.user.email,
            id : req.session.user.id,
            imgUrl : result,
            showPicUploader: false
        });
    }).catch(err=>{
        console.log('could not get the user picture', err);
    });
});

module.exports = router;
