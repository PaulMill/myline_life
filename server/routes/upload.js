'use strict'

const boom = require('boom')
const express = require('express')
const AWS = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const sharp = require('sharp')
const knex = require('../../knex')
const { decamelizeKeys, camelizeKeys } = require('humps')
const jwt = require('jsonwebtoken')

const uploadMulter = multer()

const router = express.Router()

const s3 = new AWS.S3()

//setup bucket name for AWS S3
const myBucket = 'myline.life'

const authorize = function(req, res, next) {
  const token = req.cookies.token;

  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      return next(boom.create(401, 'Unauthorized'));
    }

    req.token = decoded;

    next();
  });
};

router.post('/photos', authorize, uploadMulter.array('photos[]'), (req, res, next) => {


  let urlPhotoSmall = ''
  let urlPhotoSized = ''
  let urlPhotoFull = ''
  let doneUploads = []

  function uploaderS3(fileB, ispublic, indexFile, callback){
      s3.upload({
       Bucket: myBucket,
       Key: `${indexFile}/${indexFile}-${Date.now().toString()}`,
       Body: fileB,
       ACL: ispublic
     }, (err, data) => {
       if(err){
         console.log(err);
       }
       if (indexFile === 'lg') {
         urlPhotoFull = data.Location
         if (callback) callback()
       }
       else if (indexFile === 'md') {
         urlPhotoSized = data.Location
         if (callback) callback()
       }
       else if (indexFile === 'sm') {
         urlPhotoSmall = data.Location
         if (callback) callback()
       }
     })
   }

    // for (const file of req.files) {
    const allPromises = req.files.map((file) => {
      return new Promise ((resolve, reject) => {

          const image = sharp(file.buffer)
              image
              .metadata()
              .then(function(metadata) { // resizing for large size and saving to folder lg
                return image
                .resize(Math.round(metadata.width / 3))
                .withMetadata()
                .jpeg({
                  quality: 90
                })
                .rotate()
                .toBuffer()
                .then((data) => {
                  return new Promise ((resolve, reject) => {
                    uploaderS3(data, 'public-read', 'lg', () => {
                      resolve();
                    })
                  })
                })
              })
              .then(function() { // resizing for medium size and saving to folder md
                return image
                .withMetadata()
                .resize(1328, 747)
                .jpeg({
                  quality: 90
                })
                .rotate()
                .toBuffer()
                .then((data) => {
                  return new Promise ((resolve, reject) => {
                    uploaderS3(data, 'public-read', 'md', () => {
                      resolve();
                    })
                  })
                })
              })
              .then(function() { // resizing for small size and saving to folder sm
                return image
                .resize(400, 225)
                .withMetadata()
                .jpeg({
                  quality: 90
                })
                .rotate()
                .toBuffer()
                .then((data) => {
                  return new Promise ((resolve, reject) => {
                    uploaderS3(data, 'public-read', 'sm', () => {
                      resolve();
                    })
                  })
                })
              })
              .then(() => {
                const ExifImage = require('exif').ExifImage
                try {
                  new ExifImage({ image : file.buffer }, function (error, exifData) {
                    if (error)
                    console.log('Error: '+error.message)
                    else{
                      const cameraModel = `${exifData.image.Make} ${exifData.image.Model}`
                      const date = exifData.exif.CreateDate
                      const dateOfPhoto = date.replace(/^(\d{4}):(\d{2}):(\d{2})/, '$1-$2-$3')
                      const photoDate = Date.parse(dateOfPhoto)
                      const name = file.originalname
                      const userId = req.token.userId
                      resolve({urlPhotoSmall, urlPhotoSized, urlPhotoFull, photoDate, cameraModel, name, userId});
                    }
                  })
                }
                catch (error) {
                  console.log('Error: ' + error.message)
                }
              })
              .catch((err) => {
                console.error(err)
              })
      })
    })
    console.log(allPromises);
    Promise.all(allPromises)
      .then((objects) => {
        console.log('ALL promises done', objects);
        knex('photos')
          .insert(decamelizeKeys(objects), '*')
          .then((data) => {
            console.log('did work?', data);
            res.send('all good')
          })
          .catch((err) => {
            console.log(err);
            next(boom.create(400, err))
          })
        })
})

module.exports = router;
