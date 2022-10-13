const app = require('./app');
const { pool, query } = require('../db/index.js')

app.get('/products', (req, res) => {

  pool
  .query('SELECT * FROM product')
  .then(res => console.log('results: ', res.rows))
  .catch(err => console.log('error: ', err))

})

app.get('/products/:product_id', (req, res) => {
  let req_id = req.params.product_id;
  let res_obj;
  pool
  // .query(`SELECT * FROM product INNER JOIN features ON product.product_id = features.product_id WHERE product.product_id = '${req_id}'`)
  .query(`SELECT * FROM product WHERE product_id = '${req_id}'`)
  .then(res => res_obj = res.rows[0])
  .catch(err => console.log('error: ', err))

  pool
  .query(`SELECT name,value FROM features WHERE product_id = '${req_id}'`)
  .then(res => res_obj.features = res.rows)
  .then(res => console.log('new obj shape: ', res_obj))
  .catch(err => console.log('error: ', err))

})

app.get('/products/:product_id/styles', (req, res) => {

})

app.get('/products/:product_id/related', (req, res) => {

})


app.listen(3000, () => {
  console.log("listening on port 3000!");
});