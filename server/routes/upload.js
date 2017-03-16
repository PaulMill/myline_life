'use strict'

const boom = require('boom')
const express = require('express')
const AWS = require('aws-sdk')
const fileUpload = require('express-fileupload')
const app = express()

app.use(fileUpload())

const router = express.Router()
// const upload = multer({ dest: 'uploads/' })

//setup bucket name for AWS S3
const myBucket = 'myline.life'



app.post('/photos', function(req, res) {
  console.log(req.files);
  if (!req.files)
    return res.status(400).send('No files were uploaded.');

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.upl_files;
  console.log(sampleFile);

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv('/upload/filename.jpg', function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  });
});

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
