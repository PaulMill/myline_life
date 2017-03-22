'use strict'

const boom = require('boom')
const express = require('express')
const knex = require('../../knex')
const { camelizeKeys } = require('humps')

const router = express.Router()

// <============== route to get all photos  ==================>
router.get('/', (req, res) => {
  knex('photos')
    .orderBy('photo_date', 'DESC')
    .then((photos) => {
      res.send(camelizeKeys(photos))
    })
    .catch((err) => console.log(err))
})

// <============== route to get photos by searching queries fromDate to toDate ==================>

router.get('/queries', (req, res, next) => {
  const fromDate = parseInt(req.query.fromDate)
  const toDate = parseInt(req.query.toDate)
  knex('photos')
    .where('photo_date', '>', fromDate)
    .andWhere('photo_date', '<', toDate)
    .orderBy('photo_date', 'DESC')
    .then((photos) => {
      res.send(camelizeKeys(photos))
    })
    .catch(err => next(err))
})

module.exports = router
