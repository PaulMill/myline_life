'use strict'

exports.up = function(knex) {
  return knex.schema.createTable('albums', (table) => {
    table.increments()
    table.string('name').notNullable().defaultTo('')
    table.string('album_date').notNullable().defaultTo('')
    table.string('album_type').notNullable().defaultTo('')
    table.boolean('is_public').notNullable().defaultTo(false)
    table.text('description').notNullable().defaultTo('')
    table.integer('index_photo')
      .references('photos.id')
      .notNullable()
      .index()
    table.integer('owner_id')
      .references('users.id')
      .notNullable()
      .onDelete('CASCADE')
      .index()
    table.timestamps(true, true)
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('albums')
}
