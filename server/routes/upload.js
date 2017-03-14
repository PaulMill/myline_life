'use strict'

const boom = require('boom')
const express = require('express')
const AWS = require('aws-sdk')
const s3 = new AWS.S3()
const uuid = require('node-uuid')
const multer = require('multer')
const multerS3 = require('multer-s3')


//setup bucket name for AWS S3
const myBucket = 'myline.life'
const myKey = 'myBucketKey'

// config multer for uploading pictures to S3
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: myBucket,
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname})
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})

const app = express()

// eslint-disable-next-line new-cap
const router = express.Router()

router.post('/upload', upload.array('photos', 3), function(req, res, next) {
  console.log('inside of post');
  res.send('Successfully uploaded ' + req.files.length + ' files!')

})

// router.post('/', (req, res, next) => {
//   console.log(req.body);
//   fs.writefile()

// });

router.post('/apiRequest/gettotal/', (req, res, next) => {
  const reqData = JSON.stringify(req.body)
  request.get(`https://www.floristone.com/api/rest/flowershop/gettotal?products=${reqData}`)
    .set('Authorization', process.env.API_KEY)
    .end((err, data) => {
      if (err) {
        return next(boom.create(403, 'Unauthorized API request'));
      }
        res.send(data);
    })
});


module.exports = router;

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
