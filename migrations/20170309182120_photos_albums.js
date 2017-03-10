'use strict'

exports.up = function(knex) {
  return knex.schema.createTable('photos_albums', (table) => {
    table.increments()
    table.integer('album_id')
      .references('albums.id')
      .notNullable()
      .index()
    table.integer('photo_id')
      .references('photos.id')
      .notNullable()
      .index()
    table.timestamps(true, true)
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('photos_albums')
}
