'use strict'

const boom = require('boom')
const express = require('express')
const AWS = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const sharp = require('sharp')
const knex = require('../../knex')

const uploadMulter = multer()

const router = express.Router()

const s3 = new AWS.S3()

//setup bucket name for AWS S3
const myBucket = 'myline.life'

router.post('/photos', uploadMulter.array('photos[]'), (req, res) => {

  let urlPhotoSmall = ''
  let urlPhotoSized = ''
  let urlPhotoFull = ''
  let photoDate = ''
  let cameraModel = ''
  let namePhoto = ''

  function uploaderS3(fileB, ispublic, info, indexFile){
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
       }
       else if (indexFile === 'md') {
         urlPhotoSized = data.Location
       }
       else if (indexFile === 'sm') {
         urlPhotoSmall = data.Location
       }
     })
   }

  for (const file of req.files) {

    const ExifImage = require('exif').ExifImage;
      try {
          new ExifImage({ image : file.buffer }, function (error, exifData) {
              if (error)
                  console.log('Error: '+error.message)
              else{
                  cameraModel = `${exifData.image.Make} ${exifData.image.Model}`
                  const date = exifData.exif.CreateDate
                  const dateOfPhoto = date.replace(/^(\d{4}):(\d{2}):(\d{2})/, '$1-$2-$3')
                  photoDate = Date.parse(dateOfPhoto)
                  namePhoto = file.originalname
                }
          })
      } catch (error) {
          console.log('Error: ' + error.message)
      }

    const p = new Promise ((resolve, reject) => {
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
                .toBuffer((err, buffer, info) => {
                  if(err){
                    console.error(err)
                    throw err
                  }
                  uploaderS3(buffer, 'public-read', info, 'lg')
                })
              })
              .then(function(data1) { // resizing for medium size and saving to folder md
                return image
                .withMetadata()
                .resize(1328, 747)
                .jpeg({
                  quality: 90
                })
                .rotate()
                .toBuffer((err, buffer, info) => {
                  if(err){
                    console.error(err)
                    throw err
                  }
                  uploaderS3(buffer, 'public-read', info, 'md')
                })
              })
              .then(function(data2) { // resizing for small size and saving to folder sm
                return image
                .resize(400, 225)
                .withMetadata()
                .jpeg({
                  quality: 90
                })
                .rotate()
                .toBuffer((err, buffer, info) => {
                  if(err){
                    console.error(err)
                    throw err
                  }
                  uploaderS3(buffer, 'public-read', info, 'sm')
                })
              })
              .catch((err) => {
                console.error(err)
              })
              // resolve({urlPhotoSmall, urlPhotoSized, urlPhotoFull})
              setTimeout(() => {
                resolve({urlPhotoSmall, urlPhotoSized, urlPhotoFull})
              }, 2500)
      })
      p.then((obj) => {
          knex('photos')
          .insert({
            name: namePhoto,
            url_photo_full: obj.urlPhotoFull,
            url_photo_sized: obj.urlPhotoSized,
            url_photo_small: obj.urlPhotoSmall,
            photo_date: photoDate,
            camera_model: cameraModel,
            user_id: 1
          }, '*')
          .then((data) => {
            console.log(data);
            res.send(data)
          })
          .catch((err) => console.error(err))
        })
    }
})

module.exports = router;
