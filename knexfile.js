
'use strict'

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/myline_life_dev'
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
