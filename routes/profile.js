const express = require('express');
const router = express.Router();
const Query = require('../models/query.js');

router.get('/bio', (req,res)=>{
    Query.dbGetProfileInfo(req.session.user.id)
        .then(result=>{
            if(result.length){
                res.json({
                    profileId: result[0].id,
                    bio: result[0].bio,
                    superpower: result[0].superpower,
                    showEditor: false
                });
            }
        });
});
router.post('/bio', (req,res)=>{
    let {bio, superpower} = req.body;
    Query.dbInsertProfileInfo(bio, superpower, req.session.user.id).then(result=>{
        res.json({
            profileId: result.id,
            bio: bio,
            superpower: superpower,
            showEditor: false
        });
    }).catch(()=>{
        Query.dbUpdateProfileInfo(bio, superpower, req.session.user.id)
            .then(()=>{
                res.json({
                    bio: bio,
                    superpower: superpower,
                    showEditor: false});
            })
            .catch(()=>{
                res.json({error: 'Database error. Please try later.'});
            });
    });
});

router.post('/searchForUser', (req, res)=>{
    Query.dbGetUsers(req.body).then(result=>{
        res.json(result);
    });
});

router.get('/getOtherProfileInfo/:id', (req,res)=>{
    let userid = req.params.id;
    if(userid != req.session.user.id){
        Query.dbGetOtherProfileInfo(userid).then(result=>{
            if(result.length!=0){
                res.json({
                    id: result[0].id,
                    supername: result[0].supername,
                    bio: result[0].bio,
                    superpower: result[0].superpower,
                    imgUrl: result[0].filename ? `${require('../config.json').s3Url}${result[0].filename}` : result[0].filename
                });
            }else{
                res.json({noUserFound: true});
            }
        });
    }else{
        res.json({redirect: true});
    }
});

module.exports = router;
