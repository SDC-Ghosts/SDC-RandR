const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
});

module.exports = pool;
