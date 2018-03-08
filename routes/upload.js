const express = require('express');
const router = express.Router();
const Query = require('../models/query.js');
const uidSafe = require('uid-safe');
const multer = require('multer');
const knox = require('knox');
const path = require('path');
const fs = require('fs');

let secrets;
if (process.env.NODE_ENV == 'production') {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require('../config/secrets.json'); // secrets.json is in .gitignore
}

var diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

var uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

function uploadToS3(file){
    const client = knox.createClient({
        key: secrets.AWS_KEY,
        secret: secrets.AWS_SECRET,
        bucket: 'agentcrispbucket'
    });
    const s3Request = client.put(file.filename, {
        'Content-Type': file.mimetype,
        'Content-Length': file.size,
        'x-amz-acl': 'public-read'
    });
    const readStream = fs.createReadStream(file.path);
    readStream.pipe(s3Request);

    return new Promise(function(resolve, reject){
        s3Request.on('response', s3Response => {
            const wasSuccessful = s3Response.statusCode = 200;
            if(wasSuccessful){
                resolve();
            }else{
                reject();
            }
            fs.unlink(file.path, (error)=>{console.log(error);});
        });
    });
}

router.post('/uploadPic', uploader.single('file'), (req,res)=>{
    if(req.file){
        uploadToS3(req.file).then(()=>{
            let filename = req.file.filename;
            let userid = req.session.user.id;
            Query.dbUploadProfilePic(filename, userid).then(result=>{
                res.json(result);
            }).catch(()=>{
                Query.dbUpdateProfilePic(filename, userid).then(result=>{
                    res.json(result);
                }).catch(()=>console.log('Something went wrong. Please try later.'));
            });
        }).catch(err=>{
            console.log('could not upload the file to s3', err);
        });
    }
});

module.exports = router;
