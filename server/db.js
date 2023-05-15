const Pool = require('pg').Pool;

const pool  = new Pool({
    user: "postgres",
    password: "prateek",
    host: "localhost",
    port: 5432,
    database: "test",
})

module.exports = pool;