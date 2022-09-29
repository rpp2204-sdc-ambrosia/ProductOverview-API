const postgres = require('postgres');

const sql = postgres('postgres://username:password@host:port/database', {
  host                 : 'localhost',            // Postgres ip address[s] or domain name[s]
  port                 : 5432,          // Postgres server port[s]
  database             : 'ProductOverview',            // Name of database to connect to
  username             : 'ekalin',            // Username of database user
  password             : '',            // Password of database user
})
