const app = require('./app');
const { pool, query } = require('../db/index.js')

app.get('/products', (req, res) => {

  pool
  .query('SELECT * FROM product')
  .then(res => console.log('results: ', res.rows))
  .catch(err => console.log('error: ', err))

})

app.get('/products/:product_id', (req, res) => {

})

app.get('/products/:product_id/styles', (req, res) => {

})

app.get('/products/:product_id/related', (req, res) => {

})


app.listen(3000, () => {
  console.log("listening on port 3000!");
});