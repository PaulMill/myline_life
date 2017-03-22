'use strict'

exports.seed = function(knex) {
  return knex('users').del()
    .then(() => {
      return knex('users').insert([
        {
        id: 1,
        name: 'Paul Miller',
        email: 'paul@miller.com',
        hashed_password: '',
        url: 'paulmiller',
        address1: '',
        address2: '',
        city: '',
        state: '',
        country: '',
        phone: '',
        zipcode: 98002,
        reg_url: '',
        is_registred: true,
        birthday: '',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      },
      {
        id: 2,
        name: 'Natalie Miller',
        email: 'natalie@miller.com',
        hashed_password: '',
        url: 'nataliemiller',
        address1: '',
        address2: '',
        city: '',
        state: '',
        country: '',
        phone: '',
        zipcode: 98002,
        reg_url: '',
        is_registred: true,
        birthday: '',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      },
      {
        id: 3,
        name: 'Catherine J Miller',
        email: 'catherine.j@miller.com',
        hashed_password: '',
        url: 'catherinemiller',
        address1: '',
        address2: '',
        city: '',
        state: '',
        country: '',
        phone: '',
        zipcode: 98002,
        reg_url: '',
        is_registred: true,
        birthday: '',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      }
    ]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));"
      );
    });
};
