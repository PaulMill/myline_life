'use strict'

exports.up = function(knex) {
  return knex.schema.createTable('guests', (table) => {
    table.increments()
    table.string('share_url').notNullable().defaultTo('')
    table.integer('user_id')
      .references('users.id')
      .notNullable()
      .onDelete('CASCADE')
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
  return knex.schema.dropTable('guests')
}
