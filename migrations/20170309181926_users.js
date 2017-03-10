'use strict'

exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments()
    table.string('name').notNullable().defaultTo('')
    table.string('email').notNullable()
    table.specificType('hashed_password', 'char(60)').notNullable()
    table.string('url').unique().notNullable()
    table.string('address1').notNullable().defaultTo('')
    table.string('address2').notNullable().defaultTo('')
    table.string('city').notNullable().defaultTo('')
    table.string('state').notNullable().defaultTo('')
    table.string('country').notNullable().defaultTo('')
    table.string('phone').notNullable().defaultTo('')
    table.string('zipcode').notNullable().default('')
    table.string('reg_url').notNullable().default('')
    table.boolean('is_registred').notNullable().default(false)
    table.timestamps(true, true)
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('users')
}
