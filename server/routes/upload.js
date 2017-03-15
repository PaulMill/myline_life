'use strict'

const boom = require('boom')
const express = require('express')
const AWS = require('aws-sdk')
const uuid = require('node-uuid')
const multer = require('multer')
const multerS3 = require('multer-s3')


//setup bucket name for AWS S3
const myBucket = 'myline.life'

const s3 = new AWS.S3()

// eslint-disable-next-line new-cap
const router = express.Router()

router.post('/geturl', (req, res, next) => {
  console.log('body ', req.body.filename);
    const params = {
      Bucket: myBucket,
      Key: req.body.filename,
      Expires: 60,
      ContentType: 'image/jpeg'
    };
    s3.getSignedUrl('putObject', params, (err, url) => {
        if (err) {
            console.log(err);
            next(err);
        } else {
          res.send(url);
          console.log(url);
        }
    });
})


module.exports = router;
// router.get('/geturl/:name', (req, res, next) => {
//
//     var params = {
//       Bucket: myBucket,
//       Key: req.params.name,
//       Expires: 60,
//       ContentType: 'image/jpeg'
//     };
//     s3.getSignedUrl('putObject', params, function(err, data) {
//         if (err) {
//             console.log(err);
//             next(err);
//         } else {
//             res.send(data);
//         }
//     });
// })




// var bucketName = 'node-sdk-sample-' + uuid.v4();
// var keyName = 'hello_world.txt';
//
// s3.createBucket({Bucket: bucketName}, function() {
//   var params = {Bucket: bucketName, Key: keyName, Body: 'Hello World!'};
//   s3.putObject(params, function(err, data) {
//     if (err)
//       console.log(err)
//     else
//       console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
//   });
// });
