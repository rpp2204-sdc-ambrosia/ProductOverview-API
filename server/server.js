const app = require('./app');
const { pool, query } = require('../db/index.js')

app.get('/products', (req, res) => {

  const count = req.query.count;

  if (!count) {
    pool
    .query('SELECT * FROM product LIMIT 5')
    .then(data => res.send(data.rows))
    .catch(err => console.log('error: ', err))
  } else {
    pool
    .query(`SELECT * FROM product LIMIT ${count}`)
    .then(data => res.send(data.rows))
    .catch(err => console.log('error: ', err))
  }

})

app.get('/products/:product_id', (req, res) => {
  const req_id = req.params.product_id;
  let res_obj;
  pool
  // .query(`SELECT * FROM product INNER JOIN features ON product.product_id = features.product_id WHERE product.product_id = '${req_id}'`)
  .query(`SELECT * FROM product WHERE product_id = '${req_id}'`)
  .then(data => res_obj = data.rows[0])
  .catch(err => console.log('error: ', err))

  pool
  .query(`SELECT name,value FROM features WHERE product_id = '${req_id}'`)
  .then(data => res_obj.features = data.rows)
  .then(data => res.send(res_obj))
  .catch(err => console.log('error: ', err))

})

app.get('/products/:product_id/styles', (req, res) => {
  const req_id = req.params.product_id
  // console.log('req_id: ', req_id)
  let res_obj = {
    product_id: req_id,
    results: []
  };

  pool
  .query(`SELECT product_style_id,name,original_price,sale_price,"default" FROM product_style WHERE product_id = '${req_id}'`)
  .then((data) => {
    let storage = [];
    let resultArr = data.rows.map((obj) => {
      return pool
      .query(`SELECT thumbnail_url,url FROM photo WHERE product_style_id = '${obj.product_style_id}'`)
      .then((data) => {
        obj.photos = data.rows
      })
      .then((data) => {
        return pool.query(`SELECT quantity,size FROM sku WHERE product_style_id = '${obj.product_style_id}'`)
      })
      .then((data) => {
        console.log('sku data: ', data)
        obj.skus = data.rows;
        console.log('obj: ', obj)
        storage.push(obj);
        res_obj.results = [...storage]
        return res_obj;
      })
      .catch(err => console.log('error: ', err))

    })
    Promise.all(resultArr)
    .then(data => res.send(res_obj))
    .catch(err => console.log('error: ', err))

  })

})

app.get('/products/:product_id/related', (req, res) => {
  const req_id = req.params.product_id;

  pool
  .query(`SELECT related_product_id FROM related WHERE current_product_id = '${req_id}'`)
  .then((data) => {
    if (data.rows.length > 0) {
      let relatedNums = data.rows.map(obj => obj.related_product_id)
      res.send(relatedNums)
    } else {
      res.send([])
    }
})
  .catch(err => console.log('error: ', err));

})


app.listen(3000, () => {
  console.log("listening on port 3000!");
});