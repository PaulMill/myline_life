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
  const {name, albumDate, albumType, isPublic, description, indexPhoto, ownerId, albumPhotos} = req.body
  const insertRequest = decamelizeKeys({ name, albumDate, albumType, isPublic, description, indexPhoto, ownerId})

  knex('users')
    .where('id', ownerId)
    .first()
    .then((user) => {
      if(!user){
        throw boom.create(400, 'User does not exist')
      }
      return user
    })
    .then(() => {
      return knex('albums').insert(insertRequest, '*').then()
    })
    .then((album) => {
       return knex('photos_albums')
          .insert(albumPhotos.map((ele) => {
            return { album_id: album[0].id, photo_id: ele.id }
          }), '*')
    })
    .then((data) => {
      res.send(data)
    })
    .catch(err => (console.error(err)))
})

router.get('/show/:id', (req, res, next) => {
  const id = req.params.id
  knex('albums')
    .select(
      'albums.id',
      'albums.album_date',
      'albums.album_type',
      'albums.description as description',
      'photos.url_photo_small as index_photo_url',
      'albums.is_public',
      'albums.name',
      'users.name as owner_name',
      'albums.likes'
    )
    .where('albums.id', id)
    .innerJoin('users', 'albums.owner_id', 'users.id')
    .innerJoin('photos', 'albums.index_photo', 'photos.id')
    .first()
    .then((row) => {
      res.send(camelizeKeys(row))
    })
    .catch((err) => {
      console.error(err)
      next(err)
    })
})

router.get('/photos/:albumId', (req, res, next) => {
  const id = req.params.albumId
    knex('photos_albums')
      .select('*')
      .where('album_id', id)
      .innerJoin('photos', 'photos_albums.photo_id', 'photos.id')
      .then((rows) => {
        res.send(camelizeKeys(rows))
      })
      .catch((err) => {
        console.error(err)
        next(err)
      })
})

module.exports = router
