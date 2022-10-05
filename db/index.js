require('dotenv').config();
const postgres = require('postgres');

const sql = postgres('postgres://eric@localhost:5432/ProductOverview')
const { Pool } = require('pg');

const pool = new Pool({
  "max": 20,
  "connectionTimeoutMillis": 0,
  "idleTimeoutMillis": 0
})

module.exports = {
  pool,
  query: (text, params) => {
    return pool.query(text, params)
  },
}