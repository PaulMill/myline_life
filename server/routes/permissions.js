'use strict';

const boom = require('boom');
const express = require('express');
const knex = require('../../knex');
const { camelizeKeys } = require('humps');

const router = express.Router();

router.get('/albums', (req, res) => {
  // knex('albums')
  //   .innerJoin('permissions', 'albums.id', 'permissions.album_id')
  //   .select('*')
  //   .where('id', 'permissions.album_id')
  //   .then((data) => {
  //     console.log(data)
  //   })
  //   .catch((err) => console.log(err))
})
module.exports = router;
