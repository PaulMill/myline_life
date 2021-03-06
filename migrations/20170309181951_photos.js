'use strict'

exports.up = function(knex) {
  return knex.schema.createTable('photos', (table) => {
    table.increments()
    table.string('name').notNullable().defaultTo('')
    table.string('url_photo_full').notNullable().defaultTo('')
    table.string('url_photo_sized').notNullable().defaultTo('')
    table.string('url_photo_small').notNullable().defaultTo('')
    table.text('description').notNullable().defaultTo('')
    table.string('likes').notNullable().defaultTo('')
    table.bigInteger('photo_date').notNullable().defaultTo(0)
    table.boolean('is_public').notNullable().defaultTo(false)
    table.string('camera_model').notNullable().defaultTo('')
    table.integer('user_id')
      .references('users.id')
      .notNullable()
      .onDelete('CASCADE')
      .index()
    table.timestamps(true, true)
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('photos')
}
