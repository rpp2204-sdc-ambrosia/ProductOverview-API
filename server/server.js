const app = require('./app');
const { pool, query } = require('../db/index.js')

app.get('/products', (req, res) => {
  pool
  .query('SELECT * FROM product')
  .then(res => console.log('results: ', res.rows))
  .catch(err => console.log('error: ', err))

})

app.get('/products/:product_id', (req, res) => {
  const req_id = req.params.product_id;
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
  const req_id = req.params.product_id
  console.log('req_id: ', req_id)
  let res_obj = {
    product_id: req_id
  };

  pool
  .query(`SELECT product_style_id,name,original_price,sale_price,"default" FROM product_style WHERE product_id = '${req_id}' ORDER BY product_id ASC`)
  .then((data) => {

    let resultArr = data.rows.map((obj) => {
      //console.log('inner map: ', obj)
      return pool
      .query(`SELECT * FROM photo WHERE product_style_id = '${obj.product_style_id}'`)
      .then((data) => {
        console.log('photo results: ', data.rows)
        obj.photos = data.rows
      })
      .then((data) => {
        return pool.query(`SELECT quantity,size FROM sku WHERE product_style_id = '${obj.product_style_id}'`)
      })
      .then((data) => {
        console.log('sku results: ', data.rows)
        obj.skus = data.rows
      })
      .then(data => resultArr.push(obj))
      .then(data  => res_obj.results = resultArr)
      .then((data) => {
        // console.log('Inner res_obj: ', res_obj)
        return res_obj;
      })
      .catch(err => console.log('error: ', err))

    })
    Promise.all(resultArr)
    .then(data => res.send(res_obj))
    .catch(err => console.log('error: ', err))

  })

  // try {
  //   const ps_query = await pool.query(`SELECT product_style_id,name,original_price,sale_price,"default" FROM product_style WHERE product_id = '${req_id}' ORDER BY product_id ASC`)

  // }


})

app.get('/products/:product_id/related', (req, res) => {

})


app.listen(3000, () => {
  console.log("listening on port 3000!");
});