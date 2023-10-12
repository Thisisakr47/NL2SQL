const Pool = require('pg').Pool;

const dotenv = require('dotenv')
dotenv.config({path:__dirname+'\\.env'});

const pool = new Pool({
    user: process.env.user,
    password: process.env.password,
    host: process.env.host,
    port: process.env.port,
    database: process.env.database,
    ssl: {
        rejectUnauthorized: false
    }
})

module.exports = pool;