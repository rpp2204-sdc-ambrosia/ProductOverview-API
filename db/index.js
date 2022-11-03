require('dotenv').config();
// const postgres = require('postgres');

// const sql = postgres('postgres://eric@localhost:5432/ProductOverview')

const { Pool } = require('pg');

const pool = new Pool({
  "max": 20,
  "connectionTimeoutMillis": 0,
  "idleTimeoutMillis": 0,
  user: 'postgres',
  host: '52.91.86.207',
  database: 'productoverview',
  password: 'student',
  // port: 5432
})

module.exports = {
  pool,
  query: (text, params) => {
    return pool.query(text, params)
  },
}