const { Pool } = require("pg");

const pool = new Pool({
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || "imagedb",
    user: process.env.DB_USER || "imageuser",
    password: process.env.DB_PASSWORD || "imagepass"
});

module.exports = pool;
