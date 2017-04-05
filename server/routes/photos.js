'use strict'

const boom = require('boom')
const express = require('express')
const knex = require('../../knex')
const { decamelizeKeys, camelizeKeys } = require('humps')
const jwt = require('jsonwebtoken')

const router = express.Router()

const authorize = function(req, res, next) {
  const token = req.cookies.token
  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      return next(boom.create(401, 'Unauthorized'))
    }
    req.token = decoded
    next()
  })
}

// <============== route to get all photos  ==================>
router.get('/', authorize, (req, res) => {
  knex('photos')
    .where('user_id', req.token.userId)
    .orderBy('photo_date', 'DESC')
    .then((photos) => {
      res.send(camelizeKeys(photos))
    })
    .catch((err) => console.log(err))
})

// <============== route to get photos by searching queries fromDate to toDate ==================>

router.get('/queries', authorize, (req, res, next) => {
  const fromDate = parseInt(req.query.fromDate)
  const toDate = parseInt(req.query.toDate)
  knex('photos')
    .where('user_id', req.token.userId)
    .andWhere('photo_date', '>', fromDate)
    .andWhere('photo_date', '<', toDate)
    .orderBy('photo_date', 'DESC')
    .then((photos) => {
      res.send(camelizeKeys(photos))
    })
    .catch(err => next(err))
})

router.get('/show/:id', authorize, (req, res, next) => {
  const id = req.params.id
  knex.select('*').from('photos')
    .where('id', '>=', id)
    .andWhere('user_id', req.token.userId)
    .orderBy('photo_date', 'ASC')
    .limit(25)
    .then((photos) => {
      res.send(camelizeKeys(photos))
    })
    .catch(err => next(err))
})

router.get('/single/:id', authorize, (req, res, next) => {
  const id = req.params.id
    knex('photos')
      .where('user_id', req.token.userId)
      .andWhere('id', id)
      .first()
      .then((row) => {
        res.send(row)
      })
      .catch(err => next(err))
})

module.exports = router
