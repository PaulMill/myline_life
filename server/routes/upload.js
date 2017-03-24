'use strict'

const boom = require('boom')
const express = require('express')
const AWS = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')

const router = express.Router()

const s3 = new AWS.S3()

//setup bucket name for AWS S3
const myBucket = 'myline.life'

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: myBucket,
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})

router.post('/photos', upload.array('photos[]'), (req, res) => {
  console.log(req.files);
  res.send('Successfully uploaded ' + req.files.length + ' files!')

})

module.exports = router;
