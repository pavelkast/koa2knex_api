const db = require('./api/config/db.json');

module.exports = {
  development: {
    client: db.client,
    connection: db.connection,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './migrations',
      tableName: 'knex_migrations'
    }
  }
};
