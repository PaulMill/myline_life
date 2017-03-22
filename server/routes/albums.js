'use strict'

const boom = require('boom')
const express = require('express')
const knex = require('../../knex')
const { camelizeKeys, decamelizeKeys } = require('humps')

const router = express.Router()

// <============== route to get all albums  ==================>
router.get('/', (req, res) => {
  knex('albums')
    .select(
      'albums.id',
      'users.name as owner_name',
      'photos.url_photo_small as index_photo',
      'albums.name',
      'albums.album_date',
      'albums.album_date',
      'albums.is_public',
      'albums.description',
      'albums.created_at',
      'albums.updated_at'
    )
    .orderBy('album_date', 'DESC')
    .innerJoin('users', 'albums.owner_id', 'users.id')
    .innerJoin('photos', 'albums.index_photo', 'photos.id')
    .then((albums) => {
      res.send(camelizeKeys(albums))
    })
    .catch((err) => console.log(err))
})

// <============== route to get all albums by searching queries fromDate to toDate ==================>

router.get('/queries', (req, res, next) => {
  const fromDate = parseInt(req.query.fromDate)
  const toDate = parseInt(req.query.toDate)
  knex('albums')
    .where('album_date', '>', fromDate)
    .andWhere('album_date', '<', toDate)
    .orderBy('album_date', 'DESC')
    .then((albums) => {
      res.send(camelizeKeys(albums))
    })
    .catch(err => next(err))
})

// <============== route to create Album ==================>

router.post('/new', (req, res, next) => {
  let {name, albumDate, albumType, isPublic, description, indexPhoto, ownerId, albumPhotos} = req.body
  let insertRequest = decamelizeKeys({ name, albumDate, albumType, isPublic, description, indexPhoto, ownerId})

  knex('users')
    .where('id', ownerId)
    .first()
    .then((user) => {
      if(!user){
        throw boom.create(400, 'User does not exist')
      }
    })
    .then(() => {
      return knex('albums').insert(insertRequest, '*')
    })
    .then((album) => {
      albumPhotos.map((photo) => {
        return knex('photos_albums').insert({
          album_id: album.id,
          photo_id: photo.id
        }, '*')
      })
    })
    .then((data) => {
      console.log('data', data);
      res.send(data)
    })
    .catch(err => (console.error(err)))
})

module.exports = router
