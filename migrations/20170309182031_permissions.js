'use strict'

exports.up = function(knex) {
  return knex.schema.createTable('permissions', (table) => {
    table.increments()
    table.boolean('is_read').notNullable().defaultTo(false)
    table.boolean('is_write').notNullable().defaultTo(false)
    table.integer('user_id')
      .references('users.id')
      .notNullable()
      .onDelete('CASCADE')
      .index()
    table.integer('photo_id')
      .references('photos.id')
      .notNullable()
      .onDelete('CASCADE')
      .index()
    table.integer('album_id')
      .references('albums.id')
      .notNullable()
      .onDelete('CASCADE')
      .index()
    table.timestamps(true, true)
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('permissions')
}
