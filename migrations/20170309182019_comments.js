'use strict'

exports.up = function(knex) {
  return knex.schema.createTable('comments', (table) => {
    table.increments()
    table.integer('user_id')
      .references('users.id')
      .notNullable()
      .onDelete('CASCADE')
      .index()
    table.text('comment_text').notNullable().defaultTo('')
    table.integer('likes').notNullable().defaultTo(0)
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
    table.timestamps(true, true);
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('comments');
}
