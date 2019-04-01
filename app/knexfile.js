// Update with your config settings.

module.exports = {

  test: {
    client: 'pg',
    connection: 'postgres://docker:docker@postgre/pf_test',
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds/test'
    }
  },
  
  development: {
    client: 'pg',
    connection: 'postgres://docker:docker@postgre/pf_dev',
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds/test'
    }
  },

  production: {
    client: 'pg',
    connection: 'postgres://docker:docker@postgre/pf_prd',
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds/test'
    }
  }

};
